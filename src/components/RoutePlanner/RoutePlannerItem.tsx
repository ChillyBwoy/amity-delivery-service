import React from "react";
import styled from "styled-components";

import { Vertex } from "../../types";

interface RoutePlannerItemProps {
  vertex: Vertex;
  onDelete?(vertex: Vertex): void;
}

const StyledRoot = styled.div`
  display: flex;
`;

const StyledName = styled.div`
  flex: 1;
`;

export const RoutePlannerItem: React.FC<RoutePlannerItemProps> = ({
  onDelete,
  vertex,
}) => {
  const handleDelete = React.useCallback(() => {
    if (onDelete) {
      onDelete(vertex);
    }
  }, [onDelete, vertex]);

  return (
    <StyledRoot>
      <StyledName>{vertex}</StyledName>
      {onDelete && <button onClick={handleDelete}>X</button>}
    </StyledRoot>
  );
};
