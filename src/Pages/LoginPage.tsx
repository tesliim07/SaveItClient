import { API_BASE } from "../api";

const LoginPage = () => {
    const googleLogin = () => {
        window.location.href = `${API_BASE}/OAuth/login-google`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    Save It Login Page
                </h1>
                <button
                    onClick={googleLogin}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 shadow-sm"
                >
                    {/* Optional Google icon */}
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#fff"
                            d="M44.5 20H24v8.5h11.7C34.2 33 30.5 36 24 36c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.6 0 6.8 1.3 9.3 3.5l6.6-6.6C36.2 2.7 30.3 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.2 0 22-9.2 22-22 0-1.3-.1-2.5-.5-3.5z"
                        />
                    </svg>
                    Login via Google
                </button>
            </div>
        </div>
    );
};



export default LoginPage;