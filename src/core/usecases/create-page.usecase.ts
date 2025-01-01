import { PageData } from '../entities/page/page-data';
import PageRepository from '../repositories/page-repository';

export default class CreatePageUseCase {
  private pageRepo: PageRepository;

  constructor(pageRepo: PageRepository) {
    this.pageRepo = pageRepo;
  }

  async execute(pageCreationData: Omit<PageData, 'id'>) {
    const persisted = await this.pageRepo.add(pageCreationData);
    return persisted;
  }
}
