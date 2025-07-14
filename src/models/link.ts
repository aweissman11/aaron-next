import type { ContentModel } from 'contentful-code-models';

export const link: ContentModel = {
  sys: {
    id: 'link',
  },
  name: 'Link',
  description: 'Content type for links to other entries or assets.',
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
      id: 'text',
      name: 'Text',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'ref',
      name: 'Reference',
      type: 'Link',
      localized: false,
      required: true,
      validations: [
        {
          linkContentType: ['landingPage'],
        },
      ],
      disabled: false,
      omitted: false,
      linkType: 'Entry',
    },
  ],
  editorInterface: {
    controls: [
      {
        fieldId: 'internalTitle',
      },
      {
        fieldId: 'text',
      },
      {
        fieldId: 'ref',
      },
    ],
  },
};
