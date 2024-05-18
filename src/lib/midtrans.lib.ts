import { CoreApi } from 'midtrans-client';

export default class MtCore {
  protected readonly coreApi = new CoreApi({
    isProduction: process.env.NODE_ENV === 'production',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });
}
