import { IMethod } from '@/types/method';
import { NextApiRequest, NextApiResponse } from 'next/types';

export function ApiMethod(method: IMethod) {
  return function (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse
    ) => Promise<NextApiResponse | void>
  ) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
      if (req.method !== method) {
        return res.status(405).json({
          ok: false,
          message: 'Method not allowed',
          ptMessage: 'Método não permitido',
        });
      }

      return handler(req, res);
    };
  };
}
