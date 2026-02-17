import type { UISection } from "../main";
import { html } from "../utils";

interface Route {
  path: string;
  view: (params?: string[]) => UISection; // Explicitly require a UISection return
}

const routes: Route[] = [
  { path: "/", view: () => ({ render: () => {
    const template = document.createElement('template');
      template.innerHTML = `
        <section class="hero">
          Home Page
        </section>
      `.trim();
      return template.content.firstElementChild as HTMLElement;
  } })},
  {
    path: "/products",
    view: () => ({ render: () => {
    const template = document.createElement('template');
      template.innerHTML = `
        <section class="hero">
         Products Page
        </section>
      `.trim();
      return template.content.firstElementChild as HTMLElement;
  } }),
  },
  {
    path: "/products/:id",
    view: (params: string[]|undefined) => ({ render: () => {
    const template = document.createElement('template');
      template.innerHTML = `
        <section class="hero">
         Products Page Id: ${params?.[0]} 
        </section>
      `.trim();
      return template.content.firstElementChild as HTMLElement;
  } }),
  },
  {
    path: "/about",
    view: () => ({ render: () => {
    const template = document.createElement('template');
      template.innerHTML = `
        <section class="hero">
          About Page
        </section>
      `.trim();
      return template.content.firstElementChild as HTMLElement;
  } }),
  },
  {
    path: "/contact",
   view: () => ({ render: () => {
    const template = document.createElement('template');
      template.innerHTML = `
        <section class="hero">
          Contact Page
        </section>
      `.trim();
      return template.content.firstElementChild as HTMLElement;
  } }),
  },
];

export function getRouteParams(routePath: string) {
  const currentPath = location.pathname;
  
  // Replace :param with a regex capture group
  const regex = new RegExp("^" + routePath.replace(/:[^\s/]+/g, "([^/]+)") + "$");
  const match = currentPath.match(regex);

  if (match) {
    // Extract the values
    return match.slice(1); 
  }
  return null;
}
export default function router(): UISection {
 for (const route of routes) {
    const params = getRouteParams(route.path);
    if (params) {
      // Pass the params (like product ID) to the view
      return route.view(params); 
    }
  }
  return { render: () => {
    const section = html`
        <section class="hero">
          Error Page
        </section>
      `;
      return section;
  } };
}
