import { DomainError } from './domain-error';

export class InvalidPageRequest extends Error implements DomainError {
  constructor() {
    super('Invalid body');
    this.name = 'InvalidPageRequest';
  }
}
