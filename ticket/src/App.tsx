import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Status from "./components/Status";
import { StatusContent } from "./components/StatusContent";

function App() {
  return (
    <>
      <Nav />
      <div className="flex gap-5 flex-wrap justify-center m-5">
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
      </div>
      <Footer />
    </>
  );
}

export default App;
