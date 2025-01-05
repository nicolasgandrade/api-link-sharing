import { HttpResponse } from '../ports/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { message: error.message },
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: { message: error.message },
});
