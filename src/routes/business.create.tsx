import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Package, Phone, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/business/create")({
  head: () => ({ meta: [{ title: "Create delivery — VangoRide Business" }] }),
  component: CreateDelivery,
});

function CreateDelivery() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [hasEstimate, setHasEstimate] = useState(false);

  const canEstimate = pickup.length > 3 && dropoff.length > 3;

  return (
    <div className="p-6 lg:p-10 max-w-3xl">
      <h1 className="font-display text-3xl font-bold mb-1">Create delivery</h1>
      <p className="text-muted-foreground mb-8">Fill in the details — we'll match a driver instantly.</p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <form className="space-y-5">
          <Field label="Pickup location" icon={<MapPin className="h-4 w-4" />}>
            <input
              value={pickup}
              onChange={(e) => { setPickup(e.target.value); setHasEstimate(false); }}
              placeholder="12 Market Street, Soho"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </Field>

          <Field label="Dropoff location" icon={<MapPin className="h-4 w-4 text-primary" />}>
            <input
              value={dropoff}
              onChange={(e) => { setDropoff(e.target.value); setHasEstimate(false); }}
              placeholder="44 Camden High St, Camden"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </Field>

          <Field label="Item description" icon={<Package className="h-4 w-4" />}>
            <input
              placeholder="2 medium boxes — fragile"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </Field>

          <Field label="Recipient phone" icon={<Phone className="h-4 w-4" />}>
            <input
              placeholder="+44 7700 900 213"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </Field>

          <Field label="Schedule" icon={<Calendar className="h-4 w-4" />}>
            <select className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none appearance-none">
              <option>Send now</option>
              <option>In 30 minutes</option>
              <option>Pick a time…</option>
            </select>
          </Field>

          {!hasEstimate && (
            <button
              type="button"
              onClick={() => setHasEstimate(true)}
              disabled={!canEstimate}
              className="w-full py-3 rounded-xl bg-surface border border-border font-medium disabled:opacity-40"
            >
              Get price estimate
            </button>
          )}
        </form>

        <aside className="space-y-4 lg:sticky lg:top-6 self-start">
          <div className={`rounded-2xl p-5 border transition ${hasEstimate ? "gradient-primary text-primary-foreground border-transparent shadow-glow" : "bg-surface border-border"}`}>
            <div className={`text-xs ${hasEstimate ? "opacity-80" : "text-muted-foreground"}`}>Estimate</div>
            <div className="font-display text-4xl font-bold mt-1">
              {hasEstimate ? "£24.50" : "—"}
            </div>
            <div className={`text-xs mt-2 ${hasEstimate ? "opacity-80" : "text-muted-foreground"}`}>
              {hasEstimate ? "6.4 km • ~18 min • base £6 + £2.80/km" : "Add pickup & dropoff to see pricing"}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate({ to: "/business" })}
            disabled={!hasEstimate}
            className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow disabled:opacity-40 disabled:shadow-none flex items-center justify-center gap-2"
          >
            Dispatch delivery <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="relative mt-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
        {children}
      </div>
    </label>
  );
}
