import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  FileText,
  User,
  LogOut,
  Settings,
  Calculator,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageCommand } from "@/components/LanguageCommand";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};


export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { name: t('nav.trading'), href: "/trading", icon: TrendingUp },
    { name: t('nav.deposits'), href: "/deposits", icon: Wallet },
    { name: t('nav.withdrawals'), href: "/withdrawals", icon: FileText },
  ];

  const toolsNavigation = [
    { name: t('tools.economicCalendar.title'), href: "/tools/economic-calendar", testId: "economic-calendar" },
    { name: t('tools.positionCalculator.title'), href: "/tools/position-calculator", testId: "position-calculator" },
    { name: t('tools.pipCalculator.title'), href: "/tools/pip-calculator", testId: "pip-calculator" },
    { name: t('tools.tradingSessions.title'), href: "/tools/sessions", testId: "trading-sessions" },
    { name: t('tools.news.title'), href: "/tools/news", testId: "market-news" },
  ];

  const educationNavigation = [
    { name: t('tools.education.beginnerCourse'), href: "/learn/beginner", testId: "beginner-course" },
    { name: t('tools.education.advancedCourse'), href: "/learn/advanced", testId: "advanced-course" },
    { name: t('tools.education.glossary'), href: "/learn/glossary", testId: "glossary" },
  ];

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.username?.substring(0, 2).toUpperCase() || "U";

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Navigation */}
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Trading Platform</span>
        </div>

        <nav className="flex flex-1 items-center gap-1 ml-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2 cursor-pointer",
                  location === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </span>
            </Link>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2 cursor-pointer",
                  location.startsWith("/tools")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-tools"
              >
                <Calculator className="h-4 w-4" />
                {t('nav.tools')}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {toolsNavigation.map((item) => (
                <DropdownMenuItem 
                  key={item.name} 
                  onClick={() => setLocation(item.href)}
                  data-testid={`menu-tool-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate active-elevate-2 cursor-pointer",
                  location.startsWith("/learn")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                data-testid="link-learn"
              >
                <GraduationCap className="h-4 w-4" />
                {t('nav.education')}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {educationNavigation.map((item) => (
                <DropdownMenuItem 
                  key={item.name} 
                  onClick={() => setLocation(item.href)}
                  data-testid={`menu-learn-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageCommand />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full" data-testid="button-user-menu">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocation("/profile")} data-testid="menu-profile">
                <User className="mr-2 h-4 w-4" />
                {t('nav.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("/settings")} data-testid="menu-settings">
                <Settings className="mr-2 h-4 w-4" />
                {t('nav.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                <LogOut className="mr-2 h-4 w-4" />
                {t('nav.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
