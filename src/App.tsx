import "./App.css";
import { addTen } from "./helpers/addTen";
import { useCounterStore } from "./model/countStore";

function App() {
  const { counter, increment, decrement } = useCounterStore();

  return (
    <div className="wrapper">
      <button onClick={increment}>+</button>
      {counter}
      <button onClick={decrement}>-</button>
      <button onClick={addTen}>Add 10</button>
    </div>
  );
}

export default App;
