import { useMemo } from 'react';
import type { TreeNodeData } from '../types';

interface SearchResult {
  visible: Set<string>;
  expanded: Set<string>;
  matches: Set<string>;
}

/**
 * Custom hook for tree search functionality
 * Efficiently searches through tree structure and returns matching nodes
 */
export const useTreeSearch = (
  data: TreeNodeData[],
  searchTerm: string
): SearchResult | null => {
  return useMemo(() => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return null;

    const visible = new Set<string>();
    const expanded = new Set<string>();
    const matches = new Set<string>();
    const loweredTerm = trimmedTerm.toLowerCase();

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

    data.forEach(traverse);
    return { visible, expanded, matches };
  }, [data, searchTerm]);
};
