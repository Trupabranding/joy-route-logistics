import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { StatusBadge } from "@/components/StatusBadge";
import { mockDeliveries, mockDriver } from "@/lib/mockData";
import { Plus, Package, Truck, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/business/")({
  head: () => ({ meta: [{ title: "Dashboard — VangoRide Business" }] }),
  component: BusinessDashboard,
});

function BusinessDashboard() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Good afternoon, Acme.</h1>
          <p className="text-muted-foreground">Live operations overview.</p>
        </div>
        <Link
          to="/business/create"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow"
        >
          <Plus className="h-4 w-4" /> Create delivery
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPI icon={<Package />} label="Active" value="3" tone="primary" />
        <KPI icon={<Truck />} label="In transit" value="2" />
        <KPI icon={<CheckCircle2 />} label="Delivered today" value="14" />
        <KPI icon={<Clock />} label="Avg. ETA" value="22m" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Live tracking</div>
              <div className="font-display text-lg font-semibold">VR-2841 → Camden</div>
            </div>
            <StatusBadge status="in_transit" />
          </div>
          <MapPlaceholder className="h-80 m-5 rounded-xl" />
        </div>

        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="text-xs text-muted-foreground mb-4">Driver assigned</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center font-bold">MC</div>
            <div>
              <div className="font-medium">{mockDriver.name}</div>
              <div className="text-xs text-muted-foreground">★ {mockDriver.rating} • {mockDriver.vehicle}</div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Plate</span><span>{mockDriver.plate}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>{mockDriver.phone}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">ETA</span><span className="text-primary font-medium">12 min</span></div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="font-display text-lg font-semibold">Recent deliveries</div>
          <Link to="/business/history" className="text-sm text-primary">View all →</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-background/40 text-muted-foreground text-xs">
            <tr>
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Recipient</th>
              <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Route</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockDeliveries.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="px-5 py-3 font-mono text-xs">{d.id}</td>
                <td className="px-5 py-3">{d.recipient}</td>
                <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{d.from} → {d.to}</td>
                <td className="px-5 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-5 py-3 text-right font-medium">£{d.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KPI({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone?: "primary" }) {
  return (
    <div className={`rounded-2xl p-5 border ${tone === "primary" ? "gradient-primary text-primary-foreground border-transparent shadow-glow" : "bg-surface border-border"}`}>
      <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 [&_svg]:h-4 [&_svg]:w-4 ${tone === "primary" ? "bg-primary-foreground/20" : "bg-accent"}`}>
        {icon}
      </div>
      <div className={`text-xs ${tone === "primary" ? "opacity-80" : "text-muted-foreground"}`}>{label}</div>
      <div className="font-display text-3xl font-bold mt-1">{value}</div>
    </div>
  );
}
