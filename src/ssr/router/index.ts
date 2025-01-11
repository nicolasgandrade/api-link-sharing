import { Router } from 'express';
import { getSSRPage } from '../controllers/page-ssr.controller';

const router = Router();

export default (): Router => {
  router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    const page = await getSSRPage(slug);
    if (!page) {
      res.status(404).send('Page not found');
      return;
    }

    res.render('page', page);
  });

  return router;
};
