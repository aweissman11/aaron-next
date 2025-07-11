import type { ContentModel } from "contentful-code-models";
import { complexRichText } from "./shared/complexRichText";
import { stylesOnlyRichText } from "./shared/stylesOnlyRichText";

export const generalContent: ContentModel = {
  sys: {
    id: "generalContent",
  },
  name: "General Content",
  description: "Content type for general content blocks.",
  displayField: "internalTitle",
  fields: [
    {
      omitted: false,
      disabled: false,
      required: true,
      localized: false,
      id: "internalTitle",
      name: "Internal Title",
      type: "Symbol",
      validations: [],
    },
    {
      ...stylesOnlyRichText,
      id: "pretext",
      name: "Pretext",
    },
    {
      ...stylesOnlyRichText,
      id: "title",
      name: "Title",
    },
    {
      ...complexRichText,
      id: "body",
      name: "Body",
    },
    {
      omitted: false,
      disabled: false,
      required: false,
      localized: false,
      linkType: "Asset",
      id: "asset",
      name: "Asset",
      type: "Link",
      validations: [
        {
          linkMimetypeGroup: ["image", "video"],
        },
      ],
    },
    {
      omitted: false,
      disabled: false,
      required: false,
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
      omitted: true,
      disabled: true,
      required: false,
      localized: false,
      linkType: "Asset",
      id: "image",
      name: "Image",
      type: "Link",
      validations: [],
    },
  ],
};
