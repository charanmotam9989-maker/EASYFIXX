import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMember } from '@/integrations';
import { MapPin, Users, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { actions } = useMember();
  const [userType, setUserType] = useState<'tourist' | 'guide' | null>(null);

  const handleLogin = (type: 'tourist' | 'guide') => {
    setUserType(type);
    // Store the intended role in sessionStorage for post-login handling
    sessionStorage.setItem('intendedRole', type);
    actions.login();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[80vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/30">
            <h1 className="font-heading text-5xl lg:text-6xl text-darktext mb-6 leading-tight">
              Welcome to
              <span className="block text-primary mt-2">Guidaroo</span>
            </h1>
            <p className="font-paragraph text-xl text-darktext/70 mb-8 max-w-xl">
              Discover amazing travel experiences and connect with expert guides from around the world.
            </p>
            <div className="space-y-4 max-w-xl">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg text-darktext mb-1">Explore Destinations</h3>
                  <p className="font-paragraph text-darktext/70">Find unique travel experiences curated by local experts</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg text-darktext mb-1">Meet Expert Guides</h3>
                  <p className="font-paragraph text-darktext/70">Connect with passionate guides who know their destinations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Login Options */}
          <div className="relative bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl text-darktext mb-2">Get Started</h2>
                <p className="font-paragraph text-darktext/70">Choose how you want to use Guidaroo</p>
              </div>

              {/* Tourist Login */}
              <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all cursor-pointer hover:shadow-lg"
                onClick={() => handleLogin('tourist')}>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-darktext flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-primary" />
                    I'm a Tourist
                  </CardTitle>
                  <CardDescription className="font-paragraph text-darktext/70">
                    Discover and book amazing travel experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      Browse travel experiences
                    </li>
                    <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      Book with expert guides
                    </li>
                    <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      Share your experiences
                    </li>
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                    Sign In as Tourist
                  </Button>
                </CardContent>
              </Card>

              {/* Guide Login */}
              <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all cursor-pointer hover:shadow-lg"
                onClick={() => handleLogin('guide')}>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-darktext flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    I'm a Guide
                  </CardTitle>
                  <CardDescription className="font-paragraph text-darktext/70">
                    Share your expertise and earn money
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      Create travel experiences
                    </li>
                    <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      Manage your bookings
                    </li>
                    <li className="flex items-center gap-2 font-paragraph text-sm text-darktext/70">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      Grow your business
                    </li>
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                    Sign In as Guide
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center pt-4">
                <p className="font-paragraph text-sm text-darktext/70">
                  Don't have an account?{' '}
                  <Link to="/" className="text-primary hover:text-primary/80 font-semibold">
                    Go back home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
