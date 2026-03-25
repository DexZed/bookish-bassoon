import React, { useState } from "react";
import { useDatabase } from "../database/LocalDB";
import type { AppData, RatingItem } from "../interfaces/InterfaceDefinitions";
import { numberFomatter } from "../lib/utils";
import CardAnimation from "../components/CardAnimation";

type Props = {};

function Installations({}: Props) {
  const { data, removeItem } = useDatabase();
  const [sort, setSort] = useState("");
  const handleClick = (item: Partial<AppData>) => {
    removeItem(item);
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  const sortedData = React.useMemo(() => {
    // Create a shallow copy to avoid mutating the original 'data'
    const baseData = [...data];

    if (sort === "ASC") {
      return baseData.sort((a, b) => (a.size ?? 0) - (b.size ?? 0));
    }
    if (sort === "DESC") {
      return baseData.sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
    }

    return baseData;
  }, [data, sort]); // Recalculates only when data or sort changes
  return (
    <>
      <section className="flex flex-col items-center gap-4 min-h-screen">
        <div className="flex-centerd-y">
          <h2>Your Installed Apps</h2>
          <p>Explore all apps on our platform.</p>
        </div>
        <div className="flex justify-between w-full p-10">
          <div>({data.length}) Apps Found</div>
          <div>
            <select onChange={handleChange} className="select select-neutral">
              <option disabled={true} value={""}>
                Sort By Size
              </option>
              <option value={"ASC"}>Ascending order</option>
              <option value={"DESC"}>Descending order</option>
            </select>
          </div>
        </div>

        <div className="flex-centered-x flex-wrap w-full gap-4 p-10">
          {sortedData.map((item) => {
            return (
              <CardAnimation key={item.id}>
                <div
                  
                  className="card card-xs lg:card-side bg-base-100 shadow-sm w-96 lg:w-full shadow-amber-500"
                >
                  <figure>
                    <img
                      className=" lg:w-30 aspect-square"
                      src={
                        item.image
                          ? `${item.image}`
                          : "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                      }
                      alt={item.title ? `${item.title}` : "Placeholder image"}
                    />
                  </figure>
                  <div className="card-body">
                    <div className="flex flex-col items-center lg:items-start">
                      <h3>{item.title ? item.title : "Placeholder title"}</h3>
                      <AppStats
                        size={item.size}
                        downloads={item.downloads}
                        ratings={item.ratings}
                      />
                    </div>

                    <div className="flex-centered-x lg:card-actions lg:justify-end p-5 lg:p-0">
                      <button
                        onClick={() => handleClick(item)}
                        className="button-outlined btn-accent"
                      >
                        Uninstall
                      </button>
                    </div>
                  </div>
                </div>
              </CardAnimation>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Installations;
type StatProps = Partial<{
  downloads: number;
  size: number;
  ratings: RatingItem[];
}>;
function AppStats({ downloads, size, ratings }: StatProps) {
  return (
    <>
      <div className="flex gap-3">
        <div
          className="badge badge-outline badge-info libre-baskerville badge-sm"
          style={
            {
              fontWeight: 500,
              fontStyle: "italic",
            } as React.CSSProperties
          }
        >
          <svg
            className="w-4 h-4 dark:invert "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z" />
          </svg>
          {numberFomatter(downloads!)}
        </div>
        <div
          className="badge badge-outline badge-warning libre-baskerville badge-sm"
          style={
            {
              fontWeight: 500,
              fontStyle: "italic",
            } as React.CSSProperties
          }
        >
          <svg
            className="w-4 h-4 dark:invert"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z" />
          </svg>
          {numberFomatter(ratings?.reduce((acc, curr) => acc + curr.count, 0)!)}
        </div>
        <div
          className="badge badge-outline badge-warning libre-baskerville badge-sm"
          style={
            {
              fontWeight: 500,
              fontStyle: "italic",
            } as React.CSSProperties
          }
        >
          <svg
            className="w-4 h-4 dark:invert"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path d="M160 144C151.2 144 144 151.2 144 160L144 322C149.1 320.7 154.5 320 160 320L480 320C485.5 320 490.9 320.7 496 322L496 160C496 151.2 488.8 144 480 144L160 144zM144 384L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 384C496 375.2 488.8 368 480 368L160 368C151.2 368 144 375.2 144 384zM96 384L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 384zM312 432C312 418.7 322.7 408 336 408C349.3 408 360 418.7 360 432C360 445.3 349.3 456 336 456C322.7 456 312 445.3 312 432zM432 408C445.3 408 456 418.7 456 432C456 445.3 445.3 456 432 456C418.7 456 408 445.3 408 432C408 418.7 418.7 408 432 408z" />
          </svg>
          {size} MB
        </div>
      </div>
    </>
  );
}
