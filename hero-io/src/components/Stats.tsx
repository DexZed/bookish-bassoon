import { numberFomatter } from "../lib/utils";
import { useAppData } from "../store/State";

type Props = {};

function Stats({}: Props) {
  const {state} = useAppData();
  const dowloads = state.data.reduce((acc, curr) => acc + curr.downloads, 0);
  const reviews = state.data.reduce((acc, curr) => acc + curr.ratings.reduce((acc, curr) => acc + curr.count, 0), 0);
  const apps = state.data.length;
  return (
    <>
      <section className="flex flex-col items-center ">
        <div className="m-4">
          <h2 className="">Trusted By Millions, Built For You</h2>
          
        </div>
        <div className="flex justify-center">
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
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
              </div>
              <div className="stat-title">Total Downloads</div>
              <div className="stat-value text-primary">{numberFomatter(dowloads)}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
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
              </div>
              <div className="stat-title">Total Reviews</div>
              <div className="stat-value text-secondary">{numberFomatter(reviews)}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Active Apps</div>
              <div className="stat-value">{apps}</div>
              <div className="stat-desc text-secondary">31 More will be added</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stats;
