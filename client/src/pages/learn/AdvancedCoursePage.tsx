import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdvancedCoursePage() {
  const modules = [
    {
      title: "Module 1: Advanced Technical Analysis",
      duration: "90 mins",
      status: "available",
      lessons: [
        "Elliott Wave Theory",
        "Harmonic Patterns (Gartley, Butterfly, Bat)",
        "Advanced Fibonacci Techniques",
        "Volume Profile Analysis",
        "Multi-Timeframe Analysis"
      ]
    },
    {
      title: "Module 2: Market Structure",
      duration: "75 mins",
      status: "available",
      lessons: [
        "Order Flow and Market Makers",
        "Smart Money Concepts",
        "Supply and Demand Zones",
        "Institutional Order Blocks",
        "Liquidity Sweeps and Stop Hunts"
      ]
    },
    {
      title: "Module 3: Advanced Risk Management",
      duration: "60 mins",
      status: "available",
      lessons: [
        "Portfolio Risk Management",
        "Correlation-Based Position Sizing",
        "Kelly Criterion and Optimal F",
        "Drawdown Management",
        "Scaling In and Out of Positions"
      ]
    },
    {
      title: "Module 4: Trading Systems",
      duration: "90 mins",
      status: "available",
      lessons: [
        "Designing a Trading System",
        "Backtesting Methodologies",
        "Forward Testing and Optimization",
        "System Performance Metrics",
        "Avoiding Curve Fitting"
      ]
    },
    {
      title: "Module 5: Advanced Strategies",
      duration: "120 mins",
      status: "available",
      lessons: [
        "Scalping Techniques and Execution",
        "Swing Trading Advanced Patterns",
        "Carry Trade Strategies",
        "News Trading and Event-Driven Setups",
        "Hedging and Risk Mitigation"
      ]
    },
    {
      title: "Module 6: Professional Trading",
      duration: "60 mins",
      status: "available",
      lessons: [
        "Building a Trading Business",
        "Performance Analysis and Journaling",
        "Tax Optimization for Traders",
        "Scaling Capital and Prop Firms",
        "Continuous Improvement Process"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Advanced Trading Course</h1>
            <p className="text-muted-foreground">Master professional trading strategies and techniques</p>
          </div>
          <GraduationCap className="w-8 h-8 text-muted-foreground" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Advanced concepts for experienced traders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Duration</p>
                <p className="text-2xl font-bold">8.5 hours</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Modules</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-2xl font-bold">Advanced</p>
              </div>
            </div>
            <div className="p-4 bg-destructive/10 rounded-lg mb-4">
              <p className="text-sm font-semibold mb-1">Prerequisites</p>
              <p className="text-sm text-muted-foreground">
                This course requires completion of the Beginner Course or equivalent trading experience. 
                You should be comfortable with basic technical analysis, risk management, and have executed live trades.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Elevate your trading to a professional level with advanced technical analysis, institutional trading concepts, 
              and systematic approach to the markets.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Modules</h2>
          {modules.map((module, index) => (
            <Card key={index} data-testid={`card-module-${index}`}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <span>{module.duration}</span>
                      <Badge variant="outline">{module.lessons.length} lessons</Badge>
                    </CardDescription>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="flex items-center gap-3 text-sm hover-elevate p-2 rounded cursor-pointer">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-muted-foreground">{lessonIndex + 1}</span>
                      </div>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">What You'll Master</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Advanced chart patterns and harmonic price structures</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Institutional order flow and smart money concepts</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Portfolio-level risk management and position correlation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Systematic trading approach with backtesting</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Professional scalping and swing trading techniques</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Building and managing a profitable trading business</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
