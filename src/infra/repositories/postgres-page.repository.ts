import { Page } from '../../core/entities/page/page';
import { PageData } from '../../core/entities/page/page-data';
import PageRepository from '../../core/repositories/page-repository';
import { AppDataSource } from '../db/datasource';
import { PageEntity } from '../db/entities/page.entity';

export class PostgresPageRepository implements PageRepository {
  private readonly db = AppDataSource.getRepository(PageEntity);

  add(page: Omit<PageData, 'id'>): Promise<Page> {
    return this.db.save(page);
  }

  update(page: PageData): Promise<Page> {
    return this.db.save(page);
  }

  getById(id: string): Promise<Page | null> {
    return this.db.findOne({ where: { id } });
  }

  getByUserId(userId: string): Promise<Page | null> {
    return this.db.findOne({
      where: { creatorId: userId },
      relations: { linkButtons: true },
    });
  }

  getPageBySlug(slug: string): Promise<Page | null> {
    return this.db.findOne({
      where: { slug },
      relations: { linkButtons: true },
    });
  }
}
