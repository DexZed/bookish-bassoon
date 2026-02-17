import type { UISection } from "../main";

interface Route {
  path: string;
  view: () => UISection; // Explicitly require a UISection return
}

const routes: Route[] = [
  { path: "/error", view: () => ({ render: () => {
    const template = document.createElement('template');
      template.innerHTML = `
        <section class="hero">
          Error Page
        </section>
      `.trim();
      return template.content.firstElementChild as HTMLElement;
  } }) },
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

// export default async function router() {

//   // Test each route for matches
//   const potentialMatches = routes.map((route) => {
//     return {
//       route: route,
//       isMatch: location.pathname === route.path,
//     };
//   });
//   console.log(potentialMatches);

//   let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
//   if (!match) {
//     match = {
//       route: routes[0],
//       isMatch: true,
//     };
//   }

// }

export default function router(): UISection {
  const match = routes.find((r) => location.pathname === r.path);

  // Always return a UISection, even if there's no match (fallback to error)
  return match ? match.view() : routes[0].view();
}
