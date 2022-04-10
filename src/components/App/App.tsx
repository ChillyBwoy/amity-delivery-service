import React from "react";
import styled from "styled-components";

import { useMockAppState } from "../../hooks/useMockAppState";
import { AppStoreContextProvider } from "../../store";
import { Graph } from "../Graph/Graph";

import { GlobalStyles } from "../GlobalStyles/GlobalStyles";
import { RoutePlanner } from "../RoutePlanner/RoutePlanner";
import { EdgeList } from "../EdgeList/EdgeList";
import { VertexList } from "../VertexList/VertexList";
import { RouteCalculator } from "../RouteCalculator/RouteCalculator";

const StyledRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5.25rem 1fr;
  grid-template-columns: 25% 1fr 25%;
`;

const StyledHeader = styled.header`
  grid-column-start: 1;
  grid-column-end: 4;
  box-shadow: 4px 0 4px 0 rgb(4 4 32 / 16%);
  box-sizing: border-box;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledContent = styled.div`
  display: grid;
`;

const StyledLeftSidebar = styled.div`
  box-sizing: border-box;
  padding: 40px; ;
`;

const StyledRightSidebar = styled.div`
  box-sizing: border-box;
  padding: 40px; ;
`;

export const App: React.FC = () => {
  const state = useMockAppState();

  return (
    <>
      <GlobalStyles />
      <AppStoreContextProvider state={state}>
        <StyledRoot>
          <StyledHeader>Amity Delivery Service</StyledHeader>
          <StyledLeftSidebar>
            <VertexList />
            <hr />
            <EdgeList />
            <hr />
          </StyledLeftSidebar>
          <StyledContent>
            <Graph />
          </StyledContent>
          <StyledRightSidebar>
            <RoutePlanner />
            <hr />
            <RouteCalculator />
          </StyledRightSidebar>
        </StyledRoot>
      </AppStoreContextProvider>
    </>
  );
};
