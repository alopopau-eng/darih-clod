export function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-background to-[#f5f0e8] flex items-center justify-center z-50" dir="rtl">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <img src="/logo.svg" alt="الدرعية" className="h-16 opacity-80" />
        <div className="relative">
          <div className="w-10 h-10 border-3 border-primary/20 rounded-full" />
          <div className="absolute inset-0 w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-muted-foreground text-sm font-medium">جاري التحميل...</p>
      </div>
    </div>
  );
}
