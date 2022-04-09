import React from "react";

import { AppState } from "../types";
import { AppActionType, AppAction } from "./types";

interface AppStoreContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const initialState: AppState = {
  routes: [],
  verticies: [],
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
  switch (action.type) {
    case AppActionType.AddVertex: {
      const newVerticies = [...state.verticies, action.vertex];

      return {
        ...state,
        verticies: newVerticies,
      };
    }

    case AppActionType.RouteUpdate: {
      const index = state.routes.findIndex((r) => r.id === action.route.id);
      if (index === -1) {
        throw new Error("Route not found");
      }

      const newRoutes = [...state.routes];

      newRoutes[index] = action.route;

      return {
        ...state,
        routes: newRoutes,
      };
    }

    case AppActionType.RouteDelete: {
      const newRoutes = state.routes.filter((r) => r.id !== action.id);
      return {
        ...state,
        routes: newRoutes,
      };
    }

    default:
      return state;
  }
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
