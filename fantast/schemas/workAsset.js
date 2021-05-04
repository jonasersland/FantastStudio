export default {
    name: 'workAsset',
    title: 'Image file',
    type: 'object',
    fields: [
        {
        name: 'image',
        title: 'Image file',
        type: 'image',
        },
      {
        name: 'caption',
        title: 'Image caption',
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
  