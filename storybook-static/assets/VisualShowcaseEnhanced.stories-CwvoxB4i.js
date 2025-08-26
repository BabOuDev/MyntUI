import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const _={title:"Overview/Visual Enhancement Showcase",parameters:{docs:{description:{component:"Enhanced visual showcase demonstrating the visual consistency, Material Design 3 compliance, and real-world component usage patterns of the MyntUI library with premium animations and interactions."}},layout:"fullscreen"}},n=()=>{const e=document.createElement("div");return e.style.cssText=`
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
    position: relative;
    overflow: hidden;
  `,e.innerHTML=`
    <style>
      .floating-particles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }
      
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--_global-color-primary);
        border-radius: 50%;
        opacity: 0.3;
        animation: float 20s infinite linear;
      }
      
      @keyframes float {
        0% { transform: translateY(100vh) translateX(-50px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.3; }
        90% { opacity: 0.3; }
        100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; }
      }
      
      .showcase-header {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 4rem 2rem 3rem;
        background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-secondary) 50%, var(--_global-color-tertiary) 100%);
        color: var(--_global-color-on-primary);
        margin-bottom: 3rem;
        box-shadow: var(--_global-elevation-4);
      }
      
      .showcase-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--_global-font-weight-light);
        margin: 0 0 1rem 0;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        animation: titleGlow 3s ease-in-out infinite alternate;
      }
      
      @keyframes titleGlow {
        from { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
        to { text-shadow: 0 2px 20px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3); }
      }
      
      .showcase-subtitle {
        font-size: clamp(1rem, 2vw, 1.25rem);
        opacity: 0.9;
        margin: 0 0 2rem 0;
      }
      
      .premium-badge {
        background: rgba(255, 255, 255, 0.2);
        color: var(--_global-color-on-primary);
        padding: 0.75rem 1.5rem;
        border-radius: var(--_global-border-radius-full);
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        animation: premiumPulse 2s ease-in-out infinite;
      }
      
      @keyframes premiumPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
        50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); }
      }
      
      .showcase-content {
        position: relative;
        z-index: 1;
        max-width: 1600px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
      }
      
      .visual-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }
      
      .visual-demo {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-xl);
        padding: 2rem;
        box-shadow: var(--_global-elevation-3);
        border: 1px solid var(--_global-color-outline-variant);
        position: relative;
        overflow: hidden;
        transition: var(--_global-component-transition);
      }
      
      .visual-demo:hover {
        transform: translateY(-4px);
        box-shadow: var(--_global-elevation-4);
        border-color: var(--_global-color-primary);
      }
      
      .visual-demo::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--_global-color-primary), transparent);
        animation: shimmer 3s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% { left: -100%; }
        50% { left: -100%; }
        100% { left: 100%; }
      }
      
      .demo-title {
        font-size: 1.25rem;
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .demo-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .input-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
      
      .button-showcase {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      
      .component-interaction-demo {
        background: linear-gradient(135deg, var(--_global-color-primary-container) 0%, var(--_global-color-secondary-container) 100%);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin: 2rem 0;
        text-align: center;
      }
      
      .interaction-title {
        font-size: 1.5rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-primary-container);
        margin: 0 0 2rem 0;
      }
      
      .interaction-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }
      
      .interaction-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--_global-border-radius-md);
        padding: 1.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: var(--_global-component-transition);
      }
      
      .interaction-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
      
      .data-showcase {
        margin: 3rem 0;
      }
      
      .stats-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin: 2rem 0;
      }
      
      .loading-demo {
        text-align: center;
        padding: 2rem;
        background: var(--_global-color-surface-container-low);
        border-radius: var(--_global-border-radius-lg);
      }
      
      /* Enhanced animations for visual appeal */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .visual-demo {
        animation: fadeInUp 0.6s ease-out;
        animation-fill-mode: both;
      }
      
      .visual-demo:nth-child(1) { animation-delay: 0.1s; }
      .visual-demo:nth-child(2) { animation-delay: 0.2s; }
      .visual-demo:nth-child(3) { animation-delay: 0.3s; }
      .visual-demo:nth-child(4) { animation-delay: 0.4s; }
    </style>
    
    <!-- Floating particles background -->
    <div class="floating-particles">
      <div class="particle" style="left: 10%; animation-delay: 0s;"></div>
      <div class="particle" style="left: 20%; animation-delay: 2s;"></div>
      <div class="particle" style="left: 30%; animation-delay: 4s;"></div>
      <div class="particle" style="left: 40%; animation-delay: 6s;"></div>
      <div class="particle" style="left: 50%; animation-delay: 8s;"></div>
      <div class="particle" style="left: 60%; animation-delay: 10s;"></div>
      <div class="particle" style="left: 70%; animation-delay: 12s;"></div>
      <div class="particle" style="left: 80%; animation-delay: 14s;"></div>
      <div class="particle" style="left: 90%; animation-delay: 16s;"></div>
    </div>
    
    <div class="showcase-header">
      <h1 class="showcase-title">Premium Visual Experience</h1>
      <p class="showcase-subtitle">Enhanced Material Design 3 • Smooth Animations • Perfect Consistency</p>
      <div class="premium-badge">
        <my-icon icon="auto_awesome" size="sm"></my-icon>
        Enhanced Visual Showcase
      </div>
    </div>
    
    <div class="showcase-content">
      <!-- Form Interaction Showcase -->
      <div class="visual-grid">
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="edit" color="primary"></my-icon>
            Enhanced Form Experience
          </h3>
          <div class="demo-content">
            <div class="input-row">
              <my-input 
                type="text" 
                label="Full Name" 
                placeholder="Enter your full name"
                variant="outlined"
                leading-icon="person">
              </my-input>
              <my-input 
                type="email" 
                label="Email Address" 
                placeholder="you@example.com"
                variant="filled"
                leading-icon="mail"
                trailing-icon="verified">
              </my-input>
            </div>
            <div class="input-row">
              <my-input 
                type="tel" 
                label="Phone Number" 
                placeholder="+1 (555) 123-4567"
                leading-icon="phone">
              </my-input>
              <my-input 
                type="date" 
                label="Birth Date"
                leading-icon="cake">
              </my-input>
            </div>
            <my-input 
              type="textarea" 
              label="Message" 
              placeholder="Tell us about yourself..."
              helper-text="This will help us personalize your experience">
            </my-input>
          </div>
        </div>
        
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="touch_app" color="secondary"></my-icon>
            Interactive Elements
          </h3>
          <div class="demo-content">
            <div class="button-showcase">
              <my-button variant="filled" label="Primary Action"></my-button>
              <my-button variant="outlined" label="Secondary"></my-button>
              <my-button variant="text" label="Tertiary"></my-button>
              <my-button variant="elevated" label="Elevated"></my-button>
            </div>
            
            <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
              <my-toggle label="Dark Mode" checked></my-toggle>
              <my-checkbox label="Accept Terms" checked></my-checkbox>
            </div>
            
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <my-icon icon="star" color="warning" size="lg"></my-icon>
              <my-icon icon="favorite" color="error" size="lg"></my-icon>
              <my-icon icon="thumb_up" color="success" size="lg"></my-icon>
              <my-icon icon="share" color="info" size="lg"></my-icon>
            </div>
          </div>
        </div>
        
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="analytics" color="tertiary"></my-icon>
            Data Visualization
          </h3>
          <div class="demo-content">
            <div class="stats-row">
              <my-gauge 
                value="78" 
                min="0" 
                max="100" 
                label="Performance"
                color="success">
              </my-gauge>
              <my-gauge 
                value="65" 
                min="0" 
                max="100" 
                label="Quality"
                color="info">
              </my-gauge>
            </div>
            
            <my-progress 
              value="85" 
              label="Project Progress"
              variant="striped">
            </my-progress>
            
            <my-sparkline 
              data="[12, 19, 3, 17, 6, 3, 7, 14, 18, 12, 5, 9, 15, 25, 12]"
              color="primary"
              height="60">
            </my-sparkline>
          </div>
        </div>
        
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="palette" color="primary"></my-icon>
            Visual Consistency
          </h3>
          <div class="demo-content">
            <p style="color: var(--_global-color-on-surface-variant); margin-bottom: 1.5rem;">
              Material Design 3 color system with perfect consistency across all components.
            </p>
            
            <div class="button-showcase">
              <my-button variant="filled" size="sm" label="Small"></my-button>
              <my-button variant="filled" size="md" label="Medium"></my-button>
              <my-button variant="filled" size="lg" label="Large"></my-button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1rem;">
              <div style="background: var(--_global-color-primary); height: 40px; border-radius: 4px;"></div>
              <div style="background: var(--_global-color-secondary); height: 40px; border-radius: 4px;"></div>
              <div style="background: var(--_global-color-tertiary); height: 40px; border-radius: 4px;"></div>
              <div style="background: var(--_global-color-success); height: 40px; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Interactive Component Demo -->
      <div class="component-interaction-demo">
        <h2 class="interaction-title">Real-World Component Interactions</h2>
        
        <div class="interaction-grid">
          <div class="interaction-card">
            <my-icon icon="settings" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">Settings Panel</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <my-toggle label="Notifications" checked size="sm"></my-toggle>
              <my-toggle label="Auto-save" size="sm"></my-toggle>
              <my-checkbox label="Remember me" size="sm"></my-checkbox>
            </div>
          </div>
          
          <div class="interaction-card">
            <my-icon icon="account_circle" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">User Profile</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <my-input type="text" value="John Doe" size="sm" variant="outlined"></my-input>
              <my-button variant="text" label="Update Profile" size="sm"></my-button>
            </div>
          </div>
          
          <div class="interaction-card">
            <my-icon icon="assessment" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">Analytics</h3>
            <my-gauge value="92" min="0" max="100" label="Score" size="sm"></my-gauge>
          </div>
          
          <div class="interaction-card">
            <my-icon icon="notifications" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">Alerts</h3>
            <my-progress value="45" variant="primary" size="sm"></my-progress>
          </div>
        </div>
      </div>
      
      <!-- Performance Demo -->
      <div class="loading-demo">
        <h2 style="margin: 0 0 2rem 0; color: var(--_global-color-on-surface);">Smooth Performance</h2>
        <p style="color: var(--_global-color-on-surface-variant); margin-bottom: 2rem;">
          All components are optimized for 60fps animations and smooth interactions
        </p>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
          <my-button variant="filled" label="Animate" onclick="document.querySelectorAll('.visual-demo').forEach((el, i) => { el.style.animation = 'none'; setTimeout(() => el.style.animation = 'fadeInUp 0.6s ease-out', i * 100); })"></my-button>
          <my-button variant="outlined" label="Show Ripples" onclick="document.querySelectorAll('my-button').forEach(btn => btn.click())"></my-button>
        </div>
        
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
          <my-sparkline data="[5, 10, 5, 20, 8, 15, 25, 18, 12, 30, 15, 25]" color="success" width="100" height="40"></my-sparkline>
          <my-sparkline data="[15, 8, 25, 12, 30, 5, 10, 20, 15, 8, 25, 35]" color="warning" width="100" height="40"></my-sparkline>
          <my-sparkline data="[25, 15, 35, 20, 10, 25, 15, 30, 8, 20, 35, 25]" color="error" width="100" height="40"></my-sparkline>
        </div>
      </div>
    </div>
  `,e};n.parameters={docs:{description:{story:"Premium visual showcase demonstrating enhanced animations, interactions, and the polished user experience of the MyntUI component library. Features floating particles, shimmer effects, smooth transitions, and real-world component usage patterns."}}};var a,i,o;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
    position: relative;
    overflow: hidden;
  \`;
  container.innerHTML = \`
    <style>
      .floating-particles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }
      
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--_global-color-primary);
        border-radius: 50%;
        opacity: 0.3;
        animation: float 20s infinite linear;
      }
      
      @keyframes float {
        0% { transform: translateY(100vh) translateX(-50px) rotate(0deg); opacity: 0; }
        10% { opacity: 0.3; }
        90% { opacity: 0.3; }
        100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; }
      }
      
      .showcase-header {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 4rem 2rem 3rem;
        background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-secondary) 50%, var(--_global-color-tertiary) 100%);
        color: var(--_global-color-on-primary);
        margin-bottom: 3rem;
        box-shadow: var(--_global-elevation-4);
      }
      
      .showcase-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--_global-font-weight-light);
        margin: 0 0 1rem 0;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        animation: titleGlow 3s ease-in-out infinite alternate;
      }
      
      @keyframes titleGlow {
        from { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); }
        to { text-shadow: 0 2px 20px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3); }
      }
      
      .showcase-subtitle {
        font-size: clamp(1rem, 2vw, 1.25rem);
        opacity: 0.9;
        margin: 0 0 2rem 0;
      }
      
      .premium-badge {
        background: rgba(255, 255, 255, 0.2);
        color: var(--_global-color-on-primary);
        padding: 0.75rem 1.5rem;
        border-radius: var(--_global-border-radius-full);
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        animation: premiumPulse 2s ease-in-out infinite;
      }
      
      @keyframes premiumPulse {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
        50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); }
      }
      
      .showcase-content {
        position: relative;
        z-index: 1;
        max-width: 1600px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
      }
      
      .visual-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }
      
      .visual-demo {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-xl);
        padding: 2rem;
        box-shadow: var(--_global-elevation-3);
        border: 1px solid var(--_global-color-outline-variant);
        position: relative;
        overflow: hidden;
        transition: var(--_global-component-transition);
      }
      
      .visual-demo:hover {
        transform: translateY(-4px);
        box-shadow: var(--_global-elevation-4);
        border-color: var(--_global-color-primary);
      }
      
      .visual-demo::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--_global-color-primary), transparent);
        animation: shimmer 3s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% { left: -100%; }
        50% { left: -100%; }
        100% { left: 100%; }
      }
      
      .demo-title {
        font-size: 1.25rem;
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .demo-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .input-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
      
      .button-showcase {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
      }
      
      .component-interaction-demo {
        background: linear-gradient(135deg, var(--_global-color-primary-container) 0%, var(--_global-color-secondary-container) 100%);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin: 2rem 0;
        text-align: center;
      }
      
      .interaction-title {
        font-size: 1.5rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-primary-container);
        margin: 0 0 2rem 0;
      }
      
      .interaction-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }
      
      .interaction-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--_global-border-radius-md);
        padding: 1.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: var(--_global-component-transition);
      }
      
      .interaction-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
      
      .data-showcase {
        margin: 3rem 0;
      }
      
      .stats-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        margin: 2rem 0;
      }
      
      .loading-demo {
        text-align: center;
        padding: 2rem;
        background: var(--_global-color-surface-container-low);
        border-radius: var(--_global-border-radius-lg);
      }
      
      /* Enhanced animations for visual appeal */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .visual-demo {
        animation: fadeInUp 0.6s ease-out;
        animation-fill-mode: both;
      }
      
      .visual-demo:nth-child(1) { animation-delay: 0.1s; }
      .visual-demo:nth-child(2) { animation-delay: 0.2s; }
      .visual-demo:nth-child(3) { animation-delay: 0.3s; }
      .visual-demo:nth-child(4) { animation-delay: 0.4s; }
    </style>
    
    <!-- Floating particles background -->
    <div class="floating-particles">
      <div class="particle" style="left: 10%; animation-delay: 0s;"></div>
      <div class="particle" style="left: 20%; animation-delay: 2s;"></div>
      <div class="particle" style="left: 30%; animation-delay: 4s;"></div>
      <div class="particle" style="left: 40%; animation-delay: 6s;"></div>
      <div class="particle" style="left: 50%; animation-delay: 8s;"></div>
      <div class="particle" style="left: 60%; animation-delay: 10s;"></div>
      <div class="particle" style="left: 70%; animation-delay: 12s;"></div>
      <div class="particle" style="left: 80%; animation-delay: 14s;"></div>
      <div class="particle" style="left: 90%; animation-delay: 16s;"></div>
    </div>
    
    <div class="showcase-header">
      <h1 class="showcase-title">Premium Visual Experience</h1>
      <p class="showcase-subtitle">Enhanced Material Design 3 • Smooth Animations • Perfect Consistency</p>
      <div class="premium-badge">
        <my-icon icon="auto_awesome" size="sm"></my-icon>
        Enhanced Visual Showcase
      </div>
    </div>
    
    <div class="showcase-content">
      <!-- Form Interaction Showcase -->
      <div class="visual-grid">
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="edit" color="primary"></my-icon>
            Enhanced Form Experience
          </h3>
          <div class="demo-content">
            <div class="input-row">
              <my-input 
                type="text" 
                label="Full Name" 
                placeholder="Enter your full name"
                variant="outlined"
                leading-icon="person">
              </my-input>
              <my-input 
                type="email" 
                label="Email Address" 
                placeholder="you@example.com"
                variant="filled"
                leading-icon="mail"
                trailing-icon="verified">
              </my-input>
            </div>
            <div class="input-row">
              <my-input 
                type="tel" 
                label="Phone Number" 
                placeholder="+1 (555) 123-4567"
                leading-icon="phone">
              </my-input>
              <my-input 
                type="date" 
                label="Birth Date"
                leading-icon="cake">
              </my-input>
            </div>
            <my-input 
              type="textarea" 
              label="Message" 
              placeholder="Tell us about yourself..."
              helper-text="This will help us personalize your experience">
            </my-input>
          </div>
        </div>
        
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="touch_app" color="secondary"></my-icon>
            Interactive Elements
          </h3>
          <div class="demo-content">
            <div class="button-showcase">
              <my-button variant="filled" label="Primary Action"></my-button>
              <my-button variant="outlined" label="Secondary"></my-button>
              <my-button variant="text" label="Tertiary"></my-button>
              <my-button variant="elevated" label="Elevated"></my-button>
            </div>
            
            <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
              <my-toggle label="Dark Mode" checked></my-toggle>
              <my-checkbox label="Accept Terms" checked></my-checkbox>
            </div>
            
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <my-icon icon="star" color="warning" size="lg"></my-icon>
              <my-icon icon="favorite" color="error" size="lg"></my-icon>
              <my-icon icon="thumb_up" color="success" size="lg"></my-icon>
              <my-icon icon="share" color="info" size="lg"></my-icon>
            </div>
          </div>
        </div>
        
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="analytics" color="tertiary"></my-icon>
            Data Visualization
          </h3>
          <div class="demo-content">
            <div class="stats-row">
              <my-gauge 
                value="78" 
                min="0" 
                max="100" 
                label="Performance"
                color="success">
              </my-gauge>
              <my-gauge 
                value="65" 
                min="0" 
                max="100" 
                label="Quality"
                color="info">
              </my-gauge>
            </div>
            
            <my-progress 
              value="85" 
              label="Project Progress"
              variant="striped">
            </my-progress>
            
            <my-sparkline 
              data="[12, 19, 3, 17, 6, 3, 7, 14, 18, 12, 5, 9, 15, 25, 12]"
              color="primary"
              height="60">
            </my-sparkline>
          </div>
        </div>
        
        <div class="visual-demo">
          <h3 class="demo-title">
            <my-icon icon="palette" color="primary"></my-icon>
            Visual Consistency
          </h3>
          <div class="demo-content">
            <p style="color: var(--_global-color-on-surface-variant); margin-bottom: 1.5rem;">
              Material Design 3 color system with perfect consistency across all components.
            </p>
            
            <div class="button-showcase">
              <my-button variant="filled" size="sm" label="Small"></my-button>
              <my-button variant="filled" size="md" label="Medium"></my-button>
              <my-button variant="filled" size="lg" label="Large"></my-button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1rem;">
              <div style="background: var(--_global-color-primary); height: 40px; border-radius: 4px;"></div>
              <div style="background: var(--_global-color-secondary); height: 40px; border-radius: 4px;"></div>
              <div style="background: var(--_global-color-tertiary); height: 40px; border-radius: 4px;"></div>
              <div style="background: var(--_global-color-success); height: 40px; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Interactive Component Demo -->
      <div class="component-interaction-demo">
        <h2 class="interaction-title">Real-World Component Interactions</h2>
        
        <div class="interaction-grid">
          <div class="interaction-card">
            <my-icon icon="settings" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">Settings Panel</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <my-toggle label="Notifications" checked size="sm"></my-toggle>
              <my-toggle label="Auto-save" size="sm"></my-toggle>
              <my-checkbox label="Remember me" size="sm"></my-checkbox>
            </div>
          </div>
          
          <div class="interaction-card">
            <my-icon icon="account_circle" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">User Profile</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <my-input type="text" value="John Doe" size="sm" variant="outlined"></my-input>
              <my-button variant="text" label="Update Profile" size="sm"></my-button>
            </div>
          </div>
          
          <div class="interaction-card">
            <my-icon icon="assessment" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">Analytics</h3>
            <my-gauge value="92" min="0" max="100" label="Score" size="sm"></my-gauge>
          </div>
          
          <div class="interaction-card">
            <my-icon icon="notifications" size="lg" color="on-primary-container" style="margin-bottom: 1rem;"></my-icon>
            <h3 style="color: var(--_global-color-on-primary-container); margin: 0 0 1rem 0; font-size: 1rem;">Alerts</h3>
            <my-progress value="45" variant="primary" size="sm"></my-progress>
          </div>
        </div>
      </div>
      
      <!-- Performance Demo -->
      <div class="loading-demo">
        <h2 style="margin: 0 0 2rem 0; color: var(--_global-color-on-surface);">Smooth Performance</h2>
        <p style="color: var(--_global-color-on-surface-variant); margin-bottom: 2rem;">
          All components are optimized for 60fps animations and smooth interactions
        </p>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
          <my-button variant="filled" label="Animate" onclick="document.querySelectorAll('.visual-demo').forEach((el, i) => { el.style.animation = 'none'; setTimeout(() => el.style.animation = 'fadeInUp 0.6s ease-out', i * 100); })"></my-button>
          <my-button variant="outlined" label="Show Ripples" onclick="document.querySelectorAll('my-button').forEach(btn => btn.click())"></my-button>
        </div>
        
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
          <my-sparkline data="[5, 10, 5, 20, 8, 15, 25, 18, 12, 30, 15, 25]" color="success" width="100" height="40"></my-sparkline>
          <my-sparkline data="[15, 8, 25, 12, 30, 5, 10, 20, 15, 8, 25, 35]" color="warning" width="100" height="40"></my-sparkline>
          <my-sparkline data="[25, 15, 35, 20, 10, 25, 15, 30, 8, 20, 35, 25]" color="error" width="100" height="40"></my-sparkline>
        </div>
      </div>
    </div>
  \`;
  return container;
}`,...(o=(i=n.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const k=["VisualEnhancementShowcase"];export{n as VisualEnhancementShowcase,k as __namedExportsOrder,_ as default};
