import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Services, ServiceProviders, ServiceBookings } from '@/entities';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, MapPin, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Image } from '@/components/ui/image';

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { member } = useMember();
  const { toast } = useToast();
  
  const [service, setService] = useState<Services | null>(null);
  const [providers, setProviders] = useState<ServiceProviders[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    customerName: member?.contact?.firstName && member?.contact?.lastName 
      ? `${member.contact.firstName} ${member.contact.lastName}` 
      : member?.profile?.nickname || '',
    customerEmail: member?.loginEmail || '',
    bookingDate: undefined as Date | undefined,
    bookingTime: '',
    serviceAddress: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      loadBookingData();
    }
  }, [id]);

  useEffect(() => {
    // Pre-select provider if specified in URL
    const providerId = searchParams.get('provider');
    if (providerId) {
      setSelectedProvider(providerId);
    }
  }, [searchParams]);

  const loadBookingData = async () => {
    try {
      // Load service details
      const serviceData = await BaseCrudService.getById<Services>('services', id!);
      setService(serviceData);

      // Load available providers
      const { items: providersData } = await BaseCrudService.getAll<ServiceProviders>('serviceproviders');
      setProviders(providersData.filter(provider => provider.isAvailable));
    } catch (error) {
      console.error('Error loading booking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProvider) {
      toast({
        title: "Provider Required",
        description: "Please select a service provider.",
        variant: "destructive",
      });
      return;
    }

    if (!bookingData.bookingDate) {
      toast({
        title: "Date Required",
        description: "Please select a booking date.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedProviderData = providers.find(p => p._id === selectedProvider);
      
      const newBooking = {
        _id: crypto.randomUUID(),
        serviceName: service?.serviceName,
        providerName: selectedProviderData?.providerName,
        providerPhoneNumber: selectedProviderData?.phoneNumber,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        bookingDate: bookingData.bookingDate,
        bookingTime: bookingData.bookingTime,
        serviceAddress: bookingData.serviceAddress,
        bookingStatus: 'Pending',
        totalPrice: service?.startingPrice
      } as ServiceBookings;

      await BaseCrudService.create('servicebookings', newBooking);
      
      toast({
        title: "Booking Confirmed!",
        description: "Your service has been booked successfully. You'll receive a confirmation email shortly.",
      });
      
      navigate('/bookings');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-darktext mb-4">Service Not Found</h1>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary py-6">
        <div className="max-w-[100rem] mx-auto px-6">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="text-darktext hover:bg-contentblockbackground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-heading text-3xl text-darktext">Book Service</h1>
          <p className="font-paragraph text-darktext/70 mt-2">
            Complete your booking for {service.serviceName}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div>
            <Card className="border-contentblockbackground">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-darktext">Booking Details</CardTitle>
                <CardDescription className="font-paragraph text-darktext/70">
                  Please fill in your booking information below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg text-darktext border-b border-contentblockbackground pb-2">
                      Customer Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerName" className="font-paragraph text-darktext">Full Name *</Label>
                        <Input
                          id="customerName"
                          value={bookingData.customerName}
                          onChange={(e) => handleInputChange('customerName', e.target.value)}
                          required
                          className="border-buttonborder"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerEmail" className="font-paragraph text-darktext">Email *</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={bookingData.customerEmail}
                          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                          required
                          className="border-buttonborder"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Provider */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg text-darktext border-b border-contentblockbackground pb-2">
                      Select Provider
                    </h3>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-darktext">Service Provider *</Label>
                      <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                        <SelectTrigger className="border-buttonborder">
                          <SelectValue placeholder="Choose a service provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {providers.map((provider) => (
                            <SelectItem key={provider._id} value={provider._id}>
                              <div className="flex items-center space-x-2">
                                <span>{provider.providerName}</span>
                                {provider.yearsOfExperience && (
                                  <span className="text-xs text-darktext/60">
                                    ({provider.yearsOfExperience} years exp.)
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg text-darktext border-b border-contentblockbackground pb-2">
                      Schedule Service
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-darktext">Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal border-buttonborder"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingData.bookingDate ? (
                                format(bookingData.bookingDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={bookingData.bookingDate}
                              onSelect={(date) => handleInputChange('bookingDate', date)}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-paragraph text-darktext">Preferred Time *</Label>
                        <Select value={bookingData.bookingTime} onValueChange={(value) => handleInputChange('bookingTime', value)}>
                          <SelectTrigger className="border-buttonborder">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Service Address */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceAddress" className="font-paragraph text-darktext">Service Address *</Label>
                    <Textarea
                      id="serviceAddress"
                      value={bookingData.serviceAddress}
                      onChange={(e) => handleInputChange('serviceAddress', e.target.value)}
                      required
                      rows={3}
                      className="border-buttonborder resize-none"
                      placeholder="Enter the full address where the service will be performed..."
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="font-paragraph text-darktext">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={bookingData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={3}
                      className="border-buttonborder resize-none"
                      placeholder="Any special instructions or requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3"
                  >
                    {isSubmitting ? 'Confirming Booking...' : 'Confirm Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Service Summary */}
            <Card className="border-contentblockbackground">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-darktext">Service Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  {service.serviceImage && (
                    <Image src={service.serviceImage} alt={service.serviceName} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-heading text-lg text-darktext">{service.serviceName}</h3>
                    <p className="font-paragraph text-sm text-darktext/70">{service.serviceType}</p>
                    {service.startingPrice && (
                      <p className="font-heading text-lg font-semibold text-primary mt-2">
                        Starting at ₹{service.startingPrice}
                      </p>
                    )}
                  </div>
                </div>
                
                {service.summary && (
                  <p className="font-paragraph text-sm text-darktext/70 border-t border-contentblockbackground pt-4">
                    {service.summary}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Selected Provider */}
            {selectedProvider && (
              <Card className="border-contentblockbackground">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-darktext">Selected Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const provider = providers.find(p => p._id === selectedProvider);
                    return provider ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-primary" />
                          <span className="font-paragraph text-darktext">{provider.providerName}</span>
                        </div>
                        {provider.yearsOfExperience && (
                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="font-paragraph text-darktext/70">
                              {provider.yearsOfExperience} years of experience
                            </span>
                          </div>
                        )}
                        {provider.bio && (
                          <p className="font-paragraph text-sm text-darktext/70 mt-3">
                            {provider.bio}
                          </p>
                        )}
                      </div>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Booking Info */}
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-darktext">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-paragraph text-sm text-darktext/70">
                <p>• You'll receive a confirmation email after booking</p>
                <p>• The provider will contact you to confirm the appointment</p>
                <p>• You can reschedule or cancel up to 24 hours before the service</p>
                <p>• Payment is due after service completion</p>
                <p>• All our providers are insured and background-checked</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}