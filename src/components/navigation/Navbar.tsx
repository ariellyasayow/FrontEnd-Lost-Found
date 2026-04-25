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

export function Navbar() {
  const { user } = useAuth();
  const displayName = user?.profile.name || user?.email || 'Akun';

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

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <Link
            to={ROUTES.account}
            className="relative inline-flex h-10 w-10 items-center justify-center text-brand-900 transition hover:text-brand-700"
            aria-label="Notifikasi"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
              <path d="M10.8 20a1.8 1.8 0 0 0 2.4 0" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Link>

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
