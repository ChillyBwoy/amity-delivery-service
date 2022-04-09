import React from "react";
import styled from "styled-components";

import { AppStoreContext } from "../../store";
import { addVertextAction } from "../../store/actions";

interface VertexListFormProps {}

const StyledRoot = styled.div``;

const StyledError = styled.div`
  color: red;
`;

export const VertexListForm: React.FC<VertexListFormProps> = () => {
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

    dispatch(addVertextAction(value));
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
      <input
        type="text"
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
      {error && <StyledError>{error}</StyledError>}

      <button onClick={handleSubmit}>+</button>
    </StyledRoot>
  );
};
