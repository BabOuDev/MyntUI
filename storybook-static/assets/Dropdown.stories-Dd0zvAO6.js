import"./my-dropdown-CiMYD9E9.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const K={title:"Components/my-dropdown",parameters:{docs:{description:{component:"A component that displays a list of options when clicked, typically used for navigation or actions. Features keyboard navigation and accessibility support."}}},argTypes:{triggerText:{control:"text",description:"Text displayed on the trigger button"},position:{control:{type:"select"},options:["top","bottom","left","right"],description:"Position of the dropdown relative to trigger"},disabled:{control:"boolean",description:"Disable the dropdown"},size:{control:{type:"select"},options:["sm","md","lg"],description:"Dropdown size"}}},P=e=>{const a=document.createElement("my-dropdown");e.triggerText&&a.setAttribute("trigger-text",e.triggerText),e.position&&e.position!=="bottom"&&a.setAttribute("position",e.position),e.size&&e.size!=="md"&&a.setAttribute("size",e.size),e.disabled&&a.setAttribute("disabled","");const n=e.options||[{label:"Edit",value:"edit",icon:"edit"},{label:"Copy",value:"copy",icon:"content_copy"},{label:"Delete",value:"delete",icon:"delete"}];return a.setAttribute("options",JSON.stringify(n)),a.addEventListener("select",o=>{console.log("Dropdown selection:",o.detail)}),a},i=P.bind({});i.args={triggerText:"Actions",position:"bottom",size:"md",disabled:!1,options:[{label:"Edit",value:"edit"},{label:"Copy",value:"copy"},{label:"Delete",value:"delete"}]};const s=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap;",[{triggerText:"File Actions",options:[{label:"New File",value:"new",icon:"add"},{label:"Open File",value:"open",icon:"folder_open"},{label:"Save",value:"save",icon:"save"},{label:"Save As...",value:"save-as",icon:"save_as"},{label:"Print",value:"print",icon:"print"}]},{triggerText:"User Menu",options:[{label:"Profile",value:"profile",icon:"person"},{label:"Settings",value:"settings",icon:"settings"},{label:"Help",value:"help",icon:"help"},{label:"Sign Out",value:"logout",icon:"logout"}]},{triggerText:"Status",options:[{label:"Available",value:"available",icon:"check_circle"},{label:"Busy",value:"busy",icon:"error"},{label:"Away",value:"away",icon:"schedule"},{label:"Offline",value:"offline",icon:"offline_bolt"}]}].forEach(({triggerText:n,options:o})=>{const t=document.createElement("my-dropdown");t.setAttribute("trigger-text",n),t.setAttribute("options",JSON.stringify(o)),t.addEventListener("select",r=>{console.log(`${n} selected:`,r.detail)}),e.appendChild(t)}),e};s.parameters={docs:{description:{story:"Dropdown menus with icons to enhance visual recognition."}}};const d=()=>{const e=document.createElement("div");return e.style.cssText="display: grid; grid-template-columns: repeat(2, 1fr); gap: 80px; padding: 60px; min-height: 400px; place-items: center;",["top","bottom","left","right"].forEach(n=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const t=document.createElement("my-dropdown");t.setAttribute("trigger-text",`${n.charAt(0).toUpperCase()}${n.slice(1)}`),t.setAttribute("position",n),t.setAttribute("options",JSON.stringify([{label:"Option 1",value:"opt1"},{label:"Option 2",value:"opt2"},{label:"Option 3",value:"opt3"}]));const r=document.createElement("span");r.textContent=`Position: ${n}`,r.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",o.appendChild(t),o.appendChild(r),e.appendChild(o)}),e};d.parameters={docs:{description:{story:"Dropdown positioning options relative to the trigger element."}}};const c=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 24px; align-items: flex-start;",["sm","md","lg"].forEach(n=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const t=document.createElement("my-dropdown");t.setAttribute("trigger-text",`Size ${n.toUpperCase()}`),t.setAttribute("size",n),t.setAttribute("options",JSON.stringify([{label:"Small option",value:"sm-opt"},{label:"Medium option",value:"md-opt"},{label:"Large option",value:"lg-opt"}]));const r=document.createElement("span");r.textContent=n.toUpperCase(),r.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",o.appendChild(t),o.appendChild(r),e.appendChild(o)}),e};c.parameters={docs:{description:{story:"Different dropdown sizes for various contexts."}}};const p=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 24px; align-items: flex-start;",[{name:"Normal",disabled:!1},{name:"Disabled",disabled:!0}].forEach(({name:n,disabled:o})=>{const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const r=document.createElement("my-dropdown");r.setAttribute("trigger-text",`${n} Dropdown`),o&&r.setAttribute("disabled",""),r.setAttribute("options",JSON.stringify([{label:"Option 1",value:"opt1"},{label:"Option 2",value:"opt2"},{label:"Option 3",value:"opt3"}]));const l=document.createElement("span");l.textContent=n,l.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",t.appendChild(r),t.appendChild(l),e.appendChild(t)}),e};p.parameters={docs:{description:{story:"Different dropdown states including normal and disabled."}}};const u=()=>{const e=document.createElement("div");e.style.cssText="display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap;";const a=document.createElement("my-dropdown");a.setAttribute("trigger-text","Navigation"),a.setAttribute("options",JSON.stringify([{label:"Dashboard",value:"dashboard",icon:"dashboard"},{label:"Projects",value:"projects",icon:"folder"},{label:"Tasks",value:"tasks",icon:"task_alt"},{label:"Calendar",value:"calendar",icon:"calendar_today"},{label:"Reports",value:"reports",icon:"assessment"},{label:"Team",value:"team",icon:"group"}]));const n=document.createElement("my-dropdown");n.setAttribute("trigger-text","Right Click Menu"),n.setAttribute("options",JSON.stringify([{label:"Cut",value:"cut",icon:"content_cut"},{label:"Copy",value:"copy",icon:"content_copy"},{label:"Paste",value:"paste",icon:"content_paste"},{label:"Select All",value:"select-all",icon:"select_all"},{label:"Properties",value:"properties",icon:"info"}]));const o=document.createElement("my-dropdown");return o.setAttribute("trigger-text","Sort Options"),o.setAttribute("options",JSON.stringify([{label:"Name A-Z",value:"name-asc",icon:"sort_by_alpha"},{label:"Name Z-A",value:"name-desc",icon:"sort_by_alpha"},{label:"Date Modified",value:"date-modified",icon:"schedule"},{label:"Size",value:"size",icon:"storage"},{label:"Type",value:"type",icon:"category"}])),[a,n,o].forEach(t=>{t.addEventListener("select",r=>{console.log("Menu selection:",r.detail)}),e.appendChild(t)}),e};u.parameters={docs:{description:{story:"Examples of complex dropdown menus for different use cases."}}};const b=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 16px; max-width: 400px;";const a=document.createElement("h3");a.textContent="Keyboard Navigation Demo",a.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const n=document.createElement("div");n.style.cssText="padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); font-size: 14px; line-height: 1.5;",n.innerHTML=`
    <strong>Keyboard Navigation:</strong><br>
    • <kbd>Enter</kbd> or <kbd>Space</kbd> - Open/close dropdown<br>
    • <kbd>↑</kbd> <kbd>↓</kbd> - Navigate options<br>
    • <kbd>Enter</kbd> - Select option<br>
    • <kbd>Escape</kbd> - Close dropdown<br>
    • <kbd>Tab</kbd> - Move to next element
  `;const o=document.createElement("my-dropdown");o.setAttribute("trigger-text","Try Keyboard Navigation"),o.setAttribute("options",JSON.stringify([{label:"First Option",value:"first"},{label:"Second Option",value:"second"},{label:"Third Option",value:"third"},{label:"Fourth Option",value:"fourth"},{label:"Fifth Option",value:"fifth"}])),o.addEventListener("select",r=>{const l=document.querySelector("#keyboard-result");l.textContent=`Selected: ${r.detail.label}`,l.style.color="var(--_global-color-success)"});const t=document.createElement("div");return t.id="keyboard-result",t.textContent="No selection yet",t.style.cssText="padding: 8px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);",e.appendChild(a),e.appendChild(n),e.appendChild(o),e.appendChild(t),e};b.parameters={docs:{description:{story:"Demonstration of keyboard navigation capabilities with instructions."}}};var m,g,v;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const dropdown = document.createElement('my-dropdown');

  // Set properties
  if (args.triggerText) dropdown.setAttribute('trigger-text', args.triggerText);
  if (args.position && args.position !== 'bottom') dropdown.setAttribute('position', args.position);
  if (args.size && args.size !== 'md') dropdown.setAttribute('size', args.size);
  if (args.disabled) dropdown.setAttribute('disabled', '');

  // Set options
  const options = args.options || [{
    label: 'Edit',
    value: 'edit',
    icon: 'edit'
  }, {
    label: 'Copy',
    value: 'copy',
    icon: 'content_copy'
  }, {
    label: 'Delete',
    value: 'delete',
    icon: 'delete'
  }];
  dropdown.setAttribute('options', JSON.stringify(options));

  // Add event listener for demonstration
  dropdown.addEventListener('select', e => {
    console.log('Dropdown selection:', e.detail);
  });
  return dropdown;
}`,...(v=(g=i.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var x,y,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap;';
  const dropdowns = [{
    triggerText: 'File Actions',
    options: [{
      label: 'New File',
      value: 'new',
      icon: 'add'
    }, {
      label: 'Open File',
      value: 'open',
      icon: 'folder_open'
    }, {
      label: 'Save',
      value: 'save',
      icon: 'save'
    }, {
      label: 'Save As...',
      value: 'save-as',
      icon: 'save_as'
    }, {
      label: 'Print',
      value: 'print',
      icon: 'print'
    }]
  }, {
    triggerText: 'User Menu',
    options: [{
      label: 'Profile',
      value: 'profile',
      icon: 'person'
    }, {
      label: 'Settings',
      value: 'settings',
      icon: 'settings'
    }, {
      label: 'Help',
      value: 'help',
      icon: 'help'
    }, {
      label: 'Sign Out',
      value: 'logout',
      icon: 'logout'
    }]
  }, {
    triggerText: 'Status',
    options: [{
      label: 'Available',
      value: 'available',
      icon: 'check_circle'
    }, {
      label: 'Busy',
      value: 'busy',
      icon: 'error'
    }, {
      label: 'Away',
      value: 'away',
      icon: 'schedule'
    }, {
      label: 'Offline',
      value: 'offline',
      icon: 'offline_bolt'
    }]
  }];
  dropdowns.forEach(({
    triggerText,
    options
  }) => {
    const dropdown = document.createElement('my-dropdown');
    dropdown.setAttribute('trigger-text', triggerText);
    dropdown.setAttribute('options', JSON.stringify(options));
    dropdown.addEventListener('select', e => {
      console.log(\`\${triggerText} selected:\`, e.detail);
    });
    container.appendChild(dropdown);
  });
  return container;
}`,...(f=(y=s.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var w,h,E;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 80px; padding: 60px; min-height: 400px; place-items: center;';
  const positions = ['top', 'bottom', 'left', 'right'];
  positions.forEach(position => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const dropdown = document.createElement('my-dropdown');
    dropdown.setAttribute('trigger-text', \`\${position.charAt(0).toUpperCase()}\${position.slice(1)}\`);
    dropdown.setAttribute('position', position);
    dropdown.setAttribute('options', JSON.stringify([{
      label: 'Option 1',
      value: 'opt1'
    }, {
      label: 'Option 2',
      value: 'opt2'
    }, {
      label: 'Option 3',
      value: 'opt3'
    }]));
    const label = document.createElement('span');
    label.textContent = \`Position: \${position}\`;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(dropdown);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(E=(h=d.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var A,C,S;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: flex-start;';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const dropdown = document.createElement('my-dropdown');
    dropdown.setAttribute('trigger-text', \`Size \${size.toUpperCase()}\`);
    dropdown.setAttribute('size', size);
    dropdown.setAttribute('options', JSON.stringify([{
      label: 'Small option',
      value: 'sm-opt'
    }, {
      label: 'Medium option',
      value: 'md-opt'
    }, {
      label: 'Large option',
      value: 'lg-opt'
    }]));
    const label = document.createElement('span');
    label.textContent = size.toUpperCase();
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(dropdown);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(S=(C=c.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var T,O,_;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: flex-start;';
  const states = [{
    name: 'Normal',
    disabled: false
  }, {
    name: 'Disabled',
    disabled: true
  }];
  states.forEach(({
    name,
    disabled
  }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const dropdown = document.createElement('my-dropdown');
    dropdown.setAttribute('trigger-text', \`\${name} Dropdown\`);
    if (disabled) dropdown.setAttribute('disabled', '');
    dropdown.setAttribute('options', JSON.stringify([{
      label: 'Option 1',
      value: 'opt1'
    }, {
      label: 'Option 2',
      value: 'opt2'
    }, {
      label: 'Option 3',
      value: 'opt3'
    }]));
    const label = document.createElement('span');
    label.textContent = name;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(dropdown);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(_=(O=p.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var k,N,z;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap;';

  // Navigation menu
  const navMenu = document.createElement('my-dropdown');
  navMenu.setAttribute('trigger-text', 'Navigation');
  navMenu.setAttribute('options', JSON.stringify([{
    label: 'Dashboard',
    value: 'dashboard',
    icon: 'dashboard'
  }, {
    label: 'Projects',
    value: 'projects',
    icon: 'folder'
  }, {
    label: 'Tasks',
    value: 'tasks',
    icon: 'task_alt'
  }, {
    label: 'Calendar',
    value: 'calendar',
    icon: 'calendar_today'
  }, {
    label: 'Reports',
    value: 'reports',
    icon: 'assessment'
  }, {
    label: 'Team',
    value: 'team',
    icon: 'group'
  }]));

  // Context menu
  const contextMenu = document.createElement('my-dropdown');
  contextMenu.setAttribute('trigger-text', 'Right Click Menu');
  contextMenu.setAttribute('options', JSON.stringify([{
    label: 'Cut',
    value: 'cut',
    icon: 'content_cut'
  }, {
    label: 'Copy',
    value: 'copy',
    icon: 'content_copy'
  }, {
    label: 'Paste',
    value: 'paste',
    icon: 'content_paste'
  }, {
    label: 'Select All',
    value: 'select-all',
    icon: 'select_all'
  }, {
    label: 'Properties',
    value: 'properties',
    icon: 'info'
  }]));

  // Sort menu
  const sortMenu = document.createElement('my-dropdown');
  sortMenu.setAttribute('trigger-text', 'Sort Options');
  sortMenu.setAttribute('options', JSON.stringify([{
    label: 'Name A-Z',
    value: 'name-asc',
    icon: 'sort_by_alpha'
  }, {
    label: 'Name Z-A',
    value: 'name-desc',
    icon: 'sort_by_alpha'
  }, {
    label: 'Date Modified',
    value: 'date-modified',
    icon: 'schedule'
  }, {
    label: 'Size',
    value: 'size',
    icon: 'storage'
  }, {
    label: 'Type',
    value: 'type',
    icon: 'category'
  }]));
  [navMenu, contextMenu, sortMenu].forEach(dropdown => {
    dropdown.addEventListener('select', e => {
      console.log('Menu selection:', e.detail);
    });
    container.appendChild(dropdown);
  });
  return container;
}`,...(z=(N=u.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var M,D,J;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 16px; max-width: 400px;';
  const title = document.createElement('h3');
  title.textContent = 'Keyboard Navigation Demo';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const instructions = document.createElement('div');
  instructions.style.cssText = 'padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); font-size: 14px; line-height: 1.5;';
  instructions.innerHTML = \`
    <strong>Keyboard Navigation:</strong><br>
    • <kbd>Enter</kbd> or <kbd>Space</kbd> - Open/close dropdown<br>
    • <kbd>↑</kbd> <kbd>↓</kbd> - Navigate options<br>
    • <kbd>Enter</kbd> - Select option<br>
    • <kbd>Escape</kbd> - Close dropdown<br>
    • <kbd>Tab</kbd> - Move to next element
  \`;
  const dropdown = document.createElement('my-dropdown');
  dropdown.setAttribute('trigger-text', 'Try Keyboard Navigation');
  dropdown.setAttribute('options', JSON.stringify([{
    label: 'First Option',
    value: 'first'
  }, {
    label: 'Second Option',
    value: 'second'
  }, {
    label: 'Third Option',
    value: 'third'
  }, {
    label: 'Fourth Option',
    value: 'fourth'
  }, {
    label: 'Fifth Option',
    value: 'fifth'
  }]));
  dropdown.addEventListener('select', e => {
    const result = document.querySelector('#keyboard-result');
    result.textContent = \`Selected: \${e.detail.label}\`;
    result.style.color = 'var(--_global-color-success)';
  });
  const result = document.createElement('div');
  result.id = 'keyboard-result';
  result.textContent = 'No selection yet';
  result.style.cssText = 'padding: 8px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  container.appendChild(title);
  container.appendChild(instructions);
  container.appendChild(dropdown);
  container.appendChild(result);
  return container;
}`,...(J=(D=b.parameters)==null?void 0:D.docs)==null?void 0:J.source}}};const U=["Default","WithIcons","Positions","Sizes","States","ComplexMenu","KeyboardNavigation"];export{u as ComplexMenu,i as Default,b as KeyboardNavigation,d as Positions,c as Sizes,p as States,s as WithIcons,U as __namedExportsOrder,K as default};
