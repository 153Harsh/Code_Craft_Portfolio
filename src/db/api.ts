import { supabase } from './supabase';
import { Project, Testimonial, Inquiry, Profile } from '../types/types';

export const api = {
  // Profiles
  async getProfile(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    return { data: data as Profile | null, error };
  },

  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: (data as Project[]) || [], error };
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    return { data: data as Project | null, error };
  },

  async updateProject(id: string, project: Partial<Omit<Project, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();
    return { data: data as Project | null, error };
  },

  async deleteProject(id: string) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    return { error };
  },

  // Testimonials
  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: (data as Testimonial[]) || [], error };
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();
    return { data: data as Testimonial | null, error };
  },

  async updateTestimonial(id: string, testimonial: Partial<Omit<Testimonial, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single();
    return { data: data as Testimonial | null, error };
  },

  async deleteTestimonial(id: string) {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    return { error };
  },

  // Inquiries
  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>) {
    const { error } = await supabase.from('inquiries').insert(inquiry);
    return { error };
  },

  async getInquiries() {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: (data as Inquiry[]) || [], error };
  },
  
  async deleteInquiry(id: string) {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    return { error };
  }
};
