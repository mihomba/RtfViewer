import { Church, Users, Baby, Book, HandHeart, Pill, Bus, Home, Footprints, Heart, DollarSign, Building, AlertTriangle, ClipboardList, CheckCircle, AlertCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sections = [
  { id: "general-info", title: "General Information", icon: Church, completed: true },
  { id: "membership", title: "General Membership", icon: Users, completed: true },
  { id: "youth", title: "Youth & Children's Program", icon: Baby, completed: true },
  { id: "bible-studies", title: "Bible Studies", icon: Book, completed: true },
  { id: "lay-activities", title: "Lay Activities", icon: HandHeart, completed: true },
  { id: "divine-services", title: "Special Divine Services", icon: Pill, completed: true },
  { id: "ministerial", title: "Ministerial Support", icon: Bus, completed: true },
  { id: "visitation", title: "Visitation Programs", icon: Home, completed: true },
  { id: "prayer-walks", title: "Prayer Walks", icon: Footprints, completed: true },
  { id: "womens-ministry", title: "Women's Ministries", icon: Heart, completed: true },
  { id: "offerings", title: "Offerings & Finance", icon: DollarSign, completed: true },
  { id: "facilities", title: "Facilities & Logistics", icon: Building, completed: true },
  { id: "challenges", title: "Challenges & Recommendations", icon: AlertTriangle, completed: true },
  { id: "acknowledgments", title: "Acknowledgments", icon: Heart, completed: true },
  { id: "summary", title: "Summary & Next Steps", icon: ClipboardList, completed: true },
];

interface AppSidebarProps {
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export function AppSidebar({ currentSection = "general-info", onSectionChange }: AppSidebarProps) {
  const completedSections = sections.filter(s => s.completed).length;
  const totalSections = sections.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onSectionChange?.(sectionId);
  };

  return (
    <Sidebar className="w-80">
      <SidebarContent className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">Report Progress</h2>
          <div className="bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">
            {completedSections} of {totalSections} sections completed
          </p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sections.map((section) => {
                const isActive = currentSection === section.id;
                const IconComponent = section.icon;
                
                return (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton 
                      className={`flex items-center justify-between p-3 rounded-md transition-colors w-full ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : section.completed 
                            ? 'hover:bg-muted section-complete' 
                            : 'hover:bg-muted section-incomplete'
                      }`}
                      onClick={() => scrollToSection(section.id)}
                      data-testid={`nav-${section.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium text-sm">{section.title}</span>
                      </div>
                      {section.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
