import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { ServiceProviders, ServiceBookings } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProviderDashboardPage() {
  const { member } = useMember();
  const { toast } = useToast();
  
  const [provider, setProvider] = useState<ServiceProviders | null>(null);
  const [bookings, setBookings] = useState<ServiceBookings[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    averageRating: 0
  });

  useEffect(() => {
    loadProviderData();
  }, [member?.loginEmail]);

  const loadProviderData = async () => {
    try {
      setLoading(true);
      
      // Get all providers and find the one matching current user's email
      const { items: providers } = await BaseCrudService.getAll<ServiceProviders>('serviceproviders');
      const currentProvider = providers.find(p => p.email === member?.loginEmail);
      
      if (currentProvider) {
        setProvider(currentProvider);
        
        // Load bookings for this provider
        const { items: allBookings } = await BaseCrudService.getAll<ServiceBookings>('servicebookings');
        const providerBookings = allBookings.filter(b => b.providerName === currentProvider.providerName);
        setBookings(providerBookings);
        
        // Calculate stats
        const pending = providerBookings.filter(b => b.bookingStatus === 'Pending').length;
        const completed = providerBookings.filter(b => b.bookingStatus === 'Completed').length;
        
        setStats({
          totalBookings: providerBookings.length,
          pendingBookings: pending,
          completedBookings: completed,
          averageRating: currentProvider.yearsOfExperience || 0
        });
      }
    } catch (error) {
      console.error('Error loading provider data:', error);
      toast({
        title: "Error",
        description: "Failed to load provider dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await BaseCrudService.update<ServiceBookings>('servicebookings', {
        _id: bookingId,
        bookingStatus: newStatus
      });
      
      // Reload bookings
      loadProviderData();
      
      toast({
        title: "Status Updated",
        description: `Booking status changed to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'Confirmed':
        return <Clock className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-secondary py-12">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="text-center">
              <h1 className="font-heading text-3xl text-darktext mb-4">
                Provider Dashboard
              </h1>
              <p className="font-paragraph text-darktext/70 mb-6">
                You haven't registered as a provider yet.
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="/provider-registration">Register as Provider</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={provider.profilePicture} alt={provider.providerName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {provider.providerName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="font-heading text-3xl text-darktext mb-2">
                  {provider.providerName}
                </h1>
                <div className="flex items-center space-x-4 mb-3">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    {provider.isAvailable ? 'Available' : 'Not Available'}
                  </Badge>
                  <span className="font-paragraph text-darktext/70">
                    {provider.yearsOfExperience} years experience
                  </span>
                </div>
                <p className="font-paragraph text-darktext/70 max-w-2xl">
                  {provider.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-contentblockbackground">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm text-darktext/70 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-primary" />
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl text-darktext font-bold">
                  {stats.totalBookings}
                </p>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm text-darktext/70 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl text-darktext font-bold">
                  {stats.pendingBookings}
                </p>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm text-darktext/70 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl text-darktext font-bold">
                  {stats.completedBookings}
                </p>
              </CardContent>
            </Card>

            <Card className="border-contentblockbackground">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm text-darktext/70 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl text-darktext font-bold">
                  {provider.yearsOfExperience}
                </p>
                <p className="font-paragraph text-xs text-darktext/60 mt-1">years</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl text-darktext mb-6">Your Bookings</h2>
                
                {bookings.length === 0 ? (
                  <Card className="border-contentblockbackground">
                    <CardContent className="py-12 text-center">
                      <Calendar className="w-12 h-12 text-darktext/30 mx-auto mb-4" />
                      <p className="font-paragraph text-darktext/70">
                        No bookings yet. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking._id} className="border-contentblockbackground hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Booking Details */}
                            <div className="space-y-4">
                              <div>
                                <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide">Service</p>
                                <p className="font-heading text-lg text-darktext">{booking.serviceName}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide">Date</p>
                                  <p className="font-paragraph text-darktext">
                                    {booking.bookingDate ? format(new Date(booking.bookingDate), 'MMM d, yyyy') : 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide">Time</p>
                                  <p className="font-paragraph text-darktext">{booking.bookingTime || 'N/A'}</p>
                                </div>
                              </div>

                              <div>
                                <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide">Address</p>
                                <div className="flex items-start space-x-2">
                                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <p className="font-paragraph text-darktext text-sm">{booking.serviceAddress}</p>
                                </div>
                              </div>
                            </div>

                            {/* Customer & Status */}
                            <div className="space-y-4">
                              <div>
                                <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-2">Customer</p>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-primary" />
                                    <p className="font-paragraph text-darktext">{booking.customerName}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <p className="font-paragraph text-darktext text-sm">{booking.customerEmail}</p>
                                  </div>
                                  {booking.providerPhoneNumber && (
                                    <div className="flex items-center space-x-2">
                                      <Phone className="w-4 h-4 text-primary" />
                                      <p className="font-paragraph text-darktext text-sm">{booking.providerPhoneNumber}</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-2">Status</p>
                                <div className="flex items-center space-x-2 mb-3">
                                  <Badge className={`${getStatusColor(booking.bookingStatus || 'Pending')} border-0 flex items-center space-x-1`}>
                                    {getStatusIcon(booking.bookingStatus || 'Pending')}
                                    <span>{booking.bookingStatus || 'Pending'}</span>
                                  </Badge>
                                </div>
                                
                                {booking.bookingStatus === 'Pending' && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleBookingStatusChange(booking._id, 'Confirmed')}
                                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleBookingStatusChange(booking._id, 'Cancelled')}
                                      className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                      Decline
                                    </Button>
                                  </div>
                                )}
                                
                                {booking.bookingStatus === 'Confirmed' && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleBookingStatusChange(booking._id, 'Completed')}
                                    className="bg-green-600 text-white hover:bg-green-700"
                                  >
                                    Mark Complete
                                  </Button>
                                )}
                              </div>

                              {booking.totalPrice && (
                                <div className="pt-2 border-t border-contentblockbackground">
                                  <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-1">Price</p>
                                  <p className="font-heading text-xl text-primary font-bold">
                                    ₹{booking.totalPrice}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <Card className="border-contentblockbackground">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-darktext">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-1">Email</p>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <p className="font-paragraph text-darktext">{provider.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-1">Phone</p>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <p className="font-paragraph text-darktext">{provider.phoneNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Services Information */}
                <Card className="border-contentblockbackground">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-darktext">Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {provider.servicesOffered?.split(',').map((service, index) => (
                        <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                          {service.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}
                <Card className="border-contentblockbackground md:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl text-darktext">Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-2">Bio</p>
                      <p className="font-paragraph text-darktext">{provider.bio}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-contentblockbackground">
                      <div>
                        <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-1">Years of Experience</p>
                        <p className="font-heading text-2xl text-primary font-bold">{provider.yearsOfExperience}</p>
                      </div>
                      <div>
                        <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-1">Availability</p>
                        <Badge className={provider.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {provider.isAvailable ? 'Available' : 'Not Available'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
