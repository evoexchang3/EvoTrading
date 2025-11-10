import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";
import { Shield, FileText, AlertTriangle } from "lucide-react";

export default function LegalPage() {
  const { t } = useLanguage();
  const variant = useVariant();
  const legalConfig = variant.pages.legal;

  const sections = [
    { id: "terms", title: "Terms of Service", icon: FileText, content: "These terms govern your use of our platform and services. By accessing our platform, you agree to be bound by these terms..." },
    { id: "privacy", title: "Privacy Policy", icon: Shield, content: "We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information..." },
    { id: "risk", title: "Risk Disclosure", icon: AlertTriangle, content: "Trading involves substantial risk of loss. You should carefully consider whether trading is appropriate for your financial situation..." },
    { id: "aml", title: "AML Policy", icon: Shield, content: "We comply with anti-money laundering regulations and maintain strict KYC procedures to prevent financial crimes..." },
    { id: "complaints", title: "Complaints Procedure", icon: FileText, content: "We take all complaints seriously. This procedure outlines how to submit and resolve complaints effectively..." },
  ];

  const heroProps = {
    headline: "Legal Information",
    subheadline: "Important legal documents and policies",
    cta: "Read Documents",
    style: 'standard' as const,
  };

  // Single Column Layout
  const SingleColumnLayout = () => (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="space-y-12">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <section key={section.id} data-testid={`section-${section.id}`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold" data-testid={`heading-${section.id}`}>{section.title}</h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>{section.content}</p>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                <p className="mt-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );

  // Two Column Layout
  const TwoColumnLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={section.id} data-testid={`card-${section.id}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Sidebar Nav Layout
  const SidebarNavLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <h3 className="font-semibold mb-4">Quick Navigation</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-3 py-2 rounded-md hover-elevate text-sm"
                  data-testid={`nav-${section.id}`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-1 space-y-12">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.id} id={section.id} data-testid={`section-${section.id}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <p className="text-muted-foreground">{section.content}</p>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Accordion Layout
  const AccordionLayout = () => (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Legal Documents</h2>
        <p className="text-lg text-muted-foreground">Expand sections to read full details</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <AccordionItem key={section.id} value={section.id} data-testid={`accordion-${section.id}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 text-muted-foreground">
                  <p>{section.content}</p>
                  <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );

  // Accordion Sections Layout
  const AccordionSectionsLayout = () => (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const subsections = ["Overview", "Key Points", "Your Rights", "Compliance"];
          return (
            <Card key={section.id} data-testid={`card-${section.id}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {subsections.map((sub, idx) => (
                    <AccordionItem key={idx} value={`${section.id}-${idx}`}>
                      <AccordionTrigger className="text-sm">{sub}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">{section.content}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Layout dispatcher
  const renderContent = () => {
    switch (legalConfig.layout) {
      case 'single-column':
        return <SingleColumnLayout />;
      
      case 'two-column':
        return <TwoColumnLayout />;
      
      case 'sidebar-nav':
        return <SidebarNavLayout />;
      
      case 'accordion':
        return <AccordionLayout />;
      
      case 'accordion-sections':
        return <AccordionSectionsLayout />;
      
      default:
        return <SingleColumnLayout />;
    }
  };

  return (
    <LandingLayout>
      <SEO
        title="Legal Information"
        description="Important legal documents and policies"
      />
      <div className="min-h-screen">
        <HeroRenderer {...heroProps} />
        {renderContent()}
      </div>
    </LandingLayout>
  );
}
