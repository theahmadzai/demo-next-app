export default function onError(error, req, res, next) {
  console.log(error)
  res.status(500).end()
}