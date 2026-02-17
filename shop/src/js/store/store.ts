import type { IProduct } from "../api/api";

// store.ts
type Listener = () => void;

interface AppState {
  user: string;
  cartCount: number;
  theme: "light" | "dark";
  selectedCategory: string;
  products: IProduct[]; // New: Cache storage
  isLoading: boolean; // New: Loading state
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
      theme: "light",
      selectedCategory: "all",
      products: [],
      isLoading: false,
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
    this.listeners.forEach((fn) => fn());
  }
  public async fetchProducts() {
    // Only fetch if we don't have them yet
    if (this._state.isLoading || this._state.products.length > 0) {
    return;
  }
    this.setState({ isLoading: true });
    try {
      const { getProducts } = await import("../api/api"); // Lazy load API
      const data = await getProducts();
      this.setState({ products: data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch", error);
      this.setState({ isLoading: false });
    }
  }
}
// Export the instance directly for easy use
export const AppStore = Store.getInstance();
