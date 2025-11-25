import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Shield, Star, Clock, ArrowRight, CheckCircle2, Zap, Users } from 'lucide-react';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full Width Asymmetric Layout */}
      <section className="relative w-full max-w-[120rem] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[90vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
            <Badge className="w-fit mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Trusted by 10,000+ Homeowners
            </Badge>
            <h1 className="font-heading text-5xl lg:text-7xl text-darktext mb-6 leading-tight">
              Your Home
              <span className="block text-primary mt-2">Deserves Expert Care</span>
            </h1>
            <p className="font-paragraph text-xl text-darktext/70 mb-10 max-w-xl">
              Connect with verified professionals for all your repair and maintenance needs. 
              Quality service, guaranteed satisfaction, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg">
                <Link to="/services">
                  Browse Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={actions.login}
                  className="border-2 border-buttonborder text-darktext hover:bg-secondary h-14 px-8 text-lg"
                >
                  Sign In
                </Button>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-darktext/10">
              <div>
                <div className="font-heading text-3xl text-primary mb-1">500+</div>
                <div className="font-paragraph text-sm text-darktext/60">Verified Pros</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-primary mb-1">4.9★</div>
                <div className="font-paragraph text-sm text-darktext/60">Avg Rating</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-primary mb-1">24/7</div>
                <div className="font-paragraph text-sm text-darktext/60">Support</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center p-12">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image 
                src="https://static.wixstatic.com/media/127917_94e286ce3b9f4eef97357be2d0fb2300~mv2.png?originWidth=768&originHeight=576"
                alt="Professional home service expert at work"
                className="w-full h-full object-cover rounded-2xl"
                width={800}
              />
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-background p-6 rounded-xl shadow-2xl border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-heading text-lg text-darktext">Instant Booking</div>
                    <div className="font-paragraph text-sm text-darktext/60">Get confirmed in minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Asymmetric Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
                Why Thousands Choose EASYFIX
              </h2>
              <p className="font-paragraph text-lg text-darktext/70">
                We've revolutionized home services by combining technology with trusted professionals
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Verified Professionals</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    Background-checked experts with proven track records
                  </p>
                </Card>

                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Star className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Quality Guaranteed</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    100% satisfaction guarantee on every service
                  </p>
                </Card>

                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Lightning Fast</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    Book in 60 seconds, get service same-day
                  </p>
                </Card>

                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Wrench className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">All Services</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    From plumbing to electrical - we've got you covered
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal Flow */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Simple Process</Badge>
            <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
              Book a Service in 3 Easy Steps
            </h2>
            <p className="font-paragraph text-lg text-darktext/70 max-w-2xl mx-auto">
              Our streamlined process gets you from browsing to booking in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Lines */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-gradient-to-r from-primary via-primary to-primary opacity-20" style={{ top: '4rem' }}></div>
            
            <div className="relative">
              <div className="bg-background rounded-2xl p-8 border-2 border-primary/10 hover:border-primary/30 transition-all">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 font-heading text-3xl shadow-lg">
                  1
                </div>
                <h3 className="font-heading text-2xl text-darktext mb-4">Choose Your Service</h3>
                <p className="font-paragraph text-base text-darktext/70 mb-6">
                  Browse our comprehensive catalog of professional home services
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Compare providers
                  </li>
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Read reviews
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-background rounded-2xl p-8 border-2 border-primary/10 hover:border-primary/30 transition-all">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 font-heading text-3xl shadow-lg">
                  2
                </div>
                <h3 className="font-heading text-2xl text-darktext mb-4">Book Instantly</h3>
                <p className="font-paragraph text-base text-darktext/70 mb-6">
                  Select your preferred date, time, and get instant confirmation
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Flexible scheduling
                  </li>
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Instant confirmation
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-background rounded-2xl p-8 border-2 border-primary/10 hover:border-primary/30 transition-all">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 font-heading text-3xl shadow-lg">
                  3
                </div>
                <h3 className="font-heading text-2xl text-darktext mb-4">Relax & Enjoy</h3>
                <p className="font-paragraph text-base text-darktext/70 mb-6">
                  Our verified professionals handle everything with expertise
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Professional service
                  </li>
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Quality guaranteed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Testimonials</Badge>
              <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
                Loved by Homeowners Everywhere
              </h2>
              <p className="font-paragraph text-lg text-darktext/70 mb-8">
                Join thousands of satisfied customers who trust EASYFIX for their home service needs
              </p>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/reviews">
                  Read All Reviews
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 border-2 border-primary/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-paragraph text-base text-darktext/80 mb-4">
                  "EASYFIX made finding a reliable plumber so easy! The booking process was seamless and the service was excellent."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-sm text-darktext">Priya Sharma</div>
                    <div className="font-paragraph text-xs text-darktext/60">Homeowner</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-primary/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-paragraph text-base text-darktext/80 mb-4">
                  "Professional, fast, and affordable. I've used EASYFIX for multiple services and they never disappoint!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-sm text-darktext">Rajesh Kumar</div>
                    <div className="font-paragraph text-xs text-darktext/60">Property Manager</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Split Design */}
      <section className="relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Customer CTA */}
            <div className="bg-primary px-8 lg:px-16 py-20 lg:py-24 flex flex-col justify-center">
              <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
                Ready to Get Started?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-xl">
                Browse our services and book your first appointment today. Quality service is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-background text-darktext hover:bg-secondary h-14 px-8 text-lg">
                  <Link to="/services">
                    Explore Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Provider CTA */}
            <div className="bg-secondary px-8 lg:px-16 py-20 lg:py-24 flex flex-col justify-center">
              <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
                Are You a Professional?
              </h2>
              <p className="font-paragraph text-lg text-darktext/70 mb-8 max-w-xl">
                Join our network of trusted service providers and grow your business with EASYFIX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg">
                  <Link to="/provider-registration">
                    Become a Provider
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
