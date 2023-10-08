import { useYouBike } from "./hooks/useYouBike";
import { Header } from "./components";
import "./App.css";

function App() {
  const { data: youbike } = useYouBike();

  console.log(youbike);

  return (
    <>
      <Header />
      <main>
        <h2>站點資訊</h2>
      </main>
    </>
  );
}

export default App;
