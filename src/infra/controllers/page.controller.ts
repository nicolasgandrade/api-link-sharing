import {
  badRequest,
  forbidden,
  notFound,
  ok,
} from '../../core/adapters/helpers/http-helper';
import { HttpRequest, HttpResponse } from '../../core/adapters/ports/http';
import { isPageRequestValid } from '../../core/entities/page/validators/is-page-request-valid.validator';
import CreatePageUseCase from '../../core/usecases/create-page.usecase';
import { GetPageBySlug } from '../../core/usecases/get-page-by-slug.usecase';
import { GetPageByUserUseCase } from '../../core/usecases/get-user-page.usecase';
import { UpdatePageUseCase } from '../../core/usecases/update-page.usecase';
import { defaultPageData } from '../../core/utils/default-page-data';
import { getUserIdFromHeaders } from '../adapters/helpers/get-user-id-from-headers';
import { PostgresLinkButtonRepository } from '../repositories/postgres-link-button.repository';
import { PostgresPageRepository } from '../repositories/postgres-page.repository';

const pageRepository = new PostgresPageRepository();
const linkBtnRepository = new PostgresLinkButtonRepository();

const createPageUsecase = new CreatePageUseCase(pageRepository);
const updatePageUsecase = new UpdatePageUseCase(
  pageRepository,
  linkBtnRepository
);
const getPageByUserUsecase = new GetPageByUserUseCase(pageRepository);
const getPageBySlugUseCase = new GetPageBySlug(pageRepository);

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

export const updatePageByUser = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  const pageOrError = isPageRequestValid(req.body);
  if (pageOrError.isLeft()) {
    return badRequest(pageOrError.value);
  }

  const requesterId = getUserIdFromHeaders(req.headers);
  const userIdParam = req.params?.userId;
  if (requesterId !== userIdParam) {
    return forbidden({ name: 'Forbidden', message: 'Forbidden' });
  }

  const result = await updatePageUsecase.execute(requesterId, req.body);
  if (result.isLeft()) {
    return forbidden(result.value);
  }

  return ok(result.value);
};

export const getPageByUser = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  const requesterId = getUserIdFromHeaders(req.headers);
  const userIdParam = req.params.userId;
  if (requesterId !== userIdParam) {
    return forbidden({ name: 'Forbidden', message: 'Forbidden' });
  }

  const pageOrNull = await getPageByUserUsecase.execute(requesterId);
  if (!pageOrNull) {
    const newPage = await createPageUsecase.execute(
      defaultPageData(requesterId)
    );
    return ok(newPage);
  }

  return ok(pageOrNull);
};

export const getPageBySlug = async (
  req: HttpRequest
): Promise<HttpResponse> => {
  const slug = req.params.slug;
  if (!slug?.trim()) {
    return badRequest({ name: 'Bad Request', message: 'Slug cannot be null' });
  }

  const userId = getUserIdFromHeaders(req.headers);
  const pageOrNull = await getPageBySlugUseCase.execute(
    req.params.slug,
    userId
  );

  if (!pageOrNull) {
    return notFound({ name: 'Not Found', message: 'Page not found' });
  }

  return ok(pageOrNull);
};
