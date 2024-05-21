import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

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
}

export default new JWT();
