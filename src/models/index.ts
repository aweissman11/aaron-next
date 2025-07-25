import type { ContentModel } from "contentful-code-models";
import { generalContent } from "./generalContent";
import { link } from "./link";
import { simpleHero } from "./simpleHero";
import { landingPage } from "./landingPage";
import { seo } from "./seo";
import { fiftyFifty } from "./fiftyFifty";
import { nav } from "@/models/nav";
import { navLink } from "@/models/navLink";

export const models: ContentModel[] = [
  generalContent,
  link,
  simpleHero,
  landingPage,
  seo,
  fiftyFifty,
  nav,
  navLink,
];

export const locales = [
  {
    name: "English (USA)",
    internal_code: "en-US",
    code: "en-US",
    fallbackCode: null,
    default: true,
    contentManagementApi: true,
    contentDeliveryApi: true,
    optional: false,
  },
];
