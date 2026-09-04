"use client";
import {
  createCrmDemoState,
  crmDemoReducer,
  type Activity,
  type CrmDemoScenario,
} from "@software-factory/crm-core";
import { useMemo, useReducer, useState } from "react";
export interface OwnerProfile {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly role: string;
}
export interface CrmTerminology {
  readonly contact: string;
  readonly contacts: string;
  readonly opportunity: string;
  readonly opportunities: string;
  readonly pipeline: string;
  readonly activity: string;
  readonly task: string;
  readonly owner: string;
}
export interface CrmVerticalConfig {
  readonly id: string;
  readonly terminology: CrmTerminology;
  readonly modules: readonly string[];
}
export interface OpportunityPresentation {
  readonly title: string;
  readonly subtitle?: string;
  readonly context?: string;
  readonly amount?: number;
  readonly ownerId?: string;
}
export type OpportunityPresentationAdapter = (
  opportunityId: string,
) => OpportunityPresentation | undefined;
export function useCrmDemo(scenario: CrmDemoScenario) {
  const [state, dispatch] = useReducer(
    crmDemoReducer,
    scenario,
    createCrmDemoState,
  );
  const [activeStageId, setActiveStageId] = useState("");
  const selectedOpportunity = useMemo(
    () => state.opportunities.find((o) => o.id === state.selectedOpportunityId),
    [state.opportunities, state.selectedOpportunityId],
  );
  return {
    state,
    selectedOpportunity,
    activeStageId,
    setActiveStageId,
    selectOpportunity: (id: string) =>
      dispatch({ type: "select", opportunityId: id }),
    closeSelection: () => dispatch({ type: "close-selection" }),
    moveOpportunity: (id: string, stageId: string) =>
      dispatch({ type: "move", opportunityId: id, stageId }),
    markWon: (id: string, stageId?: string) =>
      dispatch({
        type: "set-outcome",
        opportunityId: id,
        status: "won",
        stageId,
      }),
    markLost: (id: string) =>
      dispatch({ type: "set-outcome", opportunityId: id, status: "lost" }),
    toggleTask: (id: string) => dispatch({ type: "toggle-task", taskId: id }),
    addNote: (note: Activity) =>
      dispatch({ type: "add-activity", activity: note }),
    reset: () => dispatch({ type: "reset", scenario }),
  };
}
