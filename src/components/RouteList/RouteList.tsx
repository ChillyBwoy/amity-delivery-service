import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { routeDeleteAction } from "../../store/actions";
import { GraphEdge } from "../../types";

import { RouteListItem } from "./RouteListItem";

const StyledRoot = styled.div``;

export const RouteList: React.FC = () => {
  const { dispatch, state } = React.useContext(AppStoreContext);
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);

  const choices = React.useMemo(() => {
    return state.verticies.map((vertex) => {
      return {
        name: vertex,
        value: vertex,
      };
    });
  }, [state.verticies]);

  const handleRouteDelete = React.useCallback(
    (route: GraphEdge, status: "ask" | "confirm" | "cancel") => {
      switch (status) {
        case "ask": {
          setItemToDelete(route.id);
          break;
        }

        case "confirm": {
          dispatch(routeDeleteAction(route.id));
          setItemToDelete(null);
          break;
        }

        case "cancel": {
          setItemToDelete(null);
          break;
        }

        default:
          break;
      }
    },
    [dispatch]
  );

  return (
    <StyledRoot>
      {state.routes.map((route, index) => (
        <RouteListItem
          key={index}
          route={route}
          choices={choices}
          onDelete={handleRouteDelete}
          deleteStatus={itemToDelete === route.id}
        />
      ))}
    </StyledRoot>
  );
};
