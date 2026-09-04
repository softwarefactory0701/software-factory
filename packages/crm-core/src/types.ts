export type OpportunityStatus = "open" | "won" | "lost";
export type ActivityType = "note" | "call" | "message" | "meeting" | "email";
export type TaskStatus = "open" | "completed" | "cancelled";

export interface Contact {
  readonly id: string;
  readonly name: string;
  readonly phone?: string;
  readonly email?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface PipelineStage {
  readonly id: string;
  readonly label: string;
  readonly order: number;
}

export interface Pipeline {
  readonly id: string;
  readonly name: string;
  readonly stages: readonly PipelineStage[];
}

export interface Opportunity {
  readonly id: string;
  readonly contactId: string;
  readonly pipelineId: string;
  readonly stageId: string;
  readonly title: string;
  readonly value?: number;
  readonly ownerId?: string;
  readonly status: OpportunityStatus;
  readonly createdAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface Activity {
  readonly id: string;
  readonly contactId?: string;
  readonly opportunityId?: string;
  readonly type: ActivityType;
  readonly occurredAt: string;
  readonly summary: string;
  readonly ownerId?: string;
}

export interface Task {
  readonly id: string;
  readonly opportunityId?: string;
  readonly contactId?: string;
  readonly title: string;
  readonly dueAt: string;
  readonly ownerId: string;
  readonly status: TaskStatus;
}
