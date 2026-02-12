import { Link } from "wouter";
import { CheckCircle, Home, Ticket, Calendar, Clock, Download, Share2, UtensilsCrossed, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const isRestaurant = localStorage.getItem("reservationType") === "restaurant";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#f5f0e8] flex flex-col" dir="rtl">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <SuccessMessage isRestaurant={isRestaurant} />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2a1f16] via-[#3d3428] to-[#2a1f16] text-white shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <img
            src="/logo-white.svg"
            alt="الدرعية"
            className="h-10"
            data-testid="img-confirmation-logo"
          />
        </div>
      </div>
    </header>
  );
}

function SuccessMessage({ isRestaurant }: { isRestaurant: boolean }) {
  const bookingNumber = `DIR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const [restaurantData, setRestaurantData] = useState<any>(null);

  useEffect(() => {
    if (isRestaurant) {
      const stored = localStorage.getItem("restaurantBookingData");
      if (stored) setRestaurantData(JSON.parse(stored));
    }
  }, [isRestaurant]);

  return (
    <div className="max-w-md mx-auto text-center animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-scale-in">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-xs font-bold px-4 py-1 rounded-full">
            تم بنجاح
          </div>
        </div>
        
        <div className="space-y-2 pt-4">
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-success-title">
            {isRestaurant ? "تم تأكيد حجز المطعم!" : "تم الحجز بنجاح!"}
          </h1>
          <p className="text-muted-foreground">
            {isRestaurant 
              ? "شكراً لك، تم تأكيد حجز المطعم. سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني."
              : "شكراً لك، تم تأكيد حجزك. سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني."
            }
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#f5f0e8] to-[#ebe3d7] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            {isRestaurant ? (
              <UtensilsCrossed className="w-5 h-5 text-primary" />
            ) : (
              <Ticket className="w-5 h-5 text-primary" />
            )}
            <p className="text-sm text-muted-foreground">رقم الحجز</p>
          </div>
          <p className="text-3xl font-bold text-primary tracking-wider" data-testid="text-booking-number">
            {bookingNumber}
          </p>
          
          {isRestaurant && restaurantData ? (
            <div className="space-y-3 pt-4 border-t border-primary/20">
              {restaurantData.restaurantName && (
                <div className="flex items-center justify-center gap-2 text-foreground">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{restaurantData.restaurantName}</span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-3">
                {restaurantData.date && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs">التاريخ</span>
                    </div>
                    <p className="font-semibold text-foreground text-xs">
                      {new Date(restaurantData.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                )}
                {restaurantData.time && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">الوقت</span>
                    </div>
                    <p className="font-semibold text-foreground text-xs">{restaurantData.time}</p>
                  </div>
                )}
                {restaurantData.guests && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-xs">الضيوف</span>
                    </div>
                    <p className="font-semibold text-foreground text-xs">{restaurantData.guests}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs">التاريخ</span>
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {new Date().toLocaleDateString('ar-SA')}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">الوقت</span>
                </div>
                <p className="font-semibold text-foreground text-sm">09:00</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 py-5 rounded-xl gap-2"
            data-testid="button-download"
          >
            <Download className="w-4 h-4" />
            تحميل
          </Button>
          <Button
            variant="outline"
            className="flex-1 py-5 rounded-xl gap-2"
            data-testid="button-share"
          >
            <Share2 className="w-4 h-4" />
            مشاركة
          </Button>
        </div>

        <Link href="/">
          <Button
            size="lg"
            className="w-full bg-primary text-white shadow-lg gap-2"
            data-testid="button-back-home"
          >
            <Home className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-muted-foreground">
          نتطلع لزيارتك
        </p>
        <p className="text-xs text-muted-foreground/60">
          للاستفسارات: +966 92 002 1727
        </p>
      </div>
    </div>
  );
}
