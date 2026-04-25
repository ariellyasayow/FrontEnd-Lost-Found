import { Link } from 'react-router-dom';

import { Container } from '../common/Container';

const footerLinks = [
  {
    label: 'Privacy Policy',
    to: '#',
  },
  {
    label: 'Terms of Service',
    to: '#',
  },
  {
    label: 'Campus Map',
    to: '#',
  },
  {
    label: 'Contact Support',
    to: '#',
  },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-100/80 bg-canvas/90 pb-24 pt-8 lg:pb-8">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="font-display text-2xl text-brand-900">
            Unklab Lost &amp; Found
          </p>
          <p className="text-sm italic text-brand-700">
            Copyright 2024 University Lost &amp; Found. A serene campus initiative.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-500">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="hover:text-brand-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
