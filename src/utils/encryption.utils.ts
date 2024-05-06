import { AES, enc } from 'crypto-ts';
import { config } from 'dotenv';

config();

class Encryption {
  public encrypt(data: string) {
    return AES.encrypt(
      data.replace(/\s/g, '_'),
      process.env.ENCRYPTION_KEY,
    ).toString();
  }

  public decrypt(data: string) {
    return AES.decrypt(data, process.env.ENCRYPTION_KEY)
      .toString(enc.Utf8)
      .replace(/_/g, ' ');
  }

  public validateChar(data: string) {
    return /[^a-zA-Z0-9.,_:*#\-\s@]/g.test(data);
  }
}

export default new Encryption();
