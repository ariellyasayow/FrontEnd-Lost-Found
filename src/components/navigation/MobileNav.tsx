import { NavLink } from 'react-router-dom';

import { mobileNavLinks } from '../../constants/navigation';
import { Container } from '../common/Container';

function getLinkClass(isActive: boolean) {
  return isActive
    ? 'rounded-full bg-brand-900 px-3 py-2 text-xs font-semibold text-white'
    : 'rounded-full px-3 py-2 text-xs font-semibold text-brand-700';
}

export function MobileNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/80 bg-white/90 py-3 backdrop-blur md:hidden">
      <Container>
        <nav className="flex items-center justify-between gap-2">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => getLinkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </div>
  );
}
