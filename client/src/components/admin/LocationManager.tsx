import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Edit2, Trash2, MapPin } from "lucide-react";

interface Location {
  name: string;
  type: 'headquarters' | 'branch' | 'representative';
  address: string;
  phone?: string;
  email?: string;
}

interface LocationManagerProps {
  locations: Location[];
  onChange: (locations: Location[]) => void;
}

export function LocationManager({ locations, onChange }: LocationManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Location>({
    name: "",
    type: "branch",
    address: "",
    phone: "",
    email: ""
  });

  const handleAdd = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      type: "branch",
      address: "",
      phone: "",
      email: ""
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(locations[index]);
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
      const updated = locations.filter((_, i) => i !== deleteIndex);
      onChange(updated);
    }
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.address) return;

    let updated: Location[];
    if (editingIndex !== null) {
      updated = locations.map((location, i) => i === editingIndex ? formData : location);
    } else {
      updated = [...locations, formData];
    }

    onChange(updated);
    setIsDialogOpen(false);
  };

  const getTypeColor = (type: Location['type']) => {
    switch (type) {
      case 'headquarters': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'branch': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'representative': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type: Location['type']) => {
    switch (type) {
      case 'headquarters': return 'HQ';
      case 'branch': return 'Branch';
      case 'representative': return 'Rep Office';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Office Locations</span>
        </div>
        <Button
          size="sm"
          onClick={handleAdd}
          data-testid="button-add-location"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Location
        </Button>
      </div>

      {locations.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No locations configured. Click "Add Location" to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {locations.map((location, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium truncate" data-testid={`text-location-name-${index}`}>
                        {location.name}
                      </h4>
                      <Badge className={getTypeColor(location.type)} data-testid={`badge-location-type-${index}`}>
                        {getTypeLabel(location.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1" data-testid={`text-location-address-${index}`}>
                      {location.address}
                    </p>
                    {(location.phone || location.email) && (
                      <p className="text-xs text-muted-foreground">
                        {location.phone && location.phone}
                        {location.phone && location.email && " • "}
                        {location.email && location.email}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(index)}
                      data-testid={`button-edit-location-${index}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteClick(index)}
                      data-testid={`button-delete-location-${index}`}
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
            <DialogTitle>{editingIndex !== null ? 'Edit Location' : 'Add Location'}</DialogTitle>
            <DialogDescription>
              {editingIndex !== null 
                ? 'Update the office location information below.'
                : 'Add a new office location to display on your platform.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Office Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., London Office, New York Branch"
                data-testid="input-location-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Location Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Location['type']) => setFormData({...formData, type: value})}
              >
                <SelectTrigger data-testid="select-location-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headquarters">Headquarters</SelectItem>
                  <SelectItem value="branch">Branch Office</SelectItem>
                  <SelectItem value="representative">Representative Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Full street address"
                data-testid="input-location-address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 555 0100"
                  data-testid="input-location-phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="office@example.com"
                  data-testid="input-location-email"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-location">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name || !formData.address}
              data-testid="button-save-location"
            >
              {editingIndex !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={(open) => !open && handleDeleteCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Location</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this location? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-location">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} data-testid="button-confirm-delete-location">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
