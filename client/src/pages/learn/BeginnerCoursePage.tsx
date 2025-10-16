import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BeginnerCoursePage() {
  const modules = [
    {
      title: "Module 1: Trading Basics",
      duration: "30 mins",
      status: "available",
      lessons: [
        "What is Forex Trading?",
        "Understanding Currency Pairs",
        "How the Forex Market Works",
        "Market Participants and Liquidity",
        "Trading Sessions and Market Hours"
      ]
    },
    {
      title: "Module 2: Essential Concepts",
      duration: "45 mins",
      status: "available",
      lessons: [
        "Pips, Points, and Lots Explained",
        "Bid, Ask, and Spread",
        "Leverage and Margin",
        "Long vs Short Positions",
        "Order Types (Market, Limit, Stop)"
      ]
    },
    {
      title: "Module 3: Chart Reading",
      duration: "60 mins",
      status: "available",
      lessons: [
        "Understanding Price Charts",
        "Candlestick Patterns Basics",
        "Support and Resistance",
        "Trend Identification",
        "Timeframe Selection"
      ]
    },
    {
      title: "Module 4: Risk Management",
      duration: "45 mins",
      status: "available",
      lessons: [
        "Why Risk Management Matters",
        "Position Sizing Fundamentals",
        "Setting Stop Losses",
        "Risk-Reward Ratios",
        "Managing Multiple Positions"
      ]
    },
    {
      title: "Module 5: Basic Strategies",
      duration: "60 mins",
      status: "available",
      lessons: [
        "Trend Following Strategy",
        "Support/Resistance Trading",
        "Moving Average Crossovers",
        "Simple Breakout Trading",
        "When to Avoid Trading"
      ]
    },
    {
      title: "Module 6: Trading Psychology",
      duration: "30 mins",
      status: "available",
      lessons: [
        "Emotional Control in Trading",
        "Dealing with Losses",
        "Avoiding Revenge Trading",
        "Building Discipline",
        "Creating a Trading Routine"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Beginner Trading Course</h1>
            <p className="text-muted-foreground">Master the fundamentals of forex trading</p>
          </div>
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>A comprehensive introduction to forex trading for beginners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Duration</p>
                <p className="text-2xl font-bold">4.5 hours</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Modules</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-2xl font-bold">Beginner</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This course covers everything you need to know to start trading forex. From basic concepts to practical strategies, 
              you'll learn at your own pace with clear explanations and real-world examples.
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
          <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand how the forex market works and who trades it</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Read and interpret price charts and candlestick patterns</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Calculate position sizes and manage risk properly</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Execute trades using different order types</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify trends and trade with the momentum</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Develop discipline and emotional control in trading</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
