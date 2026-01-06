import type { TreeNodeData } from '../types';

export const vesselHierarchy: TreeNodeData[] = [
  {
    id: 'root',
    label: 'Equipments',
    type: 'Root',
    children: [
      {
        id: 'cat-engine',
        label: 'Engine',
        type: 'Category',
        children: [
          {
            id: 'sys-main-prop',
            label: 'Main Engine & Propulsion',
            type: 'System',
            children: [
              {
                id: 'sub-main-engine',
                label: 'Main Engine',
                type: 'SubSystem',
                children: [
                  {
                    id: 'comp-air-exhaust',
                    label: 'Air & Exhaust System',
                    type: 'ComponentGroup',
                    children: [
                      {
                        id: 'part-turbo',
                        label: 'ME Turbocharger',
                        type: 'PartGroup',
                        children: [
                          { id: 'spare-box', label: 'Spare Parts Box', type: 'Part' },
                          { id: 'seal-1', label: 'Seal', type: 'Part' },
                          { id: 'oring', label: 'O-Ring', type: 'Part' },
                          { id: 'seal-turbine', label: 'Seal - Turbine Side', type: 'Part' },
                        ]
                      },
                      { id: 'part-aux-blower', label: 'Aux Blower', type: 'ComponentGroup' },
                      { id: 'part-aux-blower-2', label: 'Aux Blower 2', type: 'ComponentGroup' },
                      { id: 'part-charge-cooler', label: 'Charge Air Cooler', type: 'ComponentGroup' },
                      { id: 'part-exhaust-valve', label: 'Exhaust Valve Complete', type: 'ComponentGroup' },
                    ]
                  },

                  { id: 'comp-control', label: 'Control & Safety System', type: 'ComponentGroup' },
                  { id: 'comp-fuel', label: 'Fuel System', type: 'ComponentGroup' },
                  { id: 'comp-cooling', label: 'Cooling Water System', type: 'ComponentGroup' },
                  { id: 'comp-cyl', label: 'Cylinder Liner & Lubrication', type: 'ComponentGroup' },

                  {
                    id: 'comp-lube-oil',
                    label: 'Lubricating Oil System',
                    type: 'ComponentGroup',
                    children: [
                      {
                        id: 'pg-lo-pump',
                        label: 'LO Pump',
                        type: 'PartGroup',
                        children: [
                          { id: 'lo-pump-impeller', label: 'Impeller', type: 'Part' },
                          { id: 'lo-pump-seal', label: 'Mechanical Seal', type: 'Part' },
                          { id: 'lo-pump-bearing', label: 'Bearing', type: 'Part' },
                        ]
                      },
                      {
                        id: 'pg-lo-filter',
                        label: 'LO Filter',
                        type: 'PartGroup',
                        children: [
                          { id: 'lo-filter-element', label: 'Filter Element', type: 'Part' },
                          { id: 'lo-filter-gasket', label: 'Cover Gasket', type: 'Part' },
                        ]
                      }
                    ]
                  }
                ]
              },

              { id: 'sub-propeller', label: 'Propeller', type: 'SubSystemCode' },
              { id: 'sub-shafting', label: 'Shafting', type: 'SubSystemCode' },

              {
                id: 'sub-gearbox',
                label: 'Reduction Gearbox',
                type: 'SubSystemCode',
                children: [
                  {
                    id: 'pg-gear-set',
                    label: 'Gear Set',
                    type: 'PartGroup',
                    children: [
                      { id: 'gear-input', label: 'Input Gear', type: 'Part' },
                      { id: 'gear-output', label: 'Output Gear', type: 'Part' },
                    ]
                  },
                  {
                    id: 'pg-gear-bearing',
                    label: 'Gear Bearings',
                    type: 'PartGroup',
                    children: [
                      { id: 'gb-thrust-bearing', label: 'Thrust Bearing', type: 'Part' },
                      { id: 'gb-radial-bearing', label: 'Radial Bearing', type: 'Part' },
                    ]
                  }
                ]
              }
            ]
          },

          { id: 'sys-power', label: 'Power Generation', type: 'System' },
          { id: 'sys-boiler', label: 'Aux Boiler', type: 'System' },
          { id: 'sys-aux', label: 'Aux Machinery', type: 'System' },
          { id: 'sys-elec', label: 'Electrical & Automation', type: 'System' },
          { id: 'sys-tank', label: 'Tank Systems', type: 'System' },
          { id: 'sys-dp', label: 'DP System', type: 'System' },
          { id: 'sys-others', label: 'Others', type: 'System' },
        ]
      },

      {
        id: 'cat-deck',
        label: 'Deck',
        type: 'Category',
        children: [
          { id: 'sys-deck-mach', label: 'Deck Machinery', type: 'System' },
          { id: 'sys-cargo', label: 'Cargo', type: 'System' },
          { id: 'sys-lsa-ffa', label: 'LSA/FFA', type: 'System' },
          { id: 'sys-radio-nav', label: 'Radio & Navigation', type: 'System' },
          { id: 'sys-deck-others', label: 'Others', type: 'System' },          
        ]
      },

      {
        id: 'cat-acco',
        label: 'Accommodation',
        type: 'Category',
        children: [
          {
            id: 'sys-hvac',
            label: 'HVAC',
            type: 'System',
            children: [
              { id: 'hvac-fan', label: 'Ventilation Fan', type: 'Part' },
              { id: 'hvac-filter', label: 'Air Filter', type: 'Part' },
            ]
          }
        ]
      },

      {
        id: 'cat-misc',
        label: 'Misc.',
        type: 'Category',
        children: [
          { id: 'misc-tools', label: 'Tools & Consumables', type: 'System' },
          { id: 'misc-safety', label: 'Safety Equipment', type: 'System' },
        ]
      }
    ]
  }
];
