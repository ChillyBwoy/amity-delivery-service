import React from "react";
import styled from "styled-components";

import { ItemDeleteHandlerType } from "../../hooks/useItemDeleteHandler";
import { GraphEdge } from "../../types";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";

interface RouteListItemProps {
  route: GraphEdge;
  choices: Array<DropdownOption>;
  deleteStatus: boolean;
  onDelete: ItemDeleteHandlerType;
  onChange(route: GraphEdge): void;
}

const StyledRoot = styled.div`
  display: flex;
`;

export const RouteListItem: React.FC<RouteListItemProps> = ({
  choices,
  route,
  deleteStatus,
  onDelete,
  onChange,
}) => {
  const handleChangeFrom = React.useCallback(
    (value: string) => {
      onChange({ ...route, from: value });
    },
    [onChange, route]
  );

  const handleChangeTo = React.useCallback(
    (value: string) => {
      onChange({ ...route, to: value });
    },
    [onChange, route]
  );

  const handleChangeCost = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cost = parseInt(event.target.value, 10);
      if (cost <= 0) {
        return;
      }

      if (!Number.isNaN(cost)) {
        onChange({ ...route, cost });
      }
    },
    [onChange, route]
  );

  const handleDeleteAsk = React.useCallback(() => {
    onDelete(route.id, "ask");
  }, [onDelete, route]);

  const handleDeleteConfirm = React.useCallback(() => {
    onDelete(route.id, "confirm");
  }, [onDelete, route]);

  const handleDeleteCancel = React.useCallback(() => {
    onDelete(route.id, "cancel");
  }, [onDelete, route]);

  return (
    <StyledRoot>
      {deleteStatus ? (
        <>
          <button onClick={handleDeleteConfirm}>confirm</button>
          <button onClick={handleDeleteCancel}>cancel</button>
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

          <TextField
            type="number"
            value={route.cost}
            onChange={handleChangeCost}
          />

          <button onClick={handleDeleteAsk}>X</button>
        </>
      )}
    </StyledRoot>
  );
};
