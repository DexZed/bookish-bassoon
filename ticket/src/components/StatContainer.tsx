import { useTicketStore } from "../state/store";
import Status from "./Status";
import { StatusContent } from "./StatusContent";

type Props = {};

function StatContainer({}: Props) {
  const { resolvedTickets, selectedTickets } = useTicketStore();
  const inProgressCount = selectedTickets.filter(
    (ticket) => ticket.status === "In-Progress",
  ).length;
  const resolvedCount = resolvedTickets.length;

  const content = StatusContent;
  content[0].count = inProgressCount;
  content[1].count = resolvedCount;


  return (
    <>
      <section className="flex gap-5 flex-wrap justify-center m-5">
        {content.map((item) => (
          <Status
            title={item.title}
            count={item.count}
            date={item.date}
            icon={item.icon}
            backgroundGradient={item.backgroundGradient ?? ""}
            key={item.title}
          />
        ))}
      </section>
    </>
  );
}

export default StatContainer;
