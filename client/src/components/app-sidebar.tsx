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
  { id: "general-info", title: "General Information", icon: Church },
  { id: "membership", title: "General Membership", icon: Users },
  { id: "youth", title: "Youth & Children's Program", icon: Baby },
  { id: "bible-studies", title: "Bible Studies", icon: Book },
  { id: "lay-activities", title: "Lay Activities", icon: HandHeart },
  { id: "divine-services", title: "Special Divine Services", icon: Pill },
  { id: "ministerial", title: "Ministerial Support", icon: Bus },
  { id: "visitation", title: "Visitation Programs", icon: Home },
  { id: "prayer-walks", title: "Prayer Walks", icon: Footprints },
  { id: "womens-ministry", title: "Women's Ministries", icon: Heart },
  { id: "offerings", title: "Offerings & Finance", icon: DollarSign },
  { id: "facilities", title: "Facilities & Logistics", icon: Building },
  { id: "challenges", title: "Challenges & Recommendations", icon: AlertTriangle },
  { id: "acknowledgments", title: "Acknowledgments", icon: Heart },
  { id: "summary", title: "Summary & Next Steps", icon: ClipboardList },
];

interface AppSidebarProps {
  currentSection?: string;
  onSectionChange?: (sectionId: string) => void;
  reportData?: any;
}

export function AppSidebar({ currentSection = "general-info", onSectionChange, reportData }: AppSidebarProps) {
  // Function to check if a section is completed based on actual data
  const isSectionComplete = (sectionId: string): boolean => {
    if (!reportData) return false;
    
    switch (sectionId) {
      case "general-info":
        return !!(reportData.generalInfo?.branchName && 
                 reportData.generalInfo?.reportingQuarter && 
                 reportData.generalInfo?.leaderName);
      
      case "membership":
        return !!(reportData.membership?.activeMembers !== undefined && 
                 reportData.membership?.activeMembers > 0);
      
      case "youth":
        return !!(reportData.youthActivities?.length > 0);
      
      case "bible-studies":
        return !!(reportData.bibleStudies?.length > 0);
      
      case "lay-activities":
        return !!(reportData.layActivities?.length > 0);
      
      case "divine-services":
        return !!(reportData.divineServices?.length > 0);
      
      case "ministerial":
        return !!(reportData.leaders?.elder && reportData.leaders?.reportSubmittedBy);
      
      case "visitation":
        return !!(reportData.visitation?.length > 0);
      
      case "prayer-walks":
        return !!(reportData.prayerWalks?.length > 0);
      
      case "womens-ministry":
        return !!(reportData.womensMinistry?.length > 0);
      
      case "offerings":
        return !!(reportData.offerings?.totalCollected !== undefined && 
                 reportData.offerings?.totalCollected >= 0);
      
      case "facilities":
        return !!(reportData.facilities?.length > 0);
      
      case "challenges":
        return !!(reportData.challenges?.challenges || reportData.challenges?.recommendations);
      
      case "acknowledgments":
        return !!(reportData.acknowledgments?.acknowledgments);
      
      case "summary":
        return !!(reportData.summary?.spiritualHealth || 
                 reportData.summary?.nextQuarterGoals || 
                 reportData.summary?.plannedActivities);
      
      default:
        return false;
    }
  };

  // Calculate completion based on actual data
  const completedSections = sections.filter(s => isSectionComplete(s.id)).length;
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
                const isComplete = isSectionComplete(section.id);
                
                return (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton 
                      className={`flex items-center justify-between p-3 rounded-md transition-colors w-full ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : isComplete 
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
                      {isComplete ? (
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
