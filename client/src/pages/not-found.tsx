import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#f5f0e8] flex items-center justify-center p-4" dir="rtl">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-[#d4a574]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">٤٠٤</h1>
        <h2 className="text-xl font-bold text-foreground mb-2">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link href="/">
          <Button size="lg" className="bg-primary text-white px-8 shadow-lg gap-2">
            <Home className="w-5 h-5" />
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
