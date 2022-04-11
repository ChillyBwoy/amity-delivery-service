import {
  ViewActionType,
  SelectEdgesAction,
  ResetEdgesAction,
  SetActiveTabAction,
  ViewState,
} from "./types";

export function selectEdgesAction(ids: Array<string>): SelectEdgesAction {
  return {
    type: ViewActionType.SelectEdges,
    ids,
  };
}

export function resetEdgesAction(): ResetEdgesAction {
  return {
    type: ViewActionType.ResetSelectedEdges,
  };
}

export function setActiveTabAction(tab: ViewState["tab"]): SetActiveTabAction {
  return {
    type: ViewActionType.SetActiveTab,
    tab,
  };
}
