class Observable<T> {
  private observers: Set<(msg: T) => void> = new Set();

  constructor() {}

  subscribe(observer: (msg: T) => void): () => void {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  notifyObservers(msg: T): void {
    this.observers.forEach((observer) => observer(msg));
  }
}

class DataClass extends Observable<number> {
  constructor(public value: number) {
    super();
  }

  serValue(value: number) {
    this.value = value;
    this.notifyObservers(value);
  }
}
