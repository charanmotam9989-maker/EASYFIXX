import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, Filter } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [filteredServices, setFilteredServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedType]);

  const loadServices = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Services>('services');
      setServices(items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(service => service.serviceType === selectedType);
    }

    setFilteredServices(filtered);
  };

  const serviceTypes = Array.from(new Set(services.map(service => service.serviceType).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl lg:text-5xl text-darktext mb-6">
              Professional Home Services
            </h1>
            <p className="font-paragraph text-lg text-darktext/80 mb-8">
              Browse our comprehensive range of home repair and maintenance services. 
              All providers are verified professionals with transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darktext/50 w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-buttonborder"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-darktext/70" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 border-buttonborder">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {serviceTypes.map(type => (
                    <SelectItem key={type} value={type!}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-heading text-xl text-darktext mb-4">No services found</h3>
              <p className="font-paragraph text-darktext/70">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service._id} className="border-contentblockbackground hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    {service.serviceImage && (
                      <div className="w-full h-48 bg-contentblockbackground rounded-lg mb-4 overflow-hidden">
                        <Image src={service.serviceImage} alt={service.serviceName || 'Service'} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="font-heading text-xl text-darktext mb-2">
                          {service.serviceName}
                        </CardTitle>
                        {service.serviceType && (
                          <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary-foreground">
                            {service.serviceType}
                          </Badge>
                        )}
                      </div>
                      {service.startingPrice && (
                        <div className="text-right">
                          <span className="font-paragraph text-sm text-darktext/70">Starting at</span>
                          <div className="font-heading text-lg font-semibold text-darktext">
                            ₹{service.startingPrice}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {service.summary && (
                      <CardDescription className="font-paragraph text-darktext/70 mb-4 line-clamp-3">
                        {service.summary}
                      </CardDescription>
                    )}
                    
                    <div className="flex gap-3">
                      <Button 
                        asChild 
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Link to={`/services/${service._id}`}>View Details</Link>
                      </Button>
                      <Button 
                        asChild 
                        variant="outline" 
                        className="border-buttonborder text-darktext hover:bg-secondary"
                      >
                        <Link to={`/book/${service._id}`}>Book Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-primary-foreground mb-6">
            Need a Custom Service?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Can't find exactly what you're looking for? Contact us and we'll help you find the right professional for your specific needs.
          </p>
          <Button 
            asChild 
            className="bg-background text-darktext hover:bg-secondary border border-primary-foreground px-8 py-3"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}