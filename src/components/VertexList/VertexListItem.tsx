import React from "react";
import styled from "styled-components";

import { ItemDeleteHandlerType } from "../../hooks/useItemDeleteHandler";
import { Vertex } from "../../types";

import { Ball } from "../Ball/Ball";
import { Button } from "../Button/Button";

interface VertexListItemProps {
  vertex: Vertex;
  deleteStatus: boolean;
  onDelete: ItemDeleteHandlerType;
}

const StyledRoot = styled.div`
  display: flex;
  padding: 8px;
`;

const StyledDelete = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  margin: 0 4px;
`;

export const VertexListItem: React.FC<VertexListItemProps> = ({
  vertex,
  onDelete,
  deleteStatus,
}) => {
  const handleDeleteAsk = React.useCallback(() => {
    onDelete(vertex, "ask");
  }, [onDelete, vertex]);

  const handleDeleteConfirm = React.useCallback(() => {
    onDelete(vertex, "confirm");
  }, [onDelete, vertex]);

  const handleDeleteCancel = React.useCallback(() => {
    onDelete(vertex, "cancel");
  }, [onDelete, vertex]);

  return (
    <StyledRoot>
      <Ball>{vertex}</Ball>
      <StyledDelete>
        {deleteStatus ? (
          <>
            <StyledButton onClick={handleDeleteConfirm}>✓</StyledButton>
            <StyledButton onClick={handleDeleteCancel}>&times;</StyledButton>
          </>
        ) : (
          <StyledButton onClick={handleDeleteAsk}>&times;</StyledButton>
        )}
      </StyledDelete>
    </StyledRoot>
  );
};
