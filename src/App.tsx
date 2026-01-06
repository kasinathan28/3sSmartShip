import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { FleetManagement } from './pages/FleetManagement';

// Placeholder for other pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">🚧</div>
    <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-500 max-w-md">This module is currently under development. Check back later for updates.</p>
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/fleet-management" replace />} />
          <Route path="/fleet-management" element={<FleetManagement />} />
          
          {/* Placeholders for other nav items */}
          <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="/planned-maintenance" element={<PlaceholderPage title="Planned Maintenance" />} />
          <Route path="/spares" element={<PlaceholderPage title="Spares Inventory" />} />
          <Route path="/running-hrs" element={<PlaceholderPage title="Machinery Running Hrs" />} />
          <Route path="/lube-oil" element={<PlaceholderPage title="Lube Oil Summary" />} />
          <Route path="/library" element={<PlaceholderPage title="Library" />} />
          <Route path="/pms-calendar" element={<PlaceholderPage title="PMS Calendar" />} />
          <Route path="/user-management" element={<PlaceholderPage title="User Management" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
