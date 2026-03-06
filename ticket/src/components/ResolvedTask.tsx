import React from "react";
import { useTicketStore } from "../state/store";
import { AnimatePresence, motion } from "motion/react";
// type Props = {
//   ticketTitle?: string;
//   conditionalRender?: boolean;
// };
function ResolvedTask() {
  const { resolvedTickets } = useTicketStore();
  const length = resolvedTickets.length;
  return (
    <>
      <AnimatePresence>
        <div className="m-2 card w-94">
          <div className="flex flex-col gap-3 my-2 ">
            <h2 className="text-sm text-gray-500 text-center">
              Resolved Tasks
            </h2>
            {length > 0 ? (
              <></>
            ) : (
              <>
                <p className="text-xs text-gray-500 font-medium text-center">
                  No Resolved Tasks Yet
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {length > 0 ? (
              <>
                {resolvedTickets.map((ticket) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0,scale:0 }}
                      animate={{ opacity: 1,scale:1 }}
                      transition={{
                        duration:0.4,
                        scale:{
                          type:"spring",
                          visualDuration:0.4,
                          bounce:0.5
                        }
                      }}
                      exit={{opacity:0}}
                      key={ticket.id}
                      className="card w-90 card-xs shadow-sm  mx-2 shadow-blue-700 bg-gray-700"
        
                    >
                      <div className="card-body">
                        <h2 className="line-through card-title">{ticket.title}</h2>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default ResolvedTask;
