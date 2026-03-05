import React from "react";

type Props = {
  ticketTitle?: string;
  conditionalRender?: boolean;
};
function ResolvedTask({ ticketTitle, conditionalRender }: Props) {
  return (
    <>
      <div className="m-2">
        <div className="flex flex-col gap-3 my-2 ">
          <h2 className="text-sm text-gray-700">Resolved Tasks</h2>
          <p className="text-xs text-gray-500 font-medium">
            No Resolved Tasks Yet
          </p>
        </div>
        {conditionalRender ? (
          <>
            <div className="card w-96 bg-base-100 card-xs shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{ticketTitle ?? "No Data"}</h2>
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

export default ResolvedTask;
