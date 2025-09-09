import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReports } from "@/hooks/use-report";
import { Church, Plus, FileText, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const { reports, isLoading } = useReports();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-primary text-primary-foreground rounded-lg p-3">
              <Church className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">TVSDAC Report System</h1>
              <p className="text-muted-foreground">Manage your branch church quarterly reports</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <Link href="/report/new">
              <Button className="flex items-center" data-testid="button-new-report">
                <Plus className="h-4 w-4 mr-2" />
                Create New Report
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Your Reports</h2>
            <Badge variant="secondary">
              {reports.length} report{reports.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {reports.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Reports Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by creating your first quarterly report
                </p>
                <Link href="/report/new">
                  <Button data-testid="button-create-first-report">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <Card key={report.id} className="hover-elevate card-gradient border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{report.generalInfo.branchName}</span>
                      <Badge variant={report.status === 'submitted' ? "default" : "secondary"}>
                        {report.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {report.generalInfo.reportingQuarter}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {report.generalInfo.leaderName}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Last updated: {new Date(report.updatedAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/report/${report.id}`}>
                          <Button size="sm" data-testid={`button-edit-report-${report.id}`}>
                            Edit Report
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-testid={`button-view-report-${report.id}`}
                        >
                          View PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
