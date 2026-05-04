import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  className?: string;
  showRoute?: boolean;
  driverPosition?: { x: number; y: number };
  pickupLabel?: string;
  dropoffLabel?: string;
}

export function MapPlaceholder({
  className,
  showRoute = true,
  driverPosition = { x: 50, y: 55 },
  pickupLabel = "Pickup",
  dropoffLabel = "Dropoff",
}: MapPlaceholderProps) {
  return (
    <div className={cn("relative overflow-hidden map-grid rounded-2xl", className)}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {showRoute && (
          <path
            className="map-route"
            d="M 20 25 Q 40 35, 50 50 T 80 80"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Pickup pin */}
      <div className="absolute" style={{ left: "20%", top: "25%", transform: "translate(-50%, -100%)" }}>
        <div className="flex flex-col items-center gap-1">
          <div className="px-2 py-1 rounded-md bg-surface text-xs font-medium border border-border shadow-elevated">
            {pickupLabel}
          </div>
          <div className="h-3 w-3 rounded-full bg-foreground border-2 border-background" />
        </div>
      </div>

      {/* Dropoff pin */}
      <div className="absolute" style={{ left: "80%", top: "80%", transform: "translate(-50%, -100%)" }}>
        <div className="flex flex-col items-center gap-1">
          <div className="px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium shadow-elevated">
            {dropoffLabel}
          </div>
          <div className="h-3 w-3 rounded-full bg-primary border-2 border-background" />
        </div>
      </div>

      {/* Driver dot */}
      <div
        className="absolute"
        style={{ left: `${driverPosition.x}%`, top: `${driverPosition.y}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="relative">
          <div className="pulse-dot relative h-4 w-4 rounded-full bg-primary border-2 border-background shadow-glow" />
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 50%, oklch(0.16 0.012 240 / 0.4))" }} />
    </div>
  );
}
