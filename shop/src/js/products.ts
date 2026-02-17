import { Catagories } from "./api/api";
import type { UISection } from "./main";
import { AppStore } from "./store/store";
import { ProductCard } from "./trending";
import { html } from "./utils";

export default function Products(): UISection {
  AppStore.fetchProducts();
  const menuCategories = ["all",...Catagories]
  return {
    render() {
      const { selectedCategory, products, isLoading } = AppStore.state;
      const filtered =
        selectedCategory === "all"
          ? products
          : products.filter((p) => {
              // Log this once to verify exactly what the API is sending
              return (
                p.category ===
                selectedCategory
              );
            });

      const section = html`
        <section class="m-5">
          <h2 class="text-3xl font-bold text-center">Our Products</h2>

          <div class="flex justify-center mt-5">
            <ul
              class="menu menu-md bg-base-200 md:menu-horizontal rounded-box md:menu-lg"
            >
              ${menuCategories.map(
                (c) => {

                  return html`
                  <li>
                    <button
                      class="${c.toLowerCase() === selectedCategory
                        ? "menu-active"
                        : ""}"
                      data-cat="${c}"
                    >
                      ${c.charAt(0).toUpperCase() + c.slice(1)}
                      
                    </button>
                  </li>
                `
                },
              )}
            </ul>
          </div>
          <div class="mt-10">
            ${isLoading
              ? html`<div class="text-center">Loading...</div>`
              : html`
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center"
                  >
                    ${filtered.length > 0
                      ? filtered.map((p) => ProductCard(p).render())
                      : html`<p class="col-span-full text-center py-10">
                          No products found for "${selectedCategory}"
                        </p>`}
                  </div>
                `}
          </div>
        </section>
      `;
      section.querySelectorAll("button[data-cat]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const newCat = (e.currentTarget as HTMLButtonElement).dataset.cat!;
          AppStore.setState({ selectedCategory: newCat });
        });
      });
      return section;
    },
  };
}
