import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Rocket, Loader2 } from 'lucide-react';

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
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mb-8 flex items-center gap-2 relative z-10">
        <Rocket className="w-10 h-10 text-primary" />
        <span className="text-3xl font-bold tracking-tight">AVERON.</span>
      </div>

      <Card className="w-full max-w-md border-primary/10 bg-secondary/5 backdrop-blur relative z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isLogin ? 'Sign In' : 'Create an Account'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin ? 'Enter your credentials to access your account' : 'Sign up to join our innovation platform'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="averon_admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground relative z-10">
        <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Login;
