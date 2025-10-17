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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Loader2, Plus } from "lucide-react";

export default function DepositsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const form = useForm<CreateTransactionRequest>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "deposit",
      fundType: "real",
      amount: 0,
      method: "bank_transfer",
      notes: "",
    },
  });

  const depositMutation = useMutation({
    mutationFn: async (data: CreateTransactionRequest) => {
      return await apiRequest("POST", "/api/funding/deposit", data);
    },
    onSuccess: () => {
      toast({
        title: t("deposits.toast.success.title"),
        description: t("deposits.toast.success.description"),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/funding/history"] });
      form.reset();
      setShowForm(false);
    },
    onError: (error: any) => {
      toast({
        title: t("deposits.toast.error.title"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mock deposit history
  const deposits = [
    {
      id: "1",
      amount: 5000.00,
      method: "Bank Transfer",
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      processedAt: "2024-01-15T14:20:00Z",
    },
    {
      id: "2",
      amount: 1000.00,
      method: "Credit Card",
      status: "pending",
      createdAt: "2024-01-16T09:15:00Z",
    },
  ];

  const onSubmit = (data: CreateTransactionRequest) => {
    depositMutation.mutate(data);
  };

  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{t("deposits.title")}</h1>
          <p className="text-muted-foreground">{t("deposits.description")}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-new-deposit">
          <Plus className="mr-2 h-4 w-4" />
          {t("deposits.newDeposit")}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t("deposits.form.title")}</CardTitle>
            <CardDescription>
              {t("deposits.form.description")}
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
                      <FormLabel>{t("deposits.form.amount")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          min="1"
                          data-testid="input-deposit-amount"
                          placeholder={t("deposits.form.amountPlaceholder")}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          disabled={depositMutation.isPending}
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
                      <FormLabel>{t("deposits.form.fundType")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={depositMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-fund-type">
                            <SelectValue placeholder={t("deposits.form.fundTypePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="real">{t("deposits.form.fundType.real")}</SelectItem>
                          <SelectItem value="demo">{t("deposits.form.fundType.demo")}</SelectItem>
                          <SelectItem value="bonus">{t("deposits.form.fundType.bonus")}</SelectItem>
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
                      <FormLabel>{t("deposits.form.method")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={depositMutation.isPending}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-payment-method">
                            <SelectValue placeholder={t("deposits.form.methodPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bank_transfer">{t("deposits.form.method.bankTransfer")}</SelectItem>
                          <SelectItem value="credit_card">{t("deposits.form.method.creditCard")}</SelectItem>
                          <SelectItem value="crypto">{t("deposits.form.method.crypto")}</SelectItem>
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
                      <FormLabel>{t("deposits.form.notes")}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          data-testid="input-deposit-notes"
                          placeholder={t("deposits.form.notesPlaceholder")}
                          disabled={depositMutation.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={depositMutation.isPending}
                    data-testid="button-submit-deposit"
                  >
                    {depositMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("deposits.form.submitting")}
                      </>
                    ) : (
                      t("deposits.form.submit")
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    disabled={depositMutation.isPending}
                  >
                    {t("deposits.form.cancel")}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t("deposits.history.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("deposits.history.date")}</TableHead>
                  <TableHead>{t("deposits.history.amount")}</TableHead>
                  <TableHead>{t("deposits.history.method")}</TableHead>
                  <TableHead>{t("deposits.history.status")}</TableHead>
                  <TableHead>{t("deposits.history.processed")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.map((deposit) => (
                  <TableRow key={deposit.id} data-testid={`deposit-row-${deposit.id}`}>
                    <TableCell>
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-mono font-semibold">
                      ${deposit.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{deposit.method}</TableCell>
                    <TableCell>
                      <StatusBadge status={deposit.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {deposit.processedAt
                        ? new Date(deposit.processedAt).toLocaleDateString()
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
