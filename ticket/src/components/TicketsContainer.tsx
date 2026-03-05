

import { useTicketStore } from "../state/store";
import Tickets from "./Tickets";
import React, { useEffect } from "react";

type Props = {};

function TicketsContainer({}: Props) {
  const {tickets,selectedTickets} = useTicketStore();

  const filteredTickets = tickets.filter((ticket) => ticket.status !== "Resolved");
  useEffect(() => {
    //console.log(filteredTickets);
  }, [filteredTickets]);
 console.log(selectedTickets);
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTickets.map((ticket)=>{
          return(
          <React.Fragment key={ticket.id}>
              <Tickets  ticketProps={ticket}/>
          
          </React.Fragment>)
        })}
      </section>
    </>
  );
}

export default TicketsContainer;
