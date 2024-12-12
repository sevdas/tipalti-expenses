import { Link, Route, Routes } from "react-router-dom";
import { Expenses } from "./components/pages/Expenses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Link to={"/expenses"}>See expenses</Link>} />
      <Route path="/expenses" element={<Expenses />} />
    </Routes>
  );
}

export default App;
