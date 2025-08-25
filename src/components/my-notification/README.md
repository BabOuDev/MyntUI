# my-notification

A Material Design 3 notification component for displaying ephemeral, non-intrusive messages that provide feedback to users.

## Features

- **Material Design 3 Styling**: Follows MD3 principles with proper surface colors and elevation
- **Multiple Types**: Success, error, warning, and info variants with appropriate colors and icons
- **Auto-positioning**: Automatically stacks multiple notifications
- **Auto-dismiss**: Configurable duration with pause on hover
- **Accessibility**: ARIA live regions and screen reader support
- **Body Injection**: Automatically positions in document body for proper layering
- **Responsive**: Adapts to mobile screens
- **Customizable**: Icons, duration, positioning, and styling options

## Basic Usage

```html
<!-- Simple notification -->
<my-notification 
  message="Operation completed successfully" 
  type="success">
</my-notification>

<!-- With custom icon and duration -->
<my-notification 
  message="Settings saved" 
  type="info"
  icon="save"
  duration="3000"
  closeable>
</my-notification>
```

## JavaScript API

```javascript
// Using static convenience methods (recommended)
MyNotification.success('Operation completed!');
MyNotification.error('Something went wrong!');
MyNotification.warning('Please check your input');
MyNotification.info('New updates available');

// Using create method
MyNotification.create('Custom message', 'success', 5000);

// Manual creation
const notification = document.createElement('my-notification');
notification.message = 'Hello World';
notification.type = 'info';
notification.duration = 4000;
notification.closeable = true;
notification.show();
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `message` | String | `''` | Notification message text |
| `type` | String | `'info'` | Type: `success`, `error`, `warning`, `info` |
| `duration` | Number | `5000` | Auto-close duration in ms (0 = no auto-close) |
| `closeable` | Boolean | `false` | Show close button |
| `position` | String | `'top-right'` | Position: `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center` |
| `icon` | String | Auto | Material Icons name (auto-detected by type) |

## Properties

All attributes are also available as JavaScript properties:

```javascript
const notification = document.querySelector('my-notification');

// Getters/Setters
notification.message = 'New message';
notification.type = 'success';
notification.duration = 3000;
notification.closeable = true;
notification.position = 'top-left';
notification.icon = 'custom_icon';
```

## Methods

| Method | Description |
|--------|-------------|
| `show()` | Shows the notification |
| `hide()` | Hides the notification |

```javascript
const notification = document.querySelector('my-notification');

notification.show();  // Show notification
notification.hide();  // Hide notification
```

## Static Methods

Convenience methods for quick notification creation:

```javascript
// Success notification (auto-closes in 5 seconds)
MyNotification.success('Operation completed successfully!');

// Error notification (auto-closes in 8 seconds)
MyNotification.error('Failed to save changes');

// Warning notification (auto-closes in 6 seconds)
MyNotification.warning('Please review your settings');

// Info notification (auto-closes in 5 seconds)
MyNotification.info('New version available');

// Custom notification
MyNotification.create('Custom message', 'info', 3000);
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `show` | `{message, type, duration}` | Fired when notification is shown |
| `hide` | `{message, type}` | Fired when notification is hidden |

```javascript
notification.addEventListener('show', (e) => {
  console.log('Notification shown:', e.detail);
});

notification.addEventListener('hide', (e) => {
  console.log('Notification hidden:', e.detail);
});
```

## Type Variants

Each type has its own color scheme and default icon:

```javascript
// Success - green theme with check_circle icon
MyNotification.success('Task completed successfully');

// Error - red theme with error icon  
MyNotification.error('Unable to process request');

// Warning - orange theme with warning icon
MyNotification.warning('Please save your work');

// Info - blue theme with info icon
MyNotification.info('System maintenance scheduled');
```

## Positioning

Control where notifications appear on screen:

```html
<!-- Top positions -->
<my-notification position="top-left">Top Left</my-notification>
<my-notification position="top-center">Top Center</my-notification>
<my-notification position="top-right">Top Right</my-notification>

<!-- Bottom positions -->
<my-notification position="bottom-left">Bottom Left</my-notification>
<my-notification position="bottom-center">Bottom Center</my-notification>
<my-notification position="bottom-right">Bottom Right</my-notification>
```

## Duration Control

```javascript
// Auto-close after 3 seconds
MyNotification.info('Quick message', 3000);

// Auto-close after 10 seconds
MyNotification.error('Important error', 10000);

// No auto-close (manual dismiss only)
const notification = MyNotification.create('Persistent', 'info', 0);
notification.closeable = true;
```

## Advanced Usage

```html
<!-- Custom content with slots -->
<my-notification type="warning" closeable>
  <strong>Warning:</strong> Your session will expire in 5 minutes.
  <br>
  <small>Please save your work.</small>
</my-notification>

<!-- Programmatic with event handling -->
<script>
const notification = MyNotification.create('Processing...', 'info', 0);

// Update message after some operation
setTimeout(() => {
  notification.message = 'Processing complete!';
  notification.type = 'success';
  notification.duration = 3000;
  notification.show(); // Re-show with new settings
}, 2000);
</script>
```

## Stacking Behavior

Multiple notifications automatically stack based on position:

```javascript
// These will stack vertically
MyNotification.info('First notification');
MyNotification.success('Second notification');
MyNotification.warning('Third notification');
```

## Accessibility Features

- **ARIA Support**: Uses `role="alert"` and `aria-live="polite"`
- **Keyboard Navigation**: Focusable close button with keyboard support
- **Screen Reader Support**: Proper announcement of messages
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **High Contrast**: Colors meet WCAG accessibility standards

## Styling

The component uses CSS custom properties that can be overridden:

```css
my-notification {
  --_notification-background: #ffffff;
  --_notification-border-radius: 12px;
  --_notification-elevation: 0 4px 12px rgba(0,0,0,0.15);
  --_notification-padding: 16px 20px;
}
```

## Browser Support

- Chrome/Edge 54+
- Firefox 63+
- Safari 10.1+

## Notes

- Notifications automatically inject themselves into `document.body` for proper positioning
- Hover pauses auto-dismiss timers
- Mobile responsive with full-width layout on small screens
- Progress bar shows remaining time until auto-dismiss
- Component follows Material Design 3 color and motion principles