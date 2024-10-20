import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./main.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
