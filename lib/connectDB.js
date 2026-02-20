


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Change 1: Don't throw an error if we are just BUILDING the app
if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
    console.warn("⚠️ MONGODB_URI is missing. This is okay during build time if not pre-rendering DB data.");
} else if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    
    if (!MONGODB_URI) return null;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "SokoDirect",
            bufferCommands: false, // Recommended for Next.js to avoid hanging
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}