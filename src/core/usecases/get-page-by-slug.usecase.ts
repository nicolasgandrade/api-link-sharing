import { Page } from '../entities/page/page';
import { PageData } from '../entities/page/page-data';
import PageRepository from '../repositories/page-repository';

export class GetPageBySlug {
  private pageRepo: PageRepository;

  constructor(pageRepo: PageRepository) {
    this.pageRepo = pageRepo;
  }

  async execute(slug: string): Promise<Page> {
    const retrieved = await this.pageRepo.getPageBySlug(slug);
    const finalObject: PageData = { ...retrieved, creatorId: null };

    return finalObject;
  }
}
