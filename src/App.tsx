import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Header from "./Header";

function App() {
  return (
    <div className="bg-zinc-900 text-white min-h-dvh flex flex-col">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
