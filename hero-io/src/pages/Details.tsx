import { useParams } from "react-router";
import type { RatingItem } from "../interfaces/InterfaceDefinitions";
import { calculateAverage, numberFomatter } from "../lib/utils";
import { useAppData } from "../store/State";
import RatingGraph from "../components/RatingGraph";

function Details() {
  const { id } = useParams();
  const { state } = useAppData();
  const app = state.data.find((a) => a.id.toString() === id);
  console.log(app);
  return (
    <>
      <section className="min-h-screen flex-centered-y gap-4 p-10">
        <div className="card lg:card-side bg-base-100 shadow-sm w-full card-xl" >
          <figure className="w-96">
            <img
              className="aspect-square"
              src={app?.image? `${app.image}` :"https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
              alt={app?.title? `${app.title}` :"Placeholder image"}
            />
          </figure>
          <div className="card-body">
            <h2>{app?.title? app.title :"New album"}</h2>
            <h3 className="text-center md:text-start">Developed by: <span className="font-bold text-purple-600">{app?.companyName? app.companyName :"Daisy UI"}</span></h3>
            <div className="flex-centered-x gap-4 md:block">
              <AppStats downloads={app?.downloads}  ratings={app?.ratings} reviews={app?.reviews}/>

            </div>
            <div className="card-actions justify-center md:justify-start">
              <button className="button-outlined btn-accent m-5 w-96">Install <span>( {app?.size} MB )</span></button>
            </div>
          </div>
        </div>
        <div className="card lg:card-side bg-base-100 shadow-sm w-full card-xl">
          <RatingGraph ratings={app?.ratings!}/>
        </div>
        <div className="card lg:card-side bg-base-100 shadow-sm w-full card-xl">
          <div className="card-body flex-centerd-y"><h2>Description</h2>
          <p className="text-center">{app?.description? app.description :"lorem ipsum dolor sit amet"}</p></div>
        </div>
      </section>
    </>
  );
}

export default Details;
type StatProps = Partial<{
  downloads: number;
  reviews: number;
  ratings: RatingItem[];
}>;
function AppStats({ downloads, reviews, ratings }: StatProps) {
  const mockRatings = [
    { name: "1 star", count: 500 },
    { name: "2 star", count: 800 },
    { name: "3 star", count: 2000 },
    { name: "4 star", count: 4000 },
    { name: "5 star", count: 4734 },
  ];

  const averageRating = calculateAverage(ratings ?? mockRatings);

  return (
    <>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat place-items-center">
          <div className="stat-title m-3">
            <img
              className="w-10 h-10"
              src="/icon-downloads.png"
              alt={"Placeholder image"}
            />
          </div>
          <div className="stat-desc">Downloads</div>
          <div className="stat-value">{numberFomatter(downloads!)}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title m-3">
            <img
              className="w-10 h-10"
              src="/icon-ratings.png"
              alt={"Placeholder image"}
            />
          </div>
          <div className="stat-desc">Average Rating</div>
          <div className="stat-value">
            <div className="flex-centered-x gap-2">
              {numberFomatter(averageRating) + "/5"}
              <StarRating rating={averageRating} />
            </div>
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title m-3">
            <img
              className="w-10 h-10"
              src="/icon-review.png"
              alt={"Placeholder image"}
            />
          </div>
          <div className="stat-desc">Total Reviews</div>
          <div className="stat-value">{numberFomatter(reviews!)}</div>
        </div>
      </div>
    </>
  );
}

type RatingProps = {
  rating: number;
};

function StarRating({ rating }: RatingProps) {
  const rounded = Math.round(rating * 2) / 2;
  const checkedIndex = Math.round(rounded * 2);

  return (
    <div className="rating rating-xl rating-half">
      <input type="radio" name="rating" className="rating-hidden" />

      {[...Array(10)].map((_, i) => {
        const value = (i + 1) / 2; // 0.5 → 5
        const isHalf = i % 2 === 0;

        return (
          <input
            key={i}
            type="radio"
            name="rating"
            className={`mask mask-star-2 ${
              isHalf ? "mask-half-1" : "mask-half-2"
            } `}
            aria-label={`${value} star`}
            defaultChecked={checkedIndex === i + 1}
            readOnly
          />
        );
      })}
    </div>
  );
}
