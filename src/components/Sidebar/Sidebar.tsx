import React from "react";
import styled from "styled-components";

import { RoutePlanner } from "../RoutePlanner/RoutePlanner";
import { EdgeList } from "../EdgeList/EdgeList";
import { VertexList } from "../VertexList/VertexList";
import { RouteCalculator } from "../RouteCalculator/RouteCalculator";
import { VertexListForm } from "../VertexList/VertexListForm";
import { SidebarLink } from "./SidebarLink";
import { AppState, AppStoreContext } from "../../store";
import { setActiveTabAction } from "../../store/view/actions";

const StyledRoot = styled.div`
  box-sizing: border-box;
  background-color: rgba(245, 247, 249, 1);
  border-right: 1px solid rgba(211, 220, 228, 1);
  display: grid;
  grid-template-rows: 5.25rem 1fr;
`;

const StyledBlock = styled.div`
  padding: 20px;
  flex: 1;
`;

const StyledTopBar = styled.div`
  display: flex;
  width: 100%;
`;

const StyledBottomBar = styled.div`
  flex: 1;
  overflow: scroll;
`;

export const Sidebar: React.FC = () => {
  const { state, dispatch } = React.useContext(AppStoreContext);

  const { tab } = state.view;

  const handleTabChange = React.useCallback(
    (tab: AppState["view"]["tab"]) => {
      dispatch(setActiveTabAction(tab));
    },
    [dispatch]
  );

  return (
    <StyledRoot>
      <StyledTopBar>
        <SidebarLink
          tab="vertices"
          title="Vertices"
          onClick={handleTabChange}
          selected={tab === "vertices"}
        />
        <SidebarLink
          tab="edges"
          title="Edges"
          onClick={handleTabChange}
          selected={tab === "edges"}
        />
        <SidebarLink
          tab="route_planner"
          title="Route Planner"
          onClick={handleTabChange}
          selected={tab === "route_planner"}
        />
        <SidebarLink
          tab="route_search"
          title="Route Search"
          onClick={handleTabChange}
          selected={tab === "route_search"}
        />
      </StyledTopBar>
      <StyledBottomBar>
        {tab === "vertices" && (
          <>
            <StyledBlock>
              <VertexListForm />
            </StyledBlock>
            <StyledBlock>
              <VertexList />
            </StyledBlock>
          </>
        )}
        {tab === "edges" && (
          <StyledBlock>
            <EdgeList />
          </StyledBlock>
        )}
        {tab === "route_planner" && (
          <StyledBlock>
            <RoutePlanner />
          </StyledBlock>
        )}
        {tab === "route_search" && (
          <StyledBlock>
            <RouteCalculator />
          </StyledBlock>
        )}
      </StyledBottomBar>
    </StyledRoot>
  );
};
