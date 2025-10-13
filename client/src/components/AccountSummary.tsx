import { Card, CardContent } from "@/components/ui/card";
import { ProfitLossDisplay } from "@/components/ProfitLossDisplay";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type AccountData = {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  profit: number;
};

type AccountSummaryProps = {
  data?: AccountData;
  className?: string;
};

export function AccountSummary({ data, className }: AccountSummaryProps) {
  const accountData = data || {
    balance: 10000.00,
    equity: 10245.32,
    margin: 216.88,
    freeMargin: 10028.44,
    marginLevel: 4724.51,
    profit: 245.32,
  };

  const isMarginWarning = accountData.marginLevel < 150;

  return (
    <Card className={cn("border-0 shadow-none bg-transparent", className)}>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-6">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Balance
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-balance">
              ${accountData.balance.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Equity
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-equity">
              ${accountData.equity.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Profit/Loss
            </div>
            <div data-testid="text-profit">
              <ProfitLossDisplay value={accountData.profit} size="lg" />
            </div>
          </div>
          
          <Separator orientation="vertical" className="hidden lg:block" />
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Margin
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-margin">
              ${accountData.margin.toFixed(2)}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Free Margin
            </div>
            <div className="font-mono text-lg font-semibold tabular-nums" data-testid="text-free-margin">
              ${accountData.freeMargin.toFixed(2)}
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
              {accountData.marginLevel.toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
