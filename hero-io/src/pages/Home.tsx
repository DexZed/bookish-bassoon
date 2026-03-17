import CatalogueHome from "../components/CatalogueHome";
import Hero from "../components/Hero";
import Stats from "../components/Stats";

type Props = {};

function Home({}: Props) {
  return (
    <>
      <Hero />
      <Stats />
      <CatalogueHome />
    </>
  );
}

export default Home;
