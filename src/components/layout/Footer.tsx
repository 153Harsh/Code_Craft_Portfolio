import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-primary/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all rounded-full"></div>
                <Wrench className="w-7 h-7 text-primary relative group-hover:rotate-12 transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight">CoreKraft</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Growing businesses through innovative online technology solutions. We specialize in building the future of the web.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 bg-primary/10 rounded-full hover:bg-primary/20 hover:scale-110 transition-all">
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="p-2.5 bg-primary/10 rounded-full hover:bg-primary/20 hover:scale-110 transition-all">
                <Instagram className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3.5 text-muted-foreground">
              <li><Link to="/#services" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Website Building</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-all hover:translate-x-1 inline-block">App Development</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Maintenance & Monitoring</Link></li>
              <li><Link to="/#services" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Cloud Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Agency</h4>
            <ul className="space-y-3.5 text-muted-foreground">
              <li><Link to="/#about" className="hover:text-primary transition-all hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="/#portfolio" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Portfolio</Link></li>
              <li><Link to="/#testimonials" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Testimonials</Link></li>
              <li><Link to="/#contact" className="hover:text-primary transition-all hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-muted-foreground">
              {/* <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">123 Innovation Way, Tech City, TC 10101</span>
              </li> */}
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>CoreKraftagency9@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>+91 7039709580</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 CoreKraft Agency. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
