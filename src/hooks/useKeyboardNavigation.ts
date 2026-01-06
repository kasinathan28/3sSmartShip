import { useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';
import { KEYBOARD, ANIMATION } from '../utils/constants';

/**
 * Custom hook for keyboard navigation in ReactFlow
 * Handles zoom and pan operations via keyboard shortcuts
 */
export const useKeyboardNavigation = () => {
  const { zoomIn, zoomOut, getViewport, setViewport } = useReactFlow();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Zoom operations
      if (event.key === '=' || event.key === '+') {
        event.preventDefault();
        zoomIn({ duration: ANIMATION.FAST });
        return;
      }

      if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        zoomOut({ duration: ANIMATION.FAST });
        return;
      }

      // Pan operations
      const { x, y, zoom } = getViewport();
      let newX = x;
      let newY = y;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          newY += KEYBOARD.PAN_STEP;
          break;
        case 'ArrowDown':
          event.preventDefault();
          newY -= KEYBOARD.PAN_STEP;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newX += KEYBOARD.PAN_STEP;
          break;
        case 'ArrowRight':
          event.preventDefault();
          newX -= KEYBOARD.PAN_STEP;
          break;
        default:
          return;
      }

      setViewport({ x: newX, y: newY, zoom }, { duration: ANIMATION.FAST });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, getViewport, setViewport]);
};
