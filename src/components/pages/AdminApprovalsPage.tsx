import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { ServiceProviders } from '@/entities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone,
  Briefcase,
  Star,
  AlertCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

export default function AdminApprovalsPage() {
  const { toast } = useToast();
  
  const [providers, setProviders] = useState<ServiceProviders[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProviders | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const { items } = await BaseCrudService.getAll<ServiceProviders>('serviceproviders');
      setProviders(items);
    } catch (error) {
      console.error('Error loading providers:', error);
      toast({
        title: "Error",
        description: "Failed to load provider applications.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (provider: ServiceProviders) => {
    try {
      await BaseCrudService.update<ServiceProviders>('serviceproviders', {
        _id: provider._id,
        approvalStatus: 'Approved',
        approvalDate: new Date().toISOString()
      });

      // Send approval email
      await sendApprovalEmail(provider);

      toast({
        title: "Provider Approved",
        description: `${provider.providerName} has been approved and is now active on the platform.`,
      });

      loadProviders();
    } catch (error) {
      console.error('Error approving provider:', error);
      toast({
        title: "Error",
        description: "Failed to approve provider.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    if (!selectedProvider) return;

    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    try {
      await BaseCrudService.update<ServiceProviders>('serviceproviders', {
        _id: selectedProvider._id,
        approvalStatus: 'Rejected',
        rejectionReason: rejectionReason.trim(),
        approvalDate: new Date().toISOString()
      });

      // Send rejection email
      await sendRejectionEmail(selectedProvider, rejectionReason.trim());

      toast({
        title: "Provider Rejected",
        description: `${selectedProvider.providerName} has been rejected. A notification email has been sent.`,
      });

      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedProvider(null);
      loadProviders();
    } catch (error) {
      console.error('Error rejecting provider:', error);
      toast({
        title: "Error",
        description: "Failed to reject provider.",
        variant: "destructive",
      });
    }
  };

  const sendApprovalEmail = async (provider: ServiceProviders) => {
    try {
      const emailContent = `
        <h2>Welcome to EASYFIX!</h2>
        <p>Great news! Your provider application has been approved.</p>
        
        <p>You can now:</p>
        <ul>
          <li>Access your provider dashboard</li>
          <li>View and manage incoming service requests</li>
          <li>Build your reputation with customer reviews</li>
          <li>Grow your business on our platform</li>
        </ul>
        
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Log in to your account</li>
          <li>Visit your Provider Dashboard</li>
          <li>Update your availability and service details</li>
          <li>Start accepting service requests</li>
        </ol>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <p>Welcome aboard!</p>
        <p>The EASYFIX Team</p>
      `;

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: provider.email,
          subject: 'Your EASYFIX Provider Application Has Been Approved!',
          html: emailContent,
        }),
      });
    } catch (error) {
      console.error('Error sending approval email:', error);
    }
  };

  const sendRejectionEmail = async (provider: ServiceProviders, reason: string) => {
    try {
      const emailContent = `
        <h2>EASYFIX Provider Application Update</h2>
        <p>Thank you for your interest in joining EASYFIX as a service provider.</p>
        
        <p>After careful review of your application, we regret to inform you that we are unable to approve it at this time.</p>
        
        <p><strong>Reason for Rejection:</strong></p>
        <p>${reason}</p>
        
        <p>We encourage you to address the concerns mentioned above and reapply in the future. Our team is always looking for qualified professionals to join our network.</p>
        
        <p>If you have any questions about this decision, please feel free to contact our support team.</p>
        
        <p>Best regards,<br/>The EASYFIX Team</p>
      `;

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: provider.email,
          subject: 'EASYFIX Provider Application Status',
          html: emailContent,
        }),
      });
    } catch (error) {
      console.error('Error sending rejection email:', error);
    }
  };

  const pendingProviders = providers.filter(p => !p.approvalStatus || p.approvalStatus === 'Pending');
  const approvedProviders = providers.filter(p => p.approvalStatus === 'Approved');
  const rejectedProviders = providers.filter(p => p.approvalStatus === 'Rejected');

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
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
          <h1 className="font-heading text-3xl text-darktext mb-2">
            Provider Approvals
          </h1>
          <p className="font-paragraph text-darktext/70">
            Review and approve or reject new provider applications
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Pending ({pendingProviders.length})</span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Approved ({approvedProviders.length})</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Rejected ({rejectedProviders.length})</span>
              </TabsTrigger>
            </TabsList>

            {/* Pending Tab */}
            <TabsContent value="pending" className="space-y-6">
              {pendingProviders.length === 0 ? (
                <Card className="border-contentblockbackground">
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="font-paragraph text-darktext/70 mb-2">
                      No pending applications
                    </p>
                    <p className="font-paragraph text-sm text-darktext/60">
                      All provider applications have been reviewed.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingProviders.map((provider) => (
                    <ProviderCard
                      key={provider._id}
                      provider={provider}
                      onApprove={() => handleApprove(provider)}
                      onReject={() => {
                        setSelectedProvider(provider);
                        setShowRejectDialog(true);
                      }}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Approved Tab */}
            <TabsContent value="approved" className="space-y-6">
              {approvedProviders.length === 0 ? (
                <Card className="border-contentblockbackground">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="w-12 h-12 text-darktext/30 mx-auto mb-4" />
                    <p className="font-paragraph text-darktext/70">
                      No approved providers yet
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {approvedProviders.map((provider) => (
                    <ProviderCard
                      key={provider._id}
                      provider={provider}
                      onApprove={() => {}}
                      onReject={() => {}}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      isReadOnly
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Rejected Tab */}
            <TabsContent value="rejected" className="space-y-6">
              {rejectedProviders.length === 0 ? (
                <Card className="border-contentblockbackground">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="w-12 h-12 text-darktext/30 mx-auto mb-4" />
                    <p className="font-paragraph text-darktext/70">
                      No rejected providers
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {rejectedProviders.map((provider) => (
                    <ProviderCard
                      key={provider._id}
                      provider={provider}
                      onApprove={() => {}}
                      onReject={() => {}}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      isReadOnly
                      rejectionReason={provider.rejectionReason}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Rejection Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-xl text-darktext">
              Reject Provider Application
            </AlertDialogTitle>
            <AlertDialogDescription className="font-paragraph text-darktext/70">
              Please provide a reason for rejecting {selectedProvider?.providerName}'s application. They will receive this feedback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="border-buttonborder resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="border-buttonborder text-darktext">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Reject Application
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface ProviderCardProps {
  provider: ServiceProviders;
  onApprove: () => void;
  onReject: () => void;
  getStatusColor: (status?: string) => string;
  getStatusIcon: (status?: string) => React.ReactNode;
  isReadOnly?: boolean;
  rejectionReason?: string;
}

function ProviderCard({
  provider,
  onApprove,
  onReject,
  getStatusColor,
  getStatusIcon,
  isReadOnly,
  rejectionReason
}: ProviderCardProps) {
  return (
    <Card className="border-contentblockbackground hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-6">
          {/* Provider Info */}
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="w-16 h-16 flex-shrink-0">
              <AvatarImage src={provider.profilePicture} alt={provider.providerName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {provider.providerName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading text-lg text-darktext">
                    {provider.providerName}
                  </h3>
                  <Badge className={`${getStatusColor(provider.approvalStatus)} border-0 flex items-center gap-1`}>
                    {getStatusIcon(provider.approvalStatus)}
                    <span>{provider.approvalStatus || 'Pending'}</span>
                  </Badge>
                </div>
                <p className="font-paragraph text-sm text-darktext/70">
                  {provider.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <p className="font-paragraph text-sm text-darktext">{provider.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <p className="font-paragraph text-sm text-darktext">{provider.phoneNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <p className="font-paragraph text-sm text-darktext">
                    {provider.yearsOfExperience} years experience
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <p className="font-paragraph text-sm text-darktext">
                    {provider.servicesOffered?.split(',').length || 0} services
                  </p>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="font-paragraph text-xs text-darktext/60 uppercase tracking-wide mb-2">
                  Services Offered
                </p>
                <div className="flex flex-wrap gap-2">
                  {provider.servicesOffered?.split(',').map((service, idx) => (
                    <Badge key={idx} className="bg-primary/10 text-primary border-primary/20">
                      {service.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Rejection Reason */}
              {rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                  <p className="font-paragraph text-xs text-red-600 uppercase tracking-wide mb-1">
                    Rejection Reason
                  </p>
                  <p className="font-paragraph text-sm text-red-700">{rejectionReason}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {!isReadOnly && (
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Button
                onClick={onApprove}
                className="bg-green-600 text-white hover:bg-green-700 whitespace-nowrap"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={onReject}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 whitespace-nowrap"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
