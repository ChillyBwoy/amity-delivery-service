import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { vertextAddAction } from "../../store/actions";
import { TextField } from "../TextField/TextField";

const StyledRoot = styled.div`
  display: flex;
`;

const StyledError = styled.div`
  color: red;
`;

export const VertexListForm: React.FC = () => {
  const { dispatch, state } = React.useContext(AppStoreContext);

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const handleSubmit = React.useCallback(() => {
    const match = state.verticies.find((v) => v === value);
    if (match) {
      setError("Vertex already exists");
      return;
    } else {
      setError("");
    }

    dispatch(vertextAddAction(value));
    setValue("");
  }, [dispatch, state.verticies, value]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <StyledRoot>
      <TextField
        type="text"
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
      {error && <StyledError>{error}</StyledError>}

      <button onClick={handleSubmit}>Add</button>
    </StyledRoot>
  );
};
