import { EntitySchema } from 'typeorm';

export const LinkButtonEntity = new EntitySchema({
  name: 'LinkButton',
  tableName: 'link-buttons',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    label: {
      type: String,
    },
    url: {
      type: String,
    },
    textColor: {
      type: String,
    },
    bgColor: {
      type: String,
    },
  },
  relations: {
    page: {
      type: 'many-to-one',
      target: 'Page',
      joinColumn: {
        name: 'pageId',
      },
    },
  } as any,
});
