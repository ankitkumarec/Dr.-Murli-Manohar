import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { MobileCTA } from '../../components/layout/MobileCTA';
import { FloatingWhatsApp } from '../../components/layout/FloatingWhatsApp';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
      <FloatingWhatsApp />
    </>
  );
}
