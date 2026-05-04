import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/business/login")({
  head: () => ({ meta: [{ title: "Business login — VangoRide" }] }),
  component: BusinessLogin,
});

function BusinessLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ops@acme.co");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:block relative map-grid">
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <Logo className="mb-auto" />
          <h2 className="font-display text-4xl font-bold max-w-md">
            Dispatch a van in<br /><span className="text-primary">under 60 seconds.</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md">Built for ops teams who move parcels every hour.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Logo className="mb-10 lg:hidden" />
          <h1 className="font-display text-3xl font-bold mb-2">Sign in</h1>
          <p className="text-muted-foreground mb-8">Welcome back to your dashboard.</p>

          <label className="block mb-4">
            <span className="text-xs text-muted-foreground">Email</span>
            <div className="relative mt-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none"
              />
            </div>
          </label>

          <label className="block mb-6">
            <span className="text-xs text-muted-foreground">Password</span>
            <div className="relative mt-1">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary outline-none"
              />
            </div>
          </label>

          <button
            onClick={() => navigate({ to: "/business" })}
            className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow flex items-center justify-center gap-2"
          >
            Sign in <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
