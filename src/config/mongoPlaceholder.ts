import mongoose from 'mongoose';

// Simple connector: call at startup if you want Mongo. In mock mode we skip.
export async function connectMongo(uri: string) {
  if (!uri) throw new Error('Missing MONGO_URI');
  const conn = await mongoose.connect(uri);
  return conn.connection;
}
