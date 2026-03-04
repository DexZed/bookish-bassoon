import { tickets } from "../data/mocks";
import Tickets from "./Tickets";

type Props = {};

function TicketsContainer({}: Props) {

  const ticketsData = tickets;
  return (
    <>
      <section>
        {ticketsData.map((ticket)=>{
          return(
            <Tickets id={ticket.id} title={ticket.title} status={ticket.status} description={ticket.description} priority={ticket.priority} name={ticket.customer} date={ticket.createdAt} key={ticket.title}/>
          )
        })}
      </section>
    </>
  );
}

export default TicketsContainer;
