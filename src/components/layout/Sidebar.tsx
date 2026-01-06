import { useState, memo } from 'react';
import { navigationData } from '../../data/navigation';
import { ChevronDown, ChevronsUpDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logo from '../../assets/Thumbnail.png';
import type { NavItem } from '../../types';

/**
 * Sidebar Component
 * Main navigation sidebar with collapsible sections
 */

interface NavItemComponentProps {
  item: NavItem;
  isActive: boolean;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

/**
 * Individual navigation item component
 */
const NavItemComponent = memo(({ item, isActive, isOpen, onToggle }: NavItemComponentProps) => {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => (hasChildren ? onToggle(item.id) : undefined)}
        className={twMerge(
          'flex items-center justify-between w-full px-3 py-2.5 rounded-lg',
          'transition-all duration-200 group text-sm',
          isActive
            ? 'bg-sidebar-active text-sidebar-activeText shadow-sm font-semibold'
            : 'text-[#3F3F46] hover:bg-gray-50 hover:text-gray-900 font-normal'
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon
              size={18}
              className={clsx(
                isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
              )}
            />
          )}
          <span>{item.label}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            size={14}
            className={clsx(
              'transition-transform duration-200 text-gray-400',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </button>

      {/* Submenu */}
      {hasChildren && isOpen && (
        <div className="ml-9 flex flex-col gap-1 mt-1 border-l border-gray-100 pl-2">
          {item.children!.map((child) => (
            <div
              key={child.id}
              className="text-sm text-gray-500 py-1 px-2 hover:text-gray-900 cursor-pointer"
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

NavItemComponent.displayName = 'NavItemComponent';

export const Sidebar = memo(() => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-[288px] h-screen bg-sidebar-bg flex flex-col pt-4 pb-4 px-4 gap-[10px] overflow-hidden sticky top-0 relative">
      {/* Gradient Sidebar Divider */}
      <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#787677] to-[#8E8E8E] z-10" />

      {/* Logo Section */}
      <div className="flex items-center gap-2 px-2 pb-2">
        <img
          src={logo}
          alt="3S Smart Ship Solutions"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="h-px bg-gray-200 w-full my-1" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto flex flex-col gap-1 pr-1 custom-scrollbar">
        {navigationData.map((item) => {
          const isActive = item.id === 'fleet-management';
          const isOpen = openSections[item.id];

          return (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={isActive}
              isOpen={isOpen}
              onToggle={toggleSection}
            />
          );
        })}
      </nav>

      {/* User Section (Bottom) */}
      <div className="mt-auto flex flex-col gap-4">
        <div className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">shadcn</span>
            <span className="text-xs text-gray-500">Super Admin</span>
          </div>
          <ChevronsUpDown size={16} className="text-gray-400" />
        </div>

        <div className="h-px bg-gray-200 w-full" />

        <div className="px-2 pb-2">
          <div className="flex items-center gap-1">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-bold text-lg">
              Stream.
            </span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1"></div>
          </div>
          <div className="text-[10px] text-gray-400 leading-tight mt-1">
            powered by <span className="text-blue-500">3S</span> Smart Ships Solutions
            <br />
            version 0.0.1
          </div>
        </div>
      </div>
    </aside>
  );
});
