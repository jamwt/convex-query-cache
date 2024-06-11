import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexQueryCacheProvider } from "./cache/provider.tsx";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <ConvexQueryCacheProvider expiration={12000} maxIdleEntries={11} debug={true}>
        <App />
      </ConvexQueryCacheProvider>
    </ConvexProvider>
  </React.StrictMode>
);
