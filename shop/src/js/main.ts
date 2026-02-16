import '../css/style.css'
import Footer from './footer';
import Hero from './hero';
import Navbar from './Navbar';


export interface UISection {
  render():string;
}

function buildUi(ui: UISection[]) {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.replaceChildren(
    ...ui.map(section => {
      const el = document.createElement("div");
      el.innerHTML = section.render();
      return el.firstElementChild!;
    }),
  );
}

const UI: UISection[] = [Navbar(),Hero(),Footer()];

buildUi(UI);
