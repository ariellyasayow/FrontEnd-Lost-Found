import { Outlet } from 'react-router-dom';

import { Footer } from '../components/navigation/Footer';
import { MobileNav } from '../components/navigation/MobileNav';
import { Navbar } from '../components/navigation/Navbar';

export function AppShell() {
  return (
    <div className="min-h-screen bg-canvas pb-24 lg:pb-0">
      <Navbar />
      <main className="pt-6 lg:pt-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
