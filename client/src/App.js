import Headers from "./components/Headers";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap"
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//import ProductPage from "./pages/ProductPage";
//import CartPage from "./pages/CartPage"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Headers />
        <Container>
          <main className="py-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </Container>
        <Footer />
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
