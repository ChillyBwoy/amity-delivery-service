import React from "react";

import { GraphAction, GraphState } from "./graph/types";
import { ViewAction, ViewState } from "./view/types";
import { reducer as graphReducer } from "./graph";
import { reducer as viewReducer } from "./view";

type AppAction = GraphAction | ViewAction;

export interface AppState {
  graph: GraphState;
  view: ViewState;
}

interface AppStoreContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const initialState: AppState = {
  graph: {
    edges: [],
    vertices: [],
  },
  view: {
    edgeIds: [],
  },
};

export const AppStoreContext = React.createContext<AppStoreContextProps>({
  state: initialState,
  dispatch: () => {},
});

interface AppStoreContextProviderProps {
  state: AppState;
  children: React.ReactNode;
}

const reducer = (state: AppState, action: AppAction): AppState => {
  return {
    graph: graphReducer(state.graph, action as GraphAction),
    view: viewReducer(state.view, action as ViewAction),
  };
};

export const AppStoreContextProvider: React.FC<
  AppStoreContextProviderProps
> = ({ children, state }) => {
  const [currentState, dispatch] = React.useReducer(reducer, state);

  return (
    <AppStoreContext.Provider value={{ state: currentState, dispatch }}>
      {children}
    </AppStoreContext.Provider>
  );
};
