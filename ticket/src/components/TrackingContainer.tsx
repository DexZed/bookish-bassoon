import ResolvedTask from "./ResolvedTask";
import TaskStatus from "./TaskStatus";


type Props = {};

function TrackingContainer({}: Props) {
  return (
    <>
      <section className="flex flex-col w-1/4 mt-5 gap-5">
        <TaskStatus conditionalRender={false}/>
        <ResolvedTask conditionalRender={false}/>
        </section>
    </>
  );
}

export default TrackingContainer;
