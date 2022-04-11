import React from "react";
import styled from "styled-components";

import { AppState } from "../../store";

type TabId = AppState["view"]["tab"];

interface SidebarLinkProps {
  title: string;
  tab: TabId;
  selected: boolean;
  onClick(id: TabId): void;
}

const StyledRoot = styled.div<{ selected: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#FFD400" : "#1dc497")};
  color: #fff;
  cursor: pointer;
`;

const StyledLink = styled.div``;

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  title,
  onClick,
  tab,
  selected,
}) => {
  const handleClick = React.useCallback(() => {
    onClick(tab);
  }, [onClick, tab]);

  return (
    <StyledRoot selected={selected} onClick={handleClick}>
      <StyledLink>{title}</StyledLink>
    </StyledRoot>
  );
};
