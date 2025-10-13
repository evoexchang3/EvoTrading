import { Card, CardContent } from "@/components/ui/card";
import { ProfitLossDisplay } from "@/components/ProfitLossDisplay";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type AccountData = {
  balance: string;
  equity: string;
  usedMargin: string;
  freeMargin: string;
  marginLevel: string;
};

type AccountSummaryProps = {
  className?: string;
};

export function AccountSummary({ className }: AccountSummaryProps) {
  const { data: accountData } = useQuery<AccountData>({
    queryKey: ["/api/trading/account"],
  });

  const balance = parseFloat(accountData?.balance || "0");
  const equity = parseFloat(accountData?.equity || balance.toString());
  const profit = equity - balance;
  const margin = parseFloat(accountData?.usedMargin || "0");
  const freeMargin = parseFloat(accountData?.freeMargin || balance.toString());
  const marginLevel = parseFloat(accountData?.marginLevel || "0");

  const isMarginWarning = marginLevel < 150;

  return (
    <Card className={cn("border-0 shadow-none bg-transparent", className)}>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-6">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Balance
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-balance">
              ${balance.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Equity
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-equity">
              ${equity.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Profit/Loss
            </div>
            <div data-testid="text-profit">
              <ProfitLossDisplay value={profit} size="lg" />
            </div>
          </div>
          
          <Separator orientation="vertical" className="hidden lg:block" />
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Margin
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-margin">
              ${margin.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Free Margin
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-free-margin">
              ${freeMargin.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Margin Level
            </div>
            <div
              className={cn(
                "font-mono text-lg font-semibold tabular-nums",
                isMarginWarning && "text-chart-4"
              )}
              data-testid="text-margin-level"
            >
              {marginLevel.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
