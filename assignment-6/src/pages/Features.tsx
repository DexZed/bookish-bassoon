function Features() {
  const features = [
    {
      icon: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </>
      ),
      name: "Creation",
      description:
        "Intuitive interface for creating your parcel for your intended delivery.",
    },
    {
      icon: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </>
      ),
      name: "Broad Reach",
      description:
        "We build our services to reach as far as possible, fast delivery so that your parcels reach thier destination in time.",
    },
    {
      icon: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </>
      ),
      name: "Fully Tracked",
      description:
        "Everything you need to track your parcel, highly intuitive. Clear data analysis and visualization.",
    },
  ];
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center flex flex-col gap-6">
          <div className="max-w-md">
            <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
              Why choose us
            </span>
            <h2 className="bg-gradient-to-b from-white to-gray-400 dark:from-gray-200 dark:to-gray-600  bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
              Seamless Parcel Delivery Services That Match Your Needs
            </h2>
            <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
              Our services allow creating ,receiving ,managing ,tracking and
              analytics of all your packages and deliveries
            </p>
          </div>
          <div className="flex  flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div key={index} className="card bg-neutral text-neutral-content w-96 card-lg">
              <div className="card-body items-center text-center">
                <div>{feature.icon}</div>
                <h2 className="card-title">{feature.name}</h2>
                <p>{feature.description}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
