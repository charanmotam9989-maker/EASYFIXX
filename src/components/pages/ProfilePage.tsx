import { useState } from 'react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Calendar, Settings, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { member, actions } = useMember();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nickname: member?.profile?.nickname || '',
    firstName: member?.contact?.firstName || '',
    lastName: member?.contact?.lastName || '',
  });

  const handleSave = async () => {
    try {
      // In a real app, you would update the member profile here
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = () => {
    if (member?.contact?.firstName && member?.contact?.lastName) {
      return `${member.contact.firstName.charAt(0)}${member.contact.lastName.charAt(0)}`;
    }
    if (member?.profile?.nickname) {
      return member.profile.nickname.charAt(0).toUpperCase();
    }
    if (member?.loginEmail) {
      return member.loginEmail.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    if (member?.contact?.firstName && member?.contact?.lastName) {
      return `${member.contact.firstName} ${member.contact.lastName}`;
    }
    if (member?.profile?.nickname) {
      return member.profile.nickname;
    }
    return 'User';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'BLOCKED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={member?.profile?.photo?.url} alt={getDisplayName()} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="font-heading text-3xl text-darktext mb-2">
                {getDisplayName()}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="font-paragraph text-darktext/70">
                    {member?.loginEmail}
                  </span>
                  {member?.loginEmailVerified && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
                {member?.status && (
                  <Badge className={`${getStatusColor(member.status)} border-0`}>
                    {member.status}
                  </Badge>
                )}
              </div>
            </div>
            
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-buttonborder text-darktext hover:bg-contentblockbackground"
            >
              <Settings className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card className="border-contentblockbackground">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-darktext flex items-center">
                  <User className="w-5 h-5 mr-3 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription className="font-paragraph text-darktext/70">
                  Manage your personal details and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nickname" className="font-paragraph text-darktext">Nickname</Label>
                      <Input
                        id="nickname"
                        value={editData.nickname}
                        onChange={(e) => setEditData(prev => ({ ...prev, nickname: e.target.value }))}
                        className="border-buttonborder"
                        placeholder="Enter your nickname"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="font-paragraph text-darktext">First Name</Label>
                        <Input
                          id="firstName"
                          value={editData.firstName}
                          onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="border-buttonborder"
                          placeholder="First name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="font-paragraph text-darktext">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editData.lastName}
                          onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="border-buttonborder"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSave}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-buttonborder text-darktext"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-paragraph text-darktext/70 text-sm">Nickname</Label>
                        <p className="font-paragraph text-darktext">
                          {member?.profile?.nickname || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <Label className="font-paragraph text-darktext/70 text-sm">Email</Label>
                        <p className="font-paragraph text-darktext">
                          {member?.loginEmail || 'Not available'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-paragraph text-darktext/70 text-sm">First Name</Label>
                        <p className="font-paragraph text-darktext">
                          {member?.contact?.firstName || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <Label className="font-paragraph text-darktext/70 text-sm">Last Name</Label>
                        <p className="font-paragraph text-darktext">
                          {member?.contact?.lastName || 'Not set'}
                        </p>
                      </div>
                    </div>

                    {member?.contact?.phones && member.contact.phones.length > 0 && (
                      <div>
                        <Label className="font-paragraph text-darktext/70 text-sm">Phone Numbers</Label>
                        <div className="space-y-1">
                          {member.contact.phones.map((phone, index) => (
                            <p key={index} className="font-paragraph text-darktext">{phone}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="border-contentblockbackground">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-darktext flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription className="font-paragraph text-darktext/70">
                  View your account status and security information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-paragraph text-darktext/70 text-sm">Account Status</Label>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(member?.status || '')} border-0`}>
                        {member?.status || 'Unknown'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="font-paragraph text-darktext/70 text-sm">Email Verified</Label>
                    <div className="flex items-center space-x-2">
                      <Badge className={member?.loginEmailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {member?.loginEmailVerified ? 'Verified' : 'Not Verified'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-paragraph text-darktext/70 text-sm">Member Since</Label>
                    <p className="font-paragraph text-darktext">
                      {member?._createdDate 
                        ? format(new Date(member._createdDate), 'MMMM d, yyyy')
                        : 'Not available'
                      }
                    </p>
                  </div>
                  <div>
                    <Label className="font-paragraph text-darktext/70 text-sm">Last Login</Label>
                    <p className="font-paragraph text-darktext">
                      {member?.lastLoginDate 
                        ? format(new Date(member.lastLoginDate), 'MMM d, yyyy')
                        : 'Not available'
                      }
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-contentblockbackground">
                  <Button
                    onClick={actions.logout}
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-contentblockbackground mt-8">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-darktext">Quick Actions</CardTitle>
              <CardDescription className="font-paragraph text-darktext/70">
                Manage your bookings and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="border-buttonborder text-darktext hover:bg-secondary">
                  <a href="/bookings">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Bookings
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-buttonborder text-darktext hover:bg-secondary">
                  <a href="/services">
                    <User className="w-4 h-4 mr-2" />
                    Book Service
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-buttonborder text-darktext hover:bg-secondary">
                  <a href="/reviews">
                    <Settings className="w-4 h-4 mr-2" />
                    My Reviews
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}