import mongoose, { type Mongoose } from "mongoose";

// NOTE: the URI is read lazily inside connectToDatabase() — NOT at module load.
// Next.js imports route modules while building ("Collecting page data"), and a
// module-level throw there would fail the whole build even though the variable
// is only needed at request time.

/**
 * In development Next.js clears the module cache on every request, which would
 * open a brand new DB connection each time and quickly exhaust the pool.
 * We cache the connection on the global object to reuse it across hot reloads.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  global._mongooseCache ?? { conn: null, promise: null };

global._mongooseCache = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  // Read at call time so the build never depends on this being present.
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Add it to .env.local locally, " +
        "or to your hosting provider's Environment Variables in production.",
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
