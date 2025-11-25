import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Clock, Award, CheckCircle2, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
              About EASYFIX
            </h1>
            <p className="font-paragraph text-lg text-darktext/80 leading-relaxed">
              We're revolutionizing home services by connecting homeowners with trusted, 
              verified professionals. Our mission is to make home maintenance and repairs 
              simple, reliable, and stress-free for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl text-darktext">Our Story</h2>
              <div className="space-y-4 font-paragraph text-darktext/80 leading-relaxed">
                <p>
                  Founded in 2020, EASYFIX was born from a simple frustration: finding reliable 
                  home service professionals shouldn't be a gamble. Our founders experienced 
                  firsthand the challenges of connecting with trustworthy contractors, plumbers, 
                  electricians, and other service providers.
                </p>
                <p>
                  We set out to create a platform that prioritizes quality, transparency, and 
                  trust. Every professional on our platform undergoes rigorous background checks 
                  and verification processes. We believe that homeowners deserve peace of mind 
                  when inviting service providers into their homes.
                </p>
                <p>
                  Today, we're proud to serve thousands of satisfied customers across the region, 
                  connecting them with skilled professionals who share our commitment to excellence.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-contentblockbackground rounded-lg p-8 text-center">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-heading text-3xl font-bold text-primary mb-2">5000+</div>
                    <div className="font-paragraph text-sm text-darktext/70">Happy Customers</div>
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="font-paragraph text-sm text-darktext/70">Verified Providers</div>
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-primary mb-2">4.9</div>
                    <div className="font-paragraph text-sm text-darktext/70">Average Rating</div>
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="font-paragraph text-sm text-darktext/70">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-darktext mb-6">Our Values</h2>
            <p className="font-paragraph text-lg text-darktext/80 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-contentblockbackground text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-darktext">Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-darktext/70">
                  Every professional is thoroughly vetted with background checks, insurance verification, 
                  and skill assessments to ensure your safety and peace of mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-darktext">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-darktext/70">
                  We maintain high standards through continuous monitoring, customer feedback, 
                  and regular quality assessments of all service providers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Clock className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-darktext">Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-darktext/70">
                  Punctual service, clear communication, and dependable professionals who show up 
                  when they say they will, every time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-darktext">Customer Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-darktext/70">
                  Your satisfaction is our priority. We provide ongoing support and ensure 
                  every interaction exceeds your expectations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-darktext">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-darktext/70">
                  We're building a community of homeowners and professionals who support 
                  each other and contribute to stronger neighborhoods.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-darktext">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-darktext/70">
                  We continuously strive for excellence in every aspect of our service, 
                  from technology to customer experience.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl text-darktext mb-6">How EASYFIX Works</h2>
            <p className="font-paragraph text-lg text-darktext/80 max-w-2xl mx-auto">
              Getting professional home services has never been easier. Here's how our platform works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="font-heading text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="font-heading text-xl text-darktext">Browse & Book</h3>
              <p className="font-paragraph text-darktext/70">
                Browse our services, compare providers, read reviews, and book the perfect 
                professional for your needs with transparent pricing.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="font-heading text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="font-heading text-xl text-darktext">Get Matched</h3>
              <p className="font-paragraph text-darktext/70">
                We connect you with verified professionals in your area who are available 
                and qualified to handle your specific service requirements.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="font-heading text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="font-heading text-xl text-darktext">Enjoy Quality Service</h3>
              <p className="font-paragraph text-darktext/70">
                Receive professional service with guaranteed quality. Rate your experience 
                and help others in the community make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-primary-foreground mb-6">
            Ready to Experience the EASYFIX Difference?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust EASYFIX for their home service needs. 
            Quality, reliability, and peace of mind are just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-background text-darktext hover:bg-secondary px-8 py-3">
              <Link to="/services">Browse Services</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}