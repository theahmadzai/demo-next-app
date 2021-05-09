import nc from 'next-connect'
import middleware from '../../middleware/all'
import onError from '../../middleware/error'
import { posts } from '../../db'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.post(async (req, res) => {
  const { title, body } = req.body

  const newPost = await posts.createPost(req.db, {
    slug: title.split(' ').join('-'),
    title,
    body,
  })

  res.send({ data: newPost })
})

export default handler
