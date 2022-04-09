import React from "react";
import styled from "styled-components";
import { AppStoreContext } from "../../store";

import { VertexListForm } from "./VertexListForm";
import { VertexListItem } from "./VertexListItem";

const StyledRoot = styled.div``;

export const VertexList: React.FC = () => {
  const { state } = React.useContext(AppStoreContext);

  return (
    <StyledRoot>
      {state.verticies.map((v) => (
        <VertexListItem key={v} vertex={v} />
      ))}
      <VertexListForm />
    </StyledRoot>
  );
};
