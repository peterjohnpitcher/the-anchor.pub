# The Anchor Style Guide

## Color Usage Rules

### Background Colors & Text Combinations

**IMPORTANT**: Always ensure proper contrast for accessibility.

#### Green Backgrounds
- `bg-anchor-green` → MUST use `text-white`
- `bg-gradient-*-anchor-green` → MUST use `text-white`
- Never use `text-anchor-green` on green backgrounds

#### Gold Backgrounds
- `bg-anchor-gold` → Use `text-white` or `text-anchor-green`
- `bg-anchor-gold-light` → Use `text-anchor-green`

#### Text Colors
- `text-anchor-green` → Only use on white, light gray, or cream backgrounds
- `text-anchor-gold` → Can be used on white, dark backgrounds, or as accent
- `text-white` → Use on all dark backgrounds (green, charcoal, dark gradients)

### Component Guidelines

#### Sections with Brand Colors
```tsx
// ✅ CORRECT - White text on green
<section className="bg-anchor-green text-white">
  <h2 className="text-3xl font-bold">Title</h2>
</section>

// ❌ WRONG - Green text on green
<section className="bg-anchor-green">
  <h2 className="text-3xl font-bold text-anchor-green">Title</h2>
</section>
```

#### Headings
- On white/light backgrounds: Use `text-anchor-green`
- On green backgrounds: Use `text-white` (never `text-anchor-green`)
- On dark backgrounds: Use `text-white`

### Standard Components

Use the provided UI components to ensure consistency:
- `GreenSection` - Automatically enforces white text
- `StatusBar` - Has built-in theming with proper contrast
- `CallToAction` - Variants handle contrast automatically