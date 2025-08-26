import '../src/index.js';
import { globalConfig, setTheme, setLabelPosition, getThemeConfig, getComponentConfig } from '../src/config/global-config.js';

export default {
  title: 'Configuration/Global Config System',
  parameters: {
    docs: {
      description: {
        component: 'Demonstrates the MyntUI global configuration system for theme defaults, component settings, and API object keys.',
      },
    },
    layout: 'fullscreen',
  },
};

export const ConfigurationDemo = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    min-height: 100vh;
    background: var(--_global-color-surface-container-low);
    font-family: var(--_global-font-family-sans);
    padding: 2rem;
  `;
  
  container.innerHTML = `
    <style>
      .config-showcase {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .config-header {
        text-align: center;
        padding: 2rem 0 3rem;
        background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-secondary) 100%);
        color: var(--_global-color-on-primary);
        border-radius: var(--_global-border-radius-lg);
        margin-bottom: 2rem;
      }
      
      .config-title {
        font-size: 2.5rem;
        font-weight: var(--_global-font-weight-bold);
        margin: 0 0 1rem 0;
      }
      
      .config-subtitle {
        font-size: 1.125rem;
        opacity: 0.9;
        margin: 0;
      }
      
      .config-section {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .section-title {
        font-size: 1.5rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .section-description {
        color: var(--_global-color-on-surface-variant);
        margin: 0 0 2rem 0;
        font-size: 0.95rem;
        line-height: 1.5;
      }
      
      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      
      .demo-card {
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
        padding: 1.5rem;
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .demo-title {
        font-size: 1rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-primary);
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .config-controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }
      
      .control-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .control-label {
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
      }
      
      .config-button {
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--_global-border-radius-md);
        font-size: 0.875rem;
        cursor: pointer;
        transition: var(--_global-transition-fast);
      }
      
      .config-button:hover {
        background: var(--_global-color-primary-hover);
        transform: translateY(-1px);
      }
      
      .config-info {
        background: var(--_global-color-info-light);
        border: 1px solid var(--_global-color-info);
        border-radius: var(--_global-border-radius-md);
        padding: 1rem;
        margin: 1rem 0;
        font-size: 0.875rem;
        color: var(--_global-color-on-surface);
      }
      
      .code-block {
        background: var(--_global-color-gray-900);
        color: var(--_global-color-white);
        padding: 1rem;
        border-radius: var(--_global-border-radius-sm);
        font-family: var(--_global-font-family-mono);
        font-size: 0.8rem;
        line-height: 1.4;
        overflow-x: auto;
        margin: 1rem 0;
      }
    </style>
    
    <div class="config-showcase">
      <div class="config-header">
        <h1 class="config-title">Global Configuration System</h1>
        <p class="config-subtitle">Centralized theme defaults, component settings, and API object keys</p>
      </div>
      
      <!-- Theme Configuration -->
      <div class="config-section">
        <h2 class="section-title">
          <my-icon icon="palette" color="primary"></my-icon>
          Theme Configuration
        </h2>
        <p class="section-description">
          Control global theme settings including label positions, sizes, colors, spacing, and border radius.
        </p>
        
        <div class="config-controls">
          <div class="control-group">
            <div class="control-label">Label Position</div>
            <button class="config-button" onclick="setLabelPosition('top'); updateInputs()">Top</button>
            <button class="config-button" onclick="setLabelPosition('left'); updateInputs()">Left</button>
            <button class="config-button" onclick="setLabelPosition('over'); updateInputs()">Over (Floating)</button>
          </div>
          
          <div class="control-group">
            <div class="control-label">Color Scheme</div>
            <button class="config-button" onclick="setTheme('light'); updateTheme()">Light</button>
            <button class="config-button" onclick="setTheme('dark'); updateTheme()">Dark</button>
            <button class="config-button" onclick="setTheme('auto'); updateTheme()">Auto</button>
          </div>
        </div>
        
        <div class="demo-grid">
          <div class="demo-card">
            <div class="demo-title">Email Input</div>
            <my-input 
              id="demo-email"
              type="email" 
              label="Email Address" 
              placeholder="user@example.com"
              leading-icon="mail"
              helper-text="Configured via global settings">
            </my-input>
          </div>
          
          <div class="demo-card">
            <div class="demo-title">Password Input</div>
            <my-input 
              id="demo-password"
              type="password" 
              label="Password" 
              placeholder="Enter password"
              leading-icon="lock"
              trailing-icon="visibility"
              helper-text="Theme-aware styling">
            </my-input>
          </div>
        </div>
        
        <div class="config-info">
          <strong>Configuration API:</strong> Use <code>globalConfig.set('theme.labelPosition', 'left')</code> to change settings programmatically.
        </div>
      </div>
      
      <!-- Component Configuration -->
      <div class="config-section">
        <h2 class="section-title">
          <my-icon icon="settings" color="secondary"></my-icon>
          Component Defaults
        </h2>
        <p class="section-description">
          Set default behavior for components including variants, sizes, and feature toggles.
        </p>
        
        <div class="demo-grid">
          <div class="demo-card">
            <div class="demo-title">Input Component Config</div>
            <div class="code-block">
globalConfig.get('components.input')
// Returns:
{
  variant: 'outlined',
  size: 'medium',
  labelPosition: 'top',
  characterCountThreshold: 80,
  debounceDelay: 300,
  showIconsOnly: 'when-relevant',
  autoIconMapping: {
    email: 'mail',
    password: 'lock',
    search: 'search',
    date: 'event',
    // ...more mappings
  }
}
            </div>
          </div>
          
          <div class="demo-card">
            <div class="demo-title">Button Component Config</div>
            <div class="code-block">
globalConfig.get('components.button')
// Returns:
{
  variant: 'filled',
  size: 'medium',
  rippleEffect: true
}
            </div>
          </div>
        </div>
      </div>
      
      <!-- API Configuration -->
      <div class="config-section">
        <h2 class="section-title">
          <my-icon icon="api" color="tertiary"></my-icon>
          API Object Keys
        </h2>
        <p class="section-description">
          Standardized keys for API requests, responses, and data structures across all components.
        </p>
        
        <div class="demo-grid">
          <div class="demo-card">
            <div class="demo-title">Pagination Keys</div>
            <div class="code-block">
globalConfig.get('api.pagination')
// Returns:
{
  limit: 'limit',      // Items per page
  offset: 'offset',    // Starting index
  total: 'total',      // Total items count
  page: 'page',        // Current page
  pageSize: 'pageSize' // Alternative to limit
}
            </div>
          </div>
          
          <div class="demo-card">
            <div class="demo-title">Query Keys</div>
            <div class="code-block">
globalConfig.get('api.query')
// Returns:
{
  search: 'search',
  searchBy: 'searchBy',
  sortBy: 'sortBy',
  sortOrder: 'sortOrder',
  filters: 'filters',
  filtersBy: 'filtersBy'
}
            </div>
          </div>
          
          <div class="demo-card">
            <div class="demo-title">Response Structure</div>
            <div class="code-block">
globalConfig.get('api.response')
// Returns:
{
  data: 'data',       // Main data array/object
  items: 'items',     // Alternative to data
  results: 'results', // Alternative to data
  total: 'total',     // Total count
  meta: 'meta',       // Metadata object
  errors: 'errors',   // Error messages
  success: 'success', // Success flag
  status: 'status'    // Status code
}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Grid System Demo -->
      <div class="config-section">
        <h2 class="section-title">
          <my-icon icon="grid_view" color="primary"></my-icon>
          Grid System Integration
        </h2>
        <p class="section-description">
          Comprehensive CSS Grid utilities with responsive breakpoints and flexible layouts.
        </p>
        
        <div class="grid-demo" style="margin: 1rem 0;">
          <div class="u-display-grid u-grid-cols-4 u-gap-md" style="margin-bottom: 1rem;">
            <div style="background: var(--_global-color-primary-container); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">Grid 1</div>
            <div style="background: var(--_global-color-secondary-container); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">Grid 2</div>
            <div style="background: var(--_global-color-tertiary-container); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">Grid 3</div>
            <div style="background: var(--_global-color-primary-container); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">Grid 4</div>
          </div>
        </div>
        
        <div class="code-block">
<!-- Responsive Grid Classes -->
&lt;div class="u-display-grid u-grid-cols-4 u-gap-md"&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
  &lt;div&gt;Item 3&lt;/div&gt;
  &lt;div&gt;Item 4&lt;/div&gt;
&lt;/div&gt;

<!-- Auto-fit Grid -->
&lt;div class="u-display-grid u-grid-auto-fit u-gap-lg"&gt;
  &lt;div&gt;Responsive Item&lt;/div&gt;
&lt;/div&gt;
        </div>
      </div>
      
      <!-- Usage Examples -->
      <div class="config-section">
        <h2 class="section-title">
          <my-icon icon="code" color="secondary"></my-icon>
          Usage Examples
        </h2>
        <p class="section-description">
          How to use the global configuration system in your applications.
        </p>
        
        <div class="code-block">
// Import configuration system
import { globalConfig, setTheme, setLabelPosition } from 'myntuiui/config';

// Get configuration values
const inputConfig = globalConfig.get('components.input');
const primaryColor = globalConfig.get('theme.colors.primary');

// Set configuration values
globalConfig.set('theme.labelPosition', 'left');
globalConfig.set('components.input.variant', 'filled');

// Update multiple values
globalConfig.update({
  theme: {
    labelPosition: 'over',
    colorScheme: 'dark'
  },
  components: {
    input: {
      size: 'large',
      characterCountThreshold: 100
    }
  }
});

// Listen for configuration changes
window.addEventListener('myntuiConfigChange', (event) => {
  console.log('Config changed:', event.detail.path, event.detail.value);
});

// Export configuration
const configJSON = globalConfig.export(true);
localStorage.setItem('myntuiConfig', configJSON);
        </div>
      </div>
    </div>
    
    <script>
      // Demo functions
      window.updateInputs = () => {
        const inputs = document.querySelectorAll('my-input[id^="demo-"]');
        inputs.forEach(input => {
          const currentPosition = globalConfig.get('theme.labelPosition');
          input.setAttribute('label-position', currentPosition);
        });
      };
      
      window.updateTheme = () => {
        const theme = globalConfig.get('theme.colorScheme');
        if (theme !== 'auto') {
          document.documentElement.setAttribute('data-theme', theme);
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      };
      
      // Initialize
      setTimeout(() => {
        window.updateInputs();
        window.updateTheme();
      }, 100);
    </script>
  `;

  return container;
};

ConfigurationDemo.parameters = {
  docs: {
    description: {
      story: 'Interactive demonstration of the MyntUI global configuration system, showing how to control theme defaults, component settings, API object keys, and grid system integration.',
    },
  },
};