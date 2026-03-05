import { useTicketStore } from "../state/store";

// type Props = {
//   ticketTitle?: string;
//   conditionalRender?: boolean;
// };

function TaskStatus() {
  const { selectedTickets, resolveTicket } = useTicketStore();
  const length = selectedTickets.length;
  return (
    <>
      <div>
        <div className="flex flex-col gap-3 m-2 card w-94">
          <h2 className="text-sm text-gray-500 text-center">Task Status</h2>
          {length > 0 ? (
            <></>
          ) : (
            <p className="text-xs text-gray-500 font-medium text-center">
              Select a ticket to add Task Status
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {length > 0 ? (
            <>
              {selectedTickets.map((ticket) => {
                return (
                  <div
                    key={ticket.id}
                    className="card w-90 bg-base-100 card-xs shadow-sm mx-2 shadow-blue-700"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{ticket.title}</h2>

                      <div className="card-actions">
                        <button
                          onClick={() => resolveTicket(ticket.id)}
                          className="btn btn-accent btn-outline w-full"
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskStatus;
