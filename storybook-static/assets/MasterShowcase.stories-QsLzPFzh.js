import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const _={title:"Overview/Master Showcase",parameters:{docs:{description:{component:"A comprehensive master showcase of all MyntUI components with modern Material Design 3 styling, demonstrating visual consistency and interaction patterns."}},layout:"fullscreen"}},e=()=>{const o=document.createElement("div");return o.style.cssText=`
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
  `,o.innerHTML=`
    <style>
      .master-header {
        text-align: center;
        padding: 4rem 2rem 3rem;
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        position: relative;
        overflow: hidden;
      }
      
      .master-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff20" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.1;
      }
      
      .master-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--_global-font-weight-light);
        margin: 0 0 1rem 0;
        position: relative;
        z-index: 1;
      }
      
      .master-subtitle {
        font-size: clamp(1.1rem, 2vw, 1.5rem);
        opacity: 0.9;
        margin: 0;
        font-weight: var(--_global-font-weight-normal);
        position: relative;
        z-index: 1;
      }
      
      .master-content {
        padding: 3rem 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .master-section {
        margin-bottom: 4rem;
        padding: 2.5rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-xl);
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
        position: relative;
        overflow: hidden;
      }
      
      .master-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--_global-color-primary), var(--_global-color-secondary));
      }
      
      .section-title {
        font-size: var(--_global-font-size-headline-medium);
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0 0 2rem 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .section-description {
        font-size: var(--_global-font-size-body-medium);
        color: var(--_global-color-on-surface-variant);
        margin-bottom: 2rem;
        line-height: var(--_global-line-height-relaxed);
      }
      
      .component-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .component-demo {
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-standard);
        position: relative;
      }
      
      .component-demo:hover {
        box-shadow: var(--_global-elevation-3);
        border-color: var(--_global-color-primary);
        transform: translateY(-2px);
      }
      
      .demo-title {
        font-size: var(--_global-font-size-title-small);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
      }
      
      .demo-content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }
      
      .demo-vertical {
        flex-direction: column;
        align-items: stretch;
      }
      
      .demo-showcase {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }
      
      .color-demo {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .color-swatch {
        width: 3rem;
        height: 3rem;
        border-radius: var(--_global-border-radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: var(--_global-font-weight-bold);
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
        transition: transform var(--_global-motion-duration-short2);
      }
      
      .color-swatch:hover {
        transform: scale(1.1);
      }
      
      .interactive-demo {
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
      }
      
      .stat-card {
        padding: 1.5rem;
        background: var(--_global-color-surface-container);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .stat-value {
        font-size: 2rem;
        font-weight: var(--_global-font-weight-bold);
        color: var(--_global-color-primary);
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        font-size: var(--_global-font-size-body-small);
        color: var(--_global-color-on-surface-variant);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .floating-elements {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: -1;
      }
      
      .floating-shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--_global-color-primary-container), var(--_global-color-secondary-container));
        opacity: 0.05;
        animation: float 20s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-30px) rotate(120deg); }
        66% { transform: translateY(30px) rotate(240deg); }
      }
    </style>
    
    <!-- Floating background elements -->
    <div class="floating-elements">
      <div class="floating-shape" style="width: 200px; height: 200px; top: 10%; left: 80%; animation-delay: 0s;"></div>
      <div class="floating-shape" style="width: 150px; height: 150px; top: 60%; left: 10%; animation-delay: 5s;"></div>
      <div class="floating-shape" style="width: 100px; height: 100px; top: 80%; left: 70%; animation-delay: 10s;"></div>
    </div>
    
    <!-- Header -->
    <header class="master-header">
      <h1 class="master-title">MyntUI Design System</h1>
      <p class="master-subtitle">Modern Material Design 3 Components for the Web</p>
    </header>
    
    <div class="master-content">
      <!-- Design Tokens -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="analytics" size="lg" color="primary"></my-icon>
          Design Tokens & Color System
        </h2>
        <p class="section-description">
          A comprehensive design token system built on Material Design 3 principles, featuring semantic color palettes, consistent spacing, and responsive typography scales.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <h3 class="demo-title">Color Palette</h3>
            <div class="color-demo">
              <div class="color-swatch" style="background: var(--_global-color-primary);">P</div>
              <div class="color-swatch" style="background: var(--_global-color-secondary);">S</div>
              <div class="color-swatch" style="background: var(--_global-color-success);">✓</div>
              <div class="color-swatch" style="background: var(--_global-color-warning);">⚠</div>
              <div class="color-swatch" style="background: var(--_global-color-error);">✗</div>
              <div class="color-swatch" style="background: var(--_global-color-info);">i</div>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Typography Scale</h3>
            <div class="demo-showcase">
              <div style="font: var(--_global-typography-headline-large); color: var(--_global-color-on-surface);">Headline Large</div>
              <div style="font: var(--_global-typography-title-medium); color: var(--_global-color-on-surface);">Title Medium</div>
              <div style="font: var(--_global-typography-body-large); color: var(--_global-color-on-surface);">Body Large</div>
              <div style="font: var(--_global-typography-label-medium); color: var(--_global-color-on-surface-variant);">Label Medium</div>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Elevation System</h3>
            <div class="demo-content">
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-1); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">1</div>
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-2); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">2</div>
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-3); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">3</div>
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-4); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">4</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Interactive Components -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="settings" size="lg" color="primary"></my-icon>
          Interactive Components
        </h2>
        <p class="section-description">
          Modern button components with Material Design 3 state layers, ripple effects, and comprehensive accessibility support.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <h3 class="demo-title">Button Variants</h3>
            <div class="demo-content">
              <my-button label="Filled" variant="filled"></my-button>
              <my-button label="Outlined" variant="outlined"></my-button>
              <my-button label="Text" variant="text"></my-button>
              <my-button label="Elevated" variant="elevated"></my-button>
              <my-button label="Tonal" variant="filled-tonal"></my-button>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Interactive Icons</h3>
            <div class="demo-content">
              <my-icon icon="favorite" size="xl" interactive color="error"></my-icon>
              <my-icon icon="share" size="xl" interactive color="primary"></my-icon>
              <my-icon icon="settings" size="xl" interactive color="secondary"></my-icon>
              <my-icon icon="star" size="xl" interactive color="warning"></my-icon>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Boolean Controls</h3>
            <div class="demo-content demo-vertical">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <my-toggle checked></my-toggle>
                <span>Toggle Control</span>
              </div>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <my-checkbox checked label="Checkbox"></my-checkbox>
              </div>
              <my-radio-group name="demo-radios">
                <my-radio value="1" label="Option 1" checked></my-radio>
                <my-radio value="2" label="Option 2"></my-radio>
              </my-radio-group>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Form Components -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="edit" size="lg" color="primary"></my-icon>
          Form Components
        </h2>
        <p class="section-description">
          Advanced input components with Material Design 3 styling, floating labels, validation, and comprehensive accessibility features.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <h3 class="demo-title">Input Variants</h3>
            <div class="demo-content demo-vertical">
              <my-input type="text" label="Full Name" placeholder="Enter your name" variant="outlined"></my-input>
              <my-input type="email" label="Email Address" placeholder="name@example.com" variant="filled"></my-input>
              <my-input type="password" label="Password" placeholder="Enter password" helper-text="Must be at least 8 characters"></my-input>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Specialized Inputs</h3>
            <div class="demo-content demo-vertical">
              <my-input type="number" label="Age" min="0" max="120" value="25"></my-input>
              <my-input type="date" label="Birth Date"></my-input>
              <my-input type="url" label="Website" placeholder="https://example.com"></my-input>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Data Visualization -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="dashboard" size="lg" color="primary"></my-icon>
          Data Visualization
        </h2>
        <p class="section-description">
          Beautiful and accessible data visualization components including progress indicators, gauges, and sparklines with smooth animations.
        </p>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">85%</div>
            <div class="stat-label">System Performance</div>
            <my-gauge value="85" min="0" max="100" variant="success" animated show-value></my-gauge>
          </div>
          
          <div class="stat-card">
            <div class="stat-value">67%</div>
            <div class="stat-label">Memory Usage</div>
            <my-progress value="67" variant="info" animated show-value></my-progress>
          </div>
          
          <div class="stat-card">
            <div class="stat-value">42%</div>
            <div class="stat-label">CPU Load</div>
            <my-gauge value="42" min="0" max="100" variant="primary" animated show-value></my-gauge>
          </div>
          
          <div class="stat-card">
            <div class="stat-value">Trending Up</div>
            <div class="stat-label">Revenue Growth</div>
            <my-sparkline data="[20,25,22,28,35,32,40,38,45,50]" color="var(--_global-color-success)" style="height: 40px; margin-top: 1rem;"></my-sparkline>
          </div>
        </div>
      </section>
      
      <!-- Complex Components -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="folder" size="lg" color="primary"></my-icon>
          Advanced Components
        </h2>
        <p class="section-description">
          Sophisticated components for complex user interfaces including data tables, modals, notifications, and interactive overlays.
        </p>
        <div class="component-grid">
          <div class="component-demo interactive-demo">
            <h3 class="demo-title">Interactive Overlays</h3>
            <div class="demo-content">
              <my-button label="Show Modal" onclick="document.querySelector('#demo-modal').open = true"></my-button>
              <my-button label="Show Notification" onclick="showDemoNotification()"></my-button>
              <my-tooltip text="This is a helpful tooltip with detailed information">
                <my-button label="Hover for Tooltip" variant="outlined"></my-button>
              </my-tooltip>
            </div>
          </div>
          
          <div class="component-demo interactive-demo">
            <h3 class="demo-title">Data Table</h3>
            <my-data-table 
              id="showcase-table" 
              selectable
              searchable
              paginated
              page-size="3"
              striped
              style="width: 100%; min-height: 200px;"
            ></my-data-table>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Modal for demo -->
    <my-modal id="demo-modal">
      <h3 slot="header">Beautiful Modal Dialog</h3>
      <div slot="body">
        <p>This is an example of the modal component with Material Design 3 styling. It features proper focus management, backdrop interaction, and smooth animations.</p>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <my-icon icon="check" color="success" size="md"></my-icon>
          <span>Accessible and responsive</span>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
          <my-icon icon="star" color="warning" size="md"></my-icon>
          <span>Beautiful animations</span>
        </div>
      </div>
      <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <my-button label="Cancel" variant="text" onclick="this.closest('my-modal').open = false"></my-button>
        <my-button label="Confirm" variant="filled" onclick="this.closest('my-modal').open = false"></my-button>
      </div>
    </my-modal>
    
    <script>
      // Initialize showcase data table
      setTimeout(() => {
        const table = document.getElementById('showcase-table');
        if (table) {
          table.columns = [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'role', label: 'Role', sortable: true },
            { key: 'status', label: 'Status', 
              render: (value, row) => row.active 
                ? '<my-icon icon="check" color="success" size="sm"></my-icon>'
                : '<my-icon icon="close" color="error" size="sm"></my-icon>'
            }
          ];
          
          table.data = [
            { id: 1, name: 'Alice Johnson', role: 'Designer', active: true },
            { id: 2, name: 'Bob Smith', role: 'Developer', active: true },
            { id: 3, name: 'Carol Davis', role: 'Manager', active: false },
            { id: 4, name: 'David Wilson', role: 'Analyst', active: true },
            { id: 5, name: 'Eva Brown', role: 'Tester', active: true }
          ];
        }
      }, 100);
      
      // Notification demo function
      function showDemoNotification() {
        const types = ['success', 'info', 'warning', 'error'];
        const messages = [
          'Operation completed successfully!',
          'Here's some helpful information.',
          'Please review your settings.',
          'Something needs attention.'
        ];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomMessage = messages[types.indexOf(randomType)];
        
        const notification = document.createElement('my-notification');
        notification.type = randomType;
        notification.message = randomMessage;
        notification.duration = 4000;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 4500);
      }
    <\/script>
  `,o};e.parameters={docs:{description:{story:"A comprehensive master showcase displaying the full MyntUI component library with modern Material Design 3 styling, interactive demonstrations, and real-world usage examples."}}};var n,a,t;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
  \`;
  container.innerHTML = \`
    <style>
      .master-header {
        text-align: center;
        padding: 4rem 2rem 3rem;
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        position: relative;
        overflow: hidden;
      }
      
      .master-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff20" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.1;
      }
      
      .master-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--_global-font-weight-light);
        margin: 0 0 1rem 0;
        position: relative;
        z-index: 1;
      }
      
      .master-subtitle {
        font-size: clamp(1.1rem, 2vw, 1.5rem);
        opacity: 0.9;
        margin: 0;
        font-weight: var(--_global-font-weight-normal);
        position: relative;
        z-index: 1;
      }
      
      .master-content {
        padding: 3rem 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .master-section {
        margin-bottom: 4rem;
        padding: 2.5rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-xl);
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
        position: relative;
        overflow: hidden;
      }
      
      .master-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--_global-color-primary), var(--_global-color-secondary));
      }
      
      .section-title {
        font-size: var(--_global-font-size-headline-medium);
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0 0 2rem 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .section-description {
        font-size: var(--_global-font-size-body-medium);
        color: var(--_global-color-on-surface-variant);
        margin-bottom: 2rem;
        line-height: var(--_global-line-height-relaxed);
      }
      
      .component-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .component-demo {
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-standard);
        position: relative;
      }
      
      .component-demo:hover {
        box-shadow: var(--_global-elevation-3);
        border-color: var(--_global-color-primary);
        transform: translateY(-2px);
      }
      
      .demo-title {
        font-size: var(--_global-font-size-title-small);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
      }
      
      .demo-content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }
      
      .demo-vertical {
        flex-direction: column;
        align-items: stretch;
      }
      
      .demo-showcase {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }
      
      .color-demo {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .color-swatch {
        width: 3rem;
        height: 3rem;
        border-radius: var(--_global-border-radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: var(--_global-font-weight-bold);
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
        transition: transform var(--_global-motion-duration-short2);
      }
      
      .color-swatch:hover {
        transform: scale(1.1);
      }
      
      .interactive-demo {
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
      }
      
      .stat-card {
        padding: 1.5rem;
        background: var(--_global-color-surface-container);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .stat-value {
        font-size: 2rem;
        font-weight: var(--_global-font-weight-bold);
        color: var(--_global-color-primary);
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        font-size: var(--_global-font-size-body-small);
        color: var(--_global-color-on-surface-variant);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .floating-elements {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: -1;
      }
      
      .floating-shape {
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--_global-color-primary-container), var(--_global-color-secondary-container));
        opacity: 0.05;
        animation: float 20s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-30px) rotate(120deg); }
        66% { transform: translateY(30px) rotate(240deg); }
      }
    </style>
    
    <!-- Floating background elements -->
    <div class="floating-elements">
      <div class="floating-shape" style="width: 200px; height: 200px; top: 10%; left: 80%; animation-delay: 0s;"></div>
      <div class="floating-shape" style="width: 150px; height: 150px; top: 60%; left: 10%; animation-delay: 5s;"></div>
      <div class="floating-shape" style="width: 100px; height: 100px; top: 80%; left: 70%; animation-delay: 10s;"></div>
    </div>
    
    <!-- Header -->
    <header class="master-header">
      <h1 class="master-title">MyntUI Design System</h1>
      <p class="master-subtitle">Modern Material Design 3 Components for the Web</p>
    </header>
    
    <div class="master-content">
      <!-- Design Tokens -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="analytics" size="lg" color="primary"></my-icon>
          Design Tokens & Color System
        </h2>
        <p class="section-description">
          A comprehensive design token system built on Material Design 3 principles, featuring semantic color palettes, consistent spacing, and responsive typography scales.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <h3 class="demo-title">Color Palette</h3>
            <div class="color-demo">
              <div class="color-swatch" style="background: var(--_global-color-primary);">P</div>
              <div class="color-swatch" style="background: var(--_global-color-secondary);">S</div>
              <div class="color-swatch" style="background: var(--_global-color-success);">✓</div>
              <div class="color-swatch" style="background: var(--_global-color-warning);">⚠</div>
              <div class="color-swatch" style="background: var(--_global-color-error);">✗</div>
              <div class="color-swatch" style="background: var(--_global-color-info);">i</div>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Typography Scale</h3>
            <div class="demo-showcase">
              <div style="font: var(--_global-typography-headline-large); color: var(--_global-color-on-surface);">Headline Large</div>
              <div style="font: var(--_global-typography-title-medium); color: var(--_global-color-on-surface);">Title Medium</div>
              <div style="font: var(--_global-typography-body-large); color: var(--_global-color-on-surface);">Body Large</div>
              <div style="font: var(--_global-typography-label-medium); color: var(--_global-color-on-surface-variant);">Label Medium</div>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Elevation System</h3>
            <div class="demo-content">
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-1); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">1</div>
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-2); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">2</div>
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-3); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">3</div>
              <div style="width: 60px; height: 60px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); box-shadow: var(--_global-elevation-4); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--_global-color-on-surface);">4</div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Interactive Components -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="settings" size="lg" color="primary"></my-icon>
          Interactive Components
        </h2>
        <p class="section-description">
          Modern button components with Material Design 3 state layers, ripple effects, and comprehensive accessibility support.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <h3 class="demo-title">Button Variants</h3>
            <div class="demo-content">
              <my-button label="Filled" variant="filled"></my-button>
              <my-button label="Outlined" variant="outlined"></my-button>
              <my-button label="Text" variant="text"></my-button>
              <my-button label="Elevated" variant="elevated"></my-button>
              <my-button label="Tonal" variant="filled-tonal"></my-button>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Interactive Icons</h3>
            <div class="demo-content">
              <my-icon icon="favorite" size="xl" interactive color="error"></my-icon>
              <my-icon icon="share" size="xl" interactive color="primary"></my-icon>
              <my-icon icon="settings" size="xl" interactive color="secondary"></my-icon>
              <my-icon icon="star" size="xl" interactive color="warning"></my-icon>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Boolean Controls</h3>
            <div class="demo-content demo-vertical">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <my-toggle checked></my-toggle>
                <span>Toggle Control</span>
              </div>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <my-checkbox checked label="Checkbox"></my-checkbox>
              </div>
              <my-radio-group name="demo-radios">
                <my-radio value="1" label="Option 1" checked></my-radio>
                <my-radio value="2" label="Option 2"></my-radio>
              </my-radio-group>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Form Components -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="edit" size="lg" color="primary"></my-icon>
          Form Components
        </h2>
        <p class="section-description">
          Advanced input components with Material Design 3 styling, floating labels, validation, and comprehensive accessibility features.
        </p>
        <div class="component-grid">
          <div class="component-demo">
            <h3 class="demo-title">Input Variants</h3>
            <div class="demo-content demo-vertical">
              <my-input type="text" label="Full Name" placeholder="Enter your name" variant="outlined"></my-input>
              <my-input type="email" label="Email Address" placeholder="name@example.com" variant="filled"></my-input>
              <my-input type="password" label="Password" placeholder="Enter password" helper-text="Must be at least 8 characters"></my-input>
            </div>
          </div>
          
          <div class="component-demo">
            <h3 class="demo-title">Specialized Inputs</h3>
            <div class="demo-content demo-vertical">
              <my-input type="number" label="Age" min="0" max="120" value="25"></my-input>
              <my-input type="date" label="Birth Date"></my-input>
              <my-input type="url" label="Website" placeholder="https://example.com"></my-input>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Data Visualization -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="dashboard" size="lg" color="primary"></my-icon>
          Data Visualization
        </h2>
        <p class="section-description">
          Beautiful and accessible data visualization components including progress indicators, gauges, and sparklines with smooth animations.
        </p>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">85%</div>
            <div class="stat-label">System Performance</div>
            <my-gauge value="85" min="0" max="100" variant="success" animated show-value></my-gauge>
          </div>
          
          <div class="stat-card">
            <div class="stat-value">67%</div>
            <div class="stat-label">Memory Usage</div>
            <my-progress value="67" variant="info" animated show-value></my-progress>
          </div>
          
          <div class="stat-card">
            <div class="stat-value">42%</div>
            <div class="stat-label">CPU Load</div>
            <my-gauge value="42" min="0" max="100" variant="primary" animated show-value></my-gauge>
          </div>
          
          <div class="stat-card">
            <div class="stat-value">Trending Up</div>
            <div class="stat-label">Revenue Growth</div>
            <my-sparkline data="[20,25,22,28,35,32,40,38,45,50]" color="var(--_global-color-success)" style="height: 40px; margin-top: 1rem;"></my-sparkline>
          </div>
        </div>
      </section>
      
      <!-- Complex Components -->
      <section class="master-section">
        <h2 class="section-title">
          <my-icon icon="folder" size="lg" color="primary"></my-icon>
          Advanced Components
        </h2>
        <p class="section-description">
          Sophisticated components for complex user interfaces including data tables, modals, notifications, and interactive overlays.
        </p>
        <div class="component-grid">
          <div class="component-demo interactive-demo">
            <h3 class="demo-title">Interactive Overlays</h3>
            <div class="demo-content">
              <my-button label="Show Modal" onclick="document.querySelector('#demo-modal').open = true"></my-button>
              <my-button label="Show Notification" onclick="showDemoNotification()"></my-button>
              <my-tooltip text="This is a helpful tooltip with detailed information">
                <my-button label="Hover for Tooltip" variant="outlined"></my-button>
              </my-tooltip>
            </div>
          </div>
          
          <div class="component-demo interactive-demo">
            <h3 class="demo-title">Data Table</h3>
            <my-data-table 
              id="showcase-table" 
              selectable
              searchable
              paginated
              page-size="3"
              striped
              style="width: 100%; min-height: 200px;"
            ></my-data-table>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Modal for demo -->
    <my-modal id="demo-modal">
      <h3 slot="header">Beautiful Modal Dialog</h3>
      <div slot="body">
        <p>This is an example of the modal component with Material Design 3 styling. It features proper focus management, backdrop interaction, and smooth animations.</p>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <my-icon icon="check" color="success" size="md"></my-icon>
          <span>Accessible and responsive</span>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
          <my-icon icon="star" color="warning" size="md"></my-icon>
          <span>Beautiful animations</span>
        </div>
      </div>
      <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <my-button label="Cancel" variant="text" onclick="this.closest('my-modal').open = false"></my-button>
        <my-button label="Confirm" variant="filled" onclick="this.closest('my-modal').open = false"></my-button>
      </div>
    </my-modal>
    
    <script>
      // Initialize showcase data table
      setTimeout(() => {
        const table = document.getElementById('showcase-table');
        if (table) {
          table.columns = [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'role', label: 'Role', sortable: true },
            { key: 'status', label: 'Status', 
              render: (value, row) => row.active 
                ? '<my-icon icon="check" color="success" size="sm"></my-icon>'
                : '<my-icon icon="close" color="error" size="sm"></my-icon>'
            }
          ];
          
          table.data = [
            { id: 1, name: 'Alice Johnson', role: 'Designer', active: true },
            { id: 2, name: 'Bob Smith', role: 'Developer', active: true },
            { id: 3, name: 'Carol Davis', role: 'Manager', active: false },
            { id: 4, name: 'David Wilson', role: 'Analyst', active: true },
            { id: 5, name: 'Eva Brown', role: 'Tester', active: true }
          ];
        }
      }, 100);
      
      // Notification demo function
      function showDemoNotification() {
        const types = ['success', 'info', 'warning', 'error'];
        const messages = [
          'Operation completed successfully!',
          'Here\\'s some helpful information.',
          'Please review your settings.',
          'Something needs attention.'
        ];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomMessage = messages[types.indexOf(randomType)];
        
        const notification = document.createElement('my-notification');
        notification.type = randomType;
        notification.message = randomMessage;
        notification.duration = 4000;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 4500);
      }
    <\/script>
  \`;
  return container;
}`,...(t=(a=e.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};const k=["MasterShowcase"];export{e as MasterShowcase,k as __namedExportsOrder,_ as default};
