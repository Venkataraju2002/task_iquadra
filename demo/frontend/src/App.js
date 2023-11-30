import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import HomePage from "./pages/home-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
          <Route path="/signup-page" element={<SignupPage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/login-page" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
