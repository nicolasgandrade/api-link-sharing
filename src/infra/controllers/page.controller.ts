import {
  badRequest,
  forbidden,
  notFound,
  ok,
} from '../../core/adapters/helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../core/adapters/ports/http';
import { isPageRequestValid } from '../../core/entities/page/validators/is-page-request-valid.validator';
import CreatePageUseCase from '../../core/usecases/create-page.usecase';
import { GetPageByIdUseCase } from '../../core/usecases/get-page-by-id.usecase';
import { GetPageByUserUseCase } from '../../core/usecases/get-user-page.usecase';
import { UpdatePageUseCase } from '../../core/usecases/update-page.usecase';
import { getUserIdFromHeaders } from '../adapters/helpers/get-user-id-from-headers';
import { PostgresPageRepository } from '../repositories/postgres-page.repository';

const pageRepository = new PostgresPageRepository();

const createPageUsecase = new CreatePageUseCase(pageRepository);
const updatePageUsecase = new UpdatePageUseCase(pageRepository);
const getPageByIdUseCase = new GetPageByIdUseCase(pageRepository);
const getPageByUserUsecase = new GetPageByUserUseCase(pageRepository);

export const createPage = async (req: HttpRequest): Promise<HttpResponse> => {
  const pageOrError = isPageRequestValid(req.body);
  if (pageOrError.isLeft()) {
    return badRequest(pageOrError.value);
  }

  const userId = getUserIdFromHeaders(req.headers);
  const createdPage = await createPageUsecase.execute({
    ...req.body,
    creatorId: userId,
  });

  return ok(createdPage);
};

export const updatePageById = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  const pageOrError = isPageRequestValid(req.body);
  if (pageOrError.isLeft()) {
    return badRequest(pageOrError.value);
  }

  const requesterId = getUserIdFromHeaders(req.headers);
  const pageId = req.params?.id;

  const result = await updatePageUsecase.execute(pageId, requesterId, req.body);

  if (result.isLeft()) {
    return forbidden(result.value);
  }

  return ok(result.value);
};

export const getPageByUser = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  const userId = getUserIdFromHeaders(req.headers);
  const pageOrNull = await getPageByUserUsecase.execute(userId);

  if (!pageOrNull) {
    return notFound({ name: 'Page not found', message: 'Page not found' });
  }

  return ok(pageOrNull);
};

export const getPageById = async (req: HttpRequest): Promise<HttpResponse> => {
  const pageOrUndefinded = await getPageByIdUseCase.execute(req.params?.id);

  if (!pageOrUndefinded) {
    return notFound({ name: 'Page not found', message: 'Page not found ' });
  }

  return ok(pageOrUndefinded);
};
