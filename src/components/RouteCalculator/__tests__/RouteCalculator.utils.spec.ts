import { appStateMock } from "../../../mocks";
import { AppState, initialState } from "../../../store";

import { findRoutes } from "../RouteCalculator.utils";

describe("EdgeList.tools", () => {
  describe("validateEdge", () => {
    let state: AppState = initialState;

    beforeEach(() => {
      state = appStateMock();
    });

    it("should find all routes between E and D", () => {
      const routes = findRoutes(state.graph.edges, "E", "D", Infinity);
      expect(routes.length).toBe(6);
    });

    it("should find all routes between E and D with a maximum 4 stops", () => {
      const routes = findRoutes(state.graph.edges, "E", "D", 4);
      expect(routes.length).toBe(4);
    });

    it("should find all routes between E and E (circular)", () => {
      const routes = findRoutes(state.graph.edges, "E", "E", Infinity);
      expect(routes.length).toBe(5);
    });
  });
});
