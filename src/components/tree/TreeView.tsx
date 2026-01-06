import React, { useState, useMemo } from 'react';
import type { TreeNodeData } from '../../types';
import { TreeNode } from './TreeNode';
import { SearchInput } from '../common/Input';
import { Ship } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeViewProps {
  data: TreeNodeData[];
}

// Helper to find all IDs that lie on the path to a matching node
const searchTree = (nodes: TreeNodeData[], term: string): { visible: Set<string>, expanded: Set<string>, matches: Set<string> } => {
  const visible = new Set<string>();
  const expanded = new Set<string>();
  const matches = new Set<string>();
  const loweredTerm = term.toLowerCase();

  const traverse = (node: TreeNodeData): boolean => {
    const isMatch = node.label.toLowerCase().includes(loweredTerm);
    let childMatched = false;

    if (node.children) {
      for (const child of node.children) {
        if (traverse(child)) {
          childMatched = true;
        }
      }
    }

    if (isMatch) {
      matches.add(node.id);
      visible.add(node.id);
    }

    if (childMatched) {
      visible.add(node.id);
      expanded.add(node.id);
    }

    return isMatch || childMatched;
  };

  nodes.forEach(traverse);
  return { visible, expanded, matches };
};

export const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Derived state for search
  const searchResult = useMemo(() => {
    if (!searchTerm.trim()) return null;
    return searchTree(data, searchTerm);
  }, [data, searchTerm]);

  // Merge manual expansion with search expansion
  const finalExpandedIds = useMemo(() => {
    if (searchResult) {
      // When searching, we mostly rely on search result expanded, but user can still interpret
      // We can merge or just use search result.
      // Usually, search forces expansion.
      return new Set([...expandedIds, ...searchResult.expanded]);
    }
    return expandedIds;
  }, [expandedIds, searchResult]);

  const toggleExpand = (id: string) => {
    const newSet = new Set(finalExpandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  const renderTree = (nodes: TreeNodeData[], level: number = 0) => {
    return nodes.map(node => {
      // If we are searching, check visibility
      if (searchResult && !searchResult.visible.has(node.id)) {
        return null;
      }

      const isExpanded = finalExpandedIds.has(node.id);
      const isMatch = searchResult?.matches.has(node.id);

      return (
        <div key={node.id} className="flex flex-col">
          <TreeNode
            node={node}
            level={level}
            isExpanded={isExpanded}
            onToggle={toggleExpand}
            isVisible={true}
            searchMatch={isMatch}
          />
          <AnimatePresence>
            {node.children && isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="relative overflow-hidden"
                >
                    <div 
                    className="absolute left-[calc(1.5rem_*_var(--level)_+_.75rem)] w-px bg-gray-200 h-full"
                    style={{ '--level': level } as React.CSSProperties} 
                    />
                    {renderTree(node.children, level + 1)}
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Ship size={20} />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900">Fleet Hierarchy</h2>
                <p className="text-xs text-gray-500">Manage vessel equipment and components</p>
            </div>
        </div>
        
        {/* Search */}
        <SearchInput 
          placeholder="Search components..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <div className="flex flex-col gap-1">
          {renderTree(data)}
          {data.length === 0 && (
             <div className="text-center py-10 text-gray-400">No data available</div>
          )}
          {searchResult && searchResult.visible.size === 0 && (
             <div className="text-center py-10 text-gray-400">No matching results found</div>
          )}
        </div>
      </div>
    </div>
  );
};
