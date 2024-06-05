// import logo from "./logo.svg";
import "./App.css";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AppRoutes />
    </div>
  );
}

export default App;
