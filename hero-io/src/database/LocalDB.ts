class Database {
  private data: Record<string, any> = {};

  private static instance: Database;

  private constructor() {}
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  public set(key: string, value: any): void {
    this.data[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
  }
  public get(key: string): any {
    return localStorage.getItem(key);
  }
  public has(key: string): boolean {
    return key in this.data ? true : false;
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
    delete this.data[key];
  }
  public getAll(): Record<string, any> {
    const data = localStorage.getItem("data");
    if (data) {
      this.data = JSON.parse(data);
    }
    return this.data;
  }
  public clear(): void {
    localStorage.clear();
    this.data = {};
  }
}
const database = Database.getInstance();
export default database;
