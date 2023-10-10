import { Header, Main } from "@components";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/youbike-realtime/*"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      ></Route>
    </Routes>
  );
}

export default App;
