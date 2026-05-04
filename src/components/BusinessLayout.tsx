import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { LayoutDashboard, Plus, History, Settings } from "lucide-react";

const NAV = [
  { to: "/business", icon: LayoutDashboard, label: "Overview" },
  { to: "/business/create", icon: Plus, label: "Create delivery" },
  { to: "/business/history", icon: History, label: "History" },
];

export function BusinessLayout() {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 w-60 bg-surface border-r border-border p-5 hidden md:flex flex-col">
        <Logo className="mb-10" />
        <nav className="space-y-1 flex-1">
          {NAV.map(({ to, icon: Icon, label }) => {
            const active = loc.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-foreground text-xs font-medium">AC</div>
          <div>
            <div className="text-foreground font-medium text-sm">Acme Co.</div>
            <div className="text-xs">ops@acme.co</div>
          </div>
        </div>
      </aside>

      {/* Mobile top nav */}
      <header className="md:hidden border-b border-border px-5 py-4 flex items-center justify-between bg-surface">
        <Logo />
        <div className="flex gap-1">
          {NAV.map(({ to, icon: Icon }) => (
            <Link key={to} to={to} className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent">
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </header>

      <main className="md:pl-60">
        <Outlet />
      </main>
    </div>
  );
}
