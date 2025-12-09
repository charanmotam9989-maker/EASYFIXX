import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Zap, ArrowRight, MapPinIcon } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Services, ServiceProviders } from '@/entities';
import { useGeolocation, calculateDistance } from '@/hooks/useGeolocation';
import { useNotificationStore } from '@/stores/notificationStore';

export default function HomePage() {
  const { member, isAuthenticated } = useMember();
  const { coordinates, requestLocation } = useGeolocation();
  const { addNotification } = useNotificationStore();
  const [services, setServices] = useState<Services[]>([]);
  const [guides, setGuides] = useState<ServiceProviders[]>([]);
  const [nearbyGuides, setNearbyGuides] = useState<ServiceProviders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, guidesData] = await Promise.all([
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<ServiceProviders>('serviceproviders'),
        ]);
        setServices(servicesData.items || []);
        setGuides(guidesData.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock coordinates for demo (Paris, France)
  const demoLat = 48.8566;
  const demoLon = 2.3522;

  useEffect(() => {
    if (guides.length > 0) {
      // Filter guides within 50km radius
      const nearby = guides.filter((guide) => {
        // Mock location coordinates for demo
        const guideCoords = {
          'Paris': { lat: 48.8566, lon: 2.3522 },
          'London': { lat: 51.5074, lon: -0.1278 },
          'Barcelona': { lat: 41.3874, lon: 2.1686 },
          'Amsterdam': { lat: 52.3676, lon: 4.9041 },
          'Rome': { lat: 41.9028, lon: 12.4964 },
          'Berlin': { lat: 52.52, lon: 13.405 },
          'Madrid': { lat: 40.4168, lon: -3.7038 },
          'Vienna': { lat: 48.2082, lon: 16.3738 },
          'Prague': { lat: 50.0755, lon: 14.4378 },
          'Venice': { lat: 45.4408, lon: 12.3155 },
          'Athens': { lat: 37.9838, lon: 23.7275 },
          'Istanbul': { lat: 41.0082, lon: 28.9784 },
        };

        const location = guide.location || 'Paris';
        const coords = guideCoords[location as keyof typeof guideCoords] || { lat: demoLat, lon: demoLon };
        const distance = calculateDistance(demoLat, demoLon, coords.lat, coords.lon);
        return distance <= 50;
      });
      setNearbyGuides(nearby);
    }
  }, [guides]);

  const handleLocationRequest = () => {
    requestLocation();
    addNotification({
      type: 'info',
      title: 'Location Requested',
      message: 'Requesting your location to find nearby guides...',
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-darktext">
              Discover Unforgettable <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">Adventures</span>
            </h1>
            <p className="font-paragraph text-xl text-darktext/70 max-w-2xl mx-auto">
              Connect with expert guides and explore the world's most amazing destinations. From mountain peaks to hidden gems, your next adventure awaits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg transition-shadow"
            >
              <Link to="/experiences" className="flex items-center gap-2">
                Explore Experiences
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleLocationRequest}
              className="border-2 border-accent-teal text-accent-teal hover:bg-accent-teal/10"
            >
              <MapPinIcon className="w-5 h-5 mr-2" />
              Find Nearby Guides
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-16 border-t border-gray-200"
          >
            {[
              { icon: Users, label: 'Active Guides', value: guides.length },
              { icon: Zap, label: 'Experiences', value: services.length },
              { icon: Star, label: 'Avg Rating', value: '4.8' },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent-orange" />
                <p className="font-heading text-2xl md:text-3xl font-bold text-darktext">{stat.value}</p>
                <p className="font-paragraph text-sm text-darktext/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Nearby Guides Section */}
      {nearbyGuides.length > 0 && (
        <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-darktext">
                Guides Near You
              </h2>
              <p className="font-paragraph text-lg text-darktext/60 max-w-2xl mx-auto">
                Discover amazing guides in your area ready to show you the best experiences
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {nearbyGuides.slice(0, 6).map((guide) => (
                <motion.div key={guide._id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
                    <div className="aspect-square bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                      {guide.profilePicture ? (
                        <Image
                          src={guide.profilePicture}
                          alt={guide.providerName || 'Guide'}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-16 h-16 text-white/50" />
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-darktext">{guide.providerName}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-darktext/60">
                          <MapPin className="w-4 h-4 text-accent-orange" />
                          {guide.location || 'Location TBA'}
                        </div>
                      </div>

                      <p className="font-paragraph text-sm text-darktext/70 line-clamp-2">{guide.bio}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent-orange text-accent-orange" />
                          <span className="font-heading font-bold text-darktext">{guide.rating || 5.0}</span>
                        </div>
                        <span className="font-paragraph text-xs text-darktext/60">
                          {guide.yearsOfExperience} yrs exp
                        </span>
                      </div>

                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg"
                      >
                        <Link to="/experiences">View Services</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Featured Experiences Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20 bg-gradient-to-r from-accent-blue/5 to-accent-purple/5 rounded-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-darktext">
              Featured Experiences
            </h2>
            <p className="font-paragraph text-lg text-darktext/60 max-w-2xl mx-auto">
              Handpicked adventures curated by our expert guides
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            {services.slice(0, 4).map((service) => (
              <motion.div key={service._id} variants={itemVariants}>
                <Link to={`/services/${service._id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white group cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-accent-orange to-accent-pink overflow-hidden">
                      {service.serviceImage ? (
                        <Image
                          src={service.serviceImage}
                          alt={service.serviceName || 'Experience'}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Zap className="w-12 h-12 text-white/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue text-xs font-semibold rounded-full">
                            {service.serviceType}
                          </span>
                          <span className="px-3 py-1 bg-accent-purple/10 text-accent-purple text-xs font-semibold rounded-full">
                            {service.difficultyLevel}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-darktext group-hover:text-accent-blue transition-colors">
                          {service.serviceName}
                        </h3>
                      </div>

                      <p className="font-paragraph text-sm text-darktext/70 line-clamp-2">{service.summary}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent-orange" />
                          <span className="font-paragraph text-sm text-darktext/60">{service.destination}</span>
                        </div>
                        <span className="font-heading font-bold text-accent-orange">
                          ${service.startingPrice}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center pt-8">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg"
            >
              <Link to="/experiences" className="flex items-center gap-2">
                View All Experiences
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink rounded-3xl p-12 md:p-20 text-center space-y-8 text-white"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold">
            Ready to Start Your Adventure?
          </h2>
          <p className="font-paragraph text-lg opacity-90 max-w-2xl mx-auto">
            {isAuthenticated
              ? `Welcome back, ${member?.profile?.nickname}! Explore new experiences and book your next adventure.`
              : 'Join thousands of travelers discovering amazing experiences with expert guides around the world.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-accent-blue hover:bg-gray-100 font-semibold"
            >
              <Link to="/experiences">Browse Experiences</Link>
            </Button>
            {!isAuthenticated && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                <Link to="/register-tourist">Sign Up as Tourist</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
