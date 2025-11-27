import { API_BASE } from "../api";

const LoginPage = () => {
    const googleLogin = () => {
        window.location.href = `${API_BASE}/OAuth/login-google`;
    };


    return(
        <div>
            <h1>Save It Login Page</h1>
            <button onClick={googleLogin}> Login via Google </button>
        </div>
    );
};

export default LoginPage;