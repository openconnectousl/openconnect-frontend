// src/layouts/MainLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/header/Header.component';
import Footer from '@/components/ui/Footer';
import { RequestPanel } from '@/components/RequestPanel';
import { useApp } from '@/context/AppContext';

export const MainLayout = () => {
  const { hasCompletedOnboarding } = useAuth();
  const { requests, isRequestPanelOpen, setIsRequestPanelOpen } = useApp();
  
  // If user hasn't completed onboarding, redirect to onboarding
  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        requests={requests}
        isRequestPanelOpen={isRequestPanelOpen}
        setIsRequestPanelOpen={setIsRequestPanelOpen}
      />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      <RequestPanel
        requests={requests}
        isOpen={isRequestPanelOpen}
        onClose={() => setIsRequestPanelOpen(false)}
      />
    </div>
  );
};