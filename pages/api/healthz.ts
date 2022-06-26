import handler from '@app/lib/api-handler';

export default handler.get(() => {
  return { status: 'OK' };
});
