import '../src/components/my-toggle/my-toggle.js';
import '../src/components/my-checkbox/my-checkbox.js';
import '../src/components/my-radio/my-radio.js';
import '../src/components/my-radio-group/my-radio-group.js';

export default {
  title: 'Components/Boolean Inputs',
  parameters: {
    docs: {
      description: {
        component: 'A collection of boolean input components including toggle switches, checkboxes, and radio buttons.',
      },
    },
  },
};

// Toggle stories
export const Toggles = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Toggle Switches';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  const togglesContainer = document.createElement('div');
  togglesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  
  const toggleConfigs = [
    { label: 'Enable notifications', checked: true },
    { label: 'Dark mode', checked: false },
    { label: 'Auto-save (disabled)', checked: false, disabled: true },
    { label: 'Beta features (disabled & checked)', checked: true, disabled: true },
  ];
  
  toggleConfigs.forEach(({ label, checked, disabled }) => {
    const toggle = document.createElement('my-toggle');
    toggle.setAttribute('label', label);
    if (checked) toggle.setAttribute('checked', '');
    if (disabled) toggle.setAttribute('disabled', '');
    
    toggle.addEventListener('change', (e) => {
      console.log(`Toggle ${label}:`, e.detail);
    });
    
    togglesContainer.appendChild(toggle);
  });
  
  container.appendChild(title);
  container.appendChild(togglesContainer);
  return container;
};

export const Checkboxes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Checkboxes';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  const checkboxesContainer = document.createElement('div');
  checkboxesContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  
  // Basic checkboxes
  const basicTitle = document.createElement('h4');
  basicTitle.textContent = 'Basic States';
  basicTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const basicContainer = document.createElement('div');
  basicContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  
  const checkboxConfigs = [
    { label: 'Unchecked option', checked: false },
    { label: 'Checked option', checked: true },
    { label: 'Indeterminate option', indeterminate: true },
    { label: 'Disabled unchecked', checked: false, disabled: true },
    { label: 'Disabled checked', checked: true, disabled: true },
  ];
  
  checkboxConfigs.forEach(({ label, checked, indeterminate, disabled }) => {
    const checkbox = document.createElement('my-checkbox');
    checkbox.setAttribute('label', label);
    if (checked) checkbox.setAttribute('checked', '');
    if (indeterminate) checkbox.setAttribute('indeterminate', '');
    if (disabled) checkbox.setAttribute('disabled', '');
    
    checkbox.addEventListener('change', (e) => {
      console.log(`Checkbox ${label}:`, e.detail);
    });
    
    basicContainer.appendChild(checkbox);
  });
  
  // Group example
  const groupTitle = document.createElement('h4');
  groupTitle.textContent = 'Group Selection';
  groupTitle.style.cssText = 'margin: 16px 0 0 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const groupContainer = document.createElement('div');
  groupContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  
  const selectAll = document.createElement('my-checkbox');
  selectAll.setAttribute('label', 'Select All');
  selectAll.setAttribute('indeterminate', '');
  
  const groupOptions = ['Option A', 'Option B', 'Option C'];
  const groupCheckboxes = [];
  
  groupOptions.forEach(option => {
    const checkbox = document.createElement('my-checkbox');
    checkbox.setAttribute('label', option);
    checkbox.style.marginLeft = '24px';
    
    checkbox.addEventListener('change', () => {
      updateSelectAll();
    });
    
    groupCheckboxes.push(checkbox);
    groupContainer.appendChild(checkbox);
  });
  
  const updateSelectAll = () => {
    const checkedCount = groupCheckboxes.filter(cb => cb.checked).length;
    const total = groupCheckboxes.length;
    
    if (checkedCount === 0) {
      selectAll.checked = false;
      selectAll.removeAttribute('indeterminate');
    } else if (checkedCount === total) {
      selectAll.checked = true;
      selectAll.removeAttribute('indeterminate');
    } else {
      selectAll.checked = false;
      selectAll.setAttribute('indeterminate', '');
    }
  };
  
  selectAll.addEventListener('change', (e) => {
    const shouldCheck = !selectAll.indeterminate ? e.detail.checked : true;
    groupCheckboxes.forEach(cb => {
      cb.checked = shouldCheck;
    });
    updateSelectAll();
  });
  
  groupContainer.insertBefore(selectAll, groupContainer.firstChild);
  
  container.appendChild(title);
  container.appendChild(basicTitle);
  container.appendChild(basicContainer);
  container.appendChild(groupTitle);
  container.appendChild(groupContainer);
  
  return container;
};

export const RadioButtons = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Radio Buttons';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  // Single radio group
  const group1Title = document.createElement('h4');
  group1Title.textContent = 'Preferred Contact Method';
  group1Title.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const radioGroup1 = document.createElement('my-radio-group');
  radioGroup1.setAttribute('name', 'contact');
  radioGroup1.setAttribute('value', 'email');
  radioGroup1.style.marginLeft = '16px';
  
  const contactOptions = [
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'SMS', value: 'sms' },
    { label: 'Mail (disabled)', value: 'mail', disabled: true },
  ];
  
  contactOptions.forEach(({ label, value, disabled }) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', value);
    if (disabled) radio.setAttribute('disabled', '');
    radioGroup1.appendChild(radio);
  });
  
  radioGroup1.addEventListener('change', (e) => {
    console.log('Contact method selected:', e.detail);
  });
  
  // Second radio group
  const group2Title = document.createElement('h4');
  group2Title.textContent = 'Plan Selection';
  group2Title.style.cssText = 'margin: 16px 0 0 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const radioGroup2 = document.createElement('my-radio-group');
  radioGroup2.setAttribute('name', 'plan');
  radioGroup2.style.marginLeft = '16px';
  
  const planOptions = [
    { label: 'Basic (Free)', value: 'basic' },
    { label: 'Pro ($9.99/mo)', value: 'pro' },
    { label: 'Enterprise (Contact us)', value: 'enterprise' },
  ];
  
  planOptions.forEach(({ label, value }) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', value);
    radioGroup2.appendChild(radio);
  });
  
  radioGroup2.addEventListener('change', (e) => {
    console.log('Plan selected:', e.detail);
  });
  
  container.appendChild(title);
  container.appendChild(group1Title);
  container.appendChild(radioGroup1);
  container.appendChild(group2Title);
  container.appendChild(radioGroup2);
  
  return container;
};

