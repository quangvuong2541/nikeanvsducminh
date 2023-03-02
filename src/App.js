import HomePage from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailProductPage from "./pages/DetailProduct/DetailProductPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productDetail/:id" element={<DetailProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
