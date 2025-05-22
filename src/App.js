import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./views/List";
import ProductDetail from "./views/Detail";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pt-20">
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
