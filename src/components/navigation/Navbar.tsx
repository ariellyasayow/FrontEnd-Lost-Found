import { Link, NavLink } from 'react-router-dom';

import { APP_NAME } from '../../constants/app';
import { primaryNavLinks } from '../../constants/navigation';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { Container } from '../common/Container';

function getDesktopLinkClass(isActive: boolean) {
  return isActive
    ? 'text-brand-900'
    : 'text-brand-700 hover:text-brand-900';
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

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link to={ROUTES.home} className="space-y-1">
            <p className="font-display text-2xl text-brand-900">UNKLAB</p>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-500">
              Lost &amp; Found
            </p>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => getDesktopLinkClass(isActive)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
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
          <div className="rounded-full bg-brand-100 px-4 py-2 text-sm text-brand-900">
            {user?.profile.name || user?.email || APP_NAME}
          </div>
        </div>
      </Container>
    </header>
  );
}
