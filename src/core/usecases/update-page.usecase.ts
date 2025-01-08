import { Either, left, right } from '../../shared/types/either';
import { Page } from '../entities/page/page';
import { PageData } from '../entities/page/page-data';
import { LinkButtonRepository } from '../repositories/link-button-repository';
import PageRepository from '../repositories/page-repository';

export class UpdatePageUseCase {
  private readonly pageRepo: PageRepository;
  private readonly linkBtnRepo: LinkButtonRepository;

  constructor(pageRepo: PageRepository, linkBtnRepo: LinkButtonRepository) {
    this.pageRepo = pageRepo;
    this.linkBtnRepo = linkBtnRepo;
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

    // TODO: Remove when the logic for updating buttons is implemented.
    // The front-end will need to send the button ids.
    await this.linkBtnRepo.deleteLinkButtons(
      this.findUnusedIds(
        existingPage.linkButtons.map((btn) => btn.id),
        pageData.linkButtons.map((btn) => btn.id)
      )
    );

    return right(updatedPage);
  }

  private findUnusedIds(prevIds: string[], newIds: string[]) {
    const spread = [...prevIds, ...newIds];
    return spread.filter((id) => prevIds.includes(id) && !newIds.includes(id));
  }
}
