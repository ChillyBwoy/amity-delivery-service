import React from "react";
import styled from "styled-components";

import { GraphVertex } from "../../types";

interface VertexListItemProps {
  vertex: GraphVertex;
}

const StyledRoot = styled.div``;

export const VertexListItem: React.FC<VertexListItemProps> = ({ vertex }) => {
  return <StyledRoot>{vertex}</StyledRoot>;
};
