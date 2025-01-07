import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route.adapter';
import {
  createPage,
  getPageById,
  getPageByUser,
  updatePageById,
} from '../controllers/page.controller';

export default (router: Router) => {
  router.post('/pages', adaptRoute(createPage));
  router.get('/users/:userId/page', adaptRoute(getPageByUser));
  router.get('/pages/:id', adaptRoute(getPageById));
  router.put('/pages/:id', adaptRoute(updatePageById));
};
