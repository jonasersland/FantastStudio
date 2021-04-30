export default {
    name: 'workAsset',
    title: 'Image file',
    type: 'object',
    fields: [
        {
        name: 'image',
        title: 'Bildefil',
        type: 'image',
        },
      {
        name: 'caption',
        title: 'Bildetekst',
        type: 'blockContent',
      },
    ],
    preview: {
      select: {
        media: 'image',
        title: 'caption',
      },
    },
  }
  