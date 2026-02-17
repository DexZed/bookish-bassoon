import type { UISection } from "./main";
import logo from "../../public/logo.png";
import { html } from "./utils";

export default function Navbar(): UISection {
  const links = `
    <li>
    <a href="/" class="text-purple-500" data-link>Home</a></li>
        <li><a href="/products" data-link>Products</a></li>
        <li><a href="/about" data-link>About</a></li>
        <li><a href="/contact" data-link>Contact</a></li>
  `;
  return {
    render() {
      const section = html`
    <section>
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabindex="-1"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              ${links}
            </ul>
          </div>
          <div class="flex">
            <!-- Fix this later -->
            <div class="w-10 h-10 cover" style="background-image: url(${logo})"></div>
            <a
            class="btn btn-ghost text-xl text-purple-500 libre-baskerville"
            style="--font-weight: 700; --font-style: italic"
            >SwiftCart</a
          >
          </div>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            ${links}
          </ul>
        </div>
        <div class="navbar-end">
          <a class="btn btn-neutral btn-outline"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
      </div>
    </section>
    `;

      return section;
    },
  };
}
