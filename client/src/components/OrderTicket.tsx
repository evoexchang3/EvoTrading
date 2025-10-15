import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeOrderSchema, type PlaceOrderRequest, type Symbol, type Account } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type OrderTicketProps = {
  symbol: string;
  currentPrice?: number;
  priceTimestamp?: string;
};

export function OrderTicket({ symbol, currentPrice = 1.08545, priceTimestamp }: OrderTicketProps) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: symbols } = useQuery<Symbol[]>({
    queryKey: ["/api/market/symbols"],
  });

  const { data: account } = useQuery<Account>({
    queryKey: ["/api/account"],
  });

  const symbolData = useMemo(() => {
    return symbols?.find((s) => s.symbol === symbol);
  }, [symbols, symbol]);

  const form = useForm<PlaceOrderRequest>({
    resolver: zodResolver(placeOrderSchema),
    defaultValues: {
      symbol,
      type: "market",
      side,
      quantity: 0.01,
      // Don't set price for market orders (undefined passes validation)
    },
  });

  const quantity = form.watch("quantity");

  const marginRequired = useMemo(() => {
    if (!symbolData || !account || !quantity) return 0;
    
    const contractSize = parseFloat(symbolData.contractSize || "100000");
    const leverage = account.leverage || 100;
    const price = currentPrice || 1;
    
    return (quantity * contractSize * price) / leverage;
  }, [symbolData, account, quantity, currentPrice]);

  const orderMutation = useMutation({
    mutationFn: async (data: PlaceOrderRequest) => {
      const payload = {
        ...data,
        quantity: parseFloat((data.quantity || 0.01).toString()),
        // Include live WebSocket price and timestamp ONLY if available
        ...(currentPrice && priceTimestamp ? {
          currentPrice: currentPrice,
          priceTimestamp: priceTimestamp,
        } : {}),
      };
      return await apiRequest("POST", "/api/trading/order", payload);
    },
    onSuccess: () => {
      toast({
        title: "Order placed",
        description: "Your order has been submitted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/trading/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/trading/positions"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Order failed",
        description: error.message || "Failed to place order",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PlaceOrderRequest) => {
    orderMutation.mutate({ ...data, side });
  };

  const adjustQuantity = (delta: number) => {
    const currentQuantity = form.getValues("quantity") || 0.01;
    const newQuantity = Math.max(0.01, currentQuantity + delta);
    form.setValue("quantity", parseFloat(newQuantity.toFixed(2)));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Order Ticket</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={side} onValueChange={(v) => setSide(v as "buy" | "sell")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" data-testid="tab-buy" className="data-[state=active]:text-chart-1">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" data-testid="tab-sell" className="data-[state=active]:text-chart-2">
              Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                    Order Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={orderMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-order-type">
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                      <SelectItem value="stop_limit">Stop Limit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                    Volume (Lots)
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => adjustQuantity(-0.01)}
                      disabled={orderMutation.isPending}
                      data-testid="button-decrease-volume"
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="text-center font-mono"
                        data-testid="input-volume"
                        disabled={orderMutation.isPending}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => adjustQuantity(0.01)}
                      disabled={orderMutation.isPending}
                      data-testid="button-increase-volume"
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("type") !== "market" && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.00001"
                        className="font-mono"
                        data-testid="input-price"
                        disabled={orderMutation.isPending}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="takeProfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                      Take Profit
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.00001"
                        placeholder="Optional"
                        className="font-mono"
                        data-testid="input-take-profit"
                        disabled={orderMutation.isPending}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stopLoss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                      Stop Loss
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.00001"
                        placeholder="Optional"
                        className="font-mono"
                        data-testid="input-stop-loss"
                        disabled={orderMutation.isPending}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full h-12 font-semibold",
                side === "buy" ? "bg-chart-1 hover:bg-chart-1/90" : "bg-chart-2 hover:bg-chart-2/90"
              )}
              disabled={orderMutation.isPending}
              data-testid="button-place-order"
            >
              {orderMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing order...
                </>
              ) : (
                `${side === "buy" ? "Buy" : "Sell"} ${symbol}`
              )}
            </Button>
          </form>
        </Form>

        <div className="rounded-md bg-muted/50 p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Margin Required</span>
            <span className="font-mono font-medium" data-testid="text-margin-required">
              ${marginRequired.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Price</span>
            <span className="font-mono font-medium" data-testid="text-current-price">
              {currentPrice.toFixed(5)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
