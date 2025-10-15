import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Order = {
  id: string;
  symbol: string;
  type: string;
  side: "buy" | "sell";
  volume: number;
  price?: number;
  status: string;
  createdAt: string;
};

type OrdersTableProps = {
  orders?: Order[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: fetchedOrders = [] } = useQuery<Order[]>({
    queryKey: ["/api/trading/orders"],
  });

  const cancelOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      return await apiRequest("DELETE", `/api/trading/order/${orderId}`, {});
    },
    onSuccess: () => {
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trading/orders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to cancel order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const displayOrders: Order[] = orders || fetchedOrders;

  if (displayOrders.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">No pending orders</p>
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
            <TableHead className="font-medium">Side</TableHead>
            <TableHead className="font-medium">Volume</TableHead>
            <TableHead className="font-medium">Price</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Time</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayOrders.map((order) => (
            <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
              <TableCell className="font-medium">{order.symbol}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {order.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    order.side === "buy" ? "text-chart-1" : "text-chart-2"
                  )}
                >
                  {order.side.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {order.volume.toFixed(2)}
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {order.price?.toFixed(5) || "-"}
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => cancelOrderMutation.mutate(order.id)}
                  disabled={cancelOrderMutation.isPending}
                  data-testid={`button-cancel-order-${order.id}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
