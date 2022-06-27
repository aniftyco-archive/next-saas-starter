import { NextApiRequest, NextApiResponse } from 'next';
import { get, has, set } from 'lodash';

export default class Context<Request = NextApiRequest, Response = NextApiResponse> {
  constructor(public req?: Request, public res?: Response) {}

  set(path: string, value: any) {
    return set(this, path, value);
  }

  get(path: string, defaultValue?: string) {
    return get(this, path, defaultValue);
  }

  has(path: string) {
    return has(this, path);
  }

  attach(obj: Record<string, any>) {
    for (const [key, value] of Object.entries(obj)) {
      this.set(key, value);
    }

    return this;
  }
}
