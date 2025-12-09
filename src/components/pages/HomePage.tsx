import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, Star, Clock, ArrowRight, CheckCircle2, Zap, Users, Compass, Globe, Sparkles } from 'lucide-react';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { isAuthenticated, actions, member } = useMember();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-0 min-h-[90vh] relative z-10">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Badge className="w-fit mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="w-3 h-3 mr-2" />
                Discover Amazing Travel Experiences
              </Badge>
            </motion.div>

            <motion.h1
              className="font-heading text-5xl lg:text-7xl text-darktext mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore the World
              <span className="block text-primary mt-2">With Expert Guides</span>
            </motion.h1>

            <motion.p
              className="font-paragraph text-xl text-darktext/70 mb-10 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Connect with passionate local guides and discover unique travel experiences.
              Authentic adventures, verified guides, unforgettable memories.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
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
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-darktext/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { value: '1000+', label: 'Expert Guides' },
                { value: '4.9★', label: 'Avg Rating' },
                { value: '50+', label: 'Destinations' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                >
                  <div className="font-heading text-3xl text-primary mb-1">{stat.value}</div>
                  <div className="font-paragraph text-sm text-darktext/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="https://static.wixstatic.com/media/127917_94e286ce3b9f4eef97357be2d0fb2300~mv2.png?originWidth=768&originHeight=576"
                  alt="Expert travel guide leading a group of tourists"
                  className="w-full h-full object-cover rounded-2xl"
                  width={800}
                />
              </motion.div>

              {/* Floating Card */}
              <motion.div
                className="absolute bottom-8 left-8 right-8 bg-background p-6 rounded-xl shadow-2xl border border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity }}
                  >
                    <Compass className="w-6 h-6 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <div className="font-heading text-lg text-darktext">Instant Booking</div>
                    <div className="font-paragraph text-sm text-darktext/60">Reserve your adventure in minutes</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Asymmetric Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            className="grid lg:grid-cols-12 gap-12 items-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
                Why Choose Guidaroo
              </h2>
              <p className="font-paragraph text-lg text-darktext/70">
                We connect travelers with passionate local guides for authentic, unforgettable experiences
              </p>
            </motion.div>
            <motion.div
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: 'Verified Guides', desc: 'All guides are background-checked with proven expertise' },
                  { icon: Star, title: 'Quality Experiences', desc: 'Curated travel experiences with authentic local insights' },
                  { icon: Zap, title: 'Easy Booking', desc: 'Book your adventure in seconds with instant confirmation' },
                  { icon: Globe, title: 'Global Reach', desc: 'Explore 50+ destinations with expert local guides' },
                ].map((feature, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg p-6 h-full">
                      <motion.div
                        className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <feature.icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      <h3 className="font-heading text-xl text-darktext mb-3">{feature.title}</h3>
                      <p className="font-paragraph text-base text-darktext/70">
                        {feature.desc}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Horizontal Flow */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Simple Process</Badge>
            <h2 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
              Book Your Adventure in 3 Steps
            </h2>
            <p className="font-paragraph text-lg text-darktext/70 max-w-2xl mx-auto">
              From discovery to adventure - get started in minutes
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Connector Lines */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-gradient-to-r from-primary via-primary to-primary opacity-20" style={{ top: '4rem' }}></div>

            {[
              { num: 1, title: 'Explore Experiences', items: ['Filter by destination', 'Read guide reviews'] },
              { num: 2, title: 'Book Your Spot', items: ['Flexible scheduling', 'Instant confirmation'] },
              { num: 3, title: 'Enjoy Your Adventure', items: ['Expert guidance', 'Unforgettable memories'] },
            ].map((step, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <motion.div
                  className="bg-background rounded-2xl p-8 border-2 border-primary/10 hover:border-primary/30 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 font-heading text-3xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.num}
                  </motion.div>
                  <h3 className="font-heading text-2xl text-darktext mb-4">{step.title}</h3>
                  <p className="font-paragraph text-base text-darktext/70 mb-6">
                    {step.num === 1 && 'Browse our collection of unique travel experiences'}
                    {step.num === 2 && 'Choose your date and secure your booking instantly'}
                    {step.num === 3 && 'Experience authentic travel with your expert guide'}
                  </p>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  text: '"Amazing experience! Our guide was so knowledgeable and made the entire trip unforgettable. Highly recommend Guidaroo!"',
                  name: 'Sarah Johnson',
                  role: 'Traveler'
                },
                {
                  text: '"Best travel experience ever! The guide\'s passion for their destination was contagious. Worth every penny!"',
                  name: 'Michael Chen',
                  role: 'Adventure Seeker'
                }
              ].map((review, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="p-6 border-2 border-primary/10 hover:shadow-lg transition-all">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="font-paragraph text-base text-darktext/80 mb-4">
                      {review.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Users className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div>
                        <div className="font-heading text-sm text-darktext">{review.name}</div>
                        <div className="font-paragraph text-xs text-darktext/60">{review.role}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Split Design */}
      <section className="relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Tourist CTA */}
            <motion.div
              className="bg-primary px-8 lg:px-16 py-20 lg:py-24 flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
            </motion.div>

            {/* Guide CTA */}
            <motion.div
              className="bg-secondary px-8 lg:px-16 py-20 lg:py-24 flex flex-col justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
