import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Mail, Users, AlertCircle, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface NewsletterSignup {
  id: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [newsletterSignups, setNewsletterSignups] = useState<NewsletterSignup[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      // Check if user is admin
      const { data: adminCheck, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        toast({
          title: "Access Error",
          description: "Could not verify admin status",
          variant: "destructive",
        });
        return;
      }

      if (!adminCheck) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      await loadData();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      // Load contact messages
      const { data: messages, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Error loading contact messages:', messagesError);
      } else {
        setContactMessages(messages || []);
      }

      // Load newsletter signups
      const { data: signups, error: signupsError } = await supabase
        .from('newsletter_signups')
        .select('*')
        .order('created_at', { ascending: false });

      if (signupsError) {
        console.error('Error loading newsletter signups:', signupsError);
      } else {
        setNewsletterSignups(signups || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Data Load Error",
        description: "Could not load admin data",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have admin privileges to access this page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <Badge variant="secondary">
                <User className="w-3 h-3 mr-1" />
                {user?.email}
              </Badge>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contactMessages.length}</div>
              <p className="text-xs text-muted-foreground">
                Total messages received
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newsletterSignups.length}</div>
              <p className="text-xs text-muted-foreground">
                Active subscribers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(
                  contactMessages.filter(msg => 
                    new Date(msg.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length,
                  newsletterSignups.filter(signup => 
                    new Date(signup.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                New this week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <div className="space-y-4">
              {contactMessages.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No contact messages yet</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                contactMessages.map((message) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{message.name}</CardTitle>
                          <CardDescription>{message.email}</CardDescription>
                        </div>
                        <Badge variant="outline">
                          {formatDate(message.created_at)}
                        </Badge>
                      </div>
                      {message.subject && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="text-sm font-medium">Subject:</h4>
                            <p className="text-sm text-muted-foreground">{message.subject}</p>
                          </div>
                        </>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Message:</h4>
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="newsletter">
            <div className="space-y-4">
              {newsletterSignups.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No newsletter subscribers yet</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Subscribers</CardTitle>
                    <CardDescription>
                      {newsletterSignups.length} total subscribers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {newsletterSignups.map((signup) => (
                        <div key={signup.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">{signup.email}</p>
                          </div>
                          <Badge variant="outline">
                            {formatDate(signup.created_at)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;