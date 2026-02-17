// store.ts
type Listener = () => void;

interface AppState {
  user: string;
  cartCount: number;
  theme: 'light' | 'dark';
}

class Store {
  private static instance: Store;
  private _state: AppState;
  private listeners: Listener[] = [];

  // Private constructor prevents 'new Store()'
  private constructor() {
    this._state = {
      user: "Guest",
      cartCount: 0,
      theme: "light"
    };
  }

  // The only way to get the store
  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  // Getter for the state (Read-only access)
  public get state(): Readonly<AppState> {
    return this._state;
  }

  public subscribe(fn: Listener): void {
    this.listeners.push(fn);
  }

  public setState(newState: Partial<AppState>): void {
    this._state = { ...this._state, ...newState };
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach(fn => fn());
  }
}

// Export the instance directly for easy use
export const AppStore = Store.getInstance();