import type { JSX } from "react";

type Props = {
  title: string;
  count: number;
  date: string;
  icon: JSX.Element;
  image: string;
};

function Status({title, count, date, icon}: Props) {
  return (
    <>
      <div className="stats shadow-md shadow-violet-800 w-96">
        <div className="stat">
          {icon}
          <div className="stat-title text-center">{title}</div>
          <div className="stat-value text-center">{count}</div>
          <div className="stat-desc text-center">{date}</div>
        </div>
      </div>
    </>
  );
}

export default Status;


