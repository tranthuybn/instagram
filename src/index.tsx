import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/app.css";
import "react-loading-skeleton/dist/skeleton.css";
import FirebaseProvider from "./contexts/firebase-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
);
