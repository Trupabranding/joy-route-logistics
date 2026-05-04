import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { StatusBadge } from "@/components/StatusBadge";
import { mockJob } from "@/lib/mockData";
import { Phone, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/driver/trip")({
  head: () => ({ meta: [{ title: "Active trip — VangoRide" }] }),
  component: ActiveTrip,
});

const STAGES = [
  { key: "accepted", label: "Navigate to pickup", cta: "Arrived at pickup" },
  { key: "picked_up", label: "Confirm parcel collected", cta: "Picked up" },
  { key: "in_transit", label: "Heading to dropoff", cta: "Mark delivered" },
  { key: "delivered", label: "Trip complete", cta: "Done" },
] as const;

function ActiveTrip() {
  const navigate = useNavigate();
  const [stageIdx, setStageIdx] = useState(0);
  const stage = STAGES[stageIdx];
  const isComplete = stage.key === "delivered";

  const driverPos = [
    { x: 25, y: 30 },
    { x: 22, y: 28 },
    { x: 55, y: 55 },
    { x: 78, y: 78 },
  ][stageIdx];

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      <div className="relative flex-1">
        <MapPlaceholder
          className="h-[60vh]"
          driverPosition={driverPos}
          pickupLabel="Pickup"
          dropoffLabel="Dropoff"
        />
        <button
          onClick={() => navigate({ to: "/driver" })}
          className="absolute top-5 left-5 h-10 w-10 rounded-full bg-surface/95 backdrop-blur border border-border flex items-center justify-center"
        >
          ←
        </button>
        <div className="absolute top-5 right-5">
          <StatusBadge status={stage.key} />
        </div>
      </div>

      <div className="bg-surface border-t border-border rounded-t-3xl -mt-6 relative z-10 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs text-muted-foreground">Trip {mockJob.id}</div>
            <div className="font-display text-xl font-bold">{stage.label}</div>
          </div>
          <a
            href={`tel:${mockJob.recipientPhone}`}
            className="h-11 w-11 rounded-full bg-background border border-border flex items-center justify-center"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>

        <div className="bg-background rounded-xl p-4 mb-5">
          <div className="text-xs text-muted-foreground">Recipient</div>
          <div className="font-medium">{mockJob.recipient}</div>
          <div className="text-xs text-muted-foreground mt-2">Drop at</div>
          <div className="text-sm">{mockJob.dropoff}</div>
        </div>

        {/* Stage progress */}
        <div className="flex gap-1.5 mb-5">
          {STAGES.map((s, i) => (
            <div
              key={s.key}
              className={`h-1.5 flex-1 rounded-full ${i <= stageIdx ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {!isComplete ? (
          <button
            onClick={() => setStageIdx(stageIdx + 1)}
            className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow flex items-center justify-center gap-2"
          >
            {stage.cta} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => navigate({ to: "/driver" })}
            className="w-full py-4 rounded-xl bg-success text-success-foreground font-medium flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" /> Trip complete — back to home
          </button>
        )}
      </div>
    </div>
  );
}
