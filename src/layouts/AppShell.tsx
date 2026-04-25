import { Outlet } from 'react-router-dom';

import { Footer } from '../components/navigation/Footer';
import { MobileNav } from '../components/navigation/MobileNav';
import { Navbar } from '../components/navigation/Navbar';

export function AppShell() {
  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <main className="py-8">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
