import { numberFomatter } from "../lib/utils";
import { useAppData } from "../store/State";
import Card from "./Card";
import { Link } from "react-router";

type Props = {};

function CatalogueHome({}: Props) {
  const { state } = useAppData();
  const cardsData = state.data;
  const cards = cardsData.map((card) => ({
    id: card.id,
    title: card.title,
    downloads: numberFomatter(card.downloads).toString(),
    ratings: numberFomatter(
      card.ratings.reduce((acc, curr) => acc + curr.count, 0),
    ).toString(),
    image: card.image,
  }));

  return (
    <>
      <section className="flex-centered-y p-4">
        <div>
          <h2>Trending Apps</h2>
          <p>Explore all the Apps on the Market developed by us</p>
        </div>
        <div className="flex-centered-x flex-wrap xl:grid xl:grid-cols-4 gap-4 p-5">
          {cards.slice(0,8).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <div className="flex-centered-x">
          <Link to="/apps" className="button-outlined btn-accent">
            See All
          </Link>
        </div>
      </section>
    </>
  );
}

export default CatalogueHome;
