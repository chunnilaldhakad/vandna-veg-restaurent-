import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const images = [
    { src: '/assets/generated/restaurant-interior.dim_1024x768.jpg', alt: 'Restaurant Interior' },
    { src: '/assets/generated/fresh-ingredients.dim_800x600.jpg', alt: 'Fresh Ingredients' },
    { src: '/assets/generated/restaurant-exterior.dim_1024x768.jpg', alt: 'Restaurant Exterior' },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the story behind Jaipur's favorite vegetarian dining destination
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105 ${index === 0 ? 'col-span-2' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className={`space-y-6 transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Our Story</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Located in the heart of Pratap Nagar, Jaipur, Vandana Veg Restaurant has been serving authentic vegetarian cuisine with love and dedication. Our commitment to quality, freshness, and hygiene has made us a beloved destination for families and food enthusiasts.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every dish is prepared with the finest ingredients, traditional recipes, and a touch of modern innovation. We believe in creating not just meals, but memorable dining experiences that bring people together.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Fresh Daily', value: '100%' },
                { label: 'Happy Customers', value: '10K+' },
                { label: 'Years Serving', value: '15+' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-sm bg-gradient-to-br from-emerald-500/20 to-orange-500/20 p-4 rounded-xl border border-emerald-400/30 text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
