import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
              Contact Us
            </h1>
            <p className="font-paragraph text-lg text-darktext/80">
              Have questions or need assistance? We're here to help. Reach out to us and 
              we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-contentblockbackground">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-darktext">Send us a Message</CardTitle>
                  <CardDescription className="font-paragraph text-darktext/70">
                    Fill out the form below and we'll respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-paragraph text-darktext">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="border-buttonborder"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-paragraph text-darktext">Email *</Label>
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
                        <Label htmlFor="phone" className="font-paragraph text-darktext">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="border-buttonborder"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inquiryType" className="font-paragraph text-darktext">Inquiry Type</Label>
                        <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                          <SelectTrigger className="border-buttonborder">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="service">Service Inquiry</SelectItem>
                            <SelectItem value="provider">Provider Registration</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-paragraph text-darktext">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        className="border-buttonborder"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-paragraph text-darktext">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        rows={5}
                        className="border-buttonborder resize-none"
                        placeholder="Please provide details about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl text-darktext mb-6">Get in Touch</h2>
                <p className="font-paragraph text-darktext/80 mb-8">
                  We're here to help with any questions about our services, platform, or 
                  how to get started. Choose the best way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-contentblockbackground">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-darktext mb-2">Email Support</h3>
                        <p className="font-paragraph text-darktext/70 mb-2">
                          For general inquiries and support
                        </p>
                        <a 
                          href="mailto:support@easyfix.com" 
                          className="font-paragraph text-primary hover:underline"
                        >
                          support@easyfix.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-contentblockbackground">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-darktext mb-2">Phone Support</h3>
                        <p className="font-paragraph text-darktext/70 mb-2">
                          Speak with our support team
                        </p>
                        <a 
                          href="tel:+1-555-EASYFIX" 
                          className="font-paragraph text-primary hover:underline"
                        >
                          +1 (555) EASY-FIX
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-contentblockbackground">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-darktext mb-2">Office Location</h3>
                        <p className="font-paragraph text-darktext/70">
                          123 Service Street<br />
                          Suite 100<br />
                          Your City, ST 12345
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-contentblockbackground">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-darktext mb-2">Business Hours</h3>
                        <div className="font-paragraph text-darktext/70 space-y-1">
                          <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                          <p>Saturday: 9:00 AM - 6:00 PM</p>
                          <p>Sunday: 10:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Link */}
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-lg text-darktext mb-3">
                    Looking for Quick Answers?
                  </h3>
                  <p className="font-paragraph text-darktext/70 mb-4">
                    Check out our frequently asked questions for immediate help.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}