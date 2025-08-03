import mongoose from "mongoose";

export class MongoConnection {
  private mongoUrl!: string;
  private static instance: MongoConnection;
  private isConnected = false;
  private constructor() {}
  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      console.log("MongoDB Already Connected");
      return;
    }
    try {
      await mongoose.connect(uri);
      this.isConnected = true;
      console.log("MongoDB Connected");
    }
    catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    return mongoose.disconnect().then(() => {
      this.isConnected = false;
      console.log("MongoDB Disconnected");
    });
  }

  public connectionStatus(): void {
    mongoose.connection.on("open", () => console.log("open"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("reconnected", () => console.log("reconnected"));
    mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
    mongoose.connection.on("close", () => console.log("close"));
  }
}
