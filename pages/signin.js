import React from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

export default function SignIn() {
  const router = useRouter()
  const [session, loading] = useSession()

  if (loading) return <div>Loading...</div>
  if (session) router.push('/')

  return (
    !session && (
      <div>
        <button onClick={() => signIn('github')}>Sign In with Github</button>
      </div>
    )
  )
}
