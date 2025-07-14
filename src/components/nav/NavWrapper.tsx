import { useNavShowing } from '@/providers/navProvider';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function NavWrapper({
  children,
  open,
  className,
  id,
}: {
  id: string;
  children: ReactNode;
  open?: boolean;
  className?: string;
}) {
  const { navShowing, atTopOfPage } = useNavShowing();
  const blackPage = false; // TODO: Make this dynamic based on the page from the CMS

  return (
    <nav
      id={id}
      className={clsx(
        'nav_header transition-[top, background-color, text] ease-in-out fixed left-0 right-0 z-[1000] h-mobile-nav w-full duration-500 lg:h-desktop-nav',
        className,
        {
          'lg:top-[-97px]': !navShowing,
          'lgmax:top-[-80px]': !navShowing,
          'top-0': navShowing,
          'lgmax:bg-white': !atTopOfPage && !open && !blackPage,
          'lgmax:bg-black': open || (blackPage && !atTopOfPage),
          'lgmax:bg-transparent': !open && atTopOfPage,
          'lgmax:text-black': !blackPage && !open,
          'lgmax:text-white': blackPage || open,
        },
      )}
    >
      <div className="lgmax:global-grid lgmax:global-container h-full w-full">
        <motion.div
          initial={{ position: 'relative', top: '-100%' }}
          animate={{
            top: 0,
            transition: {
              duration: 1,
              delay: 0.8,
            },
            transitionEnd: {
              position: 'static',
            },
          }}
          className="col-span-full lgmax:flex"
        >
          {children}
        </motion.div>
      </div>
    </nav>
  );
}
