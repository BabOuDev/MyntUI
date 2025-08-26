import"./index-C71BMuB7.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const C={title:"Theme/Dark Theme Support",parameters:{docs:{description:{component:"Complete dark theme support for all components, demonstrating proper color scheme handling and theme switching."}},backgrounds:{default:"dark",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1c1b1f"}]}},decorators:[e=>{const n=document.createElement("div");n.setAttribute("data-color-scheme","dark"),n.style.cssText=`
        background: var(--_global-color-scheme-dark-surface, #1c1b1f);
        color: var(--_global-color-scheme-dark-on-surface, #e6e0e9);
        min-height: 100vh;
        padding: 2rem;
      `;const m=e();return n.appendChild(m),n}]},t=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      [data-color-scheme="dark"] {
        --_global-color-primary: var(--_global-color-scheme-dark-primary);
        --_global-color-on-primary: var(--_global-color-scheme-dark-on-primary);
        --_global-color-primary-container: var(--_global-color-scheme-dark-primary-container);
        --_global-color-on-primary-container: var(--_global-color-scheme-dark-on-primary-container);
        --_global-color-surface: var(--_global-color-scheme-dark-surface);
        --_global-color-on-surface: var(--_global-color-scheme-dark-on-surface);
        --_global-color-surface-variant: var(--_global-color-scheme-dark-surface-variant);
        --_global-color-on-surface-variant: var(--_global-color-scheme-dark-on-surface-variant);
        --_global-color-outline: var(--_global-color-scheme-dark-outline);
        --_global-color-outline-variant: var(--_global-color-scheme-dark-outline-variant);
      }
      
      .dark-section {
        background: color-mix(in srgb, var(--_global-color-surface, #1c1b1f) 95%, transparent);
        border: 1px solid var(--_global-color-outline-variant, #49454f);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
      }
      
      .dark-section h3 {
        color: var(--_global-color-on-surface, #e6e0e9);
        margin: 0 0 1.5rem 0;
        font-weight: var(--_global-font-weight-semibold);
      }
      
      .input-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      
      .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }
    </style>
    
    <div class="theme-toggle">
      <my-button id="theme-toggle" variant="outlined" label="Toggle Theme"></my-button>
    </div>
    
    <h2 style="color: var(--_global-color-on-surface); text-align: center; margin-bottom: 2rem;">
      Dark Theme Showcase - All Input Types
    </h2>
    
    <!-- Text & Pattern Inputs -->
    <div class="dark-section">
      <h3>Text & Pattern Inputs</h3>
      <div class="input-grid">
        <my-input type="text" label="Full Name" placeholder="Enter your full name" helper-text="Basic text input"></my-input>
        <my-input type="pattern" label="Product Code" placeholder="ABC123" pattern="[A-Z]{3}[0-9]{3}" helper-text="Format: ABC123"></my-input>
      </div>
    </div>
    
    <!-- Number Inputs -->
    <div class="dark-section">
      <h3>Number & Quantity Inputs</h3>
      <div class="input-grid">
        <my-input type="number" label="Price" placeholder="99.99" leading-icon="attach_money" min="0" max="9999" step="0.01"></my-input>
        <my-input type="integer" label="Quantity" placeholder="10" leading-icon="tag" min="1" max="100"></my-input>
      </div>
    </div>
    
    <!-- Date & Time Inputs -->
    <div class="dark-section">
      <h3>Date & Time Inputs</h3>
      <div class="input-grid">
        <my-input type="date" label="Event Date" leading-icon="event"></my-input>
        <my-input type="datetime-local" label="Appointment" leading-icon="schedule"></my-input>
        <my-input type="time" label="Meeting Time" leading-icon="access_time"></my-input>
        <my-input type="date-of-birth" label="Date of Birth" leading-icon="cake"></my-input>
      </div>
    </div>
    
    <!-- Contact & Web Inputs -->
    <div class="dark-section">
      <h3>Contact & Web Inputs</h3>
      <div class="input-grid">
        <my-input type="email" label="Email Address" placeholder="user@example.com" leading-icon="mail"></my-input>
        <my-input type="tel" label="Phone Number" placeholder="+1 (555) 123-4567" leading-icon="phone"></my-input>
        <my-input type="url" label="Website" placeholder="https://example.com" leading-icon="link"></my-input>
        <my-input type="password" label="Password" placeholder="Enter secure password" leading-icon="lock"></my-input>
      </div>
    </div>
    
    <!-- Advanced Inputs -->
    <div class="dark-section">
      <h3>Advanced Input Types</h3>
      <div class="input-grid">
        <my-input type="search" label="Search" placeholder="Search products..." leading-icon="search"></my-input>
        <my-input type="textarea" label="Description" placeholder="Enter detailed description..."></my-input>
        <my-input id="select-demo" type="select" label="Category"></my-input>
        <my-input type="dynamic-select" label="City" placeholder="Start typing city name..."></my-input>
      </div>
    </div>
    
    <!-- Boolean Inputs -->
    <div class="dark-section">
      <h3>Boolean & Choice Inputs</h3>
      <div class="input-grid">
        <my-input type="checkbox" label="I agree to the terms and conditions" value="false"></my-input>
        <my-input type="radio" label="Subscribe to newsletter" name="newsletter" value="false"></my-input>
      </div>
    </div>
    
    <!-- Boolean Components -->
    <div class="dark-section">
      <h3>Boolean Components</h3>
      <div class="input-grid">
        <div>
          <label style="color: var(--_global-color-on-surface); display: block; margin-bottom: 0.5rem;">Toggle Switch</label>
          <my-toggle label="Dark mode enabled" checked></my-toggle>
        </div>
        <div>
          <label style="color: var(--_global-color-on-surface); display: block; margin-bottom: 0.5rem;">Checkbox</label>
          <my-checkbox label="Enable notifications" checked></my-checkbox>
        </div>
      </div>
    </div>
    
    <!-- Grid Layout in Dark Theme -->
    <div class="dark-section">
      <h3>Grid System in Dark Theme</h3>
      <my-grid columns="4" gap="md">
        <my-grid-item col-span="2">
          <div style="background: var(--_global-color-primary-container); color: var(--_global-color-on-primary-container); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">
            Grid Item 1 (2 cols)
          </div>
        </my-grid-item>
        <my-grid-item>
          <div style="background: var(--_global-color-secondary-container, #333); color: var(--_global-color-on-secondary-container, #fff); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">
            Item 2
          </div>
        </my-grid-item>
        <my-grid-item>
          <div style="background: var(--_global-color-tertiary-container, #444); color: var(--_global-color-on-tertiary-container, #fff); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">
            Item 3
          </div>
        </my-grid-item>
      </my-grid>
    </div>
    
    <script>
      // Set up select options
      setTimeout(() => {
        const selectDemo = document.getElementById('select-demo');
        if (selectDemo) {
          const schema = {
            type: 'select',
            label: 'Category',
            options: [
              { label: 'Select Category', value: '' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Home & Garden', value: 'home' }
            ]
          };
          selectDemo.setAttribute('schema', JSON.stringify(schema));
        }
        
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.addEventListener('click', () => {
            const currentScheme = document.documentElement.getAttribute('data-color-scheme');
            const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-color-scheme', newScheme);
            document.body.style.background = newScheme === 'dark' ? '#1c1b1f' : '#ffffff';
          });
        }
      }, 100);
    <\/script>
  `,e},a=()=>{const e=document.createElement("div");return e.innerHTML=`
    <style>
      [data-color-scheme="dark"] {
        --_global-color-primary: var(--_global-color-scheme-dark-primary);
        --_global-color-on-primary: var(--_global-color-scheme-dark-on-primary);
        --_global-color-surface: var(--_global-color-scheme-dark-surface);
        --_global-color-on-surface: var(--_global-color-scheme-dark-on-surface);
      }
      
      .states-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .state-demo {
        background: color-mix(in srgb, var(--_global-color-surface) 95%, transparent);
        border: 1px solid var(--_global-color-outline-variant);
        border-radius: var(--_global-border-radius-lg);
        padding: 1.5rem;
      }
      
      .state-demo h4 {
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
        font-size: var(--_global-font-size-md);
      }
    </style>
    
    <h2 style="color: var(--_global-color-on-surface); text-align: center; margin-bottom: 2rem;">
      Component States in Dark Theme
    </h2>
    
    <div class="states-grid">
      <div class="state-demo">
        <h4>Normal State</h4>
        <my-input type="text" label="Normal Input" placeholder="Enter text"></my-input>
        <br><br>
        <my-button variant="filled" label="Normal Button"></my-button>
      </div>
      
      <div class="state-demo">
        <h4>Disabled State</h4>
        <my-input type="text" label="Disabled Input" placeholder="Enter text" disabled></my-input>
        <br><br>
        <my-button variant="filled" label="Disabled Button" disabled></my-button>
      </div>
      
      <div class="state-demo">
        <h4>Error State</h4>
        <my-input type="email" label="Email" value="invalid-email" helper-text="Please enter a valid email"></my-input>
        <br><br>
        <my-button variant="outlined" label="Error Button"></my-button>
      </div>
      
      <div class="state-demo">
        <h4>Focus State</h4>
        <my-input type="text" label="Focus Input" placeholder="Click to focus" autofocus></my-input>
        <br><br>
        <my-button variant="text" label="Text Button"></my-button>
      </div>
    </div>
    
    <div class="state-demo" style="grid-column: 1 / -1;">
      <h4>Interactive Components</h4>
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
        <my-toggle label="Dark Mode" checked></my-toggle>
        <my-checkbox label="Keep me logged in"></my-checkbox>
        <my-button variant="filled" label="Primary Action"></my-button>
        <my-button variant="outlined" label="Secondary Action"></my-button>
        <my-button variant="text" label="Tertiary Action"></my-button>
      </div>
    </div>
  `,e};t.parameters={docs:{description:{story:"All 18 input types displayed in dark theme, showing proper color scheme handling and visibility."}}};a.parameters={docs:{description:{story:"Different component states (normal, disabled, error, focus) in dark theme to ensure proper contrast and accessibility."}}};var o,r,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      [data-color-scheme="dark"] {
        --_global-color-primary: var(--_global-color-scheme-dark-primary);
        --_global-color-on-primary: var(--_global-color-scheme-dark-on-primary);
        --_global-color-primary-container: var(--_global-color-scheme-dark-primary-container);
        --_global-color-on-primary-container: var(--_global-color-scheme-dark-on-primary-container);
        --_global-color-surface: var(--_global-color-scheme-dark-surface);
        --_global-color-on-surface: var(--_global-color-scheme-dark-on-surface);
        --_global-color-surface-variant: var(--_global-color-scheme-dark-surface-variant);
        --_global-color-on-surface-variant: var(--_global-color-scheme-dark-on-surface-variant);
        --_global-color-outline: var(--_global-color-scheme-dark-outline);
        --_global-color-outline-variant: var(--_global-color-scheme-dark-outline-variant);
      }
      
      .dark-section {
        background: color-mix(in srgb, var(--_global-color-surface, #1c1b1f) 95%, transparent);
        border: 1px solid var(--_global-color-outline-variant, #49454f);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
      }
      
      .dark-section h3 {
        color: var(--_global-color-on-surface, #e6e0e9);
        margin: 0 0 1.5rem 0;
        font-weight: var(--_global-font-weight-semibold);
      }
      
      .input-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      
      .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }
    </style>
    
    <div class="theme-toggle">
      <my-button id="theme-toggle" variant="outlined" label="Toggle Theme"></my-button>
    </div>
    
    <h2 style="color: var(--_global-color-on-surface); text-align: center; margin-bottom: 2rem;">
      Dark Theme Showcase - All Input Types
    </h2>
    
    <!-- Text & Pattern Inputs -->
    <div class="dark-section">
      <h3>Text & Pattern Inputs</h3>
      <div class="input-grid">
        <my-input type="text" label="Full Name" placeholder="Enter your full name" helper-text="Basic text input"></my-input>
        <my-input type="pattern" label="Product Code" placeholder="ABC123" pattern="[A-Z]{3}[0-9]{3}" helper-text="Format: ABC123"></my-input>
      </div>
    </div>
    
    <!-- Number Inputs -->
    <div class="dark-section">
      <h3>Number & Quantity Inputs</h3>
      <div class="input-grid">
        <my-input type="number" label="Price" placeholder="99.99" leading-icon="attach_money" min="0" max="9999" step="0.01"></my-input>
        <my-input type="integer" label="Quantity" placeholder="10" leading-icon="tag" min="1" max="100"></my-input>
      </div>
    </div>
    
    <!-- Date & Time Inputs -->
    <div class="dark-section">
      <h3>Date & Time Inputs</h3>
      <div class="input-grid">
        <my-input type="date" label="Event Date" leading-icon="event"></my-input>
        <my-input type="datetime-local" label="Appointment" leading-icon="schedule"></my-input>
        <my-input type="time" label="Meeting Time" leading-icon="access_time"></my-input>
        <my-input type="date-of-birth" label="Date of Birth" leading-icon="cake"></my-input>
      </div>
    </div>
    
    <!-- Contact & Web Inputs -->
    <div class="dark-section">
      <h3>Contact & Web Inputs</h3>
      <div class="input-grid">
        <my-input type="email" label="Email Address" placeholder="user@example.com" leading-icon="mail"></my-input>
        <my-input type="tel" label="Phone Number" placeholder="+1 (555) 123-4567" leading-icon="phone"></my-input>
        <my-input type="url" label="Website" placeholder="https://example.com" leading-icon="link"></my-input>
        <my-input type="password" label="Password" placeholder="Enter secure password" leading-icon="lock"></my-input>
      </div>
    </div>
    
    <!-- Advanced Inputs -->
    <div class="dark-section">
      <h3>Advanced Input Types</h3>
      <div class="input-grid">
        <my-input type="search" label="Search" placeholder="Search products..." leading-icon="search"></my-input>
        <my-input type="textarea" label="Description" placeholder="Enter detailed description..."></my-input>
        <my-input id="select-demo" type="select" label="Category"></my-input>
        <my-input type="dynamic-select" label="City" placeholder="Start typing city name..."></my-input>
      </div>
    </div>
    
    <!-- Boolean Inputs -->
    <div class="dark-section">
      <h3>Boolean & Choice Inputs</h3>
      <div class="input-grid">
        <my-input type="checkbox" label="I agree to the terms and conditions" value="false"></my-input>
        <my-input type="radio" label="Subscribe to newsletter" name="newsletter" value="false"></my-input>
      </div>
    </div>
    
    <!-- Boolean Components -->
    <div class="dark-section">
      <h3>Boolean Components</h3>
      <div class="input-grid">
        <div>
          <label style="color: var(--_global-color-on-surface); display: block; margin-bottom: 0.5rem;">Toggle Switch</label>
          <my-toggle label="Dark mode enabled" checked></my-toggle>
        </div>
        <div>
          <label style="color: var(--_global-color-on-surface); display: block; margin-bottom: 0.5rem;">Checkbox</label>
          <my-checkbox label="Enable notifications" checked></my-checkbox>
        </div>
      </div>
    </div>
    
    <!-- Grid Layout in Dark Theme -->
    <div class="dark-section">
      <h3>Grid System in Dark Theme</h3>
      <my-grid columns="4" gap="md">
        <my-grid-item col-span="2">
          <div style="background: var(--_global-color-primary-container); color: var(--_global-color-on-primary-container); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">
            Grid Item 1 (2 cols)
          </div>
        </my-grid-item>
        <my-grid-item>
          <div style="background: var(--_global-color-secondary-container, #333); color: var(--_global-color-on-secondary-container, #fff); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">
            Item 2
          </div>
        </my-grid-item>
        <my-grid-item>
          <div style="background: var(--_global-color-tertiary-container, #444); color: var(--_global-color-on-tertiary-container, #fff); padding: 1rem; border-radius: var(--_global-border-radius-md); text-align: center;">
            Item 3
          </div>
        </my-grid-item>
      </my-grid>
    </div>
    
    <script>
      // Set up select options
      setTimeout(() => {
        const selectDemo = document.getElementById('select-demo');
        if (selectDemo) {
          const schema = {
            type: 'select',
            label: 'Category',
            options: [
              { label: 'Select Category', value: '' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Home & Garden', value: 'home' }
            ]
          };
          selectDemo.setAttribute('schema', JSON.stringify(schema));
        }
        
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.addEventListener('click', () => {
            const currentScheme = document.documentElement.getAttribute('data-color-scheme');
            const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-color-scheme', newScheme);
            document.body.style.background = newScheme === 'dark' ? '#1c1b1f' : '#ffffff';
          });
        }
      }, 100);
    <\/script>
  \`;
  return container;
}`,...(l=(r=t.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var i,c,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
    <style>
      [data-color-scheme="dark"] {
        --_global-color-primary: var(--_global-color-scheme-dark-primary);
        --_global-color-on-primary: var(--_global-color-scheme-dark-on-primary);
        --_global-color-surface: var(--_global-color-scheme-dark-surface);
        --_global-color-on-surface: var(--_global-color-scheme-dark-on-surface);
      }
      
      .states-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .state-demo {
        background: color-mix(in srgb, var(--_global-color-surface) 95%, transparent);
        border: 1px solid var(--_global-color-outline-variant);
        border-radius: var(--_global-border-radius-lg);
        padding: 1.5rem;
      }
      
      .state-demo h4 {
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
        font-size: var(--_global-font-size-md);
      }
    </style>
    
    <h2 style="color: var(--_global-color-on-surface); text-align: center; margin-bottom: 2rem;">
      Component States in Dark Theme
    </h2>
    
    <div class="states-grid">
      <div class="state-demo">
        <h4>Normal State</h4>
        <my-input type="text" label="Normal Input" placeholder="Enter text"></my-input>
        <br><br>
        <my-button variant="filled" label="Normal Button"></my-button>
      </div>
      
      <div class="state-demo">
        <h4>Disabled State</h4>
        <my-input type="text" label="Disabled Input" placeholder="Enter text" disabled></my-input>
        <br><br>
        <my-button variant="filled" label="Disabled Button" disabled></my-button>
      </div>
      
      <div class="state-demo">
        <h4>Error State</h4>
        <my-input type="email" label="Email" value="invalid-email" helper-text="Please enter a valid email"></my-input>
        <br><br>
        <my-button variant="outlined" label="Error Button"></my-button>
      </div>
      
      <div class="state-demo">
        <h4>Focus State</h4>
        <my-input type="text" label="Focus Input" placeholder="Click to focus" autofocus></my-input>
        <br><br>
        <my-button variant="text" label="Text Button"></my-button>
      </div>
    </div>
    
    <div class="state-demo" style="grid-column: 1 / -1;">
      <h4>Interactive Components</h4>
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
        <my-toggle label="Dark Mode" checked></my-toggle>
        <my-checkbox label="Keep me logged in"></my-checkbox>
        <my-button variant="filled" label="Primary Action"></my-button>
        <my-button variant="outlined" label="Secondary Action"></my-button>
        <my-button variant="text" label="Tertiary Action"></my-button>
      </div>
    </div>
  \`;
  return container;
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const A=["AllInputTypesDark","ComponentStatesInDark"];export{t as AllInputTypesDark,a as ComponentStatesInDark,A as __namedExportsOrder,C as default};
