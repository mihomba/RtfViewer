import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bus, Plus, Trash2 } from "lucide-react";
import type { Leaders, Leader } from "@shared/schema";

interface LeadersProps {
  data: Leaders;
  onChange: (data: Leaders) => void;
  isComplete?: boolean;
}

export function LeadersSection({ data, onChange, isComplete }: LeadersProps) {
  const handleInputChange = (field: keyof Omit<Leaders, 'otherLeaders'>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  const addLeader = () => {
    const newLeader: Leader = {
      id: crypto.randomUUID(),
      name: '',
      position: '',
      contact: '',
    };
    onChange({ ...data, otherLeaders: [...data.otherLeaders, newLeader] });
  };

  const removeLeader = (id: string) => {
    onChange({
      ...data,
      otherLeaders: data.otherLeaders.filter(leader => leader.id !== id)
    });
  };

  const updateLeader = (id: string, updates: Partial<Leader>) => {
    onChange({
      ...data,
      otherLeaders: data.otherLeaders.map(leader => 
        leader.id === id ? { ...leader, ...updates } : leader
      )
    });
  };

  return (
    <section id="leaders" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Bus className="text-primary mr-3 h-6 w-6" />
                Branch/Cell Leaders
              </CardTitle>
              <CardDescription>
                Leadership team and contact information
              </CardDescription>
            </div>
            <Badge variant={isComplete ? "default" : "secondary"}>
              {isComplete ? "Complete" : "Incomplete"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Primary Leaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b pb-2">Elder Information</h3>
              <div>
                <Label htmlFor="elder">Elder</Label>
                <Input
                  id="elder"
                  type="text"
                  value={data.elder || ''}
                  onChange={handleInputChange('elder')}
                  className="mt-2"
                  data-testid="input-elder"
                />
              </div>
              <div>
                <Label htmlFor="elderContact">Contact</Label>
                <Input
                  id="elderContact"
                  type="text"
                  value={data.elderContact || ''}
                  onChange={handleInputChange('elderContact')}
                  className="mt-2"
                  data-testid="input-elder-contact"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b pb-2">Report Submission</h3>
              <div>
                <Label htmlFor="reportSubmittedBy">Report Submitted By</Label>
                <Input
                  id="reportSubmittedBy"
                  type="text"
                  value={data.reportSubmittedBy || ''}
                  onChange={handleInputChange('reportSubmittedBy')}
                  className="mt-2"
                  data-testid="input-report-submitted-by"
                />
              </div>
              <div>
                <Label htmlFor="reporterContact">Contact</Label>
                <Input
                  id="reporterContact"
                  type="text"
                  value={data.reporterContact || ''}
                  onChange={handleInputChange('reporterContact')}
                  className="mt-2"
                  data-testid="input-reporter-contact"
                />
              </div>
            </div>
          </div>
          
          {/* Other Leaders Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Other Leaders</h3>
              <Button onClick={addLeader} size="sm" data-testid="button-add-leader">
                <Plus className="h-4 w-4 mr-1" />
                Add Leader
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b">Position</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b">Contact</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-foreground border-b w-16">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.otherLeaders.map((leader, index) => (
                    <tr key={leader.id}>
                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          value={leader.name}
                          onChange={(e) => updateLeader(leader.id, { name: e.target.value })}
                          className="text-sm"
                          data-testid={`input-leader-name-${index}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          value={leader.position}
                          onChange={(e) => updateLeader(leader.id, { position: e.target.value })}
                          className="text-sm"
                          data-testid={`input-leader-position-${index}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="text"
                          value={leader.contact}
                          onChange={(e) => updateLeader(leader.id, { contact: e.target.value })}
                          className="text-sm"
                          data-testid={`input-leader-contact-${index}`}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLeader(leader.id)}
                          className="text-destructive hover:text-destructive/80 p-1"
                          data-testid={`button-remove-leader-${index}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {data.otherLeaders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        No additional leaders added yet. Click "Add Leader" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
