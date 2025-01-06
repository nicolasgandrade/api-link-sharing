import { Page } from '../entities/page/page';
import PageRepository from '../repositories/page-repository';

export class GetPageByUserUseCase {
  private pageRepo: PageRepository;

  constructor(pageRepo: PageRepository) {
    this.pageRepo = pageRepo;
  }

  async execute(userId: string): Promise<Page | null> {
    const retrieved = await this.pageRepo.getByUserId(userId);
    return retrieved;
  }
}
