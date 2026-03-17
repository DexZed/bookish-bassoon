
import { useAppData } from "../store/State";
import Card from "./Card";
import { Link } from "react-router";

type Props = {};

function CatalogueHome({}: Props) {
    const {state  } = useAppData();
    console.log(state.data);
  return (
    <>
      <section className="flex-centered-y p-4">
        <div>
          <h2>Trending Apps</h2>
          <p>Explore all the Apps on the Market developed by us</p>
        </div>
        <div className="flex-centered-x flex-wrap lg:grid lg:grid-cols-4 gap-4 p-5">
          {}
        </div>
        <div className="flex-centered-x">
          <Link to="/apps" className="button-oulined btn-info">See All</Link>
        </div>
      </section>
    </>
  );
}

export default CatalogueHome;

