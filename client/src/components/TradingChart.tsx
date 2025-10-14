import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickData, UTCTimestamp } from 'lightweight-charts';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { BarChart3, LineChart, CandlestickChart, TrendingUp, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

type TradingChartProps = {
  symbol: string;
  connectionStatus?: "connected" | "reconnecting" | "disconnected";
};

type ChartType = 'candlestick' | 'line' | 'area';
type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';

export function TradingChart({ symbol, connectionStatus = "connected" }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | ISeriesApi<"Area"> | null>(null);
  
  const [chartType, setChartType] = useState<ChartType>('candlestick');
  const [timeframe, setTimeframe] = useState<Timeframe>('1h');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'hsl(var(--foreground))',
      },
      grid: {
        vertLines: { color: 'hsl(var(--border))' },
        horzLines: { color: 'hsl(var(--border))' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: 'hsl(var(--border))',
      },
      rightPriceScale: {
        borderColor: 'hsl(var(--border))',
      },
      crosshair: {
        mode: 1, // Normal crosshair mode
      },
    });

    chartRef.current = chart;

    // Create series based on chart type
    let series: ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | ISeriesApi<"Area">;
    
    if (chartType === 'candlestick') {
      series = chart.addCandlestickSeries({
        upColor: 'hsl(var(--chart-1))',
        downColor: 'hsl(var(--chart-2))',
        borderUpColor: 'hsl(var(--chart-1))',
        borderDownColor: 'hsl(var(--chart-2))',
        wickUpColor: 'hsl(var(--chart-1))',
        wickDownColor: 'hsl(var(--chart-2))',
      });
    } else if (chartType === 'line') {
      series = chart.addLineSeries({
        color: 'hsl(var(--primary))',
        lineWidth: 2,
      });
    } else {
      series = chart.addAreaSeries({
        topColor: 'hsla(var(--primary), 0.4)',
        bottomColor: 'hsla(var(--primary), 0.0)',
        lineColor: 'hsl(var(--primary))',
        lineWidth: 2,
      });
    }

    seriesRef.current = series;

    // Generate sample data - replace with real API call
    const generateSampleData = (): CandlestickData[] => {
      const data: CandlestickData[] = [];
      const now = Date.now() / 1000;
      let currentPrice = symbol === 'BTCUSD' ? 45000 : 1.10500;
      const priceMultiplier = symbol === 'BTCUSD' ? 1000 : 0.001;

      for (let i = 100; i >= 0; i--) {
        const time = (now - i * 3600) as UTCTimestamp;
        const open = currentPrice;
        const close = currentPrice + (Math.random() - 0.5) * priceMultiplier;
        const high = Math.max(open, close) + Math.random() * priceMultiplier * 0.5;
        const low = Math.min(open, close) - Math.random() * priceMultiplier * 0.5;
        
        data.push({
          time,
          open,
          high,
          low,
          close,
        });
        
        currentPrice = close;
      }
      return data;
    };

    const sampleData = generateSampleData();
    
    if (chartType === 'candlestick') {
      (series as ISeriesApi<"Candlestick">).setData(sampleData);
    } else {
      // For line and area charts, convert to simple price data
      const priceData = sampleData.map(d => ({
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
  }, [symbol, chartType, timeframe]);

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

  return (
    <Card className="relative h-full flex flex-col">
      {/* Chart Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg font-semibold">{symbol}</div>
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
