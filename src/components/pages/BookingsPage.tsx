import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { ServiceBookings } from '@/entities';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Clock, User, Map } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingsPage() {
  const { member } = useMember();
  const [bookings, setBookings] = useState<ServiceBookings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [member]);

  const loadBookings = async () => {
    try {
      const { items } = await BaseCrudService.getAll<ServiceBookings>('servicebookings');
      // Filter bookings for the current user
      const userBookings = items.filter(booking => 
        booking.customerEmail === member?.loginEmail
      );
      setBookings(userBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openAddressOnGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl text-darktext mb-2">My Bookings</h1>
              <p className="font-paragraph text-darktext/70">
                Manage your service appointments
              </p>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/services">Book New Service</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-heading text-xl text-darktext mb-4">No Bookings Yet</h3>
                <p className="font-paragraph text-darktext/70 mb-6">
                  You haven't made any service bookings yet. Browse our services to get started.
                </p>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/services">Browse Services</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking._id} className="border-contentblockbackground">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-heading text-xl text-darktext">
                        {booking.serviceName}
                      </CardTitle>
                      <Badge className={`${getStatusColor(booking.bookingStatus || '')} border-0`}>
                        {booking.bookingStatus}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-darktext/70">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-paragraph">{booking.providerName}</span>
                      </div>
                      
                      {booking.bookingDate && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-paragraph">
                            {format(new Date(booking.bookingDate), 'MMM d, yyyy')}
                            {booking.bookingTime && ` at ${booking.bookingTime}`}
                          </span>
                        </div>
                      )}
                      
                      {booking.totalPrice && (
                        <div className="font-paragraph font-semibold text-primary">
                          ₹{booking.totalPrice}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <Button asChild size="sm" variant="outline" className="border-buttonborder text-darktext">
                        <Link to={`/services/${booking._id}`}>View Details</Link>
                      </Button>
                      {booking.serviceAddress && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openAddressOnGoogleMaps(booking.serviceAddress!)}
                          className="border-buttonborder text-darktext hover:bg-contentblockbackground"
                        >
                          <Map className="w-4 h-4 mr-2" />
                          View on Map
                        </Button>
                      )}
                      <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link to="/contact">Contact Support</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}