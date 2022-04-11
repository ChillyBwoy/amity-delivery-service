import React from "react";
import styled from "styled-components";

import { AppStoreContextProvider } from "../../store";
import { Graph } from "../Graph/Graph";
import { GlobalStyles } from "../GlobalStyles/GlobalStyles";
import { appStateMock } from "../../mocks";
import { Sidebar } from "../Sidebar/Sidebar";

const StyledRoot = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 5.25rem 1fr;
  grid-template-columns: 50% 50%;
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
  border-bottom: 1px solid rgba(211, 220, 228, 1);

  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

const StyledContent = styled.div`
  display: grid;
`;

const mockState = appStateMock();

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AppStoreContextProvider state={mockState}>
        <StyledRoot>
          <StyledHeader>Amity Delivery Service</StyledHeader>

          <Sidebar />

          <StyledContent>
            <Graph />
          </StyledContent>
        </StyledRoot>
      </AppStoreContextProvider>
    </>
  );
};
