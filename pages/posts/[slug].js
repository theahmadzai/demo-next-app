import React from 'react'
import { useRouter } from 'next/router'
import { connectToDB, posts } from '../../db'

export default function Post({ post }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { title, body } = post

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const { db } = await connectToDB()
  const fetchedPosts = await posts.getPosts(db)

  return {
    paths: fetchedPosts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params

  const { db } = await connectToDB()
  const post = await posts.getPost(db, slug)

  return {
    props: { post },
  }
}
