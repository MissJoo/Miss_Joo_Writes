import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "missjodiaries@gmail.com";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Message from ${formData.name} via Miss Joo Writes`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    toast({
      title: "Opening your email app",
      description: "Please review the draft and press send so your message reaches my inbox.",
    });

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block animate-fade-in">
              Connect
            </span>
            <h1 className="font-serif text-3.5xl md:text-5xl leading-tight text-journal-text animate-fade-in-up font-medium">
              Get in Touch
            </h1>
            <div className="w-12 h-px bg-journal-champagne/40 mx-auto mt-2"></div>
            <p className="text-journal-text-secondary font-sans text-sm md:text-base font-light max-w-md mx-auto leading-relaxed">
              Have a thought to share, a question, or just want to say hello? I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20 bg-journal-bg">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-lg mx-auto bg-journal-card border border-journal-border p-8 md:p-10 rounded-[2px] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 animate-fade-in-delay-1">
                <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-journal-gold font-sans font-semibold">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b border-journal-border/80 rounded-none px-0 py-3 text-journal-text focus-visible:ring-0 focus-visible:border-journal-gold transition-colors text-sm font-sans placeholder:text-journal-muted/50"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2 animate-fade-in-delay-2">
                <label htmlFor="email" className="text-[10px] tracking-widest uppercase text-journal-gold font-sans font-semibold">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b border-journal-border/80 rounded-none px-0 py-3 text-journal-text focus-visible:ring-0 focus-visible:border-journal-gold transition-colors text-sm font-sans placeholder:text-journal-muted/50"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2 animate-fade-in-delay-2">
                <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-journal-gold font-sans font-semibold">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-transparent border-0 border-b border-journal-border/80 rounded-none px-0 py-3 text-journal-text focus-visible:ring-0 focus-visible:border-journal-gold transition-colors text-sm font-sans placeholder:text-journal-muted/50 resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <div className="pt-4 animate-fade-in-delay-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-full bg-journal-text hover:bg-journal-gold text-journal-bg border-none tracking-widest uppercase text-[11px] h-12 px-8 transition-colors duration-300 shadow-sm"
                >
                  {isSubmitting ? "Opening..." : "Open email draft"}
                </Button>
              </div>
            </form>

            {/* Alternative Contact */}
            <div className="mt-12 pt-8 border-t border-journal-border/30 text-center animate-fade-in-delay-3">
              <p className="text-journal-muted text-xs mb-3 font-sans">
                Prefer direct email?
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-journal-text hover:text-journal-gold transition-colors duration-300 group text-sm font-sans font-medium"
              >
                <Mail size={14} className="group-hover:scale-105 transition-transform duration-300 text-journal-gold" />
                <span className="tracking-wide">{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
