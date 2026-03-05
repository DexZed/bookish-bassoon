import { useTicketStore } from "../state/store";
import Status from "./Status";

type Props = {};

function StatContainer({}: Props) {
  const { resolvedTickets, selectedTickets } = useTicketStore();
  const inProgressCount = selectedTickets.filter(
    (ticket) => ticket.status === "In-Progress"
  ).length;
  const resolvedCount = resolvedTickets.length;
  const StatusContent = [
    {
      title: "In-Progress",
      count: inProgressCount,
      date: "Jan 1st - Feb 1st",
      style: "text-secondary",
      backgroundImage: "",
      icon: (
        <>
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
        </>
      ),
    },
    {
      title: "Resolved",
      count: resolvedCount,
      date: "Aug 1st - Dec 1st",
      style: "text-primary",
      backgroundImage: "",
      icon: (
        <>
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="flex gap-5 flex-wrap justify-center m-5">
        {StatusContent.map((item) => (
          <Status
            title={item.title}
            count={item.count}
            date={item.date}
            icon={item.icon}
            image={item.backgroundImage}
            key={item.title}
          />
        ))}
      </section>
    </>
  );
}

export default StatContainer;
