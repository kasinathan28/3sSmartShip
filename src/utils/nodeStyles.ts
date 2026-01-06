import type { NodeType } from '../types';

/**
 * Node styling configuration
 * Memoized style calculations for tree nodes
 */

export interface NodeStyles {
  bgColor: string;
  borderColor: string;
  textColor: string;
  shadow?: string;
}

/**
 * Get styles for a custom node based on its type and state
 * This function is pure and can be safely memoized
 */
export const getCustomNodeStyles = (
  type: string,
  level: number,
  isExpanded: boolean
): string => {
  // Parts (Dark Green)
  if (type === 'Part') return 'bg-node-part border-node-part text-white';
  
  // Part Group (Dark Grey)
  if (type === 'PartGroup') return 'bg-node-part-group border-node-part-group text-white';
  
  // Component Group (Light Grey)
  if (type === 'ComponentGroup') return 'bg-node-component border-node-component text-white';
  
  // SubSystem (Dark Blue)
  if (type === 'SubSystem') return 'bg-node-subsystem border-node-subsystem text-white';
  
  // SubSystemCode (Light Blue)
  if (type === 'SubSystemCode') return 'bg-node-subsystem-code border-node-subsystem-code text-white';
  
  // System nodes (Red)
  if (type === 'System') return 'bg-node-system border-node-system text-white';
  
  // Expanded Category or Root -> Brand Primary
  if (level === 0 || isExpanded) {
    return 'bg-primary-600 border-primary-600 text-white shadow-glow';
  }
  
  // Collapsed Category -> Light Brand
  return 'bg-primary-300 border-primary-300 text-white';
};

/**
 * Icon and color mapping for tree view nodes
 */
export const getTreeNodeStyles = (type: NodeType) => {
  const styleMap: Record<NodeType, { color: string; bg: string; text: string }> = {
    EquipmentType: {
      color: 'text-blue-700',
      bg: 'bg-blue-50 border-blue-100',
      text: 'text-blue-900 font-semibold',
    },
    Equipment: {
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/50 border-indigo-100',
      text: 'text-indigo-900 font-medium',
    },
    Assembly: {
      color: 'text-orange-600',
      bg: 'bg-white border-transparent hover:bg-gray-50',
      text: 'text-gray-700',
    },
    Component: {
      color: 'text-emerald-500',
      bg: 'bg-white border-transparent hover:bg-gray-50',
      text: 'text-gray-600',
    },
    Root: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    Category: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    System: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    SubSystem: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    SubSystemCode: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    ComponentGroup: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    PartGroup: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
    Part: {
      color: 'text-gray-400',
      bg: '',
      text: 'text-gray-600',
    },
  };

  return styleMap[type] || styleMap.Root;
};
