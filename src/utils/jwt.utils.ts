import { sign, type JwtPayload, decode } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export type AccountType = 'Admin' | 'Coach' | 'Vendors' | '' | null;

export type JwtValue = JwtPayload & TokenValue;

export interface TokenValue {
  id: string;
  accountType: AccountType;
  username: string;
  isVerified: boolean;
}

class JWT {
  public createAppToken() {
    return sign(
      {
        id: 'API GATEWAY',
        accountType: 'Admin',
        username: 'API GATEWAY',
        isVerified: true,
      },
      process.env.SECRET,
    );
  }

  public decodeToken(token: string) {
    return decode(token) as TokenValue;
  }
}

export default new JWT();
