import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Services, ServiceProviders } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Filter, MapPin, Clock, Zap, TrendingUp, Star, Users } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';
import { useGeolocation, calculateDistance } from '@/hooks/useGeolocation';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Services[]>([]);;
  const [guides, setGuides] = useState<ServiceProviders[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedGuide, setSelectedGuide] = useState<string>('all');
  const { coordinates } = useGeolocation();

  useEffect(() => {
    loadExperiences();
  }, []);

  useEffect(() => {
    filterExperiences();
  }, [experiences, guides, searchTerm, selectedDestination, selectedDifficulty, selectedGuide]);

  const loadExperiences = async () => {
    try {
      const [servicesData, guidesData] = await Promise.all([
        BaseCrudService.getAll<Services>('services'),
        BaseCrudService.getAll<ServiceProviders>('serviceproviders'),
      ]);
      setExperiences(servicesData.items || []);
      setGuides(guidesData.items || []);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterExperiences = () => {
    let filtered = experiences;

    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.destination?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDestination !== 'all') {
      filtered = filtered.filter(exp => exp.destination === selectedDestination);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(exp => exp.difficultyLevel === selectedDifficulty);
    }

    if (selectedGuide !== 'all') {
      filtered = filtered.filter(exp => exp.guideReference === selectedGuide);
    }

    setFilteredExperiences(filtered);
  };

  const destinations = Array.from(new Set(experiences.map(exp => exp.destination).filter(Boolean)));
  const difficulties = Array.from(new Set(experiences.map(exp => exp.difficultyLevel).filter(Boolean)));
  const guideNames = Array.from(new Set(guides.map(g => g.providerName).filter(Boolean)));

  const getDifficultyColor = (difficulty?: string) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'strenuous': return 'bg-red-100 text-red-700';
      default: return 'bg-primary/20 text-primary';
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Hero Section */}
      <section className="relative bg-gradient-to-br from-accent-blue/10 via-background to-accent-purple/10 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-accent-blue/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-heading text-5xl lg:text-6xl text-darktext mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover Unforgettable
              <span className="block bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent mt-2">Travel Experiences</span>
            </motion.h1>
            <motion.p
              className="font-paragraph text-lg text-darktext/70 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore the world with expert local guides. From cultural tours to adventure hiking, find your next adventure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-secondary sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            className="flex flex-col md:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darktext/50 w-4 h-4" />
              <Input
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-buttonborder focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-darktext/70" />
              <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                <SelectTrigger className="w-48 border-buttonborder">
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  {destinations.map(dest => (
                    <SelectItem key={dest} value={dest!}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-darktext/70" />
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-48 border-buttonborder">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff!}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          {filteredExperiences.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-2xl text-darktext mb-4">No experiences found</h3>
              <p className="font-paragraph text-darktext/70">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredExperiences.map((experience) => (
                <motion.div key={experience._id} variants={itemVariants}>
                  <Card className="border-contentblockbackground hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-contentblockbackground">
                      {experience.serviceImage && (
                        <motion.div
                          className="w-full h-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={experience.serviceImage}
                            alt={experience.serviceName || 'Experience'}
                            className="w-full h-full object-cover"
                            width={400}
                          />
                        </motion.div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardHeader className="pb-3 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-lg text-darktext mb-2 line-clamp-2">
                            {experience.serviceName}
                          </CardTitle>
                          {experience.destination && (
                            <div className="flex items-center gap-1 text-sm text-primary mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="font-paragraph">{experience.destination}</span>
                            </div>
                          )}
                        </div>
                        {experience.startingPrice && (
                          <div className="text-right flex-shrink-0">
                            <span className="font-paragraph text-xs text-darktext/70">From</span>
                            <div className="font-heading text-lg font-bold text-primary">
                              ₹{experience.startingPrice}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {experience.duration && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {experience.duration}
                          </Badge>
                        )}
                        {experience.difficultyLevel && (
                          <Badge variant="secondary" className={`text-xs ${getDifficultyColor(experience.difficultyLevel)}`}>
                            <Zap className="w-3 h-3 mr-1" />
                            {experience.difficultyLevel}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {experience.summary && (
                        <CardDescription className="font-paragraph text-darktext/70 mb-4 line-clamp-2 text-sm">
                          {experience.summary}
                        </CardDescription>
                      )}

                      <div className="flex gap-2">
                        <Button
                          asChild
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10"
                        >
                          <Link to={`/services/${experience._id}`}>Details</Link>
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-secondary text-darktext hover:bg-secondary/80 h-10"
                        >
                          <Link to={`/book/${experience._id}`}>Book</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: TrendingUp, label: 'Experiences', value: experiences.length },
              { icon: MapPin, label: 'Destinations', value: destinations.length },
              { icon: Zap, label: 'Difficulty Levels', value: difficulties.length },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                <div className="font-heading text-3xl text-white mb-1">
                  {stat.value}+
                </div>
                <div className="font-paragraph text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
