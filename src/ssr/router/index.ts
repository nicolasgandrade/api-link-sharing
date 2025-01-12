import { Router } from 'express';
import { PostgresPageRepository } from '../../infra/repositories/postgres-page.repository';

const router = Router();
const pageRepository = new PostgresPageRepository();

export default (): Router => {
  router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    const page = await pageRepository.getPageBySlug(slug);
    if (!page) {
      res.status(404).send('Page not found');
      return;
    }

    res.render('page', page);
  });

  return router;
};
