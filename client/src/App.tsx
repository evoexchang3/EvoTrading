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
import { DashboardLayout } from "@/components/DashboardLayout";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import AboutPage from "@/pages/AboutPage";
import FAQPage from "@/pages/FAQPage";
import EducationPage from "@/pages/EducationPage";
import ContactPage from "@/pages/ContactPage";
import PartnersPage from "@/pages/PartnersPage";
import TermsPage from "@/pages/legal/TermsPage";
import PrivacyPage from "@/pages/legal/PrivacyPage";
import AMLPage from "@/pages/legal/AMLPage";
import RiskPage from "@/pages/legal/RiskPage";
import CookiesPage from "@/pages/legal/CookiesPage";
import DashboardPage from "@/pages/DashboardPage";
import TradingPage from "@/pages/TradingPage";
import DepositsPage from "@/pages/funding/DepositsPage";
import WithdrawalsPage from "@/pages/funding/WithdrawalsPage";
import ProfilePage from "@/pages/account/ProfilePage";
import SecurityPage from "@/pages/account/SecurityPage";
import KYCPage from "@/pages/account/KYCPage";
import SettingsPage from "@/pages/SettingsPage";
import { CookieConsent } from "@/components/CookieConsent";

// Customer Info Pages
import AccountTypesPage from "@/pages/customer/AccountTypesPage";
import PaymentMethodsPage from "@/pages/customer/PaymentMethodsPage";
import VerificationPage from "@/pages/customer/VerificationPage";
import TradingAdvicePage from "@/pages/customer/TradingAdvicePage";

// Market Info Pages
import TechnicalAnalysisPage from "@/pages/info/TechnicalAnalysisPage";
import FundamentalAnalysisPage from "@/pages/info/FundamentalAnalysisPage";
import TradingSignalsPage from "@/pages/info/TradingSignalsPage";
import MarketHeatmapPage from "@/pages/info/MarketHeatmapPage";

// Trading Tools
import EconomicCalendarPage from "@/pages/tools/EconomicCalendarPage";
import PositionCalculatorPage from "@/pages/tools/PositionCalculatorPage";
import PipCalculatorPage from "@/pages/tools/PipCalculatorPage";
import TradingSessionsPage from "@/pages/tools/TradingSessionsPage";
import NewsPage from "@/pages/tools/NewsPage";

// Education Pages
import BeginnerCoursePage from "@/pages/learn/BeginnerCoursePage";
import AdvancedCoursePage from "@/pages/learn/AdvancedCoursePage";
import GlossaryPage from "@/pages/learn/GlossaryPage";

// Company Pages
import RatesPage from "@/pages/company/RatesPage";
import RegulatoryPage from "@/pages/company/RegulatoryPage";
import SafetyOfFundsPage from "@/pages/company/SafetyOfFundsPage";
import ComplaintsPage from "@/pages/company/ComplaintsPage";
import PlatformStatusPage from "@/pages/company/PlatformStatusPage";
import SecurityPageCompany from "@/pages/company/SecurityPage";

// Admin Pages
import AdminConfigPage from "@/pages/admin/AdminConfigPage";

function AppRoutes() {
  return (
    <>
      <CookieConsent />
      <Switch>
      {/* Public Landing Pages */}
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/education" component={EducationPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/partners" component={PartnersPage} />
      
      {/* Legal Pages */}
      <Route path="/legal/terms" component={TermsPage} />
      <Route path="/legal/privacy" component={PrivacyPage} />
      <Route path="/legal/aml" component={AMLPage} />
      <Route path="/legal/risk" component={RiskPage} />
      <Route path="/legal/cookies" component={CookiesPage} />

      {/* Customer Info Pages */}
      <Route path="/customer/account-types" component={AccountTypesPage} />
      <Route path="/customer/payment-methods" component={PaymentMethodsPage} />
      <Route path="/customer/verification" component={VerificationPage} />
      <Route path="/customer/advice" component={TradingAdvicePage} />

      {/* Market Info Pages */}
      <Route path="/info/technical-analysis" component={TechnicalAnalysisPage} />
      <Route path="/info/fundamental-analysis" component={FundamentalAnalysisPage} />
      <Route path="/info/trading-signals" component={TradingSignalsPage} />
      <Route path="/info/market-heatmap" component={MarketHeatmapPage} />

      {/* Company Pages */}
      <Route path="/company/rates" component={RatesPage} />
      <Route path="/company/regulatory" component={RegulatoryPage} />
      <Route path="/company/safety-of-funds" component={SafetyOfFundsPage} />
      <Route path="/company/complaints" component={ComplaintsPage} />
      <Route path="/company/platform-status" component={PlatformStatusPage} />
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
        <ProtectedRoute>
          <AdminConfigPage />
        </ProtectedRoute>
      </Route>

      {/* 404 Fallback */}
      <Route component={NotFound} />
      </Switch>
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
