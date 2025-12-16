import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../api";

type AuthState = "checking" | "authed" | "guest";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>("checking");

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setState("guest");
        return;
      }

      try {
        await axios.get(`${API_BASE}/OAuth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setState("authed");
        console.log("User is authenticated");
      } catch {
        localStorage.removeItem("jwt");
        setState("guest");
      }
    };

    check();
  }, []);
  if (state === "guest") return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default RequireAuth;
