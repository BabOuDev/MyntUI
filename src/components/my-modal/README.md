# my-modal

A Material Design 3 modal dialog component that appears on top of the page content, blocking interaction with the main interface until dismissed.

## Features

- **Material Design 3 Styling**: Follows MD3 principles with proper elevation and surface colors
- **Focus Management**: Automatic focus trapping and restoration
- **Accessibility**: Full ARIA support and keyboard navigation
- **Body Injection**: Automatically injects into `<body>` for proper z-index layering
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Multiple size variants and configuration options
- **Event Handling**: Custom events for open/close actions

## Basic Usage

```html
<!-- Simple modal -->
<my-modal title="Confirm Action" open>
  <p>Are you sure you want to delete this item?</p>
  <div slot="footer">
    <my-button variant="text">Cancel</my-button>
    <my-button variant="filled">Delete</my-button>
  </div>
</my-modal>

<!-- Programmatic usage -->
<my-modal id="myModal" title="Settings">
  <div slot="body">
    <p>Modal content goes here...</p>
  </div>
  <div slot="footer">
    <my-button variant="outlined" onclick="closeModal()">Close</my-button>
  </div>
</my-modal>

<script>
function openModal() {
  document.getElementById('myModal').show();
}

function closeModal() {
  document.getElementById('myModal').hide();
}
</script>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `open` | Boolean | `false` | Controls modal visibility |
| `title` | String | `''` | Modal title text |
| `size` | String | `'md'` | Modal size: `sm`, `md`, `lg`, `xl` |
| `close-on-backdrop-click` | Boolean | `false` | Allow closing by clicking backdrop |
| `close-on-escape` | Boolean | `false` | Allow closing with Escape key |

## Properties

All attributes are also available as JavaScript properties:

```javascript
const modal = document.querySelector('my-modal');

// Getters/Setters
modal.open = true;
modal.title = 'New Title';
modal.size = 'lg';
modal.closeOnBackdropClick = true;
modal.closeOnEscape = true;
```

## Methods

| Method | Description |
|--------|-------------|
| `show()` | Opens the modal |
| `hide()` | Closes the modal |
| `toggle()` | Toggles modal visibility |

```javascript
const modal = document.querySelector('my-modal');

modal.show();    // Open modal
modal.hide();    // Close modal
modal.toggle();  // Toggle state
```

## Slots

| Slot | Description |
|------|-------------|
| `body` (default) | Main modal content |
| `footer` | Modal footer content (buttons, actions) |

```html
<my-modal title="Example">
  <!-- Default slot / body content -->
  <p>This goes in the modal body</p>
  
  <!-- Footer slot -->
  <div slot="footer">
    <my-button>Action</my-button>
  </div>
</my-modal>
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | `{title, size}` | Fired when modal opens |
| `close` | `{title, size}` | Fired when modal closes |

```javascript
modal.addEventListener('open', (e) => {
  console.log('Modal opened:', e.detail);
});

modal.addEventListener('close', (e) => {
  console.log('Modal closed:', e.detail);
});
```

## Size Variants

```html
<!-- Small modal -->
<my-modal size="sm" title="Small Modal">Content</my-modal>

<!-- Medium modal (default) -->
<my-modal size="md" title="Medium Modal">Content</my-modal>

<!-- Large modal -->
<my-modal size="lg" title="Large Modal">Content</my-modal>

<!-- Extra large modal -->
<my-modal size="xl" title="XL Modal">Content</my-modal>
```

## Configuration Examples

```html
<!-- Modal that closes on backdrop click and escape -->
<my-modal 
  title="Closable Modal" 
  close-on-backdrop-click 
  close-on-escape
>
  <p>Click outside or press Escape to close</p>
</my-modal>

<!-- Large modal with footer actions -->
<my-modal size="lg" title="User Profile">
  <div slot="body">
    <my-input label="Name" value="John Doe"></my-input>
    <my-input label="Email" value="john@example.com"></my-input>
  </div>
  <div slot="footer">
    <my-button variant="text">Cancel</my-button>
    <my-button variant="filled">Save</my-button>
  </div>
</my-modal>
```

## Accessibility Features

- **ARIA Support**: Proper `role="dialog"` and `aria-modal="true"`
- **Focus Management**: Focus is trapped within the modal
- **Keyboard Navigation**: Tab cycling and Escape key support
- **Screen Reader Support**: Proper labeling with `aria-labelledby`
- **Focus Restoration**: Returns focus to trigger element on close

## Styling

The component uses CSS custom properties that can be overridden:

```css
my-modal {
  --_modal-backdrop-color: rgba(0, 0, 0, 0.6);
  --_modal-background: #ffffff;
  --_modal-border-radius: 12px;
  --_modal-padding: 24px;
}
```

## Browser Support

- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+

## Notes

- Modal automatically injects itself into `document.body` when opened for proper z-index layering
- Body scrolling is prevented when modal is open
- Focus is automatically managed and restored
- Component follows Material Design 3 elevation and motion principles