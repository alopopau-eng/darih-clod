import { ArrowRight, ChevronDown, Calendar, Clock, Users, UtensilsCrossed, Info, Star, MapPin, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { handleCurrentPage } from "@/lib/firebase";

interface Restaurant {
  id: string;
  name: string;
  nameEn: string;
  cuisine: string;
  rating: number;
  reviews: number;
  priceRange: string;
  image: string;
  location: string;
  hours: string;
  description: string;
  reservationFee: number;
  featured?: boolean;
}

export default function RestaurantBookingPage() {
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");
  const [specialRequest, setSpecialRequest] = useState("");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    handleCurrentPage("restaurant_booking");
    const stored = localStorage.getItem("selectedRestaurant");
    if (stored) {
      setRestaurant(JSON.parse(stored));
    }
  }, []);

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
    "21:00", "21:30", "22:00", "22:30"
  ];

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "10", "12"];

  const reservationFee = restaurant?.reservationFee || 75;
  const guestsNum = parseInt(guests) || 2;
  const totalFee = reservationFee * guestsNum;
  const vat = totalFee * 0.15;
  const grandTotal = totalFee + vat;

  const handleConfirmBooking = () => {
    const bookingData = {
      restaurantId: restaurant?.id,
      restaurantName: restaurant?.name,
      date: date?.toISOString(),
      time,
      guests,
      specialRequest,
      reservationFee: totalFee,
      vat: vat,
      totalAmount: grandTotal,
      reservationType: "restaurant",
    };
    localStorage.setItem("restaurantBookingData", JSON.stringify(bookingData));
    setLocation("/restaurant-cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#f5f0e8] flex flex-col" dir="rtl">
      <Header />
      <main className="flex-1 pb-8">
        {restaurant && <RestaurantHeader restaurant={restaurant} />}
        <ProgressSteps />
        <BookingForm
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          guests={guests}
          setGuests={setGuests}
          specialRequest={specialRequest}
          setSpecialRequest={setSpecialRequest}
          timeSlots={timeSlots}
          guestOptions={guestOptions}
        />
        <PricingSummary
          reservationFee={reservationFee}
          guestsNum={guestsNum}
          totalFee={totalFee}
          vat={vat}
          grandTotal={grandTotal}
        />
        <div className="px-4 mt-6">
          <div className="max-w-md mx-auto space-y-3">
            <Button
              size="lg"
              className="w-full bg-primary text-white shadow-lg text-base h-14"
              onClick={handleConfirmBooking}
            >
              تأكيد الحجز ومتابعة الدفع
            </Button>
            <Link href="/restaurants">
              <Button variant="outline" size="lg" className="w-full h-12">
                إلغاء
              </Button>
            </Link>
          </div>
        </div>
        <TermsSection />
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2a1f16] via-[#3d3428] to-[#2a1f16] text-white shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/restaurants">
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

function RestaurantHeader({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="relative h-44 overflow-hidden">
      <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute bottom-4 right-4 left-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            {restaurant.rating}
          </div>
          <span className="text-white/70 text-xs">{restaurant.cuisine}</span>
        </div>
        <h1 className="text-white text-2xl font-bold drop-shadow-lg">{restaurant.name}</h1>
        <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
          <MapPin className="w-3 h-3" />
          {restaurant.location}
        </div>
      </div>
    </div>
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
                  step.number <= 2
                    ? "bg-gradient-to-br from-[#d4a574] to-[#c4956a] text-white shadow-lg"
                    : "bg-white/60 text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <span className={`text-xs mt-2 font-medium ${step.number <= 2 ? "text-primary" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
            {index < arr.length - 1 && (
              <div
                className={`w-10 h-1 mx-1 rounded-full ${
                  step.number < 2 ? "bg-gradient-to-r from-[#d4a574] to-[#c4956a]" : "bg-white/40"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingForm({
  date, setDate, time, setTime, guests, setGuests, specialRequest, setSpecialRequest, timeSlots, guestOptions,
}: {
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  time: string;
  setTime: (t: string) => void;
  guests: string;
  setGuests: (g: string) => void;
  specialRequest: string;
  setSpecialRequest: (s: string) => void;
  timeSlots: string[];
  guestOptions: string[];
}) {
  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-[#d4a574] rounded-full flex items-center justify-center mx-auto mb-3 shadow-glow">
            <UtensilsCrossed className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">تفاصيل الحجز</h2>
          <p className="text-muted-foreground text-sm mt-1">اختر التاريخ والوقت وعدد الضيوف</p>
        </div>

        <div className="space-y-5">
          {/* Date */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              تاريخ الحجز *
            </Label>
            <Input
              type="date"
              value={date ? date.toISOString().split('T')[0] : ''}
              onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full text-center h-12 rounded-xl border-2 focus:border-primary"
            />
            {date && (
              <div className="text-center mt-2 p-2.5 bg-primary/10 rounded-xl">
                <p className="text-sm text-primary font-medium">
                  {date.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            )}
          </div>

          {/* Time */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              وقت الحجز *
            </Label>
            <div className="relative">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-input bg-background text-foreground appearance-none text-center font-medium focus:border-primary focus:outline-none"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Guests */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              عدد الضيوف *
            </Label>
            <div className="relative">
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-input bg-background text-foreground appearance-none text-center font-medium focus:border-primary focus:outline-none"
              >
                {guestOptions.map((g) => (
                  <option key={g} value={g}>
                    {g} {parseInt(g) === 1 ? "ضيف" : parseInt(g) <= 10 ? "ضيوف" : "ضيف"}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Special Request */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              طلبات خاصة (اختياري)
            </Label>
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="مثال: طاولة خارجية، مناسبة خاصة..."
              className="w-full h-24 px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground resize-none focus:border-primary focus:outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSummary({
  reservationFee, guestsNum, totalFee, vat, grandTotal,
}: {
  reservationFee: number;
  guestsNum: number;
  totalFee: number;
  vat: number;
  grandTotal: number;
}) {
  return (
    <section className="px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground text-lg">ملخص الحجز</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground text-sm">رسوم الحجز للشخص</span>
            <span className="font-medium text-foreground">{reservationFee} ر.س</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground text-sm">عدد الضيوف</span>
            <span className="font-medium text-foreground">{guestsNum}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground text-sm">المجموع الفرعي</span>
            <span className="font-medium text-foreground">{totalFee} ر.س</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground text-sm">ضريبة القيمة المضافة (15%)</span>
            <span className="font-medium text-foreground">{vat.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-primary/20">
            <span className="font-bold text-foreground text-lg">المجموع الكلي</span>
            <span className="font-bold text-primary text-2xl">{grandTotal.toFixed(2)} ر.س</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TermsSection() {
  return (
    <section className="px-4 py-6 max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">سياسة الحجز</h3>
        </div>
        <div className="text-sm text-muted-foreground space-y-2.5 leading-relaxed">
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            يلزم الحضور في الموعد المحدد. التأخر أكثر من 15 دقيقة قد يؤدي لإلغاء الحجز.
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            رسوم الحجز غير قابلة للاسترداد ولكن يتم خصمها من فاتورة المطعم.
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            يمكن إلغاء الحجز قبل 24 ساعة من الموعد دون رسوم.
          </p>
          <p className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            يحظر إعادة بيع الحجوزات أو تحويلها لأشخاص آخرين.
          </p>
        </div>
      </div>
    </section>
  );
}
