import { Award, Download, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CourseCertificateProps {
  courseName: string;
  courseLevel: "Beginner" | "Advanced";
  userName: string;
  completionDate: string;
  totalLessons: number;
  totalDuration: string;
}

export function CourseCertificate({
  courseName,
  courseLevel,
  userName,
  completionDate,
  totalLessons,
  totalDuration
}: CourseCertificateProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    window.print();
    toast({
      title: "Certificate Ready",
      description: "Use your browser's print dialog to save as PDF or print the certificate.",
      variant: "default"
    });
  };

  return (
    <Card className="border-2 border-primary" data-testid="card-certificate">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Certificate of Completion</h2>
            <p className="text-muted-foreground">This certifies that</p>
          </div>

          {/* User Name */}
          <div className="border-b-2 border-muted pb-2">
            <p className="text-2xl font-bold text-primary">{userName}</p>
          </div>

          {/* Course Info */}
          <div>
            <p className="text-muted-foreground mb-2">has successfully completed the</p>
            <h3 className="text-2xl font-bold mb-1">{courseName}</h3>
            <p className="text-lg text-muted-foreground">{courseLevel} Level Trading Course</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y">
            <div>
              <CheckCircle2 className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Lessons</p>
              <p className="font-bold">{totalLessons}</p>
            </div>
            <div>
              <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-bold">{totalDuration}</p>
            </div>
            <div>
              <Award className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-bold">{completionDate}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              This certificate demonstrates comprehensive understanding of {courseLevel.toLowerCase()}-level trading concepts, 
              technical analysis, risk management, and practical trading strategies.
            </p>
            
            <Button 
              onClick={handleDownload} 
              className="w-full sm:w-auto"
              data-testid="button-download-certificate"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
