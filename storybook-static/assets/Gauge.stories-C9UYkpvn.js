import"./index-C71BMuB7.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const ze={title:"Components/Gauge",parameters:{docs:{description:{component:"Gauge components for visualizing single numerical values within defined ranges with beautiful Material Design 3 styling and interactive features."}},layout:"padded"}},h=()=>{const e=document.createElement("div");e.style.cssText=`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 1200px;
    font-family: var(--_global-font-family-sans);
  `;const t=document.createElement("div");t.innerHTML=`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Basic Gauges</h3>
  `;const n=document.createElement("div");n.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;",[{label:"CPU Usage",value:35,variant:"primary",unit:"%"},{label:"Memory",value:68,variant:"secondary",unit:"%"},{label:"Network",value:42,variant:"info",unit:"MB/s"},{label:"Temperature",value:78,variant:"warning",unit:"°C"}].forEach(({label:c,value:s,variant:o,unit:l})=>{const u=document.createElement("my-gauge");u.setAttribute("label",c),u.setAttribute("value",s),u.setAttribute("variant",o),u.setAttribute("unit",l),u.setAttribute("show-value",""),n.appendChild(u)}),t.appendChild(n),e.appendChild(t);const i=document.createElement("div");i.innerHTML=`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>
  `;const r=document.createElement("div");r.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: center;",[{label:"Small",value:45,size:"sm"},{label:"Medium",value:65,size:"md"},{label:"Large",value:85,size:"lg"}].forEach(({label:c,value:s,size:o})=>{const l=document.createElement("my-gauge");l.setAttribute("label",c),l.setAttribute("value",s),l.setAttribute("size",o),l.setAttribute("show-value",""),l.setAttribute("unit","%"),r.appendChild(l)}),i.appendChild(r),e.appendChild(i);const T=document.createElement("div");T.innerHTML=`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Status Indicators</h3>
  `;const z=document.createElement("div");z.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;",[{label:"Success",value:95,variant:"success",unit:"%"},{label:"Warning",value:75,variant:"warning",unit:"%"},{label:"Error",value:25,variant:"error",unit:"%"},{label:"Info",value:50,variant:"info",unit:"%"}].forEach(({label:c,value:s,variant:o,unit:l})=>{const u=document.createElement("my-gauge");u.setAttribute("label",c),u.setAttribute("value",s),u.setAttribute("variant",o),u.setAttribute("unit",l),u.setAttribute("show-value",""),z.appendChild(u)}),T.appendChild(z),e.appendChild(T);const _=document.createElement("div");_.innerHTML=`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Advanced Features</h3>
  `;const d=document.createElement("div");d.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;";const b=document.createElement("my-gauge");b.setAttribute("label","With Thresholds"),b.setAttribute("value","85"),b.setAttribute("unit","%"),b.setAttribute("show-value",""),b.setAttribute("thresholds",JSON.stringify([{min:0,max:50,color:"var(--_global-color-success)",label:"Good"},{min:50,max:80,color:"var(--_global-color-warning)",label:"Warning"},{min:80,max:100,color:"var(--_global-color-error)",label:"Critical"}]));const p=document.createElement("my-gauge");p.setAttribute("label","Gradient"),p.setAttribute("value","72"),p.setAttribute("unit","%"),p.setAttribute("show-value",""),p.setAttribute("gradient","");const v=document.createElement("my-gauge");v.setAttribute("label","Animated"),v.setAttribute("value","60"),v.setAttribute("unit","%"),v.setAttribute("show-value",""),v.setAttribute("animated","");const m=document.createElement("my-gauge");m.setAttribute("label","Custom Range"),m.setAttribute("value","150"),m.setAttribute("min","100"),m.setAttribute("max","200"),m.setAttribute("unit"," RPM"),m.setAttribute("show-value",""),d.appendChild(b),d.appendChild(p),d.appendChild(v),d.appendChild(m),_.appendChild(d),e.appendChild(_);const k=document.createElement("div");k.innerHTML=`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Interactive Demo</h3>
  `;const A=document.createElement("div");A.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 2rem;";const g=document.createElement("my-gauge");g.setAttribute("label","Interactive Gauge"),g.setAttribute("value","0"),g.setAttribute("show-value",""),g.setAttribute("animated",""),g.setAttribute("unit","%"),g.setAttribute("tooltip","Use controls below or arrow keys when focused");const M=document.createElement("div");M.style.cssText="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;",[{label:"0%",value:0},{label:"25%",value:25},{label:"50%",value:50},{label:"75%",value:75},{label:"100%",value:100},{label:"Random",value:-1}].forEach(({label:c,value:s})=>{const o=document.createElement("my-button");o.setAttribute("label",c),o.setAttribute("variant","outlined"),o.setAttribute("size","sm"),o.addEventListener("click",()=>{const l=s===-1?Math.floor(Math.random()*101):s;g.value=l}),M.appendChild(o)});const V=document.createElement("div");V.style.cssText="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;",["primary","secondary","success","warning","error","info"].forEach(c=>{const s=document.createElement("my-button");s.setAttribute("label",c),s.setAttribute("variant","text"),s.setAttribute("size","sm"),s.addEventListener("click",()=>{g.setAttribute("variant",c)}),V.appendChild(s)});const U=document.createElement("p");return U.textContent="Click the gauge and use arrow keys, Home/End, or Page Up/Down to control it",U.style.cssText="text-align: center; color: var(--_global-color-text-secondary); font-size: 14px; margin: 0;",A.appendChild(g),A.appendChild(M),A.appendChild(V),A.appendChild(U),k.appendChild(A),e.appendChild(k),e},y=()=>{const e=document.createElement("my-gauge");return e.setAttribute("label","CPU Usage"),e.setAttribute("value","65"),e.setAttribute("unit","%"),e.setAttribute("show-value",""),e},G=()=>{const e=document.createElement("my-gauge");return e.setAttribute("label","System Health"),e.setAttribute("value","85"),e.setAttribute("unit","%"),e.setAttribute("show-value",""),e.setAttribute("tooltip","System health indicator with thresholds"),e.setAttribute("thresholds",JSON.stringify([{min:0,max:60,color:"var(--_global-color-success)",label:"Good"},{min:60,max:85,color:"var(--_global-color-warning)",label:"Warning"},{min:85,max:100,color:"var(--_global-color-error)",label:"Critical"}])),e},w=()=>{const e=document.createElement("div");e.style.cssText="display: flex; gap: 2rem; align-items: center; justify-content: center;";const t=["sm","md","lg"],n=[40,60,80];return t.forEach((a,i)=>{const r=document.createElement("my-gauge");r.setAttribute("label",`${a.toUpperCase()}`),r.setAttribute("value",n[i]),r.setAttribute("size",a),r.setAttribute("show-value",""),r.setAttribute("unit","%"),e.appendChild(r)}),e},x=()=>{const e=document.createElement("div");e.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;";const t=["primary","secondary","success","warning","error","info"],n=[25,35,45,55,65,75];return t.forEach((a,i)=>{const r=document.createElement("my-gauge");r.setAttribute("label",a.charAt(0).toUpperCase()+a.slice(1)),r.setAttribute("value",n[i]),r.setAttribute("variant",a),r.setAttribute("show-value",""),r.setAttribute("unit","%"),e.appendChild(r)}),e},f=()=>{const e=document.createElement("div");e.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;";const t=document.createElement("my-gauge");t.setAttribute("label","Temperature"),t.setAttribute("value","72"),t.setAttribute("min","0"),t.setAttribute("max","100"),t.setAttribute("unit","°C"),t.setAttribute("show-value",""),t.setAttribute("variant","warning");const n=document.createElement("my-gauge");n.setAttribute("label","Speed"),n.setAttribute("value","120"),n.setAttribute("min","0"),n.setAttribute("max","200"),n.setAttribute("unit"," km/h"),n.setAttribute("show-value",""),n.setAttribute("variant","info");const a=document.createElement("my-gauge");return a.setAttribute("label","Pressure"),a.setAttribute("value","2.5"),a.setAttribute("min","0"),a.setAttribute("max","5"),a.setAttribute("unit"," bar"),a.setAttribute("show-value",""),a.setAttribute("variant","success"),e.appendChild(t),e.appendChild(n),e.appendChild(a),e},C=()=>{const e=document.createElement("my-gauge");e.setAttribute("label","Animated Progress"),e.setAttribute("value","75"),e.setAttribute("unit","%"),e.setAttribute("show-value",""),e.setAttribute("animated",""),e.setAttribute("gradient","");let t=75;return setInterval(()=>{t=Math.max(10,Math.min(90,t+(Math.random()-.5)*20)),e.value=Math.round(t)},2e3),e},E=()=>{const e=document.createElement("div");e.style.cssText="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;";const t=document.createElement("my-gauge");t.setAttribute("label","Keyboard Controlled"),t.setAttribute("value","50"),t.setAttribute("unit","%"),t.setAttribute("show-value",""),t.setAttribute("tooltip","Focusable with arrow key controls");const n=document.createElement("my-gauge");n.setAttribute("label","Battery Level"),n.setAttribute("value","23"),n.setAttribute("unit","%"),n.setAttribute("show-value",""),n.setAttribute("variant","error"),n.setAttribute("tooltip","Low battery warning - please charge soon");const a=document.createElement("my-gauge");return a.setAttribute("label","High Contrast"),a.setAttribute("value","67"),a.setAttribute("unit","%"),a.setAttribute("show-value",""),a.style.setProperty("--_global-color-primary","#000000"),a.style.setProperty("--_global-color-text-primary","#000000"),e.appendChild(t),e.appendChild(n),e.appendChild(a),e},S=()=>{const e=document.createElement("div");e.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 800px;";const t=document.createElement("my-gauge");t.setAttribute("label","CPU Usage"),t.setAttribute("value","67"),t.setAttribute("unit","%"),t.setAttribute("show-value",""),t.setAttribute("variant","warning"),t.setAttribute("thresholds",JSON.stringify([{min:0,max:50,color:"var(--_global-color-success)",label:"Normal"},{min:50,max:80,color:"var(--_global-color-warning)",label:"High"},{min:80,max:100,color:"var(--_global-color-error)",label:"Critical"}]));const n=document.createElement("my-gauge");n.setAttribute("label","Memory Usage"),n.setAttribute("value","45"),n.setAttribute("unit","%"),n.setAttribute("show-value",""),n.setAttribute("variant","success");const a=document.createElement("my-gauge");a.setAttribute("label","Disk Usage"),a.setAttribute("value","89"),a.setAttribute("unit","%"),a.setAttribute("show-value",""),a.setAttribute("variant","error");const i=document.createElement("my-gauge");return i.setAttribute("label","Network"),i.setAttribute("value","23"),i.setAttribute("unit"," MB/s"),i.setAttribute("show-value",""),i.setAttribute("variant","info"),i.setAttribute("max","100"),e.appendChild(t),e.appendChild(n),e.appendChild(a),e.appendChild(i),e};var j,L,H;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 1200px;
    font-family: var(--_global-font-family-sans);
  \`;

  // Basic Gauges
  const basicSection = document.createElement('div');
  basicSection.innerHTML = \`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Basic Gauges</h3>
  \`;
  const basicGrid = document.createElement('div');
  basicGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  const basicVariants = [{
    label: 'CPU Usage',
    value: 35,
    variant: 'primary',
    unit: '%'
  }, {
    label: 'Memory',
    value: 68,
    variant: 'secondary',
    unit: '%'
  }, {
    label: 'Network',
    value: 42,
    variant: 'info',
    unit: 'MB/s'
  }, {
    label: 'Temperature',
    value: 78,
    variant: 'warning',
    unit: '°C'
  }];
  basicVariants.forEach(({
    label,
    value,
    variant,
    unit
  }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('show-value', '');
    basicGrid.appendChild(gauge);
  });
  basicSection.appendChild(basicGrid);
  container.appendChild(basicSection);

  // Size Variants
  const sizeSection = document.createElement('div');
  sizeSection.innerHTML = \`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>
  \`;
  const sizeGrid = document.createElement('div');
  sizeGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: center;';
  const sizeVariants = [{
    label: 'Small',
    value: 45,
    size: 'sm'
  }, {
    label: 'Medium',
    value: 65,
    size: 'md'
  }, {
    label: 'Large',
    value: 85,
    size: 'lg'
  }];
  sizeVariants.forEach(({
    label,
    value,
    size
  }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('size', size);
    gauge.setAttribute('show-value', '');
    gauge.setAttribute('unit', '%');
    sizeGrid.appendChild(gauge);
  });
  sizeSection.appendChild(sizeGrid);
  container.appendChild(sizeSection);

  // Status Variants
  const statusSection = document.createElement('div');
  statusSection.innerHTML = \`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Status Indicators</h3>
  \`;
  const statusGrid = document.createElement('div');
  statusGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  const statusVariants = [{
    label: 'Success',
    value: 95,
    variant: 'success',
    unit: '%'
  }, {
    label: 'Warning',
    value: 75,
    variant: 'warning',
    unit: '%'
  }, {
    label: 'Error',
    value: 25,
    variant: 'error',
    unit: '%'
  }, {
    label: 'Info',
    value: 50,
    variant: 'info',
    unit: '%'
  }];
  statusVariants.forEach(({
    label,
    value,
    variant,
    unit
  }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('show-value', '');
    statusGrid.appendChild(gauge);
  });
  statusSection.appendChild(statusGrid);
  container.appendChild(statusSection);

  // Advanced Features
  const advancedSection = document.createElement('div');
  advancedSection.innerHTML = \`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Advanced Features</h3>
  \`;
  const advancedGrid = document.createElement('div');
  advancedGrid.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';

  // Gauge with thresholds
  const thresholdGauge = document.createElement('my-gauge');
  thresholdGauge.setAttribute('label', 'With Thresholds');
  thresholdGauge.setAttribute('value', '85');
  thresholdGauge.setAttribute('unit', '%');
  thresholdGauge.setAttribute('show-value', '');
  thresholdGauge.setAttribute('thresholds', JSON.stringify([{
    min: 0,
    max: 50,
    color: 'var(--_global-color-success)',
    label: 'Good'
  }, {
    min: 50,
    max: 80,
    color: 'var(--_global-color-warning)',
    label: 'Warning'
  }, {
    min: 80,
    max: 100,
    color: 'var(--_global-color-error)',
    label: 'Critical'
  }]));

  // Gauge with gradient
  const gradientGauge = document.createElement('my-gauge');
  gradientGauge.setAttribute('label', 'Gradient');
  gradientGauge.setAttribute('value', '72');
  gradientGauge.setAttribute('unit', '%');
  gradientGauge.setAttribute('show-value', '');
  gradientGauge.setAttribute('gradient', '');

  // Animated gauge
  const animatedGauge = document.createElement('my-gauge');
  animatedGauge.setAttribute('label', 'Animated');
  animatedGauge.setAttribute('value', '60');
  animatedGauge.setAttribute('unit', '%');
  animatedGauge.setAttribute('show-value', '');
  animatedGauge.setAttribute('animated', '');

  // Custom range gauge
  const customRangeGauge = document.createElement('my-gauge');
  customRangeGauge.setAttribute('label', 'Custom Range');
  customRangeGauge.setAttribute('value', '150');
  customRangeGauge.setAttribute('min', '100');
  customRangeGauge.setAttribute('max', '200');
  customRangeGauge.setAttribute('unit', ' RPM');
  customRangeGauge.setAttribute('show-value', '');
  advancedGrid.appendChild(thresholdGauge);
  advancedGrid.appendChild(gradientGauge);
  advancedGrid.appendChild(animatedGauge);
  advancedGrid.appendChild(customRangeGauge);
  advancedSection.appendChild(advancedGrid);
  container.appendChild(advancedSection);

  // Interactive Demo
  const interactiveSection = document.createElement('div');
  interactiveSection.innerHTML = \`
    <h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Interactive Demo</h3>
  \`;
  const interactiveContainer = document.createElement('div');
  interactiveContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 2rem;';
  const demoGauge = document.createElement('my-gauge');
  demoGauge.setAttribute('label', 'Interactive Gauge');
  demoGauge.setAttribute('value', '0');
  demoGauge.setAttribute('show-value', '');
  demoGauge.setAttribute('animated', '');
  demoGauge.setAttribute('unit', '%');
  demoGauge.setAttribute('tooltip', 'Use controls below or arrow keys when focused');
  const controlsContainer = document.createElement('div');
  controlsContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;';

  // Create control buttons
  const buttons = [{
    label: '0%',
    value: 0
  }, {
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
    label: 'Random',
    value: -1
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
      const newValue = value === -1 ? Math.floor(Math.random() * 101) : value;
      demoGauge.value = newValue;
    });
    controlsContainer.appendChild(button);
  });

  // Variant selector
  const variantContainer = document.createElement('div');
  variantContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;';
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  variants.forEach(variant => {
    const button = document.createElement('my-button');
    button.setAttribute('label', variant);
    button.setAttribute('variant', 'text');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      demoGauge.setAttribute('variant', variant);
    });
    variantContainer.appendChild(button);
  });
  const instructions = document.createElement('p');
  instructions.textContent = 'Click the gauge and use arrow keys, Home/End, or Page Up/Down to control it';
  instructions.style.cssText = 'text-align: center; color: var(--_global-color-text-secondary); font-size: 14px; margin: 0;';
  interactiveContainer.appendChild(demoGauge);
  interactiveContainer.appendChild(controlsContainer);
  interactiveContainer.appendChild(variantContainer);
  interactiveContainer.appendChild(instructions);
  interactiveSection.appendChild(interactiveContainer);
  container.appendChild(interactiveSection);
  return container;
}`,...(H=(L=h.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var P,R,B;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const gauge = document.createElement('my-gauge');
  gauge.setAttribute('label', 'CPU Usage');
  gauge.setAttribute('value', '65');
  gauge.setAttribute('unit', '%');
  gauge.setAttribute('show-value', '');
  return gauge;
}`,...(B=(R=y.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var N,W,I;G.parameters={...G.parameters,docs:{...(N=G.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const gauge = document.createElement('my-gauge');
  gauge.setAttribute('label', 'System Health');
  gauge.setAttribute('value', '85');
  gauge.setAttribute('unit', '%');
  gauge.setAttribute('show-value', '');
  gauge.setAttribute('tooltip', 'System health indicator with thresholds');
  gauge.setAttribute('thresholds', JSON.stringify([{
    min: 0,
    max: 60,
    color: 'var(--_global-color-success)',
    label: 'Good'
  }, {
    min: 60,
    max: 85,
    color: 'var(--_global-color-warning)',
    label: 'Warning'
  }, {
    min: 85,
    max: 100,
    color: 'var(--_global-color-error)',
    label: 'Critical'
  }]));
  return gauge;
}`,...(I=(W=G.parameters)==null?void 0:W.docs)==null?void 0:I.source}}};var D,O,F;w.parameters={...w.parameters,docs:{...(D=w.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; align-items: center; justify-content: center;';
  const sizes = ['sm', 'md', 'lg'];
  const values = [40, 60, 80];
  sizes.forEach((size, index) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', \`\${size.toUpperCase()}\`);
    gauge.setAttribute('value', values[index]);
    gauge.setAttribute('size', size);
    gauge.setAttribute('show-value', '');
    gauge.setAttribute('unit', '%');
    container.appendChild(gauge);
  });
  return container;
}`,...(F=(O=w.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var J,K,$;x.parameters={...x.parameters,docs:{...(J=x.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';
  const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
  const values = [25, 35, 45, 55, 65, 75];
  variants.forEach((variant, index) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', variant.charAt(0).toUpperCase() + variant.slice(1));
    gauge.setAttribute('value', values[index]);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('show-value', '');
    gauge.setAttribute('unit', '%');
    container.appendChild(gauge);
  });
  return container;
}`,...($=(K=x.parameters)==null?void 0:K.docs)==null?void 0:$.source}}};var q,Q,X;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';

  // Temperature gauge
  const tempGauge = document.createElement('my-gauge');
  tempGauge.setAttribute('label', 'Temperature');
  tempGauge.setAttribute('value', '72');
  tempGauge.setAttribute('min', '0');
  tempGauge.setAttribute('max', '100');
  tempGauge.setAttribute('unit', '°C');
  tempGauge.setAttribute('show-value', '');
  tempGauge.setAttribute('variant', 'warning');

  // Speed gauge  
  const speedGauge = document.createElement('my-gauge');
  speedGauge.setAttribute('label', 'Speed');
  speedGauge.setAttribute('value', '120');
  speedGauge.setAttribute('min', '0');
  speedGauge.setAttribute('max', '200');
  speedGauge.setAttribute('unit', ' km/h');
  speedGauge.setAttribute('show-value', '');
  speedGauge.setAttribute('variant', 'info');

  // Pressure gauge
  const pressureGauge = document.createElement('my-gauge');
  pressureGauge.setAttribute('label', 'Pressure');
  pressureGauge.setAttribute('value', '2.5');
  pressureGauge.setAttribute('min', '0');
  pressureGauge.setAttribute('max', '5');
  pressureGauge.setAttribute('unit', ' bar');
  pressureGauge.setAttribute('show-value', '');
  pressureGauge.setAttribute('variant', 'success');
  container.appendChild(tempGauge);
  container.appendChild(speedGauge);
  container.appendChild(pressureGauge);
  return container;
}`,...(X=(Q=f.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,ee;C.parameters={...C.parameters,docs:{...(Y=C.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
  const gauge = document.createElement('my-gauge');
  gauge.setAttribute('label', 'Animated Progress');
  gauge.setAttribute('value', '75');
  gauge.setAttribute('unit', '%');
  gauge.setAttribute('show-value', '');
  gauge.setAttribute('animated', '');
  gauge.setAttribute('gradient', '');

  // Auto-update demo
  let currentValue = 75;
  setInterval(() => {
    currentValue = Math.max(10, Math.min(90, currentValue + (Math.random() - 0.5) * 20));
    gauge.value = Math.round(currentValue);
  }, 2000);
  return gauge;
}`,...(ee=(Z=C.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ne,ae;E.parameters={...E.parameters,docs:{...(te=E.parameters)==null?void 0:te.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;';

  // Focusable gauge with keyboard controls
  const focusableGauge = document.createElement('my-gauge');
  focusableGauge.setAttribute('label', 'Keyboard Controlled');
  focusableGauge.setAttribute('value', '50');
  focusableGauge.setAttribute('unit', '%');
  focusableGauge.setAttribute('show-value', '');
  focusableGauge.setAttribute('tooltip', 'Focusable with arrow key controls');

  // Gauge with screen reader friendly labels
  const accessibleGauge = document.createElement('my-gauge');
  accessibleGauge.setAttribute('label', 'Battery Level');
  accessibleGauge.setAttribute('value', '23');
  accessibleGauge.setAttribute('unit', '%');
  accessibleGauge.setAttribute('show-value', '');
  accessibleGauge.setAttribute('variant', 'error');
  accessibleGauge.setAttribute('tooltip', 'Low battery warning - please charge soon');

  // High contrast gauge
  const contrastGauge = document.createElement('my-gauge');
  contrastGauge.setAttribute('label', 'High Contrast');
  contrastGauge.setAttribute('value', '67');
  contrastGauge.setAttribute('unit', '%');
  contrastGauge.setAttribute('show-value', '');
  contrastGauge.style.setProperty('--_global-color-primary', '#000000');
  contrastGauge.style.setProperty('--_global-color-text-primary', '#000000');
  container.appendChild(focusableGauge);
  container.appendChild(accessibleGauge);
  container.appendChild(contrastGauge);
  return container;
}`,...(ae=(ne=E.parameters)==null?void 0:ne.docs)==null?void 0:ae.source}}};var re,ie,se;S.parameters={...S.parameters,docs:{...(re=S.parameters)==null?void 0:re.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; max-width: 800px;';

  // System monitoring gauges
  const cpuGauge = document.createElement('my-gauge');
  cpuGauge.setAttribute('label', 'CPU Usage');
  cpuGauge.setAttribute('value', '67');
  cpuGauge.setAttribute('unit', '%');
  cpuGauge.setAttribute('show-value', '');
  cpuGauge.setAttribute('variant', 'warning');
  cpuGauge.setAttribute('thresholds', JSON.stringify([{
    min: 0,
    max: 50,
    color: 'var(--_global-color-success)',
    label: 'Normal'
  }, {
    min: 50,
    max: 80,
    color: 'var(--_global-color-warning)',
    label: 'High'
  }, {
    min: 80,
    max: 100,
    color: 'var(--_global-color-error)',
    label: 'Critical'
  }]));
  const memoryGauge = document.createElement('my-gauge');
  memoryGauge.setAttribute('label', 'Memory Usage');
  memoryGauge.setAttribute('value', '45');
  memoryGauge.setAttribute('unit', '%');
  memoryGauge.setAttribute('show-value', '');
  memoryGauge.setAttribute('variant', 'success');
  const diskGauge = document.createElement('my-gauge');
  diskGauge.setAttribute('label', 'Disk Usage');
  diskGauge.setAttribute('value', '89');
  diskGauge.setAttribute('unit', '%');
  diskGauge.setAttribute('show-value', '');
  diskGauge.setAttribute('variant', 'error');
  const networkGauge = document.createElement('my-gauge');
  networkGauge.setAttribute('label', 'Network');
  networkGauge.setAttribute('value', '23');
  networkGauge.setAttribute('unit', ' MB/s');
  networkGauge.setAttribute('show-value', '');
  networkGauge.setAttribute('variant', 'info');
  networkGauge.setAttribute('max', '100');
  container.appendChild(cpuGauge);
  container.appendChild(memoryGauge);
  container.appendChild(diskGauge);
  container.appendChild(networkGauge);
  return container;
}`,...(se=(ie=S.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};const _e=["AllVariants","BasicGauge","WithThresholds","SizeComparison","VariantShowcase","CustomRange","AnimatedGauge","AccessibilityDemo","RealWorldExamples"];export{E as AccessibilityDemo,h as AllVariants,C as AnimatedGauge,y as BasicGauge,f as CustomRange,S as RealWorldExamples,w as SizeComparison,x as VariantShowcase,G as WithThresholds,_e as __namedExportsOrder,ze as default};
