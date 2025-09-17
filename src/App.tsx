import "./App.css";
import reactLogo from "./assets/react.svg";
import { increment, reduce } from "./redux/counter/counter.slide";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import viteLogo from "/vite.svg";

function App() {
  // const count = useSelector((state: RootState) => state.counter);
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1> My curnet count ={count.value}</h1>
        <div>
          <button onClick={() => dispatch(increment())}>Increment +1</button>
          <button onClick={() => dispatch(reduce())}>Reduce -1</button>
        </div>
      </div>
    </>
  );
}

export default App;
