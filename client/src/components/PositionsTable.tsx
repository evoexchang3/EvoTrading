import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProfitLossDisplay } from "@/components/ProfitLossDisplay";
import { Badge } from "@/components/ui/badge";
import { X, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Position = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  volume: number;
  openPrice: number;
  currentPrice: number;
  takeProfit?: number;
  stopLoss?: number;
  profit: number;
  swap: number;
  commission: number;
};

type PositionsTableProps = {
  positions?: Position[];
};

export function PositionsTable({ positions }: PositionsTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const closePositionMutation = useMutation({
    mutationFn: async (positionId: string) => {
      return await apiRequest("POST", `/api/trading/close/${positionId}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Position closed",
        description: "Your position has been closed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trading/positions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trading/account"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to close position",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const mockPositions: Position[] = positions || [
    {
      id: "1",
      symbol: "EURUSD",
      side: "buy",
      volume: 0.10,
      openPrice: 1.08432,
      currentPrice: 1.08545,
      takeProfit: 1.08750,
      stopLoss: 1.08200,
      profit: 113.00,
      swap: -2.50,
      commission: 0.00,
    },
    {
      id: "2",
      symbol: "BTCUSD",
      side: "sell",
      volume: 0.01,
      openPrice: 43500.00,
      currentPrice: 43250.50,
      profit: 24.95,
      swap: 0.00,
      commission: 5.00,
    },
  ];

  if (mockPositions.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">No open positions</p>
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
            <TableHead className="font-medium">Current</TableHead>
            <TableHead className="font-medium">TP/SL</TableHead>
            <TableHead className="font-medium text-right">Profit</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPositions.map((position) => (
            <TableRow key={position.id} data-testid={`position-row-${position.id}`}>
              <TableCell className="font-medium">{position.symbol}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    position.side === "buy" ? "text-chart-1" : "text-chart-2"
                  )}
                >
                  {position.side.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {position.volume.toFixed(2)}
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {position.openPrice.toFixed(position.symbol.includes("BTC") ? 2 : 5)}
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {position.currentPrice.toFixed(position.symbol.includes("BTC") ? 2 : 5)}
              </TableCell>
              <TableCell className="font-mono text-xs tabular-nums">
                {position.takeProfit && (
                  <div className="text-chart-1">
                    TP: {position.takeProfit.toFixed(position.symbol.includes("BTC") ? 2 : 5)}
                  </div>
                )}
                {position.stopLoss && (
                  <div className="text-chart-2">
                    SL: {position.stopLoss.toFixed(position.symbol.includes("BTC") ? 2 : 5)}
                  </div>
                )}
                {!position.takeProfit && !position.stopLoss && (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <ProfitLossDisplay value={position.profit} size="md" />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    data-testid={`button-edit-position-${position.id}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => closePositionMutation.mutate(position.id)}
                    disabled={closePositionMutation.isPending}
                    data-testid={`button-close-position-${position.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
