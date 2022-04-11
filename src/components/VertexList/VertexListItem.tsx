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
  padding: 12px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledDelete = styled.div`
  display: flex;
`;

const StyledBall = styled(Ball)`
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  margin: 0 4px;
`;

const StyledDeleteConfirm = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
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
      <StyledBall onClick={handleDeleteAsk}>{vertex}</StyledBall>
      <StyledDelete>
        {deleteStatus && (
          <StyledDeleteConfirm>
            <StyledButton onClick={handleDeleteConfirm}>✓</StyledButton>
            <StyledButton onClick={handleDeleteCancel}>&times;</StyledButton>
          </StyledDeleteConfirm>
        )}
      </StyledDelete>
    </StyledRoot>
  );
};
