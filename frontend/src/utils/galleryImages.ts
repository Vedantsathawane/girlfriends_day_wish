export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  aspectRatio: 'aspect-square' | 'aspect-video' | 'aspect-[3/4]' | 'aspect-[4/3]';
  type: 'image' | 'video';
}

export const galleryImages: GalleryItem[] = [
  {
    id: '1',
    url: '/love-assets/whatsapp_image1.jpeg',
    caption: 'My absolute favorite picture of us. Holding your hand is holding my entire world.',
    aspectRatio: 'aspect-[3/4]',
    type: 'image'
  },
  {
    id: '3',
    url: '/love-assets/101.jpeg',
    caption: 'That beautiful smile that lights up my entire world.',
    aspectRatio: 'aspect-square',
    type: 'image'
  },
  {
    id: '4',
    url: '/love-assets/2.jpeg',
    caption: 'Cozy moments, coffee cups, and absolute peace.',
    aspectRatio: 'aspect-[3/4]',
    type: 'image'
  },
  {
    id: '5',
    url: '/love-assets/3.jpeg',
    caption: 'The sparkle in your eyes that I fall in love with every day.',
    aspectRatio: 'aspect-[4/3]',
    type: 'image'
  },
  {
    id: '6',
    url: '/love-assets/4.jpeg',
    caption: 'Watching the sunset and talking about our dreams.',
    aspectRatio: 'aspect-video',
    type: 'image'
  },
  {
    id: '7',
    url: '/love-assets/5.jpeg',
    caption: 'Every ordinary day becomes extraordinary with you.',
    aspectRatio: 'aspect-[3/4]',
    type: 'image'
  }
];
