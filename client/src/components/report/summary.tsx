import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ClipboardList } from "lucide-react";
import type { Summary } from "@shared/schema";

interface SummaryProps {
  data: Summary;
  onChange: (data: Summary) => void;
  isComplete?: boolean;
}

export function SummarySection({ data, onChange, isComplete }: SummaryProps) {
  const handleInputChange = (field: keyof Summary) => (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <section id="summary" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <ClipboardList className="text-primary mr-3 h-6 w-6" />
                Summary & Next Steps
              </CardTitle>
              <CardDescription>
                Overall assessment and planning for the future
              </CardDescription>
            </div>
            <Badge variant={isComplete ? "default" : "secondary"}>
              {isComplete ? "Complete" : "Incomplete"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="spiritualHealth">Summary of Spiritual Health</Label>
            <Textarea
              id="spiritualHealth"
              rows={4}
              value={data.spiritualHealth || ''}
              onChange={handleInputChange('spiritualHealth')}
              className="mt-2"
              data-testid="textarea-spiritual-health"
            />
          </div>
          
          <div>
            <Label htmlFor="nextQuarterGoals">Goals for Next Quarter</Label>
            <Textarea
              id="nextQuarterGoals"
              rows={4}
              value={data.nextQuarterGoals || ''}
              onChange={handleInputChange('nextQuarterGoals')}
              className="mt-2"
              data-testid="textarea-next-quarter-goals"
            />
          </div>
          
          <div>
            <Label htmlFor="plannedActivities">Planned Activities</Label>
            <Textarea
              id="plannedActivities"
              rows={4}
              value={data.plannedActivities || ''}
              onChange={handleInputChange('plannedActivities')}
              className="mt-2"
              data-testid="textarea-planned-activities"
            />
          </div>
          
          <div>
            <Label htmlFor="comment">Summary Comment (optional)</Label>
            <Textarea
              id="comment"
              rows={3}
              value={data.comment || ''}
              onChange={handleInputChange('comment')}
              className="mt-2"
              data-testid="textarea-comment"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
