import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

interface TeamManagerProps {
  team: TeamMember[];
  onChange: (team: TeamMember[]) => void;
}

export function TeamManager({ team, onChange }: TeamManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    role: "",
    bio: "",
    photo: ""
  });

  const handleAdd = () => {
    setEditingIndex(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      photo: ""
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(team[index]);
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
      const updated = team.filter((_, i) => i !== deleteIndex);
      onChange(updated);
    }
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.role) return;

    let updated: TeamMember[];
    if (editingIndex !== null) {
      updated = team.map((member, i) => i === editingIndex ? formData : member);
    } else {
      updated = [...team, formData];
    }

    onChange(updated);
    setIsDialogOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="text-sm font-medium">Team Members</span>
        </div>
        <Button
          size="sm"
          onClick={handleAdd}
          data-testid="button-add-team-member"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Member
        </Button>
      </div>

      {team.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No team members configured. Click "Add Member" to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {team.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={member.photo} alt={member.name} />
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate" data-testid={`text-team-name-${index}`}>
                      {member.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1" data-testid={`text-team-role-${index}`}>
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2" data-testid={`text-team-bio-${index}`}>
                        {member.bio}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(index)}
                      data-testid={`button-edit-team-${index}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteClick(index)}
                      data-testid={`button-delete-team-${index}`}
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
            <DialogTitle>{editingIndex !== null ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            <DialogDescription>
              {editingIndex !== null 
                ? 'Update the team member information below.'
                : 'Add a new team member to display on your platform.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., John Smith"
                data-testid="input-team-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role/Title *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g., Chief Executive Officer"
                data-testid="input-team-role"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Brief professional background..."
                rows={3}
                data-testid="textarea-team-bio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                value={formData.photo}
                onChange={(e) => setFormData({...formData, photo: e.target.value})}
                placeholder="https://example.com/photo.jpg"
                data-testid="input-team-photo"
              />
              <p className="text-xs text-muted-foreground">
                Optional: URL to profile photo (will show initials if not provided)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-team">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name || !formData.role}
              data-testid="button-save-team"
            >
              {editingIndex !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={(open) => !open && handleDeleteCancel()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team member? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete-team">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} data-testid="button-confirm-delete-team">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
