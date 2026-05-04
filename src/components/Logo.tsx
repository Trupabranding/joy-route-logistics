import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary-foreground">
          <path d="M3 17h2l1-4h12l1 4h2v-6l-2-5H5L3 11v6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="7.5" cy="17.5" r="1.5" fill="currentColor" />
          <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <span className="font-display text-lg font-bold tracking-tight">
        Vango<span className="text-primary">Ride</span>
      </span>
    </div>
  );
}
