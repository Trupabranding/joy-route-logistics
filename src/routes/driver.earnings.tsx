import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { mockEarnings } from "@/lib/mockData";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/driver/earnings")({
  head: () => ({ meta: [{ title: "Earnings — VangoRide" }] }),
  component: Earnings,
});

function Earnings() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto px-5 py-6 pb-12">
      <button onClick={() => navigate({ to: "/driver" })} className="text-sm text-muted-foreground mb-6">← Back</button>

      <h1 className="font-display text-3xl font-bold mb-1">Earnings</h1>
      <p className="text-muted-foreground text-sm mb-6">Today's summary</p>

      <div className="rounded-2xl gradient-primary text-primary-foreground p-6 shadow-glow mb-6">
        <div className="text-sm opacity-80">Today</div>
        <div className="font-display text-5xl font-bold mt-1">£{mockEarnings.today.toFixed(2)}</div>
        <div className="flex items-center gap-2 mt-3 text-sm opacity-90">
          <TrendingUp className="h-4 w-4" /> +18% vs. yesterday
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="text-xs text-muted-foreground">Trips</div>
          <div className="font-display text-2xl font-bold">{mockEarnings.trips}</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="text-xs text-muted-foreground">Online</div>
          <div className="font-display text-2xl font-bold">{mockEarnings.online}</div>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold mb-3">Recent trips</h2>
      <div className="space-y-2">
        {mockEarnings.history.map((t) => (
          <div key={t.id} className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{t.from} → {t.to}</div>
              <div className="text-xs text-muted-foreground">{t.id} • {t.time}</div>
            </div>
            <div className="font-display font-bold">£{t.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
