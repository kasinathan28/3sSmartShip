import { 
  LayoutGrid, 
  CalendarCheck, 
  Box, 
  Clock, 
  Droplet, 
  Library, 
  Calendar, 
  Users, 
  FileText, 
  Ship, 
  Settings 
} from 'lucide-react';
import type { NavItem } from '../types';

export const navigationData: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
  { 
    id: 'planned-maintenance', 
    label: 'Planned Maintenance', 
    icon: CalendarCheck, 
    children: [
      { id: 'pm-overview', label: 'Overview', path: '/pm/overview' }, // Example child
    ]
  },
  { 
    id: 'spares', 
    label: 'Spares Inventory', 
    icon: Box,
    children: [] // Collapsible indicator
  },
  { 
    id: 'running-hrs', 
    label: 'Machinery Running Hrs', 
    icon: Clock,
    children: []
  },
  { 
    id: 'lube-oil', 
    label: 'Lube Oil Summary', 
    icon: Droplet,
    children: []
  },
  { 
    id: 'library', 
    label: 'Library', 
    icon: Library,
    children: []
  },
  { id: 'pms-calendar', label: 'PMS Calender', icon: Calendar, path: '/pms-calendar' },
  { 
    id: 'user-management', 
    label: 'User Management Roles', 
    icon: Users,
    children: []
  },
  { 
    id: 'reports', 
    label: 'Reports', 
    icon: FileText,
    children: []
  },
  { id: 'fleet-management', label: 'Fleet Management', icon: Ship, path: '/' }, // Active page
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: Settings,
    children: []
  },
];
