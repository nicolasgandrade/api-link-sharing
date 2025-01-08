import { LinkButtonRepository } from '../../core/repositories/link-button-repository';
import { AppDataSource } from '../db/datasource';
import { LinkButtonEntity } from '../db/entities/link-button.entity';

export class PostgresLinkButtonRepository implements LinkButtonRepository {
  private readonly db = AppDataSource.getRepository(LinkButtonEntity);

  deleteLinkButtons(ids: string[]): Promise<any> {
    if (!!ids.length) {
      return this.db.delete(ids);
    }
  }
}
