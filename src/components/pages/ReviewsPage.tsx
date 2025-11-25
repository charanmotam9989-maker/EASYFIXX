import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { CustomerReviews } from '@/entities';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Star, Plus, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function ReviewsPage() {
  const { member, isAuthenticated } = useMember();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newReview, setNewReview] = useState({
    reviewerName: member?.profile?.nickname || member?.contact?.firstName || '',
    rating: 0,
    reviewContent: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { items } = await BaseCrudService.getAll<CustomerReviews>('customerreviews');
      // Sort by most recent first
      const sortedReviews = items.sort((a, b) => {
        const dateA = a.submissionDate ? new Date(a.submissionDate) : new Date(0);
        const dateB = b.submissionDate ? new Date(b.submissionDate) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      setReviews(sortedReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        _id: crypto.randomUUID(),
        reviewerName: newReview.reviewerName,
        rating: newReview.rating,
        reviewContent: newReview.reviewContent,
        submissionDate: new Date(),
        isVerified: true // In a real app, this would be determined by the system
      } as CustomerReviews;

      await BaseCrudService.create('customerreviews', reviewData);
      
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. Your review has been published.",
      });
      
      // Reset form and close dialog
      setNewReview({
        reviewerName: member?.profile?.nickname || member?.contact?.firstName || '',
        rating: 0,
        reviewContent: ''
      });
      setIsDialogOpen(false);
      
      // Reload reviews
      loadReviews();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.reviewerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.reviewContent?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-3xl text-darktext mb-2">Customer Reviews</h1>
              <p className="font-paragraph text-darktext/70">
                See what our customers are saying about their service experiences
              </p>
            </div>
            {isAuthenticated && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Write Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-xl text-darktext">Write a Review</DialogTitle>
                    <DialogDescription className="font-paragraph text-darktext/70">
                      Share your experience with our services to help other customers.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reviewerName" className="font-paragraph text-darktext">Your Name</Label>
                      <Input
                        id="reviewerName"
                        value={newReview.reviewerName}
                        onChange={(e) => setNewReview(prev => ({ ...prev, reviewerName: e.target.value }))}
                        required
                        className="border-buttonborder"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-paragraph text-darktext">Rating</Label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                rating <= newReview.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reviewContent" className="font-paragraph text-darktext">Your Review</Label>
                      <Textarea
                        id="reviewContent"
                        value={newReview.reviewContent}
                        onChange={(e) => setNewReview(prev => ({ ...prev, reviewContent: e.target.value }))}
                        required
                        rows={4}
                        className="border-buttonborder resize-none"
                        placeholder="Tell us about your experience..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 border-buttonborder text-darktext"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Reviews Summary */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-contentblockbackground rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="font-heading text-4xl font-bold text-darktext mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
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
                <p className="font-paragraph text-darktext/70">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="font-paragraph text-sm text-darktext">{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-paragraph text-sm text-darktext/70 w-8">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 border-b border-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darktext/50 w-4 h-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-buttonborder"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-primary/50 mx-auto mb-6" />
              <h3 className="font-heading text-xl text-darktext mb-4">
                {searchTerm ? 'No reviews found' : 'No reviews yet'}
              </h3>
              <p className="font-paragraph text-darktext/70 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms.'
                  : 'Be the first to share your experience with our services.'
                }
              </p>
              {isAuthenticated && !searchTerm && (
                <Button 
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Write First Review
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredReviews.map((review) => (
                <Card key={review._id} className="border-contentblockbackground">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="font-heading text-lg text-darktext">
                            {review.reviewerName}
                          </CardTitle>
                          {review.isVerified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
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
                      </div>
                      {review.submissionDate && (
                        <span className="font-paragraph text-sm text-darktext/60">
                          {format(new Date(review.submissionDate), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="font-paragraph text-darktext/80 leading-relaxed">
                      {review.reviewContent}
                    </p>
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