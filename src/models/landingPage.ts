import type { ContentModel } from 'contentful-code-models';

export const landingPage: ContentModel = {
  sys: {
    id: 'landingPage',
  },
  name: 'Landing Page',
  description: 'Content type for landing pages.',
  displayField: 'internalTitle',
  fields: [
    {
      id: 'internalTitle',
      name: 'Internal Title',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          unique: true,
          message: 'This internal title must be unique across the site.',
        },
      ],
      disabled: false,
      omitted: false,
    },
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      localized: false,
      required: true,
      validations: [
        {
          unique: true,
          message: 'This slug must be unique across the site.',
        },
      ],
      disabled: false,
      omitted: false,
    },
    {
      id: 'seo',
      name: 'SEO',
      type: 'Link',
      localized: false,
      required: true,
      validations: [
        {
          linkContentType: ['seo'],
        },
      ],
      disabled: false,
      omitted: false,
      linkType: 'Entry',
    },
    {
      id: 'hero',
      name: 'Hero',
      type: 'Link',
      localized: false,
      required: false,
      validations: [
        {
          linkContentType: ['hero'],
        },
      ],
      disabled: false,
      omitted: false,
      linkType: 'Entry',
    },
    {
      id: 'modules',
      name: 'Modules',
      type: 'Array',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      items: {
        type: 'Link',
        validations: [
          {
            linkContentType: ['fiftyFifty'],
          },
        ],
        linkType: 'Entry',
      },
    },
  ],
  editorInterface: {
    controls: [
      {
        fieldId: 'internalTitle',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'slug',
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'seo',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'hero',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'modules',
        settings: {
          helpText: 'The main content of the page goes here',
          bulkEditing: false,
          showLinkEntityAction: true,
          showCreateEntityAction: true,
        },
        widgetId: 'entryLinksEditor',
        widgetNamespace: 'builtin',
      },
    ],
  },
};
