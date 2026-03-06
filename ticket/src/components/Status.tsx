import { type JSX } from "react";

type Props = {
  title: string;
  count: number;
  date: string;
  icon: JSX.Element;
  backgroundGradient: string;
};

function Status({ title, count, date, icon, backgroundGradient }: Props) {
  return (
    <>
      <div
        className={
          "stats shadow-md shadow-violet-800 w-125" + " " + backgroundGradient
        }
      >
        <div className="flex justify-around">
          <img
            src="./vector1.png"
            alt="vector"
            className="aspect-rectangle w-20"
          />
          <div className="stat">
            {icon}
            <div className="stat-title text-center text-white">{title}</div>
            <div className="stat-value text-center text-white">{count}</div>
            <div className="stat-desc text-center text-white">{date}</div>
          </div>
          <img
            src="./vector1.png"
            alt="vector"
            className="aspect-rectangle w-20 transform -scale-x-100"
          />
        </div>
      </div>
    </>
  );
}

export default Status;
