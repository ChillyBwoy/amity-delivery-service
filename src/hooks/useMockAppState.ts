import { appStateMock } from "../mocks";

import { AppState } from "../store";

export function useMockAppState(): AppState {
  return appStateMock();
}
