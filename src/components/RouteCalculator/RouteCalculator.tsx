import React from "react";
import styled from "styled-components";

import { useVerticesChoices } from "../../hooks/useVerticesChoices";
import { AppStoreContext } from "../../store";
import { selectEdgesAction } from "../../store/view/actions";
import { Edge, Vertex } from "../../types";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Route } from "../Route/Route";
import { TextField } from "../TextField/TextField";

import { findRoutes } from "./RouteCalculator.utils";

const StyledRoot = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
  height: 100%;
`;

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 20% 1fr;
  grid-gap: 8px;
`;

const StyledList = styled.div`
  overflow: scroll;
  height: 100%;
`;

export const RouteCalculator: React.FC = () => {
  const { dispatch, state } = React.useContext(AppStoreContext);
  const [from, setFrom] = React.useState<Vertex | undefined>(undefined);
  const [to, setTo] = React.useState<Vertex | undefined>(undefined);
  const [maxStops, setMaxStops] = React.useState(10);
  const choices = useVerticesChoices(state.graph.vertices);
  const [routeList, setRouteList] = React.useState<Array<Edge[]>>([]);

  const handleChangeFrom = React.useCallback((value: Vertex) => {
    setFrom(value);
  }, []);

  const handleChangeTo = React.useCallback((value: Vertex) => {
    setTo(value);
  }, []);

  const handleMaxStopsChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!Number.isNaN(value)) {
        setMaxStops(value);
      }
    },
    []
  );

  const handleSubmit = React.useCallback(() => {
    if (!to || !from) {
      return;
    }

    const newRoute = findRoutes(state.graph.edges, from, to, maxStops);

    setRouteList(newRoute);
  }, [to, from, state.graph.edges, maxStops]);

  const handleRouteClick = React.useCallback(
    (route: Array<Edge>) => {
      const ids = route.map((edge) => edge.id);

      dispatch(selectEdgesAction(ids));
    },
    [dispatch]
  );

  return (
    <StyledRoot>
      <StyledForm>
        <Dropdown
          choices={choices}
          value={from}
          onChange={handleChangeFrom}
          title="From"
        />
        <Dropdown
          choices={choices}
          value={to}
          onChange={handleChangeTo}
          title="To"
        />
        <TextField
          title="Max stops"
          type="number"
          min={1}
          value={maxStops}
          onChange={handleMaxStopsChange}
        />
        <Button onClick={handleSubmit}>Calculate</Button>
      </StyledForm>
      {routeList.length > 0 ? (
        <StyledList>
          {routeList.map((route, i) => (
            <Route key={i} route={route} onClick={handleRouteClick} />
          ))}
        </StyledList>
      ) : (
        <h3>No such route</h3>
      )}
    </StyledRoot>
  );
};
