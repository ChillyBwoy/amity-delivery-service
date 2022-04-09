import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { routeUpdateAction } from "../../store/actions";
import { GraphEdge } from "../../types";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";

interface RouteListItemProps {
  route: GraphEdge;
  choices: Array<DropdownOption>;
  deleteStatus: boolean;
  onDelete(route: GraphEdge, status: "ask" | "confirm" | "cancel"): void;
}

const StyledRoot = styled.div`
  display: flex;
`;

export const RouteListItem: React.FC<RouteListItemProps> = ({
  choices,
  route,
  deleteStatus,
  onDelete,
}) => {
  const { dispatch } = React.useContext(AppStoreContext);

  const handleChangeFrom = React.useCallback(
    (value: string) => {
      dispatch(
        routeUpdateAction({
          ...route,
          from: value,
        })
      );
    },
    [dispatch, route]
  );

  const handleChangeTo = React.useCallback(
    (value: string) => {
      dispatch(
        routeUpdateAction({
          ...route,
          to: value,
        })
      );
    },
    [dispatch, route]
  );

  const handleRouteDeleteAsk = React.useCallback(() => {
    onDelete(route, "ask");
  }, [onDelete, route]);

  const handleRouteDeleteConfirm = React.useCallback(() => {
    onDelete(route, "confirm");
  }, [onDelete, route]);

  const handleRouteDeleteCancel = React.useCallback(() => {
    onDelete(route, "cancel");
  }, [onDelete, route]);

  return (
    <StyledRoot>
      {deleteStatus ? (
        <>
          <button onClick={handleRouteDeleteConfirm}>confirm</button>
          <button onClick={handleRouteDeleteCancel}>cancel</button>
        </>
      ) : (
        <>
          <Dropdown
            choices={choices}
            value={route.from}
            onChange={handleChangeFrom}
          />
          <Dropdown
            choices={choices}
            value={route.to}
            onChange={handleChangeTo}
          />

          <button onClick={handleRouteDeleteAsk}>X</button>
        </>
      )}
    </StyledRoot>
  );
};
