import { NextApiRequest, NextApiResponse } from 'next';

export default class Context<Request = NextApiRequest, Response = NextApiResponse> {
  constructor(public req?: Request, public res?: Response) {}

  attach(obj: Record<string, any>) {
    for (const [key, value] of Object.entries(obj)) {
      this[key] = value;
    }

    return this;
  }
}
