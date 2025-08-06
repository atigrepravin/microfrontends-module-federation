import React from "react";
import { createRoot } from "react-dom/client";
const RemoteMount = React.lazy(() => import("remoteApp1/App"));
const App = () => (
  <div>
    <h1>Host App</h1>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RemoteMount />
    </React.Suspense>
  </div>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
