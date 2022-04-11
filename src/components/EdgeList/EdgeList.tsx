import React from "react";
import styled from "styled-components";

import { useItemDeleteHandler } from "../../hooks/useItemDeleteHandler";
import { useVerticesChoices } from "../../hooks/useVerticesChoices";
import { AppStoreContext } from "../../store";
import { edgeDeleteAction, edgeUpdateAction } from "../../store/graph/actions";
import { Edge } from "../../types";

import { EdgeListForm } from "./EdgeListForm";
import { EdgeListItem } from "./EdgeListItem";

const StyledRoot = styled.div``;

export const EdgeList: React.FC = () => {
  const { dispatch, state } = React.useContext(AppStoreContext);

  const choices = useVerticesChoices(state.graph.vertices);

  const handleEdgeChange = React.useCallback(
    (route: Edge) => {
      dispatch(edgeUpdateAction(route));
    },
    [dispatch]
  );

  const { handleDelete, itemToDelete } = useItemDeleteHandler((id) => {
    dispatch(edgeDeleteAction(id));
  });

  return (
    <StyledRoot>
      <EdgeListForm choices={choices} />
      <hr />
      {state.graph.edges.map((edge, index) => (
        <EdgeListItem
          key={index}
          edge={edge}
          choices={choices}
          onDelete={handleDelete}
          onChange={handleEdgeChange}
          deleteStatus={itemToDelete === edge.id}
        />
      ))}
    </StyledRoot>
  );
};
