import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
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
                  className="w-full border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-500 py-3 tracking-wider text-cinematic-sm font-medium"
                >
                  SEND MESSAGE
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