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
import restaurantImage7 from "@assets/07e7d6e1eaec4a279102afb36551479a.webp";
import restaurantImage8 from "@assets/5a82b0703fac4b4b88589c094c5eee43.webp";
import restaurantImage9 from "@assets/a49e06e53a5946eca35727c91bc458c8.webp";
import restaurantImage10 from "@assets/image(10).webp";
import restaurantImage11 from "@assets/image(11).webp";
import restaurantImage12 from "@assets/image(12).webp";
import restaurantImage13 from "@assets/image(13).webp";
import restaurantImage14 from "@assets/130916d63c28497ea9df646321520642.webp";
import restaurantImage15 from "@assets/16d4824735e144a5a782cd59a86f91d2.webp";
import restaurantImage16 from "@assets/174251c0caf347caadd7c4482b3065d1.webp";
import restaurantImage17 from "@assets/1f2d259e3acd43308d2565f39e0cfb55.webp";
import restaurantImage18 from "@assets/3f7a97fbb0e94f5fbf4b5afb407d77ca.webp";
import restaurantImage19 from "@assets/8d8b1776a5e04f5a80b46d4d22a38057.webp";
import restaurantImage20 from "@assets/a96cd2f51a9d40c9bb1f2090ef4b4a94.webp";
import restaurantImage21 from "@assets/dbbb81bd63cb4e93b568cbaede6de4c7.webp";
import restaurantImage22 from "@assets/3f3ca9a0eba141cdb975651cd1baa5d2.webp";
import restaurantImage23 from "@assets/image(1).webp";
import restaurantImage24 from "@assets/image(3).webp";
import restaurantImage25 from "@assets/image(4).webp";
import restaurantImage26 from "@assets/image(6).webp";
import restaurantImage27 from "@assets/image(7).webp";
import restaurantImage28 from "@assets/image(9).webp";
import restaurantImage29 from "@assets/205cd061d566405bac0c406ae7fe6349.webp";
import restaurantImage30 from "@assets/dd5d1b95012d4e2db255074b278675b7.webp";
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
  {
    id: "long-chim",
    name: "لونغ شيم",
    nameEn: "Long Chim",
    cuisine: "مأكولات تايلندية",
    rating: 4.7,
    reviews: 265,
    priceRange: "$$$$",
    image: restaurantImage7,
    location: "مطل البجيري، الدرعية",
    hours: "12:30 م - 11:30 م",
    description: "أطباق تايلندية أصيلة من الشيف ديفيد تومبسون في أجواء فريدة",
    reservationFee: 80,
    featured: true,
  },
  {
    id: "tatel",
    name: "تاتيل",
    nameEn: "TATEL",
    cuisine: "مأكولات إسبانية",
    rating: 4.8,
    reviews: 310,
    priceRange: "$$$$",
    image: restaurantImage8,
    location: "مطل البجيري، الدرعية",
    hours: "01:00 م - 01:00 ص",
    description: "مطعم إسباني فاخر يقدم أطباق البحر المتوسط مع لمسة عصرية",
    reservationFee: 90,
    featured: true,
  },
  {
    id: "hakkasan",
    name: "هاكاسان",
    nameEn: "Hakkasan",
    cuisine: "مأكولات صينية فاخرة",
    rating: 4.9,
    reviews: 380,
    priceRange: "$$$$",
    image: restaurantImage9,
    location: "مطل البجيري، الدرعية",
    hours: "06:00 م - 12:00 ص",
    description: "تجربة طعام صينية عالمية حائزة على نجمة ميشلان",
    reservationFee: 100,
    featured: true,
  },
  {
    id: "villa-mamas",
    name: "فيلا ماماز",
    nameEn: "Villa Mamas",
    cuisine: "مأكولات بحرينية",
    rating: 4.5,
    reviews: 195,
    priceRange: "$$$",
    image: restaurantImage10,
    location: "مطل البجيري، الدرعية",
    hours: "11:00 ص - 11:00 م",
    description: "نكهات خليجية تقليدية بلمسة بحرينية مميزة",
    reservationFee: 60,
  },
  {
    id: "lazurd",
    name: "لازورد",
    nameEn: "Lazurd",
    cuisine: "مأكولات لبنانية",
    rating: 4.6,
    reviews: 240,
    priceRange: "$$$",
    image: restaurantImage11,
    location: "حي البجيري، الدرعية",
    hours: "12:00 م - 12:00 ص",
    description: "أشهى المأكولات اللبنانية التقليدية والمشاوي في أجواء راقية",
    reservationFee: 55,
  },
  {
    id: "takya",
    name: "تكية",
    nameEn: "Takya",
    cuisine: "مأكولات تركية",
    rating: 4.7,
    reviews: 220,
    priceRange: "$$$",
    image: restaurantImage12,
    location: "حي البجيري، الدرعية",
    hours: "10:00 ص - 11:30 م",
    description: "أطباق تركية أصيلة مع خبز طازج ومقبلات شهية",
    reservationFee: 55,
  },
  {
    id: "nusr-et",
    name: "نصرت",
    nameEn: "Nusr-Et",
    cuisine: "ستيك هاوس",
    rating: 4.8,
    reviews: 450,
    priceRange: "$$$$",
    image: restaurantImage13,
    location: "مطل البجيري، الدرعية",
    hours: "01:00 م - 01:00 ص",
    description: "ستيك هاوس شهير عالمياً يقدم أجود أنواع اللحوم المشوية",
    reservationFee: 120,
    featured: true,
  },
  {
    id: "sushi-samba",
    name: "سوشي سامبا",
    nameEn: "Sushi Samba",
    cuisine: "مأكولات يابانية برازيلية",
    rating: 4.6,
    reviews: 198,
    priceRange: "$$$$",
    image: restaurantImage14,
    location: "مطل البجيري، الدرعية",
    hours: "12:00 م - 12:00 ص",
    description: "مزيج فريد من المطبخ الياباني والبرازيلي في أجواء مبهرة",
    reservationFee: 85,
  },
  {
    id: "em-sherif",
    name: "أم شريف",
    nameEn: "Em Sherif",
    cuisine: "مأكولات لبنانية فاخرة",
    rating: 4.7,
    reviews: 275,
    priceRange: "$$$$",
    image: restaurantImage15,
    location: "حي البجيري، الدرعية",
    hours: "12:30 م - 11:30 م",
    description: "مطبخ لبناني فاخر مع أجواء تراثية مستوحاة من بيروت",
    reservationFee: 80,
  },
  {
    id: "coya",
    name: "كويا",
    nameEn: "COYA",
    cuisine: "مأكولات بيروفية",
    rating: 4.5,
    reviews: 187,
    priceRange: "$$$$",
    image: restaurantImage16,
    location: "مطل البجيري، الدرعية",
    hours: "06:00 م - 01:00 ص",
    description: "تجربة أمريكا اللاتينية الفاخرة مع أطباق بيروفية مميزة",
    reservationFee: 85,
  },
  {
    id: "san-carlo",
    name: "سان كارلو",
    nameEn: "San Carlo",
    cuisine: "مأكولات إيطالية",
    rating: 4.6,
    reviews: 230,
    priceRange: "$$$$",
    image: restaurantImage17,
    location: "مطل البجيري، الدرعية",
    hours: "12:00 م - 12:00 ص",
    description: "مطبخ إيطالي عريق بنكهات أصيلة من قلب ميلانو",
    reservationFee: 75,
  },
  {
    id: "zuma",
    name: "زوما",
    nameEn: "Zuma",
    cuisine: "مأكولات يابانية معاصرة",
    rating: 4.9,
    reviews: 390,
    priceRange: "$$$$",
    image: restaurantImage18,
    location: "مطل البجيري، الدرعية",
    hours: "12:30 م - 01:00 ص",
    description: "مطعم ياباني معاصر شهير عالمياً بأطباق الروبياتا والسوشي",
    reservationFee: 100,
    featured: true,
  },
  {
    id: "nozomi",
    name: "نوزومي",
    nameEn: "Nozomi",
    cuisine: "مأكولات يابانية",
    rating: 4.5,
    reviews: 175,
    priceRange: "$$$",
    image: restaurantImage19,
    location: "حي البجيري، الدرعية",
    hours: "01:00 م - 12:00 ص",
    description: "سوشي وساشيمي طازج يومياً مع أجود المكونات المستوردة",
    reservationFee: 70,
  },
  {
    id: "amazonico",
    name: "أمازونيكو",
    nameEn: "Amazonico",
    cuisine: "مأكولات أمريكية لاتينية",
    rating: 4.7,
    reviews: 260,
    priceRange: "$$$$",
    image: restaurantImage20,
    location: "مطل البجيري، الدرعية",
    hours: "12:00 م - 01:00 ص",
    description: "رحلة طعام استوائية مع أجواء غابات الأمازون الساحرة",
    reservationFee: 85,
  },
  {
    id: "cipriani",
    name: "شيبرياني",
    nameEn: "Cipriani",
    cuisine: "مأكولات إيطالية فاخرة",
    rating: 4.8,
    reviews: 320,
    priceRange: "$$$$",
    image: restaurantImage21,
    location: "مطل البجيري، الدرعية",
    hours: "12:00 م - 12:00 ص",
    description: "مطعم إيطالي فاخر من البندقية يقدم باستا وأطباق بحرية مميزة",
    reservationFee: 90,
    featured: true,
  },
  {
    id: "the-maine",
    name: "ذا ماين",
    nameEn: "The Maine",
    cuisine: "مأكولات بحرية",
    rating: 4.6,
    reviews: 210,
    priceRange: "$$$$",
    image: restaurantImage22,
    location: "حي البجيري، الدرعية",
    hours: "12:00 م - 11:30 م",
    description: "أجود المأكولات البحرية الطازجة بأسلوب نيو إنجلاند الأمريكي",
    reservationFee: 80,
  },
  {
    id: "al-mahara",
    name: "المحارة",
    nameEn: "Al Mahara",
    cuisine: "مأكولات بحرية فاخرة",
    rating: 4.7,
    reviews: 245,
    priceRange: "$$$$",
    image: restaurantImage23,
    location: "مطل البجيري، الدرعية",
    hours: "06:00 م - 11:30 م",
    description: "تجربة طعام بحرية فاخرة مع أطباق المحيط الأكثر تميزاً",
    reservationFee: 95,
  },
  {
    id: "bab-al-qasr",
    name: "باب القصر",
    nameEn: "Bab Al Qasr",
    cuisine: "مأكولات عربية فاخرة",
    rating: 4.8,
    reviews: 290,
    priceRange: "$$$$",
    image: restaurantImage24,
    location: "المنطقة التراثية، الدرعية",
    hours: "11:00 ص - 12:00 ص",
    description: "مأكولات عربية فاخرة مستوحاة من قصور الملوك والأمراء",
    reservationFee: 85,
  },
  {
    id: "meraki",
    name: "ميراكي",
    nameEn: "Meraki",
    cuisine: "مأكولات يونانية",
    rating: 4.5,
    reviews: 168,
    priceRange: "$$$",
    image: restaurantImage25,
    location: "حي البجيري، الدرعية",
    hours: "12:00 م - 11:00 م",
    description: "أطباق يونانية تقليدية مع زيت الزيتون والأعشاب المتوسطية",
    reservationFee: 60,
  },
  {
    id: "nobu",
    name: "نوبو",
    nameEn: "Nobu",
    cuisine: "مأكولات يابانية بيروفية",
    rating: 4.9,
    reviews: 420,
    priceRange: "$$$$",
    image: restaurantImage26,
    location: "مطل البجيري، الدرعية",
    hours: "06:00 م - 01:00 ص",
    description: "تجربة الشيف نوبو ماتسوهيسا الشهيرة عالمياً في الدرعية",
    reservationFee: 110,
    featured: true,
  },
  {
    id: "la-petite-maison",
    name: "لابتيت ميزون",
    nameEn: "La Petite Maison",
    cuisine: "مأكولات فرنسية",
    rating: 4.7,
    reviews: 280,
    priceRange: "$$$$",
    image: restaurantImage27,
    location: "مطل البجيري، الدرعية",
    hours: "12:00 م - 12:00 ص",
    description: "مطبخ نيس الفرنسي مع سلطة نيسواز الشهيرة وأطباق كوت دازور",
    reservationFee: 80,
  },
  {
    id: "al-diwan",
    name: "الديوان",
    nameEn: "Al Diwan",
    cuisine: "مأكولات سعودية راقية",
    rating: 4.6,
    reviews: 205,
    priceRange: "$$$",
    image: restaurantImage28,
    location: "المنطقة التراثية، الدرعية",
    hours: "11:00 ص - 11:00 م",
    description: "أطباق سعودية راقية بطريقة تقديم عصرية مع لمسة تراثية",
    reservationFee: 55,
  },
  {
    id: "cafe-bateel",
    name: "مقهى بتيل",
    nameEn: "Café Bateel",
    cuisine: "مقهى فاخر ومعجنات",
    rating: 4.4,
    reviews: 150,
    priceRange: "$$",
    image: restaurantImage29,
    location: "حي البجيري، الدرعية",
    hours: "07:00 ص - 11:00 م",
    description: "قهوة مختصة عالية الجودة مع معجنات فرنسية وحلويات التمر الفاخرة",
    reservationFee: 35,
  },
  {
    id: "urth-caffe",
    name: "أورث كافيه",
    nameEn: "Urth Caffé",
    cuisine: "مقهى عضوي",
    rating: 4.3,
    reviews: 135,
    priceRange: "$$",
    image: restaurantImage30,
    location: "حي الطريف، الدرعية",
    hours: "07:00 ص - 10:00 م",
    description: "مشروبات عضوية ومخبوزات طازجة في بيئة مريحة وعصرية",
    reservationFee: 30,
  },
];

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("الكل");

  const filters = ["الكل", "مميزة", "مأكولات عالمية", "مأكولات سعودية", "مأكولات آسيوية", "مأكولات بحرية", "إيطالي", "مقاهي", "فاخر"];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = !searchQuery || r.name.includes(searchQuery) || r.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.includes(searchQuery);
    if (!matchesSearch) return false;
    if (selectedFilter === "الكل") return true;
    if (selectedFilter === "مميزة") return r.featured === true;
    if (selectedFilter === "مقاهي") return r.cuisine.includes("مقهى");
    if (selectedFilter === "فاخر") return r.priceRange === "$$$$";
    if (selectedFilter === "مأكولات آسيوية") return r.cuisine.includes("يابان") || r.cuisine.includes("صيني") || r.cuisine.includes("تايل");
    if (selectedFilter === "مأكولات بحرية") return r.cuisine.includes("بحري");
    if (selectedFilter === "إيطالي") return r.cuisine.includes("إيطالي");
    if (selectedFilter === "مأكولات سعودية") return r.cuisine.includes("سعودي") || r.cuisine.includes("تراثي") || r.cuisine.includes("عربي");
    if (selectedFilter === "مأكولات عالمية") return r.cuisine.includes("عالمي") || r.cuisine.includes("متوسطي") || r.cuisine.includes("فرنسي") || r.cuisine.includes("إسباني") || r.cuisine.includes("يوناني");
    return true;
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
