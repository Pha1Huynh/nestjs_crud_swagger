import { ConfigService } from '@nestjs/config';
import { IAuthResultDto } from 'src/interface/iAuthResult';
configService: ConfigService;
export const AuthResultDto: IAuthResultDto = {
  accessToken: null,
  encryptedAccessToken: 'thisisomerandomtext',
  expireInSeconds: process.env.ACCESS_TOKEN_EXPIRED,
  userId: null,
};
