import { Either, left, right } from '../../shared/types/either';
import { Page } from '../entities/page/page';
import { PageData } from '../entities/page/page-data';
import PageRepository from '../repositories/page-repository';

export class UpdatePageUseCase {
  private readonly pageRepo: PageRepository;

  constructor(repo: PageRepository) {
    this.pageRepo = repo;
  }

  async execute(
    userId: string,
    pageData: PageData
  ): Promise<Either<Error, Page>> {
    const existingPage = await this.pageRepo.getByUserId(userId);
    const isUserCreator = existingPage?.creatorId === userId;

    if (!isUserCreator) {
      return left(new Error('Forbiden'));
    }

    const updatePayload: PageData = {
      ...pageData,
      id: existingPage.id,
      creatorId: existingPage.creatorId,
    };
    const updatedPage = await this.pageRepo.update(updatePayload);

    return right(updatedPage);
  }
}
