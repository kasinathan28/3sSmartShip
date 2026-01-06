# 3S Smart Ship Solutions - Fleet Management System

A modern, production-ready fleet management application built with React, TypeScript, and ReactFlow for hierarchical equipment visualization.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 3sSmart

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
3sSmart/
├── src/
│   ├── components/          # React components
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Breadcrumbs.tsx    # Navigation breadcrumbs
│   │   │   └── Input.tsx          # Search input with expand animation
│   │   ├── layout/          # Layout components
│   │   │   ├── MainLayout.tsx     # Main app layout wrapper
│   │   │   └── Sidebar.tsx        # Navigation sidebar
│   │   └── tree/            # Tree visualization components
│   │       ├── CustomNode.tsx     # ReactFlow custom node
│   │       ├── FlowTree.tsx       # Main tree visualization
│   │       ├── TreeFooter.tsx     # Controls and legend
│   │       ├── TreeNode.tsx       # Alternative tree view node
│   │       └── TreeView.tsx       # Alternative list-based tree
│   ├── data/                # Static data and configuration
│   │   ├── mockData.ts      # Vessel hierarchy mock data
│   │   └── navigation.ts    # Sidebar navigation structure
│   ├── hooks/               # Custom React hooks
│   │   ├── useKeyboardNavigation.ts  # Keyboard controls for tree
│   │   └── useTreeSearch.ts          # Tree search functionality
│   ├── pages/               # Page components
│   │   └── FleetManagement.tsx       # Main fleet management page
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types
│   ├── utils/               # Utility functions
│   │   ├── constants.ts     # Application constants
│   │   ├── layoutEngine.ts  # Dagre layout calculations
│   │   └── nodeStyles.ts    # Node styling utilities
│   ├── App.tsx              # Root application component
│   ├── index.css            # Global styles and design tokens
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── tailwind.config.cjs      # Tailwind CSS configuration
```

## 🏗️ Architecture & Design Decisions

### Component Structure

#### 1. **Separation of Concerns**
- **Components**: Pure presentational logic
- **Hooks**: Reusable stateful logic
- **Utils**: Pure functions and calculations
- **Data**: Static configuration and mock data

#### 2. **Performance Optimizations**
- **Memoization**: All components use `React.memo()` to prevent unnecessary re-renders
- **Custom Hooks**: Extract complex logic for reusability and testing
- **Layout Caching**: Dagre layout calculations are memoized
- **Lazy Evaluation**: Search and filter operations only run when needed

#### 3. **Type Safety**
- Full TypeScript coverage with strict mode
- Proper interface definitions for all props
- Type-safe utility functions

### Key Components

#### **FlowTree** (`src/components/tree/FlowTree.tsx`)
The main tree visualization component using ReactFlow.

**Features:**
- Hierarchical node layout using Dagre algorithm
- Real-time search with auto-expansion
- Keyboard navigation (arrow keys, +/-, zoom)
- Smooth animations and transitions

**Performance Considerations:**
- Layout calculations extracted to `layoutEngine.ts`
- Memoized node/edge transformations
- Efficient search algorithm with early termination

#### **CustomNode** (`src/components/tree/CustomNode.tsx`)
Individual node component in the ReactFlow visualization.

**Features:**
- Color-coded by equipment type
- Expand/collapse functionality
- Keyboard accessible
- Hover effects and animations

**Optimizations:**
- Style calculations moved to pure functions
- Memoized to prevent re-renders
- Event handlers extracted for clarity

#### **Sidebar** (`src/components/layout/Sidebar.tsx`)
Navigation sidebar with collapsible sections.

**Features:**
- Active route highlighting
- Collapsible menu sections
- User profile section
- Responsive design

**Bug Fixes:**
- Fixed `hasChildren` logic (was `length >= 0`, now `length > 0`)
- Extracted NavItem component for better organization

#### **TreeFooter** (`src/components/tree/TreeFooter.tsx`)
Controls and legend for tree visualization.

**Features:**
- Zoom controls (in/out/fit)
- Keyboard shortcuts
- Equipment type legend
- Collapsible UI

**Improvements:**
- Keyboard logic extracted to `useKeyboardNavigation` hook
- Controls component extracted to avoid duplication
- Proper TypeScript typing

### Custom Hooks

#### **useKeyboardNavigation** (`src/hooks/useKeyboardNavigation.ts`)
Handles keyboard shortcuts for tree navigation.

**Shortcuts:**
- `+` / `=`: Zoom in
- `-` / `_`: Zoom out
- Arrow keys: Pan view

#### **useTreeSearch** (`src/hooks/useTreeSearch.ts`)
Efficient tree search with auto-expansion of matching nodes.

**Algorithm:**
- Recursive depth-first search
- Tracks visible, expanded, and matched nodes
- Memoized for performance

### Utilities

#### **constants.ts**
Centralized configuration to eliminate magic numbers.

**Benefits:**
- Single source of truth
- Easy to modify
- Type-safe

#### **layoutEngine.ts**
Dagre-based layout calculations.

**Features:**
- Pure function (testable)
- Configurable spacing
- Left-to-right layout

#### **nodeStyles.ts**
Node styling logic extracted from components.

**Benefits:**
- Reusable across components
- Easier to maintain
- Testable

## 🎨 Design System

### Color Palette

```css
/* Primary Brand Colors */
--ds-primary-600: #5583F7;  /* Main brand color */

