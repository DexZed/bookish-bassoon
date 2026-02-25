class Maybe<T> {
  private constructor(private value: T | null) {}

  static some<T>(value: T) {
    if (value === null || value === undefined)
      throw Error("value cannot be null");
    return new Maybe<T>(value);
  }

  static none<T>() {
    return new Maybe<T>(null);
  }
  static fromValue<T>(value: T | null | undefined) {
    return value === null || value === undefined
      ? Maybe.none<T>()
      : Maybe.some<T>(value);
  }
  getOrElse(defaultValue: T) {
    return this.value ?? defaultValue;
  }
  map<R>(mapper: (value: T) => R): Maybe<R> {
    if (this.value === null || this.value === undefined) {
      return Maybe.none<R>();
    }
    return Maybe.fromValue(mapper(this.value));
  }
  flatMap<R>(mapper: (value: T) => Maybe<R>) {
    if (this.value === null || this.value === undefined) {
      return Maybe.none<R>();
    }
    return mapper(this.value);
  }
  match<R>(some: (value: T) => R, none: () => R): R{
    if(this.value===null||this.value===undefined){
      return none();
    }else{
      return some(this.value);
    }
  }
}

async function posts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts;
}
interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const data = Maybe.fromValue((await posts()) as Posts[]);
// console.log(data);

const user1Posts = data.map(users=>users.filter(user=>user.userId===1))
console.log(user1Posts);

