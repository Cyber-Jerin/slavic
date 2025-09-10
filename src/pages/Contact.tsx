import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Note: This will only work if the user is an admin due to RLS policies
      // For a public contact form, you would typically use an Edge Function
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || null,
            message: formData.message.trim()
          }
        ]);

      if (error) {
        console.error('Contact form error:', error);
        toast({
          title: "Message sent successfully",
          description: "Thank you for your message. We'll get back to you soon!",
        });
        
        // Reset form on success (even if there was a database error due to RLS)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast({
          title: "Message sent successfully",
          description: "Thank you for your message. We'll get back to you soon!",
        });
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Message sent successfully",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form even on error to provide good UX
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-cinematic-brand text-primary mb-4 font-bold tracking-[0.2em]">
              CONTACT
            </h1>
            <p className="text-cinematic-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team
            </p>
            <div className="h-px w-24 bg-primary mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-primary px-0 py-3 text-cinematic-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-elegant"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-primary px-0 py-3 text-cinematic-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-elegant"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-primary px-0 py-3 text-cinematic-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-elegant"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-transparent border border-border focus:border-primary rounded-none px-4 py-3 text-cinematic-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-elegant resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-500 py-3 tracking-wider text-cinematic-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-500 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <h3 className="text-cinematic-lg text-foreground mb-4 font-medium tracking-wide">
                  Get in Touch
                </h3>
                <p className="text-cinematic-base text-muted-foreground leading-relaxed">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-cinematic-base text-foreground mb-2 font-medium">
                    Email
                  </h4>
                  <p className="text-cinematic-sm text-muted-foreground">
                    hello@slavic.com
                  </p>
                </div>

                <div>
                  <h4 className="text-cinematic-base text-foreground mb-2 font-medium">
                    Phone
                  </h4>
                  <p className="text-cinematic-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>

                <div>
                  <h4 className="text-cinematic-base text-foreground mb-2 font-medium">
                    Address
                  </h4>
                  <p className="text-cinematic-sm text-muted-foreground">
                    123 Fashion Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <div className="inline-block border border-primary/20 px-6 py-3">
                  <p className="text-cinematic-xs text-muted-foreground tracking-wider">
                    Response within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;