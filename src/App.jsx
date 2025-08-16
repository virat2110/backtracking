import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SudokuGenerator from "./pages/SudokuGenerator";
import SudokuSolver from "./pages/SudokuSolver";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/sudoku/generator" element={<SudokuGenerator />} />
        <Route path="/sudoku/solver" element={<SudokuSolver />} />
      </Routes>
    </>
  );
}

export default App;
