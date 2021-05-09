import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connectToDB, posts } from '../../db'

export default function Posts({ posts }) {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      {posts.map(({ slug, title }) => (
        <div key={slug}>
          <Link href={`/posts/${slug}`}>
            <a>{title}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const { db } = await connectToDB()
  const postsFetched = await posts.getPosts(db)

  return {
    props: { posts: postsFetched },
  }
}
