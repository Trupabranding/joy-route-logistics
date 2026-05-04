import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/driver/login")({
  head: () => ({ meta: [{ title: "Driver login — VangoRide" }] }),
  component: DriverLogin,
});

function DriverLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 3) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background px-6 py-8 max-w-md mx-auto">
      <Logo />
      <div className="flex-1 flex flex-col justify-center">
        {step === "phone" ? (
          <>
            <h1 className="font-display text-3xl font-bold mb-2">Welcome, driver.</h1>
            <p className="text-muted-foreground mb-8">Enter your phone to receive a one-time code.</p>
            <div className="relative mb-6">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900 000"
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-surface border border-border focus:border-primary outline-none transition"
              />
            </div>
            <button
              onClick={() => setStep("otp")}
              disabled={phone.length < 6}
              className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow disabled:opacity-40 disabled:shadow-none flex items-center justify-center gap-2"
            >
              Send code <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl font-bold mb-2">Enter the code</h1>
            <p className="text-muted-foreground mb-8">We sent a 4-digit code to {phone || "your phone"}.</p>
            <div className="flex gap-3 mb-6">
              {otp.map((v, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={v}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  maxLength={1}
                  inputMode="numeric"
                  className="w-full aspect-square text-center text-2xl font-display font-bold rounded-xl bg-surface border border-border focus:border-primary outline-none"
                />
              ))}
            </div>
            <button
              onClick={() => navigate({ to: "/driver" })}
              className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow flex items-center justify-center gap-2"
            >
              Verify & continue <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => setStep("phone")} className="mt-4 text-sm text-muted-foreground hover:text-foreground">
              ← Change number
            </button>
          </>
        )}
      </div>
    </div>
  );
}
