import type { PropsWithChildren } from 'react';

import { APP_NAME } from '../constants/app';
import { Container } from '../components/common/Container';

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen items-center py-10">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
            Campus System
          </p>
          <h1 className="font-display text-5xl leading-tight text-brand-900">
            Fondasi tenang untuk laporan barang hilang dan ditemukan di UNKLAB.
          </h1>
          <p className="max-w-xl text-base leading-8 text-brand-700">
            {APP_NAME} disiapkan dengan flow sederhana: login, lengkapi akun,
            lihat daftar barang, dan buat posting baru tanpa alur admin.
          </p>
        </section>

        <section>{children}</section>
      </Container>
    </div>
  );
}
