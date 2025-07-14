import Link from 'next/link';
import { ReactNode } from 'react';

type AppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  tabIndex?: number;
  title?: string;
  id?: string;
};

// TODO: Make this dynamic to be either a Next.js Link or an external link
export default function AppLink(props: AppLinkProps) {
  return (
    <Link
      href={props.href}
      className={props.className}
      onClick={props.onClick}
      tabIndex={props.tabIndex}
      title={props.title}
      id={props.id}
    >
      {props.children}
    </Link>
  );
}
