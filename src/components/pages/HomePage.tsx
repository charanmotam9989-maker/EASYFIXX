import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, Star, Clock, ArrowRight, CheckCircle2, Zap, Users, Compass } from 'lucide-react';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const { isAuthenticated, actions, member } = useMember();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full Width Asymmetric Layout */}
      <section className="relative w-full max-w-[120rem] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[90vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
            <Badge className="w-fit mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Discover Amazing Travel Experiences
            </Badge>
            <h1 className="font-heading text-5xl lg:text-7xl text-darktext mb-6 leading-tight">
              Explore the World
              <span className="block text-primary mt-2">With Expert Guides</span>
            </h1>
            <p className="font-paragraph text-xl text-darktext/70 mb-10 max-w-xl">
              Connect with passionate local guides and discover unique travel experiences. 
              Authentic adventures, verified guides, unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg">
                <Link to="/experiences">
                  Browse Experiences
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                  className="border-2 border-buttonborder text-darktext hover:bg-secondary h-14 px-8 text-lg"
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-darktext/10">
              <div>
                <div className="font-heading text-3xl text-primary mb-1">1000+</div>
                <div className="font-paragraph text-sm text-darktext/60">Expert Guides</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-primary mb-1">4.9★</div>
                <div className="font-paragraph text-sm text-darktext/60">Avg Rating</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-primary mb-1">50+</div>
                <div className="font-paragraph text-sm text-darktext/60">Destinations</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center p-12">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image 
                src="https://static.wixstatic.com/media/127917_94e286ce3b9f4eef97357be2d0fb2300~mv2.png?originWidth=768&originHeight=576"
                alt="Expert travel guide leading a group of tourists"
                className="w-full h-full object-cover rounded-2xl"
                width={800}
              />
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-background p-6 rounded-xl shadow-2xl border border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-heading text-lg text-darktext">Instant Booking</div>
                    <div className="font-paragraph text-sm text-darktext/60">Reserve your adventure in minutes</div>
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
                Why Choose Guidaroo
              </h2>
              <p className="font-paragraph text-lg text-darktext/70">
                We connect travelers with passionate local guides for authentic, unforgettable experiences
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Verified Guides</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    All guides are background-checked with proven expertise
                  </p>
                </Card>

                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Star className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Quality Experiences</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    Curated travel experiences with authentic local insights
                  </p>
                </Card>

                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Easy Booking</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    Book your adventure in seconds with instant confirmation
                  </p>
                </Card>

                <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl text-darktext mb-3">Global Reach</h3>
                  <p className="font-paragraph text-base text-darktext/70">
                    Explore 50+ destinations with expert local guides
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
              Book Your Adventure in 3 Steps
            </h2>
            <p className="font-paragraph text-lg text-darktext/70 max-w-2xl mx-auto">
              From discovery to adventure - get started in minutes
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
                <h3 className="font-heading text-2xl text-darktext mb-4">Explore Experiences</h3>
                <p className="font-paragraph text-base text-darktext/70 mb-6">
                  Browse our collection of unique travel experiences
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Filter by destination
                  </li>
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Read guide reviews
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-background rounded-2xl p-8 border-2 border-primary/10 hover:border-primary/30 transition-all">
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 font-heading text-3xl shadow-lg">
                  2
                </div>
                <h3 className="font-heading text-2xl text-darktext mb-4">Book Your Spot</h3>
                <p className="font-paragraph text-base text-darktext/70 mb-6">
                  Choose your date and secure your booking instantly
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
                <h3 className="font-heading text-2xl text-darktext mb-4">Enjoy Your Adventure</h3>
                <p className="font-paragraph text-base text-darktext/70 mb-6">
                  Experience authentic travel with your expert guide
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Expert guidance
                  </li>
                  <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Unforgettable memories
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
                Loved by Travelers Worldwide
              </h2>
              <p className="font-paragraph text-lg text-darktext/70 mb-8">
                Join thousands of satisfied travelers who've discovered amazing experiences with Guidaroo
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
                  "Amazing experience! Our guide was so knowledgeable and made the entire trip unforgettable. Highly recommend Guidaroo!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-sm text-darktext">Sarah Johnson</div>
                    <div className="font-paragraph text-xs text-darktext/60">Traveler</div>
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
                  "Best travel experience ever! The guide's passion for their destination was contagious. Worth every penny!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading text-sm text-darktext">Michael Chen</div>
                    <div className="font-paragraph text-xs text-darktext/60">Adventure Seeker</div>
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
            {/* Tourist CTA */}
            <div className="bg-primary px-8 lg:px-16 py-20 lg:py-24 flex flex-col justify-center">
              <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
                Ready to Explore?
              </h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-xl">
                Discover amazing travel experiences and book your next adventure with expert guides today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-background text-darktext hover:bg-secondary h-14 px-8 text-lg">
                  <Link to="/experiences">
                    Browse Experiences
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Guide CTA */}
            <div className="bg-secondary px-8 lg:px-16 py-20 lg:py-24 flex flex-col justify-center">
              <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
                Are You an Expert Guide?
              </h2>
              <p className="font-paragraph text-lg text-darktext/70 mb-8 max-w-xl">
                Share your passion and expertise. Join our community of guides and earn money doing what you love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg">
                  <Link to="/register-guide">
                    Become a Guide
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
