import '../src/index.js';

export default {
  title: 'Showcase/Real-World Examples',
  parameters: {
    docs: {
      description: {
        component: 'Real-world examples showcasing MyntUI components in practical scenarios, demonstrating design patterns and best practices.',
      },
    },
  },
};

// Dashboard Analytics Example
export const DashboardAnalytics = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
    color: var(--_global-color-text-primary);
  `;

  // Header
  const header = document.createElement('header');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding: 20px 0;
    border-bottom: 1px solid var(--_global-color-outline-variant);
  `;

  const headerTitle = document.createElement('div');
  headerTitle.innerHTML = `
    <h1 style="
      margin: 0 0 8px 0;
      font-size: var(--_global-font-size-headline-large);
      font-weight: var(--_global-font-weight-semibold);
      color: var(--_global-color-text-primary);
    ">Analytics Dashboard</h1>
    <p style="
      margin: 0;
      color: var(--_global-color-text-secondary);
      font-size: var(--_global-font-size-body-medium);
    ">Real-time insights and performance metrics</p>
  `;

  const headerActions = document.createElement('div');
  headerActions.style.cssText = 'display: flex; gap: 12px; align-items: center;';

  // Date range picker simulation
  const dateRange = document.createElement('my-input');
  dateRange.setAttribute('type', 'text');
  dateRange.setAttribute('placeholder', 'Last 30 days');
  dateRange.setAttribute('leading-icon', 'date_range');
  dateRange.setAttribute('size', 'sm');
  dateRange.style.width = '160px';

  // Export button
  const exportBtn = document.createElement('my-button');
  exportBtn.setAttribute('variant', 'outlined');
  exportBtn.setAttribute('size', 'sm');
  exportBtn.innerHTML = '<my-icon icon="download" slot="left"></my-icon>Export';

  // Settings button
  const settingsBtn = document.createElement('my-button');
  settingsBtn.setAttribute('variant', 'text');
  settingsBtn.setAttribute('icon-only', '');
  settingsBtn.innerHTML = '<my-icon icon="settings"></my-icon>';

  headerActions.appendChild(dateRange);
  headerActions.appendChild(exportBtn);
  headerActions.appendChild(settingsBtn);
  header.appendChild(headerTitle);
  header.appendChild(headerActions);

  // Key metrics row
  const metricsRow = document.createElement('div');
  metricsRow.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  `;

  const metrics = [
    { 
      title: 'Total Revenue', 
      value: '$47,392', 
      change: '+12.5%', 
      trend: 'up', 
      icon: 'attach_money',
      color: 'success',
      subtitle: 'vs last month'
    },
    { 
      title: 'Active Users', 
      value: '3,847', 
      change: '+8.2%', 
      trend: 'up', 
      icon: 'people',
      color: 'primary',
      subtitle: '24h active'
    },
    { 
      title: 'Conversion Rate', 
      value: '3.42%', 
      change: '-0.5%', 
      trend: 'down', 
      icon: 'trending_up',
      color: 'warning',
      subtitle: 'this week'
    },
    { 
      title: 'Server Uptime', 
      value: '99.8%', 
      change: '', 
      trend: 'stable', 
      icon: 'cloud_done',
      color: 'info',
      subtitle: '30-day average'
    }
  ];

  metrics.forEach(metric => {
    const card = document.createElement('div');
    card.style.cssText = `
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 24px;
      transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
    `;

    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = 'var(--_global-elevation-2)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
    });

    const cardHeader = document.createElement('div');
    cardHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;';

    const cardIcon = document.createElement('my-icon');
    cardIcon.setAttribute('icon', metric.icon);
    cardIcon.style.cssText = `color: var(--_global-color-${metric.color}); font-size: 24px;`;

    const trendIcon = document.createElement('my-icon');
    if (metric.trend === 'up') {
      trendIcon.setAttribute('icon', 'trending_up');
      trendIcon.style.color = 'var(--_global-color-success)';
    } else if (metric.trend === 'down') {
      trendIcon.setAttribute('icon', 'trending_down');
      trendIcon.style.color = 'var(--_global-color-error)';
    } else {
      trendIcon.setAttribute('icon', 'trending_flat');
      trendIcon.style.color = 'var(--_global-color-text-secondary)';
    }
    trendIcon.style.fontSize = '18px';

    cardHeader.appendChild(cardIcon);
    cardHeader.appendChild(trendIcon);

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = metric.title;
    cardTitle.style.cssText = `
      margin: 0 0 4px 0;
      font-size: var(--_global-font-size-label-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;

    const cardValue = document.createElement('div');
    cardValue.textContent = metric.value;
    cardValue.style.cssText = `
      font-size: var(--_global-font-size-headline-medium);
      font-weight: var(--_global-font-weight-bold);
      color: var(--_global-color-text-primary);
      margin-bottom: 8px;
    `;

    const cardFooter = document.createElement('div');
    cardFooter.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

    const cardChange = document.createElement('span');
    if (metric.change) {
      cardChange.textContent = metric.change;
      cardChange.style.cssText = `
        font-size: var(--_global-font-size-label-small);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-${metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'error' : 'text-secondary'});
      `;
    }

    const cardSubtitle = document.createElement('span');
    cardSubtitle.textContent = metric.subtitle;
    cardSubtitle.style.cssText = `
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    `;

    cardFooter.appendChild(cardChange);
    cardFooter.appendChild(cardSubtitle);

    card.appendChild(cardHeader);
    card.appendChild(cardTitle);
    card.appendChild(cardValue);
    card.appendChild(cardFooter);

    metricsRow.appendChild(card);
  });

  // Charts section
  const chartsSection = document.createElement('div');
  chartsSection.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;';

  // Performance gauges
  const gaugesCard = document.createElement('div');
  gaugesCard.style.cssText = `
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
  `;

  const gaugesHeader = document.createElement('div');
  gaugesHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;';

  const gaugesTitle = document.createElement('h3');
  gaugesTitle.textContent = 'System Performance';
  gaugesTitle.style.cssText = `
    margin: 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  `;

  const refreshBtn = document.createElement('my-button');
  refreshBtn.setAttribute('variant', 'text');
  refreshBtn.setAttribute('size', 'sm');
  refreshBtn.innerHTML = '<my-icon icon="refresh" slot="left"></my-icon>Refresh';

  gaugesHeader.appendChild(gaugesTitle);
  gaugesHeader.appendChild(refreshBtn);

  const gaugesGrid = document.createElement('div');
  gaugesGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;';

  const gaugeMetrics = [
    { label: 'CPU Usage', value: 68, variant: 'warning', unit: '%' },
    { label: 'Memory', value: 45, variant: 'success', unit: '%' },
    { label: 'Disk I/O', value: 82, variant: 'error', unit: '%' },
    { label: 'Network', value: 30, variant: 'primary', unit: 'Mbps' },
  ];

  gaugeMetrics.forEach(({ label, value, variant, unit }) => {
    const gaugeContainer = document.createElement('div');
    gaugeContainer.style.cssText = 'text-align: center;';

    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('size', 'md');
    gauge.setAttribute('show-value', '');

    gaugeContainer.appendChild(gauge);
    gaugesGrid.appendChild(gaugeContainer);
  });

  gaugesCard.appendChild(gaugesHeader);
  gaugesCard.appendChild(gaugesGrid);

  // Activity feed
  const activityCard = document.createElement('div');
  activityCard.style.cssText = `
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
  `;

  const activityHeader = document.createElement('h3');
  activityHeader.textContent = 'Recent Activity';
  activityHeader.style.cssText = `
    margin: 0 0 20px 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  `;

  const activityList = document.createElement('div');
  activityList.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

  const activities = [
    { icon: 'person_add', text: 'New user registered', time: '2 min ago', type: 'success' },
    { icon: 'security', text: 'Security scan completed', time: '15 min ago', type: 'info' },
    { icon: 'warning', text: 'High memory usage detected', time: '32 min ago', type: 'warning' },
    { icon: 'upload', text: 'Database backup completed', time: '1 hour ago', type: 'success' },
    { icon: 'error', text: 'Failed login attempt blocked', time: '2 hours ago', type: 'error' },
  ];

  activities.forEach(({ icon, text, time, type }) => {
    const activity = document.createElement('div');
    activity.style.cssText = `
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--_global-color-outline-variant);
    `;

    const activityIcon = document.createElement('my-icon');
    activityIcon.setAttribute('icon', icon);
    activityIcon.style.cssText = `
      color: var(--_global-color-${type});
      font-size: 20px;
      flex-shrink: 0;
    `;

    const activityContent = document.createElement('div');
    activityContent.style.cssText = 'flex: 1;';

    const activityText = document.createElement('div');
    activityText.textContent = text;
    activityText.style.cssText = `
      font-size: var(--_global-font-size-body-small);
      color: var(--_global-color-text-primary);
      margin-bottom: 2px;
    `;

    const activityTime = document.createElement('div');
    activityTime.textContent = time;
    activityTime.style.cssText = `
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    `;

    activityContent.appendChild(activityText);
    activityContent.appendChild(activityTime);

    activity.appendChild(activityIcon);
    activity.appendChild(activityContent);

    activityList.appendChild(activity);
  });

  activityCard.appendChild(activityHeader);
  activityCard.appendChild(activityList);

  chartsSection.appendChild(gaugesCard);
  chartsSection.appendChild(activityCard);

  // Progress tracking section
  const progressSection = document.createElement('div');
  progressSection.style.cssText = `
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
    margin-bottom: 32px;
  `;

  const progressHeader = document.createElement('div');
  progressHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;';

  const progressTitle = document.createElement('h3');
  progressTitle.textContent = 'Project Progress';
  progressTitle.style.cssText = `
    margin: 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  `;

  const addProjectBtn = document.createElement('my-button');
  addProjectBtn.setAttribute('variant', 'filled');
  addProjectBtn.setAttribute('size', 'sm');
  addProjectBtn.innerHTML = '<my-icon icon="add" slot="left"></my-icon>Add Project';

  progressHeader.appendChild(progressTitle);
  progressHeader.appendChild(addProjectBtn);

  const progressGrid = document.createElement('div');
  progressGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;';

  const projects = [
    { name: 'Website Redesign', progress: 75, variant: 'primary', deadline: '2 weeks', team: 4 },
    { name: 'Mobile App Beta', progress: 45, variant: 'info', deadline: '1 month', team: 3 },
    { name: 'API Integration', progress: 90, variant: 'success', deadline: '3 days', team: 2 },
    { name: 'Security Audit', progress: 30, variant: 'warning', deadline: '3 weeks', team: 5 },
  ];

  projects.forEach(({ name, progress, variant, deadline, team }) => {
    const projectCard = document.createElement('div');
    projectCard.style.cssText = `
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-md);
      padding: 20px;
      background: var(--_global-color-surface);
    `;

    const projectHeader = document.createElement('div');
    projectHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;';

    const projectName = document.createElement('h4');
    projectName.textContent = name;
    projectName.style.cssText = `
      margin: 0;
      font-size: var(--_global-font-size-body-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-primary);
    `;

    const projectMenu = document.createElement('my-button');
    projectMenu.setAttribute('variant', 'text');
    projectMenu.setAttribute('icon-only', '');
    projectMenu.setAttribute('size', 'sm');
    projectMenu.innerHTML = '<my-icon icon="more_vert"></my-icon>';

    projectHeader.appendChild(projectName);
    projectHeader.appendChild(projectMenu);

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = 'margin-bottom: 16px;';

    const progressLabel = document.createElement('div');
    progressLabel.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 8px;';
    progressLabel.innerHTML = `
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">Progress</span>
      <span style="font-size: var(--_global-font-size-label-small); font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);">${progress}%</span>
    `;

    const progressBar = document.createElement('my-progress');
    progressBar.setAttribute('value', progress);
    progressBar.setAttribute('variant', variant);
    progressBar.setAttribute('size', 'sm');

    progressContainer.appendChild(progressLabel);
    progressContainer.appendChild(progressBar);

    const projectFooter = document.createElement('div');
    projectFooter.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

    const deadlineInfo = document.createElement('div');
    deadlineInfo.style.cssText = 'display: flex; align-items: center; gap: 6px;';
    deadlineInfo.innerHTML = `
      <my-icon icon="schedule" style="font-size: 16px; color: var(--_global-color-text-secondary);"></my-icon>
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">${deadline}</span>
    `;

    const teamInfo = document.createElement('div');
    teamInfo.style.cssText = 'display: flex; align-items: center; gap: 6px;';
    teamInfo.innerHTML = `
      <my-icon icon="group" style="font-size: 16px; color: var(--_global-color-text-secondary);"></my-icon>
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">${team} members</span>
    `;

    projectFooter.appendChild(deadlineInfo);
    projectFooter.appendChild(teamInfo);

    projectCard.appendChild(projectHeader);
    projectCard.appendChild(progressContainer);
    projectCard.appendChild(projectFooter);

    progressGrid.appendChild(projectCard);
  });

  progressSection.appendChild(progressHeader);
  progressSection.appendChild(progressGrid);

  // Actions footer
  const actionsFooter = document.createElement('div');
  actionsFooter.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid var(--_global-color-outline-variant);
  `;

  const footerInfo = document.createElement('div');
  footerInfo.style.cssText = 'display: flex; align-items: center; gap: 16px;';

  const lastUpdated = document.createElement('span');
  lastUpdated.innerHTML = `
    <my-icon icon="schedule" style="font-size: 16px; color: var(--_global-color-text-secondary); margin-right: 6px;"></my-icon>
    Last updated: 5 minutes ago
  `;
  lastUpdated.style.cssText = `
    font-size: var(--_global-font-size-label-small);
    color: var(--_global-color-text-secondary);
    display: flex;
    align-items: center;
  `;

  const autoRefresh = document.createElement('my-toggle');
  autoRefresh.setAttribute('label', 'Auto-refresh');
  autoRefresh.setAttribute('size', 'sm');
  autoRefresh.setAttribute('checked', '');

  footerInfo.appendChild(lastUpdated);
  footerInfo.appendChild(autoRefresh);

  const footerActions = document.createElement('div');
  footerActions.style.cssText = 'display: flex; gap: 12px;';

  const fullscreenBtn = document.createElement('my-button');
  fullscreenBtn.setAttribute('variant', 'outlined');
  fullscreenBtn.setAttribute('size', 'sm');
  fullscreenBtn.innerHTML = '<my-icon icon="fullscreen" slot="left"></my-icon>Fullscreen';

  const shareBtn = document.createElement('my-button');
  shareBtn.setAttribute('variant', 'filled');
  shareBtn.setAttribute('size', 'sm');
  shareBtn.innerHTML = '<my-icon icon="share" slot="left"></my-icon>Share Dashboard';

  footerActions.appendChild(fullscreenBtn);
  footerActions.appendChild(shareBtn);

  actionsFooter.appendChild(footerInfo);
  actionsFooter.appendChild(footerActions);

  // Assemble everything
  container.appendChild(header);
  container.appendChild(metricsRow);
  container.appendChild(chartsSection);
  container.appendChild(progressSection);
  container.appendChild(actionsFooter);

  return container;
};

DashboardAnalytics.parameters = {
  docs: {
    description: {
      story: 'A comprehensive analytics dashboard showcasing real-world usage of multiple MyntUI components in a business context.',
    },
  },
};

// E-commerce Product Management
export const ECommerceProductManagement = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  `;

  // Header with filters
  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--_global-color-outline-variant);
    flex-wrap: wrap;
    gap: 16px;
  `;

  const headerTitle = document.createElement('div');
  headerTitle.innerHTML = `
    <h1 style="
      margin: 0 0 8px 0;
      font-size: var(--_global-font-size-headline-large);
      font-weight: var(--_global-font-weight-semibold);
      color: var(--_global-color-text-primary);
    ">Product Catalog</h1>
    <p style="
      margin: 0;
      color: var(--_global-color-text-secondary);
      font-size: var(--_global-font-size-body-medium);
    ">Manage your product inventory and pricing</p>
  `;

  const headerFilters = document.createElement('div');
  headerFilters.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

  // Search input
  const searchInput = document.createElement('my-input');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('placeholder', 'Search products...');
  searchInput.setAttribute('leading-icon', 'search');
  searchInput.setAttribute('size', 'sm');
  searchInput.style.width = '240px';

  // Category filter
  const categorySelect = document.createElement('my-dropdown');
  categorySelect.setAttribute('trigger-text', 'All Categories');
  categorySelect.setAttribute('size', 'sm');
  categorySelect.setAttribute('options', JSON.stringify([
    { label: 'All Categories', value: 'all' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Home & Garden', value: 'home' },
    { label: 'Sports', value: 'sports' },
  ]));

  // Status filter
  const statusSelect = document.createElement('my-dropdown');
  statusSelect.setAttribute('trigger-text', 'All Status');
  statusSelect.setAttribute('size', 'sm');
  statusSelect.setAttribute('options', JSON.stringify([
    { label: 'All Status', value: 'all' },
    { label: 'In Stock', value: 'in-stock' },
    { label: 'Low Stock', value: 'low-stock' },
    { label: 'Out of Stock', value: 'out-of-stock' },
  ]));

  // Add product button
  const addProductBtn = document.createElement('my-button');
  addProductBtn.setAttribute('variant', 'filled');
  addProductBtn.setAttribute('size', 'sm');
  addProductBtn.innerHTML = '<my-icon icon="add" slot="left"></my-icon>Add Product';

  headerFilters.appendChild(searchInput);
  headerFilters.appendChild(categorySelect);
  headerFilters.appendChild(statusSelect);
  headerFilters.appendChild(addProductBtn);

  header.appendChild(headerTitle);
  header.appendChild(headerFilters);

  // Products grid
  const productsGrid = document.createElement('div');
  productsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 32px;';

  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      price: 99.99,
      originalPrice: 129.99,
      stock: 24,
      status: 'in-stock',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      image: 'headphones',
      discount: 23
    },
    {
      id: 2,
      name: 'Premium Cotton T-Shirt',
      sku: 'PCT-002',
      price: 29.99,
      originalPrice: null,
      stock: 5,
      status: 'low-stock',
      category: 'Clothing',
      rating: 4.2,
      reviews: 89,
      image: 'shirt',
      discount: 0
    },
    {
      id: 3,
      name: 'Smart Home Security Camera',
      sku: 'SHC-003',
      price: 149.99,
      originalPrice: 199.99,
      stock: 0,
      status: 'out-of-stock',
      category: 'Electronics',
      rating: 4.8,
      reviews: 256,
      image: 'camera',
      discount: 25
    },
    {
      id: 4,
      name: 'Organic Plant Fertilizer',
      sku: 'OPF-004',
      price: 19.99,
      originalPrice: null,
      stock: 48,
      status: 'in-stock',
      category: 'Home & Garden',
      rating: 4.6,
      reviews: 73,
      image: 'fertilizer',
      discount: 0
    }
  ];

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.style.cssText = `
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      overflow: hidden;
      transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
    `;

    productCard.addEventListener('mouseenter', () => {
      productCard.style.boxShadow = 'var(--_global-elevation-2)';
    });

    productCard.addEventListener('mouseleave', () => {
      productCard.style.boxShadow = 'none';
    });

    // Product image placeholder with status
    const imageSection = document.createElement('div');
    imageSection.style.cssText = `
      position: relative;
      height: 180px;
      background: var(--_global-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--_global-color-text-secondary);
      font-size: 48px;
    `;

    const placeholderIcon = document.createElement('my-icon');
    placeholderIcon.setAttribute('icon', 'image');
    placeholderIcon.style.fontSize = '48px';
    imageSection.appendChild(placeholderIcon);

    // Status badge
    const statusBadge = document.createElement('div');
    const statusConfig = {
      'in-stock': { color: 'success', text: 'In Stock' },
      'low-stock': { color: 'warning', text: 'Low Stock' },
      'out-of-stock': { color: 'error', text: 'Out of Stock' }
    };
    const status = statusConfig[product.status];

    statusBadge.textContent = status.text;
    statusBadge.style.cssText = `
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--_global-color-${status.color});
      color: var(--_global-color-on-${status.color});
      padding: 4px 8px;
      border-radius: var(--_global-border-radius-sm);
      font-size: var(--_global-font-size-label-small);
      font-weight: var(--_global-font-weight-medium);
    `;

    imageSection.appendChild(statusBadge);

    // Discount badge
    if (product.discount > 0) {
      const discountBadge = document.createElement('div');
      discountBadge.textContent = `-${product.discount}%`;
      discountBadge.style.cssText = `
        position: absolute;
        top: 12px;
        left: 12px;
        background: var(--_global-color-error);
        color: var(--_global-color-on-error);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: var(--_global-font-size-label-small);
        font-weight: var(--_global-font-weight-bold);
      `;
      imageSection.appendChild(discountBadge);
    }

    // Product details
    const detailsSection = document.createElement('div');
    detailsSection.style.cssText = 'padding: 20px;';

    // Product name and SKU
    const productHeader = document.createElement('div');
    productHeader.style.cssText = 'margin-bottom: 12px;';

    const productName = document.createElement('h3');
    productName.textContent = product.name;
    productName.style.cssText = `
      margin: 0 0 4px 0;
      font-size: var(--_global-font-size-body-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-primary);
      line-height: 1.4;
    `;

    const productSku = document.createElement('p');
    productSku.textContent = `SKU: ${product.sku}`;
    productSku.style.cssText = `
      margin: 0;
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
      font-family: var(--_global-font-family-mono);
    `;

    productHeader.appendChild(productName);
    productHeader.appendChild(productSku);

    // Rating
    const ratingSection = document.createElement('div');
    ratingSection.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 12px;';

    const starsContainer = document.createElement('div');
    starsContainer.style.cssText = 'display: flex; gap: 2px;';

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('my-icon');
      star.setAttribute('icon', i <= Math.floor(product.rating) ? 'star' : (i - 0.5 <= product.rating ? 'star_half' : 'star_border'));
      star.setAttribute('size', 'sm');
      star.style.color = 'var(--_global-color-warning)';
      starsContainer.appendChild(star);
    }

    const reviewText = document.createElement('span');
    reviewText.textContent = `(${product.reviews})`;
    reviewText.style.cssText = `
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    `;

    ratingSection.appendChild(starsContainer);
    ratingSection.appendChild(reviewText);

    // Price section
    const priceSection = document.createElement('div');
    priceSection.style.cssText = 'display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;';

    const currentPrice = document.createElement('span');
    currentPrice.textContent = `$${product.price}`;
    currentPrice.style.cssText = `
      font-size: var(--_global-font-size-title-small);
      font-weight: var(--_global-font-weight-bold);
      color: var(--_global-color-primary);
    `;

    priceSection.appendChild(currentPrice);

    if (product.originalPrice) {
      const originalPrice = document.createElement('span');
      originalPrice.textContent = `$${product.originalPrice}`;
      originalPrice.style.cssText = `
        font-size: var(--_global-font-size-body-small);
        color: var(--_global-color-text-secondary);
        text-decoration: line-through;
      `;
      priceSection.appendChild(originalPrice);
    }

    // Stock info
    const stockSection = document.createElement('div');
    stockSection.style.cssText = 'margin-bottom: 16px;';

    const stockLabel = document.createElement('div');
    stockLabel.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 4px;';
    stockLabel.innerHTML = `
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">Stock Level</span>
      <span style="font-size: var(--_global-font-size-label-small); font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);">${product.stock} units</span>
    `;

    const stockProgress = document.createElement('my-progress');
    const stockPercentage = Math.min((product.stock / 50) * 100, 100); // Assume 50 is max stock
    stockProgress.setAttribute('value', stockPercentage);
    stockProgress.setAttribute('variant', product.status === 'low-stock' ? 'warning' : product.status === 'out-of-stock' ? 'error' : 'success');
    stockProgress.setAttribute('size', 'sm');

    stockSection.appendChild(stockLabel);
    stockSection.appendChild(stockProgress);

    // Actions
    const actionsSection = document.createElement('div');
    actionsSection.style.cssText = 'display: flex; gap: 8px;';

    const editBtn = document.createElement('my-button');
    editBtn.setAttribute('variant', 'outlined');
    editBtn.setAttribute('size', 'sm');
    editBtn.style.flex = '1';
    editBtn.innerHTML = '<my-icon icon="edit" slot="left"></my-icon>Edit';

    const duplicateBtn = document.createElement('my-button');
    duplicateBtn.setAttribute('variant', 'text');
    duplicateBtn.setAttribute('icon-only', '');
    duplicateBtn.setAttribute('size', 'sm');
    duplicateBtn.innerHTML = '<my-icon icon="content_copy"></my-icon>';

    const deleteBtn = document.createElement('my-button');
    deleteBtn.setAttribute('variant', 'text');
    deleteBtn.setAttribute('icon-only', '');
    deleteBtn.setAttribute('size', 'sm');
    deleteBtn.innerHTML = '<my-icon icon="delete" style="color: var(--_global-color-error);"></my-icon>';

    actionsSection.appendChild(editBtn);
    actionsSection.appendChild(duplicateBtn);
    actionsSection.appendChild(deleteBtn);

    // Assemble product card
    detailsSection.appendChild(productHeader);
    detailsSection.appendChild(ratingSection);
    detailsSection.appendChild(priceSection);
    detailsSection.appendChild(stockSection);
    detailsSection.appendChild(actionsSection);

    productCard.appendChild(imageSection);
    productCard.appendChild(detailsSection);

    productsGrid.appendChild(productCard);
  });

  // Pagination
  const paginationSection = document.createElement('div');
  paginationSection.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid var(--_global-color-outline-variant);
  `;

  const paginationInfo = document.createElement('span');
  paginationInfo.textContent = 'Showing 1-4 of 247 products';
  paginationInfo.style.cssText = `
    font-size: var(--_global-font-size-body-small);
    color: var(--_global-color-text-secondary);
  `;

  const paginationControls = document.createElement('div');
  paginationControls.style.cssText = 'display: flex; gap: 8px; align-items: center;';

  const prevBtn = document.createElement('my-button');
  prevBtn.setAttribute('variant', 'outlined');
  prevBtn.setAttribute('size', 'sm');
  prevBtn.setAttribute('disabled', '');
  prevBtn.innerHTML = '<my-icon icon="chevron_left" slot="left"></my-icon>Previous';

  const pageInfo = document.createElement('span');
  pageInfo.textContent = 'Page 1 of 62';
  pageInfo.style.cssText = `
    font-size: var(--_global-font-size-body-small);
    color: var(--_global-color-text-primary);
    padding: 0 16px;
  `;

  const nextBtn = document.createElement('my-button');
  nextBtn.setAttribute('variant', 'outlined');
  nextBtn.setAttribute('size', 'sm');
  nextBtn.innerHTML = 'Next<my-icon icon="chevron_right" slot="right"></my-icon>';

  paginationControls.appendChild(prevBtn);
  paginationControls.appendChild(pageInfo);
  paginationControls.appendChild(nextBtn);

  paginationSection.appendChild(paginationInfo);
  paginationSection.appendChild(paginationControls);

  // Assemble everything
  container.appendChild(header);
  container.appendChild(productsGrid);
  container.appendChild(paginationSection);

  return container;
};

ECommerceProductManagement.parameters = {
  docs: {
    description: {
      story: 'A comprehensive product management interface showcasing complex data layouts, filtering, status indicators, and bulk actions.',
    },
  },
};