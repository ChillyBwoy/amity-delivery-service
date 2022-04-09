import ReactDOM from "react-dom/client";

import { App } from "./components/App/App";

function run() {
  const $root = document.getElementById("root");
  if (!$root) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot($root);
  root.render(<App />);
}

run();
