import { LinkButton } from '../link-button/link-button';
import { PageData } from './page-data';

export class Page {
  readonly id: string;
  readonly creatorId: string;
  readonly slug: string;
  readonly pictureUrl: string;
  readonly title: string;
  readonly subtitle: string;
  readonly bgColor: string;
  readonly textColor: string;
  readonly linkButtons: LinkButton[];

  constructor(pageData: PageData) {
    this.id = pageData.id;
    this.creatorId = pageData.creatorId;
    this.slug = pageData.slug;
    this.pictureUrl = pageData.pictureUrl;
    this.title = pageData.title;
    this.subtitle = pageData.subtitle;
    this.bgColor = pageData.bgColor;
    this.textColor = pageData.textColor;
    this.linkButtons = pageData.linkButtons;
  }
}
