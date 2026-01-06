import dagre from 'dagre';
import type { Edge, Node } from '@xyflow/react';
import { LAYOUT } from './constants';

/**
 * Layout engine for hierarchical tree visualization
 * Uses Dagre for automatic node positioning
 */

interface LayoutResult {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Calculate layout for nodes and edges using Dagre algorithm
 * This is a pure function that can be safely memoized
 */
export const calculateLayout = (
  nodes: Node[],
  edges: Edge[]
): LayoutResult => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'LR', // Left to right
    align: 'UL', // Align nodes to the top-left
    nodesep: LAYOUT.NODE_SPACING_VERTICAL,
    ranksep: LAYOUT.NODE_SPACING_HORIZONTAL,
  });

  // Add nodes to graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: LAYOUT.NODE_WIDTH,
      height: LAYOUT.NODE_HEIGHT,
    });
  });

  // Add edges to graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate layout
  dagre.layout(dagreGraph);

  // Apply calculated positions to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - LAYOUT.NODE_WIDTH / 2,
        y: nodeWithPosition.y - LAYOUT.NODE_HEIGHT / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};
