import { cn } from "@/lib/utils";

type ProfitLossDisplayProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  showSign?: boolean;
  className?: string;
};

export function ProfitLossDisplay({
  value,
  size = "md",
  showSign = true,
  className,
}: ProfitLossDisplayProps) {
  const isPositive = value >= 0;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl font-semibold",
  };

  return (
    <span
      className={cn(
        "font-mono tabular-nums font-medium",
        sizeClasses[size],
        isPositive ? "text-chart-1" : "text-chart-2",
        className
      )}
    >
      {showSign && (isPositive ? "+" : "")}
      ${Math.abs(value).toFixed(2)}
    </span>
  );
}
