import { getProducts, type IProduct } from "./api/api";
import type { UISection } from "./main";
import { html, openModal } from "./utils";

export default function Trend(): UISection {
  
  return {
    render() {
      // 1. Create the container
      const container = html`<section id="trend-section" >
        <h2 class="text-3xl font-bold m-10 text-center md:text-left">Trending Now</h2>
        <div class="loader">Loading products...</div> 
      </section>`;

      // 2. Trigger the async load
      getProducts().then(data => {
        const trending = data.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
        
        // 3. Find the container and swap the loader for actual cards
        const grid = html`
          
          <div class="flex flex-col sm:flex-wrap sm:flex-row  lg:flex-wrap lg:flex-row justify-center gap-4 m-10 ">
            ${trending.map(p => ProductCard(p).render())}
          </div>
          
        `;
        
        container.querySelector('.loader')?.replaceWith(grid);
      });

      return container;
    },
  };
}
export function ProductCard(product: IProduct): UISection {
  return {
    render() {
      const section = html`
        <div class="card bg-base-100 w-80 shadow-xs border border-base-200">
          <figure>
            <img
              src="${product.image}"
              alt="${product.title}"
              class="h-48 object-contain"
            />
          </figure>
          <div class="card-body">
            <div class="flex justify-between">
              <div class="badge badge-primary badge-outline badge-xs">
                ${product.category}
              </div>
              <div class="flex gap-2">
              <div class="rating rating-xs">
                  <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                    </div>
                <p class="text-xs">
                ${product.rating.rate} (${product.rating.count})
              </p>
              </div>
              
            </div>
            <p class="truncate font-semibold">${product.title}</p>
            <h2 class="card-title text-sm font-bold">$ ${product.price}</h2>
            <div class="flex justify-between mt-5">
              <button class="btn btn-sm btn-outline view-details"><i class="fa-solid fa-circle-info"></i>Details</button>
              <button class="btn btn-sm btn-primary"><i class="fa-solid fa-cart-arrow-down"></i>Add to Cart</button>
            </div>
          </div>
        </div>
      `;
      section.querySelector(".view-details")?.addEventListener("click", () => {
        openModal(product);
      });
      return section;
    },
  };
}
