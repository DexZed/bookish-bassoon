import type { UISection } from "./main";
import { html } from "./utils";

export default function Features():UISection{


    return {
    render() {
      const section = html`
      <section>
        <section class="m-10">
      <h2 class="text-3xl font-bold text-center">Why Choose Us</h2>
      <p class="text-grey-500 text-center mt-4">
        We provide the best shopping experience with top-notch services.
      </p>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 place-items-center">
      <div class="card w-96 bg-base-100 shadow-sm">
        <div class="card-body">
          <svg
            class="w-12 border-4 rounded-xl shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
              d="M32 160C32 124.7 60.7 96 96 96L384 96C419.3 96 448 124.7 448 160L448 192L498.7 192C515.7 192 532 198.7 544 210.7L589.3 256C601.3 268 608 284.3 608 301.3L608 448C608 483.3 579.3 512 544 512L540.7 512C530.3 548.9 496.3 576 456 576C415.7 576 381.8 548.9 371.3 512L268.7 512C258.3 548.9 224.3 576 184 576C143.7 576 109.8 548.9 99.3 512L96 512C60.7 512 32 483.3 32 448L32 160zM544 352L544 301.3L498.7 256L448 256L448 352L544 352zM224 488C224 465.9 206.1 448 184 448C161.9 448 144 465.9 144 488C144 510.1 161.9 528 184 528C206.1 528 224 510.1 224 488zM456 528C478.1 528 496 510.1 496 488C496 465.9 478.1 448 456 448C433.9 448 416 465.9 416 488C416 510.1 433.9 528 456 528z"
            />
          </svg>

          <div class="flex justify-between mt-4">
            <h2 class="text-xl font-bold">Fast Delivery</h2>
          </div>
          <div class="mt-2 flex flex-col gap-2 text-xs text-gray-500">
            <p>
              Get your orders delivered to your doorstep quickly and efficiently
            </p>
          </div>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-sm">
        <div class="card-body">
          <svg
            class="w-12 border-4 rounded-xl shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
              d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z"
            />
          </svg>
          <div class="flex justify-between mt-4">
            <h2 class="text-xl font-bold">24/7 Support</h2>
          </div>
          <div class="mt-2 flex flex-col gap-2 text-xs text-gray-500">
            <p>
              Our support team is available around the clock to support you.
            </p>
          </div>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-sm">
        <div class="card-body">
          <svg
            class="w-12 border-4 rounded-xl shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
              d="M320 64C324.6 64 329.2 65 333.4 66.9L521.8 146.8C543.8 156.1 560.2 177.8 560.1 204C559.6 303.2 518.8 484.7 346.5 567.2C329.8 575.2 310.4 575.2 293.7 567.2C121.3 484.7 80.6 303.2 80.1 204C80 177.8 96.4 156.1 118.4 146.8L306.7 66.9C310.9 65 315.4 64 320 64zM320 130.8L320 508.9C458 442.1 495.1 294.1 496 205.5L320 130.9L320 130.9z"
            />
          </svg>
          <div class="flex justify-between mt-4">
            <h2 class="text-xl font-bold">Secure Payment</h2>
          </div>
          <div class="mt-2 flex flex-col gap-2 text-xs text-gray-500">
            <p>
              Experience safe and secure transactions with our encrypted payment
              systems.
            </p>
          </div>
        </div>
      </div>
      <div class="card w-96 bg-base-100 shadow-sm">
        <div class="card-body">
          <svg
            class="w-12 border-4 rounded-xl shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
            <path
              d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"
            />
          </svg>

          <div class="flex justify-between mt-4">
            <h2 class="text-xl font-bold">Easy Returns</h2>
          </div>
          <div class="mt-2 flex flex-col gap-2 text-xs text-gray-500">
            <p>Not Satisfied? Return your products easily within 30 days.</p>
          </div>
        </div>
      </div>
    </section></section>
      `;
      return section;
    }
  };

}