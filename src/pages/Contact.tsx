import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl animate-fade-in-up">
              Get in touch
            </h1>
            <p className="text-muted-foreground font-sans text-lg animate-fade-in-delay-1">
              Have a thought to share? A question? Or just want to say hello?
              <br />
              I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-section">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 animate-fade-in-delay-1">
                <label htmlFor="name" className="text-xs tracking-widest uppercase text-muted-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2 animate-fade-in-delay-2">
                <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2 animate-fade-in-delay-2">
                <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-foreground transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <div className="pt-4 animate-fade-in-delay-3">
                <Button
                  type="submit"
                  variant="journal-primary"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </div>
            </form>

            {/* Alternative Contact */}
            <div className="mt-16 pt-16 border-t border-border/50 text-center animate-fade-in-delay-3">
              <p className="text-muted-foreground text-sm mb-4">
                Prefer email?
              </p>
              <a
                href="mailto:hello@missjooo.com"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300 group"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">hello@missjooo.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
