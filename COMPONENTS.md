# Component Documentation

## 📦 UI Components (`/src/components/ui/`)

### Button Component
**File:** `button.tsx`  
**Variants:**
- `default` - Emerald background with border
- `ghost` - Transparent with hover effect
- `outline` - Border only with hover glow
- `terminal` - Special hacker-style with glow

**Sizes:**
- `sm` - Small (px-3 py-1.5)
- `default` - Medium (px-4 py-2)
- `lg` - Large (px-6 py-3)

**Example:**
```tsx
<Button variant="terminal" size="lg">
  <Icon className="w-4 h-4" />
  Button Text
</Button>
```

---

### Card Component
**File:** `card.tsx`  
**Sub-components:**
- `Card` - Main container with glassmorphic effect
- `CardHeader` - Top section
- `CardTitle` - Title with emerald color
- `CardDescription` - Subtitle in zinc-400
- `CardContent` - Main content area
- `CardFooter` - Bottom section

**Features:**
- Backdrop blur effect
- Border glow on hover
- Dark background with transparency

**Example:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

---

## 🎨 Custom Components

### MatrixBackground
**File:** `matrix-bg.tsx`  
**Type:** Client Component  
**Purpose:** Animated binary rain effect

**Features:**
- Canvas-based animation
- Binary digits (0, 1) falling
- Emerald green color (#10b981)
- Auto-resizes with window
- Low opacity (0.3) for background effect

**Usage:**
```tsx
import { MatrixBackground } from "@/components/matrix-bg"

<div className="relative">
  <MatrixBackground />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>
```

**Performance:**
- Uses `requestAnimationFrame` via setInterval
- Cleans up on unmount
- Responds to window resize

---

### TerminalText
**File:** `terminal-text.tsx`  
**Type:** Client Component  
**Purpose:** Typewriter animation effect

**Props:**
- `text` (string) - Text to animate
- `delay` (number, default: 50) - Delay between characters in ms
- `className` (string) - Additional CSS classes

**Features:**
- Character-by-character reveal
- Blinking cursor during typing
- Customizable speed

**Example:**
```tsx
<TerminalText 
  text="SentinelCode" 
  delay={100} 
  className="text-2xl"
/>
```

---

## 🛠️ Utility Functions

### cn (Class Name Utility)
**File:** `lib/utils.ts`  
**Purpose:** Merge Tailwind classes intelligently

**Implementation:**
```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```tsx
className={cn(
  "base-class",
  condition && "conditional-class",
  variant === "primary" && "primary-class",
  className // User-provided classes
)}
```

**Why use it?**
- Prevents Tailwind class conflicts
- Handles conditional classes cleanly
- Merges user-provided classes properly

---

## 📊 Chart Components (Recharts)

### Used Charts:

#### AreaChart
**Where:** Dashboard (Issues over time)  
**Features:**
- Gradient fills
- Multiple data series
- Custom tooltips
- Monospace font labels

#### PieChart
**Where:** Dashboard (Severity distribution)  
**Features:**
- Donut style (innerRadius/outerRadius)
- Custom colors per segment
- Legend below chart

#### LineChart
**Where:** Insights (Accuracy improvement)  
**Features:**
- Multiple lines
- Dashed lines for secondary data
- Active dot highlighting

#### BarChart
**Where:** Insights (Confidence distribution)  
**Features:**
- Horizontal layout
- Stacked bars
- Color-coded by severity

### Common Configuration:
```tsx
<ResponsiveContainer width="100%" height={300}>
  <ChartType data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
    <XAxis stroke="#71717a" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
    <YAxis stroke="#71717a" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: '#000', 
        border: '1px solid #10b981',
        borderRadius: '8px',
        fontFamily: 'monospace'
      }} 
    />
  </ChartType>
</ResponsiveContainer>
```

---

## 🎨 Design Tokens

### Colors (from globals.css)
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Tailwind Custom Colors
- **emerald-400:** `#10b981` (Primary actions, success)
- **emerald-500:** `#059669` (Darker primary)
- **red-400:** `#ef4444` (Critical severity)
- **orange-400:** `#f59e0b` (High severity)
- **yellow-400:** `#eab308` (Medium severity)
- **blue-400:** `#3b82f6` (Info)
- **purple-400:** `#a855f7` (Special metrics)
- **zinc-400:** `#a1a1aa` (Secondary text)
- **zinc-800:** `#27272a` (Borders)
- **zinc-900:** `#18181b` (Darker backgrounds)

### Typography
- **Font Family:** Geist Sans, Geist Mono
- **Font Weights:** Regular (400), Semibold (600), Bold (700)
- **Font Sizes:** xs, sm, base, lg, xl, 2xl, 3xl

---

## 🔧 Component Best Practices

### 1. Always use the `cn` utility
```tsx
// ✅ Good
className={cn("base-class", variant === "primary" && "primary-class")}

// ❌ Avoid
className={`base-class ${variant === "primary" ? "primary-class" : ""}`}
```

### 2. Use semantic HTML
```tsx
// ✅ Good
<Button variant="terminal">Submit</Button>

// ❌ Avoid
<div className="button-styles" onClick={...}>Submit</div>
```

### 3. Consistent spacing
- Cards: `p-6` for content
- Buttons: `px-4 py-2` for default
- Gaps: `gap-4` for grids, `gap-2` for flex

### 4. Animation patterns
```tsx
// Framer Motion entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
```

---

## 📱 Responsive Patterns

### Grid Layouts
```tsx
// Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

### Conditional Rendering
```tsx
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="lg:hidden"
```

### Sidebar Pattern
```tsx
<div className="flex">
  <aside className="hidden lg:block w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

---

## 🎯 Component Hierarchy

```
App Layout (layout.tsx)
├── MatrixBackground
└── Page Content
    ├── Header (with navigation)
    ├── Main Content Area
    │   ├── Cards
    │   │   ├── CardHeader
    │   │   ├── CardContent (with Charts)
    │   │   └── CardFooter
    │   └── Buttons
    └── Footer (optional)
```

---

## 🚀 Creating New Components

### Template:
```tsx
"use client" // If using hooks

import { cn } from "@/lib/utils"

interface MyComponentProps {
  variant?: "default" | "special"
  className?: string
  children?: React.ReactNode
}

export function MyComponent({ 
  variant = "default", 
  className,
  children 
}: MyComponentProps) {
  return (
    <div className={cn(
      "base-styles",
      variant === "special" && "special-styles",
      className
    )}>
      {children}
    </div>
  )
}
```

### Checklist:
- [ ] Define TypeScript interface
- [ ] Use `cn()` for className merging
- [ ] Add default props
- [ ] Support className override
- [ ] Add JSDoc comments (optional)
- [ ] Export from component file

---

## 📝 Notes

- All UI components are in `/src/components/ui/`
- Custom components are in `/src/components/`
- Use `"use client"` directive for interactive components
- Import from `@/` paths (configured in tsconfig.json)
- Follow the existing design patterns for consistency

---

Need to add a new component? Follow the patterns above! 🎨
