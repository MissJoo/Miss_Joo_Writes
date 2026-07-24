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
      {/* Contact hero and form */}
      <section className="flex min-h-[calc(100svh-85px)] items-center bg-journal-bg py-2 md:min-h-[calc(100svh-5rem)] md:py-10">
        <div className="container mx-auto max-w-5xl px-6 lg:px-12">
          <div className="grid items-center gap-4 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
            <div className="mx-auto max-w-md space-y-3 text-center md:text-left">
              <span className="block animate-fade-in font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-journal-gold">
                Connect
              </span>
              <h1 className="animate-fade-in-up font-serif text-3.5xl font-medium leading-tight text-journal-text md:text-5xl">
                Get in Touch
              </h1>
              <div className="mx-auto h-px w-12 bg-journal-champagne/40 md:mx-0"></div>
              <p className="font-sans text-sm font-light leading-relaxed text-journal-text-secondary md:text-base">
                Have a thought to share, a question, or just want to say hello? I'd love to hear from you.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2px] border border-journal-border bg-journal-card p-3 shadow-sm md:p-6">
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <div className="space-y-0.5">
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
                  className="h-9 rounded-none border-0 border-b border-journal-border/80 bg-transparent px-0 py-2 font-sans text-sm text-journal-text transition-colors placeholder:text-journal-muted/50 focus-visible:border-journal-gold focus-visible:ring-0 md:h-10"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-0.5">
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
                  className="h-9 rounded-none border-0 border-b border-journal-border/80 bg-transparent px-0 py-2 font-sans text-sm text-journal-text transition-colors placeholder:text-journal-muted/50 focus-visible:border-journal-gold focus-visible:ring-0 md:h-10"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-0.5">
                <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-journal-gold font-sans font-semibold">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="min-h-[60px] resize-none rounded-none border-0 border-b border-journal-border/80 bg-transparent px-0 py-2 font-sans text-sm text-journal-text transition-colors placeholder:text-journal-muted/50 focus-visible:border-journal-gold focus-visible:ring-0 md:min-h-[72px]"
                  placeholder="What's on your mind?"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-9 w-full rounded-full border-none bg-journal-text px-8 text-[11px] uppercase tracking-widest text-journal-bg shadow-sm transition-colors duration-300 hover:bg-journal-gold sm:w-auto md:h-10"
                >
                  {isSubmitting ? "Opening..." : "Open email draft"}
                </Button>
              </div>
              </form>

              {/* Alternative Contact */}
              <div className="mt-3 border-t border-journal-border/30 pt-2 text-center md:mt-4 md:pt-3">
                <p className="mb-2 font-sans text-xs text-journal-muted">
                  Prefer direct email?
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-journal-text transition-colors duration-300 hover:text-journal-gold"
                >
                  <Mail size={14} className="text-journal-gold transition-transform duration-300 group-hover:scale-105" />
                  <span className="tracking-wide">{CONTACT_EMAIL}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
