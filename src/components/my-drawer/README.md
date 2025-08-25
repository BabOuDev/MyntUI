# my-drawer

A sliding panel that can be positioned on any side of the viewport, containing supplementary content or navigation. Perfect for mobile menus, settings panels, and contextual information.

## Features

- **Multiple Positions**: Left, right, top, bottom positioning
- **Two Display Modes**: Overlay (floats above content) and push (moves content aside)
- **Responsive Design**: Adapts to different screen sizes with mobile-first approach
- **Touch Gestures**: Swipe to close functionality on mobile devices
- **Focus Management**: Automatic focus trapping and restoration
- **Accessibility**: Full keyboard navigation and screen reader support
- **Material Design 3**: Consistent elevation, motion, and theming
- **Customizable**: Multiple sizes, backdrop options, and styling hooks

## Usage

### Basic Drawer

```html
<my-drawer id="navigation-drawer">
  <div slot="header">
    <h3>Navigation</h3>
  </div>
  
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
</my-drawer>

<button onclick="document.getElementById('navigation-drawer').show()">
  Open Navigation
</button>
```

### Right-Side Settings Panel

```html
<my-drawer position="right" size="lg" swipeable>
  <div slot="header">
    <h3>Settings</h3>
  </div>
  
  <div class="settings-group">
    <label>Theme</label>
    <select>
      <option>Light</option>
      <option>Dark</option>
      <option>Auto</option>
    </select>
  </div>
  
  <div slot="footer">
    <button onclick="this.closest('my-drawer').hide()">Close</button>
  </div>
</my-drawer>
```

### Bottom Sheet (Mobile-Style)

```html
<my-drawer 
  position="bottom" 
  size="md" 
  swipeable
  close-on-backdrop-click
>
  <div slot="header">
    <h3>Share Options</h3>
  </div>
  
  <div class="share-options">
    <button>Copy Link</button>
    <button>Email</button>
    <button>Social Media</button>
  </div>
</my-drawer>
```

## Properties

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls drawer visibility |
| `position` | `string` | `left` | Position: left, right, top, bottom |
| `mode` | `string` | `overlay` | Display mode: overlay, push |
| `size` | `string` | `md` | Size variant: sm, md, lg, xl |
| `backdrop` | `boolean` | `true` | Show backdrop overlay |
| `swipeable` | `boolean` | `false` | Enable swipe-to-close gestures |
| `persistent` | `boolean` | `false` | Prevents closing on backdrop click |
| `close-on-escape` | `boolean` | `true` | Close on Escape key |
| `close-on-backdrop-click` | `boolean` | `true` | Close on backdrop click |

### JavaScript Properties

```javascript
const drawer = document.querySelector('my-drawer');

// Visibility control
drawer.open = true;
drawer.show();  // Returns promise
drawer.hide();  // Returns promise
drawer.toggle();

// Configuration
drawer.position = 'right';
drawer.mode = 'overlay';
drawer.size = 'lg';
drawer.swipeable = true;
```

## Positions & Sizes

### Position Variants

| Position | Description | Default Size |
|----------|-------------|--------------|
| `left` | Slides from left edge | 320px width |
| `right` | Slides from right edge | 320px width |
| `top` | Slides from top edge | 300px height |
| `bottom` | Slides from bottom edge | 300px height |

### Size Variants

| Size | Left/Right Width | Top/Bottom Height |
|------|------------------|-------------------|
| `sm` | 240px | 200px |
| `md` | 320px | 300px |
| `lg` | 400px | 400px |
| `xl` | 480px | 500px |

## Display Modes

### Overlay Mode (Default)

```html
<my-drawer mode="overlay">
  <!-- Floats above content with backdrop -->
</my-drawer>
```

- Floats above page content
- Shows backdrop by default
- Useful for temporary content
- Mobile-friendly

### Push Mode

```html
<my-drawer mode="push" backdrop="false">
  <!-- Pushes content aside -->
</my-drawer>
```

- Moves page content aside
- No backdrop needed
- Better for persistent navigation
- Desktop-focused

## Events

### Event Types

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | `{position, mode}` | Fired when drawer opens |
| `close` | `{position, mode}` | Fired when drawer closes |

### Event Handling

```javascript
const drawer = document.querySelector('my-drawer');

drawer.addEventListener('open', (e) => {
  console.log('Drawer opened:', e.detail);
});

drawer.addEventListener('close', (e) => {
  console.log('Drawer closed:', e.detail);
});
```

## Slots

### Content Areas

