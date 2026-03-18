import type { AppData } from "../interfaces/InterfaceDefinitions";

class Database<T> {
  // The specific key used in localStorage
  private readonly STORAGE_KEY = "data_storage";
  private data: Partial<T>[] = [];
  
  private static instance: Database<any>;

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance<U>(): Database<U> {
    if (!Database.instance) {
      Database.instance = new Database<U>();
    }
    return Database.instance;
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        // Parse the object and extract the array
        const parsed = JSON.parse(stored);
        this.data = parsed.data_storage || [];
      } catch (e) {
        this.data = [];
      }
    }
  }

  private persist(): void {
    // This creates the exact structure: {"data_storage": [...]}
    const wrapper = { [this.STORAGE_KEY]: this.data };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wrapper));
  }

  // Adds a new partial item to the array
  public add(value: Partial<T>): void {
    this.data.push(value);
    this.persist();
  }

  // Returns the entire array
  public getAll(): Partial<T>[] {
    return this.data;
  }

  public clear(): void {
    this.data = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// Usage:
const database = Database.getInstance<AppData>();
export default database;