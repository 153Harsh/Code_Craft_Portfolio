import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">AVERON.</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Growing businesses through innovative online technology solutions. We specialize in building the future of the web.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-secondary rounded-full hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-full hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-full hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/#services" className="hover:text-primary transition-colors">Website Building</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-colors">App Development</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-colors">Maintenance & Monitoring</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Agency</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/#home" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/#portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/#testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>123 Innovation Way, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@averon.agency</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Averon Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
