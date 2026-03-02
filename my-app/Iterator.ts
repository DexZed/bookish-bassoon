import type { Pokemon } from "./Visitor";

class DataIterator<T> implements AsyncIterator<T[]>, AsyncIterable<T[]> {
  constructor(private baseUrl: string) {}
  async next(): Promise<IteratorResult<T[]>> {
    if (this.baseUrl) {
      const response = await fetch(this.baseUrl);
      const data = (await response.json()) as { results: T[]; next: string };
      this.baseUrl = data.next;
      return { value: data.results, done: false };
    } else {
      return { value: undefined, done: true };
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}

// const iterator = new DataIterator<Pokemon[]>("https://pokeapi.co/api/v2/pokemon");
// for await (const data of iterator) {
//   console.log(data);
// }

// Functional Variant

async function* dataIterator(baseUrl: string): AsyncGenerator<Pokemon[]> {
    let url : string | null = baseUrl;
    do {
        const response = await fetch(url);
        const data = (await response.json()) as { results: Pokemon[]; next: string };
        url = data.next;
        yield data.results;
    } while (url);

}

const iterator2 = dataIterator("https://pokeapi.co/api/v2/pokemon");
for await (const data of iterator2) {
  console.log(data);
}