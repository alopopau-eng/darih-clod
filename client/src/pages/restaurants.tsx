import { ArrowRight, MapPin, Clock, Star, Users, UtensilsCrossed, Search, Filter, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useState } from "react";

import restaurantImage1 from "@assets/3e1c6b7cc5474e16b3ff667338eb24e3.webp";
import restaurantImage2 from "@assets/46bde65ecfb34a12b9eab27a65e36ba0.webp";
import restaurantImage3 from "@assets/8698e2f2cde0426da313c2497a35d985.webp";
import restaurantImage4 from "@assets/7c1716032679483e8ed8d9fe2486f61e.webp";
import restaurantImage5 from "@assets/81641ba7f7a04ad5898d402d114fff03.webp";
import restaurantImage6 from "@assets/d99d30e08a7044bd930736e6da8cc680.webp";
import heroImage from "@assets/f8aae0c59e0b479b88d5e8ac4dbaa0b2.webp";

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

const restaurants: Restaurant[] = [
  {
    id: "bujairi-terrace",
    name: "مطل البجيري",
    nameEn: "Bujairi Terrace",
    cuisine: "مأكولات عالمية",
    rating: 4.8,
    reviews: 342,
    priceRange: "$$$$",
    image: restaurantImage1,
    location: "حي البجيري، الدرعية",
    hours: "12:00 م - 12:00 ص",
    description: "تجربة طعام فاخرة مع إطلالة ساحرة على حي الطريف التاريخي",
    reservationFee: 75,
    featured: true,
  },
  {
    id: "samhan-kitchen",
    name: "مطبخ سمحان",
    nameEn: "Samhan Kitchen",
    cuisine: "مأكولات سعودية تقليدية",
    rating: 4.6,
    reviews: 218,
    priceRange: "$$$",
    image: restaurantImage2,
    location: "باب سمحان، الدرعية",
    hours: "11:00 ص - 11:00 م",
    description: "أصالة المطبخ السعودي التقليدي بلمسة عصرية",
    reservationFee: 50,
  },
  {
    id: "turaif-cafe",
    name: "مقهى الطريف",
    nameEn: "Turaif Café",
    cuisine: "مقهى ومعجنات",
    rating: 4.5,
    reviews: 156,
    priceRange: "$$",
    image: restaurantImage3,
    location: "حي الطريف، الدرعية",
    hours: "07:00 ص - 10:00 م",
    description: "قهوة مختصة ومعجنات طازجة في أجواء تاريخية فريدة",
    reservationFee: 30,
  },
  {
    id: "nakheel-restaurant",
    name: "مطعم النخيل",
    nameEn: "Al Nakheel",
    cuisine: "مأكولات متوسطية",
    rating: 4.7,
    reviews: 289,
    priceRange: "$$$$",
    image: restaurantImage4,
    location: "واحة النخيل، الدرعية",
    hours: "12:00 م - 01:00 ص",
    description: "نكهات البحر الأبيض المتوسط في قلب الدرعية",
    reservationFee: 75,
    featured: true,
  },
  {
    id: "waha-lounge",
    name: "صالة الواحة",
    nameEn: "Al Waha Lounge",
    cuisine: "مأكولات شرقية",
    rating: 4.4,
    reviews: 178,
    priceRange: "$$$",
    image: restaurantImage5,
    location: "منطقة الترفيه، الدرعية",
    hours: "04:00 م - 02:00 ص",
    description: "أجواء شرقية ساحرة مع قائمة طعام متنوعة",
    reservationFee: 50,
  },
  {
    id: "heritage-house",
    name: "بيت التراث",
    nameEn: "Heritage House",
    cuisine: "مأكولات تراثية",
    rating: 4.9,
    reviews: 412,
    priceRange: "$$$$",
    image: restaurantImage6,
    location: "المنطقة التراثية، الدرعية",
    hours: "11:00 ص - 12:00 ص",
    description: "رحلة عبر الزمن مع أشهى الأطباق التراثية السعودية",
    reservationFee: 100,
    featured: true,
  },
];

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("الكل");

  const filters = ["الكل", "مأكولات عالمية", "مأكولات سعودية", "مقاهي", "فاخر"];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = r.name.includes(searchQuery) || r.cuisine.includes(searchQuery);
    if (selectedFilter === "الكل") return matchesSearch;
    if (selectedFilter === "مقاهي") return matchesSearch && r.cuisine.includes("مقهى");
    if (selectedFilter === "فاخر") return matchesSearch && r.priceRange === "$$$$";
    return matchesSearch && r.cuisine.includes(selectedFilter.replace("مأكولات ", ""));
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#f5f0e8]" dir="rtl">
      <Header />
      <HeroSection />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterTabs filters={filters} selected={selectedFilter} onSelect={setSelectedFilter} />
      <main className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <FeaturedSection restaurants={filteredRestaurants.filter(r => r.featured)} />
          <AllRestaurants restaurants={filteredRestaurants} />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#2a1f16] via-[#3d3428] to-[#2a1f16] text-white shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 transition-all" data-testid="button-back">
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

