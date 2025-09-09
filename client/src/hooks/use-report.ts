import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsService } from '@/lib/firestore';
import type { Report, InsertReport } from '@shared/schema';
import { useToast } from './use-toast';

export function useReport(reportId?: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch report
  const { data: report, isLoading, error } = useQuery({
    queryKey: ['reports', reportId],
    queryFn: () => reportId ? reportsService.getReport(reportId) : null,
    enabled: !!reportId,
  });

  // Create report mutation
  const createMutation = useMutation({
    mutationFn: (data: InsertReport) => reportsService.createReport(data),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Report Created",
        description: "Your report has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create report. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update report mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Report> }) => 
      reportsService.updateReport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports', reportId] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update report. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    report,
    isLoading,
    error,
    createReport: createMutation.mutate,
    updateReport: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

export function useReports() {
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: reportsService.getReports,
  });

  return { reports, isLoading };
}

// Auto-save hook
export function useAutoSave(reportId: string | undefined, data: any, delay = 2000) {
  const { updateReport } = useReport(reportId);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (!reportId || !hasUnsavedChanges) return;

    const timeoutId = setTimeout(() => {
      updateReport({ id: reportId, data });
      setHasUnsavedChanges(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, reportId, delay, hasUnsavedChanges, updateReport]);

  const markUnsaved = () => setHasUnsavedChanges(true);

  return { hasUnsavedChanges, markUnsaved };
}
