
import { Link } from 'react-router'



export default function CustomErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center border border-red-200">
              <div className="flex flex-col items-center space-y-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                  />
                </svg>
                <h2 className="text-2xl font-semibold text-red-600">
                  Oops! Something went wrong.
                </h2>
                <p className="text-gray-600">
                  We couldn't complete your request. Please try again later or
                  contact support.
                </p>
                <Link
                  to={"/"}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
  )
}