import type{Activity,Contact,Opportunity,PipelineStage,Task}from"./types";
export const sortPipelineStages=(stages:readonly PipelineStage[])=>[...stages].sort((a,b)=>a.order-b.order);
export function groupOpportunitiesByStage(opportunities:readonly Opportunity[],stages:readonly PipelineStage[]){const groups:Record<string,Opportunity[]>={};for(const stage of sortPipelineStages(stages))groups[stage.id]=[];for(const opportunity of opportunities)(groups[opportunity.stageId]??=[]).push(opportunity);return groups;}
export const resolveOpportunityContact=(opportunity:Opportunity,contacts:readonly Contact[])=>contacts.find(contact=>contact.id===opportunity.contactId);
export const getOpenOpportunities=(opportunities:readonly Opportunity[])=>opportunities.filter(opportunity=>opportunity.status==="open");
export const getOpportunityTasks=(opportunityId:string,tasks:readonly Task[])=>tasks.filter(task=>task.opportunityId===opportunityId);
export const getOpportunityActivities=(opportunityId:string,activities:readonly Activity[])=>activities.filter(activity=>activity.opportunityId===opportunityId).sort((a,b)=>b.occurredAt.localeCompare(a.occurredAt));
export function getNextTask(tasks:readonly Task[],references:{readonly contactId?:string;readonly opportunityId?:string}){return tasks.filter(task=>task.status==="open"&&(references.opportunityId?task.opportunityId===references.opportunityId:references.contactId?task.contactId===references.contactId:true)).sort((a,b)=>a.dueAt.localeCompare(b.dueAt))[0];}
export function countOpportunitiesByStage(opportunities:readonly Opportunity[]){return opportunities.reduce<Record<string,number>>((counts,opportunity)=>{counts[opportunity.stageId]=(counts[opportunity.stageId]??0)+1;return counts;},{});}
