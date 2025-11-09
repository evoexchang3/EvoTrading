/**
 * Course Content Index
 * Consolidates all course lesson content
 */

import { beginnerLessons, type LessonContent } from './beginner-lessons';
import { module2Lessons } from './beginner-module2';
import { module3To6Lessons } from './beginner-modules-3-6';
import { advancedLessons } from './advanced-lessons';
import { advancedModules3To6 } from './advanced-modules-3-6';

// Merge all beginner course lessons
export const allBeginnerLessons: Record<string, LessonContent> = {
  ...beginnerLessons,
  ...module2Lessons,
  ...module3To6Lessons,
};

// Merge all advanced course lessons
export const allAdvancedLessons: Record<string, LessonContent> = {
  ...advancedLessons,
  ...advancedModules3To6,
};

// Combined content for easy lookup
const allLessons: Record<string, LessonContent> = {
  ...allBeginnerLessons,
  ...allAdvancedLessons,
};

export type { LessonContent, LessonSection, LessonQuiz } from './beginner-lessons';

// Helper function to get lesson content
export function getLessonContent(lessonId: string): LessonContent | null {
  return allLessons[lessonId] || null;
}

// Helper to check if content exists
export function hasLessonContent(lessonId: string): boolean {
  return lessonId in allLessons;
}
