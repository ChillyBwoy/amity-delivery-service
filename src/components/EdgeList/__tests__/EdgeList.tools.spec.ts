import { appStateMock } from "../../../mocks";
import { AppState, initialState } from "../../../store";

import { validateEdge } from "../EdgeList.tools";

describe("EdgeList.tools", () => {
  describe("validateEdge", () => {
    let state: AppState = initialState;

    beforeEach(() => {
      state = appStateMock();
    });

    it("should return new edge", () => {
      const from = "A";
      const to = "F";
      const id = `${from}${to}`;

      const edge = validateEdge(state.graph, id, from, to, 20);

      expect(edge).toEqual({ id, from, to, cost: 20 });
    });

    it("should throw an error on invalid vertex", () => {
      function wrapper() {
        const from = "X";
        const to = "Y";
        const id = `${from}${to}`;
        validateEdge(state.graph, id, from, to, 20);
      }

      expect(wrapper).toThrowError("Vertex with name X not found");
    });

    it("should throw an error on empty params", () => {
      function wrapper() {
        const from = "";
        const to = "";
        const id = ``;
        validateEdge(state.graph, id, from, to, 20);
      }

      expect(wrapper).toThrowError("Please specify all parameters");
    });

    it("should throw an error if from equals to and exists", () => {
      function wrapper() {
        const from = "A";
        const to = "A";
        const id = `${from}${to}`;
        validateEdge(state.graph, id, from, to, 20);
      }

      expect(wrapper).toThrowError("From and To cannot be the same");
    });

    it("should throw an error if edge already exists", () => {
      function wrapper() {
        const from = "A";
        const to = "D";
        const id = `${from}${to}`;
        validateEdge(state.graph, id, from, to, 1);
      }

      expect(wrapper).toThrowError("Edge already exists");
    });

    it("should throw an error on invalid cost", () => {
      function wrapper() {
        const from = "A";
        const to = "F";
        const id = `${from}${to}`;
        validateEdge(state.graph, id, from, to, -100);
      }

      expect(wrapper).toThrowError("Invalid cost value");
    });
  });
});
