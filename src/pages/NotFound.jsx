// pages/PageNotFound.js
import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  React.useEffect(() => {
    document.title = "Page Not Found - Admin Dashboard";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      {/* Illustration / 404 */}
      <div className="text-center">
        <h1 className="text-[120px] font-extrabold text-gray-200 leading-none">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-[-30px]">Page Not Found</h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          The page you are looking for doesn't exist or may have been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            <Home size={18} />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-medium"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
