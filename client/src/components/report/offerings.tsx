import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";
import type { Offerings } from "@shared/schema";

interface OfferingsProps {
  data: Offerings;
  onChange: (data: Offerings) => void;
  isComplete?: boolean;
}

export function OfferingsSection({ data, onChange, isComplete }: OfferingsProps) {
  const handleInputChange = (field: keyof Offerings) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    onChange({ ...data, [field]: value });
  };

  const handleTransferredChange = (value: string) => {
    const transferred = value === 'true';
    onChange({ 
      ...data, 
      transferred,
      retained: transferred ? data.totalCollected - data.amountTransferred : data.totalCollected
    });
  };

  // Calculate retained amount automatically
  const calculatedRetained = data.transferred ? data.totalCollected - data.amountTransferred : data.totalCollected;

  return (
    <section id="offerings" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <DollarSign className="text-primary mr-3 h-6 w-6" />
                Offerings & Finance
              </CardTitle>
              <CardDescription>
                Financial reporting and stewardship information
              </CardDescription>
            </div>
            <Badge variant={isComplete ? "default" : "secondary"}>
              {isComplete ? "Complete" : "Incomplete"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="totalCollected">Total Offerings Collected</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                <Input
                  id="totalCollected"
                  type="number"
                  value={data.totalCollected || 0}
                  onChange={handleInputChange('totalCollected')}
                  className="pl-8"
                  min="0"
                  step="0.01"
                  data-testid="input-total-collected"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="transferred">Transferred to Main Church</Label>
              <Select 
                value={data.transferred?.toString() || 'false'} 
                onValueChange={handleTransferredChange}
              >
                <SelectTrigger className="mt-2" data-testid="select-transferred">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {data.transferred && (
              <div>
                <Label htmlFor="amountTransferred">Amount Transferred</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                  <Input
                    id="amountTransferred"
                    type="number"
                    value={data.amountTransferred || 0}
                    onChange={handleInputChange('amountTransferred')}
                    className="pl-8"
                    min="0"
                    step="0.01"
                    data-testid="input-amount-transferred"
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="retained">Retained for Local Needs</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                <Input
                  id="retained"
                  type="number"
                  value={calculatedRetained}
                  className="pl-8 bg-muted"
                  disabled
                  data-testid="input-retained"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="specialProjects">Special Projects/Needs</Label>
              <Textarea
                id="specialProjects"
                rows={3}
                value={data.specialProjects || ''}
                onChange={handleInputChange('specialProjects')}
                className="mt-2"
                data-testid="textarea-special-projects"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="nextQuarterNeeds">Summary of Needs Next Quarter</Label>
              <Textarea
                id="nextQuarterNeeds"
                rows={2}
                value={data.nextQuarterNeeds || ''}
                onChange={handleInputChange('nextQuarterNeeds')}
                className="mt-2"
                data-testid="textarea-next-quarter-needs"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
