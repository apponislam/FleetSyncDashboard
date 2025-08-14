import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white px-6">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-4">
          <MdErrorOutline className="text-red-500 text-6xl" />
        </div>

        <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong.</h1>

        <p className="text-lg text-blue-200 mb-6">
          The page you're looking for doesn't exist or an unexpected error has
          occurred.
        </p>

        <Link
          to="/"
          className="inline-block bg-white text-blue-900 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Error;
