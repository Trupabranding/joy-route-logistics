import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { mockDriver, mockJob } from "@/lib/mockData";
import { Phone, MessageCircle, Check } from "lucide-react";

export const Route = createFileRoute("/track/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Tracking ${params.id} — VangoRide` },
      { name: "description", content: `Live tracking for delivery ${params.id}.` },
    ],
  }),
  component: TrackPage,
});

const TIMELINE = [
  { label: "Order placed", time: "14:02", done: true },
  { label: "Driver accepted", time: "14:05", done: true },
  { label: "Picked up", time: "14:18", done: true },
  { label: "In transit", time: "14:22", done: true, current: true },
  { label: "Delivered", time: "—", done: false },
];

function TrackPage() {
  const { id } = Route.useParams();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="text-xs text-muted-foreground font-mono">#{id}</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <div>
          <div className="mb-5">
            <div className="text-xs text-muted-foreground">Your delivery is</div>
            <h1 className="font-display text-4xl font-bold">Arriving in <span className="text-primary">12 min</span></h1>
          </div>
          <MapPlaceholder className="h-[55vh]" pickupLabel={mockJob.pickup.split(",")[0]} dropoffLabel={mockJob.dropoff.split(",")[0]} />
        </div>

        <aside className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-5">
            <div className="text-xs text-muted-foreground mb-3">Your driver</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold text-lg">MC</div>
              <div>
                <div className="font-display font-semibold text-lg">{mockDriver.name}</div>
                <div className="text-xs text-muted-foreground">★ {mockDriver.rating} • {mockDriver.vehicle}</div>
                <div className="text-xs text-muted-foreground font-mono mt-0.5">{mockDriver.plate}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href={`tel:${mockDriver.phone}`} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background border border-border text-sm font-medium">
                <Phone className="h-4 w-4" /> Call
              </a>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background border border-border text-sm font-medium">
                <MessageCircle className="h-4 w-4" /> Message
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5">
            <div className="text-xs text-muted-foreground mb-4">Status</div>
            <ol className="space-y-4">
              {TIMELINE.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="relative">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      step.done ? "bg-primary text-primary-foreground" : "bg-background border border-border"
                    }`}>
                      {step.done && <Check className="h-3.5 w-3.5" />}
                    </div>
                    {i < TIMELINE.length - 1 && (
                      <div className={`absolute left-1/2 top-6 -translate-x-1/2 w-px h-6 ${step.done ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className={`text-sm ${step.current ? "font-semibold text-primary" : step.done ? "" : "text-muted-foreground"}`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{step.time}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5 text-sm">
            <div className="text-xs text-muted-foreground mb-1">Delivering to</div>
            <div className="font-medium">{mockJob.recipient}</div>
            <div className="text-muted-foreground text-xs mt-1">{mockJob.dropoff}</div>
          </div>
        </aside>
      </main>
    </div>
  );
}
