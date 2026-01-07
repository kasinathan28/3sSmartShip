import React from 'react';
import type { TreeNodeData, NodeType } from '../../types';
import { Circle, Box, Layers, Zap, Anchor } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  isVisible: boolean;
  searchMatch?: boolean; // Highlight if matches search
}

// Map types to icons and colors
const getTypeStyles = (type: NodeType) => {
  switch (type) {
    case 'EquipmentType':
      return { 
        icon: Anchor, 
        color: 'text-blue-700', 
        bg: 'bg-blue-50 border-blue-100',
        text: 'text-blue-900 font-semibold'
      };
    case 'Equipment':
      return { 
        icon: Zap, 
        color: 'text-indigo-600', 
        bg: 'bg-indigo-50/50 border-indigo-100',
        text: 'text-indigo-900 font-medium'
      };
    case 'Assembly':
      return { 
        icon: Layers, 
        color: 'text-orange-600', 
        bg: 'bg-white border-transparent hover:bg-gray-50',
        text: 'text-gray-700'
      };
    case 'Component':
      return { 
        icon: Box, 
        color: 'text-emerald-500', 
        bg: 'bg-white border-transparent hover:bg-gray-50',
        text: 'text-gray-600'
      };
    default:
      return { 
        icon: Circle, 
        color: 'text-gray-400', 
        bg: '',
        text: 'text-gray-600'
      };
  }
};

export const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level, 
  isVisible,
  searchMatch
}) => {
  if (!isVisible) return null;

  const styles = getTypeStyles(node.type);
  const Icon = styles.icon;

  return (
    <div 
      className={twMerge(
        "group relative flex items-center py-2 pr-3 rounded-md border transition-all duration-200 select-none",
        styles.bg,
        searchMatch ? "ring-2 ring-blue-400 ring-offset-1 bg-yellow-50" : "border-transparent"
      )}
      style={{ marginLeft: `${level * 24}px` }} // Hierarchical indentation
    >
      {/* Connecting Lines for visual hierarchy (optional but helps) */}
      {level > 0 && (
         <div 
            className="absolute left-[-13px] top-1/2 w-[12px] h-px bg-gray-200 group-hover:bg-gray-300 transition-colors"
         />
      )}
      {level > 0 && (
        <div 
            className="absolute left-[-13px] top-[-10px] bottom-1/2 w-px bg-gray-200 group-hover:bg-gray-300 transition-colors h-[calc(100%+20px)]"
        />
      )}

      {/* Expand/Collapse Button - Removed as per user request */}
      {/* <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggle(node.id);
        }}
        className={twMerge(
          "w-6 h-6 flex items-center justify-center mr-2 rounded hover:bg-black/5 text-gray-400 transition-colors",
          !hasChildren && "invisible"
        )}
      >
        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button> */}

      {/* Node Content */}
      <div className="flex items-center gap-2.5 cursor-pointer">
        <Icon size={16} className={styles.color} />
        <span className={twMerge("text-sm", styles.text)}>
          {node.label}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 text-gray-500 font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity">
          {node.type}
        </span>
      </div>
    </div>
  );
};