function HeroSection() {
  return (
    <div className="relative h-64 overflow-hidden">
      <img src={heroImage} alt="مطاعم الدرعية" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      <div className="absolute bottom-6 right-6 left-6 text-right">
        <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
          <UtensilsCrossed className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">المطاعم والمقاهي</span>
        </div>
        <h1 className="text-white text-3xl font-bold drop-shadow-lg">
          مطاعم الدرعية
        </h1>
        <p className="text-white/80 text-sm mt-2">اكتشف أفخم تجارب الطعام في قلب التاريخ</p>
      </div>
    </div>
  );
}

function SearchBar({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (q: string) => void }) {
  return (
    <div className="px-4 -mt-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن مطعم أو نوع مأكولات..."
            className="pr-12 h-14 rounded-2xl border-2 border-white/80 bg-white shadow-xl text-base focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

function FilterTabs({ filters, selected, onSelect }: { filters: string[]; selected: string; onSelect: (f: string) => void }) {
  return (
    <div className="px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selected === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(filter)}
              className={`rounded-full px-5 whitespace-nowrap transition-all ${
                selected === filter
                  ? "bg-primary text-white shadow-glow"
                  : "bg-white hover:bg-primary/10"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedSection({ restaurants }: { restaurants: Restaurant[] }) {
  if (restaurants.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-primary fill-primary" />
        <h2 className="text-xl font-bold text-foreground">مميزة</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map((restaurant) => (
          <FeaturedRestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}

function FeaturedRestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const handleSelect = () => {
    localStorage.setItem("reservationType", "restaurant");
    localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
  };

  return (
    <Link href="/registration" onClick={handleSelect}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
        <div className="relative h-48">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-white" />
              {restaurant.rating}
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full">
              {restaurant.priceRange}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 left-4">
            <h3 className="text-white font-bold text-xl drop-shadow-lg">{restaurant.name}</h3>
            <p className="text-white/80 text-sm mt-1">{restaurant.cuisine}</p>
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{restaurant.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {restaurant.location}
              </span>
            </div>
            <div className="flex items-center gap-1 text-primary font-bold text-sm">
              <span>احجز الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function AllRestaurants({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <UtensilsCrossed className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">جميع المطاعم</h2>
        <span className="text-muted-foreground text-sm">({restaurants.length})</span>
      </div>
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {restaurants.length === 0 && (
        <div className="text-center py-12">
          <UtensilsCrossed className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">لم يتم العثور على نتائج</p>
        </div>
      )}
    </section>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const handleSelect = () => {
    localStorage.setItem("reservationType", "restaurant");
    localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
  };

  return (
    <Link href="/registration" onClick={handleSelect}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
        <div className="flex gap-4 p-4">
          <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-foreground text-base">{restaurant.name}</h3>
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                  <Star className="w-3 h-3 text-primary fill-primary" />
                  <span className="text-xs font-bold text-primary">{restaurant.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-1">{restaurant.cuisine}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {restaurant.hours}
                </span>
              </div>
              <span className="text-primary font-bold text-sm">{restaurant.reservationFee} ر.س</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function FooterSection() {
  return (
    <footer className="bg-gradient-to-b from-[#3d3428] to-[#2a241c] text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <img src="/logo-white.svg" alt="الدرعية" className="h-12 mx-auto mb-3 opacity-80" />
        <p className="text-white/50 text-sm">مطاعم ومقاهي الدرعية</p>
        <p className="text-white/30 text-xs mt-2">حقوق النشر 2025. جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}
