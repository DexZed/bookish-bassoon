import { Link } from "react-router";

// TODO: Add styling and proper component
export default function Home() {
  const features = [{
    name:"Register",
    description:"Register as a sender or receiver to get started",
    link:<><Link to={"/register"} className="btn btn-primary btn-outline">Register</Link></>
  },
{
  name:"Login",
  description:"login and go to your dashboard",
  link:<><Link to={"/login"} className="btn btn-secondary btn-outline">Login</Link></>
},
{
  name:"Search",
  description:"Search for parcels",
  link:<><Link id="search-link" to={"/search"} className="btn btn-info btn-outline">Search</Link></>
}]
  return (
    <>
      <div
        className="hero min-h-screen rounded-xl"
        
      >
        
        <div className="hero-content  text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Welcome to ParcelXpress, your one stop platform to handle all your
              parcel needs.
            </p>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-screen mt-5">
        <div className="hero-content text-center flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center my-4">Where to Start</h2>
         <div className="flex  flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div key={index} className="card bg-neutral text-neutral-content w-96 card-xl">
              <div className="card-body items-center text-center">
                
                <h2 className="card-title">{feature.name}</h2>
                <p>{feature.description}</p>
                <div>{feature.link}</div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
