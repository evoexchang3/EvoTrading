import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  const [location] = useLocation();
  const { t } = useLanguage();

  const mainNavigation = [
    { name: t('nav.home'), href: "/", testId: "link-home" },
    { name: t('nav.about'), href: "/about", testId: "link-about" },
    { name: t('nav.faq'), href: "/faq", testId: "link-faq" },
    { name: t('nav.education'), href: "/education", testId: "link-education" },
    { name: t('nav.contact'), href: "/contact", testId: "link-contact" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2" data-testid="link-home">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Trading Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2 cursor-pointer",
                    location === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={item.testId}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Auth Buttons */}
            <Link href="/login">
              <Button variant="ghost" size="sm" data-testid="button-login">
                {t('nav.login')}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" data-testid="button-register">
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-5">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">Trading Platform</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional trading platform for forex, crypto, and commodities. Regulated and secure.
              </p>
            </div>

            {/* Market Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Information</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/info/technical-analysis">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-technical-analysis">
                      Technical Analysis
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/info/fundamental-analysis">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-fundamental-analysis">
                      Fundamental Analysis
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/info/trading-signals">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-trading-signals">
                      Trading Signals
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/info/market-heatmap">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-market-heatmap">
                      Market Heatmap
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Customer</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/customer/account-types">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-account-types">
                      Account Types
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/payment-methods">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-payment-methods">
                      Payment Methods
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/verification">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-verification">
                      Verification
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/customer/advice">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-advice">
                      Trading Advice
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-about">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-contact">
                      Contact
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-legal">
                      Legal
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/rates">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-rates">
                      Rate Table
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trust & Security */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Trust & Security</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/company/regulatory">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-regulatory">
                      Regulatory & Licenses
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/safety-of-funds">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-safety-of-funds">
                      Safety of Funds
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/security">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-security">
                      Security & Data Protection
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/platform-status">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-platform-status">
                      Platform Status
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/company/complaints">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-complaints">
                      Complaints & Disputes
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/faq">
                    <span className="hover:text-foreground cursor-pointer" data-testid="footer-link-faq">
                      FAQ
                    </span>
                  </Link>
                </li>
                <li>support@tradingplatform.com</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Trading Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                SSL Secured
              </span>
              <span>GDPR Compliant</span>
              <span>AML/KYC Verified</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
