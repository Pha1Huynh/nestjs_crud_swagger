export interface IAuthResultDto {
  accessToken: string | null;
  encryptedAccessToken: string | null;
  expireInSeconds: Number | string;
  userId: Number | null;
}
