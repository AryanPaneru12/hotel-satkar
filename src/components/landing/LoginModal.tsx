
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Facebook, Github, Info, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
          variant: "default",
        });
        setTimeout(() => {
          navigate('/');
          onClose();
        }, 1000);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    toast({
      title: "Database Connection Error",
      description: `Cannot connect to authentication service for ${provider} login. Please try again later.`,
      variant: "destructive",
    });
    
    setIsLoading(false);
  };

  const fillCredentials = (userType: string) => {
    switch (userType) {
      case 'superadmin':
        setEmail('ankit@satkar.com');
        break;
      case 'admin':
        setEmail('raj@satkar.com');
        break;
      case 'customer':
        setEmail('naveen@satkar.com');
        break;
      default:
        break;
    }
    setPassword('NaveenSir@2025');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader>
          <CardTitle className="text-center">Sign In to Satkar</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4">
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertTitle className="text-amber-800 text-sm font-medium">Demo Accounts</AlertTitle>
                  <AlertDescription className="text-amber-700 text-xs">
                    <div className="mt-2">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="accounts">
                          <AccordionTrigger className="text-xs py-2">Available login accounts</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 text-xs">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">Super Admin</p>
                                  <p className="text-gray-500">ankit@satkar.com</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fillCredentials('superadmin');
                                  }}
                                >
                                  Use
                                </Button>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">Admin</p>
                                  <p className="text-gray-500">raj@satkar.com</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fillCredentials('admin');
                                  }}
                                >
                                  Use
                                </Button>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">Customer</p>
                                  <p className="text-gray-500">naveen@satkar.com</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    fillCredentials('customer');
                                  }}
                                >
                                  Use
                                </Button>
                              </div>
                              <p className="mt-2 text-gray-500">Password for all: NaveenSir@2025</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                
                <div className="flex items-center gap-4 my-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleSocialLogin('Google')}
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" className="mr-2">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => handleSocialLogin('Facebook')}
                    disabled={isLoading}
                  >
                    <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" type="text" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => {
                  toast({
                    title: "Database Connection Error",
                    description: "Cannot connect to user database. Please try again later.",
                    variant: "destructive",
                  });
                }}
              >
                Create Account
              </Button>
              
              <div className="flex items-center gap-4 my-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR SIGN UP WITH</span>
                <Separator className="flex-1" />
              </div>
              
              {/* Updated this div to be responsive on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full flex justify-center items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24" className="mr-2">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSocialLogin('Facebook')}
                  className="w-full flex justify-center items-center"
                >
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  Facebook
                </Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginModal;
