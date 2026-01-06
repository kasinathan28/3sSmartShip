import React from 'react';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header / Breadcrumb can go here if needed, keeping it simple as per request */}
        <div className="flex-1 overflow-hidden">
            <div className="w-full h-full flex flex-col">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
};
