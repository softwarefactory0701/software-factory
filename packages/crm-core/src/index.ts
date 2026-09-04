export type {
  Activity,
  ActivityType,
  Contact,
  Opportunity,
  OpportunityStatus,
  Pipeline,
  PipelineStage,
  Task,
  TaskStatus,
} from "./types";
export{countOpportunitiesByStage,getNextTask,getOpenOpportunities,getOpportunityActivities,getOpportunityTasks,groupOpportunitiesByStage,resolveOpportunityContact,sortPipelineStages}from"./crm";
export{buildOpportunityTimeline,createCrmDemoState,crmDemoReducer,opportunitiesByOwner,overdueTasks,pipelineValue,recentActivities,todayTasks,upcomingTasks}from"./demo-state";export type{CrmDemoAction,CrmDemoScenario,CrmDemoState,TimelineItem}from"./demo-state";
