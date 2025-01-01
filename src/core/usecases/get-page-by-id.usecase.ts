import { Page } from '../entities/page/page';
import PageRepository from '../repositories/page-repository';

export class GetPageByIdUseCase {
  private pageRepo: PageRepository;

  constructor(pageRepo: PageRepository) {
    this.pageRepo = pageRepo;
  }

  async execute(id: string): Promise<Page> {
    const retrieved = await this.pageRepo.getById(id);
    return retrieved;
  }
}
