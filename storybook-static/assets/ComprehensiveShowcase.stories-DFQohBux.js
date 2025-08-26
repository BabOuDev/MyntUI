import"./index-C71BMuB7.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const E={title:"Overview/Comprehensive Showcase",parameters:{docs:{description:{component:"A comprehensive showcase of all MyntUI components with all variants, states, and sizes to demonstrate visual consistency and Material Design 3 compliance."}},layout:"fullscreen"}},n=()=>{const e=document.createElement("div");return e.style.cssText=`
    padding: 2rem;
    background: var(--_global-color-surface);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
    line-height: 1.6;
  `,e.innerHTML=`
    <style>
      .showcase-section {
        margin-bottom: 4rem;
        padding: 2.5rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        box-shadow: var(--_global-elevation-2);
        transition: box-shadow var(--_global-transition-normal);
      }
      
      .showcase-section:hover {
        box-shadow: var(--_global-elevation-3);
      }
      
      .main-title {
        font-size: 3rem;
        font-weight: 200;
        color: var(--_global-color-primary);
        text-align: center;
        margin: 0 0 1rem 0;
        background: linear-gradient(135deg, var(--_global-color-primary), var(--_global-color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .main-subtitle {
        font-size: 1.2rem;
        color: var(--_global-color-on-surface-variant);
        text-align: center;
        margin: 0 0 3rem 0;
        font-weight: 300;
      }
      
      .showcase-title {
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 3px solid var(--_global-color-primary);
        padding-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .section-icon {
        font-size: 1.5rem;
      }
      
      .showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .showcase-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .component-demo {
        padding: 1.75rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        box-shadow: var(--_global-elevation-1);
        transition: all var(--_global-transition-normal);
        position: relative;
        overflow: hidden;
      }
      
      .component-demo::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--_global-color-primary), var(--_global-color-secondary));
        opacity: 0.8;
      }
      
      .component-demo:hover {
        box-shadow: var(--_global-elevation-3);
        transform: translateY(-2px);
      }
      
      .component-demo h4 {
        margin: 0 0 1.25rem 0;
        font-size: var(--_global-font-size-title-medium);
        color: var(--_global-color-on-surface);
        font-weight: var(--_global-font-weight-medium);
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        gap: 1.25rem;
      }
      
      .demo-row {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;
      }
      
      .demo-label {
        font-size: var(--_global-font-size-label-small);
        color: var(--_global-color-on-surface-variant);
        font-weight: var(--_global-font-weight-medium);
        min-width: 80px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .variant-showcase {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .size-showcase {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      
      .state-showcase {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }
      
      .state-demo {
        text-align: center;
        padding: 1rem;
        background: var(--_global-color-surface-variant);
        border-radius: var(--_global-border-radius-sm);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .state-label {
        display: block;
        font-size: var(--_global-font-size-label-small);
        color: var(--_global-color-on-surface-variant);
        margin-top: 0.5rem;
        font-weight: var(--_global-font-weight-medium);
      }
      
      .color-palette {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin: 1rem 0;
      }
      
      .color-swatch {
        width: 48px;
        height: 48px;
        border-radius: var(--_global-border-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        position: relative;
        cursor: pointer;
        transition: transform var(--_global-transition-fast);
      }
      
      .color-swatch:hover {
        transform: scale(1.1);
      }
      
      .form-demo {
        max-width: 400px;
        padding: 1.5rem;
        background: var(--_global-color-surface-container-low);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .data-viz-demo {
        padding: 2rem;
        background: var(--_global-color-surface-container);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      
      .interactive-demo {
        padding: 2rem;
        border: 2px dashed var(--_global-color-outline-variant);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        background: var(--_global-color-surface-container-lowest);
        transition: all var(--_global-transition-normal);
      }
      
      .interactive-demo:hover {
        border-color: var(--_global-color-primary);
        background: var(--_global-color-primary-container);
      }
      
      .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      
      @media (max-width: 768px) {
        .showcase-grid {
          grid-template-columns: 1fr;
        }
        
        .main-title {
          font-size: 2rem;
        }
        
        .showcase-section {
          padding: 1.5rem;
        }
      }
    </style>
    
    <!-- Header -->
    <header style="text-align: center; margin-bottom: 4rem;">
      <h1 class="main-title">MyntUI Component Library</h1>
      <p class="main-subtitle">Testing and development environment for all components</p>
      <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
        <my-button variant="filled" size="sm">
          <my-icon icon="palette" slot="left"></my-icon>
          Material Design 3
        </my-button>
        <my-button variant="outlined" size="sm">
          <my-icon icon="accessibility" slot="left"></my-icon>
          Accessible
        </my-button>
        <my-button variant="text" size="sm">
          <my-icon icon="speed" slot="left"></my-icon>
          Fast & Lightweight
        </my-button>
      </div>
    </header>

    <!-- Basic Components Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="widgets" class="section-icon"></my-icon>
        Basic Components
      </h2>
      
      <div class="showcase-grid">
        <!-- Icons - Various Sizes -->
        <div class="component-demo">
          <h4><my-icon icon="photo" size="sm"></my-icon> Icons - Various Sizes</h4>
          <div class="demo-content">
            <div class="size-showcase">
              <span class="demo-label">Sizes:</span>
              <my-icon icon="home" size="xs"></my-icon>
              <my-icon icon="home" size="sm"></my-icon>
              <my-icon icon="home" size="md"></my-icon>
              <my-icon icon="home" size="lg"></my-icon>
              <my-icon icon="home" size="xl"></my-icon>
            </div>
          </div>
        </div>

        <!-- Icons - Different Colors -->
        <div class="component-demo">
          <h4><my-icon icon="palette" size="sm"></my-icon> Icons - Different Colors</h4>
          <div class="demo-content">
            <div class="variant-showcase">
              <my-icon icon="favorite" color="primary"></my-icon>
              <my-icon icon="star" color="secondary"></my-icon>
              <my-icon icon="error" color="error"></my-icon>
              <my-icon icon="check" color="success"></my-icon>
              <my-icon icon="warning" color="warning"></my-icon>
              <my-icon icon="info" color="info"></my-icon>
            </div>
          </div>
        </div>

        <!-- Material Design Variants -->
        <div class="component-demo">
          <h4><my-icon icon="style" size="sm"></my-icon> Material Design Variants</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <span class="demo-label">Filled:</span>
              <my-button variant="filled">Filled</my-button>
              <my-button variant="filled" disabled>Disabled</my-button>
              <my-button variant="filled" loading>Loading</my-button>
            </div>
            <div class="demo-row">
              <span class="demo-label">Outlined:</span>
              <my-button variant="outlined">Outlined</my-button>
              <my-button variant="outlined" disabled>Disabled</my-button>
            </div>
            <div class="demo-row">
              <span class="demo-label">Text:</span>
              <my-button variant="text">Text</my-button>
              <my-button variant="text" disabled>Disabled</my-button>
            </div>
          </div>
        </div>

        <!-- Legacy Variants (Still Supported) -->
        <div class="component-demo">
          <h4><my-icon icon="history" size="sm"></my-icon> Legacy Variants (Still Supported)</h4>
          <div class="demo-content">
            <div class="variant-showcase">
              <my-button variant="primary">Primary</my-button>
              <my-button variant="secondary">Secondary</my-button>
              <my-button variant="ghost">Ghost</my-button>
              <my-button variant="danger">Danger</my-button>
            </div>
          </div>
        </div>

        <!-- Button States -->
        <div class="component-demo">
          <h4><my-icon icon="toggle_on" size="sm"></my-icon> Button States</h4>
          <div class="demo-content">
            <div class="state-showcase">
              <div class="state-demo">
                <my-button size="sm">Normal</my-button>
                <span class="state-label">Normal</span>
              </div>
              <div class="state-demo">
                <my-button size="sm" disabled>Disabled</my-button>
                <span class="state-label">Disabled</span>
              </div>
              <div class="state-demo">
                <my-button size="sm" loading>Loading</my-button>
                <span class="state-label">Loading</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Button Sizes -->
        <div class="component-demo">
          <h4><my-icon icon="format_size" size="sm"></my-icon> Button Sizes</h4>
          <div class="demo-content">
            <div class="size-showcase">
              <my-button size="xs">XS</my-button>
              <my-button size="sm">Small</my-button>
              <my-button size="md">Medium</my-button>
              <my-button size="lg">Large</my-button>
              <my-button size="xl">XL</my-button>
            </div>
          </div>
        </div>
      </div>

      <div class="showcase-flex">
        <!-- Density Variants -->
        <div class="component-demo" style="flex: 1; min-width: 300px;">
          <h4><my-icon icon="view_compact" size="sm"></my-icon> Density Variants</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <span class="demo-label">Default:</span>
              <my-button size="sm" density="default">Default</my-button>
              <my-button size="md" density="default">Default</my-button>
              <my-button size="lg" density="default">Default</my-button>
            </div>
            <div class="demo-row">
              <span class="demo-label">Compact:</span>
              <my-button size="sm" density="compact">Compact</my-button>
              <my-button size="md" density="compact">Compact</my-button>
              <my-button size="lg" density="compact">Compact</my-button>
            </div>
          </div>
        </div>

        <!-- Ripple Effect Demo -->
        <div class="component-demo" style="flex: 1; min-width: 300px;">
          <h4><my-icon icon="radio_button_unchecked" size="sm"></my-icon> Ripple Effect Demo (Click to see ripple!)</h4>
          <div class="demo-content demo-vertical">
            <div class="interactive-demo">
              <my-button variant="filled" size="lg">Large Ripple</my-button>
              <p style="margin: 0.5rem 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">Click me!</p>
            </div>
            <div class="demo-row">
              <my-button variant="outlined">Outlined Ripple</my-button>
              <my-button variant="text">Text Ripple</my-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Components Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="input" class="section-icon"></my-icon>
        Form Components
      </h2>
      
      <div class="showcase-grid">
        <!-- Text Inputs -->
        <div class="component-demo">
          <h4><my-icon icon="text_fields" size="sm"></my-icon> Text Inputs</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="First Name" name="firstName" placeholder="Enter your first name" required></my-input>
              <br><br>
              <my-input label="Password" name="password" type="password" placeholder="Enter password" required></my-input>
            </div>
          </div>
        </div>

        <!-- Email & URL -->
        <div class="component-demo">
          <h4><my-icon icon="email" size="sm"></my-icon> Email & URL</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Email Address" name="email" type="email" placeholder="Email Address" required></my-input>
              <br><br>
              <my-input label="Website" name="website" type="url" placeholder="https://example.com"></my-input>
            </div>
          </div>
        </div>

        <!-- Numbers & Dates -->
        <div class="component-demo">
          <h4><my-icon icon="event" size="sm"></my-icon> Numbers & Dates</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Age" name="age" type="number" placeholder="Enter your age"></my-input>
              <br><br>
              <my-input label="Birth Date" name="birthDate" type="date"></my-input>
            </div>
          </div>
        </div>

        <!-- Textarea & Select -->
        <div class="component-demo">
          <h4><my-icon icon="notes" size="sm"></my-icon> Textarea & Select</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Comments" name="comments" type="textarea" placeholder="Enter your comments"></my-input>
              <br><br>
              <my-input label="Country" name="country" type="select"></my-input>
            </div>
          </div>
        </div>

        <!-- Label Positions -->
        <div class="component-demo">
          <h4><my-icon icon="label" size="sm"></my-icon> Label Positions</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Label Top" name="labelTop" label-position="top" placeholder="Label Top"></my-input>
              <br><br>
              <my-input label="Label Left" name="labelLeft" label-position="left" placeholder="Label Left"></my-input>
            </div>
          </div>
        </div>

        <!-- With Slots -->
        <div class="component-demo">
          <h4><my-icon icon="extension" size="sm"></my-icon> With Slots</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Price" name="price" type="number" placeholder="0.00">
                <span slot="left">$</span>
              </my-input>
              <br><br>
              <my-input label="Search" name="search" placeholder="Search...">
                <my-icon icon="search" slot="right"></my-icon>
              </my-input>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Boolean Inputs Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="check_box" class="section-icon"></my-icon>
        Boolean Inputs
      </h2>
      
      <div class="showcase-grid">
        <!-- Toggles -->
        <div class="component-demo">
          <h4><my-icon icon="toggle_on" size="sm"></my-icon> Toggles</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <my-toggle label="Enable notifications"></my-toggle>
            </div>
            <div class="demo-row">
              <my-toggle label="Dark mode" checked></my-toggle>
            </div>
            <div class="demo-row">
              <my-toggle label="Disabled toggle" disabled></my-toggle>
            </div>
          </div>
        </div>

        <!-- Checkboxes -->
        <div class="component-demo">
          <h4><my-icon icon="check_box" size="sm"></my-icon> Checkboxes</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <my-checkbox label="Accept terms" checked></my-checkbox>
            </div>
            <div class="demo-row">
              <my-checkbox label="Subscribe to newsletter" indeterminate></my-checkbox>
            </div>
            <div class="demo-row">
              <my-checkbox label="Disabled checkbox" disabled></my-checkbox>
            </div>
          </div>
        </div>

        <!-- Radio Groups -->
        <div class="component-demo">
          <h4><my-icon icon="radio_button_checked" size="sm"></my-icon> Radio Groups</h4>
          <div class="demo-content demo-vertical">
            <my-radio-group name="gender" value="female">
              <my-radio value="male" label="Male"></my-radio>
              <my-radio value="female" label="Female"></my-radio>
              <my-radio value="other" label="Other"></my-radio>
            </my-radio-group>
          </div>
        </div>

        <!-- Horizontal Radio Group -->
        <div class="component-demo">
          <h4><my-icon icon="radio_button_checked" size="sm"></my-icon> Horizontal Radio Group</h4>
          <div class="demo-content">
            <my-radio-group name="size" value="medium" style="display: flex; gap: 1rem;">
              <my-radio value="small" label="S"></my-radio>
              <my-radio value="medium" label="M"></my-radio>
              <my-radio value="large" label="L"></my-radio>
            </my-radio-group>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Components Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="touch_app" class="section-icon"></my-icon>
        Interactive Components
      </h2>
      
      <div class="showcase-grid">
        <!-- Buttons with Icons -->
        <div class="component-demo">
          <h4><my-icon icon="smart_button" size="sm"></my-icon> Buttons with Icons</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <my-button variant="filled">
                <my-icon icon="home" slot="left"></my-icon>
                Home
              </my-button>
              <my-button variant="outlined">
                Settings
                <my-icon icon="settings" slot="right"></my-icon>
              </my-button>
            </div>
            <div class="demo-row">
              <my-button variant="text">
                <my-icon icon="favorite" slot="left"></my-icon>
                Like
                <my-icon icon="thumb_up" slot="right"></my-icon>
              </my-button>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div class="component-demo">
          <h4><my-icon icon="mouse" size="sm"></my-icon> Interactive Demo</h4>
          <div class="demo-content">
            <div class="interactive-demo">
              <p style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface-variant);">
                Click, hover, and interact with these components!
              </p>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                <my-button variant="filled">Hover Me</my-button>
                <my-toggle label="Toggle me"></my-toggle>
                <my-checkbox label="Check me"></my-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Visualization Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="bar_chart" class="section-icon"></my-icon>
        Data Visualization
      </h2>
      
      <div class="showcase-grid">
        <!-- Progress Bars - Basic -->
        <div class="component-demo">
          <h4><my-icon icon="linear_scale" size="sm"></my-icon> Progress Bars - Basic</h4>
          <div class="demo-content demo-vertical">
            <my-progress value="25" label="25%"></my-progress>
            <my-progress value="50" variant="secondary" label="50%"></my-progress>
            <my-progress value="75" variant="success" label="75%"></my-progress>
            <my-progress value="90" variant="error" label="90%"></my-progress>
          </div>
        </div>

        <!-- Progress Bars - Special Variants -->
        <div class="component-demo">
          <h4><my-icon icon="timeline" size="sm"></my-icon> Progress Bars - Special Variants</h4>
          <div class="demo-content demo-vertical">
            <my-progress value="60" variant="striped" label="Striped 60%"></my-progress>
            <my-progress value="40" variant="animated" label="Animated 40%"></my-progress>
            <my-progress variant="indeterminate" label="Loading..."></my-progress>
          </div>
        </div>

        <!-- Progress Bars - Sizes -->
        <div class="component-demo">
          <h4><my-icon icon="height" size="sm"></my-icon> Progress Bars - Sizes</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <span class="demo-label">Thin:</span>
              <my-progress value="30" size="thin"></my-progress>
            </div>
            <div class="demo-row">
              <span class="demo-label">Normal:</span>
              <my-progress value="60" size="normal"></my-progress>
            </div>
            <div class="demo-row">
              <span class="demo-label">Thick:</span>
              <my-progress value="90" size="thick"></my-progress>
            </div>
          </div>
        </div>

        <!-- Circular Progress -->
        <div class="component-demo">
          <h4><my-icon icon="donut_small" size="sm"></my-icon> Circular Progress</h4>
          <div class="data-viz-demo">
            <my-progress value="75" variant="circular" size="large" label="75%"></my-progress>
            <p style="margin: 0; color: var(--_global-color-on-surface-variant);">Circular Progress</p>
          </div>
        </div>

        <!-- Gauges - Basic -->
        <div class="component-demo">
          <h4><my-icon icon="speed" size="sm"></my-icon> Gauges - Basic</h4>
          <div class="demo-content">
            <div class="responsive-grid">
              <div class="data-viz-demo">
                <my-gauge value="65" min="0" max="100" label="CPU"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">65% CPU</p>
              </div>
              <div class="data-viz-demo">
                <my-gauge value="45" min="0" max="100" label="MEMORY" variant="secondary"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">45% Memory</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gauge with Thresholds -->
        <div class="component-demo">
          <h4><my-icon icon="warning" size="sm"></my-icon> Gauge with Thresholds</h4>
          <div class="data-viz-demo">
            <my-gauge value="85" min="0" max="100" label="SYSTEM LOAD" variant="warning" 
                     low-threshold="30" high-threshold="80"></my-gauge>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-warning);">85% - Warning Level</p>
          </div>
        </div>

        <!-- Gauge Variants -->
        <div class="component-demo">
          <h4><my-icon icon="dashboard" size="sm"></my-icon> Gauge Variants</h4>
          <div class="demo-content">
            <div class="responsive-grid">
              <div class="data-viz-demo" style="min-height: 150px;">
                <my-gauge value="30" min="0" max="100" label="SUCCESS" variant="success"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-success);">30 Success</p>
              </div>
              <div class="data-viz-demo" style="min-height: 150px;">
                <my-gauge value="75" min="0" max="100" label="WARNING" variant="warning"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-warning);">75 Warning</p>
              </div>
              <div class="data-viz-demo" style="min-height: 150px;">
                <my-gauge value="90" min="0" max="100" label="ERROR" variant="error"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-error);">90 Error</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div class="component-demo">
          <h4><my-icon icon="tune" size="sm"></my-icon> Interactive Demo</h4>
          <div class="demo-content demo-vertical">
            <div class="interactive-demo">
              <p style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface-variant);">Adjust value: 75</p>
              <my-input type="range" min="0" max="100" value="75" 
                       style="width: 100%; margin-bottom: 1rem;"></my-input>
              <my-gauge value="75" min="0" max="100" label="INTERACTIVE" variant="primary"></my-gauge>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-primary);">75.0% Interactive</p>
            </div>
          </div>
        </div>

        <!-- Sparklines - Trend Visualization -->
        <div class="component-demo">
          <h4><my-icon icon="trending_up" size="sm"></my-icon> Sparklines - Trend Visualization</h4>
          <div class="demo-content demo-vertical">
            <div class="data-viz-demo" style="min-height: 120px; align-items: flex-start; text-align: left;">
              <div style="margin-bottom: 1rem;">
                <strong style="color: var(--_global-color-on-surface); font-size: 1.1rem;">Revenue Trend</strong>
                <my-sparkline data="[10,12,8,15,18,22,19,25,28,24,30]" color="var(--_global-color-success)"></my-sparkline>
              </div>
              <div style="margin-bottom: 1rem;">
                <strong style="color: var(--_global-color-on-surface); font-size: 1.1rem;">User Activity</strong>
                <my-sparkline data="[5,8,12,9,15,11,18,14,20,16,22]" color="var(--_global-color-primary)"></my-sparkline>
              </div>
              <div>
                <strong style="color: var(--_global-color-on-surface); font-size: 1.1rem;">System Load</strong>
                <my-sparkline data="[2,4,3,6,8,7,9,11,8,12,10]" color="var(--_global-color-warning)"></my-sparkline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,e},o=()=>{const e=document.createElement("div");return e.style.cssText=`
    padding: 2rem;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  `,e.innerHTML=`
    <style>
      .states-section {
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .states-title {
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 2px solid var(--_global-color-primary);
        padding-bottom: 0.5rem;
      }
      
      .states-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
      }
      
      .state-demo {
        padding: 1.5rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
        text-align: center;
      }
      
      .state-label {
        display: block;
        font-size: var(--_global-font-size-label-medium);
        color: var(--_global-color-on-surface-variant);
        margin-top: 1rem;
        font-weight: var(--_global-font-weight-medium);
      }
    </style>
    
    <h1 style="text-align: center; margin-bottom: 2rem; color: var(--_global-color-primary);">Component States</h1>
    
    <!-- Button States -->
    <section class="states-section">
      <h2 class="states-title">Button States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-button>Normal</my-button>
          <span class="state-label">Normal</span>
        </div>
        <div class="state-demo">
          <my-button disabled>Disabled</my-button>
          <span class="state-label">Disabled</span>
        </div>
        <div class="state-demo">
          <my-button loading>Loading</my-button>
          <span class="state-label">Loading</span>
        </div>
        <div class="state-demo">
          <my-button variant="outlined">Outlined</my-button>
          <span class="state-label">Outlined</span>
        </div>
        <div class="state-demo">
          <my-button variant="text">Text</my-button>
          <span class="state-label">Text</span>
        </div>
        <div class="state-demo">
          <my-button variant="error">Error</my-button>
          <span class="state-label">Error</span>
        </div>
      </div>
    </section>
    
    <!-- Input States -->
    <section class="states-section">
      <h2 class="states-title">Input States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-input label="Normal Input" placeholder="Enter text"></my-input>
          <span class="state-label">Normal</span>
        </div>
        <div class="state-demo">
          <my-input label="Disabled Input" disabled placeholder="Disabled"></my-input>
          <span class="state-label">Disabled</span>
        </div>
        <div class="state-demo">
          <my-input label="Required Input" required placeholder="Required"></my-input>
          <span class="state-label">Required</span>
        </div>
        <div class="state-demo">
          <my-input label="Error State" error placeholder="Error"></my-input>
          <span class="state-label">Error</span>
        </div>
      </div>
    </section>
    
    <!-- Toggle States -->
    <section class="states-section">
      <h2 class="states-title">Toggle States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-toggle label="Unchecked"></my-toggle>
          <span class="state-label">Unchecked</span>
        </div>
        <div class="state-demo">
          <my-toggle label="Checked" checked></my-toggle>
          <span class="state-label">Checked</span>
        </div>
        <div class="state-demo">
          <my-toggle label="Disabled" disabled></my-toggle>
          <span class="state-label">Disabled</span>
        </div>
        <div class="state-demo">
          <my-toggle label="Error" error></my-toggle>
          <span class="state-label">Error</span>
        </div>
      </div>
    </section>
    
    <!-- Checkbox States -->
    <section class="states-section">
      <h2 class="states-title">Checkbox States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-checkbox label="Unchecked"></my-checkbox>
          <span class="state-label">Unchecked</span>
        </div>
        <div class="state-demo">
          <my-checkbox label="Checked" checked></my-checkbox>
          <span class="state-label">Checked</span>
        </div>
        <div class="state-demo">
          <my-checkbox label="Indeterminate" indeterminate></my-checkbox>
          <span class="state-label">Indeterminate</span>
        </div>
        <div class="state-demo">
          <my-checkbox label="Disabled" disabled></my-checkbox>
          <span class="state-label">Disabled</span>
        </div>
      </div>
    </section>
  `,e},a=()=>{const e=document.createElement("div");return e.style.cssText=`
    padding: 2rem;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  `,e.innerHTML=`
    <style>
      .responsive-section {
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .responsive-title {
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 2px solid var(--_global-color-primary);
        padding-bottom: 0.5rem;
      }
      
      .responsive-demo {
        border: 2px dashed var(--_global-color-outline-variant);
        padding: 2rem;
        border-radius: var(--_global-border-radius-md);
        background: var(--_global-color-surface);
        resize: horizontal;
        overflow: hidden;
        min-width: 280px;
        max-width: 100%;
      }
      
      .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
      
      .responsive-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      
      .resize-handle {
        font-size: 0.875rem;
        color: var(--_global-color-on-surface-variant);
        text-align: center;
        margin-top: 1rem;
        font-style: italic;
      }
      
      @media (max-width: 768px) {
        .responsive-demo {
          resize: none;
        }
      }
    </style>
    
    <h1 style="text-align: center; margin-bottom: 2rem; color: var(--_global-color-primary);">Responsive Design</h1>
    
    <!-- Button Responsiveness -->
    <section class="responsive-section">
      <h2 class="responsive-title">Button Responsiveness</h2>
      <div class="responsive-demo">
        <div class="responsive-flex">
          <my-button>Home</my-button>
          <my-button variant="outlined">About</my-button>
          <my-button variant="text">Contact</my-button>
          <my-button variant="filled">
            <my-icon icon="shopping_cart" slot="left"></my-icon>
            Add to Cart
          </my-button>
        </div>
        <div class="resize-handle">← Drag to resize →</div>
      </div>
    </section>
    
    <!-- Form Responsiveness -->
    <section class="responsive-section">
      <h2 class="responsive-title">Form Responsiveness</h2>
      <div class="responsive-demo">
        <div class="responsive-grid">
          <my-input label="First Name" placeholder="First Name"></my-input>
          <my-input label="Last Name" placeholder="Last Name"></my-input>
          <my-input label="Email" type="email" placeholder="Email Address"></my-input>
          <my-input label="Phone" type="tel" placeholder="Phone Number"></my-input>
        </div>
        <div style="margin-top: 1rem;">
          <my-button variant="filled" style="width: 100%;">Submit Form</my-button>
        </div>
        <div class="resize-handle">← Drag to resize →</div>
      </div>
    </section>
    
    <!-- Data Visualization Responsiveness -->
    <section class="responsive-section">
      <h2 class="responsive-title">Data Visualization Responsiveness</h2>
      <div class="responsive-demo">
        <div class="responsive-grid">
          <div style="text-align: center;">
            <my-gauge value="65" min="0" max="100" label="CPU"></my-gauge>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">65% CPU Usage</p>
          </div>
          <div style="text-align: center;">
            <my-gauge value="45" min="0" max="100" label="MEMORY" variant="secondary"></my-gauge>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">45% Memory Usage</p>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <my-progress value="75" label="Overall Performance: 75%"></my-progress>
        </div>
        <div class="resize-handle">← Drag to resize →</div>
      </div>
    </section>
  `,e};var i,t,s;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 2rem;
    background: var(--_global-color-surface);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
    line-height: 1.6;
  \`;
  container.innerHTML = \`
    <style>
      .showcase-section {
        margin-bottom: 4rem;
        padding: 2.5rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        box-shadow: var(--_global-elevation-2);
        transition: box-shadow var(--_global-transition-normal);
      }
      
      .showcase-section:hover {
        box-shadow: var(--_global-elevation-3);
      }
      
      .main-title {
        font-size: 3rem;
        font-weight: 200;
        color: var(--_global-color-primary);
        text-align: center;
        margin: 0 0 1rem 0;
        background: linear-gradient(135deg, var(--_global-color-primary), var(--_global-color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .main-subtitle {
        font-size: 1.2rem;
        color: var(--_global-color-on-surface-variant);
        text-align: center;
        margin: 0 0 3rem 0;
        font-weight: 300;
      }
      
      .showcase-title {
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 3px solid var(--_global-color-primary);
        padding-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .section-icon {
        font-size: 1.5rem;
      }
      
      .showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .showcase-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .component-demo {
        padding: 1.75rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
        box-shadow: var(--_global-elevation-1);
        transition: all var(--_global-transition-normal);
        position: relative;
        overflow: hidden;
      }
      
      .component-demo::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--_global-color-primary), var(--_global-color-secondary));
        opacity: 0.8;
      }
      
      .component-demo:hover {
        box-shadow: var(--_global-elevation-3);
        transform: translateY(-2px);
      }
      
      .component-demo h4 {
        margin: 0 0 1.25rem 0;
        font-size: var(--_global-font-size-title-medium);
        color: var(--_global-color-on-surface);
        font-weight: var(--_global-font-weight-medium);
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
        gap: 1.25rem;
      }
      
      .demo-row {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;
      }
      
      .demo-label {
        font-size: var(--_global-font-size-label-small);
        color: var(--_global-color-on-surface-variant);
        font-weight: var(--_global-font-weight-medium);
        min-width: 80px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .variant-showcase {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .size-showcase {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }
      
      .state-showcase {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }
      
      .state-demo {
        text-align: center;
        padding: 1rem;
        background: var(--_global-color-surface-variant);
        border-radius: var(--_global-border-radius-sm);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .state-label {
        display: block;
        font-size: var(--_global-font-size-label-small);
        color: var(--_global-color-on-surface-variant);
        margin-top: 0.5rem;
        font-weight: var(--_global-font-weight-medium);
      }
      
      .color-palette {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin: 1rem 0;
      }
      
      .color-swatch {
        width: 48px;
        height: 48px;
        border-radius: var(--_global-border-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        position: relative;
        cursor: pointer;
        transition: transform var(--_global-transition-fast);
      }
      
      .color-swatch:hover {
        transform: scale(1.1);
      }
      
      .form-demo {
        max-width: 400px;
        padding: 1.5rem;
        background: var(--_global-color-surface-container-low);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .data-viz-demo {
        padding: 2rem;
        background: var(--_global-color-surface-container);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      
      .interactive-demo {
        padding: 2rem;
        border: 2px dashed var(--_global-color-outline-variant);
        border-radius: var(--_global-border-radius-lg);
        text-align: center;
        background: var(--_global-color-surface-container-lowest);
        transition: all var(--_global-transition-normal);
      }
      
      .interactive-demo:hover {
        border-color: var(--_global-color-primary);
        background: var(--_global-color-primary-container);
      }
      
      .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      
      @media (max-width: 768px) {
        .showcase-grid {
          grid-template-columns: 1fr;
        }
        
        .main-title {
          font-size: 2rem;
        }
        
        .showcase-section {
          padding: 1.5rem;
        }
      }
    </style>
    
    <!-- Header -->
    <header style="text-align: center; margin-bottom: 4rem;">
      <h1 class="main-title">MyntUI Component Library</h1>
      <p class="main-subtitle">Testing and development environment for all components</p>
      <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
        <my-button variant="filled" size="sm">
          <my-icon icon="palette" slot="left"></my-icon>
          Material Design 3
        </my-button>
        <my-button variant="outlined" size="sm">
          <my-icon icon="accessibility" slot="left"></my-icon>
          Accessible
        </my-button>
        <my-button variant="text" size="sm">
          <my-icon icon="speed" slot="left"></my-icon>
          Fast & Lightweight
        </my-button>
      </div>
    </header>

    <!-- Basic Components Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="widgets" class="section-icon"></my-icon>
        Basic Components
      </h2>
      
      <div class="showcase-grid">
        <!-- Icons - Various Sizes -->
        <div class="component-demo">
          <h4><my-icon icon="photo" size="sm"></my-icon> Icons - Various Sizes</h4>
          <div class="demo-content">
            <div class="size-showcase">
              <span class="demo-label">Sizes:</span>
              <my-icon icon="home" size="xs"></my-icon>
              <my-icon icon="home" size="sm"></my-icon>
              <my-icon icon="home" size="md"></my-icon>
              <my-icon icon="home" size="lg"></my-icon>
              <my-icon icon="home" size="xl"></my-icon>
            </div>
          </div>
        </div>

        <!-- Icons - Different Colors -->
        <div class="component-demo">
          <h4><my-icon icon="palette" size="sm"></my-icon> Icons - Different Colors</h4>
          <div class="demo-content">
            <div class="variant-showcase">
              <my-icon icon="favorite" color="primary"></my-icon>
              <my-icon icon="star" color="secondary"></my-icon>
              <my-icon icon="error" color="error"></my-icon>
              <my-icon icon="check" color="success"></my-icon>
              <my-icon icon="warning" color="warning"></my-icon>
              <my-icon icon="info" color="info"></my-icon>
            </div>
          </div>
        </div>

        <!-- Material Design Variants -->
        <div class="component-demo">
          <h4><my-icon icon="style" size="sm"></my-icon> Material Design Variants</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <span class="demo-label">Filled:</span>
              <my-button variant="filled">Filled</my-button>
              <my-button variant="filled" disabled>Disabled</my-button>
              <my-button variant="filled" loading>Loading</my-button>
            </div>
            <div class="demo-row">
              <span class="demo-label">Outlined:</span>
              <my-button variant="outlined">Outlined</my-button>
              <my-button variant="outlined" disabled>Disabled</my-button>
            </div>
            <div class="demo-row">
              <span class="demo-label">Text:</span>
              <my-button variant="text">Text</my-button>
              <my-button variant="text" disabled>Disabled</my-button>
            </div>
          </div>
        </div>

        <!-- Legacy Variants (Still Supported) -->
        <div class="component-demo">
          <h4><my-icon icon="history" size="sm"></my-icon> Legacy Variants (Still Supported)</h4>
          <div class="demo-content">
            <div class="variant-showcase">
              <my-button variant="primary">Primary</my-button>
              <my-button variant="secondary">Secondary</my-button>
              <my-button variant="ghost">Ghost</my-button>
              <my-button variant="danger">Danger</my-button>
            </div>
          </div>
        </div>

        <!-- Button States -->
        <div class="component-demo">
          <h4><my-icon icon="toggle_on" size="sm"></my-icon> Button States</h4>
          <div class="demo-content">
            <div class="state-showcase">
              <div class="state-demo">
                <my-button size="sm">Normal</my-button>
                <span class="state-label">Normal</span>
              </div>
              <div class="state-demo">
                <my-button size="sm" disabled>Disabled</my-button>
                <span class="state-label">Disabled</span>
              </div>
              <div class="state-demo">
                <my-button size="sm" loading>Loading</my-button>
                <span class="state-label">Loading</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Button Sizes -->
        <div class="component-demo">
          <h4><my-icon icon="format_size" size="sm"></my-icon> Button Sizes</h4>
          <div class="demo-content">
            <div class="size-showcase">
              <my-button size="xs">XS</my-button>
              <my-button size="sm">Small</my-button>
              <my-button size="md">Medium</my-button>
              <my-button size="lg">Large</my-button>
              <my-button size="xl">XL</my-button>
            </div>
          </div>
        </div>
      </div>

      <div class="showcase-flex">
        <!-- Density Variants -->
        <div class="component-demo" style="flex: 1; min-width: 300px;">
          <h4><my-icon icon="view_compact" size="sm"></my-icon> Density Variants</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <span class="demo-label">Default:</span>
              <my-button size="sm" density="default">Default</my-button>
              <my-button size="md" density="default">Default</my-button>
              <my-button size="lg" density="default">Default</my-button>
            </div>
            <div class="demo-row">
              <span class="demo-label">Compact:</span>
              <my-button size="sm" density="compact">Compact</my-button>
              <my-button size="md" density="compact">Compact</my-button>
              <my-button size="lg" density="compact">Compact</my-button>
            </div>
          </div>
        </div>

        <!-- Ripple Effect Demo -->
        <div class="component-demo" style="flex: 1; min-width: 300px;">
          <h4><my-icon icon="radio_button_unchecked" size="sm"></my-icon> Ripple Effect Demo (Click to see ripple!)</h4>
          <div class="demo-content demo-vertical">
            <div class="interactive-demo">
              <my-button variant="filled" size="lg">Large Ripple</my-button>
              <p style="margin: 0.5rem 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">Click me!</p>
            </div>
            <div class="demo-row">
              <my-button variant="outlined">Outlined Ripple</my-button>
              <my-button variant="text">Text Ripple</my-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Components Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="input" class="section-icon"></my-icon>
        Form Components
      </h2>
      
      <div class="showcase-grid">
        <!-- Text Inputs -->
        <div class="component-demo">
          <h4><my-icon icon="text_fields" size="sm"></my-icon> Text Inputs</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="First Name" name="firstName" placeholder="Enter your first name" required></my-input>
              <br><br>
              <my-input label="Password" name="password" type="password" placeholder="Enter password" required></my-input>
            </div>
          </div>
        </div>

        <!-- Email & URL -->
        <div class="component-demo">
          <h4><my-icon icon="email" size="sm"></my-icon> Email & URL</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Email Address" name="email" type="email" placeholder="Email Address" required></my-input>
              <br><br>
              <my-input label="Website" name="website" type="url" placeholder="https://example.com"></my-input>
            </div>
          </div>
        </div>

        <!-- Numbers & Dates -->
        <div class="component-demo">
          <h4><my-icon icon="event" size="sm"></my-icon> Numbers & Dates</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Age" name="age" type="number" placeholder="Enter your age"></my-input>
              <br><br>
              <my-input label="Birth Date" name="birthDate" type="date"></my-input>
            </div>
          </div>
        </div>

        <!-- Textarea & Select -->
        <div class="component-demo">
          <h4><my-icon icon="notes" size="sm"></my-icon> Textarea & Select</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Comments" name="comments" type="textarea" placeholder="Enter your comments"></my-input>
              <br><br>
              <my-input label="Country" name="country" type="select"></my-input>
            </div>
          </div>
        </div>

        <!-- Label Positions -->
        <div class="component-demo">
          <h4><my-icon icon="label" size="sm"></my-icon> Label Positions</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Label Top" name="labelTop" label-position="top" placeholder="Label Top"></my-input>
              <br><br>
              <my-input label="Label Left" name="labelLeft" label-position="left" placeholder="Label Left"></my-input>
            </div>
          </div>
        </div>

        <!-- With Slots -->
        <div class="component-demo">
          <h4><my-icon icon="extension" size="sm"></my-icon> With Slots</h4>
          <div class="demo-content demo-vertical">
            <div class="form-demo">
              <my-input label="Price" name="price" type="number" placeholder="0.00">
                <span slot="left">$</span>
              </my-input>
              <br><br>
              <my-input label="Search" name="search" placeholder="Search...">
                <my-icon icon="search" slot="right"></my-icon>
              </my-input>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Boolean Inputs Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="check_box" class="section-icon"></my-icon>
        Boolean Inputs
      </h2>
      
      <div class="showcase-grid">
        <!-- Toggles -->
        <div class="component-demo">
          <h4><my-icon icon="toggle_on" size="sm"></my-icon> Toggles</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <my-toggle label="Enable notifications"></my-toggle>
            </div>
            <div class="demo-row">
              <my-toggle label="Dark mode" checked></my-toggle>
            </div>
            <div class="demo-row">
              <my-toggle label="Disabled toggle" disabled></my-toggle>
            </div>
          </div>
        </div>

        <!-- Checkboxes -->
        <div class="component-demo">
          <h4><my-icon icon="check_box" size="sm"></my-icon> Checkboxes</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <my-checkbox label="Accept terms" checked></my-checkbox>
            </div>
            <div class="demo-row">
              <my-checkbox label="Subscribe to newsletter" indeterminate></my-checkbox>
            </div>
            <div class="demo-row">
              <my-checkbox label="Disabled checkbox" disabled></my-checkbox>
            </div>
          </div>
        </div>

        <!-- Radio Groups -->
        <div class="component-demo">
          <h4><my-icon icon="radio_button_checked" size="sm"></my-icon> Radio Groups</h4>
          <div class="demo-content demo-vertical">
            <my-radio-group name="gender" value="female">
              <my-radio value="male" label="Male"></my-radio>
              <my-radio value="female" label="Female"></my-radio>
              <my-radio value="other" label="Other"></my-radio>
            </my-radio-group>
          </div>
        </div>

        <!-- Horizontal Radio Group -->
        <div class="component-demo">
          <h4><my-icon icon="radio_button_checked" size="sm"></my-icon> Horizontal Radio Group</h4>
          <div class="demo-content">
            <my-radio-group name="size" value="medium" style="display: flex; gap: 1rem;">
              <my-radio value="small" label="S"></my-radio>
              <my-radio value="medium" label="M"></my-radio>
              <my-radio value="large" label="L"></my-radio>
            </my-radio-group>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Components Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="touch_app" class="section-icon"></my-icon>
        Interactive Components
      </h2>
      
      <div class="showcase-grid">
        <!-- Buttons with Icons -->
        <div class="component-demo">
          <h4><my-icon icon="smart_button" size="sm"></my-icon> Buttons with Icons</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <my-button variant="filled">
                <my-icon icon="home" slot="left"></my-icon>
                Home
              </my-button>
              <my-button variant="outlined">
                Settings
                <my-icon icon="settings" slot="right"></my-icon>
              </my-button>
            </div>
            <div class="demo-row">
              <my-button variant="text">
                <my-icon icon="favorite" slot="left"></my-icon>
                Like
                <my-icon icon="thumb_up" slot="right"></my-icon>
              </my-button>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div class="component-demo">
          <h4><my-icon icon="mouse" size="sm"></my-icon> Interactive Demo</h4>
          <div class="demo-content">
            <div class="interactive-demo">
              <p style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface-variant);">
                Click, hover, and interact with these components!
              </p>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                <my-button variant="filled">Hover Me</my-button>
                <my-toggle label="Toggle me"></my-toggle>
                <my-checkbox label="Check me"></my-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Visualization Section -->
    <section class="showcase-section">
      <h2 class="showcase-title">
        <my-icon icon="bar_chart" class="section-icon"></my-icon>
        Data Visualization
      </h2>
      
      <div class="showcase-grid">
        <!-- Progress Bars - Basic -->
        <div class="component-demo">
          <h4><my-icon icon="linear_scale" size="sm"></my-icon> Progress Bars - Basic</h4>
          <div class="demo-content demo-vertical">
            <my-progress value="25" label="25%"></my-progress>
            <my-progress value="50" variant="secondary" label="50%"></my-progress>
            <my-progress value="75" variant="success" label="75%"></my-progress>
            <my-progress value="90" variant="error" label="90%"></my-progress>
          </div>
        </div>

        <!-- Progress Bars - Special Variants -->
        <div class="component-demo">
          <h4><my-icon icon="timeline" size="sm"></my-icon> Progress Bars - Special Variants</h4>
          <div class="demo-content demo-vertical">
            <my-progress value="60" variant="striped" label="Striped 60%"></my-progress>
            <my-progress value="40" variant="animated" label="Animated 40%"></my-progress>
            <my-progress variant="indeterminate" label="Loading..."></my-progress>
          </div>
        </div>

        <!-- Progress Bars - Sizes -->
        <div class="component-demo">
          <h4><my-icon icon="height" size="sm"></my-icon> Progress Bars - Sizes</h4>
          <div class="demo-content demo-vertical">
            <div class="demo-row">
              <span class="demo-label">Thin:</span>
              <my-progress value="30" size="thin"></my-progress>
            </div>
            <div class="demo-row">
              <span class="demo-label">Normal:</span>
              <my-progress value="60" size="normal"></my-progress>
            </div>
            <div class="demo-row">
              <span class="demo-label">Thick:</span>
              <my-progress value="90" size="thick"></my-progress>
            </div>
          </div>
        </div>

        <!-- Circular Progress -->
        <div class="component-demo">
          <h4><my-icon icon="donut_small" size="sm"></my-icon> Circular Progress</h4>
          <div class="data-viz-demo">
            <my-progress value="75" variant="circular" size="large" label="75%"></my-progress>
            <p style="margin: 0; color: var(--_global-color-on-surface-variant);">Circular Progress</p>
          </div>
        </div>

        <!-- Gauges - Basic -->
        <div class="component-demo">
          <h4><my-icon icon="speed" size="sm"></my-icon> Gauges - Basic</h4>
          <div class="demo-content">
            <div class="responsive-grid">
              <div class="data-viz-demo">
                <my-gauge value="65" min="0" max="100" label="CPU"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">65% CPU</p>
              </div>
              <div class="data-viz-demo">
                <my-gauge value="45" min="0" max="100" label="MEMORY" variant="secondary"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">45% Memory</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gauge with Thresholds -->
        <div class="component-demo">
          <h4><my-icon icon="warning" size="sm"></my-icon> Gauge with Thresholds</h4>
          <div class="data-viz-demo">
            <my-gauge value="85" min="0" max="100" label="SYSTEM LOAD" variant="warning" 
                     low-threshold="30" high-threshold="80"></my-gauge>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-warning);">85% - Warning Level</p>
          </div>
        </div>

        <!-- Gauge Variants -->
        <div class="component-demo">
          <h4><my-icon icon="dashboard" size="sm"></my-icon> Gauge Variants</h4>
          <div class="demo-content">
            <div class="responsive-grid">
              <div class="data-viz-demo" style="min-height: 150px;">
                <my-gauge value="30" min="0" max="100" label="SUCCESS" variant="success"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-success);">30 Success</p>
              </div>
              <div class="data-viz-demo" style="min-height: 150px;">
                <my-gauge value="75" min="0" max="100" label="WARNING" variant="warning"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-warning);">75 Warning</p>
              </div>
              <div class="data-viz-demo" style="min-height: 150px;">
                <my-gauge value="90" min="0" max="100" label="ERROR" variant="error"></my-gauge>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-error);">90 Error</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div class="component-demo">
          <h4><my-icon icon="tune" size="sm"></my-icon> Interactive Demo</h4>
          <div class="demo-content demo-vertical">
            <div class="interactive-demo">
              <p style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface-variant);">Adjust value: 75</p>
              <my-input type="range" min="0" max="100" value="75" 
                       style="width: 100%; margin-bottom: 1rem;"></my-input>
              <my-gauge value="75" min="0" max="100" label="INTERACTIVE" variant="primary"></my-gauge>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-primary);">75.0% Interactive</p>
            </div>
          </div>
        </div>

        <!-- Sparklines - Trend Visualization -->
        <div class="component-demo">
          <h4><my-icon icon="trending_up" size="sm"></my-icon> Sparklines - Trend Visualization</h4>
          <div class="demo-content demo-vertical">
            <div class="data-viz-demo" style="min-height: 120px; align-items: flex-start; text-align: left;">
              <div style="margin-bottom: 1rem;">
                <strong style="color: var(--_global-color-on-surface); font-size: 1.1rem;">Revenue Trend</strong>
                <my-sparkline data="[10,12,8,15,18,22,19,25,28,24,30]" color="var(--_global-color-success)"></my-sparkline>
              </div>
              <div style="margin-bottom: 1rem;">
                <strong style="color: var(--_global-color-on-surface); font-size: 1.1rem;">User Activity</strong>
                <my-sparkline data="[5,8,12,9,15,11,18,14,20,16,22]" color="var(--_global-color-primary)"></my-sparkline>
              </div>
              <div>
                <strong style="color: var(--_global-color-on-surface); font-size: 1.1rem;">System Load</strong>
                <my-sparkline data="[2,4,3,6,8,7,9,11,8,12,10]" color="var(--_global-color-warning)"></my-sparkline>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  \`;
  return container;
}`,...(s=(t=n.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};var l,r,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 2rem;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  \`;
  container.innerHTML = \`
    <style>
      .states-section {
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .states-title {
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 2px solid var(--_global-color-primary);
        padding-bottom: 0.5rem;
      }
      
      .states-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
      }
      
      .state-demo {
        padding: 1.5rem;
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-md);
        border: 1px solid var(--_global-color-outline-variant);
        text-align: center;
      }
      
      .state-label {
        display: block;
        font-size: var(--_global-font-size-label-medium);
        color: var(--_global-color-on-surface-variant);
        margin-top: 1rem;
        font-weight: var(--_global-font-weight-medium);
      }
    </style>
    
    <h1 style="text-align: center; margin-bottom: 2rem; color: var(--_global-color-primary);">Component States</h1>
    
    <!-- Button States -->
    <section class="states-section">
      <h2 class="states-title">Button States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-button>Normal</my-button>
          <span class="state-label">Normal</span>
        </div>
        <div class="state-demo">
          <my-button disabled>Disabled</my-button>
          <span class="state-label">Disabled</span>
        </div>
        <div class="state-demo">
          <my-button loading>Loading</my-button>
          <span class="state-label">Loading</span>
        </div>
        <div class="state-demo">
          <my-button variant="outlined">Outlined</my-button>
          <span class="state-label">Outlined</span>
        </div>
        <div class="state-demo">
          <my-button variant="text">Text</my-button>
          <span class="state-label">Text</span>
        </div>
        <div class="state-demo">
          <my-button variant="error">Error</my-button>
          <span class="state-label">Error</span>
        </div>
      </div>
    </section>
    
    <!-- Input States -->
    <section class="states-section">
      <h2 class="states-title">Input States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-input label="Normal Input" placeholder="Enter text"></my-input>
          <span class="state-label">Normal</span>
        </div>
        <div class="state-demo">
          <my-input label="Disabled Input" disabled placeholder="Disabled"></my-input>
          <span class="state-label">Disabled</span>
        </div>
        <div class="state-demo">
          <my-input label="Required Input" required placeholder="Required"></my-input>
          <span class="state-label">Required</span>
        </div>
        <div class="state-demo">
          <my-input label="Error State" error placeholder="Error"></my-input>
          <span class="state-label">Error</span>
        </div>
      </div>
    </section>
    
    <!-- Toggle States -->
    <section class="states-section">
      <h2 class="states-title">Toggle States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-toggle label="Unchecked"></my-toggle>
          <span class="state-label">Unchecked</span>
        </div>
        <div class="state-demo">
          <my-toggle label="Checked" checked></my-toggle>
          <span class="state-label">Checked</span>
        </div>
        <div class="state-demo">
          <my-toggle label="Disabled" disabled></my-toggle>
          <span class="state-label">Disabled</span>
        </div>
        <div class="state-demo">
          <my-toggle label="Error" error></my-toggle>
          <span class="state-label">Error</span>
        </div>
      </div>
    </section>
    
    <!-- Checkbox States -->
    <section class="states-section">
      <h2 class="states-title">Checkbox States</h2>
      <div class="states-grid">
        <div class="state-demo">
          <my-checkbox label="Unchecked"></my-checkbox>
          <span class="state-label">Unchecked</span>
        </div>
        <div class="state-demo">
          <my-checkbox label="Checked" checked></my-checkbox>
          <span class="state-label">Checked</span>
        </div>
        <div class="state-demo">
          <my-checkbox label="Indeterminate" indeterminate></my-checkbox>
          <span class="state-label">Indeterminate</span>
        </div>
        <div class="state-demo">
          <my-checkbox label="Disabled" disabled></my-checkbox>
          <span class="state-label">Disabled</span>
        </div>
      </div>
    </section>
  \`;
  return container;
}`,...(m=(r=o.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};var c,d,v;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    padding: 2rem;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  \`;
  container.innerHTML = \`
    <style>
      .responsive-section {
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-lg);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .responsive-title {
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1.5rem 0;
        border-bottom: 2px solid var(--_global-color-primary);
        padding-bottom: 0.5rem;
      }
      
      .responsive-demo {
        border: 2px dashed var(--_global-color-outline-variant);
        padding: 2rem;
        border-radius: var(--_global-border-radius-md);
        background: var(--_global-color-surface);
        resize: horizontal;
        overflow: hidden;
        min-width: 280px;
        max-width: 100%;
      }
      
      .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
      
      .responsive-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      
      .resize-handle {
        font-size: 0.875rem;
        color: var(--_global-color-on-surface-variant);
        text-align: center;
        margin-top: 1rem;
        font-style: italic;
      }
      
      @media (max-width: 768px) {
        .responsive-demo {
          resize: none;
        }
      }
    </style>
    
    <h1 style="text-align: center; margin-bottom: 2rem; color: var(--_global-color-primary);">Responsive Design</h1>
    
    <!-- Button Responsiveness -->
    <section class="responsive-section">
      <h2 class="responsive-title">Button Responsiveness</h2>
      <div class="responsive-demo">
        <div class="responsive-flex">
          <my-button>Home</my-button>
          <my-button variant="outlined">About</my-button>
          <my-button variant="text">Contact</my-button>
          <my-button variant="filled">
            <my-icon icon="shopping_cart" slot="left"></my-icon>
            Add to Cart
          </my-button>
        </div>
        <div class="resize-handle">← Drag to resize →</div>
      </div>
    </section>
    
    <!-- Form Responsiveness -->
    <section class="responsive-section">
      <h2 class="responsive-title">Form Responsiveness</h2>
      <div class="responsive-demo">
        <div class="responsive-grid">
          <my-input label="First Name" placeholder="First Name"></my-input>
          <my-input label="Last Name" placeholder="Last Name"></my-input>
          <my-input label="Email" type="email" placeholder="Email Address"></my-input>
          <my-input label="Phone" type="tel" placeholder="Phone Number"></my-input>
        </div>
        <div style="margin-top: 1rem;">
          <my-button variant="filled" style="width: 100%;">Submit Form</my-button>
        </div>
        <div class="resize-handle">← Drag to resize →</div>
      </div>
    </section>
    
    <!-- Data Visualization Responsiveness -->
    <section class="responsive-section">
      <h2 class="responsive-title">Data Visualization Responsiveness</h2>
      <div class="responsive-demo">
        <div class="responsive-grid">
          <div style="text-align: center;">
            <my-gauge value="65" min="0" max="100" label="CPU"></my-gauge>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">65% CPU Usage</p>
          </div>
          <div style="text-align: center;">
            <my-gauge value="45" min="0" max="100" label="MEMORY" variant="secondary"></my-gauge>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; color: var(--_global-color-on-surface-variant);">45% Memory Usage</p>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <my-progress value="75" label="Overall Performance: 75%"></my-progress>
        </div>
        <div class="resize-handle">← Drag to resize →</div>
      </div>
    </section>
  \`;
  return container;
}`,...(v=(d=a.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};const R=["AllComponentsEnhanced","ComponentStates","ResponsiveDesign"];export{n as AllComponentsEnhanced,o as ComponentStates,a as ResponsiveDesign,R as __namedExportsOrder,E as default};
