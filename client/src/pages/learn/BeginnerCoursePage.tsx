import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Award, Download, TrendingUp, Clock, Target, FileText, Lock, ChevronLeft, ChevronRight, X, AlertTriangle, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type CourseProgress } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { LessonViewer } from "@/components/LessonViewer";
import { getLessonContent } from "@/content/courses";
import { useAuth } from "@/contexts/AuthContext";
import { CourseCertificate } from "@/components/certificates/CourseCertificate";

const COURSE_ID = "beginner-trading";

export default function BeginnerCoursePage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: string; moduleIndex: number; lessonId: string; lessonIndex: number; title: string } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [selectedLesson?.lessonId]);
  
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
      return apiRequest('POST', '/api/course-progress', {
        courseId: COURSE_ID,
        ...data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/course-progress', COURSE_ID] });
      toast({
        title: t('education.beginnerCourse.progress.saved'),
        description: t('education.beginnerCourse.progress.savedDescription')
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

  const isModuleUnlocked = (moduleIndex: number) => {
    if (moduleIndex === 0) return true;
    const previousModule = modules[moduleIndex - 1];
    const previousModuleProgress = getModuleProgress(previousModule.id, previousModule.lessons.length);
    return previousModuleProgress === 100;
  };

  const getModuleStatus = (moduleIndex: number, moduleId: string, totalLessons: number) => {
    const progress = getModuleProgress(moduleId, totalLessons);
    if (!isModuleUnlocked(moduleIndex)) return 'locked';
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'unlocked';
  };

  const getFirstIncompleteLesson = (moduleId: string, lessons: any[]) => {
    for (const lesson of lessons) {
      if (!getLessonProgress(moduleId, lesson.id)) {
        return lesson;
      }
    }
    return null;
  };


  const modules = [
    {
      id: "module-1",
      title: t('education.beginnerCourse.module1.title'),
      description: t('education.beginnerCourse.module1.description'),
      duration: t('education.beginnerCourse.module1.duration'),
      lessons: [
        { id: "lesson-1-1", title: t('education.beginnerCourse.module1.lesson1'), duration: "5 mins" },
        { id: "lesson-1-2", title: t('education.beginnerCourse.module1.lesson2'), duration: "6 mins" },
        { id: "lesson-1-3", title: t('education.beginnerCourse.module1.lesson3'), duration: "7 mins" },
        { id: "lesson-1-4", title: t('education.beginnerCourse.module1.lesson4'), duration: "6 mins" },
        { id: "lesson-1-5", title: t('education.beginnerCourse.module1.lesson5'), duration: "6 mins" }
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
      title: t('education.beginnerCourse.module2.title'),
      description: t('education.beginnerCourse.module2.description'),
      duration: t('education.beginnerCourse.module2.duration'),
      lessons: [
        { id: "lesson-2-1", title: t('education.beginnerCourse.module2.lesson1'), duration: "8 mins" },
        { id: "lesson-2-2", title: t('education.beginnerCourse.module2.lesson2'), duration: "7 mins" },
        { id: "lesson-2-3", title: t('education.beginnerCourse.module2.lesson3'), duration: "10 mins" },
        { id: "lesson-2-4", title: t('education.beginnerCourse.module2.lesson4'), duration: "8 mins" },
        { id: "lesson-2-5", title: t('education.beginnerCourse.module2.lesson5'), duration: "12 mins" }
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
      title: t('education.beginnerCourse.module3.title'),
      description: t('education.beginnerCourse.module3.description'),
      duration: t('education.beginnerCourse.module3.duration'),
      lessons: [
        { id: "lesson-3-1", title: t('education.beginnerCourse.module3.lesson1'), duration: "10 mins" },
        { id: "lesson-3-2", title: t('education.beginnerCourse.module3.lesson2'), duration: "15 mins" },
        { id: "lesson-3-3", title: t('education.beginnerCourse.module3.lesson3'), duration: "12 mins" },
        { id: "lesson-3-4", title: t('education.beginnerCourse.module3.lesson4'), duration: "13 mins" },
        { id: "lesson-3-5", title: t('education.beginnerCourse.module3.lesson5'), duration: "10 mins" }
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
      title: t('education.beginnerCourse.module4.title'),
      description: t('education.beginnerCourse.module4.description'),
      duration: t('education.beginnerCourse.module4.duration'),
      lessons: [
        { id: "lesson-4-1", title: t('education.beginnerCourse.module4.lesson1'), duration: "8 mins" },
        { id: "lesson-4-2", title: t('education.beginnerCourse.module4.lesson2'), duration: "10 mins" },
        { id: "lesson-4-3", title: t('education.beginnerCourse.module4.lesson3'), duration: "9 mins" },
        { id: "lesson-4-4", title: t('education.beginnerCourse.module4.lesson4'), duration: "10 mins" },
        { id: "lesson-4-5", title: t('education.beginnerCourse.module4.lesson5'), duration: "8 mins" }
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
      title: t('education.beginnerCourse.module5.title'),
      description: t('education.beginnerCourse.module5.description'),
      duration: t('education.beginnerCourse.module5.duration'),
      lessons: [
        { id: "lesson-5-1", title: t('education.beginnerCourse.module5.lesson1'), duration: "12 mins" },
        { id: "lesson-5-2", title: t('education.beginnerCourse.module5.lesson2'), duration: "12 mins" },
        { id: "lesson-5-3", title: t('education.beginnerCourse.module5.lesson3'), duration: "14 mins" },
        { id: "lesson-5-4", title: t('education.beginnerCourse.module5.lesson4'), duration: "12 mins" },
        { id: "lesson-5-5", title: t('education.beginnerCourse.module5.lesson5'), duration: "10 mins" }
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
      title: t('education.beginnerCourse.module6.title'),
      description: t('education.beginnerCourse.module6.description'),
      duration: t('education.beginnerCourse.module6.duration'),
      lessons: [
        { id: "lesson-6-1", title: t('education.beginnerCourse.module6.lesson1'), duration: "6 mins" },
        { id: "lesson-6-2", title: t('education.beginnerCourse.module6.lesson2'), duration: "6 mins" },
        { id: "lesson-6-3", title: t('education.beginnerCourse.module6.lesson3'), duration: "6 mins" },
        { id: "lesson-6-4", title: t('education.beginnerCourse.module6.lesson4'), duration: "6 mins" },
        { id: "lesson-6-5", title: t('education.beginnerCourse.module6.lesson5'), duration: "6 mins" }
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
    { title: "Trading Plan Template", type: "HTML/PDF", size: "45 KB", url: "/assets/courses/resources/beginner/trading-plan-template.html" },
    { title: "Trading Journal Template", type: "HTML/PDF", size: "38 KB", url: "/assets/courses/resources/beginner/trading-journal-template.html" },
    { title: "Risk Calculator & Position Sizer", type: "HTML", size: "32 KB", url: "/assets/courses/resources/beginner/risk-calculator.html" }
  ];

  const faqs = [
    {
      question: t('education.beginnerCourse.faq.q1.question'),
      answer: t('education.beginnerCourse.faq.q1.answer')
    },
    {
      question: t('education.beginnerCourse.faq.q2.question'),
      answer: t('education.beginnerCourse.faq.q2.answer')
    },
    {
      question: t('education.beginnerCourse.faq.q3.question'),
      answer: t('education.beginnerCourse.faq.q3.answer')
    },
    {
      question: t('education.beginnerCourse.faq.q4.question'),
      answer: t('education.beginnerCourse.faq.q4.answer')
    },
    {
      question: t('education.beginnerCourse.faq.q5.question'),
      answer: t('education.beginnerCourse.faq.q5.answer')
    },
    {
      question: t('education.beginnerCourse.faq.q6.question'),
      answer: t('education.beginnerCourse.faq.q6.answer')
    },
    {
      question: t('education.beginnerCourse.faq.q7.question'),
      answer: t('education.beginnerCourse.faq.q7.answer')
    }
  ];

  const learningPath = {
    current: t('education.beginnerCourse.learningPath.current'),
    next: [
      { title: t('education.beginnerCourse.learningPath.next1.title'), description: t('education.beginnerCourse.learningPath.next1.description'), estimated: t('education.beginnerCourse.learningPath.next1.estimated') },
      { title: t('education.beginnerCourse.learningPath.next2.title'), description: t('education.beginnerCourse.learningPath.next2.description'), estimated: t('education.beginnerCourse.learningPath.next2.estimated') },
      { title: t('education.beginnerCourse.learningPath.next3.title'), description: t('education.beginnerCourse.learningPath.next3.description'), estimated: t('education.beginnerCourse.learningPath.next3.estimated') }
    ]
  };

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = progressData.filter(p => p.lessonId && p.completed).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Calculate modules passed (module is passed if all lessons are completed)
  const modulesPassed = modules.filter(module => {
    const moduleLessons = module.lessons;
    const completedInModule = moduleLessons.filter(lesson => 
      getLessonProgress(module.id, lesson.id)
    ).length;
    return completedInModule === moduleLessons.length;
  }).length;

  // Calculate time invested from completed lessons
  const timeInvested = modules.reduce((totalMinutes, module) => {
    return totalMinutes + module.lessons.reduce((moduleMinutes, lesson) => {
      if (getLessonProgress(module.id, lesson.id)) {
        const duration = parseInt(lesson.duration) || 0;
        return moduleMinutes + duration;
      }
      return moduleMinutes;
    }, 0);
  }, 0);
  
  const timeInvestedHours = timeInvested / 60;
  const timeInvestedDisplay = timeInvestedHours >= 1 
    ? `${timeInvestedHours.toFixed(1)} hrs` 
    : `${timeInvested} mins`;

  const isCourseComplete = overallProgress === 100;
  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.email?.split('@')[0] || 'Student';

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="mb-2" data-testid="badge-course-level">{t('education.beginnerCourse.badge')}</Badge>
            <h1 className="text-3xl font-bold">{t('education.beginnerCourse.title')}</h1>
            <p className="text-muted-foreground">{t('education.beginnerCourse.subtitle')}</p>
          </div>
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Certificate - shown when course is complete */}
        {isCourseComplete && (
          <CourseCertificate
            courseName="Trading Fundamentals"
            courseLevel="Beginner"
            userName={userName}
            completionDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            totalLessons={totalLessons}
            totalDuration="6-8 hours"
          />
        )}

        {/* Progress Overview */}
        <Card data-testid="card-progress-overview">
          <CardHeader>
            <CardTitle>{t('education.beginnerCourse.progress.title')}</CardTitle>
            <CardDescription>{t('education.beginnerCourse.progress.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('education.beginnerCourse.progress.courseCompletion')}</span>
                <span className="font-semibold" data-testid="text-course-progress">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" data-testid="progress-course" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{t('education.beginnerCourse.progress.lessonsCompleted')}</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-lessons-completed">{completedLessons}/{totalLessons}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{t('education.beginnerCourse.progress.modulesPassed')}</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-modules-passed">{modulesPassed}/{modules.length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{t('education.beginnerCourse.progress.timeInvested')}</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-time-invested">{timeInvestedDisplay}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card data-testid="card-course-overview">
          <CardHeader>
            <CardTitle>{t('education.beginnerCourse.overview.title')}</CardTitle>
            <CardDescription>{t('education.beginnerCourse.overview.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.beginnerCourse.overview.totalDuration')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-duration">{t('education.beginnerCourse.overview.durationValue')}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.beginnerCourse.overview.modules')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-modules">{t('education.beginnerCourse.overview.modulesValue')}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.beginnerCourse.overview.lessons')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-lessons">{totalLessons}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.beginnerCourse.overview.level')}</p>
                <p className="text-2xl font-bold" data-testid="text-course-level">{t('education.beginnerCourse.overview.levelValue')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('education.beginnerCourse.overview.descriptionText')}
            </p>
          </CardContent>
        </Card>

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('education.beginnerCourse.modules.title')}</h2>
          {modules.map((module, index) => {
            const moduleProgress = getModuleProgress(module.id, module.lessons.length);
            const moduleStatus = getModuleStatus(index, module.id, module.lessons.length);
            const firstIncomplete = getFirstIncompleteLesson(module.id, module.lessons);
            
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
                          <Badge variant="outline">{module.lessons.length} {t('education.beginnerCourse.modules.lessons')}</Badge>
                          {moduleStatus === 'locked' && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />{t('education.beginnerCourse.modules.locked')}</Badge>}
                          {moduleStatus === 'in-progress' && <Badge variant="default">{t('education.beginnerCourse.modules.inProgress')}</Badge>}
                          {moduleStatus === 'completed' && <Badge className="bg-green-600">{t('education.beginnerCourse.modules.completed')}</Badge>}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    {moduleProgress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('education.beginnerCourse.modules.progress')}</span>
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
                    onClick={() => {
                      if (firstIncomplete) {
                        setSelectedLesson({
                          moduleId: module.id,
                          moduleIndex: index,
                          lessonId: firstIncomplete.id,
                          lessonIndex: module.lessons.findIndex(l => l.id === firstIncomplete.id),
                          title: firstIncomplete.title
                        });
                      }
                    }}
                  >
                    {moduleStatus === 'completed' ? t('education.beginnerCourse.modules.review') : 
                     moduleStatus === 'in-progress' ? t('education.beginnerCourse.modules.continue') : 
                     t('education.beginnerCourse.modules.start')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-sm">{t('education.beginnerCourse.modules.lessonsSection')}</h4>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = getLessonProgress(module.id, lesson.id);
                      return (
                      <li 
                        key={lessonIndex} 
                        className={`flex items-center gap-3 text-sm p-2 rounded ${moduleStatus !== 'locked' ? 'hover-elevate cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                        data-testid={`lesson-${index}-${lessonIndex}`}
                        onClick={() => {
                          if (moduleStatus !== 'locked') {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                            setSelectedLesson({ 
                              moduleId: module.id, 
                              moduleIndex: index,
                              lessonId: lesson.id, 
                              lessonIndex, 
                              title: lesson.title 
                            });
                          }
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-3 h-3 text-muted-foreground" />
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
                    {t('education.beginnerCourse.modules.moduleQuiz')}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">{t('education.beginnerCourse.modules.questions')}</span> {module.quiz.questions}
                    </div>
                    <div>
                      <span className="font-medium">{t('education.beginnerCourse.modules.passingScore')}</span> {module.quiz.passingScore}%
                    </div>
                    <div>
                      <span className="font-medium">{t('education.beginnerCourse.modules.timeLimit')}</span> {module.quiz.timeLimit}
                    </div>
                    <div>
                      <span className="font-medium">{t('education.beginnerCourse.modules.attempts')}</span> {module.quiz.attempts}
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
                <CardTitle>{t('education.beginnerCourse.certificate.title')}</CardTitle>
                <CardDescription>{t('education.beginnerCourse.certificate.description')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('education.beginnerCourse.certificate.intro')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">{t('education.beginnerCourse.certificate.requirementsTitle')}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.requirement1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.requirement2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.requirement3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.requirement4')}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">{t('education.beginnerCourse.certificate.benefitsTitle')}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.benefit1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.benefit2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.benefit3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{t('education.beginnerCourse.certificate.benefit4')}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{t('education.beginnerCourse.certificate.name')}</p>
                <p className="text-xs text-muted-foreground">{t('education.beginnerCourse.certificate.academy')}</p>
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
                <CardTitle>{t('education.beginnerCourse.resources.title')}</CardTitle>
                <CardDescription>{t('education.beginnerCourse.resources.description')}</CardDescription>
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
                    window.open(resource.url, '_blank');
                    toast({
                      title: "Resource Opened",
                      description: `${resource.title} has been opened in a new tab. You can save it as PDF using your browser's print function.`,
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
            <CardTitle>{t('education.beginnerCourse.learningPath.title')}</CardTitle>
            <CardDescription>{t('education.beginnerCourse.learningPath.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{learningPath.current}</p>
                <p className="text-xs text-muted-foreground">{t('education.beginnerCourse.learningPath.currentProgress')}</p>
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
          <h3 className="text-xl font-bold mb-4">{t('education.beginnerCourse.whatYouLearn.title')}</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item1')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item2')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item3')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item4')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item5')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item6')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item7')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{t('education.beginnerCourse.whatYouLearn.item8')}</span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card data-testid="card-faqs">
          <CardHeader>
            <CardTitle>{t('education.beginnerCourse.faq.title')}</CardTitle>
            <CardDescription>{t('education.beginnerCourse.faq.description')}</CardDescription>
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
            const lessonContent = getLessonContent(selectedLesson.lessonId);
            
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

            const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
              setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
            };

            const handleQuizSubmit = () => {
              const numQuestions = lessonContent?.quiz?.length || 0;
              if (Object.keys(quizAnswers).length === numQuestions) {
                setQuizSubmitted(true);
                // Auto-mark lesson as complete when quiz is submitted
                if (!isCompleted) {
                  saveProgressMutation.mutate({ 
                    moduleId: selectedLesson.moduleId, 
                    lessonId: selectedLesson.lessonId, 
                    completed: true 
                  });
                }
              } else {
                toast({
                  title: t('education.beginnerCourse.quiz.incomplete'),
                  description: t('education.beginnerCourse.quiz.incompleteDescription'),
                  variant: "destructive"
                });
              }
            };

            const handleQuizReset = () => {
              setQuizAnswers({});
              setQuizSubmitted(false);
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
                        <Badge variant="outline">{t('education.beginnerCourse.lesson.module')} {selectedLesson.moduleIndex + 1} • {t('education.beginnerCourse.lesson.lesson')} {selectedLesson.lessonIndex + 1}</Badge>
                        {isCompleted && <Badge className="bg-green-600">{t('education.beginnerCourse.lesson.completed')}</Badge>}
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
                          {t('education.beginnerCourse.lesson.completed')}
                        </>
                      ) : (
                        t('education.beginnerCourse.lesson.markComplete')
                      )}
                    </Button>
                  </div>
                </DialogHeader>
                
                <div className="mt-6">
                  <LessonViewer
                    lessonId={selectedLesson.lessonId}
                    quizAnswers={quizAnswers}
                    quizSubmitted={quizSubmitted}
                    onAnswerChange={handleAnswerChange}
                    onQuizSubmit={handleQuizSubmit}
                    onQuizReset={handleQuizReset}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    data-testid="button-previous-lesson"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {t('education.beginnerCourse.lesson.previousLesson')}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={!hasNext}
                    data-testid="button-next-lesson"
                  >
                    {t('education.beginnerCourse.lesson.nextLesson')}
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
