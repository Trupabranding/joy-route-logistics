import { cn } from "@/lib/utils";

type Status = "pending" | "accepted" | "picked_up" | "in_transit" | "delivered" | "online" | "offline" | "busy";

const STYLES: Record<Status, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  accepted: "bg-primary/15 text-primary border-primary/30",
  picked_up: "bg-primary/15 text-primary border-primary/30",
  in_transit: "bg-primary/20 text-primary border-primary/40",
  delivered: "bg-success/15 text-success border-success/30",
  online: "bg-success/15 text-success border-success/30",
  offline: "bg-muted text-muted-foreground border-border",
  busy: "bg-warning/15 text-warning border-warning/30",
};

const LABELS: Record<Status, string> = {
  pending: "Pending",
  accepted: "Accepted",
  picked_up: "Picked Up",
  in_transit: "In Transit",
  delivered: "Delivered",
  online: "Online",
  offline: "Offline",
  busy: "Busy",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STYLES[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </span>
  );
}
