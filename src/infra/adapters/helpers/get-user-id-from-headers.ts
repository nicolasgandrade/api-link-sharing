import { IncomingHttpHeaders } from 'http';
import { jwtDecode } from 'jwt-decode';

export const getUserIdFromHeaders = (headers: IncomingHttpHeaders) => {
  return jwtDecode(headers?.authorization).sub;
};
