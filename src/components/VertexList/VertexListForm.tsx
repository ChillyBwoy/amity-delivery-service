import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { vertextAddAction } from "../../store/graph/actions";
import { Button } from "../Button/Button";
import { TextField } from "../TextField/TextField";

const StyledRoot = styled.div``;

const StyledForm = styled.div`
  display: flex;
`;

const StyledError = styled.div`
  padding: 4px 0;
  color: #fa4d30;
`;

export const VertexListForm: React.FC = () => {
  const { dispatch, state } = React.useContext(AppStoreContext);

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<null | string>(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      setValue(event.target.value);
    },
    []
  );

  const handleSubmit = React.useCallback(() => {
    const match = state.graph.vertices.find((v) => v === value);
    if (match) {
      setError("Vertex already exists");
      return;
    }

    if (!/^[A-Z]{1}$/.test(value)) {
      setError("Vertex must be a single uppercase letter");
      return;
    }

    dispatch(vertextAddAction(value));
    setValue("");
  }, [dispatch, state.graph.vertices, value]);

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
      <StyledForm>
        <TextField
          type="text"
          onChange={handleChange}
          value={value}
          onKeyDown={handleKeyDown}
          maxLength={1}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </StyledForm>
      {error && <StyledError>{error}</StyledError>}
    </StyledRoot>
  );
};
