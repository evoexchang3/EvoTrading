import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Award, Download, TrendingUp, Clock, Target, FileText, Lock, AlertTriangle, ChevronLeft, ChevronRight, HelpCircle, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type CourseProgress } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const COURSE_ID = "advanced-trading";

export default function AdvancedCoursePage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: string; moduleIndex: number; lessonId: string; lessonIndex: number; title: string } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
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
        title: t('education.advancedCourse.progress.saved'),
        description: t('education.advancedCourse.progress.savedDescription')
      });
    }
  });

  const modules = [
    {
      id: "module-adv-1",
      title: t('education.advancedCourse.module1.title'),
      description: t('education.advancedCourse.module1.description'),
      duration: t('education.advancedCourse.module1.duration'),
      lessons: [
        { id: "lesson-adv-1-1", title: t('education.advancedCourse.module1.lesson1'), duration: "20 mins" },
        { id: "lesson-adv-1-2", title: t('education.advancedCourse.module1.lesson2'), duration: "22 mins" },
        { id: "lesson-adv-1-3", title: t('education.advancedCourse.module1.lesson3'), duration: "18 mins" },
        { id: "lesson-adv-1-4", title: t('education.advancedCourse.module1.lesson4'), duration: "15 mins" },
        { id: "lesson-adv-1-5", title: t('education.advancedCourse.module1.lesson5'), duration: "15 mins" }
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
      title: t('education.advancedCourse.module2.title'),
      description: t('education.advancedCourse.module2.description'),
      duration: t('education.advancedCourse.module2.duration'),
      lessons: [
        { id: "lesson-adv-2-1", title: t('education.advancedCourse.module2.lesson1'), duration: "18 mins" },
        { id: "lesson-adv-2-2", title: t('education.advancedCourse.module2.lesson2'), duration: "16 mins" },
        { id: "lesson-adv-2-3", title: t('education.advancedCourse.module2.lesson3'), duration: "15 mins" },
        { id: "lesson-adv-2-4", title: t('education.advancedCourse.module2.lesson4'), duration: "14 mins" },
        { id: "lesson-adv-2-5", title: t('education.advancedCourse.module2.lesson5'), duration: "12 mins" }
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
      title: t('education.advancedCourse.module3.title'),
      description: t('education.advancedCourse.module3.description'),
      duration: t('education.advancedCourse.module3.duration'),
      lessons: [
        { id: "lesson-adv-3-1", title: t('education.advancedCourse.module3.lesson1'), duration: "15 mins" },
        { id: "lesson-adv-3-2", title: t('education.advancedCourse.module3.lesson2'), duration: "12 mins" },
        { id: "lesson-adv-3-3", title: t('education.advancedCourse.module3.lesson3'), duration: "10 mins" },
        { id: "lesson-adv-3-4", title: t('education.advancedCourse.module3.lesson4'), duration: "12 mins" },
        { id: "lesson-adv-3-5", title: t('education.advancedCourse.module3.lesson5'), duration: "11 mins" }
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
      title: t('education.advancedCourse.module4.title'),
      description: t('education.advancedCourse.module4.description'),
      duration: t('education.advancedCourse.module4.duration'),
      lessons: [
        { id: "lesson-adv-4-1", title: t('education.advancedCourse.module4.lesson1'), duration: "20 mins" },
        { id: "lesson-adv-4-2", title: t('education.advancedCourse.module4.lesson2'), duration: "22 mins" },
        { id: "lesson-adv-4-3", title: t('education.advancedCourse.module4.lesson3'), duration: "18 mins" },
        { id: "lesson-adv-4-4", title: t('education.advancedCourse.module4.lesson4'), duration: "15 mins" },
        { id: "lesson-adv-4-5", title: t('education.advancedCourse.module4.lesson5'), duration: "15 mins" }
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
      title: t('education.advancedCourse.module5.title'),
      description: t('education.advancedCourse.module5.description'),
      duration: t('education.advancedCourse.module5.duration'),
      lessons: [
        { id: "lesson-adv-5-1", title: t('education.advancedCourse.module5.lesson1'), duration: "25 mins" },
        { id: "lesson-adv-5-2", title: t('education.advancedCourse.module5.lesson2'), duration: "25 mins" },
        { id: "lesson-adv-5-3", title: t('education.advancedCourse.module5.lesson3'), duration: "20 mins" },
        { id: "lesson-adv-5-4", title: t('education.advancedCourse.module5.lesson4'), duration: "25 mins" },
        { id: "lesson-adv-5-5", title: t('education.advancedCourse.module5.lesson5'), duration: "25 mins" }
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
      title: t('education.advancedCourse.module6.title'),
      description: t('education.advancedCourse.module6.description'),
      duration: t('education.advancedCourse.module6.duration'),
      lessons: [
        { id: "lesson-adv-6-1", title: t('education.advancedCourse.module6.lesson1'), duration: "15 mins" },
        { id: "lesson-adv-6-2", title: t('education.advancedCourse.module6.lesson2'), duration: "12 mins" },
        { id: "lesson-adv-6-3", title: t('education.advancedCourse.module6.lesson3'), duration: "10 mins" },
        { id: "lesson-adv-6-4", title: t('education.advancedCourse.module6.lesson4'), duration: "13 mins" },
        { id: "lesson-adv-6-5", title: t('education.advancedCourse.module6.lesson5'), duration: "10 mins" }
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
    { title: t('education.advancedCourse.resources.resource1'), type: "PDF", size: "2.8 MB" },
    { title: t('education.advancedCourse.resources.resource2'), type: "PDF", size: "3.2 MB" },
    { title: t('education.advancedCourse.resources.resource3'), type: "PDF", size: "4.1 MB" },
    { title: t('education.advancedCourse.resources.resource4'), type: "Excel", size: "1.2 MB" },
    { title: t('education.advancedCourse.resources.resource5'), type: "Excel", size: "1.8 MB" },
    { title: t('education.advancedCourse.resources.resource6'), type: "Excel", size: "2.1 MB" },
    { title: t('education.advancedCourse.resources.resource7'), type: "Excel", size: "1.5 MB" },
    { title: t('education.advancedCourse.resources.resource8'), type: "Excel", size: "0.9 MB" },
    { title: t('education.advancedCourse.resources.resource9'), type: "PDF", size: "3.5 MB" },
    { title: t('education.advancedCourse.resources.resource10'), type: "Excel", size: "2.3 MB" }
  ];

  const faqs = [
    {
      question: t('education.advancedCourse.faq.q1.question'),
      answer: t('education.advancedCourse.faq.q1.answer')
    },
    {
      question: t('education.advancedCourse.faq.q2.question'),
      answer: t('education.advancedCourse.faq.q2.answer')
    },
    {
      question: t('education.advancedCourse.faq.q3.question'),
      answer: t('education.advancedCourse.faq.q3.answer')
    },
    {
      question: t('education.advancedCourse.faq.q4.question'),
      answer: t('education.advancedCourse.faq.q4.answer')
    },
    {
      question: t('education.advancedCourse.faq.q5.question'),
      answer: t('education.advancedCourse.faq.q5.answer')
    },
    {
      question: t('education.advancedCourse.faq.q6.question'),
      answer: t('education.advancedCourse.faq.q6.answer')
    },
    {
      question: t('education.advancedCourse.faq.q7.question'),
      answer: t('education.advancedCourse.faq.q7.answer')
    }
  ];

  const learningPath = {
    prerequisite: t('education.advancedCourse.learningPath.prerequisite'),
    current: t('education.advancedCourse.learningPath.current'),
    next: [
      { title: t('education.advancedCourse.learningPath.next1.title'), description: t('education.advancedCourse.learningPath.next1.description'), estimated: t('education.advancedCourse.learningPath.next1.estimated') },
      { title: t('education.advancedCourse.learningPath.next2.title'), description: t('education.advancedCourse.learningPath.next2.description'), estimated: t('education.advancedCourse.learningPath.next2.estimated') },
      { title: t('education.advancedCourse.learningPath.next3.title'), description: t('education.advancedCourse.learningPath.next3.description'), estimated: t('education.advancedCourse.learningPath.next3.estimated') }
    ]
  };

  const getLessonProgress = (moduleId: string, lessonId: string) => {
    return progressData.find(p => 
      p.courseId === COURSE_ID && 
      p.moduleId === moduleId && 
      p.lessonId === lessonId &&
      p.completed
    ) !== undefined;
  };

  const getModuleProgress = (moduleId: string, totalLessons: number) => {
    const completedCount = progressData.filter(p => 
      p.courseId === COURSE_ID && 
      p.moduleId === moduleId && 
      p.lessonId !== null &&
      p.completed
    ).length;
    
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
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

  const courseProgress = useMemo(() => {
    const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    const completedLessons = progressData.filter(p => 
      p.courseId === COURSE_ID && 
      p.lessonId !== null && 
      p.completed
    ).length;
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  }, [progressData]);

  const completedLessons = progressData.filter(p => 
    p.courseId === COURSE_ID && 
    p.lessonId !== null && 
    p.completed
  ).length;
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge className="mb-2" data-testid="badge-course-level">{t('education.advancedCourse.badge')}</Badge>
            <h1 className="text-3xl font-bold">{t('education.advancedCourse.title')}</h1>
            <p className="text-muted-foreground">{t('education.advancedCourse.subtitle')}</p>
          </div>
          <GraduationCap className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Prerequisites Alert */}
        <Alert data-testid="alert-prerequisites">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{t('education.advancedCourse.prerequisites.title')}</strong> {t('education.advancedCourse.prerequisites.description')}
          </AlertDescription>
        </Alert>

        {/* Progress Overview */}
        <Card data-testid="card-progress-overview">
          <CardHeader>
            <CardTitle>{t('education.advancedCourse.progress.title')}</CardTitle>
            <CardDescription>{t('education.advancedCourse.progress.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('education.advancedCourse.progress.courseCompletion')}</span>
                <span className="font-semibold" data-testid="text-course-progress">{courseProgress}%</span>
              </div>
              <Progress value={courseProgress} className="h-2" data-testid="progress-course" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{t('education.advancedCourse.progress.lessonsCompleted')}</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-lessons-completed">{completedLessons}/{totalLessons}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{t('education.advancedCourse.progress.modulesPassed')}</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-modules-passed">0/6</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{t('education.advancedCourse.progress.timeInvested')}</p>
                </div>
                <p className="text-2xl font-bold" data-testid="text-time-invested">1.3 hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card data-testid="card-course-overview">
          <CardHeader>
            <CardTitle>{t('education.advancedCourse.overview.title')}</CardTitle>
            <CardDescription>{t('education.advancedCourse.overview.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.advancedCourse.overview.totalDuration')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-duration">{t('education.advancedCourse.overview.durationValue')}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.advancedCourse.overview.modules')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-modules">{t('education.advancedCourse.overview.modulesValue')}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.advancedCourse.overview.lessons')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-lessons">{totalLessons}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{t('education.advancedCourse.overview.level')}</p>
                <p className="text-2xl font-bold" data-testid="text-course-level">{t('education.advancedCourse.overview.levelValue')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('education.advancedCourse.overview.descriptionText')}
            </p>
          </CardContent>
        </Card>

        {/* Course Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t('education.advancedCourse.modules.title')}</h2>
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
                          <Badge variant="outline">{module.lessons.length} {t('education.advancedCourse.modules.lessons')}</Badge>
                          {moduleStatus === 'locked' && <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />{t('education.advancedCourse.modules.locked')}</Badge>}
                          {moduleStatus === 'in-progress' && <Badge variant="default">{t('education.advancedCourse.modules.inProgress')}</Badge>}
                          {moduleStatus === 'completed' && <Badge className="bg-green-600">{t('education.advancedCourse.modules.completed')}</Badge>}
                        </CardDescription>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    {moduleProgress > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('education.advancedCourse.modules.progress')}</span>
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
                    {moduleStatus === 'completed' ? t('education.advancedCourse.modules.review') : 
                     moduleStatus === 'in-progress' ? t('education.advancedCourse.modules.continue') : 
                     t('education.advancedCourse.modules.start')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-sm">{t('education.advancedCourse.modules.lessonsSection')}</h4>
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
                    {t('education.advancedCourse.modules.moduleQuiz')}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">{t('education.advancedCourse.modules.questions')}</span> {module.quiz.questions}
                    </div>
                    <div>
                      <span className="font-medium">{t('education.advancedCourse.modules.passingScore')}</span> {module.quiz.passingScore}%
                    </div>
                    <div>
                      <span className="font-medium">{t('education.advancedCourse.modules.timeLimit')}</span> {module.quiz.timeLimit}
                    </div>
                    <div>
                      <span className="font-medium">{t('education.advancedCourse.modules.attempts')}</span> {module.quiz.attempts}
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
                <CardTitle>{t('education.advancedCourse.resources.title')}</CardTitle>
                <CardDescription>{t('education.advancedCourse.resources.description')}</CardDescription>
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
            <CardTitle>{t('education.advancedCourse.learningPath.title')}</CardTitle>
            <CardDescription>{t('education.advancedCourse.learningPath.description')}</CardDescription>
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
            <CardTitle>{t('education.advancedCourse.faq.title')}</CardTitle>
            <CardDescription>{t('education.advancedCourse.faq.title')}</CardDescription>
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
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <h3 className="font-semibold text-lg mb-3">Introduction to Advanced Price Action</h3>
                    <p className="text-muted-foreground mb-4">
                      Price action trading is a pure form of technical analysis that focuses solely on price movements without relying on lagging indicators. 
                      Professional traders use price action to understand market psychology, identify high-probability setups, and execute with precision.
                    </p>
                    
                    <h3 className="font-semibold text-lg mb-3 mt-6">Understanding Market Structure</h3>
                    <p className="text-muted-foreground mb-4">
                      The foundation of price action trading is recognizing market structure: higher highs (HH), higher lows (HL), lower highs (LH), and lower lows (LL). 
                      These patterns reveal whether the market is trending, consolidating, or reversing.
                    </p>
                    
                    <div className="bg-muted p-4 rounded-lg my-4">
                      <h4 className="font-semibold mb-2">Key Concept: Break of Structure (BOS)</h4>
                      <p className="text-sm text-muted-foreground">
                        A Break of Structure occurs when price breaks a significant swing point. In an uptrend, BOS is confirmed when price breaks above 
                        the previous higher high. This signals trend continuation and provides entry opportunities on pullbacks.
                      </p>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-3 mt-6">Advanced Candlestick Patterns</h3>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Pin Bar (Rejection Candle):</strong> Long wick with small body indicates strong rejection at a level</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Engulfing Pattern:</strong> Larger candle completely engulfs previous candle, signals reversal</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Inside Bar:</strong> Consolidation pattern where candle is contained within previous candle's range</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Doji:</strong> Indecision candle with equal open and close, signals potential reversal at extremes</span>
                      </li>
                    </ul>
                    
                    <div className="bg-primary/10 border-l-4 border-primary p-4 rounded my-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Professional Trading Rule
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Never trade a candlestick pattern in isolation. Always consider the broader market context: trend direction, 
                        key support/resistance levels, and confluence with other technical factors. Context is everything in price action trading.
                      </p>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-3 mt-6">Trading the Trend</h3>
                    <p className="text-muted-foreground mb-3">
                      The phrase "the trend is your friend" exists for a reason. Professional traders identify the trend on higher timeframes (H4, Daily) 
                      and execute entries on lower timeframes (M15, H1) in the direction of the trend. This multi-timeframe approach dramatically 
                      improves win rates.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Entry Strategy:</strong> Wait for a pullback to a key level (previous structure, Fibonacci 50-61.8%, or moving average), 
                      then look for a bullish price action signal (pin bar, engulfing) to enter long in an uptrend.
                    </p>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4">Lesson Quiz</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium mb-3">1. What does "Break of Structure" (BOS) indicate in an uptrend?</p>
                        <div className="space-y-2">
                          {['a', 'b', 'c', 'd'].map((option) => {
                            const isCorrect = option === 'b';
                            const isSelected = quizAnswers['q1'] === option;
                            return (
                              <label 
                                key={option}
                                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                                  !quizSubmitted ? 'hover-elevate' : ''
                                } ${
                                  quizSubmitted && isCorrect ? 'bg-green-500/10 border border-green-500/20' : 
                                  quizSubmitted && isSelected && !isCorrect ? 'bg-red-500/10 border border-red-500/20' : ''
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="q1" 
                                  value={option} 
                                  className="w-4 h-4" 
                                  checked={isSelected}
                                  onChange={(e) => !quizSubmitted && setQuizAnswers({...quizAnswers, q1: e.target.value})}
                                  disabled={quizSubmitted}
                                />
                                <span className="text-sm">
                                  {option === 'a' && 'Price is about to reverse downward'}
                                  {option === 'b' && 'Trend continuation - price breaks above previous higher high'}
                                  {option === 'c' && 'Market is entering consolidation phase'}
                                  {option === 'd' && 'No clear signal - neutral market'}
                                  {quizSubmitted && isCorrect && ' ✓'}
                                  {quizSubmitted && isSelected && !isCorrect && ' ✗'}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {quizSubmitted && quizAnswers['q1'] !== 'b' && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">Correct answer: Trend continuation - price breaks above previous higher high</p>
                        )}
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium mb-3">2. What does a pin bar candlestick pattern indicate?</p>
                        <div className="space-y-2">
                          {['a', 'b', 'c', 'd'].map((option) => {
                            const isCorrect = option === 'c';
                            const isSelected = quizAnswers['q2'] === option;
                            return (
                              <label 
                                key={option}
                                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                                  !quizSubmitted ? 'hover-elevate' : ''
                                } ${
                                  quizSubmitted && isCorrect ? 'bg-green-500/10 border border-green-500/20' : 
                                  quizSubmitted && isSelected && !isCorrect ? 'bg-red-500/10 border border-red-500/20' : ''
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="q2" 
                                  value={option} 
                                  className="w-4 h-4"
                                  checked={isSelected}
                                  onChange={(e) => !quizSubmitted && setQuizAnswers({...quizAnswers, q2: e.target.value})}
                                  disabled={quizSubmitted}
                                />
                                <span className="text-sm">
                                  {option === 'a' && 'Market indecision and consolidation'}
                                  {option === 'b' && 'Strong trend continuation signal'}
                                  {option === 'c' && 'Strong rejection at a price level (long wick, small body)'}
                                  {option === 'd' && 'Breakout is imminent'}
                                  {quizSubmitted && isCorrect && ' ✓'}
                                  {quizSubmitted && isSelected && !isCorrect && ' ✗'}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {quizSubmitted && quizAnswers['q2'] !== 'c' && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">Correct answer: Strong rejection at a price level (long wick, small body)</p>
                        )}
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium mb-3">3. What is the professional approach to trading with the trend?</p>
                        <div className="space-y-2">
                          {['a', 'b', 'c', 'd'].map((option) => {
                            const isCorrect = option === 'b';
                            const isSelected = quizAnswers['q3'] === option;
                            return (
                              <label 
                                key={option}
                                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                                  !quizSubmitted ? 'hover-elevate' : ''
                                } ${
                                  quizSubmitted && isCorrect ? 'bg-green-500/10 border border-green-500/20' : 
                                  quizSubmitted && isSelected && !isCorrect ? 'bg-red-500/10 border border-red-500/20' : ''
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="q3" 
                                  value={option} 
                                  className="w-4 h-4"
                                  checked={isSelected}
                                  onChange={(e) => !quizSubmitted && setQuizAnswers({...quizAnswers, q3: e.target.value})}
                                  disabled={quizSubmitted}
                                />
                                <span className="text-sm">
                                  {option === 'a' && 'Always trade against the trend for better risk/reward'}
                                  {option === 'b' && 'Identify trend on higher timeframe, enter on lower timeframe pullbacks'}
                                  {option === 'c' && 'Only use M1 charts for fastest entries'}
                                  {option === 'd' && 'Ignore timeframes and trade all signals equally'}
                                  {quizSubmitted && isCorrect && ' ✓'}
                                  {quizSubmitted && isSelected && !isCorrect && ' ✗'}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {quizSubmitted && quizAnswers['q3'] !== 'b' && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">Correct answer: Identify trend on higher timeframe, enter on lower timeframe pullbacks</p>
                        )}
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <p className="font-medium mb-3">4. According to the lesson, why should you never trade candlestick patterns in isolation?</p>
                        <div className="space-y-2">
                          {['a', 'b', 'c', 'd'].map((option) => {
                            const isCorrect = option === 'b';
                            const isSelected = quizAnswers['q4'] === option;
                            return (
                              <label 
                                key={option}
                                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                                  !quizSubmitted ? 'hover-elevate' : ''
                                } ${
                                  quizSubmitted && isCorrect ? 'bg-green-500/10 border border-green-500/20' : 
                                  quizSubmitted && isSelected && !isCorrect ? 'bg-red-500/10 border border-red-500/20' : ''
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="q4" 
                                  value={option} 
                                  className="w-4 h-4"
                                  checked={isSelected}
                                  onChange={(e) => !quizSubmitted && setQuizAnswers({...quizAnswers, q4: e.target.value})}
                                  disabled={quizSubmitted}
                                />
                                <span className="text-sm">
                                  {option === 'a' && 'Candlestick patterns are unreliable and should be avoided'}
                                  {option === 'b' && 'Context matters - consider trend, support/resistance, and confluence'}
                                  {option === 'c' && 'You need at least 5 indicators to confirm any pattern'}
                                  {option === 'd' && 'Patterns only work on 1-hour charts or higher'}
                                  {quizSubmitted && isCorrect && ' ✓'}
                                  {quizSubmitted && isSelected && !isCorrect && ' ✗'}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {quizSubmitted && quizAnswers['q4'] !== 'b' && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">Correct answer: Context matters - consider trend, support/resistance, and confluence</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      {!quizSubmitted ? (
                        <Button 
                          onClick={() => {
                            if (Object.keys(quizAnswers).length === 4) {
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
                                title: t('education.advancedCourse.quiz.incompleteQuiz'),
                                description: t('education.advancedCourse.quiz.answerAll'),
                                variant: "destructive"
                              });
                            }
                          }}
                          data-testid="button-submit-quiz"
                        >
                          {t('education.advancedCourse.quiz.submitQuiz')}
                        </Button>
                      ) : (
                        <>
                          <Button 
                            onClick={() => {
                              setQuizAnswers({});
                              setQuizSubmitted(false);
                            }}
                            variant="outline"
                            data-testid="button-reset-quiz"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            {t('education.advancedCourse.quiz.tryAgain')}
                          </Button>
                          <Alert className="flex-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <AlertDescription>
                              {t('education.advancedCourse.quiz.quizSubmitted')}
                            </AlertDescription>
                          </Alert>
                        </>
                      )}
                    </div>
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
                    {t('education.advancedCourse.lesson.previousLesson')}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={!hasNext}
                    data-testid="button-next-lesson"
                  >
                    {t('education.advancedCourse.lesson.nextLesson')}
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