/* Node Type Colors */
--node-part: #34882D;        /* Dark Green - Components */
--node-part-group: #929090;  /* Dark Grey - Assemblies */
--node-subsystem: #003366;   /* Dark Blue - Equipment */
--node-system: #EA5050;      /* Red - Equipment Types */
```

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Spacing & Layout
- **Sidebar Width**: 288px
- **Node Dimensions**: 220px × 60px
- **Node Spacing**: 40px vertical, 100px horizontal

## 🔧 Configuration

### Environment Variables
Currently, no environment variables are required. All configuration is in source files.

### Tailwind Configuration
Custom design tokens defined in `tailwind.config.cjs`:
- Custom colors for node types
- Sidebar colors
- Animation utilities

## 🧪 Testing Recommendations

### Unit Tests
- Test pure functions in `utils/`
- Test custom hooks with React Testing Library
- Test component rendering with snapshots

### Integration Tests
- Test tree search functionality
- Test keyboard navigation
- Test node expansion/collapse

### E2E Tests
- Test full user workflows
- Test responsive behavior
- Test accessibility

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support for tree navigation
- **ARIA Labels**: Proper labels on interactive elements
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Semantic HTML structure

## 📊 Performance Metrics

### Optimizations Implemented
1. **React.memo()** on all components
2. **useMemo()** for expensive calculations
3. **useCallback()** for event handlers
4. **Code splitting** ready (can add React.lazy)
5. **Efficient search** with early termination

### Recommended Monitoring
- Lighthouse scores
- React DevTools Profiler
- Bundle size analysis

## 🚧 Known Limitations & Trade-offs

### Current Limitations
1. **Mock Data**: Using static mock data instead of API
2. **No Authentication**: User management not implemented
3. **Single View**: Only Fleet Management page is functional
4. **No Persistence**: State resets on page reload

### Trade-offs Made

#### 1. **ReactFlow vs Custom SVG**
- **Chosen**: ReactFlow
- **Reason**: Built-in pan/zoom, better performance, less code
- **Trade-off**: Larger bundle size, learning curve

#### 2. **Dagre Layout vs Manual**
- **Chosen**: Dagre algorithm
- **Reason**: Automatic, optimal layout
- **Trade-off**: Less control over exact positioning

#### 3. **Memoization Everywhere**
- **Chosen**: Aggressive memoization
- **Reason**: Prevent unnecessary re-renders
- **Trade-off**: More memory usage, complexity

#### 4. **TypeScript Strict Mode**
- **Chosen**: Strict TypeScript
- **Reason**: Catch errors early, better DX
- **Trade-off**: More verbose code

## 🔮 Future Improvements

### Short-term
- [ ] Add error boundaries
- [ ] Implement loading states
- [ ] Add unit tests
- [ ] API integration
- [ ] Local storage persistence

### Medium-term
- [ ] Real-time updates (WebSocket)
- [ ] Export functionality (PDF, CSV)
- [ ] Advanced filtering
- [ ] Drag-and-drop reordering
- [ ] Dark mode support

### Long-term
- [ ] Multi-vessel support
- [ ] Role-based access control
- [ ] Audit logging
- [ ] Mobile app
- [ ] Offline support

## 📝 Code Quality Standards

### Followed Best Practices
✅ Consistent naming conventions  
✅ Proper TypeScript typing  
✅ Component documentation  
✅ Separation of concerns  
✅ DRY principle  
✅ Single Responsibility Principle  
✅ Accessibility standards  
✅ Performance optimizations  

### Code Style
- **Formatting**: Prettier (recommended)
- **Linting**: ESLint with React rules
- **Naming**: camelCase for variables, PascalCase for components
- **File Structure**: One component per file

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

### Commit Message Format
```
type(scope): description

[optional body]
[optional footer]
```

**Types**: feat, fix, docs, style, refactor, test, chore

## 📄 License

[Add your license here]

## 👥 Team

**3S Smart Ship Solutions**  
Version 0.0.1

---

## 🆘 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Vite will automatically try the next available port
# Or specify a custom port:
npm run dev -- --port 3000
```

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Rebuild TypeScript
npm run build
```

### Getting Help
- Check existing issues on GitHub
- Review documentation
- Contact development team

---

**Built with ❤️ by 3S Smart Ship Solutions**
