import { Page } from '../page/page';

export interface LinkButton {
  id: string;
  label: string;
  url: string;
  textColor: string;
  bgColor: string;
  page?: Page;
}
