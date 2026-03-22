import type { AppData } from "../interfaces/InterfaceDefinitions";
import { useEffect, useState } from "react";

class Database<T> {
  // The specific key used in localStorage
  private readonly STORAGE_KEY = "data_storage";
  private data: Partial<T>[] = [];
  private listeners: (() => void)[] = [];
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
  this.notify();
}

  // Returns the entire array
  public getAll(): Partial<T>[] {
    return this.data;
  }
  private notify() {
    this.listeners.forEach((l) => l());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  public clear(): void {
  this.data = [];
  localStorage.removeItem(this.STORAGE_KEY);
  this.notify();
}
}

// Usage:
const database = Database.getInstance<AppData>();

export function useDatabase() {
  const [data, setData] = useState(database.getAll());

  useEffect(() => {
    const unsubscribe = database.subscribe(() => {
      setData([...database.getAll()]);
    });

    return unsubscribe;
  }, []);

  return {
    data,
    addItem: database.add.bind(database),
    clearAll: database.clear.bind(database),
  };
}