import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

export default function CreatePost() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleCreatePost = async (e) => {
    e.preventDefault()

    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    })

    router.push('/posts')
  }

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
