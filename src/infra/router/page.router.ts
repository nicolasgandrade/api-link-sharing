import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route.adapter';
import { createPage } from '../controllers/page.controller';

export default (router: Router) => {
  router.post('/pages', adaptRoute(createPage));
};
