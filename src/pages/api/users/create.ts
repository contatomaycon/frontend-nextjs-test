import { NextApiRequest, NextApiResponse } from 'next/types';
import { IUser, IUserCreate } from '@/types/user.d';

const users: IUser[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email } = req.body as IUserCreate;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser: IUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  return res.status(201).json(newUser);
}