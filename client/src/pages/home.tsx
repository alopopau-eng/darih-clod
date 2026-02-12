import { Menu, MapPin, Calendar, Clock, ArrowLeft, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import eventImage1 from "@assets/image(15).webp";
import eventImage2 from "@assets/image(17)image(19).webp";
import destinationImage1 from "@assets/455c3dc333504d44bfe63f8258282e15.webp";
import destinationImage2 from "@assets/image(18).webp";
import experienceImage from "@assets/a49e06e53a5946eca35727c91bc458c8.webp";
import experienceAvatar from "@assets/image(5).webp";
import historyImage from "@assets/image(8).webp";
import historyCard1 from "@assets/image(2).webp";
import historyCard2 from "@assets/c39ffb7ab18e440ba076c03243ccdaa1.webp";
import newsImage from "@assets/image(16).webp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main>
        <HeroSection />
        <QuickLinks />
        <EventsSection />
        <ExperienceSection />
        <DestinationsSection />
        <HistorySection />
        <NewsSection />
        <Footer />
      </main>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "الرئيسية", href: "/" },
    { label: "شراء التذاكر", href: "/tickets" },
    { label: "الفعاليات", href: "/tickets" },
    { label: "الوجهات", href: "/tickets" },
    { label: "التجارب", href: "/tickets" },
    { label: "الأخبار", href: "/tickets" },
  ];

  return (
    <>
      <header className="absolute top-0 z-50 left-0 right-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white glass-effect hover:bg-white/20"
                onClick={() => setMenuOpen(true)}
                data-testid="button-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 flex justify-center">
              <img
                src="/logo-white.svg"
                alt="الدرعية"
                className="h-14 my-2 drop-shadow-lg"
                data-testid="img-logo"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white text-xs glass-effect hover:bg-white/20 rounded-full px-4"
                data-testid="button-lang"
              >
                EN
              </Button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100]" data-testid="menu-overlay">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-gradient-to-b from-[#3d3428] to-[#2a241c] text-white shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <img src="/logo-white.svg" alt="الدرعية" className="h-10" />
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
                data-testid="button-close-menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                    <Link href={item.href}>
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-right py-4 px-5 rounded-xl hover:bg-white/10 transition-all duration-300 text-lg font-medium"
                        data-testid={`menu-item-${index}`}
                      >
                        {item.label}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <p className="text-white/50 text-sm text-center">بوابة التاريخ والثقافة</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        document.addEventListener('touchstart', () => {
          video.play();
        }, { once: true });
      });
    }
  }, []);

  return (
    <section
      className="relative h-[100vh] min-h-[600px] overflow-hidden"
      data-testid="section-hero"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        data-testid="video-hero"
      >
        <source
          src="https://assets.diriyah.me/videos/About+Page+DSA.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-20">
        <div className="text-white text-center space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mx-auto">
            <Sparkles className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm font-medium">فعاليات الدرعية</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight"
            data-testid="text-hero-title"
          >
            موسم قلب الدفء بدوي...
          </h2>
          <p className="text-lg opacity-90">٢٠ نوفمبر - ٢٨ فبراير</p>
          <Link href="/tickets">
            <Button
              size="lg"
              className="bg-primary text-white px-10 shadow-glow-lg"
              data-testid="button-buy-tickets"
            >
              احجز تذكرة الدخول
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function QuickLinks() {
  const links = [
    { label: "اكتشف الدرعية", icon: MapPin },
    { label: "الفعاليات", icon: Calendar },
    { label: "المطاعم", icon: Clock },
  ];

  return (
    <section
      className="py-8 px-4 bg-background"
      data-testid="section-quicklinks"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link, i) => (
            <Link key={i} href="/tickets">
              <Button
                variant="outline"
                className="gap-3 bg-card border-border rounded-full px-6 py-5 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-glow"
                data-testid={`button-quicklink-${i}`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="py-10 px-4 bg-background" data-testid="section-events">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
          <div>
            <h2
              className="text-2xl font-bold text-foreground"
              data-testid="text-events-title"
            >
              فعاليات قادمة
            </h2>
            <p className="text-muted-foreground text-sm mt-1">اكتشف أحدث الفعاليات والمناسبات</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary gap-2 hover:bg-primary/10"
            data-testid="button-view-all-events"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <EventCard
            title="معرض قلى الكُتاب ومؤ..."
            date="٢٨ يناير - ٨ فبراير"
            image={eventImage1}
            testId="event-1"
          />
          <EventCard
            title="اكتشف تجارب لا تنسى"
            date="متاح الآن"
            image={eventImage2}
            testId="event-2"
          />
        </div>
      </div>
    </section>
  );
}

function EventCard({
  title,
  date,
  image,
  testId,
}: {
  title: string;
  date: string;
  image: string;
  testId: string;
}) {
  return (
    <Link href="/tickets">
      <Card
        className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group transition-all duration-300 hover:shadow-lg"
        data-testid={`card-${testId}`}
      >
        <div className="flex gap-4 p-4">
          <div className="w-28 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3
              className="font-bold text-foreground text-lg mb-2 truncate"
              data-testid={`text-${testId}-title`}
            >
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <p
                className="text-sm text-muted-foreground"
                data-testid={`text-${testId}-date`}
              >
                {date}
              </p>
            </div>
          </div>
          <ArrowLeft className="w-5 h-5 text-muted-foreground self-center group-hover:text-primary group-hover:-translate-x-1 transition-all" />
        </div>
      </Card>
    </Link>
  );
}

function ExperienceSection() {
  return (
    <section className="py-10 bg-gradient-to-b from-[#f5f0e8] to-[#ebe3d7]" data-testid="section-experience">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#d4a574] flex-shrink-0 shadow-glow">
            <img
              src={experienceAvatar}
              alt="باب سمحان"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-primary font-medium mb-1 uppercase tracking-wider">الوجهة</p>
            <h3
              className="font-bold text-foreground text-xl"
              data-testid="text-destination-name"
            >
              باب سمحان
            </h3>
          </div>
        </div>

        <Link href="/tickets">
          <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group shadow-xl" data-testid="card-experience">
            <div className="relative h-56">
              <img
                src={experienceImage}
                alt="تجربة الدرعية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 right-6 left-6 text-right">
                <h3
                  className="text-white font-bold text-2xl drop-shadow-lg"
                  data-testid="text-experience-title"
                >
                  الوجهة التاريخية والثقافية
                </h3>
              </div>
            </div>
            <div className="p-5 bg-white">
              <p
                className="text-muted-foreground leading-relaxed text-right"
                data-testid="text-experience-desc"
              >
                الدرعية أيقونة تاريخية والثقافة ووجهة سياحية تقدم تجارب لا تُنسى
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section
      className="py-10 px-4 bg-background"
      data-testid="section-destinations"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
          <div>
            <h2
              className="text-2xl font-bold text-foreground"
              data-testid="text-destinations-title"
            >
              اكتشف وجهات الدرعية
            </h2>
            <p className="text-muted-foreground text-sm mt-1">استكشف أجمل المعالم التاريخية</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary gap-2 hover:bg-primary/10"
            data-testid="button-view-all-destinations"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DestinationCard
            title="منطقة البجيري"
            image={destinationImage1}
            testId="dest-1"
          />
          <DestinationCard
            title="حي الطريف"
            image={destinationImage2}
            testId="dest-2"
          />
        </div>
      </div>
    </section>
  );
}

function DestinationCard({
  title,
  image,
  testId,
}: {
  title: string;
  image: string;
  testId: string;
}) {
  return (
    <Link href="/tickets">
      <Card
        className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group shadow-lg"
        data-testid={`card-${testId}`}
      >
        <div className="relative aspect-[3/4]">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 right-4 left-4 text-right">
            <h3
              className="text-white font-bold text-base drop-shadow-lg"
              data-testid={`text-${testId}-title`}
            >
              {title}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function HistorySection() {
  return (
    <section className="py-10 bg-gradient-to-b from-[#e8dfd3] to-[#ddd4c8]" data-testid="section-history">
      <div className="container mx-auto px-4">
        <Link href="/tickets">
          <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group shadow-xl" data-testid="card-history">
            <div className="relative h-64">
              <img
                src={historyImage}
                alt="تاريخ الدرعية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute bottom-6 right-6 left-6 text-right">
                <p className="text-[#d4a574] text-sm font-medium mb-2 uppercase tracking-wider">اكتشف</p>
                <h3
                  className="text-white font-bold text-2xl mb-2 drop-shadow-lg"
                  data-testid="text-history-title"
                >
                  تاريخ في جمال المملكة العربية
                </h3>
                <p className="text-white/80 text-sm">الطبيعة والتاريخ</p>
              </div>
            </div>
          </Card>
        </Link>

        <div className="mt-6 space-y-4">
          <HistoryCard
            title="التراث الدرعي التاريخي"
            description="جذور موحدة يتجلى فيها عبق التاريخ وروعة الثقافة"
            image={historyCard1}
            testId="history-1"
          />
          <HistoryCard
            title="إطلالة موحدة على التاريخ"
            description="نموذج حي يوثق تاريخ المملكة العربية السعودية"
            image={historyCard2}
            testId="history-2"
          />
        </div>
      </div>
    </section>
  );
}

function HistoryCard({
  title,
  description,
  image,
  testId,
}: {
  title: string;
  description: string;
  image: string;
  testId: string;
}) {
  return (
    <Link href="/tickets">
      <Card
        className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group bg-white shadow-lg"
        data-testid={`card-${testId}`}
      >
        <div className="flex gap-4 p-4">
          <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0 text-right flex flex-col justify-center">
            <h3
              className="font-bold text-foreground mb-2"
              data-testid={`text-${testId}-title`}
            >
              {title}
            </h3>
            <p
              className="text-sm text-muted-foreground line-clamp-2"
              data-testid={`text-${testId}-desc`}
            >
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function NewsSection() {
  return (
    <section className="py-10 px-4 bg-background" data-testid="section-news">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
          <div>
            <h2
              className="text-2xl font-bold text-foreground"
              data-testid="text-news-title"
            >
              آخر الأخبار
            </h2>
            <p className="text-muted-foreground text-sm mt-1">ابقَ على اطلاع بأحدث المستجدات</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary gap-2 hover:bg-primary/10"
            data-testid="button-view-all-news"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <NewsCard
            title="تشهد الدرعية مهرجانات تراثية متعددة خلال موسم الرياض"
            date="٢٤ يناير ٢٠٢٥"
            image={newsImage}
            testId="news-1"
          />
        </div>
      </div>
    </section>
  );
}

function NewsCard({
  title,
  date,
  image,
  testId,
}: {
  title: string;
  date: string;
  image: string;
  testId: string;
}) {
  return (
    <Link href="/tickets">
      <Card
        className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group shadow-lg"
        data-testid={`card-${testId}`}
      >
        <div className="relative h-52">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-5 right-5 left-5 text-right">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#d4a574]" />
              <p className="text-[#d4a574] text-sm font-medium">{date}</p>
            </div>
            <h3
              className="text-white font-bold text-lg drop-shadow-lg"
              data-testid={`text-${testId}-title`}
            >
              {title}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}

function Footer() {
  return (
    <footer
      className="bg-gradient-to-b from-[#3d3428] to-[#2a241c] text-white py-12 px-4"
      data-testid="section-footer"
    >
      <div className="container mx-auto">
        <div className="text-center mb-8 flex flex-col items-center">
          <img
            src="/logo.svg"
            alt="الدرعية"
            className="h-20 mb-4"
            data-testid="img-footer-logo"
          />
          <p className="text-white/60 text-sm">مهد المملكة العربية السعودية</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 text-sm text-right max-w-md mx-auto">
          <div className="space-y-3">
            <a href="#" className="block text-white/70 hover:text-[#d4a574] transition-colors">
              عن الدرعية
            </a>
            <a href="#" className="block text-white/70 hover:text-[#d4a574] transition-colors">
              الوجهات
            </a>
            <a href="#" className="block text-white/70 hover:text-[#d4a574] transition-colors">
              الفعاليات
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="block text-white/70 hover:text-[#d4a574] transition-colors">
              المطاعم
            </a>
            <a href="#" className="block text-white/70 hover:text-[#d4a574] transition-colors">
              التسوق
            </a>
            <a href="#" className="block text-white/70 hover:text-[#d4a574] transition-colors">
              تواصل معنا
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40" data-testid="text-copyright">
            © ٢٠٢٥ هيئة تطوير بوابة الدرعية
          </p>
        </div>
      </div>
    </footer>
  );
}
