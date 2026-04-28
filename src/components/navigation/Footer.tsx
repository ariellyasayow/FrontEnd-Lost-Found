import { Container } from '../common/Container';

export function Footer() {
  return (
    <footer className="border-t border-brand-100/80 bg-white/[0.72] pb-24 pt-8 backdrop-blur lg:pb-8">
      <Container>
        <div className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/[0.72] px-5 py-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-display text-2xl text-brand-900">
            Unklab Lost &amp; Found
            </p>
            <p className="text-sm leading-6 text-brand-700">
              Ruang pelaporan barang hilang dan ditemukan untuk komunitas UNKLAB.
            </p>
          </div>

          <p className="text-sm font-medium text-brand-500">
            Copyright 2024 University Lost &amp; Found
          </p>
        </div>
      </Container>
    </footer>
  );
}
