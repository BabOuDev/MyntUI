import"./my-button-WudZcNwy.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const q={title:"Components/my-button",parameters:{docs:{description:{component:"A Material Design 3 button component with enhanced state layers, accessibility, and consistency. Supports multiple variants, sizes, and states."}}},argTypes:{label:{control:"text",description:"Button text content"},variant:{control:{type:"select"},options:["filled","filled-tonal","elevated","outlined","text","primary","secondary","ghost","success","error","danger"],description:"Button variant style"},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"],description:"Button size"},density:{control:{type:"select"},options:["default","compact"],description:"Button density for spacing"},disabled:{control:"boolean",description:"Disable the button"},loading:{control:"boolean",description:"Show loading spinner"},fab:{control:"boolean",description:"Floating Action Button style"},iconOnly:{control:"boolean",description:"Icon-only button (circular)"},elevated:{control:"boolean",description:"Add elevation shadow"},filledTonal:{control:"boolean",description:"Use filled tonal variant"}}},N=t=>{const n=document.createElement("my-button");return t.label&&n.setAttribute("label",t.label),t.variant&&t.variant!=="filled"&&n.setAttribute("variant",t.variant),t.size&&t.size!=="md"&&n.setAttribute("size",t.size),t.density&&t.density!=="default"&&n.setAttribute("density",t.density),t.disabled&&n.setAttribute("disabled",""),t.loading&&n.setAttribute("loading",""),t.fab&&n.setAttribute("fab",""),t.iconOnly&&n.setAttribute("icon-only",""),t.elevated&&n.setAttribute("elevated",""),t.filledTonal&&n.setAttribute("filled-tonal",""),n.addEventListener("click",()=>{console.log("Button clicked!",t)}),n},l=N.bind({});l.args={label:"Button",variant:"filled",size:"md",density:"default",disabled:!1,loading:!1,fab:!1,iconOnly:!1,elevated:!1,filledTonal:!1};const c=()=>{const t=document.createElement("div");return t.style.cssText="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;",["filled","filled-tonal","elevated","outlined","text","secondary","ghost","success","error"].forEach(o=>{const e=document.createElement("my-button");e.setAttribute("label",o),e.setAttribute("variant",o),t.appendChild(e)}),t};c.parameters={docs:{description:{story:"All available button variants following Material Design 3 principles."}}};const d=()=>{const t=document.createElement("div");return t.style.cssText="display: flex; gap: 16px; align-items: center;",["xs","sm","md","lg","xl"].forEach(o=>{const e=document.createElement("my-button");e.setAttribute("label",o.toUpperCase()),e.setAttribute("size",o),t.appendChild(e)}),t};d.parameters={docs:{description:{story:"Button sizes from extra small to extra large."}}};const p=()=>{const t=document.createElement("div");t.style.cssText="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;";const n=document.createElement("my-button");n.setAttribute("label","Normal"),t.appendChild(n);const o=document.createElement("my-button");o.setAttribute("label","Disabled"),o.setAttribute("disabled",""),t.appendChild(o);const e=document.createElement("my-button");return e.setAttribute("label","Loading"),e.setAttribute("loading",""),t.appendChild(e),t};p.parameters={docs:{description:{story:"Different button states: normal, disabled, and loading."}}};const u=()=>{const t=document.createElement("div");return t.style.cssText="display: flex; gap: 16px; align-items: center;",["sm","md","lg"].forEach(o=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const i=document.createElement("my-button");i.setAttribute("fab",""),i.setAttribute("size",o),i.innerHTML='<my-icon icon="add"></my-icon>';const a=document.createElement("span");a.textContent=`FAB ${o.toUpperCase()}`,a.style.fontSize="12px",a.style.color="var(--_global-color-text-secondary)",e.appendChild(i),e.appendChild(a),t.appendChild(e)}),t};u.parameters={docs:{description:{story:"Floating Action Button (FAB) variants in different sizes."}}};const m=()=>{const t=document.createElement("div");t.style.cssText="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;";const n=["filled","outlined","text"],o=["favorite","share","more_vert"];return n.forEach((e,i)=>{const a=document.createElement("div");a.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const r=document.createElement("my-button");r.setAttribute("icon-only",""),r.setAttribute("variant",e),r.innerHTML=`<my-icon icon="${o[i]}"></my-icon>`;const s=document.createElement("span");s.textContent=e,s.style.fontSize="12px",s.style.color="var(--_global-color-text-secondary)",a.appendChild(r),a.appendChild(s),t.appendChild(a)}),t};m.parameters={docs:{description:{story:"Icon-only buttons in different variants."}}};const b=()=>{const t=document.createElement("div");return t.style.cssText="display: flex; gap: 24px; align-items: center;",["default","compact"].forEach(o=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 12px; align-items: center;";const i=document.createElement("h4");i.textContent=`${o.charAt(0).toUpperCase()}${o.slice(1)}`,i.style.margin="0",i.style.fontSize="14px",i.style.color="var(--_global-color-text-secondary)";const a=document.createElement("div");a.style.cssText="display: flex; gap: 8px;",["sm","md","lg"].forEach(r=>{const s=document.createElement("my-button");s.setAttribute("label",r.toUpperCase()),s.setAttribute("size",r),s.setAttribute("density",o),a.appendChild(s)}),e.appendChild(i),e.appendChild(a),t.appendChild(e)}),t};b.parameters={docs:{description:{story:"Comparison between default and compact button densities."}}};const y=()=>{const t=document.createElement("div");t.style.cssText="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;";const n=document.createElement("my-button");n.setAttribute("label","Download"),n.innerHTML='<my-icon icon="download" slot="left"></my-icon>Download';const o=document.createElement("my-button");o.setAttribute("variant","outlined"),o.innerHTML='Next <my-icon icon="arrow_forward" slot="right"></my-icon>';const e=document.createElement("my-button");return e.setAttribute("variant","text"),e.innerHTML='<my-icon icon="favorite" slot="left"></my-icon>Like<my-icon icon="thumb_up" slot="right"></my-icon>',t.appendChild(n),t.appendChild(o),t.appendChild(e),t};y.parameters={docs:{description:{story:"Buttons with icons using slot positioning."}}};var f,x,g;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const button = document.createElement('my-button');

  // Set properties
  if (args.label) button.setAttribute('label', args.label);
  if (args.variant && args.variant !== 'filled') button.setAttribute('variant', args.variant);
  if (args.size && args.size !== 'md') button.setAttribute('size', args.size);
  if (args.density && args.density !== 'default') button.setAttribute('density', args.density);
  if (args.disabled) button.setAttribute('disabled', '');
  if (args.loading) button.setAttribute('loading', '');
  if (args.fab) button.setAttribute('fab', '');
  if (args.iconOnly) button.setAttribute('icon-only', '');
  if (args.elevated) button.setAttribute('elevated', '');
  if (args.filledTonal) button.setAttribute('filled-tonal', '');

  // Add event listener for demonstration
  button.addEventListener('click', () => {
    console.log('Button clicked!', args);
  });
  return button;
}`,...(g=(x=l.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,v,A;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; align-items: center;';
  const variants = ['filled', 'filled-tonal', 'elevated', 'outlined', 'text', 'secondary', 'ghost', 'success', 'error'];
  variants.forEach(variant => {
    const button = document.createElement('my-button');
    button.setAttribute('label', variant);
    button.setAttribute('variant', variant);
    container.appendChild(button);
  });
  return container;
}`,...(A=(v=c.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var E,w,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center;';
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  sizes.forEach(size => {
    const button = document.createElement('my-button');
    button.setAttribute('label', size.toUpperCase());
    button.setAttribute('size', size);
    container.appendChild(button);
  });
  return container;
}`,...(C=(w=d.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var z,T,I;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';

  // Normal
  const normal = document.createElement('my-button');
  normal.setAttribute('label', 'Normal');
  container.appendChild(normal);

  // Disabled
  const disabled = document.createElement('my-button');
  disabled.setAttribute('label', 'Disabled');
  disabled.setAttribute('disabled', '');
  container.appendChild(disabled);

  // Loading
  const loading = document.createElement('my-button');
  loading.setAttribute('label', 'Loading');
  loading.setAttribute('loading', '');
  container.appendChild(loading);
  return container;
}`,...(I=(T=p.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var S,B,L;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center;';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const button = document.createElement('my-button');
    button.setAttribute('fab', '');
    button.setAttribute('size', size);
    button.innerHTML = '<my-icon icon="add"></my-icon>';
    const label = document.createElement('span');
    label.textContent = \`FAB \${size.toUpperCase()}\`;
    label.style.fontSize = '12px';
    label.style.color = 'var(--_global-color-text-secondary)';
    wrapper.appendChild(button);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(L=(B=u.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var D,_,M;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
  const variants = ['filled', 'outlined', 'text'];
  const icons = ['favorite', 'share', 'more_vert'];
  variants.forEach((variant, index) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const button = document.createElement('my-button');
    button.setAttribute('icon-only', '');
    button.setAttribute('variant', variant);
    button.innerHTML = \`<my-icon icon="\${icons[index]}"></my-icon>\`;
    const label = document.createElement('span');
    label.textContent = variant;
    label.style.fontSize = '12px';
    label.style.color = 'var(--_global-color-text-secondary)';
    wrapper.appendChild(button);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
  return container;
}`,...(M=(_=m.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var H,U,$;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
  const densities = ['default', 'compact'];
  densities.forEach(density => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 12px; align-items: center;';
    const title = document.createElement('h4');
    title.textContent = \`\${density.charAt(0).toUpperCase()}\${density.slice(1)}\`;
    title.style.margin = '0';
    title.style.fontSize = '14px';
    title.style.color = 'var(--_global-color-text-secondary)';
    const buttons = document.createElement('div');
    buttons.style.cssText = 'display: flex; gap: 8px;';
    ['sm', 'md', 'lg'].forEach(size => {
      const button = document.createElement('my-button');
      button.setAttribute('label', size.toUpperCase());
      button.setAttribute('size', size);
      button.setAttribute('density', density);
      buttons.appendChild(button);
    });
    wrapper.appendChild(title);
    wrapper.appendChild(buttons);
    container.appendChild(wrapper);
  });
  return container;
}`,...($=(U=b.parameters)==null?void 0:U.docs)==null?void 0:$.source}}};var F,O,k;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';

  // Button with left icon
  const leftIcon = document.createElement('my-button');
  leftIcon.setAttribute('label', 'Download');
  leftIcon.innerHTML = '<my-icon icon="download" slot="left"></my-icon>Download';

  // Button with right icon
  const rightIcon = document.createElement('my-button');
  rightIcon.setAttribute('variant', 'outlined');
  rightIcon.innerHTML = 'Next <my-icon icon="arrow_forward" slot="right"></my-icon>';

  // Button with both icons
  const bothIcons = document.createElement('my-button');
  bothIcons.setAttribute('variant', 'text');
  bothIcons.innerHTML = '<my-icon icon="favorite" slot="left"></my-icon>Like<my-icon icon="thumb_up" slot="right"></my-icon>';
  container.appendChild(leftIcon);
  container.appendChild(rightIcon);
  container.appendChild(bothIcons);
  return container;
}`,...(k=(O=y.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};const G=["Default","Variants","Sizes","States","FloatingActionButtons","IconOnly","Density","WithIcons"];export{l as Default,b as Density,u as FloatingActionButtons,m as IconOnly,d as Sizes,p as States,c as Variants,y as WithIcons,G as __namedExportsOrder,q as default};
