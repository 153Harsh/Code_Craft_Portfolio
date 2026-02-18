import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/db/api';
import { Project, Testimonial } from '@/types';
import { Rocket, Globe, Smartphone, ShieldCheck, CheckCircle2, Mail, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const [projectsRes, testimonialsRes] = await Promise.all([
        api.getProjects(),
        api.getTestimonials(),
      ]);
      setProjects(projectsRes.data);
      setTestimonials(testimonialsRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    const { error } = await api.submitInquiry(data);
    if (error) {
      toast.error('Failed to send message. Please try again.');
    } else {
      toast.success('Message sent successfully!');
      form.reset();
    }
  };

  const services = [
    {
      title: 'Website Building',
      description: 'Custom, responsive websites designed to convert visitors into customers. We use the latest frameworks for speed and SEO.',
      icon: <Globe className="w-10 h-10 text-primary" />,
      benefits: ['SEO Optimized', 'Mobile Responsive', 'Custom Design'],
    },
    {
      title: 'App Development',
      description: 'Powerful iOS and Android applications that provide a seamless user experience and drive engagement.',
      icon: <Smartphone className="w-10 h-10 text-primary" />,
      benefits: ['Cross-platform', 'Offline Support', 'Push Notifications'],
    },
    {
      title: 'Maintenance & Monitoring',
      description: 'Continuous support to ensure your digital assets are secure, updated, and performing at their best.',
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      benefits: ['24/7 Monitoring', 'Security Patches', 'Performance Tuning'],
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-700" />
        
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <Badge className="mb-6 py-1.5 px-4 text-sm font-semibold tracking-wide animate-fade-in" variant="secondary">
              Innovating the Future
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in">
              Growing Businesses Through <span className="gradient-text">Online Solutions.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl animate-fade-in delay-100">
              Averon Agency helps companies scale with cutting-edge web and mobile development. We turn your vision into high-performing digital reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get a Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground">We provide end-to-end technology solutions tailored to your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-2 duration-300 group">
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground">Take a look at some of the digital experiences we've built for our clients across various industries.</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/#contact">Start Your Project</Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden border-primary/10 hover:border-primary/40 transition-all group h-full flex flex-col">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image_url || 'https://via.placeholder.com/600x400'}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/20 text-primary-foreground border-none">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-secondary/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-muted-foreground">Don't just take our word for it. Here's what our partners have to say about working with Averon.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id} className="bg-background/40 backdrop-blur border-primary/5 italic relative">
                <div className="absolute top-6 right-6 text-primary/20">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" /></svg>
                </div>
                <CardContent className="pt-12">
                  <p className="text-lg mb-6 text-foreground/90">"{t.content}"</p>
                  <div>
                    <p className="font-bold text-primary">{t.client_name}</p>
                    <p className="text-sm text-muted-foreground">{t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Scale Your <span className="text-primary">Business?</span></h2>
              <p className="text-lg text-muted-foreground mb-12">
                Whether you have a specific project in mind or just want to explore the possibilities, our team is here to help you navigate the digital landscape.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email us at</p>
                    <p className="text-xl font-semibold">hello@averon.agency</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Our Response Time</p>
                    <p className="text-xl font-semibold">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 border-primary/10 bg-secondary/5 backdrop-blur">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project..." className="min-h-[120px] bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
