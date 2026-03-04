import type { JSX } from "react";

type Props = {
    title: string;
  count: number;
  date: string;
  icon: JSX.Element;
  image: string;
};

function Status({title, count, date, icon,image}: Props) {
  return (
    <>
      <div className="stats shadow">
        <div className="stat">
          {icon}
          <div className="stat-title">{title}</div>
          <div className="stat-value">{count}</div>
          <div className="stat-desc">{date}</div>
        </div>
      </div>
    </>
  );
}

export default Status;


