import { memo } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus, Scan } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';
import { twMerge } from 'tailwind-merge';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { ANIMATION } from '../../utils/constants';

/**
 * TreeFooter Component
 * Provides controls and legend for the tree visualization
 * Includes keyboard navigation support and collapsible UI
 */

interface TreeFooterProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface LegendItemProps {
    color: string;
    label: string;
}

/**
 * LegendItem - Displays a single legend entry
 */
const LegendItem = memo(({ color, label }: LegendItemProps) => (
    <div className="flex items-center gap-1.5">
        <div className={`w-3 h-3 rounded ${color}`} />
        <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
));

LegendItem.displayName = 'LegendItem';

/**
 * Controls - Zoom and fit view controls
 * Extracted as a separate component to avoid duplication
 */
const Controls = memo(() => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => zoomIn({ duration: ANIMATION.NORMAL })}
                className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                aria-label="Zoom In"
            >
                <Plus size={18} strokeWidth={2} />
            </button>
            <button
                type="button"
                onClick={() => zoomOut({ duration: ANIMATION.NORMAL })}
                className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                aria-label="Zoom Out"
            >
                <Minus size={18} strokeWidth={2} />
            </button>
            <button
                type="button"
                onClick={() => fitView({ duration: ANIMATION.NORMAL })}
                className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                aria-label="Fit View"
            >
                <Scan size={18} strokeWidth={2} />
            </button>
        </div>
    );
});

Controls.displayName = 'Controls';

/**
 * TreeFooter Component
 */
const TreeFooterComponent = ({ isOpen, onToggle }: TreeFooterProps) => {
    // Use custom hook for keyboard navigation
    useKeyboardNavigation();

    return (
        <div className="absolute bottom-6 left-6 right-6 z-50 flex flex-col justify-end pointer-events-none">
            {/* Expanded Footer Panel */}
            <div
                className={twMerge(
                    'bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100',
                    'relative transition-all duration-300 ease-in-out origin-bottom',
                    isOpen
                        ? 'opacity-100 translate-y-0 p-4 pointer-events-auto nopan'
                        : 'opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden'
                )}
            >
                {/* Top Center Toggle (Only visible when Expanded) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-label="Collapse footer"
                        className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100 text-gray-500 hover:text-gray-900 transition-all hover:scale-105"
                    >
                        <ChevronDown size={16} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Top Row: Info + Controls */}
                    <div className="flex items-start justify-between">
                        {/* Breadcrumbs Placeholder */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 box-decoration-clone">
                            <span>Equipments</span>
                            <span>/</span>
                            <span>Engine</span>
                            <span>/</span>
                            <span className="text-blue-600 font-medium whitespace-nowrap">
                                Main Engine & Propulsion
                            </span>
                        </div>

                        <div className="shrink-0 ml-4">
                            <Controls />
                        </div>
                    </div>

                    {/* Bottom Row: Legend */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-gray-50">
                        <LegendItem color="bg-node-system" label="Equipment Type" />
                        <LegendItem color="bg-node-subsystem" label="Equipment" />
                        <LegendItem color="bg-node-subsystem-code" label="Equipment (Draft)" />
                        <LegendItem color="bg-node-part-group" label="Assembly" />
                        <LegendItem color="bg-node-component" label="Assembly (Draft)" />
                        <LegendItem color="bg-node-part" label="Component" />
                        <LegendItem color="bg-node-part-light" label="Component (Draft)" />
                    </div>
                </div>
            </div>

            {/* Collapsed State Controls */}
            <div
                className={twMerge(
                    'absolute bottom-0 left-0 right-0 flex items-center justify-between',
                    'transition-all duration-300 ease-in-out',
                    !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                )}
            >
                <div className="flex-1" />

                {/* Center Toggle */}
                <div className="pointer-events-auto nopan">
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-label="Expand footer"
                        className="bg-white rounded-full p-2 shadow-md border border-gray-100 text-gray-500 hover:text-gray-900 transition-all hover:scale-105"
                    >
                        <ChevronUp size={20} />
                    </button>
                </div>

                {/* Right Controls */}
                <div className="flex-1 flex justify-end pointer-events-auto nopan">
                    <Controls />
                </div>
            </div>
        </div>
    );
};

export const TreeFooter = memo(TreeFooterComponent);
