export type NodeType = 'EquipmentType' | 'Equipment' | 'Assembly' | 'Component' | 'Root' | 'Category' | 'System' | 'SubSystem' | 'SubSystemCode' | 'ComponentGroup' | 'PartGroup' | 'Part';

export interface TreeNodeData {
  id: string;
  label: string;
  type: NodeType;
  children?: TreeNodeData[];
  // Optional: extended properties for real apps
  status?: 'active' | 'inactive';
  meta?: Record<string, any>;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  path?: string;
  children?: NavItem[];
  isOpen?: boolean;
}
