# Conjured Animals Tracker

A React + TypeScript app for tracking D&D conjured creature stats during gameplay.

## Project Structure

```
src/
├── App.tsx                 # Main app component (state management)
├── components/
│   ├── AnimalCard.tsx      # Individual animal card with HP tracking
│   └── ImageModal.tsx      # Full-size stat block image viewer
└── types.ts               # TypeScript interfaces
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

## Setup

### Create React App
```bash
npx create-react-app d-d-tracker --template typescript
cd d-d-tracker
# Copy all files into src/ (replacing App.tsx, index.tsx)
npm start
```

### Vite
```bash
npm create vite@latest d-d-tracker -- --template react-ts
cd d-d-tracker
npm install
# Copy all files into src/
npm run dev
```

## Features

- ✅ Add multiple conjured creatures
- ✅ Upload stat block screenshots
- ✅ Track HP live with damage inputs
- ✅ Visual HP bar with color changing
- ✅ Click image to view full stat block
- ✅ Remove creatures when dismissed
- ✅ Responsive grid layout
- ✅ Keyboard support (Enter to submit)

## Usage

1. **Add Creature**: Enter name, max HP, optionally upload stat block image
2. **Track Damage**: Enter damage amount and click "Damage"
3. **View Stats**: Click the image to open full-size stat block in modal
4. **Remove**: Click "Remove" when creature is dismissed

## Styling

All components use CSS variables for theming:
- `--surface-1`, `--surface-2` - Background colors
- `--border`, `--border-strong` - Border colors
- `--text-primary`, `--text-secondary` - Text colors

If using Claude.ai or a CSS variable-aware environment, styling adapts automatically.
