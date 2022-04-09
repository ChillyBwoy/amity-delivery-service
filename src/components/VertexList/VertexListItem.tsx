import React from "react";
import styled from "styled-components";

import { ItemDeleteHandlerType } from "../../hooks/useItemDeleteHandler";
import { Vertex } from "../../types";

interface VertexListItemProps {
  vertex: Vertex;
  deleteStatus: boolean;
  onDelete: ItemDeleteHandlerType;
}

const StyledRoot = styled.div``;

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
      {vertex}

      {deleteStatus ? (
        <>
          <button onClick={handleDeleteConfirm}>confirm</button>
          <button onClick={handleDeleteCancel}>cancel</button>
        </>
      ) : (
        <button onClick={handleDeleteAsk}>X</button>
      )}
    </StyledRoot>
  );
};
