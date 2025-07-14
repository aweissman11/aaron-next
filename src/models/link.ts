import type { ContentModel } from "contentful-code-models";

export const link: ContentModel = {
  sys: {
    id: "link",
  },
  name: "Link",
  description: "Content type for links to other entries or assets.",
  displayField: "internalTitle",
  fields: [
    {
      id: "internalTitle",
      name: "Internal Title",
      type: "Symbol",
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "text",
      name: "Text",
      type: "Symbol",
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
    },
    {
      id: "url",
      name: "URL",
      type: "Symbol",
      localized: false,
      required: false,
      validations: [
        {
          regexp: {
            pattern:
              "^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$",
            flags: "",
          },
        },
      ],
    },
    {
      id: "ref",
      name: "Reference",
      type: "Link",
      localized: false,
      required: true,
      validations: [
        {
          linkContentType: ["landingPage"],
        },
      ],
      disabled: false,
      omitted: false,
      linkType: "Entry",
    },
  ],
  editorInterface: {
    controls: [
      {
        fieldId: "url",
        settings: {
          helpText:
            "Enter a URL to link to. If a reference is set, this will be ignored.",
        },
      },
      {
        fieldId: "ref",
        settings: {
          helpText:
            "Select a landing page to link to. If set, this will override the url field",
        },
      },
    ],
  },
};
