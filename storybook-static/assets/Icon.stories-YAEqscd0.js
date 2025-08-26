import"./my-icon-O3BbYCXg.js";const P={title:"Components/my-icon",parameters:{docs:{description:{component:"A component for rendering scalable vector icons with built-in SVG library and optional Material Icons fallback."}}},argTypes:{icon:{control:"text",description:"Icon name (uses built-in SVG library or Material Icons)"},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Icon size"},color:{control:"color",description:"Icon color"},disabled:{control:"boolean",description:"Disable the icon"},interactive:{control:"boolean",description:"Make icon interactive (clickable)"},variant:{control:{type:"select"},options:["default","filled","outlined"],description:"Icon variant"},useFontFallback:{control:"boolean",description:"Use Material Icons font fallback for unknown icons"}}},M=e=>{const r=document.createElement("my-icon");return e.icon&&r.setAttribute("icon",e.icon),e.size&&e.size!=="md"&&r.setAttribute("size",e.size),e.color&&r.setAttribute("color",e.color),e.variant&&e.variant!=="default"&&r.setAttribute("variant",e.variant),e.disabled&&r.setAttribute("disabled",""),e.interactive&&r.setAttribute("interactive",""),e.useFontFallback&&r.setAttribute("use-font-fallback",""),e.interactive&&r.addEventListener("click",()=>{console.log("Icon clicked!",e)}),r},c=M.bind({});c.args={icon:"home",size:"md",disabled:!1,interactive:!1,variant:"default",useFontFallback:!1};const s=()=>{const e=document.createElement("div");return e.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; align-items: center;",["home","menu","arrow_back","arrow_forward","close","expand_more","expand_less","search","add","delete","edit","check","person","settings","favorite","star","visibility","visibility_off","error","warning","info","success"].forEach(a=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border-radius: var(--_global-border-radius-md); background: var(--_global-color-surface-container);";const n=document.createElement("my-icon");n.setAttribute("icon",a),n.setAttribute("size","lg");const t=document.createElement("span");t.textContent=a,t.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary); text-align: center; word-break: break-word;",o.appendChild(n),o.appendChild(t),e.appendChild(o)}),e};s.parameters={docs:{description:{story:"All available built-in SVG icons in the component library."}}};const l=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 24px; align-items: center;",["xs","sm","md","lg","xl"].forEach(a=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const n=document.createElement("my-icon");n.setAttribute("icon","star"),n.setAttribute("size",a);const t=document.createElement("span");t.textContent=a.toUpperCase(),t.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",o.appendChild(n),o.appendChild(t),e.appendChild(o)}),e};l.parameters={docs:{description:{story:"Icon sizes from extra small to extra large."}}};const d=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;",[{name:"Default",value:""},{name:"Primary",value:"var(--_global-color-primary)"},{name:"Secondary",value:"var(--_global-color-secondary)"},{name:"Success",value:"var(--_global-color-success)"},{name:"Warning",value:"var(--_global-color-warning)"},{name:"Error",value:"var(--_global-color-error)"},{name:"Info",value:"var(--_global-color-info)"}].forEach(a=>{const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const n=document.createElement("my-icon");n.setAttribute("icon","favorite"),n.setAttribute("size","lg"),a.value&&n.setAttribute("color",a.value);const t=document.createElement("span");t.textContent=a.name,t.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",o.appendChild(n),o.appendChild(t),e.appendChild(o)}),e};d.parameters={docs:{description:{story:"Icons with different color variants using CSS custom properties."}}};const p=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 24px; align-items: center;",[{icon:"favorite",label:"Like"},{icon:"share",label:"Share"},{icon:"settings",label:"Settings"},{icon:"visibility",label:"Toggle View"}].forEach(({icon:a,label:o})=>{const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const t=document.createElement("my-icon");t.setAttribute("icon",a),t.setAttribute("size","lg"),t.setAttribute("interactive",""),t.style.cursor="pointer",t.addEventListener("click",()=>{console.log(`${o} clicked!`),t.style.transform="scale(0.9)",setTimeout(()=>{t.style.transform="scale(1)"},100)});const i=document.createElement("span");i.textContent=o,i.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",n.appendChild(t),n.appendChild(i),e.appendChild(n)}),e};p.parameters={docs:{description:{story:"Interactive icons that respond to clicks. Try clicking them!"}}};const m=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; gap: 24px; align-items: center;",[{name:"Normal",disabled:!1},{name:"Disabled",disabled:!0}].forEach(({name:a,disabled:o})=>{const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const t=document.createElement("my-icon");t.setAttribute("icon","settings"),t.setAttribute("size","lg"),t.setAttribute("interactive",""),o&&t.setAttribute("disabled","");const i=document.createElement("span");i.textContent=a,i.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",n.appendChild(t),n.appendChild(i),e.appendChild(n)}),e};m.parameters={docs:{description:{story:"Different icon states: normal and disabled."}}};const u=()=>{const e=document.createElement("div");return e.style.cssText="display: flex; flex-direction: column; gap: 32px;",[{title:"Navigation Icons",icons:["home","menu","arrow_back","arrow_forward","close","expand_more","expand_less"]},{title:"Action Icons",icons:["search","add","delete","edit","check"]},{title:"User & Social Icons",icons:["person","settings","favorite","star"]},{title:"Status & Feedback Icons",icons:["error","warning","info","success","visibility","visibility_off"]}].forEach(a=>{const o=document.createElement("div"),n=document.createElement("h3");n.textContent=a.title,n.style.cssText="margin: 0 0 16px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);";const t=document.createElement("div");t.style.cssText="display: flex; gap: 16px; flex-wrap: wrap;",a.icons.forEach(i=>{const b=document.createElement("div");b.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px; min-width: 80px;";const x=document.createElement("my-icon");x.setAttribute("icon",i),x.setAttribute("size","md");const g=document.createElement("span");g.textContent=i,g.style.cssText="font-size: 11px; color: var(--_global-color-text-secondary); text-align: center;",b.appendChild(x),b.appendChild(g),t.appendChild(b)}),o.appendChild(n),o.appendChild(t),e.appendChild(o)}),e};u.parameters={docs:{description:{story:"Icons organized by category showing their intended use cases."}}};var f,v,y;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const icon = document.createElement('my-icon');

  // Set properties
  if (args.icon) icon.setAttribute('icon', args.icon);
  if (args.size && args.size !== 'md') icon.setAttribute('size', args.size);
  if (args.color) icon.setAttribute('color', args.color);
  if (args.variant && args.variant !== 'default') icon.setAttribute('variant', args.variant);
  if (args.disabled) icon.setAttribute('disabled', '');
  if (args.interactive) icon.setAttribute('interactive', '');
  if (args.useFontFallback) icon.setAttribute('use-font-fallback', '');

  // Add event listener for demonstration
  if (args.interactive) {
    icon.addEventListener('click', () => {
      console.log('Icon clicked!', args);
    });
  }
  return icon;
}`,...(y=(v=c.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var h,E,w;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; align-items: center;';
  const icons = [
  // Navigation
  'home', 'menu', 'arrow_back', 'arrow_forward', 'close', 'expand_more', 'expand_less',
  // Actions
  'search', 'add', 'delete', 'edit', 'check',
  // User
  'person', 'settings',
  // Status
  'favorite', 'star', 'visibility', 'visibility_off',
  // Feedback
  'error', 'warning', 'info', 'success'];
  icons.forEach(iconName => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px; border-radius: var(--_global-border-radius-md); background: var(--_global-color-surface-container);';
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', iconName);
    icon.setAttribute('size', 'lg');
    const label = document.createElement('span');
    label.textContent = iconName;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary); text-align: center; word-break: break-word;';
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(w=(E=s.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var C,_,A;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', 'star');
    icon.setAttribute('size', size);
    const label = document.createElement('span');
    label.textContent = size.toUpperCase();
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(A=(_=l.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var z,T,k;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center; flex-wrap: wrap;';
  const colors = [{
    name: 'Default',
    value: ''
  }, {
    name: 'Primary',
    value: 'var(--_global-color-primary)'
  }, {
    name: 'Secondary',
    value: 'var(--_global-color-secondary)'
  }, {
    name: 'Success',
    value: 'var(--_global-color-success)'
  }, {
    name: 'Warning',
    value: 'var(--_global-color-warning)'
  }, {
    name: 'Error',
    value: 'var(--_global-color-error)'
  }, {
    name: 'Info',
    value: 'var(--_global-color-info)'
  }];
  colors.forEach(color => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', 'favorite');
    icon.setAttribute('size', 'lg');
    if (color.value) icon.setAttribute('color', color.value);
    const label = document.createElement('span');
    label.textContent = color.name;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(k=(T=d.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};var I,S,F;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  const interactiveIcons = [{
    icon: 'favorite',
    label: 'Like'
  }, {
    icon: 'share',
    label: 'Share'
  }, {
    icon: 'settings',
    label: 'Settings'
  }, {
    icon: 'visibility',
    label: 'Toggle View'
  }];
  interactiveIcons.forEach(({
    icon: iconName,
    label
  }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', iconName);
    icon.setAttribute('size', 'lg');
    icon.setAttribute('interactive', '');
    icon.style.cursor = 'pointer';

    // Add click handler
    icon.addEventListener('click', () => {
      console.log(\`\${label} clicked!\`);
      // Visual feedback
      icon.style.transform = 'scale(0.9)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 100);
    });
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    labelEl.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(icon);
    wrapper.appendChild(labelEl);
    container.appendChild(wrapper);
  });
  return container;
}`,...(F=(S=p.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};var N,D,G;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
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
    const icon = document.createElement('my-icon');
    icon.setAttribute('icon', 'settings');
    icon.setAttribute('size', 'lg');
    icon.setAttribute('interactive', '');
    if (disabled) icon.setAttribute('disabled', '');
    const label = document.createElement('span');
    label.textContent = name;
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(G=(D=m.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var L,U,V;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  const categories = [{
    title: 'Navigation Icons',
    icons: ['home', 'menu', 'arrow_back', 'arrow_forward', 'close', 'expand_more', 'expand_less']
  }, {
    title: 'Action Icons',
    icons: ['search', 'add', 'delete', 'edit', 'check']
  }, {
    title: 'User & Social Icons',
    icons: ['person', 'settings', 'favorite', 'star']
  }, {
    title: 'Status & Feedback Icons',
    icons: ['error', 'warning', 'info', 'success', 'visibility', 'visibility_off']
  }];
  categories.forEach(category => {
    const section = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = category.title;
    title.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);';
    const iconGrid = document.createElement('div');
    iconGrid.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';
    category.icons.forEach(iconName => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 8px; min-width: 80px;';
      const icon = document.createElement('my-icon');
      icon.setAttribute('icon', iconName);
      icon.setAttribute('size', 'md');
      const label = document.createElement('span');
      label.textContent = iconName;
      label.style.cssText = 'font-size: 11px; color: var(--_global-color-text-secondary); text-align: center;';
      wrapper.appendChild(icon);
      wrapper.appendChild(label);
      iconGrid.appendChild(wrapper);
    });
    section.appendChild(title);
    section.appendChild(iconGrid);
    container.appendChild(section);
  });
  return container;
}`,...(V=(U=u.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};const W=["Default","BuiltInIcons","Sizes","Colors","Interactive","States","Categories"];export{s as BuiltInIcons,u as Categories,d as Colors,c as Default,p as Interactive,l as Sizes,m as States,W as __namedExportsOrder,P as default};
