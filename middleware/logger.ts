import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import { NextHandler } from 'next-connect';
import * as log from 'next/dist/build/output/log';

export default (req: Request, res: Response, next: NextHandler) => {
  log.event(`${req.method} ${req.url}`);

  next();
};
