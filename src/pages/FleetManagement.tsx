import React from 'react';
import { FlowTree } from '../components/tree/FlowTree';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { vesselHierarchy } from '../data/mockData';

export const FleetManagement: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-6 py-3">
        <Breadcrumbs
          items={[
            { label: 'Fleet management' },
            { label: 'Sagar Kanya' },
            { label: 'Vessel Hierarchy Tree', active: true }
          ]}
        />
      </div>
      <div className="flex-1 min-h-0 pl-4 pr-0 pb-1">
        <FlowTree data={vesselHierarchy} />
      </div>
      {/* External Footer */}
      {/* vertical pasding is 12px and horizontal padding is 24px */}
      <div className="w-full shrink-0 flex items-center justify-end pr-6 pt-3 pb-3">
        <div className="text-[10px] text-surface-400 font-medium">
          <span className="text-blue-500 font-semibold">3S</span> Smart Ship Solutions © 2025
        </div>
      </div>
    </div>
  );
};
