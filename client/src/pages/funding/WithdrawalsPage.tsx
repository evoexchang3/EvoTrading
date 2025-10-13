import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransactionSchema, type CreateTransactionRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";

export default function WithdrawalsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const form = useForm<CreateTransactionRequest>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "withdrawal",
      amount: 0,
      method: "bank_transfer",
      notes: "",
    },
  });

  const withdrawalMutation = useMutation({
    mutationFn: async (data: CreateTransactionRequest) => {
      return await apiRequest("POST", "/api/funding/withdrawal", data);
    },
    onSuccess: () => {
      toast({
        title: "Withdrawal request submitted",
        description: "Your withdrawal request has been submitted for processing",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/funding/history"] });
      form.reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to submit withdrawal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mock withdrawal history
  const withdrawals = [
    {
      id: "1",
      amount: 2000.00,
      method: "Bank Transfer",
      status: "completed",
      createdAt: "2024-01-14T11:20:00Z",
      processedAt: "2024-01-15T09:30:00Z",
    },
  ];

  const onSubmit = (data: CreateTransactionRequest) => {
    withdrawalMutation.mutate(data);
  };

  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Withdrawals</h1>
          <p className="text-muted-foreground">Withdraw funds from your account</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-new-withdrawal">
          <Plus className="mr-2 h-4 w-4" />
          New Withdrawal
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Withdrawal Request</CardTitle>
            <CardDescription>
              Submit a withdrawal request to transfer funds from your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (USD)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          min="1"
                          data-testid="input-withdrawal-amount"
                          placeholder="1000.00"
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          disabled={withdrawalMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Withdrawal Method</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={withdrawalMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-withdrawal-method">
                            <SelectValue placeholder="Select withdrawal method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Details / Wallet Address</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          data-testid="input-withdrawal-notes"
                          placeholder="Enter your bank account details or crypto wallet address..."
                          disabled={withdrawalMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={withdrawalMutation.isPending}
                    data-testid="button-submit-withdrawal"
                  >
                    {withdrawalMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    disabled={withdrawalMutation.isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Processed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal.id} data-testid={`withdrawal-row-${withdrawal.id}`}>
                    <TableCell>
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-mono font-semibold">
                      ${withdrawal.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{withdrawal.method}</TableCell>
                    <TableCell>
                      <StatusBadge status={withdrawal.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {withdrawal.processedAt
                        ? new Date(withdrawal.processedAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
