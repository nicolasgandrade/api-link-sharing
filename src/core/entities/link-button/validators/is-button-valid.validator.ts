import { Either, left, right } from '../../../../shared/types/either';
import { InvalidButtonError } from '../../errors/invalid-button.error';
import { LinkButton } from '../link-button';

export const isButtonValid = (
  button: LinkButton
): Either<InvalidButtonError, LinkButton> => {
  if (!button.bgColor || !button.label || !button.textColor || !button.url) {
    return left(new InvalidButtonError());
  }

  return right(button);
};
