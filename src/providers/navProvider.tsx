"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { usePrevious, useWindowSize } from "@react-hookz/web";
import { Nav } from "@/components/nav";

// See tailwind config for these vals
const desktopNavHeight = 96;
const mobileNavHeight = 80;
const lgScreenWidth = 1024;

export type NavShowing = boolean | null;

type NavContextType = {
  navShowing: NavShowing;
  atTopOfPage: boolean;
  setNavShowing: Dispatch<SetStateAction<NavShowing>>;
  setNavDisabled: Dispatch<SetStateAction<boolean>>;
  setNavLocked: Dispatch<SetStateAction<boolean>>;
  navHeight: number;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

function NavProvider({ children }: { children: ReactNode }) {
  const { width } = useWindowSize();
  const pathname = usePathname();
  const [navDisabled, setNavDisabled] = useState(false);
  const [navShowing, setNavShowing] = useState<NavShowing>(true);
  const [atTopOfPage, setAtTopOfPage] = useState(true);
  const [navHeight, setNavHeight] = useState(desktopNavHeight);
  const [navLocked, setNavLocked] = useState(false);

  // Always re-activate the nav bar when navigating
  const prevPathname = usePrevious(pathname);
  useEffect(() => {
    if (pathname !== prevPathname) {
      setNavDisabled(false);
      setNavShowing(true);
    }
  }, [pathname, prevPathname]);

  useEffect(() => {
    const nh =
      width && width < Number(lgScreenWidth)
        ? mobileNavHeight
        : desktopNavHeight;

    setNavHeight(nh);
  }, [width, navHeight]);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    if (navDisabled) {
      setNavShowing(false);
      return;
    }

    if (navLocked) {
      setNavShowing(true);
      return;
    }

    const updateShowNav = () => {
      if (navDisabled || navLocked) {
        return;
      }

      const distanceFromTopNavStartsBeingHidden = 30;
      const topOfPageMark = distanceFromTopNavStartsBeingHidden + 1;
      const scrollSensitivity = 2;
      const scrollY = window.pageYOffset;
      const shouldShowNav =
        scrollY > lastScrollY &&
        window.scrollY > distanceFromTopNavStartsBeingHidden
          ? false
          : true;

      const scrollDelta = scrollY - lastScrollY;

      if (
        // If the state needs to be changed and the scroll delta is greater than 2
        shouldShowNav !== navShowing &&
        (scrollDelta > scrollSensitivity || scrollDelta < -scrollSensitivity)
      ) {
        setNavShowing(shouldShowNav);
      }

      if (scrollY <= topOfPageMark && !atTopOfPage) {
        setAtTopOfPage(true);
        setNavShowing(true);
      } else if (scrollY >= topOfPageMark * 2 && atTopOfPage) {
        setAtTopOfPage(false);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    updateShowNav();

    window.addEventListener("scroll", updateShowNav);
    return () => {
      window.removeEventListener("scroll", updateShowNav);
    };
  }, [navShowing, atTopOfPage, navDisabled, navHeight, navLocked]);

  return (
    <NavContext.Provider
      value={{
        navShowing,
        atTopOfPage,
        setNavShowing,
        setNavDisabled,
        navHeight,
        setNavLocked,
      }}
    >
      <Nav />
      {children}
    </NavContext.Provider>
  );
}

function useNavShowing() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNavShowing must be used within a NavShowingProvider");
  }
  return context;
}

export { NavProvider as NavShowingProvider, useNavShowing };
