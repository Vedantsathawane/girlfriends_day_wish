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
    url: '/love-assets/101.jpeg',
    caption: 'My absolute favorite picture of us. Holding your hand is holding my entire world.',
    aspectRatio: 'aspect-[3/4]',
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
    caption: 'That beautiful smile that lights up my entire world.',
    aspectRatio: 'aspect-[4/3]',
    type: 'image'
  },
  {
    id: '6',
    url: '/love-assets/4.jpeg',
    caption: 'Your laughter is my favorite sound in the universe.',
    aspectRatio: 'aspect-video',
    type: 'image'
  },
  {
    id: '8',
    url: '/love-assets/1001.jpeg',
    caption: 'A magical night filled with lights, color, and my favorite person by my side.',
    aspectRatio: 'aspect-[3/4]',
    type: 'image'
  }
];
