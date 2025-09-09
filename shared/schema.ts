import { z } from "zod";

// Report types and schemas
export const generalInfoSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  reportingArea: z.string().optional(),
  reportingQuarter: z.string().min(1, "Reporting quarter is required"),
  dateSubmitted: z.string().optional(),
  leaderName: z.string().min(1, "Leader name is required"),
  position: z.string().optional(),
});

export const membershipSchema = z.object({
  activeMembers: z.number().min(0),
  newMembers: z.number().min(0),
  inactiveMembers: z.string().optional(),
  baptismCandidates: z.number().min(0),
  newInterests: z.number().min(0),
  relocations: z.string().optional(),
});

export const youthActivitySchema = z.object({
  id: z.string(),
  date: z.string(),
  participants: z.number().min(0),
  activities: z.string(),
  trainingNeeds: z.string().optional(),
  photos: z.array(z.string()),
});

export const divineServiceSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.string(),
  attendance: z.number().min(0),
  description: z.string(),
  photos: z.array(z.string()),
});

export const offeringsSchema = z.object({
  totalCollected: z.number().min(0),
  transferred: z.boolean(),
  amountTransferred: z.number().min(0),
  retained: z.number().min(0),
  specialProjects: z.string().optional(),
  nextQuarterNeeds: z.string().optional(),
});

export const leaderSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  contact: z.string().min(1, "Contact is required"),
});

export const leadersSchema = z.object({
  elder: z.string().min(1, "Elder name is required"),
  elderContact: z.string().min(1, "Elder contact is required"),
  reportSubmittedBy: z.string().min(1, "Report submitter is required"),
  reporterContact: z.string().min(1, "Reporter contact is required"),
  otherLeaders: z.array(leaderSchema),
});

export const summarySchema = z.object({
  spiritualHealth: z.string().optional(),
  nextQuarterGoals: z.string().optional(),
  plannedActivities: z.string().optional(),
  comment: z.string().optional(),
});

export const reportSchema = z.object({
  id: z.string(),
  generalInfo: generalInfoSchema,
  membership: membershipSchema,
  youthActivities: z.array(youthActivitySchema),
  divineServices: z.array(divineServiceSchema),
  offerings: offeringsSchema,
  leaders: leadersSchema,
  summary: summarySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.enum(['draft', 'submitted']),
});

// Type exports
export type GeneralInfo = z.infer<typeof generalInfoSchema>;
export type Membership = z.infer<typeof membershipSchema>;
export type YouthActivity = z.infer<typeof youthActivitySchema>;
export type DivineService = z.infer<typeof divineServiceSchema>;
export type Offerings = z.infer<typeof offeringsSchema>;
export type Leader = z.infer<typeof leaderSchema>;
export type Leaders = z.infer<typeof leadersSchema>;
export type Summary = z.infer<typeof summarySchema>;
export type Report = z.infer<typeof reportSchema>;

export type InsertReport = Omit<Report, 'id' | 'createdAt' | 'updatedAt'>;
