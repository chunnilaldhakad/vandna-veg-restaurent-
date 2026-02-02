import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useGetRestaurantInfo } from '../hooks/useQueries';

export default function Location() {
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

  const { data: info } = useGetRestaurantInfo();

  return (
    <section ref={ref} className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">
            Visit Us
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find us in the heart of Pratap Nagar, Jaipur
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <div className={`rounded-2xl overflow-hidden border border-white/20 h-96 transition-all duration-800 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.7234567890123!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vandana Veg Restaurant Location"
            />
          </div>

          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {[
              { icon: MapPin, label: 'Address', value: info?.address || 'Pratap Nagar, Jaipur' },
              { icon: Phone, label: 'Phone', value: info?.phone || '+91-1234567890' },
              { icon: Mail, label: 'Email', value: info?.email || 'contact@vandanasveg.com' },
              { icon: Clock, label: 'Hours', value: info?.hours || 'Mon-Sun: 10am - 10pm' },
            ].map((item, index) => (
              <div
                key={index}
                className={`backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/20 hover:border-emerald-400/50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-orange-500/20 border border-emerald-400/30">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.label}</h3>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
