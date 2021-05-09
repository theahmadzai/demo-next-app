import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getSession, useSession, signOut } from 'next-auth/client'

export default function Home({ session }) {
  const { name, email, image } = session.user

  return (
    <div>
      <div>
        <button>
          <Link href="/posts">Posts</Link>
        </button>
        <button>
          <Link href="/posts/create">Create Post</Link>
        </button>
      </div>
      <Image width={64} height={64} src={image} alt={name} />
      <p>{name}</p>
      <p>{email}</p>
      <button onClick={signOut}>Sign out</button>
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
    props: { session },
  }
}
