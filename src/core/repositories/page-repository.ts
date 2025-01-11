import { Page } from '../entities/page/page';
import { PageData } from '../entities/page/page-data';

export default interface PageRepository {
  add: (page: Omit<PageData, 'id'>) => Promise<Page>;
  update: (page: PageData) => Promise<Page>;
  getById: (id: string) => Promise<Page | null>;
  getByUserId: (userId: string) => Promise<Page | null>;
  getPageBySlug: (slug: string) => Promise<Page | null>;
}
