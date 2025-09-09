import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, Plus, Trash2, PlusCircle } from "lucide-react";
import { PhotoUpload } from "@/components/photo-upload";
import type { DivineService } from "@shared/schema";

interface DivineServicesProps {
  data: DivineService[];
  onChange: (data: DivineService[]) => void;
  isComplete?: boolean;
}

export function DivineServicesSection({ data, onChange, isComplete }: DivineServicesProps) {
  const addService = () => {
    const newService: DivineService = {
      id: crypto.randomUUID(),
      date: '',
      type: '',
      attendance: 0,
      description: '',
      photos: [],
    };
    onChange([...data, newService]);
  };

  const removeService = (id: string) => {
    onChange(data.filter(service => service.id !== id));
  };

  const updateService = (id: string, updates: Partial<DivineService>) => {
    onChange(data.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  return (
    <section id="divine-services" className="fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Pill className="text-primary mr-3 h-6 w-6" />
                Special Divine Services/Meetings/Highlights
              </CardTitle>
              <CardDescription>
                Special worship services and significant church events
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isComplete ? "default" : "secondary"}>
                {isComplete ? "Complete" : "Incomplete"}
              </Badge>
              <Button onClick={addService} size="sm" data-testid="button-add-divine-service">
                <Plus className="h-4 w-4 mr-1" />
                Add Service
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {data.length === 0 ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <PlusCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Divine Services Added Yet</h3>
              <p className="text-muted-foreground mb-4">Click "Add Service" to document your special divine services and church highlights</p>
              <Button onClick={addService} data-testid="button-add-first-service">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Service
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {data.map((service, index) => (
                <div key={service.id} className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">Service #{index + 1}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeService(service.id)}
                      className="text-destructive hover:text-destructive/80"
                      data-testid={`button-remove-service-${index}`}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`service-date-${service.id}`}>Date</Label>
                      <Input
                        id={`service-date-${service.id}`}
                        type="date"
                        value={service.date}
                        onChange={(e) => updateService(service.id, { date: e.target.value })}
                        className="mt-2"
                        data-testid={`input-service-date-${index}`}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`service-type-${service.id}`}>Service Type</Label>
                      <Input
                        id={`service-type-${service.id}`}
                        type="text"
                        placeholder="e.g., Baptism, Communion, Revival"
                        value={service.type}
                        onChange={(e) => updateService(service.id, { type: e.target.value })}
                        className="mt-2"
                        data-testid={`input-service-type-${index}`}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`service-attendance-${service.id}`}>Attendance</Label>
                      <Input
                        id={`service-attendance-${service.id}`}
                        type="number"
                        value={service.attendance}
                        onChange={(e) => updateService(service.id, { attendance: Number(e.target.value) })}
                        className="mt-2"
                        min="0"
                        data-testid={`input-service-attendance-${index}`}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor={`service-description-${service.id}`}>Service Description & Highlights</Label>
                    <Textarea
                      id={`service-description-${service.id}`}
                      rows={3}
                      value={service.description}
                      onChange={(e) => updateService(service.id, { description: e.target.value })}
                      className="mt-2"
                      data-testid={`textarea-service-description-${index}`}
                    />
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label>Service Photos</Label>
                    <div className="mt-2">
                      <PhotoUpload
                        photos={service.photos}
                        onPhotosChange={(photos) => updateService(service.id, { photos })}
                        path={`divine-services/${service.id}`}
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
