import type { IProduct } from "./api/api";
import type { UISection } from "./main";
import { html } from "./utils";

export default function Details(product: IProduct): UISection {
  return {
    render() {
      const section = html`
        <dialog id="my_modal_3" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <form method="dialog">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 class="font-bold text-lg text-center mt-4">${product.title}</h3>
            <img src="${product.image}" class="w-32 mx-auto my-4" />
            <div class="flex flex-col">
              <div class="flex justify-between">
                <div class="badge badge-primary badge-outline badge-xs">
                  ${product.category}
                </div>
                <div class="flex gap-2">
                  <div class="rating rating-xs">
                    <input
                      type="radio"
                      name="rating-5"
                      class="mask mask-star-2 bg-orange-400"
                      aria-label="1 star"
                    />
                    ${product.rating.rate}(${product.rating.count})
                  </div>
                </div>
              </div>
              <p class="py-4">${product.description}</p>
            </div>

            <div class="flex justify-between">
              <button class="btn btn-outline btn-ghost"><i class="fa-solid fa-bag-shopping"></i>Buy Now</button>
              <button class="btn btn-outline btn-primary"><i class="fa-solid fa-cart-arrow-down"></i>Add to Cart</button>
            </div>
          </div>
        </dialog>
      `;
      return section;
    },
  };
}
