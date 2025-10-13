import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrendingUp, Globe } from "lucide-react";
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

const mainNavigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "cs", name: "Čeština" },
];

export function LandingLayout({ children }: LandingLayoutProps) {
  const [location] = useLocation();

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
              <Link key={item.name} href={item.href}>
                <span
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2 cursor-pointer",
                    location === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-language">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    data-testid={`menu-lang-${lang.code}`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            {/* Auth Buttons */}
            <Link href="/login">
              <Button variant="ghost" size="sm" data-testid="button-login">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" data-testid="button-register">
                Create Account
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
          <div className="grid gap-8 md:grid-cols-4">
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

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-about">
                      About Us
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-faq">
                      FAQ
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/education">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-education">
                      Education
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/partners">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-partners">
                      Partners & Affiliates
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/legal/terms">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-terms">
                      Terms & Conditions
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-privacy">
                      Privacy Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/aml">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-aml">
                      AML/KYC Policy
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/risk">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-risk">
                      Risk Disclosure
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="footer-link-cookies">
                      Cookie Policy
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact">
                    <span className="hover:text-foreground cursor-pointer" data-testid="footer-link-contact">
                      Contact Us
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
