import '../src/components/my-notification/my-notification.js';
import '../src/components/my-button/my-button.js';

export default {
  title: 'Components/my-notification',
  parameters: {
    docs: {
      description: {
        component: 'Ephemeral, non-intrusive messages that provide feedback to users. Features auto-dismiss, hover pause, stacking, and programmatic API.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Notification message text',
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Notification type/severity',
    },
    duration: {
      control: { type: 'number', min: 0, max: 15000, step: 500 },
      description: 'Auto-dismiss duration in milliseconds (0 = no auto-dismiss)',
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'],
      description: 'Notification position on screen',
    },
    closeable: {
      control: 'boolean',
      description: 'Show close button',
    },
    icon: {
      control: 'text',
      description: 'Custom icon (Material Icons name)',
    },
  },
};

// Helper function to create and show notification
const createNotification = (args) => {
  const notification = document.createElement('my-notification');
  
  // Set properties
  if (args.message) notification.setAttribute('message', args.message);
  if (args.type && args.type !== 'info') notification.setAttribute('type', args.type);
  if (args.duration !== undefined) notification.setAttribute('duration', args.duration);
  if (args.position && args.position !== 'top-right') notification.setAttribute('position', args.position);
  if (args.closeable) notification.setAttribute('closeable', '');
  if (args.icon) notification.setAttribute('icon', args.icon);
  
  // Show notification
  notification.show();
  
  return notification;
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Interactive Notification Demo</h3>
    <p style="margin: 0; color: var(--_global-color-text-secondary);">
      Click the button below to show a notification with your configured settings.
    </p>
  `;
  
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Show Notification');
  button.setAttribute('variant', 'filled');
  
  button.addEventListener('click', () => {
    createNotification(args);
  });
  
  container.appendChild(info);
  container.appendChild(button);
  
  return container;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  message: 'This is a default notification message',
  type: 'info',
  duration: 5000,
  position: 'top-right',
  closeable: true,
  icon: '',
};

// Type variants
export const Types = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  
  const types = [
    { type: 'success', message: 'Operation completed successfully!', label: 'Success' },
    { type: 'error', message: 'An error occurred while processing your request.', label: 'Error' },
    { type: 'warning', message: 'Please review your settings before continuing.', label: 'Warning' },
    { type: 'info', message: 'Here is some helpful information for you.', label: 'Info' },
  ];
  
  types.forEach(({ type, message, label }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', `Show ${label}`);
    button.setAttribute('variant', type === 'error' ? 'error' : type === 'success' ? 'success' : 'outlined');
    
    button.addEventListener('click', () => {
      createNotification({
        message,
        type,
        duration: 4000,
        closeable: true
      });
    });
    
    container.appendChild(button);
  });
  
  return container;
};
Types.parameters = {
  docs: {
    description: {
      story: 'Different notification types for various message contexts.',
    },
  },
};

// Position variants
export const Positions = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;';
  
  const positions = [
    { position: 'top-left', label: 'Top Left' },
    { position: 'top-center', label: 'Top Center' },
    { position: 'top-right', label: 'Top Right' },
    { position: 'bottom-left', label: 'Bottom Left' },
    { position: 'bottom-center', label: 'Bottom Center' },
    { position: 'bottom-right', label: 'Bottom Right' },
  ];
  
  positions.forEach(({ position, label }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    button.setAttribute('size', 'sm');
    
    button.addEventListener('click', () => {
      createNotification({
        message: `Notification positioned at ${label.toLowerCase()}`,
        type: 'info',
        position,
        duration: 3000,
        closeable: true
      });
    });
    
    container.appendChild(button);
  });
  
  return container;
};
Positions.parameters = {
  docs: {
    description: {
      story: 'Notifications can be positioned in any corner or edge of the screen.',
    },
  },
};

// Stacking behavior
export const Stacking = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Notification Stacking</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Multiple notifications stack vertically and automatically reposition when others are dismissed.
    </p>
  `;
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap;';
  
  // Add multiple notifications
  const addMultipleButton = document.createElement('my-button');
  addMultipleButton.setAttribute('label', 'Add 3 Notifications');
  addMultipleButton.setAttribute('variant', 'filled');
  
  addMultipleButton.addEventListener('click', () => {
    const messages = [
      { message: 'First notification in stack', type: 'info' },
      { message: 'Second notification in stack', type: 'success' },
      { message: 'Third notification in stack', type: 'warning' },
    ];
    
    messages.forEach((msg, index) => {
      setTimeout(() => {
        createNotification({
          ...msg,
          duration: 6000,
          closeable: true
        });
      }, index * 200);
    });
  });
  
  // Add notification with different position
  const leftPositionButton = document.createElement('my-button');
  leftPositionButton.setAttribute('label', 'Stack on Left');
  leftPositionButton.setAttribute('variant', 'outlined');
  
  leftPositionButton.addEventListener('click', () => {
    const messages = [
      { message: 'Left-positioned notification 1', type: 'info' },
      { message: 'Left-positioned notification 2', type: 'success' },
    ];
    
    messages.forEach((msg, index) => {
      setTimeout(() => {
        createNotification({
          ...msg,
          position: 'top-left',
          duration: 5000,
          closeable: true
        });
      }, index * 300);
    });
  });
  
  buttonsContainer.appendChild(addMultipleButton);
  buttonsContainer.appendChild(leftPositionButton);
  
  container.appendChild(info);
  container.appendChild(buttonsContainer);
  
  return container;
};
Stacking.parameters = {
  docs: {
    description: {
      story: 'Demonstrates how multiple notifications stack and reposition automatically.',
    },
  },
};

// Duration and persistence
export const Duration = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  
  const durations = [
    { duration: 2000, label: 'Quick (2s)', variant: 'outlined' },
    { duration: 5000, label: 'Normal (5s)', variant: 'filled' },
    { duration: 10000, label: 'Long (10s)', variant: 'text' },
    { duration: 0, label: 'Persistent', variant: 'error' },
  ];
  
  durations.forEach(({ duration, label, variant }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', variant);
    
    button.addEventListener('click', () => {
      createNotification({
        message: duration === 0 ? 'This notification stays until closed' : `Auto-closes in ${duration/1000} seconds`,
        type: duration === 0 ? 'warning' : 'info',
        duration,
        closeable: true
      });
    });
    
    container.appendChild(button);
  });
  
  return container;
};
Duration.parameters = {
  docs: {
    description: {
      story: 'Different auto-dismiss durations, including persistent notifications.',
    },
  },
};

