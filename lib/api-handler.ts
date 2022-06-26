import { NextApiRequest as Request, NextApiResponse as Response } from 'next';
import nc, { NextConnect, NextHandler, RequestHandler } from 'next-connect';
import * as log from 'next/dist/build/output/log';
import logMiddleware from '../middleware/logger';
import { APIError, InternalServerError, MethodNotAllowedError } from './errors';

const onNoMatch = (req: Request, res: Response) => {
  return new MethodNotAllowedError().render(req, res);
};

const onError = (err: APIError | Error, req: Request, res: Response) => {
  if (err instanceof APIError) {
    return err.render(req, res);
  }

  log.error(err.message);

  return new InternalServerError().render(req, res);
};

const proxyHandler = {
  get(_: any, method: string) {
    const instance = nc({ onNoMatch, onError });
    const handle = (action: any, handler: RequestHandler<Request, Response>) => {
      return action((req: Request, res: Response, next: NextHandler) => {
        return Promise.resolve(handler(req, res, next)).then(res.send.bind(res));
      });
    };

    instance.get = handle.bind(null, instance.get);
    instance.head = handle.bind(null, instance.head);
    instance.options = handle.bind(null, instance.options);
    instance.post = handle.bind(null, instance.post);
    instance.put = handle.bind(null, instance.put);
    instance.patch = handle.bind(null, instance.patch);
    instance.delete = handle.bind(null, instance.delete);

    return instance.use(logMiddleware)[method].bind(instance);
  },
};

export const handler = new Proxy({}, proxyHandler) as NextConnect<Request, Response>;

export default handler;
