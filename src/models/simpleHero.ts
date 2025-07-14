import type { ContentModel } from 'contentful-code-models';

export const simpleHero: ContentModel = {
  sys: {
    id: 'simpleHero',
  },
  name: 'Simple Hero',
  description:
    'Content type for a simple hero section with a title and subtitle.',
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
      id: 'heroType',
      name: 'Hero Type',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          in: ['simple', 'complex'],
        },
      ],
      defaultValue: {
        'en-US': 'simple',
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
        fieldId: 'heroType',
      },
    ],
  },
};
