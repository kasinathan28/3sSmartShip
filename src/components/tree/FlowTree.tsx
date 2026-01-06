import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    type Edge,
    type Node,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useMemo, useState, useCallback } from 'react';
import type { TreeNodeData } from '../../types';
import { CustomNode } from './CustomNode';
import { SearchInput } from '../common/Input';
import { TreeFooter } from './TreeFooter';
import { calculateLayout } from '../../utils/layoutEngine';
import { REACT_FLOW_CONFIG } from '../../utils/constants';

/**
 * FlowTree Component
 * Main tree visualization component using ReactFlow
 * Handles node expansion, search, and layout
 */

interface FlowTreeProps {
    data: TreeNodeData[];
}

const nodeTypes = {
    custom: CustomNode,
};

/**
 * Transform tree data into ReactFlow nodes and edges
 */
const transformDataToFlow = (
    data: TreeNodeData[],
    expandedIds: Set<string>,
    hiddenIds: Set<string>,
    onToggle: (id: string) => void
): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const queue: { data: TreeNodeData; parentId: string | null; level: number }[] =
        data.map((d) => ({ data: d, parentId: null, level: 0 }));

    while (queue.length > 0) {
        const { data: item, parentId, level } = queue.shift()!;

        if (hiddenIds.has(item.id)) continue;

        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedIds.has(item.id);

        nodes.push({
            id: item.id,
            type: 'custom',
            data: {
                label: item.label,
                type: item.type,
                level,
                isExpanded: !!isExpanded,
                hasChildren: !!hasChildren,
                onToggle,
            },
            position: { x: 0, y: 0 },
        });

        if (parentId) {
            edges.push({
                id: `${parentId}-${item.id}`,
                source: parentId,
                target: item.id,
                type: 'smoothstep',
                animated: false,
                className: '[&_path]:animate-draw-edge',
                style: { stroke: '#E5E7EB', strokeWidth: REACT_FLOW_CONFIG.EDGE_STROKE_WIDTH },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: '#E5E7EB',
                },
            });
        }

        if (item.children && isExpanded) {
            item.children.forEach((child) => {
                queue.push({ data: child, parentId: item.id, level: level + 1 });
            });
        }
    }

    return { nodes, edges };
};

/**
 * Get visible node IDs based on search term
 */
const getVisibleSet = (nodes: TreeNodeData[], term: string): Set<string> => {
    const visible = new Set<string>();
    const lowerTerm = term.toLowerCase().trim();
    if (!lowerTerm) return new Set();

    const traverse = (node: TreeNodeData): boolean => {
        const isMatch = node.label.toLowerCase().includes(lowerTerm);
        let childMatch = false;

        if (node.children) {
            for (const c of node.children) {
                if (traverse(c)) childMatch = true;
            }
        }

        if (isMatch || childMatch) {
            visible.add(node.id);
            return true;
        }
        return false;
    };

    nodes.forEach(traverse);
    return visible;
};

export const FlowTree: React.FC<FlowTreeProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [footerOpen, setFooterOpen] = useState(true);

    // Initialize expanded state
    useEffect(() => {
        const initial = new Set<string>();
        data.forEach((d) => {
            initial.add(d.id);
            if (d.children) d.children.forEach((c) => initial.add(c.id));
        });
        setExpandedIds(initial);
    }, [data.length]);

    // Toggle node expansion
    const handleToggle = useCallback((id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    // Calculate nodes and edges with layout
    const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
        let currentExpanded = expandedIds;
        let hiddenIds = new Set<string>();

        // Handle search filtering
        if (searchTerm.trim()) {
            const visibleSet = getVisibleSet(data, searchTerm);
            const searchExpanded = new Set<string>(currentExpanded);

            // Auto-expand nodes with visible descendants
            const expandIfHasVisibleDescendant = (node: TreeNodeData) => {
                if (node.children) {
                    for (const c of node.children) {
                        if (visibleSet.has(c.id)) {
                            searchExpanded.add(node.id);
                            expandIfHasVisibleDescendant(c);
                        }
                    }
                }
            };
            data.forEach(expandIfHasVisibleDescendant);

            currentExpanded = searchExpanded;

            // Collect hidden nodes
            const collectAll = (n: TreeNodeData[]) => {
                n.forEach((no) => {
                    if (!visibleSet.has(no.id)) hiddenIds.add(no.id);
                    if (no.children) collectAll(no.children);
                });
            };
            collectAll(data);
        }

        const raw = transformDataToFlow(data, currentExpanded, hiddenIds, handleToggle);
        return calculateLayout(raw.nodes, raw.edges);
    }, [data, expandedIds, searchTerm, handleToggle]);

    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    // Update nodes and edges when layout changes
    useEffect(() => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 w-full bg-surface-0 rounded-l-xl rounded-r-none overflow-hidden border border-surface-200 border-r-0 shadow-sm flex flex-col relative">
                {/* Gradient Shadows */}
                <div className="absolute top-0 left-0 bottom-0 w-[81px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[81px] bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

                {/* Search Overlay */}
                <div className="absolute top-4 left-4 z-10">
                    <SearchInput
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: REACT_FLOW_CONFIG.FIT_VIEW_PADDING }}
                    minZoom={REACT_FLOW_CONFIG.MIN_ZOOM}
                    maxZoom={REACT_FLOW_CONFIG.MAX_ZOOM}
                    defaultEdgeOptions={{
                        type: 'smoothstep',
                        // @ts-expect-error - pathOptions is valid but not in types
                        pathOptions: { borderRadius: REACT_FLOW_CONFIG.EDGE_BORDER_RADIUS },
                        style: { strokeWidth: REACT_FLOW_CONFIG.EDGE_STROKE_WIDTH },
                    }}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color="#e2e8f0" gap={20} size={1} />
                    <TreeFooter isOpen={footerOpen} onToggle={() => setFooterOpen(!footerOpen)} />
                </ReactFlow>
            </div>
        </div>
    );
};
