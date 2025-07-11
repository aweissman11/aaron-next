import type { ContentModel } from "contentful-code-models";
import { fiftyFifty } from "./fiftyFifty";
import { generalContent } from "./generalContent";
import { seo } from "./seo";
import { landingPage } from "./landingPage";
import { simpleHero } from "./simpleHero";
import { link } from "./link";
import { CreateLocaleProps } from "contentful-management";

export const models: ContentModel[] = [
  fiftyFifty,
  generalContent,
  seo,
  landingPage,
  simpleHero,
  link,
];

export const locales: CreateLocaleProps[] = [
  {
    code: "en-US",
    name: "English (USA)",
    default: true,
  },
];
