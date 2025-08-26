import"./index-C71BMuB7.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const D={title:"Layout/Grid System",parameters:{docs:{description:{component:"A flexible and responsive grid system built on CSS Grid, providing layout control with breakpoint support and item positioning."}}}},i=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      .demo-item {
        background: var(--_global-color-primary-container);
        color: var(--_global-color-on-primary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
      }
    </style>
    
    <h3>Basic 12-Column Grid</h3>
    <my-grid columns="12" gap="md">
      <my-grid-item col-span="3">
        <div class="demo-item">Col 3</div>
      </my-grid-item>
      <my-grid-item col-span="6">
        <div class="demo-item">Col 6</div>
      </my-grid-item>
      <my-grid-item col-span="3">
        <div class="demo-item">Col 3</div>
      </my-grid-item>
      <my-grid-item col-span="4">
        <div class="demo-item">Col 4</div>
      </my-grid-item>
      <my-grid-item col-span="4">
        <div class="demo-item">Col 4</div>
      </my-grid-item>
      <my-grid-item col-span="4">
        <div class="demo-item">Col 4</div>
      </my-grid-item>
    </my-grid>
  `,e},n=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      .demo-item {
        background: var(--_global-color-secondary-container);
        color: var(--_global-color-on-secondary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    
    <h3>Responsive Grid (Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols)</h3>
    <my-grid columns="1" md-columns="2" lg-columns="4" gap="lg">
      <my-grid-item>
        <div class="demo-item">Item 1</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 2</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 3</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 4</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 5</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 6</div>
      </my-grid-item>
    </my-grid>
  `,e},r=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      .demo-card {
        background: var(--_global-color-tertiary-container);
        color: var(--_global-color-on-tertiary-container);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
        min-height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--_global-color-outline-variant);
      }
      .demo-card h4 {
        margin: 0 0 0.5rem 0;
        font-size: var(--_global-font-size-md);
      }
      .demo-card p {
        margin: 0;
        font-size: var(--_global-font-size-sm);
        opacity: 0.8;
      }
    </style>
    
    <h3>Auto-Fit Grid (Cards resize to fill space)</h3>
    <my-grid auto-fit min-width="250px" gap="lg">
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 1</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 2</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 3</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 4</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 5</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
    </my-grid>
  `,e},o=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      .demo-header {
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-weight: var(--_global-font-weight-bold);
      }
      .demo-sidebar {
        background: var(--_global-color-secondary-container);
        color: var(--_global-color-on-secondary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        font-weight: var(--_global-font-weight-medium);
      }
      .demo-content {
        background: var(--_global-color-surface-container);
        color: var(--_global-color-on-surface);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
      }
      .demo-footer {
        background: var(--_global-color-surface-container-high);
        color: var(--_global-color-on-surface-variant);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-size: var(--_global-font-size-sm);
      }
    </style>
    
    <h3>Complex Layout with Spanning Items</h3>
    <my-grid columns="12" gap="md" style="min-height: 400px;">
      <!-- Header spans full width -->
      <my-grid-item col-span="12">
        <div class="demo-header">Header (12 columns)</div>
      </my-grid-item>
      
      <!-- Sidebar -->
      <my-grid-item col-span="3" md-col-span="2">
        <div class="demo-sidebar">
          <h4>Sidebar</h4>
          <p>Navigation items</p>
        </div>
      </my-grid-item>
      
      <!-- Main content -->
      <my-grid-item col-span="9" md-col-span="10">
        <div class="demo-content">
          <h4>Main Content Area</h4>
          <p>This is the main content area that adapts based on screen size. On mobile, the sidebar takes 3 columns, on larger screens it takes only 2 columns to give more space to the content.</p>
        </div>
      </my-grid-item>
      
      <!-- Footer spans full width -->
      <my-grid-item col-span="12">
        <div class="demo-footer">Footer (12 columns)</div>
      </my-grid-item>
    </my-grid>
  `,e},t=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      .alignment-grid {
        min-height: 300px;
        background: var(--_global-color-surface-container-lowest);
        border: 2px dashed var(--_global-color-outline-variant);
        border-radius: var(--_global-border-radius-lg);
        padding: var(--_global-spacing-md);
        margin-bottom: var(--_global-spacing-lg);
      }
      .demo-box {
        background: var(--_global-color-primary-container);
        color: var(--_global-color-on-primary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-sm);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
        width: 80px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--_global-font-size-sm);
      }
    </style>
    
    <h3>Grid Alignment Options</h3>
    
    <h4>Center Alignment</h4>
    <div class="alignment-grid">
      <my-grid columns="3" gap="lg" align-items="center" justify-content="center">
        <my-grid-item>
          <div class="demo-box">1</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">2</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">3</div>
        </my-grid-item>
      </my-grid>
    </div>
    
    <h4>Space Between</h4>
    <div class="alignment-grid">
      <my-grid columns="3" gap="sm" justify-content="space-between" align-items="center">
        <my-grid-item>
          <div class="demo-box">A</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">B</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">C</div>
        </my-grid-item>
      </my-grid>
    </div>
  `,e},a=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      .form-section {
        background: var(--_global-color-surface);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        margin-bottom: var(--_global-spacing-lg);
      }
      .form-section h3 {
        margin: 0 0 var(--_global-spacing-lg) 0;
        color: var(--_global-color-on-surface);
      }
    </style>
    
    <h3>Grid Layout with Form Inputs</h3>
    <div class="form-section">
      <h3>User Registration Form</h3>
      <my-grid columns="12" gap="lg">
        <!-- Name fields -->
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="text" label="First Name" placeholder="Enter first name" required></my-input>
        </my-grid-item>
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="text" label="Last Name" placeholder="Enter last name" required></my-input>
        </my-grid-item>
        
        <!-- Email full width -->
        <my-grid-item col-span="12">
          <my-input type="email" label="Email Address" placeholder="user@example.com" required></my-input>
        </my-grid-item>
        
        <!-- Phone and date of birth -->
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="tel" label="Phone Number" placeholder="+1 (555) 123-4567"></my-input>
        </my-grid-item>
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="date-of-birth" label="Date of Birth"></my-input>
        </my-grid-item>
        
        <!-- Address spanning different widths -->
        <my-grid-item col-span="12">
          <my-input type="text" label="Street Address" placeholder="123 Main Street"></my-input>
        </my-grid-item>
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="text" label="City" placeholder="City name"></my-input>
        </my-grid-item>
        <my-grid-item col-span="6" md-col-span="3">
          <my-input type="text" label="State" placeholder="State"></my-input>
        </my-grid-item>
        <my-grid-item col-span="6" md-col-span="3">
          <my-input type="text" label="ZIP Code" placeholder="12345"></my-input>
        </my-grid-item>
        
        <!-- Submit button -->
        <my-grid-item col-span="12" justify-self="center">
          <my-button variant="filled" label="Register Account"></my-button>
        </my-grid-item>
      </my-grid>
    </div>
  `,e};i.parameters={docs:{description:{story:"Basic 12-column grid layout with different column spans showing the fundamental grid system."}}};n.parameters={docs:{description:{story:"Responsive grid that adapts column count based on screen size - 1 column on mobile, 2 on tablet, 4 on desktop."}}};r.parameters={docs:{description:{story:"Auto-fit grid that automatically adjusts the number of columns based on available space and minimum item width."}}};o.parameters={docs:{description:{story:"Complex layout showing header, sidebar, main content, and footer with responsive column adjustments."}}};t.parameters={docs:{description:{story:"Grid alignment options including center alignment and space distribution."}}};a.parameters={docs:{description:{story:"Practical example showing how to use the grid system to create responsive form layouts."}}};var d,m,l;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      .demo-item {
        background: var(--_global-color-primary-container);
        color: var(--_global-color-on-primary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
      }
    </style>
    
    <h3>Basic 12-Column Grid</h3>
    <my-grid columns="12" gap="md">
      <my-grid-item col-span="3">
        <div class="demo-item">Col 3</div>
      </my-grid-item>
      <my-grid-item col-span="6">
        <div class="demo-item">Col 6</div>
      </my-grid-item>
      <my-grid-item col-span="3">
        <div class="demo-item">Col 3</div>
      </my-grid-item>
      <my-grid-item col-span="4">
        <div class="demo-item">Col 4</div>
      </my-grid-item>
      <my-grid-item col-span="4">
        <div class="demo-item">Col 4</div>
      </my-grid-item>
      <my-grid-item col-span="4">
        <div class="demo-item">Col 4</div>
      </my-grid-item>
    </my-grid>
  \`;
  return container;
}`,...(l=(m=i.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var s,c,g;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      .demo-item {
        background: var(--_global-color-secondary-container);
        color: var(--_global-color-on-secondary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    
    <h3>Responsive Grid (Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols)</h3>
    <my-grid columns="1" md-columns="2" lg-columns="4" gap="lg">
      <my-grid-item>
        <div class="demo-item">Item 1</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 2</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 3</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 4</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 5</div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-item">Item 6</div>
      </my-grid-item>
    </my-grid>
  \`;
  return container;
}`,...(g=(c=n.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var p,y,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      .demo-card {
        background: var(--_global-color-tertiary-container);
        color: var(--_global-color-on-tertiary-container);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
        min-height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--_global-color-outline-variant);
      }
      .demo-card h4 {
        margin: 0 0 0.5rem 0;
        font-size: var(--_global-font-size-md);
      }
      .demo-card p {
        margin: 0;
        font-size: var(--_global-font-size-sm);
        opacity: 0.8;
      }
    </style>
    
    <h3>Auto-Fit Grid (Cards resize to fill space)</h3>
    <my-grid auto-fit min-width="250px" gap="lg">
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 1</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 2</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 3</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 4</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
      <my-grid-item>
        <div class="demo-card">
          <h4>Card 5</h4>
          <p>Auto-sizing card</p>
        </div>
      </my-grid-item>
    </my-grid>
  \`;
  return container;
}`,...(u=(y=r.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var v,b,h;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      .demo-header {
        background: var(--_global-color-primary);
        color: var(--_global-color-on-primary);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-weight: var(--_global-font-weight-bold);
      }
      .demo-sidebar {
        background: var(--_global-color-secondary-container);
        color: var(--_global-color-on-secondary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        font-weight: var(--_global-font-weight-medium);
      }
      .demo-content {
        background: var(--_global-color-surface-container);
        color: var(--_global-color-on-surface);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
      }
      .demo-footer {
        background: var(--_global-color-surface-container-high);
        color: var(--_global-color-on-surface-variant);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-md);
        text-align: center;
        font-size: var(--_global-font-size-sm);
      }
    </style>
    
    <h3>Complex Layout with Spanning Items</h3>
    <my-grid columns="12" gap="md" style="min-height: 400px;">
      <!-- Header spans full width -->
      <my-grid-item col-span="12">
        <div class="demo-header">Header (12 columns)</div>
      </my-grid-item>
      
      <!-- Sidebar -->
      <my-grid-item col-span="3" md-col-span="2">
        <div class="demo-sidebar">
          <h4>Sidebar</h4>
          <p>Navigation items</p>
        </div>
      </my-grid-item>
      
      <!-- Main content -->
      <my-grid-item col-span="9" md-col-span="10">
        <div class="demo-content">
          <h4>Main Content Area</h4>
          <p>This is the main content area that adapts based on screen size. On mobile, the sidebar takes 3 columns, on larger screens it takes only 2 columns to give more space to the content.</p>
        </div>
      </my-grid-item>
      
      <!-- Footer spans full width -->
      <my-grid-item col-span="12">
        <div class="demo-footer">Footer (12 columns)</div>
      </my-grid-item>
    </my-grid>
  \`;
  return container;
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var f,_,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      .alignment-grid {
        min-height: 300px;
        background: var(--_global-color-surface-container-lowest);
        border: 2px dashed var(--_global-color-outline-variant);
        border-radius: var(--_global-border-radius-lg);
        padding: var(--_global-spacing-md);
        margin-bottom: var(--_global-spacing-lg);
      }
      .demo-box {
        background: var(--_global-color-primary-container);
        color: var(--_global-color-on-primary-container);
        padding: var(--_global-spacing-md);
        border-radius: var(--_global-border-radius-sm);
        text-align: center;
        font-weight: var(--_global-font-weight-medium);
        width: 80px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--_global-font-size-sm);
      }
    </style>
    
    <h3>Grid Alignment Options</h3>
    
    <h4>Center Alignment</h4>
    <div class="alignment-grid">
      <my-grid columns="3" gap="lg" align-items="center" justify-content="center">
        <my-grid-item>
          <div class="demo-box">1</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">2</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">3</div>
        </my-grid-item>
      </my-grid>
    </div>
    
    <h4>Space Between</h4>
    <div class="alignment-grid">
      <my-grid columns="3" gap="sm" justify-content="space-between" align-items="center">
        <my-grid-item>
          <div class="demo-box">A</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">B</div>
        </my-grid-item>
        <my-grid-item>
          <div class="demo-box">C</div>
        </my-grid-item>
      </my-grid>
    </div>
  \`;
  return container;
}`,...(x=(_=t.parameters)==null?void 0:_.docs)==null?void 0:x.source}}};var w,C,A;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      .form-section {
        background: var(--_global-color-surface);
        padding: var(--_global-spacing-lg);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        margin-bottom: var(--_global-spacing-lg);
      }
      .form-section h3 {
        margin: 0 0 var(--_global-spacing-lg) 0;
        color: var(--_global-color-on-surface);
      }
    </style>
    
    <h3>Grid Layout with Form Inputs</h3>
    <div class="form-section">
      <h3>User Registration Form</h3>
      <my-grid columns="12" gap="lg">
        <!-- Name fields -->
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="text" label="First Name" placeholder="Enter first name" required></my-input>
        </my-grid-item>
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="text" label="Last Name" placeholder="Enter last name" required></my-input>
        </my-grid-item>
        
        <!-- Email full width -->
        <my-grid-item col-span="12">
          <my-input type="email" label="Email Address" placeholder="user@example.com" required></my-input>
        </my-grid-item>
        
        <!-- Phone and date of birth -->
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="tel" label="Phone Number" placeholder="+1 (555) 123-4567"></my-input>
        </my-grid-item>
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="date-of-birth" label="Date of Birth"></my-input>
        </my-grid-item>
        
        <!-- Address spanning different widths -->
        <my-grid-item col-span="12">
          <my-input type="text" label="Street Address" placeholder="123 Main Street"></my-input>
        </my-grid-item>
        <my-grid-item col-span="12" md-col-span="6">
          <my-input type="text" label="City" placeholder="City name"></my-input>
        </my-grid-item>
        <my-grid-item col-span="6" md-col-span="3">
          <my-input type="text" label="State" placeholder="State"></my-input>
        </my-grid-item>
        <my-grid-item col-span="6" md-col-span="3">
          <my-input type="text" label="ZIP Code" placeholder="12345"></my-input>
        </my-grid-item>
        
        <!-- Submit button -->
        <my-grid-item col-span="12" justify-self="center">
          <my-button variant="filled" label="Register Account"></my-button>
        </my-grid-item>
      </my-grid>
    </div>
  \`;
  return container;
}`,...(A=(C=a.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};const O=["BasicGrid","ResponsiveGrid","AutoFitGrid","ComplexLayout","AlignmentDemo","GridWithInputs"];export{t as AlignmentDemo,r as AutoFitGrid,i as BasicGrid,o as ComplexLayout,a as GridWithInputs,n as ResponsiveGrid,O as __namedExportsOrder,D as default};
