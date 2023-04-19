import { APP } from 'src/constants';
import { IUserResDTO } from './../../interface/iUserResDTO';

const VERSION = APP.VERSION;
const RELASE_DATE = APP.RELASE_DATE;

export const UserResDTO: IUserResDTO = {
  result: {
    application: {
      version: VERSION,
      releaseDate: RELASE_DATE,
      features: {},
    },
    user: null,
    tenant: null,
  },
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
  __abp: true,
};
