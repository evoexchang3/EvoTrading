import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit2, Trash2, Shield } from "lucide-react";

interface License {
  authority: string;
  licenseNumber: string;
  status: 'active' | 'pending' | 'suspended';
  issueDate?: string;
  expiryDate?: string;
}

interface LicenseManagerProps {
  licenses: License[];
  onChange: (licenses: License[]) => void;
}

export function LicenseManager({ licenses, onChange }: LicenseManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<License>({
    authority: "",
    licenseNumber: "",
    status: "active",
    issueDate: "",
    expiryDate: ""
  });

  const handleAdd = () => {
    setEditingIndex(null);
    setFormData({
      authority: "",
      licenseNumber: "",
      status: "active",
      issueDate: "",
      expiryDate: ""
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(licenses[index]);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      const updated = licenses.filter((_, i) => i !== deleteIndex);
      onChange(updated);
    }
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleSave = () => {
    if (!formData.authority || !formData.licenseNumber) return;

    let updated: License[];
    if (editingIndex !== null) {
      updated = licenses.map((license, i) => i === editingIndex ? formData : license);
    } else {
      updated = [...licenses, formData];
    }

    onChange(updated);
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: License['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="text-sm font-medium">Regulatory Licenses</span>
        </div>
        <Button
          size="sm"
          onClick={handleAdd}
          data-testid="button-add-license"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add License
        </Button>
      </div>

      {licenses.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No licenses configured. Click "Add License" to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {licenses.map((license, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium truncate" data-testid={`text-license-authority-${index}`}>
                        {license.authority}
                      </h4>
                      <Badge className={getStatusColor(license.status)} data-testid={`badge-license-status-${index}`}>
                        {license.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1" data-testid={`text-license-number-${index}`}>
                      License #: {license.licenseNumber}
                    </p>
                    {(license.issueDate || license.expiryDate) && (
                      <p className="text-xs text-muted-foreground">
                        {license.issueDate && `Issued: ${license.issueDate}`}
                        {license.issueDate && license.expiryDate && " • "}
                        {license.expiryDate && `Expires: ${license.expiryDate}`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(index)}
                      data-testid={`button-edit-license-${index}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteClick(index)}
                      data-testid={`button-delete-license-${index}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit License' : 'Add License'}</DialogTitle>
            <DialogDescription>
              {editingIndex !== null 
                ? 'Update the license information below.'
                : 'Add a new regulatory license to display on your platform.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authority">Regulatory Authority *</Label>
              <Input
                id="authority"
                value={formData.authority}
                onChange={(e) => setFormData({...formData, authority: e.target.value})}
                placeholder="e.g., FCA, CySEC, ASIC"
                data-testid="input-license-authority"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                placeholder="e.g., 123456"
                data-testid="input-license-number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: License['status']) => setFormData({...formData, status: value})}
              >
                <SelectTrigger data-testid="select-license-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  data-testid="input-license-issue-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  data-testid="input-license-expiry-date"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-license">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.authority || !formData.licenseNumber}
              data-testid="button-save-license"
            >
              {editingIndex !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={(open) => !open && handleDeleteCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete License</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this license? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-license">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} data-testid="button-confirm-delete-license">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
