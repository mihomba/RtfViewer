import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Baby, Plus, Trash2 } from "lucide-react";
import { PhotoUpload } from "@/components/photo-upload";
import type { YouthActivity } from "@shared/schema";

interface YouthProgramsProps {
  data: YouthActivity[];
  onChange: (data: YouthActivity[]) => void;
  isComplete?: boolean;
}

export function YouthProgramsSection({ data, onChange, isComplete }: YouthProgramsProps) {
  const addActivity = () => {
    const newActivity: YouthActivity = {
      id: crypto.randomUUID(),
      date: '',
      participants: 0,
      activities: '',
      trainingNeeds: '',
      photos: [],
    };
    onChange([...data, newActivity]);
  };

  const removeActivity = (id: string) => {
    onChange(data.filter(activity => activity.id !== id));
  };

  const updateActivity = (id: string, updates: Partial<YouthActivity>) => {
    onChange(data.map(activity => 
      activity.id === id ? { ...activity, ...updates } : activity
    ));
  };

  return (
    <section id="youth" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Baby className="text-primary mr-3 h-6 w-6" />
                Youth and Children's Program
              </CardTitle>
              <CardDescription>
                Activities and programs for young members
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isComplete ? "default" : "secondary"}>
                {isComplete ? "Complete" : "Incomplete"}
              </Badge>
              <Button onClick={addActivity} size="sm" data-testid="button-add-youth-activity">
                <Plus className="h-4 w-4 mr-1" />
                Add Activity
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {data.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Baby className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Youth Activities Added Yet</h3>
              <p className="text-muted-foreground mb-4">Click "Add Activity" to document your youth programs</p>
              <Button onClick={addActivity} data-testid="button-add-first-activity">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Activity
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {data.map((activity, index) => (
                <div key={activity.id} className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">Activity #{index + 1}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeActivity(activity.id)}
                      className="text-destructive hover:text-destructive/80"
                      data-testid={`button-remove-activity-${index}`}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`date-${activity.id}`}>Date</Label>
                      <Input
                        id={`date-${activity.id}`}
                        type="date"
                        value={activity.date}
                        onChange={(e) => updateActivity(activity.id, { date: e.target.value })}
                        className="mt-2"
                        data-testid={`input-activity-date-${index}`}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`participants-${activity.id}`}>No. of Involved</Label>
                      <Input
                        id={`participants-${activity.id}`}
                        type="number"
                        value={activity.participants}
                        onChange={(e) => updateActivity(activity.id, { participants: Number(e.target.value) })}
                        className="mt-2"
                        min="0"
                        data-testid={`input-activity-participants-${index}`}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor={`activities-${activity.id}`}>Kids/Youth Activities Conducted</Label>
                    <Textarea
                      id={`activities-${activity.id}`}
                      rows={3}
                      value={activity.activities}
                      onChange={(e) => updateActivity(activity.id, { activities: e.target.value })}
                      className="mt-2"
                      data-testid={`textarea-activity-description-${index}`}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor={`training-${activity.id}`}>Training Needs - Details</Label>
                    <Textarea
                      id={`training-${activity.id}`}
                      rows={2}
                      value={activity.trainingNeeds || ''}
                      onChange={(e) => updateActivity(activity.id, { trainingNeeds: e.target.value })}
                      className="mt-2"
                      data-testid={`textarea-training-needs-${index}`}
                    />
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label>Activity Photos</Label>
                    <div className="mt-2">
                      <PhotoUpload
                        photos={activity.photos}
                        onPhotosChange={(photos) => updateActivity(activity.id, { photos })}
                        path={`youth-activities/${activity.id}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
