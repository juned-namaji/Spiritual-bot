import mongoose, { Mongoose } from 'mongoose';

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function dbConnect(): Promise<Mongoose> {
  if (global.mongoose && global.mongoose.conn) {
    console.log("Db already connected");
    return global.mongoose.conn;
  } else {
    const mongoLink = process.env.MONGODB_URI || '';
    if (!mongoLink) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    const promise = mongoose.connect(mongoLink, {
      autoIndex: true,
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("Connection with db has been established");

    return await promise;
  }
}
