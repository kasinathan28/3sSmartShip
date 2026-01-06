import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Plus, Minus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { getCustomNodeStyles } from '../../utils/nodeStyles';

/**
 * CustomNode Component
 * Represents a single node in the ReactFlow tree visualization
 * Memoized to prevent unnecessary re-renders
 */

interface CustomNodeData extends Record<string, unknown> {
    label: string;
    type: string;
    isExpanded: boolean;
    hasChildren: boolean;
    onToggle: (id: string) => void;
    level: number;
}

const CustomNodeComponent = ({ data, id }: NodeProps<Node<CustomNodeData>>) => {
    // Get memoized styles based on node type and state
    const nodeStyles = getCustomNodeStyles(data.type, data.level, data.isExpanded);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (data.hasChildren && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.stopPropagation();
            data.onToggle(id);
        }
    };

    const handleToggleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        data.onToggle(id);
    };

    return (
        <div className="relative group">
            <Handle
                type="target"
                position={Position.Left}
                className="!bg-transparent !border-none"
            />

            <div
                className={twMerge(
                    'px-6 py-1.5 rounded-lg shadow-sm text-center relative transition-all duration-200',
                    'border-[1.5px] animate-scale-in-center cursor-pointer',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400',
                    'hover:border-black',
                    nodeStyles
                )}
                tabIndex={0}
                role="button"
                aria-expanded={data.isExpanded}
                aria-label={`Toggle ${data.label}`}
                onKeyDown={handleKeyDown}
            >
                <span className="text-sm font-medium tracking-wide block truncate max-w-[200px] mx-auto">
                    {data.label}
                </span>

                {data.hasChildren && (
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label={data.isExpanded ? 'Collapse' : 'Expand'}
                        className={twMerge(
                            'absolute -right-3 top-1/2 -translate-y-1/2',
                            'w-5 h-5 bg-white rounded-full text-gray-500',
                            'flex items-center justify-center shadow-sm',
                            'hover:scale-110 transition-transform cursor-pointer',
                            'border border-gray-100 p-0.5'
                        )}
                        onClick={handleToggleClick}
                    >
                        {data.isExpanded ? (
                            <Minus size={12} strokeWidth={3} />
                        ) : (
                            <Plus size={12} strokeWidth={3} />
                        )}
                    </button>
                )}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="!bg-transparent !border-none"
            />
        </div>
    );
};

// Memoize to prevent unnecessary re-renders
export const CustomNode = memo(CustomNodeComponent);
