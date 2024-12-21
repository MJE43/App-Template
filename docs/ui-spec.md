# Progressio: UI/UX Specification
**Version:** 1.0
**Date:** December 20, 2024

## Layout Structure

### Main Application Layout
- **Split View (70/30)**
  - Left side (70%): Composition Space
  - Right side (30%): AI Chat Interface
  - Resizable divider between panels
  - Minimum widths enforced for usability

### Composition Space Layout
- **Vertical Organization**
  1. Top Bar (60px height)
     - Project title
     - Genre/Era indicators
     - Basic controls (save, export, settings)
  
  2. Timeline View (200px height)
     - Measure divisions
     - Time signature display (4/4 default)
     - Chord blocks
     - Playback position indicator
  
  3. Chord Bank (Remaining height)
     - Organized grid layout
     - Search bar
     - Category filters
     - Scrollable area

### Chat Interface Layout
- **Vertical Organization**
  1. Context Bar (60px height)
     - Current musical context
     - Conversation settings
  
  2. Chat History (Flexible height)
     - Message bubbles
     - Chord suggestions
     - Scrollable area
  
  3. Input Area (100px height)
     - Message input
     - Send button
     - Context indicators

## Component Specifications

### Chord Timeline
```
Visual Specifications:
- Height: 200px
- Measure width: 160px
- Chord block height: 80px
- Grid snap: 1/4 measure intervals
- Horizontal scroll enabled
```

### Chord Blocks
```
Specifications:
- Size: 120px × 80px
- Padding: 8px
- Border radius: 8px
- Font: 24px for chord name
- Background: Purple gradient
- Hover state: Lightened 10%
- Active state: Brightened 15%
```

### Chord Bank Grid
```
Specifications:
- Grid: 4 columns
- Cell size: 120px × 60px
- Gap: 12px
- Padding: 16px
- Categories marked by dividers
- Search bar: 100% width, 40px height
```

### Chat Interface
```
Specifications:
- Message bubbles: Max 80% width
- User messages: Right-aligned, primary color
- AI messages: Left-aligned, secondary color
- Input field: 100% width - 48px
- Send button: 40px × 40px
```

## Interaction Patterns

### Chord Selection & Placement
1. **Primary Selection**
   - Click chord in bank
   - Preview audio plays
   - Keyboard visualization appears
   - Variant options display

2. **Variant Selection**
   - Show variants in popover
   - Preview on hover
   - Click to select
   - "Use once" vs "Set default" options

3. **Timeline Placement**
   - Click to place in timeline
   - Drag to reposition
   - Double-click to edit
   - Delete key/button to remove

### Audio Feedback
```
Specifications:
- Trigger: On any chord interaction
- Latency: < 100ms
- Duration: 2 seconds
- Fade out: 500ms
- Volume: User configurable
```

### AI Chat Interaction
1. **Message Types**
   - Text conversation
   - Chord suggestions
   - Progression feedback
   - Context updates

2. **Suggestion Display**
   - Highlighted chord names
   - Optional preview buttons
   - Implementation hints
   - Context explanations

## Visual Design

### Color Palette
```
Primary Colors:
- Background: #1a1a1a
- Surface: #2d2d2d
- Accent: #7c4dff
- Text: #ffffff

Semantic Colors:
- Success: #4caf50
- Warning: #ff9800
- Error: #f44336
- Info: #2196f3
```

### Typography
```
Font Families:
- Primary: Inter
- Monospace: JetBrains Mono

Size Scale:
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 24px
- 2xl: 30px
```

### Spacing Scale
```
- 2xs: 4px
- xs: 8px
- sm: 12px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
```

## Responsive Behavior

### Breakpoints
```
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
```

### Adaptive Layout
1. **Desktop (>= 1024px)**
   - Full split view (70/30)
   - All features visible

2. **Tablet (768px - 1023px)**
   - Collapsible chat panel
   - Reduced chord bank columns
   - Simplified timeline view

3. **Mobile (< 768px)**
   - Tab-based navigation
   - Single column layouts
   - Essential features only

## Accessibility

### Requirements
1. **Keyboard Navigation**
   - Full chord bank navigation
   - Timeline manipulation
   - Chat interface access
   - Modal/popover handling

2. **Screen Reader Support**
   - ARIA labels for all controls
   - Meaningful element roles
   - Status announcements
   - Chord descriptions

3. **Color & Contrast**
   - WCAG AA compliance
   - High contrast mode support
   - Color-blind friendly palette
   - Focus indicators

4. **Motion & Animation**
   - Respects reduced motion
   - Optional transitions
   - No essential animations
   - Stable layout

## Implementation Guidelines

### Component Architecture
1. **Core Components**
   - ChordBlock
   - Timeline
   - ChordBank
   - ChatInterface
   - GenreSelector

2. **Shared Components**
   - Button
   - Input
   - Select
   - Modal
   - Popover

3. **Layout Components**
   - SplitView
   - Panel
   - Header
   - Container

### State Management
```
Zustand Stores:
- progressionStore
- audioStore
- chatStore
- preferencesStore
```

### Performance Targets
```
Metrics:
- Initial load: < 2s
- Time to interactive: < 3s
- Input latency: < 50ms
- Animation FPS: 60
```
