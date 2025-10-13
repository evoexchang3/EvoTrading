import { LandingLayout } from "@/components/LandingLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from "@/components/SEO";

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Account & Registration",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Create Account' button in the top right corner, fill out the registration form with your details, and verify your email address. The process takes less than 5 minutes.",
        },
        {
          question: "What documents do I need for KYC verification?",
          answer: "You'll need a government-issued ID (passport, driver's license, or national ID card) and proof of address (utility bill or bank statement) not older than 3 months.",
        },
        {
          question: "Can I have multiple accounts?",
          answer: "No, each person is allowed only one account per platform to comply with regulatory requirements and prevent abuse.",
        },
      ],
    },
    {
      category: "Deposits & Withdrawals",
      questions: [
        {
          question: "What deposit methods are available?",
          answer: "We accept bank transfers, credit/debit cards, and various cryptocurrencies. Minimum deposit is $100 for most methods.",
        },
        {
          question: "How long do withdrawals take?",
          answer: "Crypto withdrawals are processed within 1-2 hours. Bank transfers take 1-3 business days depending on your bank and location.",
        },
        {
          question: "Are there any withdrawal fees?",
          answer: "We don't charge withdrawal fees, but your bank or payment provider may apply their own fees. Crypto withdrawals have network fees.",
        },
        {
          question: "What is the minimum withdrawal amount?",
          answer: "The minimum withdrawal is $50 for bank transfers and varies for cryptocurrencies based on network fees.",
        },
      ],
    },
    {
      category: "Trading",
      questions: [
        {
          question: "What markets can I trade?",
          answer: "We offer forex (50+ currency pairs), cryptocurrencies (100+ assets), commodities (gold, silver, oil), and major stock indices.",
        },
        {
          question: "What are the trading hours?",
          answer: "Forex markets are available 24/5 (Sunday evening to Friday evening). Crypto markets are open 24/7. Other markets follow their respective exchange hours.",
        },
        {
          question: "What is leverage and how does it work?",
          answer: "Leverage allows you to control a larger position with a smaller amount of capital. For example, 1:100 leverage means $1,000 can control a $100,000 position. Higher leverage increases both potential profits and losses.",
        },
        {
          question: "What are the spreads and commissions?",
          answer: "Spreads start from 0.1 pips for major forex pairs. We offer competitive, transparent pricing with no hidden fees. Check our fee schedule for detailed information.",
        },
      ],
    },
    {
      category: "Security & Safety",
      questions: [
        {
          question: "How is my money protected?",
          answer: "Client funds are kept in segregated accounts separate from company operating funds. We use bank-level encryption and are fully regulated and licensed.",
        },
        {
          question: "Do you offer two-factor authentication (2FA)?",
          answer: "Yes, we strongly recommend enabling 2FA for additional account security. You can enable it in your security settings.",
        },
        {
          question: "What happens if I forget my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox to reset your password.",
        },
        {
          question: "Is my personal data secure?",
          answer: "Yes, we use industry-standard encryption and comply with GDPR and other privacy regulations. We never share your data with third parties without your consent.",
        },
      ],
    },
    {
      category: "Platform & Technical",
      questions: [
        {
          question: "Do you have a mobile app?",
          answer: "Yes, our platform is fully responsive and works on mobile browsers. Native iOS and Android apps are coming soon.",
        },
        {
          question: "What if I experience technical issues?",
          answer: "Contact our 24/7 support team via live chat, email, or phone. We also have a comprehensive help center with troubleshooting guides.",
        },
        {
          question: "Can I use automated trading strategies?",
          answer: "Yes, our platform supports automated trading through our API. Advanced users can implement algorithmic trading strategies.",
        },
      ],
    },
  ];

  return (
    <LandingLayout>
      <SEO
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about our trading platform, accounts, deposits, withdrawals, trading, and security."
        keywords="trading faq, broker questions, trading help, platform support"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-faq-title">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our platform, trading, and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-6" data-testid={`text-category-${categoryIndex}`}>
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem
                      key={`${categoryIndex}-${questionIndex}`}
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border rounded-lg px-6 hover-elevate transition-all"
                      data-testid={`accordion-item-${categoryIndex}-${questionIndex}`}
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold" data-testid="text-contact-cta-title">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href="/contact" className="inline-block">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover-elevate active-elevate-2 min-h-9 px-4 py-2" data-testid="button-contact-us">
                  Contact Support
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