export const Sizes = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  
  const title = document.createElement('h3');
  title.textContent = 'Different Sizes';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  
  const sizes = ['sm', 'md', 'lg'];
  
  sizes.forEach(size => {
    const sectionTitle = document.createElement('h4');
    sectionTitle.textContent = `Size: ${size.toUpperCase()}`;
    sectionTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
    
    const sectionContainer = document.createElement('div');
    sectionContainer.style.cssText = 'display: flex; gap: 32px; margin-left: 16px; align-items: flex-start;';
    
    // Toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    
    const toggleLabel = document.createElement('span');
    toggleLabel.textContent = 'Toggle';
    toggleLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    
    const toggle = document.createElement('my-toggle');
    toggle.setAttribute('label', `${size} toggle`);
    toggle.setAttribute('size', size);
    toggle.setAttribute('checked', '');
    
    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(toggle);
    
    // Checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    
    const checkboxLabel = document.createElement('span');
    checkboxLabel.textContent = 'Checkbox';
    checkboxLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    
    const checkbox = document.createElement('my-checkbox');
    checkbox.setAttribute('label', `${size} checkbox`);
    checkbox.setAttribute('size', size);
    checkbox.setAttribute('checked', '');
    
    checkboxContainer.appendChild(checkboxLabel);
    checkboxContainer.appendChild(checkbox);
    
    // Radio
    const radioContainer = document.createElement('div');
    radioContainer.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
    
    const radioLabel = document.createElement('span');
    radioLabel.textContent = 'Radio';
    radioLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', `${size} radio`);
    radio.setAttribute('size', size);
    radio.setAttribute('checked', '');
    
    radioContainer.appendChild(radioLabel);
    radioContainer.appendChild(radio);
    
    sectionContainer.appendChild(toggleContainer);
    sectionContainer.appendChild(checkboxContainer);
    sectionContainer.appendChild(radioContainer);
    
    container.appendChild(sectionTitle);
    container.appendChild(sectionContainer);
  });
  
  container.appendChild(title);
  return container;
};

export const FormExample = () => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; max-width: 500px; padding: 24px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-lg);';
  
  const title = document.createElement('h3');
  title.textContent = 'Account Preferences';
  title.style.cssText = 'margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';
  
  // Notification settings
  const notificationTitle = document.createElement('h4');
  notificationTitle.textContent = 'Notifications';
  notificationTitle.style.cssText = 'margin: 0 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const notificationContainer = document.createElement('div');
  notificationContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  
  const emailNotifs = document.createElement('my-toggle');
  emailNotifs.setAttribute('label', 'Email notifications');
  emailNotifs.setAttribute('checked', '');
  
  const pushNotifs = document.createElement('my-toggle');
  pushNotifs.setAttribute('label', 'Push notifications');
  
  const smsNotifs = document.createElement('my-toggle');
  smsNotifs.setAttribute('label', 'SMS notifications (Premium only)');
  smsNotifs.setAttribute('disabled', '');
  
  notificationContainer.appendChild(emailNotifs);
  notificationContainer.appendChild(pushNotifs);
  notificationContainer.appendChild(smsNotifs);
  
  // Privacy settings
  const privacyTitle = document.createElement('h4');
  privacyTitle.textContent = 'Privacy';
  privacyTitle.style.cssText = 'margin: 16px 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const privacyContainer = document.createElement('div');
  privacyContainer.style.cssText = 'display: flex; flex-direction: column; gap: 12px; margin-left: 16px;';
  
  const profilePublic = document.createElement('my-checkbox');
  profilePublic.setAttribute('label', 'Make profile public');
  
  const showEmail = document.createElement('my-checkbox');
  showEmail.setAttribute('label', 'Show email address');
  
  const allowMessaging = document.createElement('my-checkbox');
  allowMessaging.setAttribute('label', 'Allow direct messages');
  allowMessaging.setAttribute('checked', '');
  
  privacyContainer.appendChild(profilePublic);
  privacyContainer.appendChild(showEmail);
  privacyContainer.appendChild(allowMessaging);
  
  // Theme selection
  const themeTitle = document.createElement('h4');
  themeTitle.textContent = 'Theme';
  themeTitle.style.cssText = 'margin: 16px 0 12px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  
  const themeGroup = document.createElement('my-radio-group');
  themeGroup.setAttribute('name', 'theme');
  themeGroup.setAttribute('value', 'auto');
  themeGroup.style.marginLeft = '16px';
  
  const themeOptions = [
    { label: 'Auto (system preference)', value: 'auto' },
    { label: 'Light theme', value: 'light' },
    { label: 'Dark theme', value: 'dark' },
  ];
  
  themeOptions.forEach(({ label, value }) => {
    const radio = document.createElement('my-radio');
    radio.setAttribute('label', label);
    radio.setAttribute('value', value);
    themeGroup.appendChild(radio);
  });
  
  container.appendChild(title);
  container.appendChild(notificationTitle);
  container.appendChild(notificationContainer);
  container.appendChild(privacyTitle);
  container.appendChild(privacyContainer);
  container.appendChild(themeTitle);
  container.appendChild(themeGroup);
  
  return container;
};