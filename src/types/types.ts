export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  role: UserRole;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  technologies: string[];
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  content: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}
