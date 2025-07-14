import { complexRichText } from '@/models/shared/complexRichText';
import { stylesOnlyRichText } from '@/models/shared/stylesOnlyRichText';
import type { ContentModel } from 'contentful-code-models';

export const generalContent: ContentModel = {
  sys: {
    id: 'generalContent',
  },
  name: 'General Content',
  description: 'Content type for general content blocks.',
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
      ...stylesOnlyRichText,
      id: 'pretext',
      name: 'Pretext',
    },
    {
      ...stylesOnlyRichText,
      id: 'title',
      name: 'Title',
    },
    {
      ...complexRichText,
      id: 'body',
      name: 'Body',
    },
    {
      id: 'asset',
      name: 'Asset',
      type: 'Link',
      localized: false,
      required: false,
      validations: [
        {
          linkMimetypeGroup: ['image', 'video'],
        },
      ],
      disabled: false,
      omitted: false,
      linkType: 'Asset',
    },
    {
      id: 'link',
      name: 'Link',
      type: 'Link',
      localized: false,
      required: false,
      validations: [
        {
          linkContentType: ['link'],
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
        widgetId: 'singleLine',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'pretext',
        settings: {
          helpText:
            'This is not always shown. Whether this is rendered depends on the usage of this entry',
        },
        widgetId: 'richTextEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'title',
        widgetId: 'richTextEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'body',
        widgetId: 'richTextEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'asset',
        widgetId: 'assetLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'link',
        widgetId: 'entryLinkEditor',
        widgetNamespace: 'builtin',
      },
      {
        fieldId: 'image',
        widgetId: 'assetLinkEditor',
        widgetNamespace: 'builtin',
      },
    ],
  },
};
