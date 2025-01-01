import { HttpResponse } from '../ports/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: { message: error.message },
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
});
