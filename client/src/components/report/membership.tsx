import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Membership } from "@shared/schema";

interface MembershipProps {
  data: Membership;
  onChange: (data: Membership) => void;
  isComplete?: boolean;
}

export function MembershipSection({ data, onChange, isComplete }: MembershipProps) {
  const handleInputChange = (field: keyof Membership) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    onChange({ ...data, [field]: value });
  };

  return (
    <section id="membership" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Users className="text-primary mr-3 h-6 w-6" />
                General Membership
              </CardTitle>
              <CardDescription>
                Membership statistics and changes this quarter
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
              <Label htmlFor="activeMembers">Total Active Sabbath School Members</Label>
              <Input
                id="activeMembers"
                type="number"
                value={data.activeMembers || 0}
                onChange={handleInputChange('activeMembers')}
                className="mt-2"
                min="0"
                data-testid="input-active-members"
              />
            </div>
            
            <div>
              <Label htmlFor="newMembers">New Members This Quarter</Label>
              <Input
                id="newMembers"
                type="number"
                value={data.newMembers || 0}
                onChange={handleInputChange('newMembers')}
                className="mt-2"
                min="0"
                data-testid="input-new-members"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="inactiveMembers">Inactive Members (reasons if known)</Label>
              <Textarea
                id="inactiveMembers"
                rows={3}
                value={data.inactiveMembers || ''}
                onChange={handleInputChange('inactiveMembers')}
                className="mt-2"
                data-testid="textarea-inactive-members"
              />
            </div>
            
            <div>
              <Label htmlFor="baptismCandidates">New Baptism Candidates</Label>
              <Input
                id="baptismCandidates"
                type="number"
                value={data.baptismCandidates || 0}
                onChange={handleInputChange('baptismCandidates')}
                className="mt-2"
                min="0"
                data-testid="input-baptism-candidates"
              />
            </div>
            
            <div>
              <Label htmlFor="newInterests">New Interests</Label>
              <Input
                id="newInterests"
                type="number"
                value={data.newInterests || 0}
                onChange={handleInputChange('newInterests')}
                className="mt-2"
                min="0"
                data-testid="input-new-interests"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="relocations">Member Relocations / Transfers</Label>
              <Textarea
                id="relocations"
                rows={3}
                value={data.relocations || ''}
                onChange={handleInputChange('relocations')}
                className="mt-2"
                data-testid="textarea-relocations"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
