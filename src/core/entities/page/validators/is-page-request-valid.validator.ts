import { Either, left, right } from '../../../../shared/types/either';
import { InvalidPageRequest } from '../../errors/invalid-page-request.error';
import { Page } from '../page';

export const isPageRequestValid = (
  requestBody: any
): Either<InvalidPageRequest, Omit<Page, 'id'>> => {
  if (
    !requestBody?.slug ||
    !requestBody?.pictureUrl ||
    !requestBody?.title ||
    !requestBody?.subtitle ||
    !requestBody?.bgColor ||
    !requestBody?.textColor
  ) {
    return left(new InvalidPageRequest());
  }

  return right(requestBody as Omit<Page, 'id'>);
};
