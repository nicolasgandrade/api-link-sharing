import { Router } from 'express';
import pageRoutes from './page.router';

const router = Router();

export default (): Router => {
  pageRoutes(router);

  return router;
};
