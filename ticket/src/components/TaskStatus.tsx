import { useTicketStore } from "../state/store";

// type Props = {
//   ticketTitle?: string;
//   conditionalRender?: boolean;
// };

function TaskStatus() {
  const { selectedTickets } = useTicketStore();
  const length = selectedTickets.length;
  return (
    <>
      <div>
        <div className="flex flex-col gap-3 m-2 ">
          <h2 className="text-sm text-gray-700">Task Status</h2>
          {length > 0 ? (
            <></>
          ) : (
            <p className="text-xs text-gray-500 font-medium">
              Select a ticket to add Task Status
            </p>
          )}
        </div>
        {length > 0 ? (
          <>
            {selectedTickets.map((ticket) => {
              return (
                <div className="card w-96 bg-base-100 card-xs shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title">{ticket.title}</h2>

                    <div className="card-actions">
                      <button className="btn btn-accent btn-outline w-full">
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
    </>
  );
}

export default TaskStatus;
