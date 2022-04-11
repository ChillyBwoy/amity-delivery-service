import React from "react";
import styled from "styled-components";

import { AppStoreContextProvider } from "../../store";
import { Graph } from "../Graph/Graph";
import { GlobalStyles } from "../GlobalStyles/GlobalStyles";
import { RoutePlanner } from "../RoutePlanner/RoutePlanner";
import { EdgeList } from "../EdgeList/EdgeList";
import { VertexList } from "../VertexList/VertexList";
import { RouteCalculator } from "../RouteCalculator/RouteCalculator";
import { VertexListForm } from "../VertexList/VertexListForm";
import { appStateMock } from "../../mocks";

const StyledRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5.25rem 1fr 30%;
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
  border-bottom: 1px solid rgba(211, 220, 228, 1);
`;

const StyledContent = styled.div`
  display: grid;
`;

const StyledBlock = styled.div`
  padding: 20px;
  flex: 1;
`;

const StyledPanel = styled.div`
  box-sizing: border-box;
  background-color: rgba(245, 247, 249, 1);
`;

const StyledLeftSidebar = styled(StyledPanel)`
  overflow-y: scroll;
  border-right: 1px solid rgba(211, 220, 228, 1);
`;

const StyledRightSidebar = styled(StyledPanel)`
  overflow-y: scroll;
  border-left: 1px solid rgba(211, 220, 228, 1);
`;

const StyledBottomBar = styled(StyledPanel)`
  border-top: 1px solid rgba(211, 220, 228, 1);
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
`;

const mockState = appStateMock();

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppStoreContextProvider state={mockState}>
        <StyledRoot>
          <StyledHeader>Amity Delivery Service</StyledHeader>
          <StyledLeftSidebar>
            <StyledBlock>
              <VertexListForm />
            </StyledBlock>
            <StyledBlock>
              <VertexList />
            </StyledBlock>
          </StyledLeftSidebar>
          <StyledContent>
            <Graph />
          </StyledContent>
          <StyledRightSidebar>
            <StyledBlock>
              <EdgeList />
            </StyledBlock>
          </StyledRightSidebar>
          <StyledBottomBar>
            <StyledBlock>
              <RoutePlanner />
            </StyledBlock>
            <StyledBlock>
              <RouteCalculator />
            </StyledBlock>
          </StyledBottomBar>
        </StyledRoot>
      </AppStoreContextProvider>
    </>
  );
};
