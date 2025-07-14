import { ContentModel } from "contentful-code-models";

export const navLink: ContentModel = {
  sys: {
    id: "navLink",
  },
  name: "Navigation Link",
  description: "Content type for a navigation link.",
  displayField: "internalTitle",
  fields: [
    {
      id: "internalTitle",
      name: "Internal Title",
      type: "Symbol",
      localized: false,
      required: true,
    },
    {
      omitted: false,
      disabled: false,
      required: true,
      localized: false,
      linkType: "Entry",
      id: "link",
      name: "Link",
      type: "Link",
      validations: [
        {
          linkContentType: ["link"],
        },
      ],
    },
    {
      id: "links",
      name: "Links",
      type: "Array",
      required: false,
      localized: false,
      omitted: false,
      disabled: false,
      items: {
        type: "Link",
        linkType: "Entry",
        validations: [
          {
            linkContentType: ["generalContent"],
          },
        ],
      },
    },
    {
      id: "title",
      name: "Title",
      type: "RichText",
      localized: false,
      required: false,
      disabled: true,
      omitted: true,
      deleted: true,
    },
  ],
  editorInterface: {
    controls: [
      {
        fieldId: "link",
        widgetId: "entryLinkEditor",
        widgetNamespace: "builtin",
        settings: {
          helpText: "Use this field to link the nav button itself",
        },
      },
      {
        fieldId: "links",
        settings: {
          helpText:
            "Use this field when the nav button is also a dropdown with links to other pages",
          bulkEditing: false,
          showLinkEntityAction: true,
          showCreateEntityAction: true,
        },
        widgetId: "entryLinksEditor",
        widgetNamespace: "builtin",
      },
    ],
  },
};
