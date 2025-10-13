import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const statusConfig = {
  pending: { variant: "secondary" as const, label: "Pending", color: "text-chart-4" },
  filled: { variant: "secondary" as const, label: "Filled", color: "text-chart-1" },
  partial: { variant: "secondary" as const, label: "Partial", color: "text-chart-4" },
  cancelled: { variant: "secondary" as const, label: "Cancelled", color: "text-muted-foreground" },
  rejected: { variant: "secondary" as const, label: "Rejected", color: "text-chart-2" },
  approved: { variant: "secondary" as const, label: "Approved", color: "text-chart-1" },
  processing: { variant: "secondary" as const, label: "Processing", color: "text-chart-3" },
  completed: { variant: "secondary" as const, label: "Completed", color: "text-chart-1" },
  under_review: { variant: "secondary" as const, label: "Under Review", color: "text-chart-4" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    variant: "secondary" as const,
    label: status,
    color: "text-foreground",
  };

  return (
    <Badge variant={config.variant} className={cn(config.color, className)}>
      {config.label}
    </Badge>
  );
}
