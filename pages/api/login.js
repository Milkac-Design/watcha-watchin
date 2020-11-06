export default function handler(req, res) {
  console.log(req.body);
  res.send({ success: true });
}
