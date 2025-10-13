import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Contact form submitted:", data);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <LandingLayout>
      <SEO
        title="Contact Us - Get in Touch"
        description="Contact our 24/7 support team. We're here to help with any questions about trading, accounts, or our platform."
        keywords="contact trading platform, customer support, trading help, broker contact"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-contact-title">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We're here to help. Reach out to our support team 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <Card className="hover-elevate transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll respond within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        placeholder="John Doe"
                        disabled={contactMutation.isPending}
                        data-testid="input-name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="john@example.com"
                        disabled={contactMutation.isPending}
                        data-testid="input-email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        {...form.register("subject")}
                        placeholder="How can we help?"
                        disabled={contactMutation.isPending}
                        data-testid="input-subject"
                      />
                      {form.formState.errors.subject && (
                        <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        disabled={contactMutation.isPending}
                        data-testid="input-message"
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={contactMutation.isPending}
                      data-testid="button-send-message"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription className="text-base mt-1">
                      support@tradingplatform.com
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Support Hours</CardTitle>
                    <CardDescription className="text-base mt-1">
                      24/7 - We're always here to help
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Office Address</CardTitle>
                    <CardDescription className="text-base mt-1">
                      123 Trading Street, Financial District
                      <br />
                      London, UK
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="hover-elevate transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Chat support coming soon
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
