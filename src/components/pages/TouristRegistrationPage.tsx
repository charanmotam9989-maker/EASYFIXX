import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, MapPin } from 'lucide-react';
import { useMember } from '@/integrations';

export default function TouristRegistrationPage() {
  const navigate = useNavigate();
  const { actions } = useMember();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store tourist profile data in sessionStorage for post-login processing
    sessionStorage.setItem('touristProfile', JSON.stringify({
      ...formData,
      role: 'tourist'
    }));
    
    // Trigger login
    actions.login();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[90vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-heading text-primary font-semibold">Join Guidaroo</span>
            </div>
            <h1 className="font-heading text-5xl lg:text-6xl text-darktext mb-6 leading-tight">
              Start Your Travel
              <span className="block text-primary mt-2">Adventure Today</span>
            </h1>
            <p className="font-paragraph text-xl text-darktext/70 mb-8 max-w-xl">
              Create your tourist profile and discover amazing travel experiences led by expert guides from around the world.
            </p>
            
            <div className="space-y-4 max-w-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-heading font-bold">✓</span>
                </div>
                <p className="font-paragraph text-darktext/70">Browse hundreds of unique travel experiences</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-heading font-bold">✓</span>
                </div>
                <p className="font-paragraph text-darktext/70">Book instantly with verified guides</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-heading font-bold">✓</span>
                </div>
                <p className="font-paragraph text-darktext/70">Share reviews and connect with other travelers</p>
              </div>
            </div>
          </div>

          {/* Right - Registration Form */}
          <div className="relative bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center p-8 lg:p-12">
            <Card className="w-full max-w-md border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="font-heading text-3xl text-darktext">Create Account</CardTitle>
                <CardDescription className="font-paragraph text-darktext/70">
                  As a Tourist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-paragraph text-darktext">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="border-darktext/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-paragraph text-darktext">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="border-darktext/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-paragraph text-darktext">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="border-darktext/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests" className="font-paragraph text-darktext">
                      Travel Interests (Optional)
                    </Label>
                    <Textarea
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="e.g., hiking, cultural tours, food experiences..."
                      className="border-darktext/20 focus:border-primary min-h-24"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-darktext/10 text-center">
                  <p className="font-paragraph text-sm text-darktext/70 mb-4">
                    Are you a guide?{' '}
                    <Link to="/register-guide" className="text-primary hover:text-primary/80 font-semibold">
                      Register as a guide
                    </Link>
                  </p>
                  <p className="font-paragraph text-sm text-darktext/70">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary/80 font-semibold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
