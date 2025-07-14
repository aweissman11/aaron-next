import type { ContentModel } from 'contentful-code-models';

export const fiftyFifty: ContentModel = {
  sys: {
    id: 'fiftyFifty',
  },
  name: 'Fifty Fifty',
  description:
    'Content type for a fifty fifty section with a title and subtitle.',
  displayField: 'internalTitle',
  fields: [
    {
      id: 'internalTitle',
      name: 'Internal Title',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'content',
      name: 'Content',
      type: 'Link',
      localized: false,
      required: true,
      validations: [
        {
          linkContentType: ['generalContent'],
        },
      ],
      disabled: false,
      omitted: false,
      linkType: 'Entry',
    },
    {
      id: 'orientation',
      name: 'Orientation',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['Image left', 'Image right'],
        },
      ],
      defaultValue: {
        'en-US': 'Image left',
      },
      disabled: false,
      omitted: false,
    },
    {
      id: 'mobileOrientation',
      name: 'Mobile Orientation',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['Image top', 'Image bottom'],
        },
      ],
      defaultValue: {
        'en-US': 'Image top',
      },
      disabled: false,
      omitted: false,
    },
  ],
  editorInterface: {
    controls: [
      {
        fieldId: 'internalTitle',
      },
      {
        fieldId: 'content',
      },
      {
        fieldId: 'orientation',
      },
      {
        fieldId: 'mobileOrientation',
      },
    ],
  },
};
