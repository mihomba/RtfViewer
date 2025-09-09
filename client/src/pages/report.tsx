import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useReport, useAutoSave } from '@/hooks/use-report';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { GeneralInfoSection } from '@/components/report/general-info';
import { MembershipSection } from '@/components/report/membership';
import { YouthProgramsSection } from '@/components/report/youth-programs';
import { DivineServicesSection } from '@/components/report/divine-services';
import { OfferingsSection } from '@/components/report/offerings';
import { LeadersSection } from '@/components/report/leaders';
import { SummarySection } from '@/components/report/summary';
import { Church, Save, FileText, Send, Eye } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import type { Report, InsertReport } from '@shared/schema';

export default function ReportPage() {
  const [, params] = useRoute('/report/:id');
  const reportId = params?.id === 'new' ? undefined : params?.id;
  const { toast } = useToast();
  
  const { report, createReport, updateReport, isLoading, isCreating, isUpdating } = useReport(reportId);
  
  const [reportData, setReportData] = useState<Partial<Report>>({
    generalInfo: {
      branchName: '',
      reportingArea: '',
      reportingQuarter: '',
      dateSubmitted: '',
      leaderName: '',
      position: '',
    },
    membership: {
      activeMembers: 0,
      newMembers: 0,
      inactiveMembers: '',
      baptismCandidates: 0,
      newInterests: 0,
      relocations: '',
    },
    youthActivities: [],
    divineServices: [],
    offerings: {
      totalCollected: 0,
      transferred: false,
      amountTransferred: 0,
      retained: 0,
      specialProjects: '',
      nextQuarterNeeds: '',
    },
    leaders: {
      elder: '',
      elderContact: '',
      reportSubmittedBy: '',
      reporterContact: '',
      otherLeaders: [],
    },
    summary: {
      spiritualHealth: '',
      nextQuarterGoals: '',
      plannedActivities: '',
      comment: '',
    },
    status: 'draft' as const,
  });

  const [currentSection, setCurrentSection] = useState('general-info');
  
  // Auto-save functionality
  const { markUnsaved } = useAutoSave(reportId, reportData);

  useEffect(() => {
    if (report) {
      setReportData(report);
    }
  }, [report]);

  const updateSection = (section: keyof Partial<Report>, data: any) => {
    setReportData(prev => ({
      ...prev,
      [section]: data,
    }));
    markUnsaved();
  };

  const handleSave = async () => {
    try {
      if (reportId) {
        await updateReport({ id: reportId, data: reportData });
        toast({
          title: "Report Saved",
          description: "Your changes have been saved successfully.",
        });
      } else {
        const id = await createReport(reportData as InsertReport);
        window.history.replaceState(null, '', `/report/${id}`);
        toast({
          title: "Report Created",
          description: "Your new report has been created and saved.",
        });
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const submittedData = { ...reportData, status: 'submitted' as const };
      
      if (reportId) {
        await updateReport({ id: reportId, data: submittedData });
      } else {
        await createReport(submittedData as InsertReport);
      }
      
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality will be implemented.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar currentSection={currentSection} onSectionChange={setCurrentSection} />
        
        <div className="flex flex-col flex-1">
          {/* Header */}
          <header className="bg-card shadow-sm border-b sticky top-0 z-50">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center space-x-4">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-lg p-2">
                    <Church className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">TVSDAC Report System</h1>
                    <p className="text-sm text-muted-foreground">Branch Church Quarterly Report</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Auto-saved</span>
                </div>
                
                <ThemeToggle />
                
                <Button 
                  variant="secondary" 
                  onClick={handleExportPDF}
                  data-testid="button-export-pdf"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                
                <Button 
                  onClick={handleSave}
                  disabled={isUpdating || isCreating}
                  data-testid="button-save-report"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Report
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              <GeneralInfoSection
                data={reportData.generalInfo!}
                onChange={(data) => updateSection('generalInfo', data)}
                isComplete={!!(reportData.generalInfo?.branchName && reportData.generalInfo?.reportingQuarter && reportData.generalInfo?.leaderName)}
              />
              
              <MembershipSection
                data={reportData.membership!}
                onChange={(data) => updateSection('membership', data)}
                isComplete={true}
              />
              
              <YouthProgramsSection
                data={reportData.youthActivities!}
                onChange={(data) => updateSection('youthActivities', data)}
                isComplete={reportData.youthActivities!.length > 0}
              />
              
              <DivineServicesSection
                data={reportData.divineServices!}
                onChange={(data) => updateSection('divineServices', data)}
                isComplete={reportData.divineServices!.length > 0}
              />
              
              <OfferingsSection
                data={reportData.offerings!}
                onChange={(data) => updateSection('offerings', data)}
                isComplete={true}
              />
              
              <LeadersSection
                data={reportData.leaders!}
                onChange={(data) => updateSection('leaders', data)}
                isComplete={!!(reportData.leaders?.elder && reportData.leaders?.reportSubmittedBy)}
              />
              
              <SummarySection
                data={reportData.summary!}
                onChange={(data) => updateSection('summary', data)}
                isComplete={true}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleSave}
                  disabled={isUpdating || isCreating}
                  data-testid="button-save-draft"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={handleExportPDF}
                  data-testid="button-preview-report"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Report
                </Button>
                
                <Button 
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={isUpdating || isCreating}
                  data-testid="button-submit-report"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
