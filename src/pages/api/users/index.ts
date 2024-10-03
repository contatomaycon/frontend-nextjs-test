import { NextApiRequest, NextApiResponse } from 'next/types';
import { IUser } from '@/types/user.d';

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
	  const users: IUser[] = [
		{ id: 1, name: 'Carlos Silva', email: 'carlos.silva@example.com' },
		{ id: 2, name: 'Ana Oliveira', email: 'ana.oliveira@example.com' },
		{ id: 3, name: 'João Souza', email: 'joao.souza@example.com' },
		{ id: 4, name: 'Maria Costa', email: 'maria.costa@example.com' },
		{ id: 5, name: 'Lucas Pereira', email: 'lucas.pereira@example.com' },
		{ id: 6, name: 'Fernanda Lima', email: 'fernanda.lima@example.com' },
		{ id: 7, name: 'Ricardo Alves', email: 'ricardo.alves@example.com' },
		{ id: 8, name: 'Juliana Rocha', email: 'juliana.rocha@example.com' },
		{ id: 9, name: 'Paulo Mendes', email: 'paulo.mendes@example.com' },
		{ id: 10, name: 'Isabela Nunes', email: 'isabela.nunes@example.com' },
	  ];
  
	  return res.status(200).json(users);
	} else {
	  return res.status(405).json({ message: 'Method Not Allowed' });
	}
  };
