import "./globals.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  /* Disabled strict mode as r3f-perf doesn't work well with it */
  <>
    <App />
  </>
);
