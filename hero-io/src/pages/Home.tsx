import Hero from "../components/Hero";
import Stats from "../components/Stats";

type Props = {};

function Home({}: Props) {
  return (
    <>
      <Hero />
      <Stats />
    </>
  );
}

export default Home;
