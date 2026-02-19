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
import { Globe, Smartphone, ShieldCheck, CheckCircle2, Mail, Send, ArrowRight, Users, Target, Zap, Award, Code, Palette, Database, Cloud, Sparkles, Star } from 'lucide-react';
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
      icon: <Globe className="w-12 h-12 text-primary" />,
      benefits: ['SEO Optimized', 'Mobile Responsive', 'Custom Design'],
    },
    {
      title: 'App Development',
      description: 'Powerful iOS and Android applications that provide a seamless user experience and drive engagement.',
      icon: <Smartphone className="w-12 h-12 text-primary" />,
      benefits: ['Cross-platform', 'Offline Support', 'Push Notifications'],
    },
    {
      title: 'Maintenance & Monitoring',
      description: 'Continuous support to ensure your digital assets are secure, updated, and performing at their best.',
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      benefits: ['24/7 Monitoring', 'Security Patches', 'Performance Tuning'],
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 py-2 px-5 text-sm font-semibold tracking-wide animate-fade-in backdrop-blur-sm border-primary/20" variant="secondary">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              Innovating the Future
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in delay-100">
              Growing Businesses Through{' '}
              <span className="gradient-text block mt-2">Online Tech Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in delay-200">
              codecraft specializes in helping businesses grow through cutting-edge website development, app building, and maintenance services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get a Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary/5" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                View Our Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '9+', label: 'Projects Completed' },
              { value: '9+', label: 'Happy Clients' },
              { value: '1.5+', label: 'Years Experience' },
              { value: '99.9%', label: 'Client Satisfaction' }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-4">About Us</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Building Digital Excellence <span className="text-primary">Since 2026</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                codecraft is a full-service digital agency dedicated to transforming businesses through innovative technology solutions. We combine creativity, technical expertise, and strategic thinking to deliver exceptional results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of experienced developers, designers, and strategists work collaboratively to bring your vision to life. From startups to enterprises, we've helped businesses across industries establish their digital presence and achieve their goals.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Target, title: 'Mission-Driven', desc: 'Focused on your success' },
                  { icon: Zap, title: 'Fast Delivery', desc: 'Agile development process' },
                  { icon: Award, title: 'Quality First', desc: 'Excellence in every detail' },
                  { icon: Users, title: 'Expert Team', desc: 'Skilled professionals' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Code, title: 'Development', desc: 'Clean, scalable code using modern frameworks' },
                { icon: Palette, title: 'Design', desc: 'Beautiful, user-centric interfaces' },
                { icon: Database, title: 'Backend', desc: 'Robust, secure server solutions' },
                { icon: Cloud, title: 'Cloud', desc: 'Scalable cloud infrastructure' }
              ].map((item, i) => (
                <Card key={i} className={`p-6 border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-2 bg-card/50 backdrop-blur ${i % 2 === 1 ? 'mt-8' : ''}`}>
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-secondary/5 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">What We Offer</h2>
            <p className="text-lg text-muted-foreground">We provide end-to-end technology solutions tailored to your business needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-3 duration-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative">
                  <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="secondary" className="mb-4">Our Process</Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">How We Work</h2>
            <p className="text-lg text-muted-foreground">A proven methodology that delivers results every time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Discovery', desc: 'We understand your goals, audience, and requirements' },
              { num: '02', title: 'Design', desc: 'Creating wireframes and visual designs for approval' },
              { num: '03', title: 'Development', desc: 'Building your solution with cutting-edge technology' },
              { num: '04', title: 'Launch', desc: 'Testing, deployment, and ongoing support' }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 h-full hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border border-primary/10">
                  <div className="text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors">{step.num}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="mb-4">Portfolio</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">Take a look at some of the digital experiences we've built for our clients across various industries.</p>
            </div>
            <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/40" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Your Project
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] rounded-3xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden border-primary/10 hover:border-primary/40 transition-all group h-full flex flex-col bg-card/50 backdrop-blur hover:shadow-2xl hover:shadow-primary/10">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.image_url || 'https://via.placeholder.com/600x400'}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/90 text-primary-foreground border-none backdrop-blur">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Tech Stack</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technologies We Use</h2>
            <p className="text-lg text-muted-foreground">Building with the best tools in the industry</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['React','React Native', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'Next.js', 'Tailwind', 'GraphQL','MySQL','SQLite','Supabase', 'Firebase'].map((tech) => (
              <Card key={tech} className="p-8 text-center border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-2 bg-card/50 backdrop-blur group">
                <div className="font-semibold text-lg group-hover:text-primary transition-colors">{tech}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 bg-secondary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Client Success Stories</h2>
            <p className="text-lg text-muted-foreground">Don't just take our word for it. Here's what our partners have to say about working with codecraft.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id} className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/20 transition-all hover:-translate-y-2 relative group">
                <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <Star className="w-10 h-10 fill-current" />
                </div>
                <CardContent className="pt-12 pb-8">
                  <p className="text-lg mb-8 text-foreground/90 leading-relaxed italic">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {t.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-primary">{t.client_name}</p>
                      <p className="text-sm text-muted-foreground">{t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Let's discuss how we can help transform your business with innovative digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-16 px-12 text-lg shadow-2xl shadow-primary/25 hover:shadow-primary/40" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 text-lg border-primary/20 hover:border-primary/40" asChild>
                <a href="mailto:codecraftagency9@gmail.com">Email Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Badge variant="secondary" className="mb-6">Contact Us</Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Ready to Scale Your <span className="text-primary">Business?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
                Whether you have a specific project in mind or just want to explore the possibilities, our team is here to help you navigate the digital landscape.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="p-5 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all group-hover:scale-110">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Email us at</p>
                    <p className="text-xl font-semibold">codecraftagency9@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="p-5 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all group-hover:scale-110">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Our Response Time</p>
                    <p className="text-xl font-semibold">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 md:p-10 border-primary/10 bg-card/50 backdrop-blur shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background h-12 text-base" />
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
                        <FormLabel className="text-base">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} className="bg-background h-12 text-base" />
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
                        <FormLabel className="text-base">Project Details</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project..." className="min-h-[140px] bg-background text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-14 text-lg shadow-lg shadow-primary/25" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 w-5 h-5" />
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
