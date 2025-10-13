import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type PriceDisplayProps = {
  price: number;
  change?: number;
  changePercent?: number;
  showTrend?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function PriceDisplay({
  price,
  change,
  changePercent,
  showTrend = false,
  size = "md",
  className,
}: PriceDisplayProps) {
  const isPositive = (change ?? 0) >= 0;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-semibold",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-mono tabular-nums", sizeClasses[size])}>
        {price.toFixed(5)}
      </span>
      {(change !== undefined || changePercent !== undefined) && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isPositive ? "text-chart-1" : "text-chart-2"
          )}
        >
          {showTrend &&
            (isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            ))}
          {changePercent !== undefined && (
            <span>
              {isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%
            </span>
          )}
          {change !== undefined && changePercent === undefined && (
            <span>
              {isPositive ? "+" : ""}
              {change.toFixed(5)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
