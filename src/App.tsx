import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import OAuthCallback from "./Pages/OAuthCallback";
import ErrorPage from "./Pages/ErrorPage";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  // const token = localStorage.getItem("jwt");
  // const isLoggedIn = !!token;
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/home-page" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} /> */}
        <Route path="/home-page" element={<RequireAuth><HomePage /></RequireAuth>} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
