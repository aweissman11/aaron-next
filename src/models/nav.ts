import { stylesOnlyRichText } from "@/models/shared/stylesOnlyRichText";
import { ContentModel } from "contentful-code-models";

export const nav: ContentModel = {
  sys: {
    id: "nav",
  },
  name: "Main Navigation",
  description: "Content type for the main navigation.",
  displayField: "internalTitle",
  fields: [
    {
      id: "internalTitle",
      name: "Internal Title",
      type: "Symbol",
      localized: false,
      required: true,
      // The below fields are used to enforce singleton behavior
      // disabled: true,
      defaultValue: {
        "en-US": "Main Navigation",
      },
      validations: [
        {
          unique: true,
          message: "This internal title must be unique across the site.",
        },
        {
          in: ["Main Navigation"],
          message:
            "The internal title must always be 'Main Navigation'. to enforce singleton behavior.",
        },
      ],
    },
    {
      ...stylesOnlyRichText,
      id: "title",
      name: "Title",
      required: true,
    },
    {
      id: "links",
      name: "Links",
      type: "Array",
      required: true,
      localized: false,
      omitted: false,
      disabled: false,
      items: {
        type: "Link",
        linkType: "Entry",
        validations: [
          {
            linkContentType: ["navLink"],
          },
        ],
      },
    },
  ],

  editorInterface: {
    controls: [
      {
        fieldId: "internalTitle",
        widgetId: "singleLine",
        widgetNamespace: "builtin",
        settings: {
          helpText: "This field is used to enforce singleton behavior.",
        },
      },
    ],
  },
};
