import { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextHandler } from 'next-connect';
import * as log from 'next/dist/build/output/log';
import Context from './context';
import { APIError, InternalServerError, MethodNotAllowedError } from './errors';

export type Primatives = string | number | boolean | Date;
export type HandlerResponse = Primatives | Record<string, Primatives> | Primatives[] | Record<string, Primatives>[];

export type Handler<Request = NextApiRequest, Response = NextApiResponse<HandlerResponse>> = (
  context: Context<Request, Response>,
  next: NextHandler
) => HandlerResponse | Promise<HandlerResponse>;

export type Middleware<Request = NextApiRequest, Response = NextApiResponse<HandlerResponse>> = (
  context: Context<Request, Response>,
  next: NextHandler
) => void | Promise<void>;

const onNoMatch = (req: NextApiRequest, res: NextApiResponse<HandlerResponse>) => {
  return new MethodNotAllowedError().render(req, res);
};

const onError = (err: APIError | Error, req: NextApiRequest, res: NextApiResponse) => {
  if (err instanceof APIError) {
    return err.render(req, res);
  }

  log.error(err.message);

  return new InternalServerError().render(req, res);
};

const handle = (context: Context, action: Function, handler: Handler) => {
  return action((req: NextApiRequest, res: NextApiResponse<HandlerResponse>, next: NextHandler) => {
    return Promise.resolve(handler(context.attach({ req, res }), next)).then(res.send.bind(res));
  });
};

const middleware = (
  context: Context,
  use: Function,
  ...wares: Middleware<NextApiRequest, NextApiResponse<HandlerResponse>>[]
) => {
  return use(
    '/',
    wares.map((ware) => async (req: NextApiRequest, res: NextApiResponse<HandlerResponse>, next: NextHandler) => {
      return ware(context.attach({ req, res }), next);
    })
  );
};

const proxyHandler: ProxyHandler<{}> = {
  get(_: any, method: string) {
    const instance = nc({ onNoMatch, onError });
    const context = new Context();

    instance.get = handle.bind(null, context, instance.get);
    instance.head = handle.bind(null, context, instance.head);
    instance.options = handle.bind(null, context, instance.options);
    instance.post = handle.bind(null, context, instance.post);
    instance.put = handle.bind(null, context, instance.put);
    instance.patch = handle.bind(null, context, instance.patch);
    instance.delete = handle.bind(null, context, instance.delete);
    instance.use = middleware.bind(null, context, instance.use);

    return instance[method].bind(instance);
  },
};

interface APIHandler<Request = NextApiRequest, Response = NextApiResponse<HandlerResponse>> {
  (context: Context<Request, Response>): any | Promise<any>;
  all<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  get<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  head<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  post<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  put<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  delete<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  options<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  trace<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  patch<ReqExt = {}, ResExt = {}>(handler: Handler<Request & ReqExt, Response & ResExt>): this;
  use<ReqExt = {}, ResExt = {}>(...middleware: Middleware<Request & ReqExt, Response & ResExt>[]): this;
}

export const handler = new Proxy({}, proxyHandler) as APIHandler<NextApiRequest, NextApiResponse<HandlerResponse>>;

export default handler;
