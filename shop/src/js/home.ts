import Features from "./features";
import Hero from "./hero";
import type { UISection } from "./main";
import Trend from "./trending";
import { html } from "./utils";

export default function Home(): UISection {
  return {
    render() {
      return html`<section>${Hero().render()} ${Features().render()}${Trend().render()}</section>`;
    },
  };
}
