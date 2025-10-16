import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Award, Download, TrendingUp, Clock, Target, FileText, Play, Lock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type CourseProgress } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const COURSE_ID = "beginner-trading";

export default function BeginnerCoursePage() {
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

  const getModuleProgress = (moduleId: string, totalLessons: number) => {
    const completed = progressData.filter(p => 
      p.courseId === COURSE_ID && 
      p.moduleId === moduleId && 
      p.lessonId && 
      p.completed
    ).length;
    return Math.round((completed / totalLessons) * 100);
  };


  const modules = [
    {
      id: "module-1",
      title: "Module 1: Trading Basics",
      description: "Foundation knowledge of forex markets, currency pairs, and trading fundamentals",
      duration: "30 mins",
      lessons: [
        { id: "lesson-1-1", title: "What is Forex Trading?", duration: "5 mins" },
        { id: "lesson-1-2", title: "Understanding Currency Pairs", duration: "6 mins" },
        { id: "lesson-1-3", title: "How the Forex Market Works", duration: "7 mins" },
        { id: "lesson-1-4", title: "Market Participants and Liquidity", duration: "6 mins" },
        { id: "lesson-1-5", title: "Trading Sessions and Market Hours", duration: "6 mins" }
      ],
      quiz: {
        questions: 10,
        passingScore: 70,
        timeLimit: "15 mins",
        attempts: 3
      }
    },
    {
      id: "module-2",
      title: "Module 2: Essential Concepts",
      description: "Core trading concepts including pips, lots, leverage, margin, and order types",
      duration: "45 mins",
      lessons: [
        { id: "lesson-2-1", title: "Pips, Points, and Lots Explained", duration: "8 mins" },
        { id: "lesson-2-2", title: "Bid, Ask, and Spread", duration: "7 mins" },
        { id: "lesson-2-3", title: "Leverage and Margin", duration: "10 mins" },
        { id: "lesson-2-4", title: "Long vs Short Positions", duration: "8 mins" },
        { id: "lesson-2-5", title: "Order Types (Market, Limit, Stop)", duration: "12 mins" }
      ],
      quiz: {
        questions: 15,
        passingScore: 70,
        timeLimit: "20 mins",
        attempts: 3
      }
    },
    {
      id: "module-3",
      title: "Module 3: Chart Reading",
      description: "Learn to read price charts, identify patterns, and understand market structure",
      duration: "60 mins",
      lessons: [
        { id: "lesson-3-1", title: "Understanding Price Charts", duration: "10 mins" },
        { id: "lesson-3-2", title: "Candlestick Patterns Basics", duration: "15 mins" },
        { id: "lesson-3-3", title: "Support and Resistance", duration: "12 mins" },
        { id: "lesson-3-4", title: "Trend Identification", duration: "13 mins" },
        { id: "lesson-3-5", title: "Timeframe Selection", duration: "10 mins" }
      ],
      quiz: {
        questions: 12,
        passingScore: 75,
        timeLimit: "20 mins",
        attempts: 3
      }
    },
    {
      id: "module-4",
      title: "Module 4: Risk Management",
      description: "Essential risk management principles to protect your trading capital",
      duration: "45 mins",
      lessons: [
        { id: "lesson-4-1", title: "Why Risk Management Matters", duration: "8 mins" },
        { id: "lesson-4-2", title: "Position Sizing Fundamentals", duration: "10 mins" },
        { id: "lesson-4-3", title: "Setting Stop Losses", duration: "9 mins" },
        { id: "lesson-4-4", title: "Risk-Reward Ratios", duration: "10 mins" },
        { id: "lesson-4-5", title: "Managing Multiple Positions", duration: "8 mins" }
      ],
      quiz: {
        questions: 12,
        passingScore: 80,
        timeLimit: "20 mins",
        attempts: 3
      }
    },
    {
      id: "module-5",
      title: "Module 5: Basic Strategies",
      description: "Simple yet effective trading strategies for beginners",
      duration: "60 mins",
      lessons: [
        { id: "lesson-5-1", title: "Trend Following Strategy", duration: "12 mins" },
        { id: "lesson-5-2", title: "Support/Resistance Trading", duration: "12 mins" },
        { id: "lesson-5-3", title: "Moving Average Crossovers", duration: "14 mins" },
        { id: "lesson-5-4", title: "Simple Breakout Trading", duration: "12 mins" },
        { id: "lesson-5-5", title: "When to Avoid Trading", duration: "10 mins" }
      ],
      quiz: {
        questions: 15,
        passingScore: 75,
        timeLimit: "25 mins",
        attempts: 3
      }
    },
    {
      id: "module-6",
      title: "Module 6: Trading Psychology",
      description: "Master the mental aspects of trading for consistent performance",
      duration: "30 mins",
      lessons: [
        { id: "lesson-6-1", title: "Emotional Control in Trading", duration: "6 mins" },
        { id: "lesson-6-2", title: "Dealing with Losses", duration: "6 mins" },
        { id: "lesson-6-3", title: "Avoiding Revenge Trading", duration: "6 mins" },
        { id: "lesson-6-4", title: "Building Discipline", duration: "6 mins" },
        { id: "lesson-6-5", title: "Creating a Trading Routine", duration: "6 mins" }
      ],
      quiz: {
        questions: 10,
        passingScore: 75,
        timeLimit: "15 mins",
        attempts: 3
      }
    }
  ];

  const downloadableResources = [
    { title: "Forex Trading Basics Cheat Sheet", type: "PDF", size: "2.1 MB" },
    { title: "Currency Pairs Quick Reference", type: "PDF", size: "1.5 MB" },
    { title: "Position Size Calculator Template", type: "Excel", size: "0.8 MB" },
    { title: "Risk Management Checklist", type: "PDF", size: "1.2 MB" },
    { title: "Chart Patterns Visual Guide", type: "PDF", size: "3.4 MB" },
    { title: "Trading Psychology Workbook", type: "PDF", size: "2.8 MB" },
    { title: "Beginner Trading Plan Template", type: "Word", size: "0.5 MB" },
    { title: "Market Sessions Time Zone Chart", type: "PDF", size: "1.1 MB" }
  ];

  const faqs = [
    {
      question: "How long does it take to complete the Beginner Course?",
      answer: "The total course duration is 4.5 hours of video content. However, most students complete the course within 1-2 weeks when studying at a comfortable pace. We recommend spending 30-60 minutes per day to absorb the material properly. You have lifetime access, so you can learn at your own pace and revisit lessons anytime."
    },
    {
      question: "Do I need any prior trading experience to start this course?",
      answer: "No prior trading experience is required. This course is specifically designed for complete beginners. We start with the absolute basics and gradually build your knowledge. All you need is a computer or mobile device, internet connection, and a willingness to learn. We explain every concept from the ground up."
    },
    {
      question: "What happens if I fail a module quiz?",
      answer: "Each module quiz allows 3 attempts. If you don't pass on the first try, review the lesson materials and try again. You need 70-80% to pass (varies by module). If you exhaust all attempts, you can request a quiz reset after 24 hours. The quizzes are designed to reinforce learning, not to penalize you."
    },
    {
      question: "Will I receive a certificate after completing the course?",
      answer: "Yes! Upon successfully completing all 6 modules and passing all quizzes with the minimum required score, you'll receive a 'Certified Forex Trading Beginner' certificate. The certificate is digital, shareable on LinkedIn, and demonstrates your foundational knowledge of forex trading to potential employers or clients."
    },
    {
      question: "Can I practice trading while taking this course?",
      answer: "Absolutely! We strongly encourage you to open a demo trading account and practice what you learn in each module. Demo accounts use virtual money, so there's no financial risk. Hands-on practice alongside the course material significantly accelerates your learning and builds confidence before trading with real money."
    },
    {
      question: "How are the downloadable resources different from the video lessons?",
      answer: "The downloadable resources complement the video lessons by providing quick-reference materials, templates, and worksheets. While videos teach concepts in depth, the PDFs and templates are designed for quick consultation during actual trading, helping you apply what you've learned without rewatching entire lessons."
    },
    {
      question: "What should I study after completing the Beginner Course?",
      answer: "After completing the Beginner Course, we recommend practicing with a demo account for at least 1-2 months to solidify your skills. Then, progress to our Advanced Trading Course to learn professional strategies, institutional concepts, and systematic trading approaches. You can also explore our specialized courses on technical analysis and risk management."
    }
  ];

  const learningPath = {
    current: "Beginner Course",
    next: [
      { title: "Advanced Trading Course", description: "Master professional strategies and institutional concepts", estimated: "3-4 weeks" },
      { title: "Technical Analysis Mastery", description: "Deep dive into chart patterns and indicators", estimated: "2-3 weeks" },
      { title: "Risk Management Pro", description: "Advanced position sizing and portfolio management", estimated: "1-2 weeks" }
    ]
  };

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = progressData.filter(p => p.lessonId && p.completed).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="mb-2" data-testid="badge-course-level">Beginner Level</Badge>
            <h1 className="text-3xl font-bold">Beginner Trading Course</h1>
            <p className="text-muted-foreground">Master the fundamentals of forex trading</p>
          </div>
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Progress Overview */}
        <Card data-testid="card-progress-overview">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Completion</span>
                <span className="font-semibold" data-testid="text-course-progress">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" data-testid="progress-course" />
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
                <p className="text-2xl font-bold" data-testid="text-modules-passed">1/6</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Time Invested</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-time-invested">1.6 hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card data-testid="card-course-overview">
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>A comprehensive introduction to forex trading for beginners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Duration</p>
                <p className="text-2xl font-bold" data-testid="text-total-duration">4.5 hours</p>
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
                <p className="text-2xl font-bold" data-testid="text-course-level">Beginner</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This course covers everything you need to know to start trading forex. From basic concepts to practical strategies, 
              you'll learn at your own pace with clear explanations and real-world examples. Each module includes video lessons, 
              practical exercises, and a quiz to test your knowledge.
            </p>
          </CardContent>
        </Card>

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Modules</h2>
          {modules.map((module, index) => {
            const moduleProgress = getModuleProgress(module.id, module.lessons.length);
            const moduleStatus = moduleProgress === 100 ? 'completed' : moduleProgress > 0 ? 'in-progress' : 'locked';
            
            return (
            <Card key={index} data-testid={`card-module-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                        moduleStatus === 'completed' ? 'bg-primary text-primary-foreground' :
                        moduleStatus === 'in-progress' ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {moduleStatus === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl mb-1">{module.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {module.duration}
                          </span>
                          <Badge variant="outline">{module.lessons.length} lessons</Badge>
                          {moduleStatus === 'locked' && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Locked</Badge>}
                          {moduleStatus === 'in-progress' && <Badge variant="default">In Progress</Badge>}
                          {moduleStatus === 'completed' && <Badge className="bg-green-600">Completed</Badge>}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    {moduleProgress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{moduleProgress}%</span>
                        </div>
                        <Progress value={moduleProgress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    data-testid={`button-module-${index}`}
                    disabled={moduleStatus === 'locked'}
                  >
                    {moduleStatus === 'completed' ? 'Review' : 
                     moduleStatus === 'in-progress' ? 'Continue' : 
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
                    Module Quiz
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
          );
          })}
        </div>

        {/* Certificate Information */}
        <Card data-testid="card-certificate">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Course Certificate</CardTitle>
                <CardDescription>Earn your certification upon completion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upon successful completion of this course, you'll receive a verified digital certificate that demonstrates 
              your foundational knowledge of forex trading.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Complete all 6 modules (30 lessons)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Pass all module quizzes with 70%+ score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Complete the final course assessment (80% required)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Total study time: minimum 4.5 hours</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Certificate Benefits</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Shareable on LinkedIn and social media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Verifiable certificate ID for employers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Download PDF or print physical copy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Lifetime access to certificate records</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Certified Forex Trading Beginner</p>
                <p className="text-xs text-muted-foreground">Official certification from our trading academy</p>
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
                <CardTitle>Downloadable Resources</CardTitle>
                <CardDescription>Study materials and templates to support your learning</CardDescription>
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
            <CardDescription>Recommended courses after completing this one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{learningPath.current}</p>
                <p className="text-xs text-muted-foreground">Current course - 35% complete</p>
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
                    {index + 2}
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

        {/* What You'll Learn */}
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
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Use leverage and margin safely and effectively</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Create a sustainable trading routine and plan</span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card data-testid="card-faqs">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about the Beginner Trading Course</CardDescription>
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
                      This lesson covers important concepts in forex trading. You'll learn practical strategies 
                      and techniques that you can apply immediately in your trading journey.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Understand core concepts and terminology</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Learn practical application strategies</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Practice with real-world examples</span>
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
