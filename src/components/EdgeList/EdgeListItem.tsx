import React from "react";
import styled from "styled-components";

import { ItemDeleteHandlerType } from "../../hooks/useItemDeleteHandler";
import { Edge } from "../../types";
import { Button } from "../Button/Button";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { TextField } from "../TextField/TextField";
import { validateEdge } from "./EdgeList.tools";

interface EdgeListItemProps {
  edge: Edge;
  edges: Array<Edge>;
  choices: Array<DropdownOption>;
  deleteStatus: boolean;
  onDelete: ItemDeleteHandlerType;
  onChange(route: Edge): void;
}

const StyledRoot = styled.div`
  padding: 4px 0;
`;

const StyledForm = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 1fr;
  grid-gap: 8px;
`;

const StyledDelete = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  flex: 1;
`;

const StyledError = styled.div`
  padding: 4px 0;
  color: #fa4d30;
`;

export const EdgeListItem: React.FC<EdgeListItemProps> = ({
  choices,
  edge,
  edges,
  deleteStatus,
  onDelete,
  onChange,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleChangeFrom = React.useCallback(
    (value: string) => {
      try {
        const newEdge = validateEdge(edges, edge.id, value, edge.to, edge.cost);
        setError(null);
        onChange(newEdge);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    },
    [edges, edge, onChange]
  );

  const handleChangeTo = React.useCallback(
    (value: string) => {
      try {
        const newEdge = validateEdge(
          edges,
          edge.id,
          edge.from,
          value,
          edge.cost
        );
        setError(null);
        onChange(newEdge);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    },
    [edges, edge, onChange]
  );

  const handleChangeCost = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const cost = parseInt(event.target.value, 10);
      if (Number.isNaN(cost)) {
        return;
      }

      onChange({ ...edge, cost });
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
      <StyledForm>
        <Dropdown
          choices={choices}
          value={edge.from}
          onChange={handleChangeFrom}
        />
        <Dropdown choices={choices} value={edge.to} onChange={handleChangeTo} />

        <TextField
          type="number"
          value={edge.cost}
          onChange={handleChangeCost}
        />
        {deleteStatus ? (
          <StyledDelete>
            <StyledButton onClick={handleDeleteConfirm}>✓</StyledButton>
            <StyledButton onClick={handleDeleteCancel}>&times;</StyledButton>
          </StyledDelete>
        ) : (
          <StyledButton onClick={handleDeleteAsk}>&times;</StyledButton>
        )}
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </StyledRoot>
  );
};
