import { from, map } from "rxjs";
import { useAppData } from "../store/State";
import Card from "./Card";
import { Link } from "react-router";
import { useObservableState } from "observable-hooks";

type Props = {};

function CatalogueHome({}: Props) {
  const { state } = useAppData();
  const cardsData = state.data
  const cards = cardsData.map((card) => ({
    title: card.title,
    downloads: card.downloads,
    ratings: card.ratings.reduce((acc,curr)=> acc+curr.count,0),
    image: card.image
  }));
  console.log(cards);
  
  return (
    <>
      <section className="flex-centered-y p-4">
        <div>
          <h2>Trending Apps</h2>
          <p>Explore all the Apps on the Market developed by us</p>
        </div>
        <div className="flex-centered-x flex-wrap lg:grid lg:grid-cols-4 gap-4 p-5">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <div className="flex-centered-x">
          <Link to="/apps" className="button-oulined btn-info">
            See All
          </Link>
        </div>
      </section>
    </>
  );
}

export default CatalogueHome;
