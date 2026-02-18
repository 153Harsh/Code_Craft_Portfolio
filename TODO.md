# Task: Averon Agency Portfolio Website

## Plan
- [x] Initialize Supabase and Database Schema
  - [x] Run `supabase_init`
  - [x] Create `profiles`, `projects`, `testimonials`, `inquiries` tables
  - [x] Setup Storage Bucket for project images
  - [x] Configure RLS policies
- [x] Define Types and API layer
  - [x] Create `src/types/types.ts`
  - [x] Create `src/db/api.ts`
- [x] Theme and Layout Setup
  - [x] Configure `src/index.css` and `tailwind.config.js` with professional tech colors
  - [x] Create Layout components (Navbar, Footer, Section containers)
- [x] Implement Core Pages
  - [x] Homepage with all required sections (Hero, Services, Portfolio, Testimonials, Contact)
  - [x] Login page for Admin
  - [x] Admin Dashboard for managing Projects and Testimonials
- [x] Functional Features
  - [x] Project CRUD in Admin
  - [x] Testimonial CRUD in Admin
  - [x] Contact form submission
- [x] Verification and Polish
  - [x] Responsive design check
  - [x] Real images via `image_search`
  - [x] Linting and final fixes

## Notes
- First user to register will be Admin.
- Need to use Supabase Storage for project images.
- Use shadcn/ui for all form components.
