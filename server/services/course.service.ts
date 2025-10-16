import { db } from '../db';
import { courseProgress, type CourseProgress, type InsertCourseProgress } from "@shared/schema";
import { eq, and, isNull } from "drizzle-orm";

export class CourseService {
  async getUserProgress(clientId: string, courseId: string): Promise<CourseProgress[]> {
    return await db
      .select()
      .from(courseProgress)
      .where(
        and(
          eq(courseProgress.clientId, clientId),
          eq(courseProgress.courseId, courseId)
        )
      )
      .execute();
  }

  async saveProgress(data: {
    clientId: string;
    courseId: string;
    moduleId: string;
    lessonId?: string;
    completed?: boolean;
    quizScore?: number;
  }): Promise<CourseProgress> {
    const existing = await db
      .select()
      .from(courseProgress)
      .where(
        and(
          eq(courseProgress.clientId, data.clientId),
          eq(courseProgress.courseId, data.courseId),
          eq(courseProgress.moduleId, data.moduleId),
          data.lessonId ? eq(courseProgress.lessonId, data.lessonId) : isNull(courseProgress.lessonId)
        )
      )
      .execute();

    if (existing.length > 0) {
      const [updated] = await db
        .update(courseProgress)
        .set({
          completed: data.completed ?? existing[0].completed,
          quizScore: data.quizScore ?? existing[0].quizScore,
          lastAccessedAt: new Date(),
          completedAt: data.completed ? new Date() : existing[0].completedAt,
        })
        .where(eq(courseProgress.id, existing[0].id))
        .returning()
        .execute();

      return updated;
    }

    const [newProgress] = await db
      .insert(courseProgress)
      .values({
        clientId: data.clientId,
        courseId: data.courseId,
        moduleId: data.moduleId,
        lessonId: data.lessonId || null,
        completed: data.completed ?? false,
        quizScore: data.quizScore,
        lastAccessedAt: new Date(),
        completedAt: data.completed ? new Date() : null,
      })
      .returning()
      .execute();

    return newProgress;
  }

  async updateLessonCompletion(
    clientId: string,
    courseId: string,
    moduleId: string,
    lessonId: string,
    completed: boolean
  ): Promise<CourseProgress> {
    return this.saveProgress({
      clientId,
      courseId,
      moduleId,
      lessonId,
      completed,
    });
  }

  async updateQuizScore(
    clientId: string,
    courseId: string,
    moduleId: string,
    score: number
  ): Promise<CourseProgress> {
    return this.saveProgress({
      clientId,
      courseId,
      moduleId,
      quizScore: score,
      completed: score >= 70,
    });
  }

  async getCourseCompletion(clientId: string, courseId: string): Promise<{
    totalModules: number;
    completedModules: number;
    percentComplete: number;
  }> {
    const progress = await this.getUserProgress(clientId, courseId);
    
    const moduleProgress = progress.filter(p => !p.lessonId && p.completed);
    
    const totalModules = courseId === 'beginner' ? 5 : 6;
    const completedModules = moduleProgress.length;
    const percentComplete = Math.round((completedModules / totalModules) * 100);

    return {
      totalModules,
      completedModules,
      percentComplete,
    };
  }
}

export const courseService = new CourseService();
