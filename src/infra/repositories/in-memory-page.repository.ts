import { Page } from '../../core/entities/page/page';
import { PageData } from '../../core/entities/page/page-data';
import PageRepository from '../../core/repositories/page-repository';

export class InMemoryPageRepository implements PageRepository {
  update: (page: PageData) => Promise<Page>;
  getByUserId: (userId: string) => Promise<Page | null>;

  getPageBySlug: (slug: string) => Promise<Page | null>;
  pages: Page[] = [];

  add(page: Omit<PageData, 'id'>): Promise<Page> {
    const newPage = new Page({ ...page, id: this.pages.length.toString() });
    this.pages.push(newPage);

    return Promise.resolve(newPage);
  }

  getById(id: string): Promise<Page | undefined> {
    return Promise.resolve(this.pages.find((page) => page.id === id));
  }
}
