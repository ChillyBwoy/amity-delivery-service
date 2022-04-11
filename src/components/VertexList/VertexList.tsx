import React from "react";
import styled from "styled-components";
import { useItemDeleteHandler } from "../../hooks/useItemDeleteHandler";
import { AppStoreContext } from "../../store";
import { vertexDeleteAction } from "../../store/graph/actions";

import { VertexListItem } from "./VertexListItem";

const StyledRoot = styled.div`
  width: 100%;
`;

const StyledInfo = styled.div`
  font-size: 0.9rem;
`;

const StyledList = styled.div`
  padding: 12px 0;
  display: flex;
  flex-wrap: wrap;
`;

export const VertexList: React.FC = () => {
  const { state, dispatch } = React.useContext(AppStoreContext);

  const { handleDelete, itemToDelete } = useItemDeleteHandler((vertex) => {
    dispatch(vertexDeleteAction(vertex));
  });

  return (
    <StyledRoot>
      <StyledInfo>Click on vertex to delete it</StyledInfo>
      <StyledList>
        {state.graph.vertices.map((v) => (
          <VertexListItem
            key={v}
            vertex={v}
            onDelete={handleDelete}
            deleteStatus={v === itemToDelete}
          />
        ))}
      </StyledList>
    </StyledRoot>
  );
};
