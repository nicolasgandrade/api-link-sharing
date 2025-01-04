import { DomainError } from './domain-error';

export class InvalidButtonError extends Error implements DomainError {
  constructor() {
    super('Invalid body');
    this.name = 'InvalidButton';
  }
}
