import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Church } from "lucide-react";
import type { GeneralInfo } from "@shared/schema";

interface GeneralInfoProps {
  data: GeneralInfo;
  onChange: (data: GeneralInfo) => void;
  isComplete?: boolean;
}

export function GeneralInfoSection({ data, onChange, isComplete }: GeneralInfoProps) {
  const handleInputChange = (field: keyof GeneralInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  const handleSelectChange = (field: keyof GeneralInfo) => (value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <section id="general-info" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Church className="text-primary mr-3 h-6 w-6" />
                General Information
              </CardTitle>
              <CardDescription>
                Basic details about your branch church and reporting period
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
              <Label htmlFor="branchName">
                Branch Church Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="branchName"
                type="text"
                value={data.branchName || ''}
                onChange={handleInputChange('branchName')}
                className="mt-2"
                data-testid="input-branch-name"
              />
            </div>
            
            <div>
              <Label htmlFor="reportingArea">Reporting Area</Label>
              <Input
                id="reportingArea"
                type="text"
                value={data.reportingArea || ''}
                onChange={handleInputChange('reportingArea')}
                className="mt-2"
                data-testid="input-reporting-area"
              />
            </div>
            
            <div>
              <Label htmlFor="reportingQuarter">
                Reporting Quarter <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={data.reportingQuarter || ''} 
                onValueChange={handleSelectChange('reportingQuarter')}
              >
                <SelectTrigger className="mt-2" data-testid="select-reporting-quarter">
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                  <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                  <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                  <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dateSubmitted">Date Submitted</Label>
              <Input
                id="dateSubmitted"
                type="date"
                value={data.dateSubmitted || ''}
                onChange={handleInputChange('dateSubmitted')}
                className="mt-2"
                data-testid="input-date-submitted"
              />
            </div>
            
            <div>
              <Label htmlFor="leaderName">
                Reporting Leader Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="leaderName"
                type="text"
                value={data.leaderName || ''}
                onChange={handleInputChange('leaderName')}
                className="mt-2"
                data-testid="input-leader-name"
              />
            </div>
            
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="text"
                value={data.position || ''}
                onChange={handleInputChange('position')}
                className="mt-2"
                data-testid="input-position"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
