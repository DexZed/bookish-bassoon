import { useParams } from "react-router";
import type { AppData, RatingItem } from "../interfaces/InterfaceDefinitions";
import { calculateAverage, numberFomatter } from "../lib/utils";
import { useAppData } from "../store/State";

function Details() {
  const { id } = useParams();
  const { state } = useAppData();
  const app = state.data.find((a) => a.id.toString() === id);
  return (
    <>
      <section className="flex-centered-y min-h-screen">
        <div className="flex-centered-y md:flex-centered-x">
          <div>
            <img
              className="w-xs h-xs"
              src={
                app?.image ??
                "https://operaparallele.org/wp-content/uploads/2023/09/Placeholder_Image.png"
              }
              alt={"Placeholder image"}
            />
          </div>
          <div>
            <h2>{app?.title}</h2>
            <p>{app?.companyName}</p>
          </div>
          <div className="divider"></div>
          <div>
            <AppStats />
          </div>
          <div className="divider"></div>
          <div>
            <button className="button-outlined btn-accent m-4">Install</button>
          </div>
        </div>
        <div className="divider"></div>
        <div></div>
        <div className="divider"></div>
        <div className="flex-centered-y md:justify-start p-5">
          <h3>Description</h3>
          <p>{app?.description}</p>
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
      <div className="stats stats-horizontal shadow">
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
              {numberFomatter(averageRating)+"/5"}
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
          <div className="stat-desc">Tottal Reviews</div>
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
