import { LandingLayout } from "@/components/LandingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { BookOpen, TrendingUp, Shield, BarChart3, Lightbulb, GraduationCap, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";
import { useVariantContent } from "@/hooks/useVariantContent";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";

export default function EducationPage() {
  const { t } = useLanguage();
  const { getPageContent } = useVariantContent();
  const variant = useVariant();
  const educationContent = getPageContent('education');
  
  const educationConfig = variant.pages.education;

  if (!educationContent) {
    return null;
  }

  const courses = [
    { title: "Beginner Trading Course", level: "Beginner", duration: "6 weeks", icon: BookOpen, description: "Start your trading journey" },
    { title: "Technical Analysis Mastery", level: "Intermediate", duration: "8 weeks", icon: TrendingUp, description: "Master chart patterns and indicators" },
    { title: "Risk Management Essentials", level: "Beginner", duration: "4 weeks", icon: Shield, description: "Protect your capital effectively" },
    { title: "Advanced Trading Strategies", level: "Advanced", duration: "10 weeks", icon: BarChart3, description: "Professional trading techniques" },
    { title: "Trading Psychology", level: "All Levels", duration: "5 weeks", icon: Lightbulb, description: "Mental edge for traders" },
    { title: "Algorithmic Trading", level: "Advanced", duration: "12 weeks", icon: GraduationCap, description: "Automated trading systems" },
  ];

  const categories = ["All Courses", "Beginner", "Intermediate", "Advanced"];

  const heroProps = {
    headline: educationContent.hero?.title || "Trading Education",
    subheadline: educationContent.hero?.subtitle || "Learn from the best",
    cta: "Start Learning",
    style: 'standard' as const,
  };

  // Course Grid Layout
  const CourseGridLayout = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-courses">Available Courses</h2>
          <p className="text-lg text-muted-foreground">Choose from our comprehensive curriculum</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`course-card-${index}`}>
                <CardHeader>
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle data-testid={`course-title-${index}`}>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{course.level}</Badge>
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </div>
                  <Link href="/education/beginner-course">
                    <Button className="w-full" data-testid={`button-enroll-course-${index}`}>
                      Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Course List Layout
  const CourseListLayout = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-courses">Our Courses</h2>
          <p className="text-lg text-muted-foreground">Structured learning paths for all levels</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`course-list-${index}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <CardTitle>{course.title}</CardTitle>
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <CardDescription className="mb-4">{course.description}</CardDescription>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Duration: {course.duration}</span>
                        <Link href="/education/beginner-course">
                          <Button variant="outline" size="sm" data-testid={`button-course-list-learn-${index}`}>Learn More</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Path Visualization Layout
  const PathVisualizationLayout = () => (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="heading-learning-path">Learning Pathway</h2>
          <p className="text-xl text-muted-foreground">Follow a structured journey from beginner to expert</p>
        </div>
        <div className="max-w-5xl mx-auto space-y-8">
          {courses.slice(0, 4).map((course, index) => {
            const Icon = course.icon;
            return (
              <div key={index} className="flex gap-6" data-testid={`path-step-${index}`}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  {index < 3 && (
                    <div className="w-0.5 flex-1 bg-border my-4" style={{ minHeight: '60px' }} />
                  )}
                </div>
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Icon className="w-6 h-6 text-primary mt-1" />
                        <div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription className="mt-2">{course.description}</CardDescription>
                        </div>
                      </div>
                      <Badge>{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{course.duration}</span>
                      <Link href="/education/beginner-course">
                        <Button size="sm" data-testid={`button-path-start-${index}`}>Start Course</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Pathway Layout (simplified with categorization)
  const PathwayLayout = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-pathway">Choose Your Path</h2>
          <p className="text-lg text-muted-foreground">Select the right learning track for your goals</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Beginner Track", "Intermediate Track", "Advanced Track"].map((track, trackIndex) => (
            <Card key={trackIndex} className="hover-elevate" data-testid={`pathway-${trackIndex}`}>
              <CardHeader>
                <CardTitle className="text-xl mb-4">{track}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courses.slice(trackIndex * 2, trackIndex * 2 + 2).map((course, index) => {
                    const Icon = course.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Icon className="w-5 h-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{course.title}</div>
                          <div className="text-xs text-muted-foreground">{course.duration}</div>
                        </div>
                      </div>
                    );
                  })}
                  <Link href="/education/beginner-course">
                    <Button className="w-full mt-4" data-testid={`button-start-track-${trackIndex}`}>Start Track</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  // Category Tabs Layout
  const CategoryTabsLayout = () => (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-courses-tabs">Browse Courses</h2>
          <p className="text-lg text-muted-foreground">Filter by skill level</p>
        </div>
        <Tabs defaultValue="all" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {categories.map((cat, index) => (
              <TabsTrigger key={index} value={cat.toLowerCase().replace(' ', '-')} data-testid={`tab-${cat.toLowerCase().replace(' ', '-')}`}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat.toLowerCase().replace(' ', '-')}>
              <div className="grid md:grid-cols-3 gap-6">
                {courses
                  .filter(c => cat === "All Courses" || c.level === cat)
                  .map((course, index) => {
                    const Icon = course.icon;
                    return (
                      <Card key={index} className="hover-elevate">
                        <CardHeader>
                          <div className="p-3 rounded-lg bg-primary/10 w-fit mb-3">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href="/education/beginner-course">
                            <Button className="w-full" data-testid={`button-tab-view-course-${index}`}>View Course</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );

  // Featured List Layout
  const FeaturedListLayout = () => (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-featured">Featured Courses</h2>
          <p className="text-lg text-muted-foreground">Most popular learning resources</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {courses.slice(0, 2).map((course, index) => {
              const Icon = course.icon;
              return (
                <Card key={index} className="hover-elevate" data-testid={`featured-course-${index}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-4 rounded-lg bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Level: {course.level}</span>
                        <span className="text-sm text-muted-foreground">{course.duration}</span>
                      </div>
                      <Link href="/education/beginner-course">
                        <Button className="w-full" size="lg" data-testid={`button-featured-enroll-${index}`}>Enroll Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold mb-4">More Courses</h3>
            {courses.slice(2).map((course, index) => {
              const Icon = course.icon;
              return (
                <Card key={index} className="hover-elevate">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                      </div>
                      <Link href="/education/beginner-course">
                        <Button variant="outline" data-testid={`button-more-view-${index}`}>View Course</Button>
                      </Link>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );

  // Layout dispatcher
  const renderContent = () => {
    switch (educationConfig.layout) {
      case 'course-grid':
        return <CourseGridLayout />;
      
      case 'course-list':
        return <CourseListLayout />;
      
      case 'path-visualization':
        return <PathVisualizationLayout />;
      
      case 'pathway':
        return <PathwayLayout />;
      
      case 'category-tabs':
        return <CategoryTabsLayout />;
      
      case 'featured-list':
        return <FeaturedListLayout />;
      
      default:
        return <CourseGridLayout />;
    }
  };

  return (
    <LandingLayout>
      <SEO
        title={t('education.seo.title')}
        description={t('education.seo.description')}
        keywords={t('education.seo.keywords')}
      />
      <div className="min-h-screen">
        <HeroRenderer {...heroProps} />
        {renderContent()}
      </div>
    </LandingLayout>
  );
}
