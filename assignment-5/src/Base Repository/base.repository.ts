// Create a Base Repository Definition

export type BaseRepository<T> = {
  // Define the CRUD operations
  create: (data: T) => Promise<T>;
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T | null>;
  update: (id: string, data: Partial<T>) => Promise<T | null>; // Partial<T> means it can be any property of T
  delete: (id: string) => Promise<T | null>;
  findAllPaginatedWithFilter: (
    filter: any,
    page: number,
    limit: number
  ) => Promise<T[]>;
};
