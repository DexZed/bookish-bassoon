type Props = {
  ticketTitle?: string;
  conditionalRender?: boolean;
};

function TaskStatus({
  ticketTitle,
  conditionalRender,
}: Props) {
  return (
    <>
      <div>
        <div className="flex flex-col gap-3 my-2">
          <h2 className="text-sm text-gray-700">Task Status</h2>
          <p className="text-xs text-gray-500 font-medium">
            Select a ticket to add Task Status
          </p>
        </div>
        {conditionalRender ? (
          <>
            <div className="card w-96 bg-base-100 card-xs shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{ticketTitle ?? "No Data"}</h2>

                <div className="card-actions">
                  <button
                   
                    className="btn btn-accent btn-outline w-full"
                  >
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default TaskStatus;
