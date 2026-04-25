import { Link, NavLink } from 'react-router-dom';

import { APP_NAME } from '../../constants/app';
import { primaryNavLinks } from '../../constants/navigation';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { Container } from '../common/Container';

function getDesktopLinkClass(isActive: boolean) {
  return isActive
    ? 'border-b border-brand-500 pb-2 text-brand-900'
    : 'border-b border-transparent pb-2 text-brand-500 hover:text-brand-900';
}

function getActionLinkClass(isActive: boolean, variant: 'outline' | 'solid') {
  if (variant === 'outline') {
    return isActive
      ? 'rounded-full border border-brand-900 bg-brand-100/70 px-4 py-2 text-sm font-semibold text-brand-900 shadow-soft'
      : 'rounded-full border border-brand-300 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:border-brand-500';
  }

  return isActive
    ? 'rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-soft'
    : 'rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700';
}

export function Navbar() {
  const { user } = useAuth();
  const displayName = user?.profile.name || user?.email || APP_NAME;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-white/92 backdrop-blur-xl">
      <Container className="flex h-[4.6rem] items-center justify-between gap-6 xl:max-w-7xl">
        <Link to={ROUTES.home} className="shrink-0">
          <p className="font-display text-[1.95rem] leading-none text-brand-900">
            CampusFound
          </p>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-[1rem] font-medium lg:flex">
          {primaryNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap transition-colors ${getDesktopLinkClass(isActive)}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to={ROUTES.postLostItem}
            className={({ isActive }) => getActionLinkClass(isActive, 'outline')}
          >
            Post Hilang
          </NavLink>
          <NavLink
            to={ROUTES.postFoundItem}
            className={({ isActive }) => getActionLinkClass(isActive, 'solid')}
          >
            Post Ditemukan
          </NavLink>
          <Link
            to={ROUTES.account}
            className="max-w-[12rem] truncate rounded-full bg-brand-700 px-6 py-3 text-base font-medium text-white shadow-soft transition hover:bg-brand-900"
          >
            {displayName}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to={ROUTES.account}
            className="rounded-full border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition hover:border-brand-500"
          >
            Akun
          </Link>
        </div>
      </Container>
    </header>
  );
}
