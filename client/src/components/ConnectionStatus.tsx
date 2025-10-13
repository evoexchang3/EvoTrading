import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type ConnectionStatusProps = {
  status: "connected" | "reconnecting" | "disconnected";
  className?: string;
};

export function ConnectionStatus({ status, className }: ConnectionStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Circle
        className={cn("h-2 w-2 fill-current", {
          "text-chart-1": status === "connected",
          "text-chart-4": status === "reconnecting",
          "text-chart-2": status === "disconnected",
        })}
      />
      <span className="text-xs text-muted-foreground">
        {status === "connected" && "Live"}
        {status === "reconnecting" && "Reconnecting..."}
        {status === "disconnected" && "Disconnected"}
      </span>
    </div>
  );
}
