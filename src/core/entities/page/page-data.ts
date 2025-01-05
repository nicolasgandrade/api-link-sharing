import { LinkButton } from '../link-button/link-button';

export interface PageData {
  id: string;
  slug: string;
  pictureUrl: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  linkButtons: LinkButton[];
}
