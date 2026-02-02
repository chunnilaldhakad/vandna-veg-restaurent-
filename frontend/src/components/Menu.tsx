import { useEffect, useRef, useState } from 'react';

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const menuItems = [
    {
      name: 'Special Thali',
      description: 'Complete meal with dal, sabzi, roti, rice, and dessert',
      price: '₹250',
      image: '/assets/generated/hero-thali.dim_1200x800.jpg',
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Rich and creamy paneer curry with aromatic spices',
      price: '₹180',
      image: '/assets/generated/menu-dishes.dim_1024x768.jpg',
    },
    {
      name: 'Dal Makhani',
      description: 'Slow-cooked black lentils in butter and cream',
      price: '₹150',
      image: '/assets/generated/fresh-ingredients.dim_800x600.jpg',
    },
    {
      name: 'Veg Biryani',
      description: 'Fragrant basmati rice with mixed vegetables and spices',
      price: '₹200',
      image: '/assets/generated/restaurant-interior.dim_1024x768.jpg',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            Our Special Menu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Handcrafted dishes made with love and the finest ingredients
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-2xl font-bold text-orange-400">{item.price}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
