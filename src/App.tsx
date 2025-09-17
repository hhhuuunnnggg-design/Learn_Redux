import Header from "./compenents/header";
import TabsContent from "./compenents/tabs.content";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  // const count = useSelector((state: RootState) => state.counter);
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <Header />
      <TabsContent />
    </>
  );
}

export default App;
