import { NavLink } from 'react-router-dom';

import { mobileNavLinks } from '../../constants/navigation';
import { Container } from '../common/Container';

function getLinkClass(isActive: boolean) {
  return isActive
    ? 'rounded-2xl bg-brand-700 px-3 py-2 text-[0.7rem] font-semibold text-white shadow-soft'
    : 'rounded-2xl px-3 py-2 text-[0.7rem] font-semibold text-brand-500';
}

export function MobileNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100/80 bg-white/95 py-3 backdrop-blur-xl lg:hidden">
      <Container>
        <nav className="grid grid-cols-5 gap-2 rounded-[1.6rem] border border-brand-100/80 bg-white/92 p-2 shadow-soft">
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
