import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const Ee={title:"Components/Progress",parameters:{docs:{description:{component:"Progress components for displaying task progress, loading states, and completion status with enhanced Material Design 3 styling."}},layout:"padded"}},y=()=>{const e=document.createElement("div");e.style.cssText=`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 800px;
    font-family: var(--_global-font-family-sans);
  `;const t=document.createElement("div");t.innerHTML=`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Basic Progress Bars</h3>
  `;const r=document.createElement("div");r.style.cssText="display: grid; gap: 1rem;",[{label:"Primary Progress",value:25,variant:"primary"},{label:"Secondary Progress",value:45,variant:"secondary"},{label:"Success Progress",value:65,variant:"success"},{label:"Warning Progress",value:80,variant:"warning"},{label:"Error Progress",value:35,variant:"error"},{label:"Info Progress",value:55,variant:"info"}].forEach(({label:c,value:u,variant:i})=>{const s=document.createElement("my-progress");s.setAttribute("label",c),s.setAttribute("value",u),s.setAttribute("variant",i),s.setAttribute("show-value",""),r.appendChild(s)}),t.appendChild(r),e.appendChild(t);const o=document.createElement("div");o.innerHTML=`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>
  `;const n=document.createElement("div");n.style.cssText="display: grid; gap: 1rem;",[{label:"Small Progress",value:40,size:"sm"},{label:"Medium Progress",value:60,size:"md"},{label:"Large Progress",value:80,size:"lg"}].forEach(({label:c,value:u,size:i})=>{const s=document.createElement("my-progress");s.setAttribute("label",c),s.setAttribute("value",u),s.setAttribute("size",i),s.setAttribute("show-value",""),n.appendChild(s)}),o.appendChild(n),e.appendChild(o);const m=document.createElement("div");m.innerHTML=`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Special States</h3>
  `;const d=document.createElement("div");d.style.cssText="display: grid; gap: 1rem;";const z=document.createElement("my-progress");z.setAttribute("label","Loading..."),z.setAttribute("indeterminate",""),d.appendChild(z);const p=document.createElement("my-progress");p.setAttribute("label","Striped Progress"),p.setAttribute("value","70"),p.setAttribute("variant","striped"),p.setAttribute("show-value",""),d.appendChild(p);const g=document.createElement("my-progress");g.setAttribute("label","Animated Progress"),g.setAttribute("value","45"),g.setAttribute("animated",""),g.setAttribute("show-value",""),d.appendChild(g);const b=document.createElement("my-progress");b.setAttribute("label","Buffered Progress"),b.setAttribute("value","30"),b.setAttribute("buffer-value","60"),b.setAttribute("show-value",""),d.appendChild(b),m.appendChild(d),e.appendChild(m);const T=document.createElement("div");T.innerHTML=`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Circular Progress</h3>
  `;const h=document.createElement("div");h.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap;",[{label:"Small Circular",value:30,size:"sm"},{label:"Medium Circular",value:65,size:"md"},{label:"Large Circular",value:90,size:"lg"}].forEach(({label:c,value:u,size:i})=>{const s=document.createElement("my-progress");s.setAttribute("label",c),s.setAttribute("value",u),s.setAttribute("type","circular"),s.setAttribute("size",i),s.setAttribute("show-value",""),s.setAttribute("variant","primary"),h.appendChild(s)});const v=document.createElement("my-progress");v.setAttribute("label","Loading"),v.setAttribute("type","circular"),v.setAttribute("indeterminate",""),v.setAttribute("size","md"),h.appendChild(v),T.appendChild(h),e.appendChild(T);const L=document.createElement("div");L.innerHTML=`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Interactive Demo</h3>
  `;const A=document.createElement("div");A.style.cssText="display: flex; flex-direction: column; gap: 1rem;";const l=document.createElement("my-progress");l.setAttribute("label","Interactive Progress"),l.setAttribute("value","0"),l.setAttribute("show-value",""),l.setAttribute("animated",""),l.setAttribute("tooltip","Click to interact");const k=document.createElement("div");k.style.cssText="display: flex; gap: 0.5rem; flex-wrap: wrap;",[{label:"25%",value:25},{label:"50%",value:50},{label:"75%",value:75},{label:"100%",value:100},{label:"Reset",value:0}].forEach(({label:c,value:u})=>{const i=document.createElement("my-button");i.setAttribute("label",c),i.setAttribute("variant","outlined"),i.setAttribute("size","sm"),i.addEventListener("click",()=>{l.value=u}),k.appendChild(i)});const G=document.createElement("my-toggle");return G.setAttribute("label","Indeterminate"),G.addEventListener("change",c=>{c.detail.checked?l.setAttribute("indeterminate",""):l.removeAttribute("indeterminate")}),A.appendChild(l),A.appendChild(k),A.appendChild(G),L.appendChild(A),e.appendChild(L),e},P=()=>{const e=document.createElement("my-progress");return e.setAttribute("label","Basic Progress"),e.setAttribute("value","65"),e.setAttribute("show-value",""),e},C=()=>{const e=document.createElement("my-progress");return e.setAttribute("label","Loading..."),e.setAttribute("indeterminate",""),e},E=()=>{const e=document.createElement("div");e.style.cssText="display: flex; gap: 2rem; align-items: center;";const t=document.createElement("my-progress");t.setAttribute("type","circular"),t.setAttribute("value","75"),t.setAttribute("show-value",""),t.setAttribute("label","Complete");const r=document.createElement("my-progress");return r.setAttribute("type","circular"),r.setAttribute("indeterminate",""),r.setAttribute("label","Loading"),e.appendChild(t),e.appendChild(r),e},f=()=>{const e=document.createElement("my-progress");return e.setAttribute("label","Video Loading"),e.setAttribute("value","30"),e.setAttribute("buffer-value","60"),e.setAttribute("show-value",""),e.setAttribute("tooltip","Download progress with buffer"),e},x=()=>{const e=document.createElement("div");e.style.cssText="display: grid; gap: 1rem; max-width: 600px;";const t=["primary","secondary","success","warning","error","info","striped"],r=[25,35,45,55,65,75,85];return t.forEach((a,o)=>{const n=document.createElement("my-progress");n.setAttribute("label",`${a.charAt(0).toUpperCase()+a.slice(1)} Progress`),n.setAttribute("value",r[o]),n.setAttribute("variant",a),n.setAttribute("show-value",""),e.appendChild(n)}),e},w=()=>{const e=document.createElement("div");e.style.cssText="display: grid; gap: 1rem; max-width: 400px;";const t=["sm","md","lg"],r=[40,60,80];return t.forEach((a,o)=>{const n=document.createElement("my-progress");n.setAttribute("label",`${a.toUpperCase()} Progress`),n.setAttribute("value",r[o]),n.setAttribute("size",a),n.setAttribute("show-value",""),e.appendChild(n)}),e},S=()=>{const e=document.createElement("div");e.style.cssText="display: grid; gap: 1.5rem; max-width: 600px;";const t=document.createElement("my-progress");t.setAttribute("label","File Upload Progress"),t.setAttribute("value","67"),t.setAttribute("show-value",""),t.setAttribute("tooltip","Uploading file: document.pdf");const r=document.createElement("my-progress");r.setAttribute("label","Custom Range (10-90)"),r.setAttribute("value","45"),r.setAttribute("min","10"),r.setAttribute("max","90"),r.setAttribute("show-value","");const a=document.createElement("my-progress");return a.setAttribute("label","Clickable Progress"),a.setAttribute("value","30"),a.setAttribute("show-value",""),a.setAttribute("tooltip","Click anywhere to set progress"),a.addEventListener("click",o=>{const n=o.currentTarget.getBoundingClientRect(),m=(o.clientX-n.left)/n.width*100;a.setAttribute("value",Math.round(m))}),e.appendChild(t),e.appendChild(r),e.appendChild(a),e};var V,B,M;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 800px;
    font-family: var(--_global-font-family-sans);
  \`;

  // Basic Progress Bars
  const basicSection = document.createElement('div');
  basicSection.innerHTML = \`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Basic Progress Bars</h3>
  \`;
  const basicGrid = document.createElement('div');
  basicGrid.style.cssText = 'display: grid; gap: 1rem;';
  const basicVariants = [{
    label: 'Primary Progress',
    value: 25,
    variant: 'primary'
  }, {
    label: 'Secondary Progress',
    value: 45,
    variant: 'secondary'
  }, {
    label: 'Success Progress',
    value: 65,
    variant: 'success'
  }, {
    label: 'Warning Progress',
    value: 80,
    variant: 'warning'
  }, {
    label: 'Error Progress',
    value: 35,
    variant: 'error'
  }, {
    label: 'Info Progress',
    value: 55,
    variant: 'info'
  }];
  basicVariants.forEach(({
    label,
    value,
    variant
  }) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', label);
    progress.setAttribute('value', value);
    progress.setAttribute('variant', variant);
    progress.setAttribute('show-value', '');
    basicGrid.appendChild(progress);
  });
  basicSection.appendChild(basicGrid);
  container.appendChild(basicSection);

  // Size Variants
  const sizeSection = document.createElement('div');
  sizeSection.innerHTML = \`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>
  \`;
  const sizeGrid = document.createElement('div');
  sizeGrid.style.cssText = 'display: grid; gap: 1rem;';
  const sizeVariants = [{
    label: 'Small Progress',
    value: 40,
    size: 'sm'
  }, {
    label: 'Medium Progress',
    value: 60,
    size: 'md'
  }, {
    label: 'Large Progress',
    value: 80,
    size: 'lg'
  }];
  sizeVariants.forEach(({
    label,
    value,
    size
  }) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', label);
    progress.setAttribute('value', value);
    progress.setAttribute('size', size);
    progress.setAttribute('show-value', '');
    sizeGrid.appendChild(progress);
  });
  sizeSection.appendChild(sizeGrid);
  container.appendChild(sizeSection);

  // Special States
  const statesSection = document.createElement('div');
  statesSection.innerHTML = \`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Special States</h3>
  \`;
  const statesGrid = document.createElement('div');
  statesGrid.style.cssText = 'display: grid; gap: 1rem;';

  // Indeterminate progress
  const indeterminateProgress = document.createElement('my-progress');
  indeterminateProgress.setAttribute('label', 'Loading...');
  indeterminateProgress.setAttribute('indeterminate', '');
  statesGrid.appendChild(indeterminateProgress);

  // Striped progress
  const stripedProgress = document.createElement('my-progress');
  stripedProgress.setAttribute('label', 'Striped Progress');
  stripedProgress.setAttribute('value', '70');
  stripedProgress.setAttribute('variant', 'striped');
  stripedProgress.setAttribute('show-value', '');
  statesGrid.appendChild(stripedProgress);

  // Animated progress
  const animatedProgress = document.createElement('my-progress');
  animatedProgress.setAttribute('label', 'Animated Progress');
  animatedProgress.setAttribute('value', '45');
  animatedProgress.setAttribute('animated', '');
  animatedProgress.setAttribute('show-value', '');
  statesGrid.appendChild(animatedProgress);

  // Buffer progress
  const bufferProgress = document.createElement('my-progress');
  bufferProgress.setAttribute('label', 'Buffered Progress');
  bufferProgress.setAttribute('value', '30');
  bufferProgress.setAttribute('buffer-value', '60');
  bufferProgress.setAttribute('show-value', '');
  statesGrid.appendChild(bufferProgress);
  statesSection.appendChild(statesGrid);
  container.appendChild(statesSection);

  // Circular Progress
  const circularSection = document.createElement('div');
  circularSection.innerHTML = \`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Circular Progress</h3>
  \`;
  const circularGrid = document.createElement('div');
  circularGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap;';
  const circularVariants = [{
    label: 'Small Circular',
    value: 30,
    size: 'sm'
  }, {
    label: 'Medium Circular',
    value: 65,
    size: 'md'
  }, {
    label: 'Large Circular',
    value: 90,
    size: 'lg'
  }];
  circularVariants.forEach(({
    label,
    value,
    size
  }) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', label);
    progress.setAttribute('value', value);
    progress.setAttribute('type', 'circular');
    progress.setAttribute('size', size);
    progress.setAttribute('show-value', '');
    progress.setAttribute('variant', 'primary');
    circularGrid.appendChild(progress);
  });

  // Indeterminate circular
  const indeterminateCircular = document.createElement('my-progress');
  indeterminateCircular.setAttribute('label', 'Loading');
  indeterminateCircular.setAttribute('type', 'circular');
  indeterminateCircular.setAttribute('indeterminate', '');
  indeterminateCircular.setAttribute('size', 'md');
  circularGrid.appendChild(indeterminateCircular);
  circularSection.appendChild(circularGrid);
  container.appendChild(circularSection);

  // Interactive Demo
  const interactiveSection = document.createElement('div');
  interactiveSection.innerHTML = \`
    <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Interactive Demo</h3>
  \`;
  const interactiveContainer = document.createElement('div');
  interactiveContainer.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  const demoProgress = document.createElement('my-progress');
  demoProgress.setAttribute('label', 'Interactive Progress');
  demoProgress.setAttribute('value', '0');
  demoProgress.setAttribute('show-value', '');
  demoProgress.setAttribute('animated', '');
  demoProgress.setAttribute('tooltip', 'Click to interact');
  const controlsContainer = document.createElement('div');
  controlsContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap;';

  // Create control buttons
  const buttons = [{
    label: '25%',
    value: 25
  }, {
    label: '50%',
    value: 50
  }, {
    label: '75%',
    value: 75
  }, {
    label: '100%',
    value: 100
  }, {
    label: 'Reset',
    value: 0
  }];
  buttons.forEach(({
    label,
    value
  }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      demoProgress.value = value;
    });
    controlsContainer.appendChild(button);
  });

  // Add indeterminate toggle
  const indeterminateToggle = document.createElement('my-toggle');
  indeterminateToggle.setAttribute('label', 'Indeterminate');
  indeterminateToggle.addEventListener('change', e => {
    if (e.detail.checked) {
      demoProgress.setAttribute('indeterminate', '');
    } else {
      demoProgress.removeAttribute('indeterminate');
    }
  });
  interactiveContainer.appendChild(demoProgress);
  interactiveContainer.appendChild(controlsContainer);
  interactiveContainer.appendChild(indeterminateToggle);
  interactiveSection.appendChild(interactiveContainer);
  container.appendChild(interactiveSection);
  return container;
}`,...(M=(B=y.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var _,R,I;P.parameters={...P.parameters,docs:{...(_=P.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  const progress = document.createElement('my-progress');
  progress.setAttribute('label', 'Basic Progress');
  progress.setAttribute('value', '65');
  progress.setAttribute('show-value', '');
  return progress;
}`,...(I=(R=P.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};var H,D,U;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const progress = document.createElement('my-progress');
  progress.setAttribute('label', 'Loading...');
  progress.setAttribute('indeterminate', '');
  return progress;
}`,...(U=(D=C.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var X,W,$;E.parameters={...E.parameters,docs:{...(X=E.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; align-items: center;';
  const progress1 = document.createElement('my-progress');
  progress1.setAttribute('type', 'circular');
  progress1.setAttribute('value', '75');
  progress1.setAttribute('show-value', '');
  progress1.setAttribute('label', 'Complete');
  const progress2 = document.createElement('my-progress');
  progress2.setAttribute('type', 'circular');
  progress2.setAttribute('indeterminate', '');
  progress2.setAttribute('label', 'Loading');
  container.appendChild(progress1);
  container.appendChild(progress2);
  return container;
}`,...($=(W=E.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var F,O,j;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const progress = document.createElement('my-progress');
  progress.setAttribute('label', 'Video Loading');
  progress.setAttribute('value', '30');
  progress.setAttribute('buffer-value', '60');
  progress.setAttribute('show-value', '');
  progress.setAttribute('tooltip', 'Download progress with buffer');
  return progress;
}`,...(j=(O=f.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var q,J,K;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; gap: 1rem; max-width: 600px;';
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'striped'];
  const values = [25, 35, 45, 55, 65, 75, 85];
  variants.forEach((variant, index) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', \`\${variant.charAt(0).toUpperCase() + variant.slice(1)} Progress\`);
    progress.setAttribute('value', values[index]);
    progress.setAttribute('variant', variant);
    progress.setAttribute('show-value', '');
    container.appendChild(progress);
  });
  return container;
}`,...(K=(J=x.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var N,Q,Y;w.parameters={...w.parameters,docs:{...(N=w.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; gap: 1rem; max-width: 400px;';
  const sizes = ['sm', 'md', 'lg'];
  const values = [40, 60, 80];
  sizes.forEach((size, index) => {
    const progress = document.createElement('my-progress');
    progress.setAttribute('label', \`\${size.toUpperCase()} Progress\`);
    progress.setAttribute('value', values[index]);
    progress.setAttribute('size', size);
    progress.setAttribute('show-value', '');
    container.appendChild(progress);
  });
  return container;
}`,...(Y=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var Z,ee,te;S.parameters={...S.parameters,docs:{...(Z=S.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; gap: 1.5rem; max-width: 600px;';

  // Properly labeled progress
  const labeledProgress = document.createElement('my-progress');
  labeledProgress.setAttribute('label', 'File Upload Progress');
  labeledProgress.setAttribute('value', '67');
  labeledProgress.setAttribute('show-value', '');
  labeledProgress.setAttribute('tooltip', 'Uploading file: document.pdf');

  // Progress with custom range
  const customRangeProgress = document.createElement('my-progress');
  customRangeProgress.setAttribute('label', 'Custom Range (10-90)');
  customRangeProgress.setAttribute('value', '45');
  customRangeProgress.setAttribute('min', '10');
  customRangeProgress.setAttribute('max', '90');
  customRangeProgress.setAttribute('show-value', '');

  // Clickable progress
  const clickableProgress = document.createElement('my-progress');
  clickableProgress.setAttribute('label', 'Clickable Progress');
  clickableProgress.setAttribute('value', '30');
  clickableProgress.setAttribute('show-value', '');
  clickableProgress.setAttribute('tooltip', 'Click anywhere to set progress');

  // Add click handler
  clickableProgress.addEventListener('click', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width * 100;
    clickableProgress.setAttribute('value', Math.round(percentage));
  });
  container.appendChild(labeledProgress);
  container.appendChild(customRangeProgress);
  container.appendChild(clickableProgress);
  return container;
}`,...(te=(ee=S.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const fe=["AllVariants","BasicProgress","IndeterminateProgress","CircularProgress","WithBuffer","VariantShowcase","SizeComparison","AccessibilityDemo"];export{S as AccessibilityDemo,y as AllVariants,P as BasicProgress,E as CircularProgress,C as IndeterminateProgress,w as SizeComparison,x as VariantShowcase,f as WithBuffer,fe as __namedExportsOrder,Ee as default};
