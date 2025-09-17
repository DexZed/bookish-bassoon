import type mongoose from "mongoose";

import type { BaseRepository } from "./base.repository";

// Define generic repository from base repository
export class GenericRepository<T extends mongoose.Document> implements BaseRepository<T> {
  private readonly model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    return await this.model.create(item);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async update(id: string | mongoose.Types.ObjectId, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async findAllPaginatedWithFilter(filter: any, page: number, limit: number): Promise<T[]> {
    return await this.model.find(filter).skip((page - 1) * limit).limit(limit).exec();
  }
}
