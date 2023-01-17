import handler from 'next-saas';
import requestId from '@app/middleware/request-id';
import requestLog from '@app/middleware/request-log';

export default handler.use(requestId(), requestLog()).get(() => {
  return { status: 'OK' };
});
