/**
 * LessonViewer Component
 * Renders lesson content dynamically from course content files
 */

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLessonContent } from "@/content/courses";
import type { LessonQuiz } from "@/content/courses";

interface LessonViewerProps {
  lessonId: string;
  quizAnswers: Record<number, number>;
  quizSubmitted: boolean;
  onAnswerChange: (questionIndex: number, answerIndex: number) => void;
  onQuizSubmit: () => void;
  onQuizReset: () => void;
}

export function LessonViewer({
  lessonId,
  quizAnswers,
  quizSubmitted,
  onAnswerChange,
  onQuizSubmit,
  onQuizReset,
}: LessonViewerProps) {
  const content = getLessonContent(lessonId);

  if (!content) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Lesson content coming soon...</p>
      </div>
    );
  }

  const renderQuizQuestion = (quiz: LessonQuiz, index: number) => {
    const selectedAnswer = quizAnswers[index];
    const isCorrect = selectedAnswer === quiz.correctAnswer;

    return (
      <div key={index} className="p-4 border rounded-lg">
        <p className="font-medium mb-3">{quiz.question}</p>
        <div className="space-y-2">
          {quiz.options.map((option, optionIndex) => {
            const isThisCorrect = optionIndex === quiz.correctAnswer;
            const isSelected = selectedAnswer === optionIndex;
            
            return (
              <label
                key={optionIndex}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  !quizSubmitted ? 'hover-elevate' : ''
                } ${
                  quizSubmitted && isThisCorrect ? 'bg-green-500/10 border border-green-500/20' :
                  quizSubmitted && isSelected && !isThisCorrect ? 'bg-red-500/10 border border-red-500/20' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optionIndex}
                  className="w-4 h-4"
                  checked={isSelected}
                  onChange={() => !quizSubmitted && onAnswerChange(index, optionIndex)}
                  disabled={quizSubmitted}
                  data-testid={`quiz-${index}-option-${optionIndex}`}
                />
                <span className="text-sm">
                  {option}
                  {quizSubmitted && isThisCorrect && ' ✓'}
                  {quizSubmitted && isSelected && !isThisCorrect && ' ✗'}
                </span>
              </label>
            );
          })}
        </div>
        {quizSubmitted && !isCorrect && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            Correct answer: {quiz.options[quiz.correctAnswer]}
          </p>
        )}
        {quizSubmitted && (
          <p className="text-sm text-muted-foreground mt-2 italic">
            {quiz.explanation}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Lesson Content */}
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {content.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
            {Array.isArray(section.content) ? (
              section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-muted-foreground mb-3">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground mb-3">{section.content}</p>
            )}
          </div>
        ))}

        {/* Key Points */}
        {content.keyPoints && content.keyPoints.length > 0 && (
          <div className="bg-muted p-4 rounded-lg my-4">
            <h4 className="font-semibold mb-2">Key Takeaways</h4>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Examples */}
        {content.examples && content.examples.length > 0 && (
          <>
            {content.examples.map((example, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg my-4">
                <h4 className="font-semibold mb-2">{example.title}</h4>
                <p className="text-sm text-muted-foreground">{example.content}</p>
              </div>
            ))}
          </>
        )}

        {/* Risk Warning */}
        {content.riskWarning && (
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded my-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Risk Warning
            </h4>
            <p className="text-sm text-muted-foreground">{content.riskWarning}</p>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">Summary</h3>
          <p className="text-muted-foreground">{content.summary}</p>
        </div>
      </div>

      {/* Quiz Section */}
      {content.quiz && content.quiz.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4">Knowledge Check</h3>
          <div className="space-y-4">
            {content.quiz.map((quiz, index) => renderQuizQuestion(quiz, index))}
          </div>

          <div className="flex gap-3 mt-4">
            {!quizSubmitted ? (
              <Button onClick={onQuizSubmit} data-testid="button-submit-quiz">
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={onQuizReset} variant="outline" data-testid="button-retry-quiz">
                Retry Quiz
              </Button>
            )}
          </div>

          {quizSubmitted && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold">
                Score: {Object.values(quizAnswers).filter((answer, index) => answer === content.quiz[index].correctAnswer).length} / {content.quiz.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