| Slot | Description | Optional |
|------|-------------|----------|
| `header` | Top section with title/controls | Yes |
| `default` | Main content area | No |
| `footer` | Bottom section with actions | Yes |

### Slot Usage

```html
<my-drawer>
  <div slot="header">
    <h3>Title</h3>
    <button onclick="this.closest('my-drawer').hide()">×</button>
  </div>
  
  <!-- Main content (default slot) -->
  <p>Drawer content goes here</p>
  
  <div slot="footer">
    <button>Action</button>
  </div>
</my-drawer>
```

## Touch Gestures

### Swipe to Close

Enable with the `swipeable` attribute:

```html
<my-drawer swipeable>
  <!-- Swipe in opposite direction to close -->
</my-drawer>
```

**Gesture directions:**
- Left drawer: Swipe left to close
- Right drawer: Swipe right to close  
- Top drawer: Swipe up to close
- Bottom drawer: Swipe down to close

## Styling

### CSS Custom Properties

```css
my-drawer {
  --_drawer-background: #fff;
  --_drawer-elevation: var(--_global-elevation-3);
  --_drawer-border-radius: 16px;
  --_drawer-backdrop-color: rgba(0, 0, 0, 0.5);
}
```

### Custom Styling

```css
.navigation-drawer {
  --_drawer-width-md: 280px;
  --_drawer-background: var(--color-surface-primary);
}

.settings-panel {
  --_drawer-background: var(--color-surface-secondary);
  --_drawer-border-radius: 24px;
}
```

## Examples

### Mobile Navigation Menu

```html
<my-drawer 
  id="mobile-nav" 
  position="left" 
  swipeable 
  close-on-backdrop-click
>
  <div slot="header">
    <h2>Menu</h2>
    <button onclick="document.getElementById('mobile-nav').hide()">
      <my-icon icon="close"></my-icon>
    </button>
  </div>
  
  <nav class="mobile-nav">
    <a href="/">Home</a>
    <a href="/products">Products</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  
  <div slot="footer">
    <button class="login-btn">Login</button>
  </div>
</my-drawer>

<style>
  .mobile-nav a {
    display: block;
    padding: 12px 0;
    border-bottom: 1px solid var(--_global-color-outline-variant);
    text-decoration: none;
    color: var(--_global-color-on-surface);
  }
</style>
```

### Shopping Cart Drawer

```html
<my-drawer 
  id="cart-drawer" 
  position="right" 
  size="lg"
  swipeable
>
  <div slot="header">
    <h3>Shopping Cart</h3>
    <span class="cart-count">3 items</span>
  </div>
  
  <div class="cart-items">
    <!-- Cart items list -->
  </div>
  
  <div slot="footer">
    <div class="cart-total">Total: $99.99</div>
    <button class="checkout-btn">Checkout</button>
  </div>
</my-drawer>
```

### Filter Panel

```html
<my-drawer 
  position="left" 
  mode="push" 
  size="sm" 
  backdrop="false"
  persistent
>
  <div slot="header">
    <h3>Filters</h3>
  </div>
  
  <div class="filter-group">
    <h4>Category</h4>
    <my-checkbox label="Electronics"></my-checkbox>
    <my-checkbox label="Clothing"></my-checkbox>
    <my-checkbox label="Books"></my-checkbox>
  </div>
  
  <div class="filter-group">
    <h4>Price Range</h4>
    <input type="range" min="0" max="1000" />
  </div>
  
  <div slot="footer">
    <button onclick="applyFilters()">Apply</button>
    <button onclick="clearFilters()">Clear</button>
  </div>
</my-drawer>
```

## Integration Examples

### With Router

```javascript
// Show drawer based on route
router.on('/menu', () => {
  document.getElementById('navigation-drawer').show();
});

// Close drawer on route change  
router.on('*', () => {
  document.querySelectorAll('my-drawer[open]').forEach(drawer => {
    drawer.hide();
  });
});
```

### With State Management

```javascript
// Redux/Vuex integration
store.subscribe((state) => {
  const drawer = document.getElementById('cart-drawer');
  if (state.ui.showCart) {
    drawer.show();
  } else {
    drawer.hide();
  }
});
```

## Browser Support

- Chrome 54+
- Firefox 63+ 
- Safari 10+
- Edge 79+

## Performance

- Lightweight: ~12KB minified
- Smooth 60fps animations
- Efficient DOM manipulation
- Memory-conscious event handling
- Optimized touch gesture detection

## Accessibility

- Full keyboard navigation
- Screen reader announcements
- Focus trapping when open
- High contrast mode support
- Proper ARIA attributes
- Escape key support