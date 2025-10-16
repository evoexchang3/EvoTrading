import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Award, Download, TrendingUp, Clock, Target, FileText, Play, Lock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type CourseProgress } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const COURSE_ID = "advanced-trading";

export default function AdvancedCoursePage() {
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: string; moduleIndex: number; lessonId: string; lessonIndex: number; title: string } | null>(null);
  
  const { data: progressData = [] } = useQuery<CourseProgress[]>({
    queryKey: ['/api/course-progress', COURSE_ID],
    queryFn: async () => {
      const res = await fetch(`/api/course-progress/${COURSE_ID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (!res.ok) return [];
      return res.json();
    }
  });

  const saveProgressMutation = useMutation({
    mutationFn: async (data: { moduleId: string; lessonId?: string; completed: boolean }) => {
      return apiRequest('/api/course-progress', 'POST', {
        courseId: COURSE_ID,
        ...data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/course-progress', COURSE_ID] });
      toast({
        title: "Progress Saved",
        description: "Your course progress has been updated."
      });
    }
  });

  const getLessonProgress = (moduleId: string, lessonId: string) => {
    return progressData.find(p => 
      p.courseId === COURSE_ID && 
      p.moduleId === moduleId && 
      p.lessonId === lessonId &&
      p.completed
    ) !== undefined;
  };

  const getModuleProgress = (moduleId: string) => {
    const moduleProgressItems = progressData.filter(p => 
      p.courseId === COURSE_ID && 
      p.moduleId === moduleId && 
      p.lessonId !== null &&
      p.completed
    );
    return moduleProgressItems.length;
  };

  const courseProgress = useMemo(() => {
    const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    const completedLessons = progressData.filter(p => 
      p.courseId === COURSE_ID && 
      p.lessonId !== null && 
      p.completed
    ).length;
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }, [progressData]);

  const modules = [
    {
      id: "module-adv-1",
      title: "Module 1: Advanced Technical Analysis",
      description: "Deep dive into Elliott Wave Theory, harmonic patterns, and advanced Fibonacci techniques",
      duration: "90 mins",
      status: "in-progress",
      progress: 45,
      lessons: [
        { id: "lesson-adv-1-1", title: "Elliott Wave Theory", duration: "20 mins" },
        { id: "lesson-adv-1-2", title: "Harmonic Patterns (Gartley, Butterfly, Bat)", duration: "22 mins" },
        { id: "lesson-adv-1-3", title: "Advanced Fibonacci Techniques", duration: "18 mins" },
        { id: "lesson-adv-1-4", title: "Volume Profile Analysis", duration: "15 mins" },
        { id: "lesson-adv-1-5", title: "Multi-Timeframe Analysis", duration: "15 mins" }
      ],
      quiz: {
        questions: 20,
        passingScore: 80,
        timeLimit: "30 mins",
        attempts: 3
      }
    },
    {
      id: "module-adv-2",
      title: "Module 2: Market Structure",
      description: "Understand institutional order flow, smart money concepts, and supply/demand zones",
      duration: "75 mins",
      status: "locked",
      progress: 0,
      lessons: [
        { id: "lesson-adv-2-1", title: "Order Flow and Market Makers", duration: "18 mins" },
        { id: "lesson-adv-2-2", title: "Smart Money Concepts", duration: "16 mins" },
        { id: "lesson-adv-2-3", title: "Supply and Demand Zones", duration: "15 mins" },
        { id: "lesson-adv-2-4", title: "Institutional Order Blocks", duration: "14 mins" },
        { id: "lesson-adv-2-5", title: "Liquidity Sweeps and Stop Hunts", duration: "12 mins" }
      ],
      quiz: {
        questions: 18,
        passingScore: 80,
        timeLimit: "30 mins",
        attempts: 3
      }
    },
    {
      id: "module-adv-3",
      title: "Module 3: Advanced Risk Management",
      description: "Portfolio-level risk management, correlation analysis, and position optimization",
      duration: "60 mins",
      status: "locked",
      progress: 0,
      lessons: [
        { id: "lesson-adv-3-1", title: "Portfolio Risk Management", duration: "15 mins" },
        { id: "lesson-adv-3-2", title: "Correlation-Based Position Sizing", duration: "12 mins" },
        { id: "lesson-adv-3-3", title: "Kelly Criterion and Optimal F", duration: "10 mins" },
        { id: "lesson-adv-3-4", title: "Drawdown Management", duration: "12 mins" },
        { id: "lesson-adv-3-5", title: "Scaling In and Out of Positions", duration: "11 mins" }
      ],
      quiz: {
        questions: 15,
        passingScore: 85,
        timeLimit: "25 mins",
        attempts: 3
      }
    },
    {
      id: "module-adv-4",
      title: "Module 4: Trading Systems",
      description: "Design, backtest, and optimize professional trading systems",
      duration: "90 mins",
      status: "locked",
      progress: 0,
      lessons: [
        { id: "lesson-adv-4-1", title: "Designing a Trading System", duration: "20 mins" },
        { id: "lesson-adv-4-2", title: "Backtesting Methodologies", duration: "22 mins" },
        { id: "lesson-adv-4-3", title: "Forward Testing and Optimization", duration: "18 mins" },
        { id: "lesson-adv-4-4", title: "System Performance Metrics", duration: "15 mins" },
        { id: "lesson-adv-4-5", title: "Avoiding Curve Fitting", duration: "15 mins" }
      ],
      quiz: {
        questions: 20,
        passingScore: 80,
        timeLimit: "35 mins",
        attempts: 3
      }
    },
    {
      id: "module-adv-5",
      title: "Module 5: Advanced Strategies",
      description: "Master scalping, swing trading, carry trades, and event-driven strategies",
      duration: "120 mins",
      status: "locked",
      progress: 0,
      lessons: [
        { id: "lesson-adv-5-1", title: "Scalping Techniques and Execution", duration: "25 mins" },
        { id: "lesson-adv-5-2", title: "Swing Trading Advanced Patterns", duration: "25 mins" },
        { id: "lesson-adv-5-3", title: "Carry Trade Strategies", duration: "20 mins" },
        { id: "lesson-adv-5-4", title: "News Trading and Event-Driven Setups", duration: "25 mins" },
        { id: "lesson-adv-5-5", title: "Hedging and Risk Mitigation", duration: "25 mins" }
      ],
      quiz: {
        questions: 25,
        passingScore: 80,
        timeLimit: "40 mins",
        attempts: 3
      }
    },
    {
      id: "module-adv-6",
      title: "Module 6: Professional Trading",
      description: "Build a trading business, optimize performance, and scale your capital",
      duration: "60 mins",
      status: "locked",
      progress: 0,
      lessons: [
        { id: "lesson-adv-6-1", title: "Building a Trading Business", duration: "15 mins" },
        { id: "lesson-adv-6-2", title: "Performance Analysis and Journaling", duration: "12 mins" },
        { id: "lesson-adv-6-3", title: "Tax Optimization for Traders", duration: "10 mins" },
        { id: "lesson-adv-6-4", title: "Scaling Capital and Prop Firms", duration: "13 mins" },
        { id: "lesson-adv-6-5", title: "Continuous Improvement Process", duration: "10 mins" }
      ],
      quiz: {
        questions: 15,
        passingScore: 85,
        timeLimit: "25 mins",
        attempts: 3
      }
    }
  ];

  const downloadableResources = [
    { title: "Elliott Wave Cheat Sheet", type: "PDF", size: "2.8 MB" },
    { title: "Harmonic Patterns Recognition Guide", type: "PDF", size: "3.2 MB" },
    { title: "Smart Money Concepts Workbook", type: "PDF", size: "4.1 MB" },
    { title: "Advanced Risk Calculator", type: "Excel", size: "1.2 MB" },
    { title: "Trading System Design Template", type: "Excel", size: "1.8 MB" },
    { title: "Backtesting Spreadsheet", type: "Excel", size: "2.1 MB" },
    { title: "Performance Metrics Dashboard", type: "Excel", size: "1.5 MB" },
    { title: "Correlation Matrix Template", type: "Excel", size: "0.9 MB" },
    { title: "Scalping Strategy Guide", type: "PDF", size: "3.5 MB" },
    { title: "Professional Trading Journal", type: "Excel", size: "2.3 MB" }
  ];

  const faqs = [
    {
      question: "What prerequisites do I need before taking this advanced course?",
      answer: "You should have completed our Beginner Course or have equivalent experience with at least 6-12 months of active trading. You need to be comfortable with basic technical analysis, understand leverage and margin, and have experience executing live trades. Familiarity with common indicators (moving averages, RSI, MACD) is essential."
    },
    {
      question: "How is the Advanced Course different from the Beginner Course?",
      answer: "The Advanced Course goes far beyond basics. While the Beginner Course teaches fundamental concepts, this course covers professional institutional strategies, complex market structure analysis, systematic trading approaches, and advanced risk management techniques used by professional traders. The material is significantly more technical and requires solid foundational knowledge."
    },
    {
      question: "Will I learn automated trading or algorithmic strategies?",
      answer: "Yes, Module 4 covers trading system design and backtesting, which includes systematic and rule-based approaches. While we don't teach programming, you'll learn how to design quantifiable systems that can be automated. We provide Excel templates for backtesting and system development that don't require coding knowledge."
    },
    {
      question: "What is the passing score for the Advanced Course certificate?",
      answer: "Each module requires 80-85% to pass (higher than Beginner Course). The final comprehensive exam requires 85% to earn your 'Certified Advanced Forex Trader' certificate. This ensures you've truly mastered the professional-level concepts and can apply them in real trading scenarios."
    },
    {
      question: "Can I get help if I'm stuck on complex topics like Elliott Wave?",
      answer: "Absolutely! Advanced Course students have access to weekly live Q&A sessions with professional traders, a private Discord community, and email support. Complex topics like Elliott Wave, harmonic patterns, and smart money concepts often require discussion and practice, so we provide extensive support resources."
    },
    {
      question: "How much capital do I need to implement these advanced strategies?",
      answer: "Strategy capital requirements vary. Scalping can be done with smaller accounts ($1,000-$5,000) while swing trading and carry trades work better with $10,000+. The course teaches you how to adapt strategies to your capital level. Many concepts (like correlation analysis and portfolio management) become more relevant as your capital grows."
    },
    {
      question: "Will this course help me get funded by a prop firm?",
      answer: "Yes! Module 6 specifically covers prop firm evaluation, risk parameters prop firms look for, and strategies to pass their challenges. Many of our Advanced Course graduates have successfully obtained funding from firms like FTMO, MyForexFunds, and others. We teach the disciplined, rule-based approach prop firms require."
    }
  ];

  const learningPath = {
    prerequisite: "Beginner Course",
    current: "Advanced Course",
    next: [
      { title: "Algorithmic Trading Bootcamp", description: "Learn to code and automate your trading strategies", estimated: "4-6 weeks" },
      { title: "Institutional Order Flow", description: "Advanced market microstructure and execution", estimated: "2-3 weeks" },
      { title: "Professional Trader Mentorship", description: "1-on-1 guidance from experienced traders", estimated: "12 weeks" }
    ]
  };

  const completedLessons = modules.reduce((sum, module) => 
    sum + module.lessons.filter(l => l.completed).length, 0
  );
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="mb-2" data-testid="badge-course-level">Advanced Level</Badge>
            <h1 className="text-3xl font-bold">Advanced Trading Course</h1>
            <p className="text-muted-foreground">Master professional trading strategies and techniques</p>
          </div>
          <GraduationCap className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Prerequisites Alert */}
        <Alert data-testid="alert-prerequisites">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Prerequisites Required:</strong> This course requires completion of the Beginner Course or equivalent trading experience. 
            You should be comfortable with basic technical analysis, risk management, and have executed live trades.
          </AlertDescription>
        </Alert>

        {/* Progress Overview */}
        <Card data-testid="card-progress-overview">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your advanced learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Completion</span>
                <span className="font-semibold" data-testid="text-course-progress">{courseProgress}%</span>
              </div>
              <Progress value={courseProgress} className="h-2" data-testid="progress-course" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-lessons-completed">{completedLessons}/{totalLessons}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Modules Passed</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-modules-passed">0/6</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Time Invested</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-time-invested">1.3 hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card data-testid="card-course-overview">
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Advanced concepts for experienced traders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Duration</p>
                <p className="text-2xl font-bold" data-testid="text-total-duration">8.5 hours</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Modules</p>
                <p className="text-2xl font-bold" data-testid="text-total-modules">6</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Lessons</p>
                <p className="text-2xl font-bold" data-testid="text-total-lessons">{totalLessons}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Level</p>
                <p className="text-2xl font-bold" data-testid="text-course-level">Advanced</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Elevate your trading to a professional level with advanced technical analysis, institutional trading concepts, 
              and systematic approach to the markets. This course covers professional strategies used by institutional traders, 
              hedge funds, and successful independent traders. Each module includes detailed video lessons, case studies, 
              and comprehensive quizzes to ensure mastery.
            </p>
          </CardContent>
        </Card>

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Modules</h2>
          {modules.map((module, index) => (
            <Card key={index} data-testid={`card-module-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                        module.status === 'completed' ? 'bg-primary text-primary-foreground' :
                        module.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {module.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl mb-1">{module.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {module.duration}
                          </span>
                          <Badge variant="outline">{module.lessons.length} lessons</Badge>
                          {module.status === 'locked' && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Locked</Badge>}
                          {module.status === 'in-progress' && <Badge variant="default">In Progress</Badge>}
                          {module.status === 'completed' && <Badge className="bg-green-600">Completed</Badge>}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    {module.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    data-testid={`button-module-${index}`}
                    disabled={module.status === 'locked'}
                  >
                    {module.status === 'completed' ? 'Review' : 
                     module.status === 'in-progress' ? 'Continue' : 
                     'Start'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-sm">Lessons</h4>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = getLessonProgress(module.id, lesson.id);
                      return (
                      <li 
                        key={lessonIndex} 
                        className="flex items-center gap-3 text-sm hover-elevate p-2 rounded cursor-pointer"
                        data-testid={`lesson-${index}-${lessonIndex}`}
                        onClick={() => setSelectedLesson({ 
                          moduleId: module.id, 
                          moduleIndex: index,
                          lessonId: lesson.id, 
                          lessonIndex, 
                          title: lesson.title 
                        })}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                            <Play className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                        <span className={isCompleted ? 'text-muted-foreground' : ''}>{lesson.title}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{lesson.duration}</span>
                      </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Module Assessment
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Questions:</span> {module.quiz.questions}
                    </div>
                    <div>
                      <span className="font-medium">Passing Score:</span> {module.quiz.passingScore}%
                    </div>
                    <div>
                      <span className="font-medium">Time Limit:</span> {module.quiz.timeLimit}
                    </div>
                    <div>
                      <span className="font-medium">Attempts:</span> {module.quiz.attempts}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certificate Information */}
        <Card data-testid="card-certificate">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Professional Certification</CardTitle>
                <CardDescription>Earn your advanced trader certification</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upon successful completion, you'll receive the 'Certified Advanced Forex Trader' certificate, 
              demonstrating your mastery of professional trading strategies and institutional concepts.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Complete all 6 advanced modules (30 lessons)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pass all module assessments with 80-85%+ score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Complete final comprehensive exam (85% required)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Submit trading system design project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Total study time: minimum 8.5 hours</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Certificate Benefits</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Recognized by major prop trading firms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>LinkedIn certification badge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Access to exclusive trader community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Priority job board access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Lifetime certificate verification</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Certified Advanced Forex Trader</p>
                <p className="text-xs text-muted-foreground">Professional-level certification from our trading academy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Downloadable Resources */}
        <Card data-testid="card-resources">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Professional Resources</CardTitle>
                <CardDescription>Advanced tools, templates, and reference materials</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {downloadableResources.map((resource, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-between h-auto p-4"
                  data-testid={`button-download-${index}`}
                  onClick={() => {
                    toast({
                      title: "Resources Locked",
                      description: "Complete all course modules to unlock downloadable resources.",
                      variant: "default"
                    });
                  }}
                >
                  <div className="flex items-center gap-3 text-left">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 flex-shrink-0 ml-2" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card data-testid="card-learning-path">
          <CardHeader>
            <CardTitle>Your Learning Path</CardTitle>
            <CardDescription>Professional development roadmap</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg opacity-60">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{learningPath.prerequisite}</p>
                <p className="text-xs text-muted-foreground">Completed - Foundation knowledge</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{learningPath.current}</p>
                <p className="text-xs text-muted-foreground">Current course - {courseProgress}% complete</p>
              </div>
            </div>

            <div className="space-y-3">
              {learningPath.next.map((course, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 border rounded-lg hover-elevate cursor-pointer"
                  data-testid={`learning-path-${index}`}
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 font-semibold">
                    {index + 3}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.description}</p>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">{course.estimated}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What You'll Master */}
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
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Advanced Fibonacci and Elliott Wave analysis</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Event-driven trading and news-based strategies</span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card data-testid="card-faqs">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about the Advanced Trading Course</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Lesson Viewer Dialog */}
      <Dialog open={selectedLesson !== null} onOpenChange={(open) => !open && setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedLesson && (() => {
            const module = modules[selectedLesson.moduleIndex];
            const lesson = module.lessons[selectedLesson.lessonIndex];
            const isCompleted = getLessonProgress(selectedLesson.moduleId, selectedLesson.lessonId);
            
            const handlePrevious = () => {
              if (selectedLesson.lessonIndex > 0) {
                const prevLesson = module.lessons[selectedLesson.lessonIndex - 1];
                setSelectedLesson({
                  moduleId: selectedLesson.moduleId,
                  moduleIndex: selectedLesson.moduleIndex,
                  lessonId: prevLesson.id,
                  lessonIndex: selectedLesson.lessonIndex - 1,
                  title: prevLesson.title
                });
              } else if (selectedLesson.moduleIndex > 0) {
                const prevModule = modules[selectedLesson.moduleIndex - 1];
                const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
                setSelectedLesson({
                  moduleId: prevModule.id,
                  moduleIndex: selectedLesson.moduleIndex - 1,
                  lessonId: lastLesson.id,
                  lessonIndex: prevModule.lessons.length - 1,
                  title: lastLesson.title
                });
              }
            };
            
            const handleNext = () => {
              if (selectedLesson.lessonIndex < module.lessons.length - 1) {
                const nextLesson = module.lessons[selectedLesson.lessonIndex + 1];
                setSelectedLesson({
                  moduleId: selectedLesson.moduleId,
                  moduleIndex: selectedLesson.moduleIndex,
                  lessonId: nextLesson.id,
                  lessonIndex: selectedLesson.lessonIndex + 1,
                  title: nextLesson.title
                });
              } else if (selectedLesson.moduleIndex < modules.length - 1) {
                const nextModule = modules[selectedLesson.moduleIndex + 1];
                const firstLesson = nextModule.lessons[0];
                setSelectedLesson({
                  moduleId: nextModule.id,
                  moduleIndex: selectedLesson.moduleIndex + 1,
                  lessonId: firstLesson.id,
                  lessonIndex: 0,
                  title: firstLesson.title
                });
              }
            };
            
            const toggleComplete = () => {
              saveProgressMutation.mutate({ 
                moduleId: selectedLesson.moduleId, 
                lessonId: selectedLesson.lessonId, 
                completed: !isCompleted 
              });
            };
            
            const hasPrevious = selectedLesson.moduleIndex > 0 || selectedLesson.lessonIndex > 0;
            const hasNext = selectedLesson.moduleIndex < modules.length - 1 || selectedLesson.lessonIndex < module.lessons.length - 1;
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <DialogTitle className="text-2xl mb-2">{lesson.title}</DialogTitle>
                      <DialogDescription className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                        <Badge variant="outline">Module {selectedLesson.moduleIndex + 1} • Lesson {selectedLesson.lessonIndex + 1}</Badge>
                        {isCompleted && <Badge className="bg-green-600">Completed</Badge>}
                      </DialogDescription>
                    </div>
                    <Button 
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      onClick={toggleComplete}
                      data-testid="button-mark-complete"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 mt-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Video content placeholder</p>
                      <p className="text-xs text-muted-foreground mt-1">Lesson video will be displayed here</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Lesson Overview</h3>
                    <p className="text-muted-foreground">
                      This advanced lesson covers sophisticated trading concepts and professional-grade strategies. 
                      Master these techniques to elevate your trading to an institutional level.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Master advanced techniques and institutional strategies</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Apply professional-grade analysis methods</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Implement systematic trading approaches</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    data-testid="button-previous-lesson"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Lesson
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={!hasNext}
                    data-testid="button-next-lesson"
                  >
                    Next Lesson
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
