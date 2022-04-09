import React from "react";
import styled from "styled-components";

import { useMockAppState } from "../../hooks/useMockAppState";
import { AppStoreContextProvider } from "../../store";
import { Graph } from "../Graph/Graph";

import { GlobalStyles } from "../GlobalStyles/GlobalStyles";
import { RouteCalculator } from "../RouteCalculator/RouteCalculator";
import { EdgeList } from "../EdgeList/EdgeList";
import { VertexList } from "../VertexList/VertexList";

const StyledRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5.25rem 1fr;
  grid-template-columns: 1fr 30%;
`;

const StyledHeader = styled.header`
  grid-column-start: 1;
  grid-column-end: 3;
  box-shadow: 4px 0 4px 0 rgb(4 4 32 / 16%);
  box-sizing: border-box;
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledContent = styled.div`
  background-color: rosybrown;
`;

const StyledSidebar = styled.div`
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
          <StyledContent>
            <Graph />
          </StyledContent>
          <StyledSidebar>
            <VertexList />
            <hr />
            <EdgeList />
            <hr />
            <RouteCalculator />
          </StyledSidebar>
        </StyledRoot>
      </AppStoreContextProvider>
    </>
  );
};
