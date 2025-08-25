import '../src/components/my-drawer/my-drawer.js';
import '../src/components/my-button/my-button.js';
import '../src/components/my-icon/my-icon.js';

export default {
  title: 'Components/my-drawer',
  parameters: {
    docs: {
      description: {
        component: 'A sliding panel that can be positioned on any side of the viewport, containing supplementary content or navigation. Features overlay and push modes, swipe gestures, and accessibility.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer position on screen',
    },
    mode: {
      control: { type: 'select' },
      options: ['overlay', 'push'],
      description: 'Drawer display mode',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Drawer size',
    },
    backdrop: {
      control: 'boolean',
      description: 'Show backdrop overlay',
    },
    swipeable: {
      control: 'boolean',
      description: 'Enable swipe-to-close gestures',
    },
    persistent: {
      control: 'boolean',
      description: 'Keep drawer open (disable backdrop clicks)',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close drawer when Escape key is pressed',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close drawer when clicking backdrop',
    },
  },
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; position: relative; min-height: 300px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 16px 0;">Interactive Drawer Demo</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Configure the drawer settings and click the button to open it.
    </p>
  `;
  
  const drawer = document.createElement('my-drawer');
  
  // Set properties
  if (args.position && args.position !== 'left') drawer.setAttribute('position', args.position);
  if (args.mode && args.mode !== 'overlay') drawer.setAttribute('mode', args.mode);
  if (args.size && args.size !== 'md') drawer.setAttribute('size', args.size);
  if (args.backdrop === false) drawer.setAttribute('backdrop', 'false');
  if (args.swipeable) drawer.setAttribute('swipeable', '');
  if (args.persistent) drawer.setAttribute('persistent', '');
  if (args.closeOnEscape === false) drawer.setAttribute('close-on-escape', 'false');
  if (args.closeOnBackdropClick === false) drawer.setAttribute('close-on-backdrop-click', 'false');
  
  // Header content
  const headerContent = document.createElement('div');
  headerContent.setAttribute('slot', 'header');
  headerContent.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h3 style="margin: 0; font-size: 18px;">Drawer Title</h3>
      <my-button variant="text" icon-only id="close-drawer">
        <my-icon icon="close"></my-icon>
      </my-button>
    </div>
  `;
  
  // Main content
  const mainContent = document.createElement('div');
  mainContent.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>This is the drawer content area. You can put any content here including:</p>
      <ul style="margin: 0; line-height: 1.6;">
        <li>Navigation menus</li>
        <li>Form controls</li>
        <li>Settings panels</li>
        <li>Additional information</li>
      </ul>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <my-button variant="filled" label="Primary Action"></my-button>
        <my-button variant="outlined" label="Secondary"></my-button>
      </div>
    </div>
  `;
  
  // Footer content
  const footerContent = document.createElement('div');
  footerContent.setAttribute('slot', 'footer');
  footerContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 12px; color: var(--_global-color-text-secondary);">
        Position: ${args.position || 'left'} | Mode: ${args.mode || 'overlay'}
      </span>
      <my-button variant="text" label="Done" id="drawer-done"></my-button>
    </div>
  `;
  
  drawer.appendChild(headerContent);
  drawer.appendChild(mainContent);
  drawer.appendChild(footerContent);
  
  // Trigger button
  const triggerButton = document.createElement('my-button');
  triggerButton.setAttribute('label', 'Open Drawer');
  triggerButton.setAttribute('variant', 'filled');
  
  triggerButton.addEventListener('click', () => {
    drawer.show();
  });
  
  // Close button event listeners
  setTimeout(() => {
    const closeButton = headerContent.querySelector('#close-drawer');
    const doneButton = footerContent.querySelector('#drawer-done');
    
    if (closeButton) {
      closeButton.addEventListener('click', () => drawer.hide());
    }
    
    if (doneButton) {
      doneButton.addEventListener('click', () => drawer.hide());
    }
  }, 100);
  
  container.appendChild(info);
  container.appendChild(triggerButton);
  container.appendChild(drawer);
  
  return container;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  position: 'left',
  mode: 'overlay',
  size: 'md',
  backdrop: true,
  swipeable: false,
  persistent: false,
  closeOnEscape: true,
  closeOnBackdropClick: true,
};

// Position variants
export const Positions = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;';
  
  const positions = ['left', 'right', 'top', 'bottom'];
  
  positions.forEach(position => {
    const section = document.createElement('div');
    section.style.cssText = 'display: flex; flex-direction: column; gap: 12px; align-items: center;';
    
    const drawer = document.createElement('my-drawer');
    drawer.setAttribute('position', position);
    
    // Add content to drawer
    const headerContent = document.createElement('div');
    headerContent.setAttribute('slot', 'header');
    headerContent.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="margin: 0;">${position.charAt(0).toUpperCase()}${position.slice(1)} Drawer</h3>
        <my-button variant="text" icon-only class="close-btn">
          <my-icon icon="close"></my-icon>
        </my-button>
      </div>
    `;
    
    const mainContent = document.createElement('div');
    mainContent.innerHTML = `
      <p>This drawer slides in from the ${position} side of the screen.</p>
      <p>Perfect for navigation, settings, or additional content.</p>
    `;
    
    drawer.appendChild(headerContent);
    drawer.appendChild(mainContent);
    
    const button = document.createElement('my-button');
    button.setAttribute('label', `${position.charAt(0).toUpperCase()}${position.slice(1)} Drawer`);
    button.setAttribute('variant', 'outlined');
    
    button.addEventListener('click', () => drawer.show());
    
    // Close button functionality
    setTimeout(() => {
      const closeBtn = headerContent.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => drawer.hide());
      }
    }, 100);
    
    section.appendChild(button);
    section.appendChild(drawer);
    container.appendChild(section);
  });
  
  return container;
};
Positions.parameters = {
  docs: {
    description: {
      story: 'Drawers can slide in from any side of the viewport.',
    },
  },
};

// Size variants
export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  
  const sizes = [
    { size: 'sm', label: 'Small', width: '240px' },
    { size: 'md', label: 'Medium', width: '320px' },
    { size: 'lg', label: 'Large', width: '400px' },
    { size: 'xl', label: 'Extra Large', width: '480px' },
  ];
  
  sizes.forEach(({ size, label, width }) => {
    const drawer = document.createElement('my-drawer');
    drawer.setAttribute('size', size);
    drawer.setAttribute('position', 'right'); // Use right position for size demo
    
    // Add content
    const headerContent = document.createElement('div');
    headerContent.setAttribute('slot', 'header');
    headerContent.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h3 style="margin: 0;">${label} Drawer</h3>
        <my-button variant="text" icon-only class="close-btn-${size}">
          <my-icon icon="close"></my-icon>
        </my-button>
      </div>
    `;
    
    const mainContent = document.createElement('div');
    mainContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p>Size: <strong>${label}</strong></p>
        <p>Width: <strong>${width}</strong></p>
        <p>This demonstrates the ${size} size variant of the drawer component.</p>
        ${size === 'xl' ? '<p>Extra large drawers are great for complex content and multi-column layouts.</p>' : ''}
      </div>
    `;
    
    drawer.appendChild(headerContent);
    drawer.appendChild(mainContent);
    
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    
    button.addEventListener('click', () => drawer.show());
    
    // Close functionality
    setTimeout(() => {
      const closeBtn = headerContent.querySelector(`.close-btn-${size}`);
      if (closeBtn) {
        closeBtn.addEventListener('click', () => drawer.hide());
      }
    }, 100);
    
    container.appendChild(button);
    container.appendChild(drawer);
  });
  
  return container;
};
Sizes.parameters = {
  docs: {
    description: {
      story: 'Different drawer sizes for various content needs.',
    },
  },
};

// Mode comparison
export const Modes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 24px; flex-wrap: wrap;';
  
  // Overlay mode
  const overlayDrawer = document.createElement('my-drawer');
  overlayDrawer.setAttribute('mode', 'overlay');
  overlayDrawer.setAttribute('position', 'left');
  
  const overlayHeader = document.createElement('div');
  overlayHeader.setAttribute('slot', 'header');
  overlayHeader.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h3 style="margin: 0;">Overlay Mode</h3>
      <my-button variant="text" icon-only id="close-overlay">
        <my-icon icon="close"></my-icon>
      </my-button>
    </div>
  `;
  
  const overlayContent = document.createElement('div');
  overlayContent.innerHTML = `
    <p>Overlay mode floats above the main content with a backdrop.</p>
    <ul style="margin: 12px 0; line-height: 1.6;">
      <li>Shows backdrop overlay</li>
      <li>Blocks main content interaction</li>
      <li>Perfect for temporary panels</li>
      <li>Can be closed by clicking backdrop</li>
    </ul>
  `;
  
  overlayDrawer.appendChild(overlayHeader);
  overlayDrawer.appendChild(overlayContent);
  
  // Push mode
  const pushDrawer = document.createElement('my-drawer');
  pushDrawer.setAttribute('mode', 'push');
  pushDrawer.setAttribute('position', 'right');
  
  const pushHeader = document.createElement('div');
  pushHeader.setAttribute('slot', 'header');
  pushHeader.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h3 style="margin: 0;">Push Mode</h3>
      <my-button variant="text" icon-only id="close-push">
        <my-icon icon="close"></my-icon>
      </my-button>
    </div>
  `;
  
  const pushContent = document.createElement('div');
  pushContent.innerHTML = `
    <p>Push mode integrates with the main layout without backdrop.</p>
    <ul style="margin: 12px 0; line-height: 1.6;">
      <li>No backdrop overlay</li>
      <li>Pushes main content aside</li>
      <li>Great for persistent panels</li>
      <li>Maintains layout flow</li>
    </ul>
  `;
  
  pushDrawer.appendChild(pushHeader);
  pushDrawer.appendChild(pushContent);
  
  // Buttons
  const overlayButton = document.createElement('my-button');
  overlayButton.setAttribute('label', 'Show Overlay Mode');
  overlayButton.setAttribute('variant', 'filled');
  
  const pushButton = document.createElement('my-button');
  pushButton.setAttribute('label', 'Show Push Mode');
  pushButton.setAttribute('variant', 'outlined');
  
  overlayButton.addEventListener('click', () => overlayDrawer.show());
  pushButton.addEventListener('click', () => pushDrawer.show());
  
  // Close functionality
  setTimeout(() => {
    document.getElementById('close-overlay')?.addEventListener('click', () => overlayDrawer.hide());
    document.getElementById('close-push')?.addEventListener('click', () => pushDrawer.hide());
  }, 100);
  
  const buttonGroup = document.createElement('div');
  buttonGroup.style.cssText = 'display: flex; gap: 12px;';
  buttonGroup.appendChild(overlayButton);
  buttonGroup.appendChild(pushButton);
  
  container.appendChild(buttonGroup);
  container.appendChild(overlayDrawer);
  container.appendChild(pushDrawer);
  
  return container;
};
Modes.parameters = {
  docs: {
    description: {
      story: 'Comparison between overlay mode (with backdrop) and push mode (integrated layout).',
    },
  },
};

// Swipe gestures
export const SwipeGestures = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 8px 0;">Swipe to Close</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      On touch devices, you can swipe the drawer in the opposite direction to close it.
    </p>
    <div style="background: var(--_global-color-surface-container); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
      <strong>Try these gestures:</strong><br>
      • Left drawer: Swipe left to close<br>
      • Right drawer: Swipe right to close<br>
      • Top drawer: Swipe up to close<br>
      • Bottom drawer: Swipe down to close
    </div>
  `;
  
  const drawer = document.createElement('my-drawer');
  drawer.setAttribute('position', 'left');
  drawer.setAttribute('swipeable', '');
  
  const headerContent = document.createElement('div');
  headerContent.setAttribute('slot', 'header');
  headerContent.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h3 style="margin: 0;">Swipeable Drawer</h3>
      <my-button variant="text" icon-only id="close-swipe">
        <my-icon icon="close"></my-icon>
      </my-button>
    </div>
  `;
  
  const swipeContent = document.createElement('div');
  swipeContent.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p><strong>Try swiping left to close this drawer!</strong></p>
      <p>Swipe gestures provide an intuitive way to dismiss drawers on touch devices.</p>
      <div style="padding: 12px; background: var(--_global-color-primary-container); border-radius: 8px;">
        <my-icon icon="touch_app" style="margin-right: 8px; vertical-align: middle;"></my-icon>
        Swipe gesture enabled
      </div>
    </div>
  `;
  
  drawer.appendChild(headerContent);
  drawer.appendChild(swipeContent);
  
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Open Swipeable Drawer');
  button.setAttribute('variant', 'filled');
  
  button.addEventListener('click', () => drawer.show());
  
  // Close functionality
  setTimeout(() => {
    document.getElementById('close-swipe')?.addEventListener('click', () => drawer.hide());
  }, 100);
  
  container.appendChild(info);
  container.appendChild(button);
  container.appendChild(drawer);
  
  return container;
};
SwipeGestures.parameters = {
  docs: {
    description: {
      story: 'Touch-friendly swipe gestures for closing drawers on mobile devices.',
    },
  },
};

// Navigation drawer example
export const NavigationDrawer = () => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; position: relative;';
  
  const info = document.createElement('div');
  info.innerHTML = `
    <h3 style="margin: 0 0 16px 0;">Navigation Drawer Example</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      A common use case for drawers is navigation menus with hierarchical content.
    </p>
  `;
  
  const navDrawer = document.createElement('my-drawer');
  navDrawer.setAttribute('position', 'left');
  navDrawer.setAttribute('size', 'md');
  
  // Navigation header
  const navHeader = document.createElement('div');
  navHeader.setAttribute('slot', 'header');
  navHeader.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <my-icon icon="menu" style="color: var(--_global-color-primary);"></my-icon>
      <h3 style="margin: 0;">Navigation</h3>
    </div>
  `;
  
  // Navigation content
  const navContent = document.createElement('div');
  navContent.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 0;">
      <div style="padding: 12px 0; border-bottom: 1px solid var(--_global-color-outline-variant);">
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="dashboard"></my-icon>
          <span>Dashboard</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="analytics"></my-icon>
          <span>Analytics</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="people"></my-icon>
          <span>Users</span>
        </div>
      </div>
      
      <div style="padding: 12px 0; border-bottom: 1px solid var(--_global-color-outline-variant);">
        <div style="font-size: 12px; font-weight: bold; color: var(--_global-color-text-secondary); padding: 8px 12px; text-transform: uppercase;">Content</div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="article"></my-icon>
          <span>Articles</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="image"></my-icon>
          <span>Media</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="folder"></my-icon>
          <span>Files</span>
        </div>
      </div>
      
      <div style="padding: 12px 0;">
        <div style="font-size: 12px; font-weight: bold; color: var(--_global-color-text-secondary); padding: 8px 12px; text-transform: uppercase;">System</div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="settings"></my-icon>
          <span>Settings</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; cursor: pointer;" class="nav-item">
          <my-icon icon="help"></my-icon>
          <span>Help & Support</span>
        </div>
      </div>
    </div>
  `;
  
  // Navigation footer
  const navFooter = document.createElement('div');
  navFooter.setAttribute('slot', 'footer');
  navFooter.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <my-icon icon="account_circle"></my-icon>
        <span style="font-size: 14px;">John Doe</span>
      </div>
      <my-button variant="text" icon-only id="close-nav">
        <my-icon icon="logout"></my-icon>
      </my-button>
    </div>
  `;
  
  navDrawer.appendChild(navHeader);
  navDrawer.appendChild(navContent);
  navDrawer.appendChild(navFooter);
  
  const openNavButton = document.createElement('my-button');
  openNavButton.setAttribute('variant', 'filled');
  openNavButton.innerHTML = '<my-icon icon="menu" slot="left"></my-icon>Open Navigation';
  
  openNavButton.addEventListener('click', () => navDrawer.show());
  
  // Add hover effects and close functionality
  setTimeout(() => {
    // Navigation item hover effects
    const navItems = navContent.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = 'var(--_global-color-surface-variant)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = 'transparent';
      });
      item.addEventListener('click', () => {
        console.log('Navigation item clicked:', item.querySelector('span').textContent);
        navDrawer.hide();
      });
    });
    
    // Close button
    document.getElementById('close-nav')?.addEventListener('click', () => navDrawer.hide());
  }, 100);
  
  container.appendChild(info);
  container.appendChild(openNavButton);
  container.appendChild(navDrawer);
  
  return container;
};
NavigationDrawer.parameters = {
  docs: {
    description: {
      story: 'Example of a navigation drawer with hierarchical menu structure.',
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
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Focus trapping within drawer when open</li>
      <li>Escape key to close (configurable)</li>
      <li>Proper ARIA roles and attributes</li>
      <li>Keyboard navigation support</li>
      <li>Screen reader announcements</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  `;
  
  const accessibilityDrawer = document.createElement('my-drawer');
  accessibilityDrawer.setAttribute('position', 'right');
  
  const a11yHeader = document.createElement('div');
  a11yHeader.setAttribute('slot', 'header');
  a11yHeader.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <h3 style="margin: 0;">Accessibility Test</h3>
      <my-button variant="text" icon-only id="close-a11y">
        <my-icon icon="close"></my-icon>
      </my-button>
    </div>
  `;
  
  const a11yContent = document.createElement('div');
  a11yContent.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p>This drawer demonstrates accessibility features:</p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <button style="padding: 8px 12px; border: 1px solid var(--_global-color-outline); border-radius: 4px; background: var(--_global-color-surface);">Focusable Button 1</button>
        <button style="padding: 8px 12px; border: 1px solid var(--_global-color-outline); border-radius: 4px; background: var(--_global-color-surface);">Focusable Button 2</button>
        <input type="text" placeholder="Focusable input" style="padding: 8px; border: 1px solid var(--_global-color-outline); border-radius: 4px;">
      </div>
      <p style="font-size: 14px; color: var(--_global-color-text-secondary);">
        Try pressing Tab to navigate between focusable elements - focus stays trapped within the drawer.
      </p>
    </div>
  `;
  
  accessibilityDrawer.appendChild(a11yHeader);
  accessibilityDrawer.appendChild(a11yContent);
  
  const a11yButton = document.createElement('my-button');
  a11yButton.setAttribute('label', 'Test Accessibility Features');
  a11yButton.setAttribute('variant', 'outlined');
  
  a11yButton.addEventListener('click', () => accessibilityDrawer.show());
  
  // Close functionality
  setTimeout(() => {
    document.getElementById('close-a11y')?.addEventListener('click', () => accessibilityDrawer.hide());
  }, 100);
  
  container.appendChild(info);
  container.appendChild(a11yButton);
  container.appendChild(accessibilityDrawer);
  
  return container;
};
Accessibility.parameters = {
  docs: {
    description: {
      story: 'Comprehensive accessibility features including focus management and keyboard navigation.',
    },
  },
};