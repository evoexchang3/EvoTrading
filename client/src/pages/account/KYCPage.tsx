import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function KYCPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("");

  const uploadMutation = useMutation({
    mutationFn: async (data: { documentType: string; file: File }) => {
      const formData = new FormData();
      formData.append("documentType", data.documentType);
      formData.append("file", data.file);
      
      return await apiRequest("POST", "/api/kyc/upload", formData);
    },
    onSuccess: () => {
      toast({
        title: t("kyc.toast.uploaded.title"),
        description: t("kyc.toast.uploaded.description"),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/kyc/documents"] });
      setSelectedFile(null);
      setDocumentType("");
    },
    onError: (error: any) => {
      toast({
        title: t("kyc.toast.uploadFailed.title"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType) {
      toast({
        title: t("kyc.toast.missingInfo.title"),
        description: t("kyc.toast.missingInfo.description"),
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate({ documentType, file: selectedFile });
  };

  // Mock uploaded documents
  const documents = [
    {
      id: "1",
      documentType: "Passport",
      fileName: "passport.pdf",
      status: "approved",
      uploadedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "2",
      documentType: "Proof of Address",
      fileName: "utility_bill.pdf",
      status: "pending",
      uploadedAt: "2024-01-15T14:30:00Z",
    },
  ];

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">{t("kyc.title")}</h1>
        <p className="text-muted-foreground">
          {t("kyc.description")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("kyc.uploadDocument.title")}</CardTitle>
          <CardDescription>
            {t("kyc.uploadDocument.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("kyc.documentType.label")}</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger data-testid="select-document-type">
                <SelectValue placeholder={t("kyc.documentType.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">{t("kyc.documentType.passport")}</SelectItem>
                <SelectItem value="id_card">{t("kyc.documentType.idCard")}</SelectItem>
                <SelectItem value="drivers_license">{t("kyc.documentType.driversLicense")}</SelectItem>
                <SelectItem value="proof_address">{t("kyc.documentType.proofAddress")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("kyc.documentFile.label")}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                data-testid="input-document-file"
                disabled={uploadMutation.isPending}
              />
              <Button
                onClick={handleUpload}
                disabled={uploadMutation.isPending || !selectedFile || !documentType}
                data-testid="button-upload-document"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("kyc.uploading")}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {t("kyc.uploadButton")}
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("kyc.documentFile.formats")}
            </p>
          </div>

          {selectedFile && (
            <div className="rounded-md border p-3 flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-sm font-medium">{selectedFile.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("kyc.uploadedDocuments.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-md border p-3"
                data-testid={`document-${doc.id}`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{doc.documentType}</div>
                    <div className="text-xs text-muted-foreground">{doc.fileName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-muted-foreground">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </div>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            ))}
            {documents.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {t("kyc.noDocuments")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
