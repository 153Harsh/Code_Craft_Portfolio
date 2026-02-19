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
    try {
      const { error } = await supabase.from('inquiries').insert(inquiry);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      // Fallback to localStorage if Supabase fails
      const existingInquiries = JSON.parse(localStorage.getItem('local_inquiries') || '[]');
      const newInquiry = {
        ...inquiry,
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        status: 'new'
      };
      existingInquiries.push(newInquiry);
      localStorage.setItem('local_inquiries', JSON.stringify(existingInquiries));
      return { error: null };
    }
  },

  async getInquiries() {
    try {
      console.log('Fetching inquiries from Supabase...');
      
      // Try with service role to bypass RLS
      const { data, error, count } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });
      
      console.log('Supabase response:', { data, error, count, dataLength: data?.length });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      // Merge with local inquiries if any
      const localInquiries = JSON.parse(localStorage.getItem('local_inquiries') || '[]');
      const allInquiries = [...(data || []), ...localInquiries];
      
      console.log('Total inquiries:', allInquiries.length, 'From DB:', data?.length, 'From Local:', localInquiries.length);
      return { data: allInquiries as Inquiry[], error: null };
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      // Fallback to localStorage only
      const localInquiries = JSON.parse(localStorage.getItem('local_inquiries') || '[]');
      return { data: localInquiries as Inquiry[], error: error as any };
    }
  },
  
  async deleteInquiry(id: string) {
    // Try to delete from Supabase first
    if (!id.startsWith('local-')) {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (!error) return { error: null };
    }
    
    // Also delete from localStorage if it exists there
    const existingInquiries = JSON.parse(localStorage.getItem('local_inquiries') || '[]');
    const filtered = existingInquiries.filter((inq: any) => inq.id !== id);
    localStorage.setItem('local_inquiries', JSON.stringify(filtered));
    return { error: null };
  }
};
