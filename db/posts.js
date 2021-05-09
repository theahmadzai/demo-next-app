import { nanoid } from 'nanoid'

export const createPost = async (db, post) =>
  db
    .collection('posts')
    .insertOne({
      _id: nanoid(12),
      ...post,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

export const getPosts = async (db) => db.collection('posts').find({}).toArray()

export const getPost = async (db, slug) =>
  db.collection('posts').findOne({ slug })
