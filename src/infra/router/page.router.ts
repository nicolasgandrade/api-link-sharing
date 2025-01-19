import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route.adapter';
import {
  getPageBySlug,
  getPageByUser,
  updatePageByUser,
} from '../controllers/page.controller';

export default (router: Router) => {
  router.get('/users/:userId/page', adaptRoute(getPageByUser));
  router.put('/users/:userId/page', adaptRoute(updatePageByUser));
  router.get('/pages/:slug', adaptRoute(getPageBySlug));
};
