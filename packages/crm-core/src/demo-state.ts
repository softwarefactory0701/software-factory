import type { Activity, Opportunity, OpportunityStatus, Task } from "./types";
export interface CrmDemoScenario {
  readonly opportunities: readonly Opportunity[];
  readonly tasks: readonly Task[];
  readonly activities: readonly Activity[];
}
export interface CrmDemoState {
  readonly opportunities: readonly Opportunity[];
  readonly tasks: readonly Task[];
  readonly activities: readonly Activity[];
  readonly selectedOpportunityId?: string;
}
export type CrmDemoAction =
  | { readonly type: "select"; readonly opportunityId: string }
  | { readonly type: "close-selection" }
  | {
      readonly type: "move";
      readonly opportunityId: string;
      readonly stageId: string;
    }
  | {
      readonly type: "set-outcome";
      readonly opportunityId: string;
      readonly status: OpportunityStatus;
      readonly stageId?: string;
    }
  | { readonly type: "toggle-task"; readonly taskId: string }
  | { readonly type: "add-activity"; readonly activity: Activity }
  | { readonly type: "reset"; readonly scenario: CrmDemoScenario };
export const createCrmDemoState = (
  scenario: CrmDemoScenario,
): CrmDemoState => ({
  opportunities: [...scenario.opportunities],
  tasks: [...scenario.tasks],
  activities: [...scenario.activities],
});
export function crmDemoReducer(
  state: CrmDemoState,
  action: CrmDemoAction,
): CrmDemoState {
  switch (action.type) {
    case "select":
      return { ...state, selectedOpportunityId: action.opportunityId };
    case "close-selection":
      return { ...state, selectedOpportunityId: undefined };
    case "move":
      return {
        ...state,
        opportunities: state.opportunities.map((o) =>
          o.id === action.opportunityId ? { ...o, stageId: action.stageId } : o,
        ),
      };
    case "set-outcome":
      return {
        ...state,
        opportunities: state.opportunities.map((o) =>
          o.id === action.opportunityId
            ? {
                ...o,
                status: action.status,
                ...(action.stageId ? { stageId: action.stageId } : {}),
              }
            : o,
        ),
      };
    case "toggle-task":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.taskId
            ? { ...t, status: t.status === "completed" ? "open" : "completed" }
            : t,
        ),
      };
    case "add-activity":
      return { ...state, activities: [action.activity, ...state.activities] };
    case "reset":
      return createCrmDemoState(action.scenario);
  }
}
export const opportunitiesByOwner = (
  items: readonly Opportunity[],
  ownerId: string,
) => items.filter((o) => o.ownerId === ownerId);
export const pipelineValue = (items: readonly Opportunity[]) =>
  items
    .filter((o) => o.status === "open")
    .reduce((sum, o) => sum + (o.value ?? 0), 0);
export const overdueTasks = (items: readonly Task[], now: string) =>
  items.filter((t) => t.status === "open" && t.dueAt < now);
export const todayTasks = (items: readonly Task[], date: string) =>
  items.filter((t) => t.status === "open" && t.dueAt.startsWith(date));
export const upcomingTasks = (items: readonly Task[], endOfDay: string) =>
  items.filter((t) => t.status === "open" && t.dueAt > endOfDay);
export const recentActivities = (items: readonly Activity[], limit = 10) =>
  [...items]
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
    .slice(0, limit);
export interface TimelineItem {
  readonly id: string;
  readonly occurredAt: string;
  readonly kind: "activity" | "task";
  readonly label: string;
  readonly type?: Activity["type"];
}
export const buildOpportunityTimeline = (
  opportunityId: string,
  activities: readonly Activity[],
  tasks: readonly Task[] = [],
): TimelineItem[] =>
  [
    ...activities
      .filter((a) => a.opportunityId === opportunityId)
      .map((a) => ({
        id: a.id,
        occurredAt: a.occurredAt,
        kind: "activity" as const,
        label: a.summary,
        type: a.type,
      })),
    ...tasks
      .filter(
        (t) => t.opportunityId === opportunityId && t.status === "completed",
      )
      .map((t) => ({
        id: t.id,
        occurredAt: t.dueAt,
        kind: "task" as const,
        label: t.title,
      })),
  ].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