// Programmatic API
export const ProgrammaticAPI = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Programmatic API</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Notifications can be created using JavaScript API methods.
    </p>
    <div style="background: var(--_global-color-surface-container); padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px; margin-bottom: 16px;">
      <strong>Available methods:</strong><br>
      • MyNotification.info(message, duration)<br>
      • MyNotification.success(message, duration)<br>
      • MyNotification.warning(message, duration)<br>
      • MyNotification.error(message, duration)
    </div>
  `;
  
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap;';
  
  const apiButtons = [
    { method: 'info', label: 'API Info', message: 'Created with MyNotification.info()' },
    { method: 'success', label: 'API Success', message: 'Created with MyNotification.success()' },
    { method: 'warning', label: 'API Warning', message: 'Created with MyNotification.warning()' },
    { method: 'error', label: 'API Error', message: 'Created with MyNotification.error()' },
  ];
  
  apiButtons.forEach(({ method, label, message }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', method === 'error' ? 'error' : method === 'success' ? 'success' : 'outlined');
    
    button.addEventListener('click', () => {
      // Use the static API methods
      if (typeof MyNotification !== 'undefined') {
        MyNotification[method](message);
      } else {
        // Fallback for environments where the global isn't available
        createNotification({
          message,
          type: method,
          duration: method === 'error' ? 8000 : method === 'warning' ? 6000 : 5000,
          closeable: true
        });
      }
    });
    
    buttonsContainer.appendChild(button);
  });
  
  container.appendChild(info);
  container.appendChild(buttonsContainer);
  
  return container;
};
ProgrammaticAPI.parameters = {
  docs: {
    description: {
      story: 'Using the programmatic JavaScript API to create notifications.',
    },
  },
};

// Custom icons
export const CustomIcons = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  
  const customNotifications = [
    { icon: 'star', message: 'You received a new rating!', type: 'success', label: 'Star' },
    { icon: 'email', message: 'New message received', type: 'info', label: 'Email' },
    { icon: 'sync', message: 'Synchronization in progress...', type: 'info', label: 'Sync' },
    { icon: 'security', message: 'Security settings updated', type: 'warning', label: 'Security' },
  ];
  
  customNotifications.forEach(({ icon, message, type, label }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    
    button.addEventListener('click', () => {
      createNotification({
        message,
        type,
        icon,
        duration: 4000,
        closeable: true
      });
    });
    
    container.appendChild(button);
  });
  
  return container;
};
CustomIcons.parameters = {
  docs: {
    description: {
      story: 'Notifications with custom icons from Material Icons.',
    },
  },
};

// Interactive features
export const InteractiveFeatures = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Interactive Features</h3>
    <ul style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Hover to pause auto-dismiss timer</li>
      <li>Click to dismiss (when closeable)</li>
      <li>Progress bar shows remaining time</li>
      <li>Smooth stacking animations</li>
    </ul>
  `;
  
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Show Interactive Notification');
  button.setAttribute('variant', 'filled');
  
  button.addEventListener('click', () => {
    createNotification({
      message: 'Hover over me to pause the timer! The progress bar shows time remaining.',
      type: 'info',
      duration: 8000,
      closeable: true
    });
  });
  
  container.appendChild(info);
  container.appendChild(button);
  
  return container;
};
InteractiveFeatures.parameters = {
  docs: {
    description: {
      story: 'Interactive features like hover-to-pause and visual progress indicators.',
    },
  },
};

// Accessibility features
export const Accessibility = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Uses role="alert" and aria-live="polite" for screen readers</li>
      <li>Keyboard accessible close buttons</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast support</li>
      <li>Responsive design for mobile devices</li>
    </ul>
  `;
  
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Test Accessibility');
  button.setAttribute('variant', 'outlined');
  
  button.addEventListener('click', () => {
    createNotification({
      message: 'This notification is fully accessible and will be announced by screen readers.',
      type: 'success',
      duration: 6000,
      closeable: true
    });
  });
  
  container.appendChild(info);
  container.appendChild(button);
  
  return container;
};
Accessibility.parameters = {
  docs: {
    description: {
      story: 'Comprehensive accessibility features for inclusive user experience.',
    },
  },
};