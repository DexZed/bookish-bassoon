import '../css/style.css'
import Footer from './footer';
import Navbar from './navbar';
import router from './router/routes';



export interface UISection {
  render():HTMLElement;
}

function buildUi() {
  const app = document.querySelector<HTMLDivElement>("#app")!;

  // 2. Compose the layout: Static + Dynamic + Static
  const components = [
    Navbar().render(), 
    router().render(), 
    Footer().render()
  ];

  app.replaceChildren(...components);
}

function Main() {
  // Listen for back/forward browser buttons
  window.addEventListener("popstate", buildUi);

  document.addEventListener('DOMContentLoaded', () => {
    buildUi(); // Initial load

    document.body.addEventListener('click', e => {
      const link = (e.target as HTMLElement).closest('a');
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        history.pushState(null, "", link.href);
        buildUi(); // Re-render on navigation
      }
    });
  });
}
Main();