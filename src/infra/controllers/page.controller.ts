import { badRequest, ok } from '../../core/adapters/helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../core/adapters/ports/http';
import { isPageRequestValid } from '../../core/entities/page/validators/is-page-request-valid.validator';
import CreatePageUseCase from '../../core/usecases/create-page.usecase';
import { InMemoryPageRepository } from '../repositories/in-memory-page.repository';

const pageRepository = new InMemoryPageRepository();
const createPageUsecase = new CreatePageUseCase(pageRepository);

export const createPage = async (req: HttpRequest): Promise<HttpResponse> => {
  const pageOrError = isPageRequestValid(req.body);
  if (pageOrError.isLeft()) {
    return badRequest(pageOrError.value);
  }

  const createdPage = await createPageUsecase.execute(req.body);

  return ok(createdPage);
};
