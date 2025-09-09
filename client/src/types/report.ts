export * from "@shared/schema";

export interface ReportSectionProps {
  data: any;
  onChange: (data: any) => void;
  isComplete?: boolean;
}

export interface SectionStatus {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  path: string;
}
