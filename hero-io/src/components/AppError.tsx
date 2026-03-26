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
            <h1>Welp This is Awkward</h1>
            <p className="py-6">
              The app you are looking for does not exist, go back perhaps and try again? 
            </p>
            <Link to="/" className="button-outlined btn-accent">Go Back</Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppError;
