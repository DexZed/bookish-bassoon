import { useEffect, useEffectEvent, useMemo, useState } from "react";
import Card from "../components/Card";
import { numberFomatter } from "../lib/utils";
import { useAppData } from "../store/State";
import { BehaviorSubject, debounceTime } from "rxjs";
import { motion } from "motion/react";
import { div } from "motion/react-client";

type Props = {};

function Catalogue({}: Props) {
  const { state } = useAppData();
  const cardsData = state.data;
  const cards = useMemo(
    () =>
      cardsData.map((card) => ({
        id: card.id,
        title: card.title,
        downloads: numberFomatter(card.downloads).toString(),
        ratings: numberFomatter(
          card.ratings.reduce((acc, curr) => acc + curr.count, 0),
        ).toString(),
        image: card.image,
      })),
    [cardsData],
  );
  const count = cards.length;
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useEffectEvent(() => {
    const subject = new BehaviorSubject("");
    const subscription = subject.pipe(debounceTime(300)).subscribe((value) => {
      setSearchText(value);
    });
    return () => subscription.unsubscribe();
  });
  useEffect(() => {
    debouncedSearch();
  }, []);
  const filteredCards = useMemo(() => {
    if (!searchText) {
      return cards;
    }
    return cards.filter((card) =>
      card.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [cards, searchText]);
  const latestLength = filteredCards ? filteredCards.length : count;

  return (
    <section className="flex-centered-y h-full">
      <div className="flex-centered-y">
        <h2>All Applications</h2>
        <p>Explore all apps on our platform.</p>
      </div>
      <div className="flex justify-between p-10 w-full">
        <div>({latestLength}) Apps Found</div>
        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
            />
          </label>
        </div>
      </div>
      <div className="flex-centered-x flex-wrap xl:grid xl:grid-cols-4 gap-4 mb-5">
        {filteredCards.map((item, idx) => {
          return <Card key={idx} {...item} />;
        })}
      </div>
    </section>
  );
}

export default Catalogue;
