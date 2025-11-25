import { Outlet, Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-secondary sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-heading font-bold text-primary-foreground text-sm">EF</span>
              </div>
              <span className="font-heading text-xl font-bold text-darktext">EASYFIX</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="font-paragraph text-darktext hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoading ? (
                <LoadingSpinner />
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/bookings" className="font-paragraph text-darktext hover:text-primary transition-colors">
                    My Bookings
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-darktext hover:text-primary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-paragraph">{member?.profile?.nickname || 'Profile'}</span>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={actions.logout}
                    className="border-buttonborder text-darktext hover:bg-secondary"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={actions.login}
                    className="border-buttonborder text-darktext hover:bg-secondary"
                  >
                    Sign In
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link to="/provider-registration">Join as Provider</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-darktext" />
              ) : (
                <Menu className="w-6 h-6 text-darktext" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-secondary">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block font-paragraph text-darktext hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <div className="space-y-4 pt-4 border-t border-secondary">
                    <Link
                      to="/bookings"
                      className="block font-paragraph text-darktext hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/profile"
                      className="block font-paragraph text-darktext hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-paragraph text-darktext hover:text-primary transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-4 border-t border-secondary">
                    <button
                      onClick={() => {
                        actions.login();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left font-paragraph text-darktext hover:text-primary transition-colors"
                    >
                      Sign In
                    </button>
                    <Link
                      to="/provider-registration"
                      className="block font-paragraph text-darktext hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Join as Provider
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-contentblockbackground">
        <div className="max-w-[100rem] mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-heading font-bold text-primary-foreground text-sm">EF</span>
                </div>
                <span className="font-heading text-xl font-bold text-darktext">EASYFIX</span>
              </div>
              <p className="font-paragraph text-sm text-darktext/70">
                Professional home services made simple. Connect with verified professionals for all your repair and maintenance needs.
              </p>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-darktext">Services</h3>
              <ul className="space-y-2 font-paragraph text-sm text-darktext/70">
                <li>Electrician</li>
                <li>Plumber</li>
                <li>Carpenter</li>
                <li>AC Technician</li>
                <li>Cleaner</li>
                <li>Painter</li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-darktext">Company</h3>
              <ul className="space-y-2 font-paragraph text-sm">
                <li>
                  <Link to="/about" className="text-darktext/70 hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-darktext/70 hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/provider-registration" className="text-darktext/70 hover:text-primary transition-colors">
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold text-darktext">Support</h3>
              <ul className="space-y-2 font-paragraph text-sm">
                <li>
                  <Link to="/reviews" className="text-darktext/70 hover:text-primary transition-colors">
                    Reviews
                  </Link>
                </li>
                <li className="text-darktext/70">Help Center</li>
                <li className="text-darktext/70">Safety</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-contentblockbackground mt-8 pt-8 text-center">
            <p className="font-paragraph text-sm text-darktext/70">
              © 2024 EASYFIX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}