import ReactDOM from "react-dom/client";
import { Root } from "./components/Root/Root";

function run() {
  const $root = document.getElementById("root");
  if (!$root) {
    throw new Error("Root element not found");
  }

  const root = ReactDOM.createRoot($root);
  root.render(<Root />);
}

run();
