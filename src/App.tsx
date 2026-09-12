import React from 'react';
import { useApp } from './context/AppContext';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { About } from './components/public/About';
import { Services } from './components/public/Services';
import { Portfolio } from './components/public/Portfolio';
import { Process } from './components/public/Process';
import { Articles } from './components/public/Articles';
import { Contact } from './components/public/Contact';
import { Footer } from './components/public/Footer';
import { FloatingWhatsApp } from './components/public/FloatingWhatsApp';
import { AICustomerChat } from './components/public/AICustomerChat';
import { ProjectModal } from './components/public/ProjectModal';
import { ArticleModal } from './components/public/ArticleModal';
import { ContactModal } from './components/public/ContactModal';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminTopBar } from './components/admin/AdminTopBar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProjectEditor } from './components/admin/AdminProjectEditor';
import { AdminInbox } from './components/admin/AdminInbox';
import { AdminArticles } from './components/admin/AdminArticles';
import { AdminSettings } from './components/admin/AdminSettings';

// Common Components
import { Toast } from './components/common/Toast';

export default function App() {
  const { viewMode, isAdminLoggedIn, activeAdminView } = useApp();

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-[#4648d4] selection:text-white">
      {/* Toast Notification Container */}
      <Toast />

      {/* Public Modals (Accessible from both views when testing/previewing) */}
      <ProjectModal />
      <ArticleModal />
      <ContactModal />

      {viewMode === 'admin' ? (
        !isAdminLoggedIn ? (
          <AdminLogin />
        ) : (
          <div className="flex h-screen overflow-hidden bg-[#faf8ff]">
            {/* Admin Sidebar */}
            <AdminSidebar />

            {/* Main Admin Content Canvas */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              <AdminTopBar />
              
              <main className="flex-1">
                {activeAdminView === 'dashboard' && <AdminDashboard />}
                {activeAdminView === 'project_editor' && <AdminProjectEditor />}
                {activeAdminView === 'inbox' && <AdminInbox />}
                {activeAdminView === 'articles' && <AdminArticles />}
                {activeAdminView === 'settings' && <AdminSettings />}
              </main>
            </div>
          </div>
        )
      ) : (
        /* Public Landing Page & Studio Showcase */
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Process />
            <Articles />
            <Contact />
          </main>
          <Footer />
          <AICustomerChat />
          <FloatingWhatsApp />
        </div>
      )}
    </div>
  );
}
