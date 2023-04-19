import * as dotenv from 'dotenv';
dotenv.config();
export const jwtConstants = {
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
};
