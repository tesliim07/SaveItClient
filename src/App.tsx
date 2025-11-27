import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import OAuthCallback from "./Pages/OAuthCallback";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;
