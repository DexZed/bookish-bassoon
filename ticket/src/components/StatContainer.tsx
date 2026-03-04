import Status from "./Status";
import { StatusContent } from "./StatusContent";

type Props = {};

function StatContainer({}: Props) {
  return (
    <>
      <section className="flex gap-5 flex-wrap justify-center m-5">
        {StatusContent.map((item) => (
          <Status
            title={item.title}
            count={item.count}
            date={item.date}
            icon={item.icon}
            image={item.backgroundImage}
            key={item.title}
          />
        ))}
      </section>
    </>
  );
}

export default StatContainer;
