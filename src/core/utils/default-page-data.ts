import { PageData } from '../entities/page/page-data';

export const defaultPageData = (creatorId: string): Omit<PageData, 'id'> => ({
  creatorId,
  slug: 'your-username',
  pictureUrl: 'https://avatar.iran.liara.run/public/43',
  title: 'Your name',
  subtitle: 'Write you role here!',
  bgColor: '#ffffff',
  textColor: '#333',
  linkButtons: [
    {
      label: 'Anything you want!',
      url: 'https://avatar.iran.liara.run/public/43',
      bgColor: '#000000',
      textColor: '#ffffff',
    },
  ],
});
