import { StaticImageData } from 'next/image';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Navbar_About from './assets/Navbar_About.webp';
import Navbar_Approach from './assets/Navbar_Approach.webp';
import Navbar_Careers from './assets/Navbar_Careers.webp';
import Navbar_Leadership from './assets/Navbar_Leadership.webp';
import Navbar_Partnerships from './assets/Navbar_Partnerships.webp';

export type SimpleNavLink = {
  name: string;
  href: string;
  image?: StaticImageData;
};

export type INavLink = SimpleNavLink & {
  subroutes?: SimpleNavLink[];
};

const links: INavLink[] = [
  {
    name: 'WHAT WE DO',
    href: '/what-we-do',
    subroutes: [
      { name: 'APPROACH', href: '/approach', image: Navbar_Approach },
      {
        name: 'PARTNERSHIPS',
        href: '/partnerships',
        image: Navbar_Partnerships,
      },
    ],
  },
  { name: 'INSIGHTS', href: '/insights' },
  { name: 'EXPERTS', href: '/experts' },
  {
    name: 'WHO WE ARE',
    href: '/who-we-are',
    subroutes: [
      { name: 'ABOUT US', href: '/about', image: Navbar_About },
      {
        name: 'LEADERSHIP',
        href: '/leadership',
        image: Navbar_Leadership,
      },
      { name: 'CAREERS', href: '/careers', image: Navbar_Careers },
    ],
  },
];

export default function Nav() {
  // Not listed: Homepage and Search routes

  return (
    <>
      <DesktopNav links={links} />
      <MobileNav links={links} />
    </>
  );
}
