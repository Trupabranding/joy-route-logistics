import { createFileRoute } from "@tanstack/react-router";
import { StatusBadge } from "@/components/StatusBadge";
import { mockDeliveries } from "@/lib/mockData";

export const Route = createFileRoute("/business/history")({
  head: () => ({ meta: [{ title: "Delivery history — VangoRide Business" }] }),
  component: History,
});

function History() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl">
      <h1 className="font-display text-3xl font-bold mb-1">Delivery history</h1>
      <p className="text-muted-foreground mb-8">All past deliveries from your account.</p>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background/40 text-muted-foreground text-xs">
            <tr>
              <th className="text-left px-5 py-3 font-medium">ID</th>
              <th className="text-left px-5 py-3 font-medium">Recipient</th>
              <th className="text-left px-5 py-3 font-medium">Route</th>
              <th className="text-left px-5 py-3 font-medium">Time</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[...mockDeliveries, ...mockDeliveries].map((d, i) => (
              <tr key={i} className="border-t border-border hover:bg-accent/30">
                <td className="px-5 py-3 font-mono text-xs">{d.id}</td>
                <td className="px-5 py-3">{d.recipient}</td>
                <td className="px-5 py-3 text-muted-foreground">{d.from} → {d.to}</td>
                <td className="px-5 py-3 text-muted-foreground">{d.time}</td>
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
