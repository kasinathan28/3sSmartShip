/**
 * Application-wide constants
 * Centralized configuration for magic numbers and reusable values
 */

// Layout Constants
export const LAYOUT = {
  NODE_WIDTH: 220,
  NODE_HEIGHT: 60,
  NODE_SPACING_VERTICAL: 40,
  NODE_SPACING_HORIZONTAL: 100,
  SIDEBAR_WIDTH: 288,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Keyboard Navigation
export const KEYBOARD = {
  PAN_STEP: 50,
  ZOOM_KEYS: ['=', '+', '-', '_'],
  ARROW_KEYS: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
} as const;

// ReactFlow Configuration
export const REACT_FLOW_CONFIG = {
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 2,
  FIT_VIEW_PADDING: 0.2,
  EDGE_BORDER_RADIUS: 50,
  EDGE_STROKE_WIDTH: 2,
} as const;

// Search Configuration
export const SEARCH = {
  DEBOUNCE_MS: 300,
  MIN_SEARCH_LENGTH: 1,
} as const;
