import React from "react";

import { GraphAction, GraphState } from "./graph/types";
import { reducer as graphReducer } from "./graph";

type AppAction = GraphAction;

export interface AppState {
  graph: GraphState;
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
    graph: graphReducer(state.graph, action),
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
