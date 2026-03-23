import { Link } from "react-router";

type Props = {};

function AppError({}: Props) {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="flex-centered-y">
            <img src="/App-Error.png" alt="App-Error" />
          <div className="max-w-md">
            <h1>Not Found</h1>
            <p className="py-6">
              The app you are looking for does not exist.
            </p>
            <Link to="/" className="button-outlined btn-warning">Go Back</Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppError;
