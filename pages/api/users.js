import { getUsers, deleteUser } from "../../utils/database";


export default async function handler(req, res) {
  let id = req.body;

  if (req.method === 'GET') {
    users = await getUsers;
  } else if (req.method === 'DELETE') {
    user = await deleteUser(id);
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ users: users }));
}