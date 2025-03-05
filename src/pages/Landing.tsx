
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed, Calendar, Star, Check, NepaliRupee, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import TransitionWrapper from '@/components/ui/TransitionWrapper';

const Landing = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-hotel-900 to-hotel-700 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <TransitionWrapper delay={100}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to Satkar</h1>
            <p className="text-xl md:text-2xl mb-8">A Premium Property in Pokhara, Nepal</p>
            <div className="flex space-x-2 items-center mb-12">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current text-yellow-400" />
              ))}
            </div>
            <Button 
              size="lg" 
              className="bg-white text-hotel-900 hover:bg-gray-100 text-lg font-semibold px-8"
              onClick={() => setIsLoginMode(true)}
            >
              Book Now
            </Button>
          </TransitionWrapper>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <TransitionWrapper delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Experience Luxury in the Heart of Pokhara</h2>
          </TransitionWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TransitionWrapper delay={300}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-hotel-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Bed className="h-8 w-8 text-hotel-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Luxurious Rooms</h3>
                <p className="text-gray-600">Elegantly designed rooms with modern amenities for your comfort.</p>
              </div>
            </TransitionWrapper>
            
            <TransitionWrapper delay={400}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-hotel-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <NepaliRupee className="h-8 w-8 text-hotel-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pre-Payment Only</h3>
                <p className="text-gray-600">Secure your stay with easy online pre-payment options using PayPal.</p>
              </div>
            </TransitionWrapper>
            
            <TransitionWrapper delay={500}>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-hotel-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-hotel-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Booking</h3>
                <p className="text-gray-600">Check availability and book your stay in real-time with instant confirmation.</p>
              </div>
            </TransitionWrapper>
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <TransitionWrapper delay={600}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Accommodations</h2>
            <p className="text-xl text-center text-gray-600 mb-16">Choose from our range of exquisite rooms</p>
          </TransitionWrapper>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TransitionWrapper delay={700}>
              <Card>
                <CardHeader className="p-0">
                  <div className="h-60 overflow-hidden rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop" 
                      alt="Standard Room"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle>Standard Room</CardTitle>
                  <CardDescription className="mt-2">
                    Comfortable and cozy room with essential amenities.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Wi-Fi & TV</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Air Conditioning</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Mini Fridge</span>
                    </div>
                  </div>
                  <div className="mt-4 font-semibold text-lg">
                    Rs. 9,900 <span className="text-sm font-normal text-gray-500">per night</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setIsLoginMode(true)}>
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </TransitionWrapper>
            
            <TransitionWrapper delay={800}>
              <Card>
                <CardHeader className="p-0">
                  <div className="h-60 overflow-hidden rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" 
                      alt="Deluxe Room"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle>Deluxe Room</CardTitle>
                  <CardDescription className="mt-2">
                    Spacious room with premium amenities and mountain view.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Premium Wi-Fi & Smart TV</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Mini Bar & Safe</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Bathtub & Premium Toiletries</span>
                    </div>
                  </div>
                  <div className="mt-4 font-semibold text-lg">
                    Rs. 14,900 <span className="text-sm font-normal text-gray-500">per night</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setIsLoginMode(true)}>
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </TransitionWrapper>
            
            <TransitionWrapper delay={900}>
              <Card>
                <CardHeader className="p-0">
                  <div className="h-60 overflow-hidden rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop" 
                      alt="Suite"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle>Executive Suite</CardTitle>
                  <CardDescription className="mt-2">
                    Luxurious suite with separate living area and panoramic views.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Living Room & Private Balcony</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Premium Dining & Kitchen</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-hotel-600 mr-2" />
                      <span className="text-sm">Work Desk & Premium View</span>
                    </div>
                  </div>
                  <div className="mt-4 font-semibold text-lg">
                    Rs. 29,900 <span className="text-sm font-normal text-gray-500">per night</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setIsLoginMode(true)}>
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </TransitionWrapper>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader>
              <CardTitle className="text-center">Sign In to Satkar</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4">
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
                <div className="text-sm text-gray-500">
                  For demo: Try using <span className="font-medium">ankit@satkar.com</span> or <span className="font-medium">raj@satkar.com</span> with password <span className="font-medium">123456</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsLoginMode(false)}
                >
                  Cancel
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Satkar</h3>
              <p className="mb-4 text-gray-400">
                A premium property located in the heart of Pokhara, offering stunning views of Phewa Lake and the Annapurna mountain range.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2 text-gray-400">Lakeside, Pokhara</p>
              <p className="mb-2 text-gray-400">Nepal, 33700</p>
              <p className="mb-2 text-gray-400">info@satkar.com</p>
              <p className="mb-2 text-gray-400">+977 61 123456</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Rooms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Amenities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Satkar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
