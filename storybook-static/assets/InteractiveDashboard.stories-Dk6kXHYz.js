import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const _={title:"Examples/Interactive Dashboard",parameters:{docs:{description:{component:"A comprehensive interactive dashboard demonstrating real-world usage of MyntUI components in a modern application interface."}},layout:"fullscreen"}},e=()=>{const n=document.createElement("div");return n.style.cssText=`
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
  `,n.innerHTML=`
    <style>
      .dashboard-header {
        background: var(--_global-color-surface);
        border-bottom: 1px solid var(--_global-color-outline-variant);
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--_global-elevation-1);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .dashboard-title {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0;
      }
      
      .dashboard-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .dashboard-content {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .stat-card {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 1.5rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
        transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-standard);
        position: relative;
        overflow: hidden;
      }
      
      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--_global-elevation-3);
      }
      
      .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--_global-color-primary), var(--_global-color-secondary));
      }
      
      .stat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      
      .stat-title {
        font-size: var(--_global-font-size-label-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface-variant);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }
      
      .stat-value {
        font-size: 2.5rem;
        font-weight: var(--_global-font-weight-bold);
        color: var(--_global-color-on-surface);
        margin: 0 0 0.5rem 0;
        line-height: 1.2;
      }
      
      .stat-change {
        font-size: var(--_global-font-size-body-small);
        font-weight: var(--_global-font-weight-medium);
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      
      .stat-change.positive {
        color: var(--_global-color-success);
      }
      
      .stat-change.negative {
        color: var(--_global-color-error);
      }
      
      .dashboard-section {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--_global-color-outline-variant);
      }
      
      .section-title {
        font-size: var(--_global-font-size-headline-small);
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .controls-row {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
      }
      
      .notification-demo {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1000;
      }
      
      .sparkline-container {
        height: 60px;
        margin-top: 1rem;
      }
      
      .interactive-gauge {
        margin: 1rem 0;
        text-align: center;
      }
      
      .gauge-controls {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      
      @media (max-width: 768px) {
        .dashboard-header {
          padding: 1rem;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        
        .dashboard-actions {
          order: -1;
        }
        
        .dashboard-content {
          padding: 1rem;
        }
        
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
        
        .form-grid {
          grid-template-columns: 1fr;
        }
        
        .controls-row {
          flex-direction: column;
          align-items: stretch;
        }
      }
    </style>
    
    <!-- Dashboard Header -->
    <header class="dashboard-header">
      <h1 class="dashboard-title">
        <my-icon icon="dashboard" size="lg" color="primary"></my-icon>
        Analytics Dashboard
      </h1>
      <div class="dashboard-actions">
        <my-button label="Refresh" variant="outlined">
          <my-icon icon="refresh" size="sm" slot="leading"></my-icon>
        </my-button>
        <my-button label="Export" variant="filled">
          <my-icon icon="download" size="sm" slot="leading"></my-icon>
        </my-button>
        <my-icon icon="settings" size="lg" interactive></my-icon>
      </div>
    </header>
    
    <div class="dashboard-content">
      <!-- Key Metrics -->
      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">Active Users</h3>
            <my-icon icon="people" color="primary"></my-icon>
          </div>
          <div class="stat-value">24,653</div>
          <div class="stat-change positive">
            <my-icon icon="trending_up" size="sm"></my-icon>
            +12.5% from last month
          </div>
          <div class="sparkline-container">
            <my-sparkline 
              data="[18500,19200,20100,19800,21500,22300,23100,23800,24200,24653]" 
              color="var(--_global-color-success)"
              style="height: 100%; width: 100%;">
            </my-sparkline>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">Revenue</h3>
            <my-icon icon="attach_money" color="success"></my-icon>
          </div>
          <div class="stat-value">$847K</div>
          <div class="stat-change positive">
            <my-icon icon="trending_up" size="sm"></my-icon>
            +8.3% from last month
          </div>
          <div class="sparkline-container">
            <my-sparkline 
              data="[720,750,780,770,800,820,835,840,845,847]" 
              color="var(--_global-color-primary)"
              style="height: 100%; width: 100%;">
            </my-sparkline>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">Conversion Rate</h3>
            <my-icon icon="trending_up" color="warning"></my-icon>
          </div>
          <div class="stat-value">3.24%</div>
          <div class="stat-change negative">
            <my-icon icon="trending_down" size="sm"></my-icon>
            -1.2% from last month
          </div>
          <div class="interactive-gauge">
            <my-gauge 
              id="conversion-gauge"
              value="32.4" 
              min="0" 
              max="100" 
              label="Conversion"
              unit="%"
              variant="warning"
              animated
              show-value
              size="sm">
            </my-gauge>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">System Performance</h3>
            <my-icon icon="speed" color="info"></my-icon>
          </div>
          <div class="stat-value">94.2%</div>
          <div class="stat-change positive">
            <my-icon icon="check_circle" size="sm"></my-icon>
            System healthy
          </div>
          <div style="margin-top: 1rem;">
            <my-progress 
              value="94.2" 
              variant="success" 
              show-value
              animated
              label="Uptime">
            </my-progress>
          </div>
        </div>
      </div>
      
      <!-- Interactive Controls Section -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <my-icon icon="tune" color="primary"></my-icon>
            Interactive Controls
          </h2>
        </div>
        
        <div class="controls-row">
          <my-toggle id="live-updates" checked>
            <span style="margin-left: 0.5rem;">Live Updates</span>
          </my-toggle>
          
          <my-checkbox id="show-details" label="Show Details" checked></my-checkbox>
          
          <my-radio-group name="view-mode" id="view-mode">
            <my-radio value="grid" label="Grid View" checked></my-radio>
            <my-radio value="list" label="List View"></my-radio>
          </my-radio-group>
          
          <my-button 
            label="Demo Notification" 
            variant="outlined"
            onclick="showDemoNotification()">
          </my-button>
          
          <my-button 
            label="Show Modal" 
            variant="filled"
            onclick="document.querySelector('#dashboard-modal').open = true">
          </my-button>
        </div>
      </section>
      
      <!-- Data Input Form -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <my-icon icon="edit" color="primary"></my-icon>
            User Management
          </h2>
          <my-button label="Add User" variant="filled">
            <my-icon icon="person_add" size="sm" slot="leading"></my-icon>
          </my-button>
        </div>
        
        <div class="form-grid">
          <my-input 
            type="text" 
            label="Full Name" 
            placeholder="Enter full name"
            required
            helper-text="First and last name">
            <my-icon icon="person" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="email" 
            label="Email Address" 
            placeholder="user@example.com"
            required
            helper-text="Primary contact email">
            <my-icon icon="email" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="tel" 
            label="Phone Number" 
            placeholder="+1 (555) 123-4567"
            helper-text="Include country code">
            <my-icon icon="phone" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="select" 
            label="Department" 
            required
            helper-text="User's primary department">
            <my-icon icon="business" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="date" 
            label="Start Date" 
            required>
            <my-icon icon="calendar_today" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="number" 
            label="Salary" 
            placeholder="75000"
            min="30000"
            max="200000"
            step="1000"
            helper-text="Annual salary in USD">
            <span slot="leading">$</span>
          </my-input>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <my-button label="Cancel" variant="text"></my-button>
          <my-button label="Save User" variant="filled"></my-button>
        </div>
      </section>
      
      <!-- Data Table Section -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <my-icon icon="table_chart" color="primary"></my-icon>
            User Directory
          </h2>
          <div style="display: flex; gap: 1rem;">
            <my-input 
              type="text" 
              placeholder="Search users..."
              style="width: 250px;">
              <my-icon icon="search" slot="leading"></my-icon>
            </my-input>
            <my-dropdown label="Filter">
              <my-icon icon="filter_list" slot="trigger"></my-icon>
            </my-dropdown>
          </div>
        </div>
        
        <my-data-table 
          id="users-table"
          selectable
          searchable
          paginated
          page-size="5"
          striped
          style="width: 100%;">
        </my-data-table>
      </section>
    </div>
    
    <!-- Modal Dialog -->
    <my-modal id="dashboard-modal">
      <h3 slot="header">System Information</h3>
      <div slot="body">
        <p>Current system status and configuration details:</p>
        
        <div style="margin: 1.5rem 0;">
          <h4 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface); font-size: var(--_global-font-size-title-small);">Performance Metrics</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: var(--_global-font-weight-medium);">CPU Usage</label>
              <my-gauge 
                value="67" 
                min="0" 
                max="100" 
                variant="info"
                size="sm"
                show-value
                animated>
              </my-gauge>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: var(--_global-font-weight-medium);">Memory Usage</label>
              <my-progress 
                value="78" 
                variant="warning"
                show-value
                animated>
              </my-progress>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);">
            <my-icon icon="info" color="info" size="lg"></my-icon>
            <div>
              <strong>System Status:</strong> All services are running normally. 
              Last updated: <span id="last-updated">--</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <my-button label="Download Report" variant="outlined">
          <my-icon icon="download" size="sm" slot="leading"></my-icon>
        </my-button>
        <my-button label="Close" variant="filled" onclick="this.closest('my-modal').open = false"></my-button>
      </div>
    </my-modal>
    
    <script>
      // Initialize data table
      setTimeout(() => {
        const table = document.getElementById('users-table');
        if (table) {
          table.columns = [
            { 
              key: 'id', 
              label: 'ID', 
              type: 'number', 
              sortable: true, 
              width: '60px' 
            },
            { 
              key: 'name', 
              label: 'Name', 
              sortable: true,
              render: (value, row) => \`
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--_global-color-on-primary-container); font-size: 0.8rem;">
                    \${value.split(' ').map(n => n[0]).join('')}
                  </div>
                  \${value}
                </div>
              \`
            },
            { 
              key: 'email', 
              label: 'Email', 
              sortable: true 
            },
            { 
              key: 'department', 
              label: 'Department', 
              sortable: true,
              render: (value) => \`
                <span style="
                  display: inline-flex; 
                  align-items: center; 
                  padding: 0.25rem 0.75rem; 
                  background: var(--_global-color-\${value.toLowerCase() === 'engineering' ? 'primary' : value.toLowerCase() === 'marketing' ? 'secondary' : 'success'}-container); 
                  color: var(--_global-color-on-\${value.toLowerCase() === 'engineering' ? 'primary' : value.toLowerCase() === 'marketing' ? 'secondary' : 'success'}-container); 
                  border-radius: var(--_global-border-radius-full); 
                  font-size: 0.8rem; 
                  font-weight: 500;
                ">
                  \${value}
                </span>
              \`
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (value, row) => \`
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <my-icon 
                    icon="\${row.active ? 'check_circle' : 'cancel'}" 
                    color="\${row.active ? 'success' : 'error'}" 
                    size="sm">
                  </my-icon>
                  \${row.active ? 'Active' : 'Inactive'}
                </div>
              \`
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (value, row) => \`
                <div style="display: flex; gap: 0.5rem;">
                  <my-icon icon="edit" size="sm" interactive title="Edit user"></my-icon>
                  <my-icon icon="visibility" size="sm" interactive title="View details"></my-icon>
                  <my-icon icon="delete" size="sm" interactive color="error" title="Delete user"></my-icon>
                </div>
              \`
            }
          ];
          
          table.data = [
            { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', active: true },
            { id: 2, name: 'Bob Smith', email: 'bob@company.com', department: 'Marketing', active: true },
            { id: 3, name: 'Carol Davis', email: 'carol@company.com', department: 'Sales', active: false },
            { id: 4, name: 'David Wilson', email: 'david@company.com', department: 'Engineering', active: true },
            { id: 5, name: 'Eva Brown', email: 'eva@company.com', department: 'HR', active: true },
            { id: 6, name: 'Frank Miller', email: 'frank@company.com', department: 'Marketing', active: true },
            { id: 7, name: 'Grace Lee', email: 'grace@company.com', department: 'Engineering', active: false },
            { id: 8, name: 'Henry Kim', email: 'henry@company.com', department: 'Sales', active: true },
            { id: 9, name: 'Ivy Chen', email: 'ivy@company.com', department: 'HR', active: true },
            { id: 10, name: 'Jack Rodriguez', email: 'jack@company.com', department: 'Engineering', active: true }
          ];
        }
      }, 100);
      
      // Demo notification function
      function showDemoNotification() {
        const messages = [
          { type: 'success', text: 'Data synchronized successfully!' },
          { type: 'info', text: 'New user registration pending approval.' },
          { type: 'warning', text: 'Server memory usage is above 80%.' },
          { type: 'error', text: 'Failed to connect to external API.' }
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const notification = document.createElement('my-notification');
        notification.type = randomMessage.type;
        notification.message = randomMessage.text;
        notification.duration = 4000;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 4500);
      }
      
      // Update timestamps
      function updateTimestamp() {
        const timestampEl = document.getElementById('last-updated');
        if (timestampEl) {
          timestampEl.textContent = new Date().toLocaleTimeString();
        }
      }
      
      updateTimestamp();
      setInterval(updateTimestamp, 30000);
      
      // Live data simulation
      function simulateLiveData() {
        const gauge = document.getElementById('conversion-gauge');
        if (gauge) {
          const newValue = 25 + Math.random() * 50; // Random value between 25-75
          gauge.value = newValue;
        }
      }
      
      // Start live data simulation if toggle is enabled
      const liveToggle = document.getElementById('live-updates');
      if (liveToggle) {
        let intervalId;
        
        function toggleLiveUpdates() {
          if (liveToggle.checked) {
            intervalId = setInterval(simulateLiveData, 3000);
          } else {
            clearInterval(intervalId);
          }
        }
        
        liveToggle.addEventListener('change', toggleLiveUpdates);
        toggleLiveUpdates(); // Initialize
      }
      
      // Interactive form validation
      document.querySelectorAll('my-input').forEach(input => {
        input.addEventListener('input', (e) => {
          // Simple validation demo
          if (input.type === 'email' && input.value) {
            const isValid = input.value.includes('@');
            input.style.setProperty('--_input-border-color', 
              isValid ? 'var(--_global-color-success)' : 'var(--_global-color-error)'
            );
          }
        });
      });
    <\/script>
  `,n};e.parameters={docs:{description:{story:"A comprehensive interactive dashboard demonstrating real-world usage of all MyntUI components in a modern application interface with live data, interactive controls, and responsive design."}}};var a,t,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
  \`;
  container.innerHTML = \`
    <style>
      .dashboard-header {
        background: var(--_global-color-surface);
        border-bottom: 1px solid var(--_global-color-outline-variant);
        padding: 1rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--_global-elevation-1);
        position: sticky;
        top: 0;
        z-index: 100;
      }
      
      .dashboard-title {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: var(--_global-font-size-title-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0;
      }
      
      .dashboard-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .dashboard-content {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .stat-card {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 1.5rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
        transition: all var(--_global-motion-duration-medium1) var(--_global-motion-easing-standard);
        position: relative;
        overflow: hidden;
      }
      
      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--_global-elevation-3);
      }
      
      .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--_global-color-primary), var(--_global-color-secondary));
      }
      
      .stat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      
      .stat-title {
        font-size: var(--_global-font-size-label-large);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface-variant);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
      }
      
      .stat-value {
        font-size: 2.5rem;
        font-weight: var(--_global-font-weight-bold);
        color: var(--_global-color-on-surface);
        margin: 0 0 0.5rem 0;
        line-height: 1.2;
      }
      
      .stat-change {
        font-size: var(--_global-font-size-body-small);
        font-weight: var(--_global-font-weight-medium);
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      
      .stat-change.positive {
        color: var(--_global-color-success);
      }
      
      .stat-change.negative {
        color: var(--_global-color-error);
      }
      
      .dashboard-section {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--_global-color-outline-variant);
      }
      
      .section-title {
        font-size: var(--_global-font-size-headline-small);
        font-weight: var(--_global-font-weight-semibold);
        color: var(--_global-color-on-surface);
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .controls-row {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
      }
      
      .notification-demo {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1000;
      }
      
      .sparkline-container {
        height: 60px;
        margin-top: 1rem;
      }
      
      .interactive-gauge {
        margin: 1rem 0;
        text-align: center;
      }
      
      .gauge-controls {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      
      @media (max-width: 768px) {
        .dashboard-header {
          padding: 1rem;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        
        .dashboard-actions {
          order: -1;
        }
        
        .dashboard-content {
          padding: 1rem;
        }
        
        .dashboard-grid {
          grid-template-columns: 1fr;
        }
        
        .form-grid {
          grid-template-columns: 1fr;
        }
        
        .controls-row {
          flex-direction: column;
          align-items: stretch;
        }
      }
    </style>
    
    <!-- Dashboard Header -->
    <header class="dashboard-header">
      <h1 class="dashboard-title">
        <my-icon icon="dashboard" size="lg" color="primary"></my-icon>
        Analytics Dashboard
      </h1>
      <div class="dashboard-actions">
        <my-button label="Refresh" variant="outlined">
          <my-icon icon="refresh" size="sm" slot="leading"></my-icon>
        </my-button>
        <my-button label="Export" variant="filled">
          <my-icon icon="download" size="sm" slot="leading"></my-icon>
        </my-button>
        <my-icon icon="settings" size="lg" interactive></my-icon>
      </div>
    </header>
    
    <div class="dashboard-content">
      <!-- Key Metrics -->
      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">Active Users</h3>
            <my-icon icon="people" color="primary"></my-icon>
          </div>
          <div class="stat-value">24,653</div>
          <div class="stat-change positive">
            <my-icon icon="trending_up" size="sm"></my-icon>
            +12.5% from last month
          </div>
          <div class="sparkline-container">
            <my-sparkline 
              data="[18500,19200,20100,19800,21500,22300,23100,23800,24200,24653]" 
              color="var(--_global-color-success)"
              style="height: 100%; width: 100%;">
            </my-sparkline>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">Revenue</h3>
            <my-icon icon="attach_money" color="success"></my-icon>
          </div>
          <div class="stat-value">$847K</div>
          <div class="stat-change positive">
            <my-icon icon="trending_up" size="sm"></my-icon>
            +8.3% from last month
          </div>
          <div class="sparkline-container">
            <my-sparkline 
              data="[720,750,780,770,800,820,835,840,845,847]" 
              color="var(--_global-color-primary)"
              style="height: 100%; width: 100%;">
            </my-sparkline>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">Conversion Rate</h3>
            <my-icon icon="trending_up" color="warning"></my-icon>
          </div>
          <div class="stat-value">3.24%</div>
          <div class="stat-change negative">
            <my-icon icon="trending_down" size="sm"></my-icon>
            -1.2% from last month
          </div>
          <div class="interactive-gauge">
            <my-gauge 
              id="conversion-gauge"
              value="32.4" 
              min="0" 
              max="100" 
              label="Conversion"
              unit="%"
              variant="warning"
              animated
              show-value
              size="sm">
            </my-gauge>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <h3 class="stat-title">System Performance</h3>
            <my-icon icon="speed" color="info"></my-icon>
          </div>
          <div class="stat-value">94.2%</div>
          <div class="stat-change positive">
            <my-icon icon="check_circle" size="sm"></my-icon>
            System healthy
          </div>
          <div style="margin-top: 1rem;">
            <my-progress 
              value="94.2" 
              variant="success" 
              show-value
              animated
              label="Uptime">
            </my-progress>
          </div>
        </div>
      </div>
      
      <!-- Interactive Controls Section -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <my-icon icon="tune" color="primary"></my-icon>
            Interactive Controls
          </h2>
        </div>
        
        <div class="controls-row">
          <my-toggle id="live-updates" checked>
            <span style="margin-left: 0.5rem;">Live Updates</span>
          </my-toggle>
          
          <my-checkbox id="show-details" label="Show Details" checked></my-checkbox>
          
          <my-radio-group name="view-mode" id="view-mode">
            <my-radio value="grid" label="Grid View" checked></my-radio>
            <my-radio value="list" label="List View"></my-radio>
          </my-radio-group>
          
          <my-button 
            label="Demo Notification" 
            variant="outlined"
            onclick="showDemoNotification()">
          </my-button>
          
          <my-button 
            label="Show Modal" 
            variant="filled"
            onclick="document.querySelector('#dashboard-modal').open = true">
          </my-button>
        </div>
      </section>
      
      <!-- Data Input Form -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <my-icon icon="edit" color="primary"></my-icon>
            User Management
          </h2>
          <my-button label="Add User" variant="filled">
            <my-icon icon="person_add" size="sm" slot="leading"></my-icon>
          </my-button>
        </div>
        
        <div class="form-grid">
          <my-input 
            type="text" 
            label="Full Name" 
            placeholder="Enter full name"
            required
            helper-text="First and last name">
            <my-icon icon="person" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="email" 
            label="Email Address" 
            placeholder="user@example.com"
            required
            helper-text="Primary contact email">
            <my-icon icon="email" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="tel" 
            label="Phone Number" 
            placeholder="+1 (555) 123-4567"
            helper-text="Include country code">
            <my-icon icon="phone" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="select" 
            label="Department" 
            required
            helper-text="User's primary department">
            <my-icon icon="business" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="date" 
            label="Start Date" 
            required>
            <my-icon icon="calendar_today" slot="leading"></my-icon>
          </my-input>
          
          <my-input 
            type="number" 
            label="Salary" 
            placeholder="75000"
            min="30000"
            max="200000"
            step="1000"
            helper-text="Annual salary in USD">
            <span slot="leading">$</span>
          </my-input>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <my-button label="Cancel" variant="text"></my-button>
          <my-button label="Save User" variant="filled"></my-button>
        </div>
      </section>
      
      <!-- Data Table Section -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">
            <my-icon icon="table_chart" color="primary"></my-icon>
            User Directory
          </h2>
          <div style="display: flex; gap: 1rem;">
            <my-input 
              type="text" 
              placeholder="Search users..."
              style="width: 250px;">
              <my-icon icon="search" slot="leading"></my-icon>
            </my-input>
            <my-dropdown label="Filter">
              <my-icon icon="filter_list" slot="trigger"></my-icon>
            </my-dropdown>
          </div>
        </div>
        
        <my-data-table 
          id="users-table"
          selectable
          searchable
          paginated
          page-size="5"
          striped
          style="width: 100%;">
        </my-data-table>
      </section>
    </div>
    
    <!-- Modal Dialog -->
    <my-modal id="dashboard-modal">
      <h3 slot="header">System Information</h3>
      <div slot="body">
        <p>Current system status and configuration details:</p>
        
        <div style="margin: 1.5rem 0;">
          <h4 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface); font-size: var(--_global-font-size-title-small);">Performance Metrics</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: var(--_global-font-weight-medium);">CPU Usage</label>
              <my-gauge 
                value="67" 
                min="0" 
                max="100" 
                variant="info"
                size="sm"
                show-value
                animated>
              </my-gauge>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: var(--_global-font-weight-medium);">Memory Usage</label>
              <my-progress 
                value="78" 
                variant="warning"
                show-value
                animated>
              </my-progress>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md);">
            <my-icon icon="info" color="info" size="lg"></my-icon>
            <div>
              <strong>System Status:</strong> All services are running normally. 
              Last updated: <span id="last-updated">--</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
        <my-button label="Download Report" variant="outlined">
          <my-icon icon="download" size="sm" slot="leading"></my-icon>
        </my-button>
        <my-button label="Close" variant="filled" onclick="this.closest('my-modal').open = false"></my-button>
      </div>
    </my-modal>
    
    <script>
      // Initialize data table
      setTimeout(() => {
        const table = document.getElementById('users-table');
        if (table) {
          table.columns = [
            { 
              key: 'id', 
              label: 'ID', 
              type: 'number', 
              sortable: true, 
              width: '60px' 
            },
            { 
              key: 'name', 
              label: 'Name', 
              sortable: true,
              render: (value, row) => \\\`
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--_global-color-on-primary-container); font-size: 0.8rem;">
                    \\\${value.split(' ').map(n => n[0]).join('')}
                  </div>
                  \\\${value}
                </div>
              \\\`
            },
            { 
              key: 'email', 
              label: 'Email', 
              sortable: true 
            },
            { 
              key: 'department', 
              label: 'Department', 
              sortable: true,
              render: (value) => \\\`
                <span style="
                  display: inline-flex; 
                  align-items: center; 
                  padding: 0.25rem 0.75rem; 
                  background: var(--_global-color-\\\${value.toLowerCase() === 'engineering' ? 'primary' : value.toLowerCase() === 'marketing' ? 'secondary' : 'success'}-container); 
                  color: var(--_global-color-on-\\\${value.toLowerCase() === 'engineering' ? 'primary' : value.toLowerCase() === 'marketing' ? 'secondary' : 'success'}-container); 
                  border-radius: var(--_global-border-radius-full); 
                  font-size: 0.8rem; 
                  font-weight: 500;
                ">
                  \\\${value}
                </span>
              \\\`
            },
            { 
              key: 'status', 
              label: 'Status',
              render: (value, row) => \\\`
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <my-icon 
                    icon="\\\${row.active ? 'check_circle' : 'cancel'}" 
                    color="\\\${row.active ? 'success' : 'error'}" 
                    size="sm">
                  </my-icon>
                  \\\${row.active ? 'Active' : 'Inactive'}
                </div>
              \\\`
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (value, row) => \\\`
                <div style="display: flex; gap: 0.5rem;">
                  <my-icon icon="edit" size="sm" interactive title="Edit user"></my-icon>
                  <my-icon icon="visibility" size="sm" interactive title="View details"></my-icon>
                  <my-icon icon="delete" size="sm" interactive color="error" title="Delete user"></my-icon>
                </div>
              \\\`
            }
          ];
          
          table.data = [
            { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', active: true },
            { id: 2, name: 'Bob Smith', email: 'bob@company.com', department: 'Marketing', active: true },
            { id: 3, name: 'Carol Davis', email: 'carol@company.com', department: 'Sales', active: false },
            { id: 4, name: 'David Wilson', email: 'david@company.com', department: 'Engineering', active: true },
            { id: 5, name: 'Eva Brown', email: 'eva@company.com', department: 'HR', active: true },
            { id: 6, name: 'Frank Miller', email: 'frank@company.com', department: 'Marketing', active: true },
            { id: 7, name: 'Grace Lee', email: 'grace@company.com', department: 'Engineering', active: false },
            { id: 8, name: 'Henry Kim', email: 'henry@company.com', department: 'Sales', active: true },
            { id: 9, name: 'Ivy Chen', email: 'ivy@company.com', department: 'HR', active: true },
            { id: 10, name: 'Jack Rodriguez', email: 'jack@company.com', department: 'Engineering', active: true }
          ];
        }
      }, 100);
      
      // Demo notification function
      function showDemoNotification() {
        const messages = [
          { type: 'success', text: 'Data synchronized successfully!' },
          { type: 'info', text: 'New user registration pending approval.' },
          { type: 'warning', text: 'Server memory usage is above 80%.' },
          { type: 'error', text: 'Failed to connect to external API.' }
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const notification = document.createElement('my-notification');
        notification.type = randomMessage.type;
        notification.message = randomMessage.text;
        notification.duration = 4000;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 4500);
      }
      
      // Update timestamps
      function updateTimestamp() {
        const timestampEl = document.getElementById('last-updated');
        if (timestampEl) {
          timestampEl.textContent = new Date().toLocaleTimeString();
        }
      }
      
      updateTimestamp();
      setInterval(updateTimestamp, 30000);
      
      // Live data simulation
      function simulateLiveData() {
        const gauge = document.getElementById('conversion-gauge');
        if (gauge) {
          const newValue = 25 + Math.random() * 50; // Random value between 25-75
          gauge.value = newValue;
        }
      }
      
      // Start live data simulation if toggle is enabled
      const liveToggle = document.getElementById('live-updates');
      if (liveToggle) {
        let intervalId;
        
        function toggleLiveUpdates() {
          if (liveToggle.checked) {
            intervalId = setInterval(simulateLiveData, 3000);
          } else {
            clearInterval(intervalId);
          }
        }
        
        liveToggle.addEventListener('change', toggleLiveUpdates);
        toggleLiveUpdates(); // Initialize
      }
      
      // Interactive form validation
      document.querySelectorAll('my-input').forEach(input => {
        input.addEventListener('input', (e) => {
          // Simple validation demo
          if (input.type === 'email' && input.value) {
            const isValid = input.value.includes('@');
            input.style.setProperty('--_input-border-color', 
              isValid ? 'var(--_global-color-success)' : 'var(--_global-color-error)'
            );
          }
        });
      });
    <\/script>
  \`;
  return container;
}`,...(i=(t=e.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};const k=["FullDashboard"];export{e as FullDashboard,k as __namedExportsOrder,_ as default};
