import { connectToDB } from '../db'

export default async function database(req, res, next) {
  const { db, dbClient } = await connectToDB()

  req.db = db
  req.dbClient = dbClient

  next()
}
