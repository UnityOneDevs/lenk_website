import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

interface Cached {
  conn: MongoClient | null
  promise: Promise<MongoClient> | null
}

declare global {
  var mongo: Cached | undefined
}

const cached: Cached = global.mongo || { conn: null, promise: null }

if (!global.mongo) {
  global.mongo = cached
}

export async function connectToDatabase(): Promise<{
  client: MongoClient
  db: Db
}> {
  if (cached.conn) {
    return { client: cached.conn, db: cached.conn.db(MONGODB_DB) }
  }

  if (!cached.promise) {
    const options = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }
    cached.promise = MongoClient.connect(MONGODB_URI as string, options)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return { client: cached.conn, db: cached.conn.db(MONGODB_DB) }
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase()
  return db
}
