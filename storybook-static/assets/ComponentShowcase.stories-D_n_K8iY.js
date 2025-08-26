import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const E={title:"Overview/Component Showcase",parameters:{docs:{description:{component:"A comprehensive showcase of all MyntUI components demonstrating their capabilities and visual consistency."}},layout:"fullscreen"}},e=()=>{const o=document.createElement("div");return o.style.cssText=`
    padding: 2rem;
    background: var(--_global-color-surface);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  `,o.innerHTML=`
    <style>
      .showcase-section {
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .showcase-title {
        font-size: var(--_global-font-size-xl);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 2px solid var(--_global-color-primary);
        padding-bottom: 0.5rem;
      }
      
      .showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .component-demo {
        padding: 1.5rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
        box-shadow: var(--_global-elevation-1);
      }
      
      .component-demo h4 {
        margin: 0 0 1rem 0;
        font-size: var(--_global-font-size-lg);
        color: var(--_global-color-on-surface);
        font-weight: var(--_global-font-weight-medium);
      }
      
      .demo-content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      
      .demo-vertical {
        flex-direction: column;
        align-items: stretch;
      }
      
      .color-palette {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      
      .color-swatch {
        width: 40px;
        height: 40px;
        border-radius: var(--_global-border-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      }
    </style>
    
    <!-- Header -->
    <header style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: 2.5rem; font-weight: 300; color: var(--_global-color-on-surface); margin: 0;">
        MyntUI Component Library
      </h1>
      <p style="font-size: 1.1rem; color: var(--_global-color-on-surface-variant); margin: 0.5rem 0 0 0;">
        Beautiful, accessible, framework-agnostic web components
      </p>
    </header>

    <!-- Color System -->
    <section class="showcase-section">
      <h2 class="showcase-title">Color System</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Primary Colors</h4>
          <div class="color-palette">
            <div class="color-swatch" style="background: var(--_global-color-primary);">P</div>
            <div class="color-swatch" style="background: var(--_global-color-on-primary); color: var(--_global-color-primary);">oP</div>
            <div class="color-swatch" style="background: var(--_global-color-primary-container);">PC</div>
            <div class="color-swatch" style="background: var(--_global-color-on-primary-container); color: var(--_global-color-primary-container);">oPC</div>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Secondary Colors</h4>
          <div class="color-palette">
            <div class="color-swatch" style="background: var(--_global-color-secondary);">S</div>
            <div class="color-swatch" style="background: var(--_global-color-on-secondary); color: var(--_global-color-secondary);">oS</div>
            <div class="color-swatch" style="background: var(--_global-color-secondary-container);">SC</div>
            <div class="color-swatch" style="background: var(--_global-color-on-secondary-container); color: var(--_global-color-secondary-container);">oSC</div>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Status Colors</h4>
          <div class="color-palette">
            <div class="color-swatch" style="background: var(--_global-color-success);">✓</div>
            <div class="color-swatch" style="background: var(--_global-color-warning);">⚠</div>
            <div class="color-swatch" style="background: var(--_global-color-error);">✗</div>
            <div class="color-swatch" style="background: var(--_global-color-info);">i</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Buttons & Actions -->
    <section class="showcase-section">
      <h2 class="showcase-title">Buttons & Actions</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Button Variants</h4>
          <div class="demo-content">
            <my-button label="Filled" variant="filled"></my-button>
            <my-button label="Outlined" variant="outlined"></my-button>
            <my-button label="Text" variant="text"></my-button>
            <my-button label="Elevated" variant="elevated"></my-button>
            <my-button label="Tonal" variant="filled-tonal"></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Button Sizes</h4>
          <div class="demo-content">
            <my-button label="Small" size="sm" variant="filled"></my-button>
            <my-button label="Medium" size="md" variant="filled"></my-button>
            <my-button label="Large" size="lg" variant="filled"></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Button States</h4>
          <div class="demo-content">
            <my-button label="Normal" variant="filled"></my-button>
            <my-button label="Disabled" variant="filled" disabled></my-button>
            <my-button label="Loading" variant="filled" loading></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>FAB & Icon Buttons</h4>
          <div class="demo-content">
            <my-button fab><my-icon icon="add"></my-icon></my-button>
            <my-button icon-only variant="filled"><my-icon icon="favorite"></my-icon></my-button>
            <my-button icon-only variant="outlined"><my-icon icon="share"></my-icon></my-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Controls -->
    <section class="showcase-section">
      <h2 class="showcase-title">Form Controls</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Input Variants</h4>
          <div class="demo-content demo-vertical">
            <my-input type="text" label="Outlined Input" placeholder="Enter text..."></my-input>
            <my-input type="text" label="Filled Input" variant="filled" placeholder="Enter text..."></my-input>
            <my-input type="email" label="Email" required placeholder="name@example.com"></my-input>
            <my-input type="password" label="Password" placeholder="Enter password..."></my-input>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Boolean Controls</h4>
          <div class="demo-content demo-vertical">
            <my-toggle></my-toggle>
            <my-checkbox label="Accept terms"></my-checkbox>
            <my-radio-group name="options">
              <my-radio value="1" label="Option 1"></my-radio>
              <my-radio value="2" label="Option 2"></my-radio>
              <my-radio value="3" label="Option 3"></my-radio>
            </my-radio-group>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Visualization -->
    <section class="showcase-section">
      <h2 class="showcase-title">Data Visualization</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Progress Indicators</h4>
          <div class="demo-content demo-vertical">
            <my-progress value="25" label="25%"></my-progress>
            <my-progress value="60" variant="success" label="60%"></my-progress>
            <my-progress value="90" variant="warning" label="90%"></my-progress>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Gauges</h4>
          <div class="demo-content">
            <my-gauge value="75" min="0" max="100" label="CPU Usage"></my-gauge>
            <my-gauge value="45" min="0" max="100" label="Memory" variant="info"></my-gauge>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Sparklines</h4>
          <div class="demo-content demo-vertical">
            <my-sparkline data="[20,25,30,28,35,40,38,45,50,48]" color="var(--_global-color-success)"></my-sparkline>
            <my-sparkline data="[50,45,40,35,30,25,30,35,40,45]" color="var(--_global-color-error)"></my-sparkline>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Elements -->
    <section class="showcase-section">
      <h2 class="showcase-title">Interactive Elements</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Icons</h4>
          <div class="demo-content">
            <my-icon icon="home" size="lg"></my-icon>
            <my-icon icon="settings" size="lg" color="primary"></my-icon>
            <my-icon icon="favorite" size="lg" color="error"></my-icon>
            <my-icon icon="star" size="lg" color="warning"></my-icon>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Interactive Icons</h4>
          <div class="demo-content">
            <my-icon icon="thumb_up" size="lg" interactive color="success"></my-icon>
            <my-icon icon="share" size="lg" interactive color="primary"></my-icon>
            <my-icon icon="more_vert" size="lg" interactive></my-icon>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Dropdowns</h4>
          <div class="demo-content">
            <my-dropdown label="Select Option">
              <my-icon slot="trigger" icon="expand_more"></my-icon>
            </my-dropdown>
          </div>
        </div>
      </div>
    </section>

    <!-- Layout & Navigation -->
    <section class="showcase-section">
      <h2 class="showcase-title">Layout Components</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Modals</h4>
          <div class="demo-content">
            <my-button label="Open Modal" onclick="document.querySelector('my-modal').open = true"></my-button>
            <my-modal id="demo-modal">
              <h3 slot="header">Demo Modal</h3>
              <p slot="body">This is a modal dialog with Material Design 3 styling.</p>
              <my-button slot="footer" label="Close" variant="text" onclick="this.closest('my-modal').open = false"></my-button>
            </my-modal>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Notifications</h4>
          <div class="demo-content">
            <my-button label="Show Success" onclick="showNotification('success', 'Operation completed successfully!')"></my-button>
            <my-button label="Show Error" onclick="showNotification('error', 'Something went wrong!')"></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Tooltips</h4>
          <div class="demo-content">
            <my-tooltip text="This is a helpful tooltip">
              <my-button label="Hover me"></my-button>
            </my-tooltip>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Display -->
    <section class="showcase-section">
      <h2 class="showcase-title">Data Display</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Data List</h4>
          <div class="demo-content demo-vertical">
            <my-data-list id="demo-list" style="height: 200px; width: 100%;"></my-data-list>
          </div>
        </div>
        
        <div class="component-demo" style="grid-column: 1 / -1;">
          <h4>Data Table</h4>
          <div class="demo-content demo-vertical">
            <my-data-table 
              id="demo-table" 
              selectable
              searchable
              paginated
              page-size="5"
              dense
              striped
              style="width: 100%;"
            ></my-data-table>
          </div>
        </div>
      </div>
    </section>

    <script>
      // Initialize demo data list
      const dataList = document.getElementById('demo-list');
      if (dataList) {
        dataList.rows = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
        ];
      }
      
      // Initialize demo data table
      const dataTable = document.getElementById('demo-table');
      if (dataTable) {
        dataTable.columns = [
          { key: 'id', label: 'ID', type: 'number', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'department', label: 'Department', sortable: true },
          { 
            key: 'status', 
            label: 'Status',
            render: (value, row) => row.active 
              ? '<span style="color: var(--_global-color-success); font-weight: bold;">●</span>' 
              : '<span style="color: var(--_global-color-error); font-weight: bold;">●</span>'
          }
        ];
        
        dataTable.data = [
          { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', active: true },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', active: true },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Sales', active: false },
          { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'HR', active: true },
          { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', department: 'Engineering', active: true },
          { id: 6, name: 'Diana Davis', email: 'diana@example.com', department: 'Marketing', active: false },
          { id: 7, name: 'Eve Miller', email: 'eve@example.com', department: 'Operations', active: true },
          { id: 8, name: 'Frank Garcia', email: 'frank@example.com', department: 'Sales', active: true },
          { id: 9, name: 'Grace Lee', email: 'grace@example.com', department: 'Engineering', active: true },
          { id: 10, name: 'Henry Kim', email: 'henry@example.com', department: 'Finance', active: false }
        ];
      }
      
      // Notification helper
      function showNotification(type, message) {
        const notification = document.createElement('my-notification');
        notification.type = type;
        notification.message = message;
        notification.duration = 3000;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 3500);
      }
    <\/script>
  `,o};e.parameters={docs:{description:{story:"A comprehensive showcase displaying all MyntUI components with their variants, states, and usage examples."}}};const a=()=>{const o=document.createElement("div");return o.style.cssText=`
    padding: 2rem;
    background: var(--_global-color-surface);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  `,o.innerHTML=`
    <style>
      .design-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .design-title {
        font-size: var(--_global-font-size-lg);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
      }
      
      .spacing-demo {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .spacing-box {
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-weight: 500;
      }
      
      .typography-sample {
        margin: 0.5rem 0;
        color: var(--_global-color-on-surface);
      }
      
      .elevation-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .elevation-card {
        padding: 1rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-size: 14px;
        color: var(--_global-color-on-surface);
      }
    </style>
    
    <h1>MyntUI Design System</h1>
    
    <div class="design-section">
      <h2 class="design-title">Typography Scale</h2>
      <div class="typography-sample" style="font-size: var(--_global-font-size-xs);">Extra Small - 12px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-sm);">Small - 14px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-md);">Medium - 16px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-lg);">Large - 18px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-xl);">Extra Large - 24px</div>
    </div>
    
    <div class="design-section">
      <h2 class="design-title">Spacing System</h2>
      <div class="spacing-demo">
        <div class="spacing-box" style="width: var(--_global-spacing-xs); height: var(--_global-spacing-xs);">XS</div>
        <div class="spacing-box" style="width: var(--_global-spacing-sm); height: var(--_global-spacing-sm);">SM</div>
        <div class="spacing-box" style="width: var(--_global-spacing-md); height: var(--_global-spacing-md);">MD</div>
        <div class="spacing-box" style="width: var(--_global-spacing-lg); height: var(--_global-spacing-lg);">LG</div>
        <div class="spacing-box" style="width: var(--_global-spacing-xl); height: var(--_global-spacing-xl);">XL</div>
      </div>
    </div>
    
    <div class="design-section">
      <h2 class="design-title">Elevation System</h2>
      <div class="elevation-demo">
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-1);">Level 1</div>
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-2);">Level 2</div>
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-3);">Level 3</div>
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-4);">Level 4</div>
      </div>
    </div>
  `,o};a.parameters={docs:{description:{story:"Documentation of the design system tokens, including typography, spacing, colors, and elevation."}}};var n,t,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 2rem;
    background: var(--_global-color-surface);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  \`;
  container.innerHTML = \`
    <style>
      .showcase-section {
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .showcase-title {
        font-size: var(--_global-font-size-xl);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 2px solid var(--_global-color-primary);
        padding-bottom: 0.5rem;
      }
      
      .showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .component-demo {
        padding: 1.5rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
        box-shadow: var(--_global-elevation-1);
      }
      
      .component-demo h4 {
        margin: 0 0 1rem 0;
        font-size: var(--_global-font-size-lg);
        color: var(--_global-color-on-surface);
        font-weight: var(--_global-font-weight-medium);
      }
      
      .demo-content {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      
      .demo-vertical {
        flex-direction: column;
        align-items: stretch;
      }
      
      .color-palette {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      
      .color-swatch {
        width: 40px;
        height: 40px;
        border-radius: var(--_global-border-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      }
    </style>
    
    <!-- Header -->
    <header style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: 2.5rem; font-weight: 300; color: var(--_global-color-on-surface); margin: 0;">
        MyntUI Component Library
      </h1>
      <p style="font-size: 1.1rem; color: var(--_global-color-on-surface-variant); margin: 0.5rem 0 0 0;">
        Beautiful, accessible, framework-agnostic web components
      </p>
    </header>

    <!-- Color System -->
    <section class="showcase-section">
      <h2 class="showcase-title">Color System</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Primary Colors</h4>
          <div class="color-palette">
            <div class="color-swatch" style="background: var(--_global-color-primary);">P</div>
            <div class="color-swatch" style="background: var(--_global-color-on-primary); color: var(--_global-color-primary);">oP</div>
            <div class="color-swatch" style="background: var(--_global-color-primary-container);">PC</div>
            <div class="color-swatch" style="background: var(--_global-color-on-primary-container); color: var(--_global-color-primary-container);">oPC</div>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Secondary Colors</h4>
          <div class="color-palette">
            <div class="color-swatch" style="background: var(--_global-color-secondary);">S</div>
            <div class="color-swatch" style="background: var(--_global-color-on-secondary); color: var(--_global-color-secondary);">oS</div>
            <div class="color-swatch" style="background: var(--_global-color-secondary-container);">SC</div>
            <div class="color-swatch" style="background: var(--_global-color-on-secondary-container); color: var(--_global-color-secondary-container);">oSC</div>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Status Colors</h4>
          <div class="color-palette">
            <div class="color-swatch" style="background: var(--_global-color-success);">✓</div>
            <div class="color-swatch" style="background: var(--_global-color-warning);">⚠</div>
            <div class="color-swatch" style="background: var(--_global-color-error);">✗</div>
            <div class="color-swatch" style="background: var(--_global-color-info);">i</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Buttons & Actions -->
    <section class="showcase-section">
      <h2 class="showcase-title">Buttons & Actions</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Button Variants</h4>
          <div class="demo-content">
            <my-button label="Filled" variant="filled"></my-button>
            <my-button label="Outlined" variant="outlined"></my-button>
            <my-button label="Text" variant="text"></my-button>
            <my-button label="Elevated" variant="elevated"></my-button>
            <my-button label="Tonal" variant="filled-tonal"></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Button Sizes</h4>
          <div class="demo-content">
            <my-button label="Small" size="sm" variant="filled"></my-button>
            <my-button label="Medium" size="md" variant="filled"></my-button>
            <my-button label="Large" size="lg" variant="filled"></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Button States</h4>
          <div class="demo-content">
            <my-button label="Normal" variant="filled"></my-button>
            <my-button label="Disabled" variant="filled" disabled></my-button>
            <my-button label="Loading" variant="filled" loading></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>FAB & Icon Buttons</h4>
          <div class="demo-content">
            <my-button fab><my-icon icon="add"></my-icon></my-button>
            <my-button icon-only variant="filled"><my-icon icon="favorite"></my-icon></my-button>
            <my-button icon-only variant="outlined"><my-icon icon="share"></my-icon></my-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Controls -->
    <section class="showcase-section">
      <h2 class="showcase-title">Form Controls</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Input Variants</h4>
          <div class="demo-content demo-vertical">
            <my-input type="text" label="Outlined Input" placeholder="Enter text..."></my-input>
            <my-input type="text" label="Filled Input" variant="filled" placeholder="Enter text..."></my-input>
            <my-input type="email" label="Email" required placeholder="name@example.com"></my-input>
            <my-input type="password" label="Password" placeholder="Enter password..."></my-input>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Boolean Controls</h4>
          <div class="demo-content demo-vertical">
            <my-toggle></my-toggle>
            <my-checkbox label="Accept terms"></my-checkbox>
            <my-radio-group name="options">
              <my-radio value="1" label="Option 1"></my-radio>
              <my-radio value="2" label="Option 2"></my-radio>
              <my-radio value="3" label="Option 3"></my-radio>
            </my-radio-group>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Visualization -->
    <section class="showcase-section">
      <h2 class="showcase-title">Data Visualization</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Progress Indicators</h4>
          <div class="demo-content demo-vertical">
            <my-progress value="25" label="25%"></my-progress>
            <my-progress value="60" variant="success" label="60%"></my-progress>
            <my-progress value="90" variant="warning" label="90%"></my-progress>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Gauges</h4>
          <div class="demo-content">
            <my-gauge value="75" min="0" max="100" label="CPU Usage"></my-gauge>
            <my-gauge value="45" min="0" max="100" label="Memory" variant="info"></my-gauge>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Sparklines</h4>
          <div class="demo-content demo-vertical">
            <my-sparkline data="[20,25,30,28,35,40,38,45,50,48]" color="var(--_global-color-success)"></my-sparkline>
            <my-sparkline data="[50,45,40,35,30,25,30,35,40,45]" color="var(--_global-color-error)"></my-sparkline>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Elements -->
    <section class="showcase-section">
      <h2 class="showcase-title">Interactive Elements</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Icons</h4>
          <div class="demo-content">
            <my-icon icon="home" size="lg"></my-icon>
            <my-icon icon="settings" size="lg" color="primary"></my-icon>
            <my-icon icon="favorite" size="lg" color="error"></my-icon>
            <my-icon icon="star" size="lg" color="warning"></my-icon>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Interactive Icons</h4>
          <div class="demo-content">
            <my-icon icon="thumb_up" size="lg" interactive color="success"></my-icon>
            <my-icon icon="share" size="lg" interactive color="primary"></my-icon>
            <my-icon icon="more_vert" size="lg" interactive></my-icon>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Dropdowns</h4>
          <div class="demo-content">
            <my-dropdown label="Select Option">
              <my-icon slot="trigger" icon="expand_more"></my-icon>
            </my-dropdown>
          </div>
        </div>
      </div>
    </section>

    <!-- Layout & Navigation -->
    <section class="showcase-section">
      <h2 class="showcase-title">Layout Components</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Modals</h4>
          <div class="demo-content">
            <my-button label="Open Modal" onclick="document.querySelector('my-modal').open = true"></my-button>
            <my-modal id="demo-modal">
              <h3 slot="header">Demo Modal</h3>
              <p slot="body">This is a modal dialog with Material Design 3 styling.</p>
              <my-button slot="footer" label="Close" variant="text" onclick="this.closest('my-modal').open = false"></my-button>
            </my-modal>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Notifications</h4>
          <div class="demo-content">
            <my-button label="Show Success" onclick="showNotification('success', 'Operation completed successfully!')"></my-button>
            <my-button label="Show Error" onclick="showNotification('error', 'Something went wrong!')"></my-button>
          </div>
        </div>
        
        <div class="component-demo">
          <h4>Tooltips</h4>
          <div class="demo-content">
            <my-tooltip text="This is a helpful tooltip">
              <my-button label="Hover me"></my-button>
            </my-tooltip>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Display -->
    <section class="showcase-section">
      <h2 class="showcase-title">Data Display</h2>
      <div class="showcase-grid">
        <div class="component-demo">
          <h4>Data List</h4>
          <div class="demo-content demo-vertical">
            <my-data-list id="demo-list" style="height: 200px; width: 100%;"></my-data-list>
          </div>
        </div>
        
        <div class="component-demo" style="grid-column: 1 / -1;">
          <h4>Data Table</h4>
          <div class="demo-content demo-vertical">
            <my-data-table 
              id="demo-table" 
              selectable
              searchable
              paginated
              page-size="5"
              dense
              striped
              style="width: 100%;"
            ></my-data-table>
          </div>
        </div>
      </div>
    </section>

    <script>
      // Initialize demo data list
      const dataList = document.getElementById('demo-list');
      if (dataList) {
        dataList.rows = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
        ];
      }
      
      // Initialize demo data table
      const dataTable = document.getElementById('demo-table');
      if (dataTable) {
        dataTable.columns = [
          { key: 'id', label: 'ID', type: 'number', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'department', label: 'Department', sortable: true },
          { 
            key: 'status', 
            label: 'Status',
            render: (value, row) => row.active 
              ? '<span style="color: var(--_global-color-success); font-weight: bold;">●</span>' 
              : '<span style="color: var(--_global-color-error); font-weight: bold;">●</span>'
          }
        ];
        
        dataTable.data = [
          { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', active: true },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', active: true },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Sales', active: false },
          { id: 4, name: 'Alice Brown', email: 'alice@example.com', department: 'HR', active: true },
          { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', department: 'Engineering', active: true },
          { id: 6, name: 'Diana Davis', email: 'diana@example.com', department: 'Marketing', active: false },
          { id: 7, name: 'Eve Miller', email: 'eve@example.com', department: 'Operations', active: true },
          { id: 8, name: 'Frank Garcia', email: 'frank@example.com', department: 'Sales', active: true },
          { id: 9, name: 'Grace Lee', email: 'grace@example.com', department: 'Engineering', active: true },
          { id: 10, name: 'Henry Kim', email: 'henry@example.com', department: 'Finance', active: false }
        ];
      }
      
      // Notification helper
      function showNotification(type, message) {
        const notification = document.createElement('my-notification');
        notification.type = type;
        notification.message = message;
        notification.duration = 3000;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 3500);
      }
    <\/script>
  \`;
  return container;
}`,...(i=(t=e.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var l,s,r;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 2rem;
    background: var(--_global-color-surface);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  \`;
  container.innerHTML = \`
    <style>
      .design-section {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .design-title {
        font-size: var(--_global-font-size-lg);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
      }
      
      .spacing-demo {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .spacing-box {
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-weight: 500;
      }
      
      .typography-sample {
        margin: 0.5rem 0;
        color: var(--_global-color-on-surface);
      }
      
      .elevation-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }
      
      .elevation-card {
        padding: 1rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-size: 14px;
        color: var(--_global-color-on-surface);
      }
    </style>
    
    <h1>MyntUI Design System</h1>
    
    <div class="design-section">
      <h2 class="design-title">Typography Scale</h2>
      <div class="typography-sample" style="font-size: var(--_global-font-size-xs);">Extra Small - 12px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-sm);">Small - 14px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-md);">Medium - 16px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-lg);">Large - 18px</div>
      <div class="typography-sample" style="font-size: var(--_global-font-size-xl);">Extra Large - 24px</div>
    </div>
    
    <div class="design-section">
      <h2 class="design-title">Spacing System</h2>
      <div class="spacing-demo">
        <div class="spacing-box" style="width: var(--_global-spacing-xs); height: var(--_global-spacing-xs);">XS</div>
        <div class="spacing-box" style="width: var(--_global-spacing-sm); height: var(--_global-spacing-sm);">SM</div>
        <div class="spacing-box" style="width: var(--_global-spacing-md); height: var(--_global-spacing-md);">MD</div>
        <div class="spacing-box" style="width: var(--_global-spacing-lg); height: var(--_global-spacing-lg);">LG</div>
        <div class="spacing-box" style="width: var(--_global-spacing-xl); height: var(--_global-spacing-xl);">XL</div>
      </div>
    </div>
    
    <div class="design-section">
      <h2 class="design-title">Elevation System</h2>
      <div class="elevation-demo">
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-1);">Level 1</div>
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-2);">Level 2</div>
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-3);">Level 3</div>
        <div class="elevation-card" style="box-shadow: var(--_global-elevation-4);">Level 4</div>
      </div>
    </div>
  \`;
  return container;
}`,...(r=(s=a.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const C=["AllComponents","DesignSystem"];export{e as AllComponents,a as DesignSystem,C as __namedExportsOrder,E as default};
