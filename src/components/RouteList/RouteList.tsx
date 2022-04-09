import React from "react";
import styled from "styled-components";

import { useItemDeleteHandler } from "../../hooks/useItemDeleteHandler";
import { useVerticiesChoices } from "../../hooks/useVerticiesChoices";
import { AppStoreContext } from "../../store";
import { routeDeleteAction, routeUpdateAction } from "../../store/actions";
import { GraphEdge } from "../../types";
import { RouteListForm } from "./RouteListForm";

import { RouteListItem } from "./RouteListItem";

const StyledRoot = styled.div``;

export const RouteList: React.FC = () => {
  const { dispatch, state } = React.useContext(AppStoreContext);

  const choices = useVerticiesChoices(state.verticies);

  const handleRouteChange = React.useCallback(
    (route: GraphEdge) => {
      dispatch(routeUpdateAction(route));
    },
    [dispatch]
  );

  const { handleDelete, itemToDelete } = useItemDeleteHandler((id) => {
    dispatch(routeDeleteAction(id));
  });

  return (
    <StyledRoot>
      {state.routes.map((route, index) => (
        <RouteListItem
          key={index}
          route={route}
          choices={choices}
          onDelete={handleDelete}
          onChange={handleRouteChange}
          deleteStatus={itemToDelete === route.id}
        />
      ))}
      <hr />
      <RouteListForm choices={choices} />
    </StyledRoot>
  );
};
