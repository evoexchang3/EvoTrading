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
import { useLanguage } from "@/hooks/useLanguage";
import { Loader2, Plus } from "lucide-react";

export default function WithdrawalsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const form = useForm<CreateTransactionRequest>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "withdrawal",
      fundType: "real",
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
        title: t("withdrawals.toast.success.title"),
        description: t("withdrawals.toast.success.description"),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/funding/history"] });
      form.reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({
        title: t("withdrawals.toast.error.title"),
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
          <h1 className="text-3xl font-semibold">{t("withdrawals.title")}</h1>
          <p className="text-muted-foreground">{t("withdrawals.description")}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-new-withdrawal">
          <Plus className="mr-2 h-4 w-4" />
          {t("withdrawals.newWithdrawal")}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t("withdrawals.form.title")}</CardTitle>
            <CardDescription>
              {t("withdrawals.form.description")}
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
                      <FormLabel>{t("withdrawals.form.amount")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          min="1"
                          data-testid="input-withdrawal-amount"
                          placeholder={t("withdrawals.form.amountPlaceholder")}
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
                  name="fundType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("withdrawals.form.fundType")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={withdrawalMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-fund-type">
                            <SelectValue placeholder={t("withdrawals.form.fundTypePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="real">{t("withdrawals.form.fundType.real")}</SelectItem>
                          <SelectItem value="demo">{t("withdrawals.form.fundType.demo")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("withdrawals.form.method")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={withdrawalMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-withdrawal-method">
                            <SelectValue placeholder={t("withdrawals.form.methodPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bank_transfer">{t("withdrawals.form.method.bankTransfer")}</SelectItem>
                          <SelectItem value="crypto">{t("withdrawals.form.method.crypto")}</SelectItem>
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
                      <FormLabel>{t("withdrawals.form.notes")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          data-testid="input-withdrawal-notes"
                          placeholder={t("withdrawals.form.notesPlaceholder")}
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
                        {t("withdrawals.form.submitting")}
                      </>
                    ) : (
                      t("withdrawals.form.submit")
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    disabled={withdrawalMutation.isPending}
                  >
                    {t("withdrawals.form.cancel")}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t("withdrawals.history.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("withdrawals.history.date")}</TableHead>
                  <TableHead>{t("withdrawals.history.amount")}</TableHead>
                  <TableHead>{t("withdrawals.history.method")}</TableHead>
                  <TableHead>{t("withdrawals.history.status")}</TableHead>
                  <TableHead>{t("withdrawals.history.processed")}</TableHead>
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
