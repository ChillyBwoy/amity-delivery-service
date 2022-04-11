import { ViewState, ViewAction, ViewActionType } from "./types";

export const reducer = (state: ViewState, action: ViewAction): ViewState => {
  switch (action.type) {
    case ViewActionType.SelectEdges: {
      return {
        ...state,
        edgeIds: action.ids,
      };
    }

    case ViewActionType.ResetSelectedEdges: {
      return {
        ...state,
        edgeIds: [],
      };
    }

    case ViewActionType.SetActiveTab: {
      return {
        ...state,
        tab: action.tab,
      };
    }

    default:
      return state;
  }
};
