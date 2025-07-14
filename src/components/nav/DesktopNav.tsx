"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { INavLink, SimpleNavLink } from "./Nav";
import NavWrapper from "./NavWrapper";
import { useNavShowing } from "@/providers/navProvider";
import AppLink from "@/components/AppLink";
import { MoveRight } from "lucide-react";
import Logo from "@/components/nav/assets/logo";
// import Image from "next/image";
import { usePathname } from "next/navigation";
import Image from "next/image";

function SubrouteLink({
  link,
  parent,
  blackPage,
  onClick,
  open,
}: {
  link: SimpleNavLink;
  parent: INavLink;
  blackPage: boolean;
  onClick: () => void;
  open: boolean;
}) {
  return (
    <AppLink
      href={`${parent.href}${link.href}`}
      className="cta group/link col-span-3 flex w-full flex-wrap content-start items-center text-white"
      key={link.name}
      onClick={onClick}
      tabIndex={open ? 0 : -1}
    >
      <div className="aspect-video w-full flex-grow overflow-hidden object-cover">
        <Image
          alt={link.name!}
          src={link.image!}
          {...link.image}
          className={clsx(
            "ease-in-out  transition-transform duration-[0.3s] group-hover/link:scale-[1.1]"
          )}
        />
      </div>
      <p className="cta mt-[14px] flex text-16">
        <span
          className={clsx(
            "flex-center -translate-y-[2px] rounded-full p-0",
            "ease-in-out -translate-x-4 opacity-0 transition-all duration-500 group-hover/link:translate-x-0 group-hover/link:opacity-100",
            {
              "bg-onyx text-white": !blackPage,
              "bg-white text-black": blackPage,
            }
          )}
        >
          <MoveRight aria-label="arrow" />
        </span>
        <span
          className={clsx(
            "-translate-x-4 transition-all duration-500 group-hover/link:ml-3 group-hover/link:translate-x-0",
            {
              "text-white": blackPage,
              "text-black": !blackPage,
            }
          )}
        >
          {link.name}
        </span>
        <span
          className={clsx(
            "flex-center ml-3 -translate-y-[2px]  rounded-full p-0",
            "ease-in-out -translate-x-4 opacity-100 transition-all duration-500 group-hover/link:translate-x-0 group-hover/link:opacity-0",
            {
              "bg-onyx text-white": !blackPage,
              "bg-white text-black": blackPage,
            }
          )}
        >
          <MoveRight aria-label="arrow" />
        </span>
      </p>
    </AppLink>
  );
}

type DesktopNav2Props = {
  links: INavLink[];
};

export default function DesktopNav({ links }: DesktopNav2Props) {
  const pathname = usePathname();

  const { atTopOfPage } = useNavShowing();
  const [subNav, _setSubNav] = useState<string | null>(null);
  const setSubNav = (n: string | null) => {
    if (n) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    _setSubNav(n);
  };

  // TODO: Make this dynamic based on the page from the CMS
  const blackPage = true;

  return (
    <NavWrapper id="top-nav-desktop" className="lgmax:hidden">
      <div
        className={clsx("group/nav z-20 h-24 w-full duration-300", {
          "text-white": blackPage,
          "text-black": !blackPage,
          "bg-black": blackPage && !atTopOfPage,
          "bg-white": !blackPage && !atTopOfPage,
          "bg-transparent": atTopOfPage,
        })}
      >
        <div className="global-container flex h-full w-full items-center justify-end">
          <AppLink
            className="flex-center ml-0 mr-auto h-full transition-opacity hover:opacity-60"
            href="/"
            tabIndex={0}
          >
            <h1 className="flex items-center text-lg w-full uppercase whitespace-nowrap">
              <Logo
                className={clsx(
                  "h-4 relative top-[3px] mr-2",
                  blackPage
                    ? "stroke-white fill-white"
                    : "stroke-black fill-black"
                )}
              />
              <span className="relative top-[2px]">Aaron Weissman</span>
            </h1>
          </AppLink>
          {links.map((link, ix) =>
            link.subroutes ? (
              <div className="flex-center h-full" key={link.name}>
                <div
                  onMouseEnter={() => setSubNav(link.name)}
                  onMouseLeave={() => setSubNav(null)}
                  className={clsx(
                    "group relative z-10 cursor-default text-14",
                    ix !== 0 && "ml-14"
                  )}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (["Space", "Enter"].includes(e.code)) {
                      setSubNav(link.name);
                    }

                    if (e.code === "Escape") {
                      setSubNav(null);
                    }
                  }}
                >
                  <div className="flex h-full items-center justify-center text-14 uppercase">
                    <span>{link.name}</span>
                  </div>
                  <div
                    className={clsx(
                      "flex border-b-2 border-solid transition-transform content-[''] group-hover:scale-x-100",
                      {
                        "scale-x-100": pathname.includes(link.href),
                        "scale-x-0": !pathname.includes(link.href),
                        "border-white": blackPage,
                        "border-black": !blackPage,
                      }
                    )}
                  />
                  <div className="absolute hidden h-[34px] w-full bg-transparent group-hover:block" />
                  <div
                    // top 96px minus 2px so there's no gap
                    className={clsx(
                      "fixed left-0 top-[94px] max-h-0 w-screen overflow-hidden transition-[max-height] duration-300",
                      {
                        "bg-black text-white": blackPage,
                        "bg-white text-black": !blackPage,
                        "max-h-[800px]": subNav === link.name,
                      }
                    )}
                  >
                    <div className="global-container global-grid w-full pt-10 pb-20">
                      <div className="col-span-3 text-14 uppercase">
                        {link.name}
                      </div>
                      {link.subroutes.map((sr) => (
                        <SubrouteLink
                          onClick={() => setSubNav(null)}
                          blackPage={blackPage}
                          key={sr.href}
                          link={sr}
                          parent={link}
                          open={subNav === link.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-center h-full" key={link.name}>
                <AppLink
                  href={link.href}
                  title={link.name}
                  className={clsx(
                    "group relative z-10 text-14",
                    ix !== 0 && "ml-14"
                  )}
                  tabIndex={0}
                >
                  <div className="flex h-full items-center justify-center text-14 uppercase">
                    <span>{link.name}</span>
                  </div>
                  <div
                    className={clsx(
                      "flex border-b-2 border-solid transition-transform content-[''] group-hover:scale-x-100",
                      {
                        "scale-x-100": pathname.includes(link.href),
                        "scale-x-0": !pathname.includes(link.href),
                        "border-white": blackPage,
                        "border-black": !blackPage,
                      }
                    )}
                  />
                  <div className="absolute hidden h-[34px] w-full bg-transparent group-hover:block" />
                  <div
                    // top 96px minus 2px so there's no gap
                    className={clsx(
                      "fixed left-0 top-[94px] max-h-0 w-screen overflow-hidden transition-[max-height] duration-300",
                      {
                        "bg-black text-white": blackPage,
                        "bg-white text-black": !blackPage,
                        "max-h-[800px]": subNav === link.name,
                      }
                    )}
                  >
                    <div className="global-container global-grid w-full pt-10 pb-20">
                      <div className="col-span-3 text-14 uppercase">
                        {link.name}
                      </div>
                    </div>
                  </div>
                </AppLink>
              </div>
            )
          )}
          {/* <SearchTakeover /> */}

          <AnimatePresence>
            {subNav && (
              <motion.div
                key="blurzone"
                // Height is screen minus nav height minus menu height
                className="fixed left-0 bottom-0 z-0 h-[calc(100vh-96px)] w-screen bg-black/90"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </NavWrapper>
  );
}
