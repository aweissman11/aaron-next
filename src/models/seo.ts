import type { ContentModel } from 'contentful-code-models';

export const seo: ContentModel = {
  sys: {
    id: 'seo',
  },
  name: 'SEO',
  description: 'Metadata for Search Engine Optimization',
  displayField: 'title',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      localized: true,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: true,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'ogDescription',
      name: 'OG Description',
      type: 'Text',
      localized: true,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'image',
      name: 'Image',
      type: 'Link',
      localized: true,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
      linkType: 'Asset',
    },
    {
      id: 'canonicalUrl',
      name: 'Canonical URL',
      type: 'Symbol',
      localized: true,
      required: false,
      validations: [
        {
          unique: true,
          message: 'This URL must be unique across the site.',
        },
      ],
      disabled: false,
      omitted: false,
    },
    {
      id: 'noIndex',
      name: 'No Index',
      type: 'Boolean',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: 'noFollow',
      name: 'No Follow',
      type: 'Boolean',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
  ],
  editorInterface: {
    controls: [
      {
        fieldId: 'title',
      },
      {
        fieldId: 'description',
      },
      {
        fieldId: 'ogDescription',
      },
      {
        fieldId: 'image',
      },
      {
        fieldId: 'canonicalUrl',
      },
      {
        fieldId: 'noIndex',
      },
      {
        fieldId: 'noFollow',
      },
    ],
  },
};
