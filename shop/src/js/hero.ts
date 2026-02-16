import type { UISection } from "./main";
import bannerImage from '../../public/banner-image.png'

export default function Hero():UISection{
    return {
    render: () => `
    <section>
      <div
        class="hero min-h-screen"
        style="background-image: url(${bannerImage})"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content text-neutral-content text-center">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">
              Discover The Best Collection For You
            </h1>
            <p class="mb-5">
              Discover the latest trends in fashion, electronics and more. Shop
              with <br />confidence and style at SwiftCart.
            </p>
            <button class="btn btn-primary">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
`,
  };
}