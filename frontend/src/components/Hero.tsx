import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import ReservationDialog from './ReservationDialog';

export default function Hero() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent z-10" />
        <img
          src="/assets/generated/hero-thali.dim_1200x800.jpg"
          alt="Delicious vegetarian thali"
          className="w-full h-full object-cover animate-[scale_10s_ease-in-out_infinite_alternate]"
          style={{ animation: 'scale 10s ease-in-out infinite alternate' }}
        />
      </div>

      {/* Floating Herbs */}
      <div className="absolute top-20 right-20 w-64 h-48 z-20 opacity-30 animate-float">
        <img
          src="/assets/generated/floating-herbs-transparent.dim_800x600.png"
          alt="Floating herbs"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 mb-6 animate-fade-in">
          <Utensils className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-medium">Pure Vegetarian Dining</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-orange-300 to-amber-300 bg-clip-text text-transparent animate-fade-in-up">
          Vandana Veg Restaurant
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Experience the authentic taste of pure vegetarian cuisine
        </p>

        <p className="text-lg text-emerald-400 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Pratap Nagar, Jaipur
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            onClick={() => setIsReservationOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-105"
          >
            Reserve a Table
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <ReservationDialog open={isReservationOpen} onOpenChange={setIsReservationOpen} />
    </section>
  );
}
