import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { mockJob } from "@/lib/mockData";
import { MapPin, Navigation, DollarSign, Wallet, X, Check } from "lucide-react";

export const Route = createFileRoute("/driver/")({
  head: () => ({ meta: [{ title: "Driver — VangoRide" }] }),
  component: DriverHome,
});

function DriverHome() {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);
  const [jobOpen, setJobOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24 max-w-md mx-auto">
      <header className="px-5 pt-6 pb-4 flex items-center justify-between">
        <Logo />
        <StatusBadge status={online ? (jobOpen ? "busy" : "online") : "offline"} />
      </header>

      <div className="px-5">
        <MapPlaceholder className="h-[55vh] mb-4" pickupLabel="You" dropoffLabel="Hot zone" />

        {/* Online toggle */}
        <button
          onClick={() => setOnline(!online)}
          className={`w-full py-4 rounded-2xl font-medium transition-all ${
            online
              ? "bg-surface border border-border hover:bg-accent"
              : "gradient-primary text-primary-foreground shadow-glow"
          }`}
        >
          {online ? "Go offline" : "Go online"}
        </button>

        {online && !jobOpen && (
          <button
            onClick={() => setJobOpen(true)}
            className="mt-3 w-full py-3 rounded-xl bg-warning/10 border border-warning/30 text-warning text-sm font-medium"
          >
            Simulate incoming job →
          </button>
        )}

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat label="Today" value="£142" />
          <Stat label="Trips" value="7" />
          <Stat label="Online" value="5h 12m" />
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-surface/95 backdrop-blur border-t border-border">
        <div className="grid grid-cols-3">
          <NavItem active icon={<Navigation className="h-5 w-5" />} label="Drive" />
          <NavItem icon={<Wallet className="h-5 w-5" />} label="Earnings" onClick={() => navigate({ to: "/driver/earnings" })} />
          <NavItem icon={<MapPin className="h-5 w-5" />} label="Profile" />
        </div>
      </nav>

      {/* Incoming job sheet */}
      {jobOpen && (
        <div className="fixed inset-0 bg-background/70 backdrop-blur-sm z-50 flex items-end" onClick={() => setJobOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto bg-surface rounded-t-3xl border-t border-border shadow-elevated p-6 animate-in slide-in-from-bottom duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-muted-foreground">New delivery request</div>
                <div className="font-display text-2xl font-bold">{mockJob.id}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Estimated</div>
                <div className="font-display text-2xl font-bold text-primary">£{mockJob.price.toFixed(2)}</div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <Row icon={<div className="h-2.5 w-2.5 rounded-full bg-foreground" />} label="Pickup" value={mockJob.pickup} />
              <div className="ml-1 h-4 w-px bg-border" />
              <Row icon={<div className="h-2.5 w-2.5 rounded-full bg-primary" />} label="Dropoff" value={mockJob.dropoff} />
            </div>

            <div className="flex items-center justify-between text-sm bg-background rounded-xl px-4 py-3 mb-5">
              <span className="text-muted-foreground">{mockJob.distanceKm} km</span>
              <span className="text-muted-foreground">~{mockJob.durationMin} min</span>
              <span className="text-muted-foreground">{mockJob.itemDescription}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setJobOpen(false)}
                className="py-4 rounded-xl bg-background border border-border font-medium flex items-center justify-center gap-2"
              >
                <X className="h-4 w-4" /> Reject
              </button>
              <button
                onClick={() => navigate({ to: "/driver/trip" })}
                className="py-4 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow flex items-center justify-center gap-2"
              >
                <Check className="h-4 w-4" /> Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-display text-lg font-bold">{value}</div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-3 ${active ? "text-primary" : "text-muted-foreground"}`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-7 w-7 rounded-full bg-background border border-border flex items-center justify-center">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
