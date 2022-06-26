import * as log from 'next/dist/build/output/log';
import { Middleware } from '@app/lib/api-handler';

// Simple example middleware that just outputs
// the method and url being requested.
// For example `GET /api/healthz`
export default (): Middleware =>
  ({ req }, next) => {
    log.info(`${req.method} ${req.url}`);

    return next();
  };
