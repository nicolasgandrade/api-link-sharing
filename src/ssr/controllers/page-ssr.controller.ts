import { PostgresPageRepository } from '../../infra/repositories/postgres-page.repository';

const pageRepository = new PostgresPageRepository();

export const getSSRPage = async (slug: string) => {
  const result = await pageRepository.getPageBySlug(slug);
  return result;
};
