import type { ITicket } from "../interfaces/DataInterfaces";
import { useTicketStore } from "../state/store";

type Props = {
  ticketProps: ITicket;
};

function Tickets(tcks: Props) {
  const { ticketProps } = tcks;
  const { toggleSelection } = useTicketStore();

  const handleClick = () => {
    toggleSelection(ticketProps);
  };

  return (
    <>
      <div
        tabIndex={0}
        onClick={handleClick}
        className="card card-sm bg-base-100 shadow-lg shadow-blue-700 m-5 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:shadow-pink-600 focus:shadow-lg "
      >
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="text-md font-bold">{ticketProps.title}</h2>
            {statusChecker(ticketProps.status)}
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              {ticketProps.description}
            </p>
          </div>
          <div className="flex justify-between mt-4 gap-5 flex-wrap">
            <div className="card-actions grid grid-flow-col place-self-center ">
              <span className="text-xs text-gray-500 font-medium mr-2 ">
                # {ticketProps.id.slice(0, 5) + "..."}
              </span>
              {priorityChecker(ticketProps.priority)}
            </div>
            <div className="card-actions grid grid-flow-col place-self-center">
              <span className="text-xs text-gray-500 font-medium">
                {ticketProps.customer},
              </span>
              <span className="text-xs text-gray-500 font-medium flex gap-1">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                </svg>
                {new Date(ticketProps.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;

function priorityChecker(priority?: string) {
  switch (priority) {
    case "HIGH PRIORITY":
      return (
        <>
          <span className="text-red-500 font-bold text-xs text-wrap">
            {priority}
          </span>
        </>
      );
    case "MEDIUM PRIORITY":
      return (
        <>
          <span className="text-orange-500 font-bold text-xs text-wrap">
            {priority}
          </span>
        </>
      );
    case "LOW PRIORITY":
      return (
        <>
          <span className="text-green-500 font-bold text-xs text-wrap">
            {priority}
          </span>
        </>
      );
    default:
      return (
        <>
          <span className="text-rose-400">No Data</span>
        </>
      );
  }
}

function statusChecker(status?: string) {
  switch (status) {
    case "Open":
      return (
        <>
          <span className="badge badge-xs badge-accent font-bold">
            {status}
          </span>
        </>
      );
    case "In-Progress":
      return (
        <>
          <span className="badge badge-xs badge-warning font-bold">
            {status}
          </span>
        </>
      );
    default:
      return (
        <>
          <span className="text-rose-400">No Data</span>
        </>
      );
  }
}
