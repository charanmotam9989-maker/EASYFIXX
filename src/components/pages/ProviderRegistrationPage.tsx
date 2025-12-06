import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { ServiceProviders, Services } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Shield, Star, DollarSign } from 'lucide-react';

export default function ProviderRegistrationPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { member } = useMember();
  const [formData, setFormData] = useState({
    providerName: '',
    email: member?.loginEmail || '',
    phoneNumber: '',
    bio: '',
    yearsOfExperience: '',
    profilePicture: '',
    servicesOffered: [] as string[],
    agreeToTerms: false,
    agreeToBackground: false
  });
  const [services, setServices] = useState<Services[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadServices();
    // Update email when member data loads
    if (member?.loginEmail) {
      setFormData(prev => ({ ...prev, email: member.loginEmail }));
    }
  }, [member?.loginEmail]);

  const loadServices = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Services>('services');
      setServices(items);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(serviceId)
        ? prev.servicesOffered.filter(id => id !== serviceId)
        : [...prev.servicesOffered, serviceId]
    }));
  };

  // ... keep existing code (removed sendAdminNotificationEmail - no longer needed)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.providerName.trim()) {
      toast({
        title: "Full Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.yearsOfExperience) {
      toast({
        title: "Experience Required",
        description: "Please enter your years of experience.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.bio.trim()) {
      toast({
        title: "Bio Required",
        description: "Please provide a professional bio.",
        variant: "destructive",
      });
      return;
    }

    if (formData.servicesOffered.length === 0) {
      toast({
        title: "Services Required",
        description: "Please select at least one service you offer.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeToTerms || !formData.agreeToBackground) {
      toast({
        title: "Agreement Required",
        description: "Please agree to all terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newProvider = {
        _id: crypto.randomUUID(),
        providerName: formData.providerName.trim(),
        email: member?.loginEmail || formData.email.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        bio: formData.bio.trim(),
        yearsOfExperience: parseInt(formData.yearsOfExperience) || 0,
        profilePicture: formData.profilePicture.trim() || undefined,
        servicesOffered: formData.servicesOffered.join(','),
        isAvailable: true,
      } as ServiceProviders;

      await BaseCrudService.create('serviceproviders', newProvider);
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to EASYFIX! Redirecting to your provider dashboard...",
      });
      
      // Redirect to provider dashboard after successful registration
      setTimeout(() => {
        navigate('/provider-dashboard');
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
              Join Our Network of Professionals
            </h1>
            <p className="font-paragraph text-lg text-darktext/80">
              Become a verified service provider on EASYFIX and connect with customers 
              who need your expertise. Grow your business with our trusted platform.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-4">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-darktext">Increase Your Income</h3>
              <p className="font-paragraph text-darktext/70">
                Access a steady stream of customers and grow your business with our platform.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-darktext">Trusted Platform</h3>
              <p className="font-paragraph text-darktext/70">
                Join a verified network of professionals with built-in trust and safety features.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-darktext">Build Your Reputation</h3>
              <p className="font-paragraph text-darktext/70">
                Showcase your skills and build a strong reputation through customer reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <Card className="border-contentblockbackground">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-darktext flex items-center">
                <UserPlus className="w-6 h-6 mr-3 text-primary" />
                Provider Registration
              </CardTitle>
              <CardDescription className="font-paragraph text-darktext/70">
                Fill out the form below to start your application process. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg text-darktext border-b border-contentblockbackground pb-2">
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="providerName" className="font-paragraph text-darktext">Full Name *</Label>
                      <Input
                        id="providerName"
                        value={formData.providerName}
                        onChange={(e) => handleInputChange('providerName', e.target.value)}
                        required
                        className="border-buttonborder"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-paragraph text-darktext">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="border-buttonborder"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="font-paragraph text-darktext">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        required
                        className="border-buttonborder"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience" className="font-paragraph text-darktext">Years of Experience *</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        min="0"
                        max="50"
                        value={formData.yearsOfExperience}
                        onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                        required
                        className="border-buttonborder"
                        placeholder="5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profilePicture" className="font-paragraph text-darktext">Profile Picture URL</Label>
                    <Input
                      id="profilePicture"
                      type="url"
                      value={formData.profilePicture}
                      onChange={(e) => handleInputChange('profilePicture', e.target.value)}
                      className="border-buttonborder"
                      placeholder="https://example.com/your-photo.jpg"
                    />
                    <p className="font-paragraph text-xs text-darktext/60">
                      Optional: Provide a URL to your professional headshot
                    </p>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg text-darktext border-b border-contentblockbackground pb-2">
                    Professional Information
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="font-paragraph text-darktext">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      required
                      rows={4}
                      className="border-buttonborder resize-none"
                      placeholder="Tell us about your experience, specialties, and what makes you a great service provider..."
                    />
                    <p className="font-paragraph text-xs text-darktext/60">
                      This will be displayed on your profile. Minimum 50 characters.
                    </p>
                  </div>

                  {/* Services Offered */}
                  <div className="space-y-3 mt-6">
                    <Label className="font-paragraph text-darktext">Services You Offer *</Label>
                    <p className="font-paragraph text-xs text-darktext/60">
                      Select all services that you are qualified to provide. Your profile will only appear for these services.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <div key={service._id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`service-${service._id}`}
                            checked={formData.servicesOffered.includes(service._id)}
                            onCheckedChange={() => handleServiceToggle(service._id)}
                          />
                          <Label 
                            htmlFor={`service-${service._id}`} 
                            className="font-paragraph text-darktext cursor-pointer"
                          >
                            {service.serviceName}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  <h3 className="font-heading text-lg text-darktext border-b border-contentblockbackground pb-2">
                    Terms and Agreements
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="agreeToTerms" className="font-paragraph text-darktext cursor-pointer">
                          I agree to the Terms of Service and Privacy Policy *
                        </Label>
                        <p className="font-paragraph text-xs text-darktext/60">
                          By checking this box, you agree to our platform terms and conditions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToBackground"
                        checked={formData.agreeToBackground}
                        onCheckedChange={(checked) => handleInputChange('agreeToBackground', checked as boolean)}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="agreeToBackground" className="font-paragraph text-darktext cursor-pointer">
                          I consent to background verification checks *
                        </Label>
                        <p className="font-paragraph text-xs text-darktext/60">
                          We conduct background checks on all providers to ensure customer safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3"
                >
                  {isSubmitting ? 'Creating Your Account...' : 'Create Account & Access Dashboard'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl text-darktext mb-4">Get Started Immediately</h2>
            <p className="font-paragraph text-darktext/80 max-w-2xl mx-auto">
              After you submit your registration, you'll have instant access to your provider dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="font-heading text-lg font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="font-heading text-lg text-darktext">Complete Registration</h3>
              <p className="font-paragraph text-sm text-darktext/70">
                Fill out your professional details and submit your registration form.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="font-heading text-lg font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="font-heading text-lg text-darktext">Access Your Dashboard</h3>
              <p className="font-paragraph text-sm text-darktext/70">
                Log in immediately and access your provider dashboard to manage bookings.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="font-heading text-lg font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="font-heading text-lg text-darktext">Start Accepting Jobs</h3>
              <p className="font-paragraph text-sm text-darktext/70">
                Begin receiving and accepting service requests from customers right away.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}