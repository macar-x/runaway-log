import type { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  username: string;
  onLogout: () => void;
  children: ReactNode;
}

export const Layout = ({ username, onLogout, children }: LayoutProps) => {
  return (
    <>
      <Navigation
        username={username}
        onLogout={onLogout}
      />
      <div>{children}</div>
    </>
  );
};
