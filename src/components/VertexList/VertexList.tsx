import React from "react";
import styled from "styled-components";
import { useItemDeleteHandler } from "../../hooks/useItemDeleteHandler";
import { AppStoreContext } from "../../store";
import { vertexDeleteAction } from "../../store/graph/actions";

import { VertexListForm } from "./VertexListForm";
import { VertexListItem } from "./VertexListItem";

const StyledRoot = styled.div``;

export const VertexList: React.FC = () => {
  const { state, dispatch } = React.useContext(AppStoreContext);

  const { handleDelete, itemToDelete } = useItemDeleteHandler((vertex) => {
    dispatch(vertexDeleteAction(vertex));
  });

  return (
    <StyledRoot>
      {state.graph.vertices.map((v) => (
        <VertexListItem
          key={v}
          vertex={v}
          onDelete={handleDelete}
          deleteStatus={v === itemToDelete}
        />
      ))}
      <hr />
      <VertexListForm />
    </StyledRoot>
  );
};
