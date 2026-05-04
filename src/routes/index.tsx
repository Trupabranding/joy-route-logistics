import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Truck, Briefcase, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VangoRide — Same-day van delivery, dispatched in seconds" },
      { name: "description", content: "On-demand van delivery for businesses. Request, match, deliver, track — in one place." },
      { property: "og:title", content: "VangoRide — Same-day van delivery" },
      { property: "og:description", content: "On-demand van delivery for businesses." },
    ],
  }),
  component: Index,
});

const PORTALS = [
  {
    to: "/driver/login" as const,
    icon: Truck,
    title: "Driver",
    desc: "Go online, accept jobs, track earnings.",
    cta: "Open driver app",
  },
  {
    to: "/business/login" as const,
    icon: Briefcase,
    title: "Business",
    desc: "Create deliveries, dispatch, monitor live.",
    cta: "Open dashboard",
  },
  {
    to: "/track/VR-2841" as const,
    icon: MapPin,
    title: "Customer",
    desc: "Track your delivery — no login needed.",
    cta: "View tracking demo",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <Logo />
        <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#portals" className="hover:text-foreground transition-colors">Portals</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs text-muted-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              MVP prototype • frontend only
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6">
              Vans on demand.<br />
              <span className="text-primary">Dispatched in seconds.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              The full delivery loop — request, match, deliver, track — built for businesses,
              drivers, and the people receiving the parcel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/business/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-90 transition"
              >
                Try business dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/driver/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border font-medium hover:bg-accent transition"
              >
                Open driver app
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] map-grid rounded-3xl border border-border shadow-elevated relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="map-route" d="M 15 20 Q 50 30, 55 55 T 85 85" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="absolute top-6 left-6 px-3 py-2 rounded-lg bg-surface border border-border text-xs">
                <div className="text-muted-foreground">Pickup</div>
                <div className="font-medium">Soho</div>
              </div>
              <div className="absolute bottom-6 right-6 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs shadow-glow">
                <div className="opacity-70">Dropoff</div>
                <div className="font-medium">Camden</div>
              </div>
              <div className="absolute" style={{ left: "55%", top: "55%", transform: "translate(-50%,-50%)" }}>
                <div className="relative pulse-dot h-5 w-5 rounded-full bg-primary border-2 border-background shadow-glow" />
              </div>
              <div className="absolute bottom-6 left-6 right-24 p-4 rounded-xl bg-surface/90 backdrop-blur border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">ETA</span>
                  <span className="text-xs text-primary">Live</span>
                </div>
                <div className="font-display text-2xl font-bold">12 min</div>
              </div>
            </div>
          </div>
        </section>

        <section id="portals" className="mt-32">
          <h2 className="font-display text-3xl font-bold mb-2">Three portals. One loop.</h2>
          <p className="text-muted-foreground mb-8">Pick a perspective to explore.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {PORTALS.map(({ to, icon: Icon, title, desc, cta }) => (
              <Link
                key={to}
                to={to}
                className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/40 transition shadow-elevated"
              >
                <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <div className="text-sm text-primary inline-flex items-center gap-1">
                  {cta} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 VangoRide</span>
          <span>Frontend prototype • Mock data</span>
        </div>
      </footer>
    </div>
  );
}
