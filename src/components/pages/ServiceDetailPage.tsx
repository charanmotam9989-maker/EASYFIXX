import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Services, ServiceProviders, CustomerReviews } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, ArrowLeft, Zap, Users } from 'lucide-react';
import { Image } from '@/components/ui/image';
import ChatBox from '@/components/ChatBox';
import { motion } from 'framer-motion';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Services | null>(null);
  const [providers, setProviders] = useState<ServiceProviders[]>([]);
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<ServiceProviders | null>(null);

  useEffect(() => {
    if (id) {
      loadServiceDetails();
    }
  }, [id]);

  const loadServiceDetails = async () => {
    try {
      const serviceData = await BaseCrudService.getById<Services>('services', id!);
      setService(serviceData);

      const { items: providersData } = await BaseCrudService.getAll<ServiceProviders>('serviceproviders');
      const relevantProviders = providersData.filter(provider => {
        if (!provider.isAvailable) return false;
        if (provider.servicesOffered) {
          const offeredServices = provider.servicesOffered.split(',').map(s => s.trim());
          return offeredServices.includes(id!);
        }
        return false;
      });
      setProviders(relevantProviders);

      const { items: reviewsData } = await BaseCrudService.getAll<CustomerReviews>('customerreviews');
      setReviews(reviewsData.filter(review => review.isVerified));
    } catch (error) {
      console.error('Error loading service details:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="font-heading text-2xl text-darktext mb-4">Experience Not Found</h1>
          <Button asChild>
            <Link to="/experiences">Back to Experiences</Link>
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
            <Link to="/experiences">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Experiences
            </Link>
          </Button>
        </div>
      </div>

      {/* Experience Header */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Experience Image */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {service.serviceImage ? (
                <motion.div
                  className="w-full h-96 bg-contentblockbackground rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={service.serviceImage} alt={service.serviceName || 'Experience'} className="w-full h-full object-cover" width={600} />
                </motion.div>
              ) : (
                <div className="w-full h-96 bg-contentblockbackground rounded-lg flex items-center justify-center">
                  <span className="font-paragraph text-darktext/50">No image available</span>
                </div>
              )}
            </motion.div>

            {/* Experience Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
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

              {/* Experience Details */}
              <div className="grid grid-cols-2 gap-4">
                {service.destination && (
                  <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60">Destination</p>
                      <p className="font-heading text-sm text-darktext">{service.destination}</p>
                    </div>
                  </div>
                )}
                {service.duration && (
                  <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60">Duration</p>
                      <p className="font-heading text-sm text-darktext">{service.duration}</p>
                    </div>
                  </div>
                )}
                {service.difficultyLevel && (
                  <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60">Difficulty</p>
                      <p className="font-heading text-sm text-darktext">{service.difficultyLevel}</p>
                    </div>
                  </div>
                )}
                {reviews.length > 0 && (
                  <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <div>
                      <p className="font-paragraph text-xs text-darktext/60">Rating</p>
                      <p className="font-heading text-sm text-darktext">{(reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)}★</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              {service.startingPrice && (
                <motion.div
                  className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-lg text-primary-foreground"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-paragraph text-sm opacity-90">Starting Price</span>
                      <div className="font-heading text-3xl font-bold">
                        ₹{service.startingPrice}
                      </div>
                    </div>
                    <Button asChild size="lg" className="bg-background text-darktext hover:bg-secondary">
                      <Link to={`/book/${service._id}`}>Book Now</Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Description */}
      {service.description && (
        <motion.section
          className="py-12 bg-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-[100rem] mx-auto px-6">
            <h2 className="font-heading text-2xl text-darktext mb-6">About This Experience</h2>
            <div className="prose max-w-none">
              <p className="font-paragraph text-darktext/80 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Available Guides */}
      <motion.section
        className="py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-[100rem] mx-auto px-6">
          <h2 className="font-heading text-2xl text-darktext mb-8">Expert Guides</h2>
          {providers.length === 0 ? (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <Users className="w-12 h-12 text-primary/50 mx-auto mb-4" />
              <p className="font-paragraph text-darktext/70 mb-4">
                No guides are currently available for this experience.
              </p>
              <p className="font-paragraph text-sm text-darktext/60">
                Check back soon or contact us for more information.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.slice(0, 6).map((provider, idx) => (
                <motion.div
                  key={provider._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-contentblockbackground hover:shadow-lg transition-all h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={provider.profilePicture} alt={provider.providerName} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {provider.providerName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="font-heading text-lg text-darktext">
                            {provider.providerName}
                          </CardTitle>
                          {provider.yearsOfExperience && (
                            <CardDescription className="font-paragraph text-sm">
                              {provider.yearsOfExperience} years experience
                            </CardDescription>
                          )}
                          {provider.rating && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="font-paragraph text-xs text-darktext">{provider.rating}★</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {provider.bio && (
                        <p className="font-paragraph text-sm text-darktext/70 mb-4 line-clamp-3 flex-1">
                          {provider.bio}
                        </p>
                      )}
                      {provider.specialties && (
                        <div className="mb-4">
                          <p className="font-paragraph text-xs text-darktext/60 mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {provider.specialties.split(',').map((spec, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-primary/10 text-primary">
                                {spec.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 mt-auto">
                        <Button
                          asChild
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10"
                        >
                          <Link to={`/book/${service._id}?provider=${provider._id}`}>
                            Book
                          </Link>
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedGuide(provider);
                            setShowChat(true);
                          }}
                          variant="outline"
                          className="flex-1 border-buttonborder h-10"
                        >
                          Chat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <motion.section
          className="py-12 bg-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl text-darktext">Traveler Reviews</h2>
              <Button asChild variant="outline" className="border-buttonborder text-darktext">
                <Link to="/reviews">View All Reviews</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-contentblockbackground hover:shadow-lg transition-all h-full">
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
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Chat Box */}
      {showChat && selectedGuide && (
        <ChatBox
          guideName={selectedGuide.providerName}
          experienceName={service.serviceName}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}
