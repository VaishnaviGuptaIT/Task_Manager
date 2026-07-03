import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import { connectDB } from "./db";

let authInstance: any = null;

export const getAuth = () => {
  if (!authInstance) {
    if (!mongoose.connection.db) {
      connectDB();
    }
    authInstance = betterAuth({
      database: mongodbAdapter(mongoose.connection.db!),
      emailAndPassword: {
        enabled: true,
      },
      session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
      },
    });
  }
  return authInstance;
};

export const auth = new Proxy({} as any, {
  get(target, prop) {
    return getAuth()[prop];
  },
});
