
import type { ITicket } from "../interfaces/DataInterfaces";
import { tickets$ } from "../state/store";
import { useEffect, useState } from "react";
import Tickets from "./Tickets";
import React from "react";

type Props = {};

function TicketsContainer({}: Props) {
  const [ticketsData, setTicketsData] = useState<ITicket[]>([]);
  
  useEffect(()=>{
    const sub = tickets$.subscribe(setTicketsData);
    return ()=>{
      sub.unsubscribe();
    }
  },[])
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ticketsData.map((ticket)=>{
          return(
          <React.Fragment key={ticket.id}>
              <Tickets id={ticket.id} title={ticket.title} status={ticket.status} description={ticket.description} priority={ticket.priority} name={ticket.customer} date={ticket.createdAt} key={ticket.title}/>
          
          </React.Fragment>)
        })}
      </section>
    </>
  );
}

export default TicketsContainer;
