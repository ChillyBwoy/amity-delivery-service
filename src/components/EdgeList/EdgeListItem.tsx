import React from "react";
import styled from "styled-components";

import { ItemDeleteHandlerType } from "../../hooks/useItemDeleteHandler";
import { Edge } from "../../types";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";

interface EdgeListItemProps {
  edge: Edge;
  choices: Array<DropdownOption>;
  deleteStatus: boolean;
  onDelete: ItemDeleteHandlerType;
  onChange(route: Edge): void;
}

const StyledRoot = styled.div`
  display: flex;
`;

export const EdgeListItem: React.FC<EdgeListItemProps> = ({
  choices,
  edge,
  deleteStatus,
  onDelete,
  onChange,
}) => {
  const handleChangeFrom = React.useCallback(
    (value: string) => {
      onChange({ ...edge, from: value });
    },
    [onChange, edge]
  );

  const handleChangeTo = React.useCallback(
    (value: string) => {
      onChange({ ...edge, to: value });
    },
    [onChange, edge]
  );

  const handleChangeCost = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cost = parseInt(event.target.value, 10);
      if (cost <= 0) {
        return;
      }

      if (!Number.isNaN(cost)) {
        onChange({ ...edge, cost });
      }
    },
    [onChange, edge]
  );

  const handleDeleteAsk = React.useCallback(() => {
    onDelete(edge.id, "ask");
  }, [onDelete, edge]);

  const handleDeleteConfirm = React.useCallback(() => {
    onDelete(edge.id, "confirm");
  }, [onDelete, edge]);

  const handleDeleteCancel = React.useCallback(() => {
    onDelete(edge.id, "cancel");
  }, [onDelete, edge]);

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
            value={edge.from}
            onChange={handleChangeFrom}
          />
          <Dropdown
            choices={choices}
            value={edge.to}
            onChange={handleChangeTo}
          />

          <TextField
            type="number"
            value={edge.cost}
            onChange={handleChangeCost}
          />

          <button onClick={handleDeleteAsk}>X</button>
        </>
      )}
    </StyledRoot>
  );
};
