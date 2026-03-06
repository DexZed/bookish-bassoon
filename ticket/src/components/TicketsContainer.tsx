import { AnimatePresence } from "motion/react";
import { useTicketStore } from "../state/store";
import Tickets from "./Tickets";
import React from "react";

type Props = {};

function TicketsContainer({}: Props) {
  const { tickets } = useTicketStore();

  const filteredTickets = tickets.filter(
    (ticket) => ticket.status !== "Resolved",
  );

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
       <AnimatePresence>
         {filteredTickets.map((ticket) => {
          return (
            <React.Fragment key={ticket.id}>
              <Tickets ticketProps={ticket} />
            </React.Fragment>
          );
        })}
       </AnimatePresence>
      </section>
    </>
  );
}

export default TicketsContainer;
