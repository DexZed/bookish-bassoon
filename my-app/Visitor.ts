class DataVisitor<T> {
  constructor(private baseUrl: string) {}
  async visit(visitor: (data: T[]) => void) {
    let nextUrl = this.baseUrl;
    do {
      const response = await fetch(nextUrl);
      const data = (await response.json()) as { results: T[]; next: string };
      visitor(data.results);
      nextUrl = data.next;
    } while (nextUrl);
  }
}

export interface Pokemon {
  name: string;
  url: string;
}

// const visitor = new DataVisitor<Pokemon[]>("https://pokeapi.co/api/v2/pokemon");
// visitor.visit((data) => {
//   console.log(data);
// });
