import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { api } from '@/db/api';
import { Project, Testimonial, Inquiry } from '@/types';
import { Plus, Trash2, Edit2, Rocket, Briefcase, MessageSquare, Mail, Loader2, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/components/layout/AppLayout';
import { supabase } from '@/db/supabase';

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [uploading, setUploading] = useState(false);

  const projectForm = useForm({
    defaultValues: {
      title: '',
      description: '',
      image_url: '',
      technologies: '',
    },
  });

  const testimonialForm = useForm({
    defaultValues: {
      client_name: '',
      company: '',
      content: '',
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const [p, t, i] = await Promise.all([
      api.getProjects(),
      api.getTestimonials(),
      api.getInquiries(),
    ]);
    setProjects(p.data);
    setTestimonials(t.data);
    setInquiries(i.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProjectSubmit = async (data: any) => {
    const techArray = data.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '');
    const payload = { ...data, technologies: techArray };

    let res;
    if (editingItem) {
      res = await api.updateProject(editingItem.id, payload);
    } else {
      res = await api.createProject(payload);
    }

    if (res.error) {
      toast.error('Operation failed');
    } else {
      toast.success(editingItem ? 'Project updated' : 'Project created');
      setIsDialogOpen(false);
      setEditingItem(null);
      projectForm.reset();
      fetchData();
    }
  };

  const handleTestimonialSubmit = async (data: any) => {
    let res;
    if (editingItem) {
      res = await api.updateTestimonial(editingItem.id, data);
    } else {
      res = await api.createTestimonial(data);
    }

    if (res.error) {
      toast.error('Operation failed');
    } else {
      toast.success(editingItem ? 'Testimonial updated' : 'Testimonial created');
      setIsDialogOpen(false);
      setEditingItem(null);
      testimonialForm.reset();
      fetchData();
    }
  };

  const deleteItem = async (id: string, type: 'projects' | 'testimonials' | 'inquiries') => {
    let res;
    if (type === 'projects') res = await api.deleteProject(id);
    else if (type === 'testimonials') res = await api.deleteTestimonial(id);
    else if (type === 'inquiries') res = await api.deleteInquiry(id);

    if (res?.error) toast.error('Delete failed');
    else {
      toast.success('Deleted successfully');
      fetchData();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('app-9pmphyo8s1s1_agency_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('app-9pmphyo8s1s1_agency_images')
        .getPublicUrl(filePath);

      projectForm.setValue('image_url', data.publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 pt-32 pb-16 min-h-[80vh]">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your agency's portfolio and content.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingItem(null);
              projectForm.reset();
              testimonialForm.reset();
            }
          }}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add New {activeTab === 'projects' ? 'Project' : 'Testimonial'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-background">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' : 'Testimonial'}</DialogTitle>
                <DialogDescription>Fill in the details below.</DialogDescription>
              </DialogHeader>

              {activeTab === 'projects' ? (
                <Form {...projectForm}>
                  <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-4">
                    <FormField
                      control={projectForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl><Input {...field} placeholder="Project Name" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl><Textarea {...field} placeholder="Short overview" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technologies (Comma separated)</FormLabel>
                          <FormControl><Input {...field} placeholder="React, TypeScript, Tailwind" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2">
                      <FormLabel>Project Image</FormLabel>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploading}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          asChild
                          className="w-full h-24 border-dashed"
                        >
                          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                            {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ImagePlus className="w-6 h-6" />}
                            <span>{uploading ? 'Uploading...' : 'Click to upload project image'}</span>
                          </label>
                        </Button>
                      </div>
                      <FormField
                        control={projectForm.control}
                        name="image_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl><Input {...field} placeholder="Or enter Image URL manually" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full">{editingItem ? 'Update' : 'Create'} Project</Button>
                    </DialogFooter>
                  </form>
                </Form>
              ) : (
                <Form {...testimonialForm}>
                  <form onSubmit={testimonialForm.handleSubmit(handleTestimonialSubmit)} className="space-y-4">
                    <FormField
                      control={testimonialForm.control}
                      name="client_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Name</FormLabel>
                          <FormControl><Input {...field} placeholder="Jane Doe" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={testimonialForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl><Input {...field} placeholder="Tech Corp" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={testimonialForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Testimonial Content</FormLabel>
                          <FormControl><Textarea {...field} placeholder="What did they say?" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit" className="w-full">{editingItem ? 'Update' : 'Create'} Testimonial</Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="projects" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-fit">
            <TabsTrigger value="projects">
              <Briefcase className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <MessageSquare className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="inquiries">
              <Mail className="w-4 h-4 mr-2" />
              Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Portfolio Projects</CardTitle>
                <CardDescription>Manage your showcase items here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                              <img src={project.image_url || ''} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                            <span>{project.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((t) => <span key={t} className="px-2 py-0.5 bg-secondary text-xs rounded-full">{t}</span>)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              setEditingItem(project);
                              projectForm.reset({
                                title: project.title,
                                description: project.description,
                                image_url: project.image_url || '',
                                technologies: project.technologies.join(', '),
                              });
                              setIsDialogOpen(true);
                            }}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteItem(project.id, 'projects')}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Client Testimonials</CardTitle>
                <CardDescription>What people are saying about Averon.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.map((t: Testimonial) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.client_name}</TableCell>
                        <TableCell>{t.company}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => {
                              setEditingItem(t);
                              testimonialForm.reset({
                                client_name: t.client_name,
                                company: t.company || '',
                                content: t.content,
                              });
                              setIsDialogOpen(true);
                            }}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteItem(t.id, 'testimonials')}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
                <CardDescription>Direct messages from potential clients.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((i) => (
                      <TableRow key={i.id}>
                        <TableCell className="font-medium">{i.name}</TableCell>
                        <TableCell>{i.email}</TableCell>
                        <TableCell className="max-w-[400px] truncate">{i.message}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteItem(i.id, 'inquiries')}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
