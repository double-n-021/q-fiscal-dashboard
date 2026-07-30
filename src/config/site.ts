import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

export const siteConfig = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  ogImage: `${SITE_URL}/images/og-image.png`,
  links: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
  },
  creator: 'Velora Team',
};
