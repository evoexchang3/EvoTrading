import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type AccountInfo = {
  balance: string;
  realBalance: string;
  demoBalance: string;
  bonusBalance: string;
  equity: string;
  margin: string;
  freeMargin: string;
  marginLevel: string;
  leverage: number;
  totalPnl: string;
};

export function AccountInfoBar() {
  const { data: account } = useQuery<AccountInfo>({
    queryKey: ["/api/account"],
    refetchInterval: 2000, // Real-time updates every 2 seconds
    retry: (failureCount, error: any) => {
      // Don't retry on authentication errors (401/403)
      if (error?.message?.includes("Invalid or expired token")) return false;
      if (error?.message?.includes("Unauthorized")) return false;
      // Retry other errors up to 3 times
      return failureCount < 3;
    },
  });

  const realBalance = parseFloat(account?.realBalance || "0");
  const demoBalance = parseFloat(account?.demoBalance || "0");
  const bonusBalance = parseFloat(account?.bonusBalance || "0");
  const balance = parseFloat(account?.balance || "0");
  const margin = parseFloat(account?.margin || "0");
  const equity = parseFloat(account?.equity || "0");
  const marginLevel = parseFloat(account?.marginLevel || "0");
  const freeMargin = parseFloat(account?.freeMargin || "0");
  const pnl = parseFloat(account?.totalPnl || "0");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="border-b bg-card">
      <div className="px-4 py-2">
        <div className="grid grid-cols-8 gap-4 items-center">
          {/* Real Balance */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Real
            </div>
            <div className="font-mono text-sm font-semibold tabular-nums" data-testid="info-real-balance">
              {formatCurrency(realBalance)} USD
            </div>
          </div>

          {/* Demo Balance */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Demo
            </div>
            <div className="font-mono text-sm font-semibold tabular-nums" data-testid="info-demo-balance">
              {formatCurrency(demoBalance)} USD
            </div>
          </div>

          {/* Bonus Balance */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Bonus
            </div>
            <div className="font-mono text-sm font-semibold tabular-nums" data-testid="info-bonus-balance">
              {formatCurrency(bonusBalance)} USD
            </div>
          </div>

          {/* Margin */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Margin
            </div>
            <div className="font-mono text-sm font-semibold tabular-nums" data-testid="info-margin">
              {formatCurrency(margin)} USD
            </div>
          </div>

          {/* Equity */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Equity
            </div>
            <div className="font-mono text-sm font-semibold tabular-nums" data-testid="info-equity">
              {formatCurrency(equity)} USD
            </div>
          </div>

          {/* Margin Level */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Margin Level
            </div>
            <div 
              className={cn(
                "font-mono text-sm font-semibold tabular-nums",
                marginLevel < 150 && marginLevel > 0 && "text-chart-4"
              )}
              data-testid="info-margin-level"
            >
              {marginLevel > 0 ? `${formatCurrency(marginLevel)}%` : '—'}
            </div>
          </div>

          {/* Free Margin */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              Free Margin
            </div>
            <div className="font-mono text-sm font-semibold tabular-nums" data-testid="info-free-margin">
              {formatCurrency(freeMargin)} USD
            </div>
          </div>

          {/* P/L */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
              P/L
            </div>
            <div 
              className={cn(
                "font-mono text-sm font-semibold tabular-nums",
                pnl > 0 && "text-chart-2",
                pnl < 0 && "text-chart-1"
              )}
              data-testid="info-pnl"
            >
              {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)} USD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
