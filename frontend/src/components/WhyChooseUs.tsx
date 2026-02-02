import { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
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

  const features = [
    {
      icon: '/assets/generated/pure-veg-icon.dim_200x200.png',
      title: 'Pure Vegetarian',
      description: '100% vegetarian menu with no compromise on taste or quality',
    },
    {
      icon: '/assets/generated/hygiene-icon.dim_200x200.png',
      title: 'Hygiene Standards',
      description: 'Maintaining the highest standards of cleanliness and food safety',
    },
    {
      icon: '/assets/generated/taste-icon.dim_200x200.png',
      title: 'Authentic Taste',
      description: 'Traditional recipes passed down through generations',
    },
    {
      icon: '/assets/generated/family-icon.dim_200x200.png',
      title: 'Family Place',
      description: 'Warm and welcoming atmosphere perfect for families',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What makes us the preferred choice for vegetarian dining in Jaipur
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 relative transition-transform duration-600 group-hover:rotate-[360deg]">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-400 text-center text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
