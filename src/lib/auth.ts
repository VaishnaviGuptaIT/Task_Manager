import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient, Db } from "mongodb";

let db: Db | null = null;
let authInstance: any = null;

export const getAuth = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  if (!authInstance) {
    if (!db) {
      const client = new MongoClient(MONGODB_URI, {
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
        retryWrites: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      });
      try {
        await client.connect();

        // Parse database name from connection string
        const url = new URL(MONGODB_URI);
        const dbName = url.pathname.slice(1) || "task-manager";

        db = client.db(dbName);

        // Test the connection by trying to list collections
        await db.listCollections().toArray();

        console.log("DB initialized:", db.databaseName);
        console.log("DB has collection method:", typeof db.collection);
      } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
      }
    }

    console.log("Creating auth instance with db:", db);

    authInstance = betterAuth({
      baseURL: process.env.NEXT_PUBLIC_APP_URL,
      trustedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL!,
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
      ].filter(Boolean),
      database: mongodbAdapter(db),
      emailAndPassword: {
        enabled: true,
      },
      session: {
        expiresIn: 60 * 60 * 24 * 7,
      },
    });

    console.log("Auth instance created successfully");
  }
  return authInstance;
};

let authExport: any = null;

export const auth = {
  api: {
    getSession: async (opts: any) => {
      const instance = await getAuth();
      return await instance.api.getSession(opts);
    },
  },
};
