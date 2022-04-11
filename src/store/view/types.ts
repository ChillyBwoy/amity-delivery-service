export enum ViewActionType {
  SelectEdges = "@VIEWS/SELECT_EDGES",
  ResetSelectedEdges = "@VIEWS/RESET_SELECTED_EDGES",
  SetActiveTab = "@VIEWS/SET_ACTIVE_TAB",
}

export interface SelectEdgesAction {
  type: ViewActionType.SelectEdges;
  ids: Array<string>;
}

export interface ResetEdgesAction {
  type: ViewActionType.ResetSelectedEdges;
}

export interface SetActiveTabAction {
  type: ViewActionType.SetActiveTab;
  tab: ViewState["tab"];
}

export type ViewAction =
  | SelectEdgesAction
  | ResetEdgesAction
  | SetActiveTabAction;

export interface ViewState {
  edgeIds: Array<string>;
  tab: "vertices" | "edges" | "route_planner" | "route_search";
}
