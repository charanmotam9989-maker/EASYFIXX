import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Services, ServiceProviders, CustomerReviews } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Shield, ArrowLeft } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Services | null>(null);
  const [providers, setProviders] = useState<ServiceProviders[]>([]);
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadServiceDetails();
    }
  }, [id]);

  const loadServiceDetails = async () => {
    try {
      // Load service details
      const serviceData = await BaseCrudService.getById<Services>('services', id!);
      setService(serviceData);

      // Load providers and filter by services offered
      const { items: providersData } = await BaseCrudService.getAll<ServiceProviders>('serviceproviders');
      const relevantProviders = providersData.filter(provider => {
        if (!provider.isAvailable) return false;
        // Check if provider offers this service
        if (provider.servicesOffered) {
          const offeredServices = provider.servicesOffered.split(',').map(s => s.trim());
          return offeredServices.includes(id!);
        }
        return false;
      });
      setProviders(relevantProviders);

      // Load reviews
      const { items: reviewsData } = await BaseCrudService.getAll<CustomerReviews>('customerreviews');
      setReviews(reviewsData.filter(review => review.isVerified));
    } catch (error) {
      console.error('Error loading service details:', error);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length 
    : 0;

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
      {/* Back Navigation */}
      <div className="bg-secondary py-4">
        <div className="max-w-[100rem] mx-auto px-6">
          <Button asChild variant="ghost" className="text-darktext hover:bg-contentblockbackground">
            <Link to="/services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>
      </div>

      {/* Service Header */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Service Image */}
            <div className="space-y-6">
              {service.serviceImage ? (
                <div className="w-full h-96 bg-contentblockbackground rounded-lg overflow-hidden">
                  <Image src={service.serviceImage} alt={service.serviceName || 'Service'} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-96 bg-contentblockbackground rounded-lg flex items-center justify-center">
                  <span className="font-paragraph text-darktext/50">No image available</span>
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="space-y-6">
              <div>
                {service.serviceType && (
                  <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary-foreground">
                    {service.serviceType}
                  </Badge>
                )}
                <h1 className="font-heading text-4xl text-darktext mb-4">
                  {service.serviceName}
                </h1>
                {service.summary && (
                  <p className="font-paragraph text-lg text-darktext/80 mb-6">
                    {service.summary}
                  </p>
                )}
              </div>

              {/* Pricing */}
              {service.startingPrice && (
                <div className="bg-contentblockbackground p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-paragraph text-sm text-darktext/70">Starting Price</span>
                      <div className="font-heading text-3xl font-bold text-darktext">
                        ₹{service.startingPrice}
                      </div>
                    </div>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link to={`/book/${service._id}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Reviews Summary */}
              {reviews.length > 0 && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-paragraph text-darktext">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              )}

              {/* Service Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-sm text-darktext">Verified Professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-paragraph text-sm text-darktext">Quick Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      {service.description && (
        <section className="py-12 bg-secondary">
          <div className="max-w-[100rem] mx-auto px-6">
            <h2 className="font-heading text-2xl text-darktext mb-6">Service Description</h2>
            <div className="prose max-w-none">
              <p className="font-paragraph text-darktext/80 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Available Providers */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-2xl text-darktext mb-8">Available Providers</h2>
          {providers.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <p className="font-paragraph text-darktext/70 mb-4">
                No providers are currently available for this service.
              </p>
              <p className="font-paragraph text-sm text-darktext/60">
                Check back soon or contact us for more information.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.slice(0, 6).map((provider) => (
                <Card key={provider._id} className="border-contentblockbackground">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={provider.profilePicture} alt={provider.providerName} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {provider.providerName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="font-heading text-lg text-darktext">
                          {provider.providerName}
                        </CardTitle>
                        {provider.yearsOfExperience && (
                          <CardDescription className="font-paragraph text-sm">
                            {provider.yearsOfExperience} years experience
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {provider.bio && (
                      <p className="font-paragraph text-sm text-darktext/70 mb-4 line-clamp-2">
                        {provider.bio}
                      </p>
                    )}
                    <Button 
                      asChild 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link to={`/book/${service._id}?provider=${provider._id}`}>
                        Book with {provider.providerName}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl text-darktext">Customer Reviews</h2>
              <Button asChild variant="outline" className="border-buttonborder text-darktext">
                <Link to="/reviews">View All Reviews</Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((review) => (
                <Card key={review._id} className="border-contentblockbackground">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (review.rating || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.isVerified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="font-heading text-base text-darktext">
                      {review.reviewerName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-paragraph text-sm text-darktext/70">
                      {review.reviewContent}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}