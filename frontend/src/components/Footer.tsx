import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const socialLinks = [
    { icon: SiFacebook, href: '#', label: 'Facebook' },
    { icon: SiInstagram, href: '#', label: 'Instagram' },
    { icon: SiX, href: '#', label: 'X' },
    { icon: SiYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Vandana Veg Restaurant
            </h3>
            <p className="text-gray-400">
              Pure vegetarian dining experience in the heart of Jaipur
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Menu', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-3 rounded-full bg-white/5 border border-white/20 hover:border-emerald-400/50 hover:bg-emerald-500/20 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-emerald-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2025. Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
