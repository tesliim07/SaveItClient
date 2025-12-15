import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 text-center">
        <div className="text-6xl sm:text-7xl font-extrabold text-blue-500">
          404
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-800">
          Page Not Found
        </h1>

        <p className="mt-2 text-gray-600">
          The page you’re looking for doesn’t exist, or the link is incorrect.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            to="/"
            className="w-full sm:w-auto px-4 py-2 font-semibold rounded-md transition-colors duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;