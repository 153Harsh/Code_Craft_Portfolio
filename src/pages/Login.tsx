import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Wrench, Loader2 } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithUsername, signUpWithUsername } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = isLogin 
        ? await signInWithUsername(username, password)
        : await signUpWithUsername(username, password);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(isLogin ? 'Logged in successfully!' : 'Account created! Please check your email if verification is required.');
        if (isLogin) navigate(from, { replace: true });
        else setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      
      {/* Logo */}
      <div className="mb-12 flex flex-col items-center gap-4 relative z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/30 blur-2xl group-hover:bg-primary/40 transition-all rounded-full scale-150"></div>
          <Wrench className="w-16 h-16 text-primary relative group-hover:rotate-12 transition-all duration-500" />
        </div>
        <span className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">CodeCraft</span>
      </div>

      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-xl relative z-10 shadow-2xl shadow-primary/10">
        <CardHeader className="space-y-2 pb-8">
          <CardTitle className="text-3xl text-center font-bold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {isLogin ? 'Enter your credentials to access the admin dashboard' : 'Sign up to join our platform'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-background/50 backdrop-blur h-12 text-base border-primary/20 focus:border-primary/40 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50 backdrop-blur h-12 text-base border-primary/20 focus:border-primary/40 transition-all"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 pt-2">
            <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-semibold transition-all"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-10 text-center text-sm text-muted-foreground relative z-10">
        <button onClick={() => navigate('/')} className="hover:text-primary transition-all font-medium hover:underline">
          ← Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Login;
