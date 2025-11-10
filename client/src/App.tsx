import { lazy, Suspense } from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CookieConsent } from "@/components/CookieConsent";

// Critical pages - loaded immediately for fast initial render
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Lazy-loaded pages - split into separate chunks
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const EducationPage = lazy(() => import("@/pages/EducationPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PartnersPage = lazy(() => import("@/pages/PartnersPage"));
const MarketsPage = lazy(() => import("@/pages/MarketsPage"));
const CompanyPage = lazy(() => import("@/pages/CompanyPage"));

// Legal Pages - lazy loaded
const TermsPage = lazy(() => import("@/pages/legal/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/legal/PrivacyPage"));
const AMLPage = lazy(() => import("@/pages/legal/AMLPage"));
const RiskPage = lazy(() => import("@/pages/legal/RiskPage"));
const CookiesPage = lazy(() => import("@/pages/legal/CookiesPage"));

// Protected Pages - heavy components, lazy loaded
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TradingPage = lazy(() => import("@/pages/TradingPage"));
const DepositsPage = lazy(() => import("@/pages/funding/DepositsPage"));
const WithdrawalsPage = lazy(() => import("@/pages/funding/WithdrawalsPage"));
const ProfilePage = lazy(() => import("@/pages/account/ProfilePage"));
const SecurityPage = lazy(() => import("@/pages/account/SecurityPage"));
const KYCPage = lazy(() => import("@/pages/account/KYCPage"));
const AccountSecurityPage = lazy(() => import("@/pages/account/AccountSecurityPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

// Customer Info Pages - lazy loaded
const AccountTypesPage = lazy(() => import("@/pages/customer/AccountTypesPage"));
const PaymentMethodsPage = lazy(() => import("@/pages/customer/PaymentMethodsPage"));
const VerificationPage = lazy(() => import("@/pages/customer/VerificationPage"));
const TradingAdvicePage = lazy(() => import("@/pages/customer/TradingAdvicePage"));

// Market Info Pages - lazy loaded
const TechnicalAnalysisPage = lazy(() => import("@/pages/info/TechnicalAnalysisPage"));
const FundamentalAnalysisPage = lazy(() => import("@/pages/info/FundamentalAnalysisPage"));
const TradingSignalsPage = lazy(() => import("@/pages/info/TradingSignalsPage"));
const MarketHeatmapPage = lazy(() => import("@/pages/info/MarketHeatmapPage"));

// Trading Tools - lazy loaded
const EconomicCalendarPage = lazy(() => import("@/pages/tools/EconomicCalendarPage"));
const PositionCalculatorPage = lazy(() => import("@/pages/tools/PositionCalculatorPage"));
const PipCalculatorPage = lazy(() => import("@/pages/tools/PipCalculatorPage"));
const TradingSessionsPage = lazy(() => import("@/pages/tools/TradingSessionsPage"));
const NewsPage = lazy(() => import("@/pages/tools/NewsPage"));

// Education Pages - lazy loaded (large content)
const BeginnerCoursePage = lazy(() => import("@/pages/learn/BeginnerCoursePage"));
const AdvancedCoursePage = lazy(() => import("@/pages/learn/AdvancedCoursePage"));
const GlossaryPage = lazy(() => import("@/pages/learn/GlossaryPage"));

// Company Pages - lazy loaded
const RatesPage = lazy(() => import("@/pages/company/RatesPage"));
const RegulatoryPage = lazy(() => import("@/pages/company/RegulatoryPage"));
const SafetyOfFundsPage = lazy(() => import("@/pages/company/SafetyOfFundsPage"));
const ComplaintsPage = lazy(() => import("@/pages/company/ComplaintsPage"));
const PlatformStatusPage = lazy(() => import("@/pages/company/PlatformStatusPage"));
const SecurityPageCompany = lazy(() => import("@/pages/company/SecurityPage"));
const LocationsPage = lazy(() => import("@/pages/company/LocationsPage"));

// Admin Pages - lazy loaded (rarely accessed)
const AdminConfigPage = lazy(() => import("@/pages/admin/AdminConfigPage"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <CookieConsent />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {/* Public Landing Pages */}
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/faq" component={FAQPage} />
          <Route path="/education" component={EducationPage} />
          <Route path="/learn" component={EducationPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/partners" component={PartnersPage} />
          <Route path="/markets" component={MarketsPage} />
          <Route path="/company" component={CompanyPage} />
          
          {/* Legal Pages */}
          <Route path="/legal/terms" component={TermsPage} />
          <Route path="/legal/privacy" component={PrivacyPage} />
          <Route path="/legal/aml" component={AMLPage} />
          <Route path="/legal/risk" component={RiskPage} />
          <Route path="/legal/cookies" component={CookiesPage} />
          <Route path="/legal" component={TermsPage} />

          {/* Customer Info Pages */}
          <Route path="/customer/account-types" component={AccountTypesPage} />
          <Route path="/customer/accounts" component={AccountTypesPage} />
          <Route path="/customer/payment-methods" component={PaymentMethodsPage} />
          <Route path="/customer/funding" component={PaymentMethodsPage} />
          <Route path="/customer/verification" component={VerificationPage} />
          <Route path="/customer/advice" component={TradingAdvicePage} />

          {/* Market Info Pages */}
          <Route path="/info/technical-analysis" component={TechnicalAnalysisPage} />
          <Route path="/learn/resources" component={TechnicalAnalysisPage} />
          <Route path="/info/fundamental-analysis" component={FundamentalAnalysisPage} />
          <Route path="/info/trading-signals" component={TradingSignalsPage} />
          <Route path="/tools/signals" component={TradingSignalsPage} />
          <Route path="/info/market-heatmap" component={MarketHeatmapPage} />
          <Route path="/markets/heatmap" component={MarketHeatmapPage} />

          {/* Company Pages */}
          <Route path="/company/rates" component={RatesPage} />
          <Route path="/company/regulatory" component={RegulatoryPage} />
          <Route path="/company/locations" component={LocationsPage} />
          <Route path="/company/safety-of-funds" component={SafetyOfFundsPage} />
          <Route path="/company/complaints" component={ComplaintsPage} />
          <Route path="/company/platform-status" component={PlatformStatusPage} />
          <Route path="/platform/status" component={PlatformStatusPage} />
          <Route path="/company/security" component={SecurityPageCompany} />

          {/* Auth Routes */}
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />

          {/* Protected Routes */}
          <Route path="/dashboard">
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>
          
          <Route path="/trading/:symbol?">
            {(params) => (
              <ProtectedRoute>
                <TradingPage symbol={params.symbol} />
              </ProtectedRoute>
            )}
          </Route>

          <Route path="/deposits">
            <ProtectedRoute>
              <DashboardLayout>
                <DepositsPage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>

          <Route path="/withdrawals">
            <ProtectedRoute>
              <DashboardLayout>
                <WithdrawalsPage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>

          <Route path="/profile">
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>

          <Route path="/settings">
            <ProtectedRoute>
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>

          <Route path="/kyc">
            <ProtectedRoute>
              <DashboardLayout>
                <KYCPage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>

          <Route path="/security">
            <ProtectedRoute>
              <DashboardLayout>
                <AccountSecurityPage />
              </DashboardLayout>
            </ProtectedRoute>
          </Route>

          {/* Trading Tools - Protected */}
          <Route path="/tools/economic-calendar">
            <ProtectedRoute>
              <EconomicCalendarPage />
            </ProtectedRoute>
          </Route>

          <Route path="/tools/position-calculator">
            <ProtectedRoute>
              <PositionCalculatorPage />
            </ProtectedRoute>
          </Route>

          <Route path="/tools/pip-calculator">
            <ProtectedRoute>
              <PipCalculatorPage />
            </ProtectedRoute>
          </Route>

          <Route path="/tools/sessions">
            <ProtectedRoute>
              <TradingSessionsPage />
            </ProtectedRoute>
          </Route>

          <Route path="/tools/news">
            <ProtectedRoute>
              <NewsPage />
            </ProtectedRoute>
          </Route>

          {/* Education - Protected */}
          <Route path="/learn/beginner">
            <ProtectedRoute>
              <BeginnerCoursePage />
            </ProtectedRoute>
          </Route>

          <Route path="/learn/advanced">
            <ProtectedRoute>
              <AdvancedCoursePage />
            </ProtectedRoute>
          </Route>

          <Route path="/learn/glossary">
            <ProtectedRoute>
              <GlossaryPage />
            </ProtectedRoute>
          </Route>

          {/* Admin - Protected (Admin Only) */}
          <Route path="/admin/config">
            <AdminRoute>
              <AdminConfigPage />
            </AdminRoute>
          </Route>

          {/* 404 Fallback */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteConfigProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <WebSocketProvider>
                <TooltipProvider>
                  <Router>
                    <Toaster />
                    <AppRoutes />
                  </Router>
                </TooltipProvider>
              </WebSocketProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SiteConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
