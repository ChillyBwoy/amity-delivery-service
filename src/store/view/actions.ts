import { ViewActionType, SelectEdgesAction, ResetEdgesAction } from "./types";

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
