import { EntitySchema } from 'typeorm';
import { PageData } from '../../../core/entities/page/page-data';

type PageEntityData = PageData;

export const PageEntity = new EntitySchema<PageEntityData>({
  name: 'Page',
  tableName: 'pages',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    creatorId: {
      type: String,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    pictureUrl: {
      type: String,
    },
    bgColor: {
      type: String,
    },
    textColor: {
      type: String,
    },
  },
  relations: {
    linkButtons: {
      type: 'one-to-many',
      target: 'LinkButton',
      inverseSide: 'page',
      cascade: true,
    },
  },
  indices: [
    {
      name: 'IDX_PAGE_SLUG',
      unique: true,
      columns: ['slug'],
    },
    {
      name: 'IDX_PAGE_CREATOR',
      unique: true,
      columns: ['creatorId'],
    },
  ],
});
