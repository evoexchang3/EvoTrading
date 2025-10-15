import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Trade = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  volume: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  commission?: number;
  swap?: number;
  openedAt: string;
  closedAt: string;
};

type TradesTableProps = {
  trades?: Trade[];
};

export function TradesTable({ trades }: TradesTableProps) {
  const { data: fetchedTrades = [] } = useQuery<Trade[]>({
    queryKey: ["/api/trading/trades"],
  });

  // Calculate profit if database has 0
  const displayTrades: Trade[] = (trades || fetchedTrades).map(trade => {
    const storedProfit = Number(trade.profit) || 0;
    
    // If profit is 0 but we have open and close prices, calculate it
    if (storedProfit === 0 && trade.openPrice && trade.closePrice && Number(trade.closePrice) > 0) {
      const volume = Number(trade.volume);
      const openPrice = Number(trade.openPrice);
      const closePrice = Number(trade.closePrice);
      
      // P&L calculation: (price difference * volume * pip value)
      // For forex standard lot (100,000 units), each pip is worth $10
      // For mini lot (10,000), each pip is worth $1
      // We'll assume volume is in lots and use pip value calculation
      const priceDifference = trade.side === 'buy' 
        ? (closePrice - openPrice) 
        : (openPrice - closePrice);
      
      // Calculate profit: price difference * volume * contract size
      const calculatedProfit = priceDifference * volume * 10000;
      
      return {
        ...trade,
        profit: calculatedProfit
      };
    }
    
    return trade;
  });

  if (displayTrades.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">No trade history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Symbol</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Volume</TableHead>
            <TableHead className="font-medium">Open Price</TableHead>
            <TableHead className="font-medium">Close Price</TableHead>
            <TableHead className="font-medium">Opened</TableHead>
            <TableHead className="font-medium">Closed</TableHead>
            <TableHead className="font-medium text-right">Profit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayTrades.map((trade) => (
            <TableRow key={trade.id} data-testid={`trade-row-${trade.id}`}>
              <TableCell className="font-medium">{trade.symbol}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    trade.side === "buy"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  }
                >
                  {trade.side.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{Number(trade.volume).toFixed(2)}</TableCell>
              <TableCell>{Number(trade.openPrice).toFixed(5)}</TableCell>
              <TableCell>{Number(trade.closePrice).toFixed(5)}</TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(trade.openedAt), "MMM dd, HH:mm")}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(trade.closedAt), "MMM dd, HH:mm")}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    Number(trade.profit) >= 0 ? "text-emerald-600" : "text-rose-600"
                  }
                  data-testid={`trade-profit-${trade.id}`}
                >
                  {Number(trade.profit) >= 0 ? "+" : ""}${Number(trade.profit).toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
