"use client";

import clsx from "clsx";
import { INavLink } from "./Nav";
import NavWrapper from "./NavWrapper";
import { Fragment, useState } from "react";
import Logo from "@/components/nav/assets/logo";
import AppLink from "@/components/AppLink";
import { Carrot } from "lucide-react";
import { PreventBodyScroll } from "@/utils/preventBodyScroll";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "motion/react";

type MobileNavProps = {
  links: INavLink[];
};

export default function MobileNav({ links }: MobileNavProps) {
  // TODO: Make this dynamic
  const blackPage = true;
  const [isOpen, setIsOpen] = useState(false);
  const [openSubroutes, setOpenSubroutes] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setOpenSubroutes(null);
  };

  const toggleSubroutes = (href: string) => {
    setOpenSubroutes(openSubroutes === href ? null : href);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <NavWrapper id="top-nav-mobile" open={isOpen} className="lg:hidden">
        <PreventBodyScroll enabled={isOpen} />
        <div className="flex w-full items-center justify-between">
          <AppLink href="/" title="home">
            <Logo
              className={clsx(
                isOpen || blackPage
                  ? "stroke-white fill-white"
                  : "stroke-black fill-black"
              )}
            />
          </AppLink>
          <div className="flex w-max justify-between">
            {/* {!isOpen && <SearchTakeover />} */}
            <PopoverTrigger
              id="open_close_mobile"
              className="ml-6 outline-none"
            >
              {isOpen ? "CLOSE" : "MENU"}
            </PopoverTrigger>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <PopoverContent
              asChild
              className="absolute top-mobile-nav left-0 z-10 flex h-[calc(100vh-theme(space[mobile-nav]))] min-h-[550px] w-screen flex-col justify-between bg-black border-none p-0 rounded-none shadow-none"
              align="start"
              side="bottom"
              sideOffset={0}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul
                  id="top-nav-popover-menu-mobile"
                  className="mt-[33px] ml-4 mr-4 flex flex-col"
                >
                  {links.map((link) => (
                    <Fragment key={link.href}>
                      {link.subroutes ? (
                        <div>
                          <button
                            id={link.href}
                            onClick={() => toggleSubroutes(link.href)}
                            className={clsx({
                              flex: true,
                              "w-full": true,
                              "items-center": true,
                              "justify-between": true,
                              "pt-6": true,
                              "pb-6": true,
                              "text-white": true,
                              "outline-none": true,
                              "border-b": openSubroutes !== link.href,
                              "border-solid": openSubroutes !== link.href,
                              "border-white": openSubroutes !== link.href,
                            })}
                          >
                            <span className="text-[16px]">{link.name}</span>
                            <Carrot
                              className={clsx({
                                "transition-transform": true,
                                "rotate-180": openSubroutes === link.href,
                                "duration-150": true,
                              })}
                            />
                          </button>
                          <AnimatePresence>
                            {openSubroutes === link.href && (
                              <motion.div
                                initial={{ maxHeight: 0, overflow: "hidden" }}
                                animate={{ maxHeight: 150, overflow: "hidden" }}
                                exit={{ maxHeight: 0, overflow: "hidden" }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col"
                              >
                                {link.subroutes?.map((route, ix, all) => (
                                  <AppLink
                                    href={link.href + route.href}
                                    key={route.name}
                                    id={`top-nav-${link.name}`}
                                    className={clsx({
                                      "pb-6": ix !== all.length - 1,
                                      "text-[14px]": true,
                                    })}
                                    onClick={handleClose}
                                  >
                                    {route.name}
                                  </AppLink>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <AppLink
                          href={link.href}
                          key={link.name}
                          id={`top-nav-${link.name}`}
                          className="border-b border-solid border-white pb-6 pt-6 text-[16px]"
                          onClick={handleClose}
                        >
                          {link.name}
                        </AppLink>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </NavWrapper>
    </Popover>
  );
}
