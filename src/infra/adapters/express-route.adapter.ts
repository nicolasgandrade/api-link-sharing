import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from '../../core/adapters/ports/http';

export const adaptRoute = (fn: any) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse: HttpResponse = await fn(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
