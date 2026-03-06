import ResolvedTask from "./ResolvedTask";
import TaskStatus from "./TaskStatus";

type Props = {};

function TrackingContainer({}: Props) {
  return (
    <>
      <section className="flex flex-col w-96 mt-5 gap-5 bg-base-100 shadow-sm rounded-lg mx-auto">
        <TaskStatus />
        <hr />
        <ResolvedTask />
      </section>
    </>
  );
}

export default TrackingContainer;
