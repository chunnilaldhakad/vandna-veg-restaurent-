import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { useGetTestimonials } from '../hooks/useQueries';

export default function Reviews() {
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

  const { data: testimonials = [] } = useGetTestimonials();

  // Fallback reviews if backend is empty
  const defaultReviews = [
    {
      name: 'Priya Sharma',
      message: 'Amazing food and wonderful ambiance! The thali is absolutely delicious.',
      rating: 5,
      image: '/assets/generated/customer-review-1.dim_400x300.jpg',
    },
    {
      name: 'Rajesh Kumar',
      message: 'Best vegetarian restaurant in Jaipur. Highly recommended for families!',
      rating: 5,
      image: '/assets/generated/customer-review-2.dim_400x300.jpg',
    },
    {
      name: 'Anita Verma',
      message: 'Fresh ingredients, authentic taste, and excellent service. Will visit again!',
      rating: 5,
      image: '/assets/generated/customer-review-3.dim_400x300.jpg',
    },
  ];

  const displayReviews = testimonials.length > 0 
    ? testimonials.map((t, i) => ({
        name: t.name,
        message: t.message,
        rating: Number(t.rating),
        image: defaultReviews[i % defaultReviews.length].image,
      }))
    : defaultReviews;

  return (
    <section ref={ref} className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What our valued customers say about us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayReviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/20 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400/50">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{review.name}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{review.message}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
