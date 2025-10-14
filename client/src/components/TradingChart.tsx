import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, UTCTimestamp } from 'lightweight-charts';
import { CandlestickSeries, LineSeries, AreaSeries } from 'lightweight-charts';
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { useWebSocket } from "@/hooks/useWebSocket";
import { BarChart3, LineChart, CandlestickChart, TrendingUp, ZoomIn, ZoomOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TradingChartProps = {
  symbol: string;
  connectionStatus?: "connected" | "reconnecting" | "disconnected";
};

type ChartType = 'candlestick' | 'line' | 'area';
type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';

interface CandleData {
  symbol: string;
  interval: string;
  timestamp: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

// Map timeframe values to API intervals
const timeframeToInterval: Record<Timeframe, string> = {
  '1m': '1min',
  '5m': '5min',
  '15m': '15min',
  '1h': '1h',
  '4h': '4h',
  '1d': '1day',
  '1w': '1week',
};

export function TradingChart({ symbol, connectionStatus = "connected" }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | ISeriesApi<"Area"> | null>(null);
  const lastCandleRef = useRef<CandlestickData | null>(null);
  
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [timeframe, setTimeframe] = useState<Timeframe>('1h');
  const { toast } = useToast();

  // Subscribe to WebSocket for real-time price updates
  const { prices } = useWebSocket([symbol]);

  // Fetch historical candle data
  const { data: candles, isLoading, error, refetch } = useQuery<CandleData[]>({
    queryKey: ['/api/market/candles', symbol, timeframe],
    queryFn: async () => {
      const interval = timeframeToInterval[timeframe];
      const response = await fetch(`/api/market/candles/${symbol}?interval=${interval}&limit=100`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch candle data');
      }
      
      return response.json();
    },
    retry: 2,
    staleTime: 60000,
  });

  // Show error toast if data fetch fails
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading chart data",
        description: error instanceof Error ? error.message : "Failed to fetch candle data",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Create and update chart when candles, chartType, or timeframe change
  useEffect(() => {
    if (!chartContainerRef.current || !candles || candles.length === 0) return;

    // Clean up existing chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Professional trading colors for dark mode
    const colors = {
      background: 'transparent',
      textColor: '#e5e5e5',
      borderColor: '#2a2a2a',
      upColor: '#10b981',      // Green for bullish
      downColor: '#ef4444',    // Red for bearish
      lineColor: '#3b82f6',    // Blue for line charts
      areaTopColor: 'rgba(59, 130, 246, 0.4)',
      areaBottomColor: 'rgba(59, 130, 246, 0.0)',
    };

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.background },
        textColor: colors.textColor,
      },
      grid: {
        vertLines: { color: colors.borderColor },
        horzLines: { color: colors.borderColor },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: colors.borderColor,
      },
      rightPriceScale: {
        borderColor: colors.borderColor,
      },
      crosshair: {
        mode: 1,
      },
    });

    chartRef.current = chart;

    // Create series based on chart type (v5 API)
    let series: ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | ISeriesApi<"Area">;
    
    if (chartType === 'candlestick') {
      series = chart.addSeries(CandlestickSeries, {
        upColor: colors.upColor,
        downColor: colors.downColor,
        borderUpColor: colors.upColor,
        borderDownColor: colors.downColor,
        wickUpColor: colors.upColor,
        wickDownColor: colors.downColor,
      });
    } else if (chartType === 'line') {
      series = chart.addSeries(LineSeries, {
        color: colors.lineColor,
        lineWidth: 2,
      });
    } else {
      series = chart.addSeries(AreaSeries, {
        topColor: colors.areaTopColor,
        bottomColor: colors.areaBottomColor,
        lineColor: colors.lineColor,
        lineWidth: 2,
      });
    }

    seriesRef.current = series;

    // Convert candle data to chart format
    const chartData: CandlestickData[] = candles.map((candle) => ({
      time: (new Date(candle.timestamp).getTime() / 1000) as UTCTimestamp,
      open: parseFloat(candle.open),
      high: parseFloat(candle.high),
      low: parseFloat(candle.low),
      close: parseFloat(candle.close),
    })).sort((a, b) => (a.time as number) - (b.time as number));

    // Store last candle for incremental updates
    if (chartData.length > 0) {
      lastCandleRef.current = chartData[chartData.length - 1];
    }

    if (chartType === 'candlestick') {
      (series as ISeriesApi<"Candlestick">).setData(chartData);
    } else {
      // For line and area charts, convert to price data
      const priceData = chartData.map(d => ({
        time: d.time,
        value: d.close,
      }));
      (series as ISeriesApi<"Line"> | ISeriesApi<"Area">).setData(priceData);
    }

    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [candles, chartType, timeframe]);

  // Update chart incrementally with real-time WebSocket price data
  useEffect(() => {
    if (!seriesRef.current || !prices[symbol] || !lastCandleRef.current) return;

    const priceData = prices[symbol];
    const newPrice = priceData.bid || priceData.ask || priceData.price;
    
    if (!newPrice) return;

    const currentTime = (Date.now() / 1000) as UTCTimestamp;

    // Update last candle incrementally
    if (chartType === 'candlestick' && seriesRef.current) {
      const series = seriesRef.current as ISeriesApi<"Candlestick">;
      const lastCandle = lastCandleRef.current;
      
      // Update the last candle with new price
      const updatedCandle: CandlestickData = {
        time: lastCandle.time,
        open: lastCandle.open,
        high: Math.max(lastCandle.high, newPrice),
        low: Math.min(lastCandle.low, newPrice),
        close: newPrice,
      };
      
      lastCandleRef.current = updatedCandle;
      series.update(updatedCandle);
    } else if (chartType === 'line' || chartType === 'area') {
      const series = seriesRef.current as ISeriesApi<"Line"> | ISeriesApi<"Area">;
      const lastCandle = lastCandleRef.current;
      
      series.update({
        time: lastCandle.time,
        value: newPrice,
      });
    }
  }, [prices, symbol, chartType]);

  // Refetch data when timeframe changes
  useEffect(() => {
    refetch();
  }, [timeframe, refetch]);

  const handleZoomIn = () => {
    if (chartRef.current) {
      const timeScale = chartRef.current.timeScale();
      const range = timeScale.getVisibleLogicalRange();
      if (range) {
        const newRange = {
          from: range.from + (range.to - range.from) * 0.1,
          to: range.to - (range.to - range.from) * 0.1,
        };
        timeScale.setVisibleLogicalRange(newRange);
      }
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      const timeScale = chartRef.current.timeScale();
      const range = timeScale.getVisibleLogicalRange();
      if (range) {
        const newRange = {
          from: range.from - (range.to - range.from) * 0.1,
          to: range.to + (range.to - range.from) * 0.1,
        };
        timeScale.setVisibleLogicalRange(newRange);
      }
    }
  };

  const handleFitContent = () => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  };

  // Show loading skeleton while fetching data
  if (isLoading) {
    return (
      <Card className="relative h-full flex flex-col p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-full w-full min-h-[400px]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative h-full flex flex-col">
      {/* Chart Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg font-semibold" data-testid="text-chart-symbol">{symbol}</div>
            <div className="text-xs text-muted-foreground">{timeframe} Chart</div>
          </div>
          <ConnectionStatus status={connectionStatus} />
        </div>

        {/* Chart Controls */}
        <div className="flex items-center gap-2">
          {/* Timeframe Selector */}
          <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
            <SelectTrigger className="w-20 h-8" data-testid="select-timeframe">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="4h">4h</SelectItem>
              <SelectItem value="1d">1D</SelectItem>
              <SelectItem value="1w">1W</SelectItem>
            </SelectContent>
          </Select>

          {/* Chart Type Selector */}
          <div className="flex items-center gap-1 rounded-md border p-1">
            <Button
              size="icon"
              variant={chartType === 'candlestick' ? 'default' : 'ghost'}
              className="h-6 w-6"
              onClick={() => setChartType('candlestick')}
              data-testid="button-chart-candlestick"
            >
              <CandlestickChart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={chartType === 'line' ? 'default' : 'ghost'}
              className="h-6 w-6"
              onClick={() => setChartType('line')}
              data-testid="button-chart-line"
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={chartType === 'area' ? 'default' : 'ghost'}
              className="h-6 w-6"
              onClick={() => setChartType('area')}
              data-testid="button-chart-area"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 rounded-md border p-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={handleZoomIn}
              data-testid="button-zoom-in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={handleZoomOut}
              data-testid="button-zoom-out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={handleFitContent}
              data-testid="button-fit-content"
            >
              <LineChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div 
        ref={chartContainerRef} 
        className="h-full w-full"
        data-testid="trading-chart"
      />
    </Card>
  );
}
