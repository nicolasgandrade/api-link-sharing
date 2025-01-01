import { LinkButton } from './link-button';
import { PageData } from './page-data';

export class Page {
  private id: string;
  private pictureUrl: string;
  private title: string;
  private subtitle: string;
  private bgColor: string;
  private textColor: string;
  private linkButtons: LinkButton[];

  constructor(pageData: PageData) {
    this.id = pageData.id;
    this.pictureUrl = pageData.pictureUrl;
    this.title = pageData.title;
    this.subtitle = pageData.subtitle;
    this.bgColor = pageData.bgColor;
    this.textColor = pageData.textColor;
    this.linkButtons = pageData.linkButtons;
  }
}
