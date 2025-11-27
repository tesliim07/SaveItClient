import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token)
    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/home-page");
    }
    else{
      navigate("/")
    }
  }, [navigate]);

  return(
    <div>
      Logging you in ....
    </div>
  );
}

export default OAuthCallback;
