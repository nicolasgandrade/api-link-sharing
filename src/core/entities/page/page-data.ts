import { LinkButton } from './link-button';

export interface PageData {
  id: string;
  pictureUrl: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  linkButtons: LinkButton[];
}
