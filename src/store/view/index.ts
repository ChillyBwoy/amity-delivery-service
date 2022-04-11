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

    default:
      return state;
  }
};
