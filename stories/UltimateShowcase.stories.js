import '../src/index.js';

export default {
  title: 'Overview/Ultimate Component Showcase',
  parameters: {
    docs: {
      description: {
        component: 'The ultimate comprehensive showcase of all MyntUI components with all variants, states, and configurations. This showcase demonstrates the complete library capabilities with Material Design 3 styling.',
      },
    },
    layout: 'fullscreen',
  },
};

export const UltimateShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
  `;
  
  container.innerHTML = `
    <style>
      .showcase-header {
        text-align: center;
        padding: 4rem 2rem 3rem;
        background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-tertiary) 100%);
        color: var(--_global-color-on-primary);
        position: relative;
        overflow: hidden;
        margin-bottom: 3rem;
      }
      
      .showcase-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff20" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.1;
      }
      
      .showcase-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--_global-font-weight-light);
        margin: 0 0 1rem 0;
        position: relative;
        z-index: 1;
      }
      
      .showcase-subtitle {
        font-size: clamp(1rem, 2vw, 1.25rem);
        opacity: 0.9;
        margin: 0;
        position: relative;
        z-index: 1;
      }
      
      .showcase-content {
        max-width: 1600px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
      }
      
      .component-section {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .section-title {
        font-size: 2rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .section-description {
        color: var(--_global-color-on-surface-variant);
        margin: 0 0 2rem 0;
        font-size: 1rem;
        line-height: 1.6;
      }
      
      .component-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
      }
      
      .wide-grid {
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      }
      
      .component-demo {
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
        padding: 2rem;
        border: 1px solid var(--_global-color-outline-variant);
        transition: var(--_global-interaction-feedback-duration);
      }
      
      .component-demo:hover {
        background: var(--_global-color-surface-container-low);
        border-color: var(--_global-color-outline);
        box-shadow: var(--_global-elevation-1);
      }
      
      .demo-label {
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-primary);
        margin-bottom: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .demo-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .variant-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
      }
      
      .stats-section {
        background: linear-gradient(135deg, var(--_global-color-success-container) 0%, var(--_global-color-tertiary-container) 100%);
        border-radius: var(--_global-border-radius-lg);
        padding: 3rem 2rem;
        margin: 3rem 0;
        text-align: center;
      }
      
      .stats-title {
        font-size: 2rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-success-container);
        margin: 0 0 2rem 0;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: var(--_global-border-radius-md);
        padding: 2rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .stat-number {
        font-size: 3rem;
        font-weight: var(--_global-font-weight-bold);
        color: var(--_global-color-on-success-container);
        margin: 0;
      }
      
      .stat-label {
        font-size: 1rem;
        color: var(--_global-color-on-success-container);
        opacity: 0.9;
        margin: 0.5rem 0 0 0;
      }
      
      .feature-badges {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 2rem;
        justify-content: center;
      }
      
      .feature-badge {
        background: rgba(255, 255, 255, 0.2);
        color: var(--_global-color-on-success-container);
        padding: 0.75rem 1.5rem;
        border-radius: var(--_global-border-radius-full);
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(5px);
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .component-grid {
          grid-template-columns: 1fr;
        }
        
        .wide-grid {
          grid-template-columns: 1fr;
        }
        
        .variant-row {
          flex-direction: column;
          align-items: stretch;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
    
    <div class="showcase-header">
      <h1 class="showcase-title">MyntUI Ultimate Showcase</h1>
      <p class="showcase-subtitle">Complete Component Library • Material Design 3 • Framework Agnostic • Production Ready</p>
    </div>
    
    <div class="showcase-content">
      <!-- Library Statistics -->
      <div class="stats-section">
        <h2 class="stats-title">Library Overview</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">18</div>
            <div class="stat-label">Components</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">18</div>
            <div class="stat-label">Input Types</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">WCAG Compliant</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">0</div>
            <div class="stat-label">Dependencies</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">∞</div>
            <div class="stat-label">Framework Support</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">MD3</div>
            <div class="stat-label">Design System</div>
          </div>
        </div>
        
        <div class="feature-badges">
          <div class="feature-badge">
            <my-icon icon="accessibility" size="sm"></my-icon>
            Full A11Y Support
          </div>
          <div class="feature-badge">
            <my-icon icon="responsive" size="sm"></my-icon>
            Responsive Design
          </div>
          <div class="feature-badge">
            <my-icon icon="palette" size="sm"></my-icon>
            Material Design 3
          </div>
          <div class="feature-badge">
            <my-icon icon="code" size="sm"></my-icon>
            Web Components
          </div>
          <div class="feature-badge">
            <my-icon icon="speed" size="sm"></my-icon>
            High Performance
          </div>
          <div class="feature-badge">
            <my-icon icon="security" size="sm"></my-icon>
            Type Safe
          </div>
        </div>
      </div>
      
      <!-- Basic Components -->
      <div class="component-section">
        <h2 class="section-title">
          <my-icon icon="widgets" color="primary"></my-icon>
          Basic Components
        </h2>
        <p class="section-description">
          Foundational UI elements including buttons, icons, and form inputs with comprehensive variant support.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="smart_button" size="sm"></my-icon>
              Button Variants
            </div>
            <div class="demo-content">
              <div class="variant-row">
                <my-button variant="filled" label="Filled"></my-button>
                <my-button variant="outlined" label="Outlined"></my-button>
                <my-button variant="text" label="Text"></my-button>
                <my-button variant="elevated" label="Elevated"></my-button>
              </div>
              <div class="variant-row">
                <my-button variant="filled-tonal" label="Filled Tonal"></my-button>
                <my-button variant="filled" disabled label="Disabled"></my-button>
                <my-button variant="filled" loading label="Loading"></my-button>
              </div>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="emoji_symbols" size="sm"></my-icon>
              Icon Collection
            </div>
            <div class="demo-content">
              <div class="variant-row">
                <my-icon icon="home" size="sm" color="primary"></my-icon>
                <my-icon icon="settings" size="md" color="secondary"></my-icon>
                <my-icon icon="favorite" size="lg" color="tertiary"></my-icon>
                <my-icon icon="star" size="xl" color="error"></my-icon>
              </div>
              <div class="variant-row">
                <my-icon icon="check_circle" color="success"></my-icon>
                <my-icon icon="warning" color="warning"></my-icon>
                <my-icon icon="info" color="info"></my-icon>
                <my-icon icon="help" color="surface"></my-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Form Inputs -->
      <div class="component-section">
        <h2 class="section-title">
          <my-icon icon="edit" color="secondary"></my-icon>
          Input Components
        </h2>
        <p class="section-description">
          Complete form input system supporting all HTML5 input types with Material Design 3 styling and validation.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="text_fields" size="sm"></my-icon>
              Text Inputs
            </div>
            <div class="demo-content">
              <my-input type="text" label="Full Name" placeholder="John Doe" variant="outlined"></my-input>
              <my-input type="email" label="Email" placeholder="john@example.com" variant="filled" leading-icon="mail"></my-input>
              <my-input type="password" label="Password" placeholder="Enter password" helper-text="Min 8 characters"></my-input>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="tag" size="sm"></my-icon>
              Number Inputs
            </div>
            <div class="demo-content">
              <my-input type="number" label="Price" placeholder="99.99" min="0" step="0.01" trailing-icon="attach_money"></my-input>
              <my-input type="integer" label="Quantity" placeholder="5" min="1" max="100"></my-input>
              <my-input type="tel" label="Phone" placeholder="+1 (555) 123-4567" leading-icon="phone"></my-input>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="event" size="sm"></my-icon>
              Date & Time Inputs
            </div>
            <div class="demo-content">
              <my-input type="date" label="Event Date" leading-icon="calendar_today"></my-input>
              <my-input type="time" label="Meeting Time" leading-icon="schedule"></my-input>
              <my-input type="datetime-local" label="Appointment" leading-icon="event_available"></my-input>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="list" size="sm"></my-icon>
              Select Inputs
            </div>
            <div class="demo-content">
              <my-input id="country-select" type="select" label="Country" helper-text="Choose your country"></my-input>
              <my-input type="dynamic-select" label="City" placeholder="Start typing..." helper-text="Searchable dropdown"></my-input>
              <my-input type="textarea" label="Description" placeholder="Enter description..." rows="3"></my-input>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Boolean Inputs -->
      <div class="component-section">
        <h2 class="section-title">
          <my-icon icon="check_box" color="tertiary"></my-icon>
          Boolean & Choice Components
        </h2>
        <p class="section-description">
          Interactive boolean controls including toggles, checkboxes, and radio groups with various styling options.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="toggle_on" size="sm"></my-icon>
              Toggle Switches
            </div>
            <div class="demo-content">
              <my-toggle label="Enable notifications" checked></my-toggle>
              <my-toggle label="Dark mode" variant="filled"></my-toggle>
              <my-toggle label="Auto-save" size="small"></my-toggle>
              <my-toggle label="Disabled toggle" disabled></my-toggle>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="check_box" size="sm"></my-icon>
              Checkboxes
            </div>
            <div class="demo-content">
              <my-checkbox label="Accept terms and conditions" required></my-checkbox>
              <my-checkbox label="Subscribe to newsletter" checked></my-checkbox>
              <my-checkbox label="Enable two-factor authentication" variant="filled"></my-checkbox>
              <my-checkbox label="Disabled option" disabled></my-checkbox>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="radio_button_checked" size="sm"></my-icon>
              Radio Groups
            </div>
            <div class="demo-content">
              <my-radio-group name="plan" label="Subscription Plan" value="pro">
                <my-radio value="basic" label="Basic - $9/month"></my-radio>
                <my-radio value="pro" label="Pro - $19/month"></my-radio>
                <my-radio value="enterprise" label="Enterprise - $49/month"></my-radio>
              </my-radio-group>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="view_list" size="sm"></my-icon>
              Radio Layout Options
            </div>
            <div class="demo-content">
              <my-radio-group name="layout-demo" label="Horizontal Layout" layout="horizontal" value="option1">
                <my-radio value="option1" label="Option 1"></my-radio>
                <my-radio value="option2" label="Option 2"></my-radio>
                <my-radio value="option3" label="Option 3"></my-radio>
              </my-radio-group>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Interactive Components -->
      <div class="component-section">
        <h2 class="section-title">
          <my-icon icon="touch_app" color="primary"></my-icon>
          Interactive Components
        </h2>
        <p class="section-description">
          Advanced interactive elements including dropdowns, tooltips, and overlay components.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="arrow_drop_down" size="sm"></my-icon>
              Dropdown Menus
            </div>
            <div class="demo-content">
              <my-dropdown id="actions-dropdown" trigger-text="Actions">
                <div slot="content">
                  <div style="padding: 1rem; min-width: 200px;">
                    <div style="padding: 0.5rem 0; cursor: pointer; border-radius: 4px; padding-left: 0.5rem;" onmouseover="this.style.background='var(--_global-color-surface-container)'" onmouseout="this.style.background='transparent'">
                      <my-icon icon="edit" size="sm" style="margin-right: 0.5rem;"></my-icon>Edit
                    </div>
                    <div style="padding: 0.5rem 0; cursor: pointer; border-radius: 4px; padding-left: 0.5rem;" onmouseover="this.style.background='var(--_global-color-surface-container)'" onmouseout="this.style.background='transparent'">
                      <my-icon icon="share" size="sm" style="margin-right: 0.5rem;"></my-icon>Share
                    </div>
                    <div style="padding: 0.5rem 0; cursor: pointer; border-radius: 4px; padding-left: 0.5rem;" onmouseover="this.style.background='var(--_global-color-surface-container)'" onmouseout="this.style.background='transparent'">
                      <my-icon icon="delete" size="sm" style="margin-right: 0.5rem; color: var(--_global-color-error);"></my-icon>Delete
                    </div>
                  </div>
                </div>
              </my-dropdown>
              
              <my-dropdown trigger-text="Profile" variant="outlined">
                <div slot="content">
                  <div style="padding: 1rem; min-width: 180px;">
                    <div style="font-weight: 500; margin-bottom: 0.5rem;">John Doe</div>
                    <div style="color: var(--_global-color-on-surface-variant); font-size: 0.875rem; margin-bottom: 1rem;">john@example.com</div>
                    <hr style="border: none; border-top: 1px solid var(--_global-color-outline-variant); margin: 1rem 0;">
                    <div style="padding: 0.5rem 0; cursor: pointer;">Settings</div>
                    <div style="padding: 0.5rem 0; cursor: pointer;">Help</div>
                    <div style="padding: 0.5rem 0; cursor: pointer; color: var(--_global-color-error);">Sign Out</div>
                  </div>
                </div>
              </my-dropdown>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="info" size="sm"></my-icon>
              Tooltips
            </div>
            <div class="demo-content">
              <div class="variant-row">
                <my-tooltip text="This is a helpful tooltip">
                  <my-button variant="outlined" label="Hover for tooltip"></my-button>
                </my-tooltip>
                
                <my-tooltip text="Top positioned tooltip" position="top">
                  <my-icon icon="help" color="primary"></my-icon>
                </my-tooltip>
                
                <my-tooltip position="bottom">
                  <span slot="content">
                    <strong>Rich Content</strong><br>
                    You can use HTML in tooltips!
                  </span>
                  <my-button variant="text" label="Rich Tooltip"></my-button>
                </my-tooltip>
              </div>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="launch" size="sm"></my-icon>
              Modal Dialogs
            </div>
            <div class="demo-content">
              <my-button id="open-modal" variant="filled" label="Open Modal"></my-button>
              <my-button id="open-confirmation" variant="outlined" label="Confirmation Dialog"></my-button>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="menu" size="sm"></my-icon>
              Drawer Navigation
            </div>
            <div class="demo-content">
              <my-button id="open-drawer-left" variant="outlined" label="Left Drawer"></my-button>
              <my-button id="open-drawer-right" variant="outlined" label="Right Drawer"></my-button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Data Visualization -->
      <div class="component-section">
        <h2 class="section-title">
          <my-icon icon="analytics" color="secondary"></my-icon>
          Data Visualization
        </h2>
        <p class="section-description">
          Comprehensive data visualization components including charts, gauges, progress indicators, and data tables.
        </p>
        <div class="component-grid wide-grid">
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="bar_chart" size="sm"></my-icon>
              Charts with D3.js
            </div>
            <div class="demo-content">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <my-data-chart id="bar-chart" chart-type="bar" width="280" height="200"></my-data-chart>
                <my-data-chart id="line-chart" chart-type="line" width="280" height="200"></my-data-chart>
              </div>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="donut_small" size="sm"></my-icon>
              Circular Visualizations
            </div>
            <div class="demo-content">
              <div style="display: flex; gap: 2rem; align-items: center; justify-content: space-around;">
                <my-gauge value="75" min="0" max="100" label="Performance" size="large"></my-gauge>
                <my-gauge value="60" min="0" max="100" label="Storage" variant="minimal"></my-gauge>
                <my-gauge value="90" min="0" max="100" label="Health" variant="gradient"></my-gauge>
              </div>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="trending_up" size="sm"></my-icon>
              Progress & Indicators
            </div>
            <div class="demo-content">
              <my-progress value="45" label="Download Progress" variant="primary"></my-progress>
              <my-progress value="75" label="Storage Used" variant="warning"></my-progress>
              <my-progress value="90" label="Goal Achievement" variant="success"></my-progress>
              
              <div style="margin-top: 1rem;">
                <my-sparkline id="sparkline-demo" width="300" height="60" color="var(--_global-color-primary)"></my-sparkline>
              </div>
            </div>
          </div>
          
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="table_view" size="sm"></my-icon>
              Data Table
            </div>
            <div class="demo-content">
              <my-data-table id="demo-table" style="max-height: 300px; overflow: auto;"></my-data-table>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notifications -->
      <div class="component-section">
        <h2 class="section-title">
          <my-icon icon="notifications" color="tertiary"></my-icon>
          Feedback & Notifications
        </h2>
        <p class="section-description">
          User feedback components including toast notifications and alert systems.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <div class="demo-label">
              <my-icon icon="campaign" size="sm"></my-icon>
              Notification Types
            </div>
            <div class="demo-content">
              <div class="variant-row">
                <my-button id="show-success" variant="outlined" label="Success" style="color: var(--_global-color-success);"></my-button>
                <my-button id="show-warning" variant="outlined" label="Warning" style="color: var(--_global-color-warning);"></my-button>
                <my-button id="show-error" variant="outlined" label="Error" style="color: var(--_global-color-error);"></my-button>
                <my-button id="show-info" variant="outlined" label="Info" style="color: var(--_global-color-info);"></my-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Definitions -->
    <my-modal id="demo-modal" title="Example Modal">
      <div slot="body">
        <p>This is an example modal dialog with Material Design 3 styling.</p>
        <p>It includes proper focus trapping, backdrop interactions, and accessibility features.</p>
      </div>
      <div slot="footer">
        <my-button id="modal-cancel" variant="text" label="Cancel"></my-button>
        <my-button id="modal-confirm" variant="filled" label="Confirm"></my-button>
      </div>
    </my-modal>
    
    <my-modal id="confirmation-modal" title="Confirm Action">
      <div slot="body">
        <p>Are you sure you want to proceed with this action?</p>
      </div>
      <div slot="footer">
        <my-button id="confirm-cancel" variant="text" label="Cancel"></my-button>
        <my-button id="confirm-ok" variant="filled" label="OK"></my-button>
      </div>
    </my-modal>
    
    <!-- Drawer Definitions -->
    <my-drawer id="left-drawer" position="left" style="width: 300px;">
      <div style="padding: 2rem;">
        <h3>Left Navigation</h3>
        <nav>
          <div style="padding: 0.75rem 0; cursor: pointer; border-radius: 4px; margin: 0.25rem 0;" onmouseover="this.style.background='var(--_global-color-surface-container)'" onmouseout="this.style.background='transparent'">
            <my-icon icon="home" size="sm" style="margin-right: 1rem;"></my-icon>Home
          </div>
          <div style="padding: 0.75rem 0; cursor: pointer; border-radius: 4px; margin: 0.25rem 0;" onmouseover="this.style.background='var(--_global-color-surface-container)'" onmouseout="this.style.background='transparent'">
            <my-icon icon="dashboard" size="sm" style="margin-right: 1rem;"></my-icon>Dashboard
          </div>
          <div style="padding: 0.75rem 0; cursor: pointer; border-radius: 4px; margin: 0.25rem 0;" onmouseover="this.style.background='var(--_global-color-surface-container)'" onmouseout="this.style.background='transparent'">
            <my-icon icon="settings" size="sm" style="margin-right: 1rem;"></my-icon>Settings
          </div>
        </nav>
      </div>
    </my-drawer>
    
    <my-drawer id="right-drawer" position="right" style="width: 300px;">
      <div style="padding: 2rem;">
        <h3>Right Panel</h3>
        <p>This is a right-positioned drawer with additional content.</p>
        <my-button id="close-right-drawer" variant="outlined" label="Close"></my-button>
      </div>
    </my-drawer>
    
    <script>
      // Wait for components to load
      setTimeout(() => {
        // Set up select options
        const countrySelect = document.getElementById('country-select');
        if (countrySelect) {
          const schema = {
            type: 'select',
            label: 'Country',
            options: [
              { label: 'United States', value: 'US' },
              { label: 'Canada', value: 'CA' },
              { label: 'United Kingdom', value: 'UK' },
              { label: 'Germany', value: 'DE' },
              { label: 'France', value: 'FR' },
              { label: 'Japan', value: 'JP' }
            ]
          };
          countrySelect.setAttribute('schema', JSON.stringify(schema));
        }
        
        // Set up chart data
        const barChart = document.getElementById('bar-chart');
        if (barChart) {
          barChart.data = [
            { label: 'Q1', value: 120 },
            { label: 'Q2', value: 150 },
            { label: 'Q3', value: 180 },
            { label: 'Q4', value: 200 }
          ];
        }
        
        const lineChart = document.getElementById('line-chart');
        if (lineChart) {
          lineChart.data = [
            { x: 0, y: 10 },
            { x: 1, y: 25 },
            { x: 2, y: 15 },
            { x: 3, y: 30 },
            { x: 4, y: 20 },
            { x: 5, y: 35 }
          ];
        }
        
        // Set up sparkline data
        const sparkline = document.getElementById('sparkline-demo');
        if (sparkline) {
          const data = Array.from({ length: 20 }, (_, i) => Math.sin(i * 0.5) * 50 + 100 + Math.random() * 20);
          sparkline.data = data;
        }
        
        // Set up data table
        const dataTable = document.getElementById('demo-table');
        if (dataTable) {
          const columns = [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'role', label: 'Role', sortable: true },
            { key: 'status', label: 'Status', sortable: false },
            { key: 'lastActive', label: 'Last Active', sortable: true }
          ];
          
          const rows = [
            { name: 'Alice Johnson', role: 'Designer', status: 'Active', lastActive: '2 hours ago' },
            { name: 'Bob Smith', role: 'Developer', status: 'Active', lastActive: '5 minutes ago' },
            { name: 'Carol Davis', role: 'Manager', status: 'Away', lastActive: '1 day ago' },
            { name: 'David Wilson', role: 'Analyst', status: 'Active', lastActive: '30 minutes ago' }
          ];
          
          dataTable.columns = columns;
          dataTable.rows = rows;
        }
        
        // Modal event handlers
        const openModalBtn = document.getElementById('open-modal');
        const demoModal = document.getElementById('demo-modal');
        const modalCancel = document.getElementById('modal-cancel');
        const modalConfirm = document.getElementById('modal-confirm');
        
        if (openModalBtn && demoModal) {
          openModalBtn.addEventListener('click', () => demoModal.open = true);
          modalCancel?.addEventListener('click', () => demoModal.open = false);
          modalConfirm?.addEventListener('click', () => demoModal.open = false);
        }
        
        const openConfirmBtn = document.getElementById('open-confirmation');
        const confirmModal = document.getElementById('confirmation-modal');
        const confirmCancel = document.getElementById('confirm-cancel');
        const confirmOk = document.getElementById('confirm-ok');
        
        if (openConfirmBtn && confirmModal) {
          openConfirmBtn.addEventListener('click', () => confirmModal.open = true);
          confirmCancel?.addEventListener('click', () => confirmModal.open = false);
          confirmOk?.addEventListener('click', () => confirmModal.open = false);
        }
        
        // Drawer event handlers
        const openLeftDrawer = document.getElementById('open-drawer-left');
        const leftDrawer = document.getElementById('left-drawer');
        
        if (openLeftDrawer && leftDrawer) {
          openLeftDrawer.addEventListener('click', () => leftDrawer.open = true);
        }
        
        const openRightDrawer = document.getElementById('open-drawer-right');
        const rightDrawer = document.getElementById('right-drawer');
        const closeRightDrawer = document.getElementById('close-right-drawer');
        
        if (openRightDrawer && rightDrawer) {
          openRightDrawer.addEventListener('click', () => rightDrawer.open = true);
          closeRightDrawer?.addEventListener('click', () => rightDrawer.open = false);
        }
        
        // Notification event handlers
        const showSuccess = document.getElementById('show-success');
        const showWarning = document.getElementById('show-warning');
        const showError = document.getElementById('show-error');
        const showInfo = document.getElementById('show-info');
        
        const showNotification = (type, message) => {
          const notification = document.createElement('my-notification');
          notification.setAttribute('type', type);
          notification.setAttribute('message', message);
          notification.setAttribute('duration', '4000');
          document.body.appendChild(notification);
        };
        
        showSuccess?.addEventListener('click', () => {
          showNotification('success', 'Operation completed successfully!');
        });
        
        showWarning?.addEventListener('click', () => {
          showNotification('warning', 'Please review your settings.');
        });
        
        showError?.addEventListener('click', () => {
          showNotification('error', 'An error occurred. Please try again.');
        });
        
        showInfo?.addEventListener('click', () => {
          showNotification('info', 'Here is some helpful information.');
        });
        
      }, 100);
    </script>
  `;

  return container;
};

UltimateShowcase.parameters = {
  docs: {
    description: {
      story: 'The ultimate comprehensive showcase demonstrating all MyntUI components with their various states, variants, and interactive behaviors. This showcase highlights the complete capabilities of the framework-agnostic component library with Material Design 3 styling.',
    },
  },
};