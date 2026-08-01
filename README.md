# Conjured Animals Tracker

A React + TypeScript app for tracking D&D conjured creature stats so you don't have to do math.

## Project Structure

```
src/
├── App.tsx                     # Main app component (state management)
├── components/
│   ├── AnimalCard.tsx          # Individual animal card with HP tracking
│   └── ImageModal.tsx          # Full-size stat block image viewer
├── styles/
│   ├── index.css              # Global styles and CSS variables
│   ├── App.css                # App component styles
│   ├── AnimalCard.css         # AnimalCard component styles
│   └── ImageModal.css         # ImageModal component styles
└── types.ts                    # TypeScript interfaces
```

## Components

### `App.tsx`
Main component that handles:
- State management for all animals
- Input form for adding new creatures
- Image upload handling
- Damage calculation logic

**Props:** None (root component)

### `AnimalCard.tsx`
Displays individual creature card with:
- Creature image (clickable to open modal)
- Creature name
- HP display and visual HP bar
- Damage input and apply button
- Remove button

**Props:**
- `animal: ConjuredAnimal` - Creature data
- `damageInput: string` - Current damage input value
- `onDamageInputChange: (value: string) => void` - Updates damage input
- `onApplyDamage: (id: string) => void` - Applies damage
- `onDelete: (id: string) => void` - Removes creature

### `ImageModal.tsx`
Modal popup for viewing stat block at full size.

**Props:**
- `isOpen: boolean` - Whether modal is visible
- `imageData: string` - Base64 image data
- `animalName: string` - Creature name (for alt text)
- `onClose: () => void` - Close callback

### `types.ts`
Shared TypeScript interface:
```typescript
interface ConjuredAnimal {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  imageData?: string;
}
```

## CSS Architecture

All styles are organized into separate `.css` files for maintainability:

- **`styles/index.css`** — Global theme, CSS variables, and base styles
  - Dark D&D Beyond-inspired color scheme
  - Reusable CSS variables for consistent theming
  - Global scrollbar and selection styling

- **`styles/App.css`** — Main container and input form styles
  - Layout, typography, form inputs
  - Grid system for animal cards
  - Responsive breakpoints

- **`styles/AnimalCard.css`** — Individual card component styles
  - Card design with borders and shadows
  - HP bar and status indicators
  - Button styles (damage, heal, remove)
  - Animations and hover effects

- **`styles/ImageModal.css`** — Full-screen image viewer modal
  - Overlay backdrop
  - Centered modal content
  - Close button with animations

### CSS Variables
All colors and styling values use CSS variables defined in `index.css`:
```css
--bg-primary, --bg-secondary, --bg-tertiary
--accent-red, --accent-green, --accent-gold
--text-primary, --text-secondary
--shadow-sm, --shadow-md, --shadow-lg
```

## Run Locally

### Vite
```bash
npm install
npm run start
```

### Import global styles in index.tsx
```tsx
import './styles/index.css';
import App from './App';
```


## Styling

All components use CSS variables for theming:
- `--surface-1`, `--surface-2` - Background colors
- `--border`, `--border-strong` - Border colors
- `--text-primary`, `--text-secondary` - Text colors

