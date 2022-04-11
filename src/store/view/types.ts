export enum ViewActionType {
  SelectEdges = "@VIEWS/SELECT_EDGES",
  ResetSelectedEdges = "@VIEWS/RESET_SELECTED_EDGES",
}

export interface SelectEdgesAction {
  type: ViewActionType.SelectEdges;
  ids: Array<string>;
}

export interface ResetEdgesAction {
  type: ViewActionType.ResetSelectedEdges;
}

export type ViewAction = SelectEdgesAction | ResetEdgesAction;

export interface ViewState {
  edgeIds: Array<string>;
}
