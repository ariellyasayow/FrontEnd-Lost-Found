import { Link, NavLink } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { Container } from '../common/Container';

const navbarLinks = [
  { label: 'Beranda', to: ROUTES.home, end: true },
  { label: 'Barang Hilang', to: ROUTES.lostItems, end: true },
  { label: 'Barang Ditemukan', to: ROUTES.foundItems, end: true },
  { label: 'Barang Saya', to: ROUTES.myItems, end: true },
  { label: 'Akun', to: ROUTES.account, end: true },
];

const actionLinks = [
  { label: 'Post Hilang', to: ROUTES.postLostItem, end: true, variant: 'outline' as const },
  { label: 'Post Ditemukan', to: ROUTES.postFoundItem, end: true, variant: 'solid' as const },
];

function getNavClass(isActive: boolean) {
  return isActive
    ? 'rounded-full bg-brand-900 px-3 py-2 text-white shadow-[0_10px_24px_rgba(38,57,88,0.18)]'
    : 'rounded-full px-3 py-2 text-brand-700 hover:-translate-y-0.5 hover:bg-white/80 hover:text-brand-900 hover:shadow-[0_8px_18px_rgba(38,57,88,0.08)]';
}

function getActionClass(isActive: boolean, variant: 'outline' | 'solid') {
  if (variant === 'solid') {
    return isActive
      ? 'rounded-full border border-[#314964] bg-[#314964] px-4 py-2 text-white shadow-[0_12px_24px_rgba(38,57,88,0.22)]'
      : 'rounded-full border border-[#5c7492] bg-[#5c7492] px-4 py-2 text-white hover:-translate-y-0.5 hover:bg-[#314964] hover:shadow-[0_12px_24px_rgba(38,57,88,0.18)]';
  }

  return isActive
    ? 'rounded-full border border-[#6d83a0] bg-[#e7eff8] px-4 py-2 text-brand-900 shadow-[0_10px_22px_rgba(38,57,88,0.12)]'
    : 'rounded-full border border-[#bccbdb] bg-[rgba(255,255,255,0.84)] px-4 py-2 text-brand-900 hover:-translate-y-0.5 hover:border-[#6d83a0] hover:bg-[#eef4fb] hover:shadow-[0_10px_20px_rgba(38,57,88,0.1)]';
}

export function Navbar() {
  const { user } = useAuth();
  const accountLabel = user?.profile.name || user?.email || 'Akun';

  return (
    <header className="sticky top-0 z-40 mb-4 border-b border-[#d8e2ef] bg-[rgba(236,242,250,0.96)] backdrop-blur-xl">
      <Container className="xl:max-w-7xl">
        <div className="flex min-h-[4.6rem] items-center justify-between gap-4 px-5 sm:px-6">
          <Link to={ROUTES.home} className="shrink-0">
            <div className="flex flex-col leading-none text-brand-900">
              <span className="font-display text-[1.1rem] sm:text-[1.2rem]">UNKLAB</span>
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-brand-700 sm:text-[0.72rem]">
                Lost &amp; Found
              </span>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-2 text-[0.82rem] font-medium lg:flex xl:gap-3">
            {navbarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `whitespace-nowrap transition-all duration-200 ease-out ${getNavClass(isActive)}`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="ml-1 flex items-center gap-2">
              {actionLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `whitespace-nowrap text-[0.8rem] font-semibold transition-all duration-200 ease-out ${getActionClass(
                      isActive,
                      link.variant,
                    )}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to={ROUTES.account}
              className="max-w-[9.75rem] truncate rounded-full bg-brand-900 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_24px_rgba(38,57,88,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-[0_14px_28px_rgba(38,57,88,0.24)]"
            >
              {accountLabel}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link
              to={ROUTES.account}
              className="rounded-full border border-brand-500 bg-[rgba(236,242,250,0.92)] px-4 py-2 text-sm font-semibold text-brand-900 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-700 hover:bg-white"
            >
              Akun
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
