import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./base-component-q4KNMHwB.js";const q={title:"Components/Data Visualization",parameters:{docs:{description:{component:"A collection of data visualization components including progress bars, gauges, and sparklines for displaying metrics and trends."}}}},y=()=>{const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 32px;";const u=document.createElement("h3");u.textContent="Progress Bars",u.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const d=document.createElement("h4");d.textContent="Basic Variants",d.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const m=document.createElement("div");m.style.cssText="display: flex; flex-direction: column; gap: 16px;",[{label:"Basic Progress",value:25,variant:"primary"},{label:"Success Progress",value:50,variant:"success"},{label:"Warning Progress",value:75,variant:"warning"},{label:"Error Progress",value:90,variant:"error"}].forEach(({label:f,value:h,variant:v})=>{const b=document.createElement("div");b.style.cssText="display: flex; flex-direction: column; gap: 4px;";const z=document.createElement("div");z.style.cssText="display: flex; justify-content: space-between; font-size: 14px; font-weight: var(--_global-font-weight-medium);",z.innerHTML=`<span>${f}</span><span>${h}%</span>`;const C=document.createElement("my-progress");C.setAttribute("value",h),C.setAttribute("variant",v),C.setAttribute("show-value","false"),b.appendChild(z),b.appendChild(C),m.appendChild(b)});const o=document.createElement("h4");o.textContent="Different Sizes",o.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const p=document.createElement("div");p.style.cssText="display: flex; flex-direction: column; gap: 16px;",["sm","md","lg"].forEach(f=>{const h=document.createElement("div");h.style.cssText="display: flex; flex-direction: column; gap: 4px;";const v=document.createElement("div");v.textContent=`Size ${f.toUpperCase()} - 60%`,v.style.cssText="font-size: 14px; font-weight: var(--_global-font-weight-medium);";const b=document.createElement("my-progress");b.setAttribute("value",60),b.setAttribute("size",f),h.appendChild(v),h.appendChild(b),p.appendChild(h)});const s=document.createElement("h4");s.textContent="Special States",s.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const l=document.createElement("div");l.style.cssText="display: flex; flex-direction: column; gap: 16px;";const i=document.createElement("div");i.style.cssText="display: flex; flex-direction: column; gap: 4px;";const r=document.createElement("div");r.textContent="Indeterminate (Loading...)",r.style.cssText="font-size: 14px; font-weight: var(--_global-font-weight-medium);";const e=document.createElement("my-progress");e.setAttribute("indeterminate",""),i.appendChild(r),i.appendChild(e);const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; gap: 4px;";const a=document.createElement("div");a.textContent="Animated Progress",a.style.cssText="font-size: 14px; font-weight: var(--_global-font-weight-medium);";const c=document.createElement("my-progress");c.setAttribute("value",0),c.setAttribute("animated","");let _=0;const P=()=>{_=(_+1)%101,c.setAttribute("value",_),setTimeout(P,50)};return setTimeout(P,1e3),n.appendChild(a),n.appendChild(c),l.appendChild(i),l.appendChild(n),t.appendChild(u),t.appendChild(d),t.appendChild(m),t.appendChild(o),t.appendChild(p),t.appendChild(s),t.appendChild(l),t},E=()=>{const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 32px;";const u=document.createElement("h3");u.textContent="Gauges",u.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const d=document.createElement("h4");d.textContent="Basic Gauges",d.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const m=document.createElement("div");m.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;",[{label:"CPU Usage",value:65,unit:"%",variant:"primary"},{label:"Memory",value:45,unit:"%",variant:"info"},{label:"Storage",value:85,unit:"%",variant:"warning"},{label:"Network",value:95,unit:"%",variant:"error"}].forEach(({label:r,value:e,unit:n,variant:a})=>{const c=document.createElement("my-gauge");c.setAttribute("label",r),c.setAttribute("value",e),c.setAttribute("unit",n),c.setAttribute("variant",a),c.setAttribute("show-value",""),m.appendChild(c)});const o=document.createElement("h4");o.textContent="Different Sizes",o.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const p=document.createElement("div");p.style.cssText="display: flex; gap: 32px; align-items: center; justify-content: center;",["sm","md","lg"].forEach(r=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; align-items: center; gap: 8px;";const n=document.createElement("my-gauge");n.setAttribute("label","Performance"),n.setAttribute("value",74),n.setAttribute("unit","%"),n.setAttribute("size",r),n.setAttribute("show-value","");const a=document.createElement("span");a.textContent=r.toUpperCase(),a.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",e.appendChild(n),e.appendChild(a),p.appendChild(e)});const s=document.createElement("h4");s.textContent="With Thresholds",s.style.cssText="margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const l=document.createElement("div");return l.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;",[{label:"Temperature",value:30,unit:"°C",thresholds:'{"warning": 60, "critical": 80}'},{label:"Pressure",value:75,unit:"PSI",thresholds:'{"warning": 70, "critical": 90}'},{label:"Battery",value:15,unit:"%",thresholds:'{"warning": 20, "critical": 10}'}].forEach(({label:r,value:e,unit:n,thresholds:a})=>{const c=document.createElement("my-gauge");c.setAttribute("label",r),c.setAttribute("value",e),c.setAttribute("unit",n),c.setAttribute("thresholds",a),c.setAttribute("show-value",""),l.appendChild(c)}),t.appendChild(u),t.appendChild(d),t.appendChild(m),t.appendChild(o),t.appendChild(p),t.appendChild(s),t.appendChild(l),t},T=()=>{const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 32px;";const u=document.createElement("h3");u.textContent="Sparklines - Trend Visualization",u.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const d=document.createElement("div");return d.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;",[{label:"Revenue Trend",data:[20,25,30,28,35,40,38,42,45,50,55,60],color:"var(--_global-color-success)",trend:"up"},{label:"User Activity",data:[40,45,42,38,35,40,45,50,48,52,55,58],color:"var(--_global-color-info)",trend:"up"},{label:"System Load",data:[80,85,75,70,65,60,55,50,45,40,35,30],color:"var(--_global-color-warning)",trend:"down"},{label:"Error Rate",data:[10,8,12,15,18,16,14,12,10,8,6,4],color:"var(--_global-color-error)",trend:"down"}].forEach(({label:g,data:o,color:p,trend:x})=>{const s=document.createElement("div");s.style.cssText="padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); display: flex; flex-direction: column; gap: 12px;";const l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: center;";const i=document.createElement("span");i.textContent=g,i.style.cssText="font-weight: var(--_global-font-weight-medium);";const r=document.createElement("span");r.textContent=x==="up"?"📈":"📉",r.style.cssText="font-size: 20px;",l.appendChild(i),l.appendChild(r);const e=document.createElement("my-sparkline");e.setAttribute("data",JSON.stringify(o)),e.setAttribute("color",p),e.setAttribute("height","60"),e.setAttribute("tooltip","");const n=document.createElement("div");n.textContent=`Current: ${o[o.length-1]}`,n.style.cssText="font-size: 14px; color: var(--_global-color-text-secondary);",s.appendChild(l),s.appendChild(e),s.appendChild(n),d.appendChild(s)}),t.appendChild(u),t.appendChild(d),t},w=()=>{const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 32px;";const u=document.createElement("h3");u.textContent="Interactive Demo",u.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const d=document.createElement("div");d.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;";const m=document.createElement("div");m.style.cssText="padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); display: flex; flex-direction: column; align-items: center; gap: 16px;";const g=document.createElement("h4");g.textContent="Interactive Gauge",g.style.cssText="margin: 0; font-size: 16px;";const o=document.createElement("my-gauge");o.setAttribute("label","Adjust Value"),o.setAttribute("value",50),o.setAttribute("unit","%"),o.setAttribute("show-value",""),o.setAttribute("animated","");const p=document.createElement("input");p.type="range",p.min="0",p.max="100",p.value="50",p.style.cssText="width: 100%; margin: 8px 0;",p.addEventListener("input",a=>{o.setAttribute("value",a.target.value)});const x=document.createElement("span");x.textContent="Drag to adjust: 50%",x.style.cssText="font-size: 14px; color: var(--_global-color-text-secondary);",p.addEventListener("input",a=>{x.textContent=`Drag to adjust: ${a.target.value}%`}),m.appendChild(g),m.appendChild(o),m.appendChild(p),m.appendChild(x);const s=document.createElement("div");s.style.cssText="padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); display: flex; flex-direction: column; gap: 16px;";const l=document.createElement("h4");l.textContent="Animated Progress",l.style.cssText="margin: 0; font-size: 16px;";const i=document.createElement("my-progress");i.setAttribute("value",0),i.setAttribute("animated",""),i.setAttribute("show-value","");const r=document.createElement("div");r.textContent="Loading... 0%",r.style.cssText="font-size: 14px; color: var(--_global-color-text-secondary);";const e=document.createElement("button");e.textContent="Start Animation",e.style.cssText="padding: 8px 16px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-sm); cursor: pointer;";let n=!1;return e.addEventListener("click",()=>{if(n)return;n=!0,e.disabled=!0,e.textContent="Animating...";let a=0;const c=()=>{a+=2,i.setAttribute("value",a),r.textContent=`Loading... ${a}%`,a<100?setTimeout(c,100):setTimeout(()=>{n=!1,e.disabled=!1,e.textContent="Reset & Start Again",a=0,i.setAttribute("value",0),r.textContent="Loading... 0%"},1e3)};c()}),s.appendChild(l),s.appendChild(i),s.appendChild(r),s.appendChild(e),d.appendChild(m),d.appendChild(s),t.appendChild(u),t.appendChild(d),t},A=()=>{const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 24px; padding: 24px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-lg);";const u=document.createElement("h3");u.textContent="System Dashboard",u.style.cssText="margin: 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);";const d=document.createElement("div");d.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;",[{label:"CPU Usage",value:72,variant:"warning",type:"gauge"},{label:"Memory",value:85,variant:"error",type:"gauge"},{label:"Disk Space",value:45,variant:"success",type:"gauge"},{label:"Upload Progress",value:60,variant:"info",type:"progress"}].forEach(({label:s,value:l,variant:i,type:r})=>{const e=document.createElement("div");if(e.style.cssText="padding: 16px; background: var(--_global-color-surface); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);",r==="gauge"){const n=document.createElement("my-gauge");n.setAttribute("label",s),n.setAttribute("value",l),n.setAttribute("unit","%"),n.setAttribute("variant",i),n.setAttribute("show-value",""),n.setAttribute("size","sm"),e.appendChild(n)}else{const n=document.createElement("div");n.style.cssText="font-weight: var(--_global-font-weight-medium); margin-bottom: 8px; font-size: 14px;",n.textContent=s;const a=document.createElement("my-progress");a.setAttribute("value",l),a.setAttribute("variant",i),a.setAttribute("show-value",""),a.setAttribute("size","sm"),e.appendChild(n),e.appendChild(a)}d.appendChild(e)});const g=document.createElement("div");g.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 16px;";const o=["Network Traffic","Response Times","Error Rates"],p=[[20,35,40,35,50,45,60,55,50,65,70,75],[100,120,90,80,95,110,85,75,80,70,65,60],[5,8,6,4,7,9,6,3,2,4,1,2]],x=["var(--_global-color-primary)","var(--_global-color-info)","var(--_global-color-success)"];return o.forEach((s,l)=>{const i=document.createElement("div");i.style.cssText="padding: 16px; background: var(--_global-color-surface); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);";const r=document.createElement("h4");r.textContent=s,r.style.cssText="margin: 0 0 12px 0; font-size: 14px; font-weight: var(--_global-font-weight-medium);";const e=document.createElement("my-sparkline");e.setAttribute("data",JSON.stringify(p[l])),e.setAttribute("color",x[l]),e.setAttribute("height","80"),i.appendChild(r),i.appendChild(e),g.appendChild(i)}),t.appendChild(u),t.appendChild(d),t.appendChild(g),t};var k,S,L;y.parameters={...y.parameters,docs:{...(k=y.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  const title = document.createElement('h3');
  title.textContent = 'Progress Bars';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';

  // Basic variants
  const basicTitle = document.createElement('h4');
  basicTitle.textContent = 'Basic Variants';
  basicTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const basicContainer = document.createElement('div');
  basicContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  const basicProgressBars = [{
    label: 'Basic Progress',
    value: 25,
    variant: 'primary'
  }, {
    label: 'Success Progress',
    value: 50,
    variant: 'success'
  }, {
    label: 'Warning Progress',
    value: 75,
    variant: 'warning'
  }, {
    label: 'Error Progress',
    value: 90,
    variant: 'error'
  }];
  basicProgressBars.forEach(({
    label,
    value,
    variant
  }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
    const labelEl = document.createElement('div');
    labelEl.style.cssText = 'display: flex; justify-content: space-between; font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    labelEl.innerHTML = \`<span>\${label}</span><span>\${value}%</span>\`;
    const progress = document.createElement('my-progress');
    progress.setAttribute('value', value);
    progress.setAttribute('variant', variant);
    progress.setAttribute('show-value', 'false');
    wrapper.appendChild(labelEl);
    wrapper.appendChild(progress);
    basicContainer.appendChild(wrapper);
  });

  // Sizes
  const sizeTitle = document.createElement('h4');
  sizeTitle.textContent = 'Different Sizes';
  sizeTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const sizeContainer = document.createElement('div');
  sizeContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
    const labelEl = document.createElement('div');
    labelEl.textContent = \`Size \${size.toUpperCase()} - 60%\`;
    labelEl.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    const progress = document.createElement('my-progress');
    progress.setAttribute('value', 60);
    progress.setAttribute('size', size);
    wrapper.appendChild(labelEl);
    wrapper.appendChild(progress);
    sizeContainer.appendChild(wrapper);
  });

  // Special states
  const stateTitle = document.createElement('h4');
  stateTitle.textContent = 'Special States';
  stateTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const stateContainer = document.createElement('div');
  stateContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

  // Indeterminate
  const indeterminateWrapper = document.createElement('div');
  indeterminateWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
  const indeterminateLabel = document.createElement('div');
  indeterminateLabel.textContent = 'Indeterminate (Loading...)';
  indeterminateLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
  const indeterminateProgress = document.createElement('my-progress');
  indeterminateProgress.setAttribute('indeterminate', '');
  indeterminateWrapper.appendChild(indeterminateLabel);
  indeterminateWrapper.appendChild(indeterminateProgress);

  // Animated
  const animatedWrapper = document.createElement('div');
  animatedWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
  const animatedLabel = document.createElement('div');
  animatedLabel.textContent = 'Animated Progress';
  animatedLabel.style.cssText = 'font-size: 14px; font-weight: var(--_global-font-weight-medium);';
  const animatedProgress = document.createElement('my-progress');
  animatedProgress.setAttribute('value', 0);
  animatedProgress.setAttribute('animated', '');

  // Animate the progress bar
  let value = 0;
  const animateProgress = () => {
    value = (value + 1) % 101;
    animatedProgress.setAttribute('value', value);
    setTimeout(animateProgress, 50);
  };
  setTimeout(animateProgress, 1000);
  animatedWrapper.appendChild(animatedLabel);
  animatedWrapper.appendChild(animatedProgress);
  stateContainer.appendChild(indeterminateWrapper);
  stateContainer.appendChild(animatedWrapper);
  container.appendChild(title);
  container.appendChild(basicTitle);
  container.appendChild(basicContainer);
  container.appendChild(sizeTitle);
  container.appendChild(sizeContainer);
  container.appendChild(stateTitle);
  container.appendChild(stateContainer);
  return container;
}`,...(L=(S=y.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var W,G,B;E.parameters={...E.parameters,docs:{...(W=E.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  const title = document.createElement('h3');
  title.textContent = 'Gauges';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';

  // Basic gauges
  const basicTitle = document.createElement('h4');
  basicTitle.textContent = 'Basic Gauges';
  basicTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const basicContainer = document.createElement('div');
  basicContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;';
  const basicGauges = [{
    label: 'CPU Usage',
    value: 65,
    unit: '%',
    variant: 'primary'
  }, {
    label: 'Memory',
    value: 45,
    unit: '%',
    variant: 'info'
  }, {
    label: 'Storage',
    value: 85,
    unit: '%',
    variant: 'warning'
  }, {
    label: 'Network',
    value: 95,
    unit: '%',
    variant: 'error'
  }];
  basicGauges.forEach(({
    label,
    value,
    unit,
    variant
  }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('show-value', '');
    basicContainer.appendChild(gauge);
  });

  // Sizes
  const sizeTitle = document.createElement('h4');
  sizeTitle.textContent = 'Different Sizes';
  sizeTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const sizeContainer = document.createElement('div');
  sizeContainer.style.cssText = 'display: flex; gap: 32px; align-items: center; justify-content: center;';
  const sizes = ['sm', 'md', 'lg'];
  sizes.forEach(size => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', 'Performance');
    gauge.setAttribute('value', 74);
    gauge.setAttribute('unit', '%');
    gauge.setAttribute('size', size);
    gauge.setAttribute('show-value', '');
    const label = document.createElement('span');
    label.textContent = size.toUpperCase();
    label.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(gauge);
    wrapper.appendChild(label);
    sizeContainer.appendChild(wrapper);
  });

  // With thresholds
  const thresholdTitle = document.createElement('h4');
  thresholdTitle.textContent = 'With Thresholds';
  thresholdTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
  const thresholdContainer = document.createElement('div');
  thresholdContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;';
  const thresholdGauges = [{
    label: 'Temperature',
    value: 30,
    unit: '°C',
    thresholds: '{"warning": 60, "critical": 80}'
  }, {
    label: 'Pressure',
    value: 75,
    unit: 'PSI',
    thresholds: '{"warning": 70, "critical": 90}'
  }, {
    label: 'Battery',
    value: 15,
    unit: '%',
    thresholds: '{"warning": 20, "critical": 10}'
  }];
  thresholdGauges.forEach(({
    label,
    value,
    unit,
    thresholds
  }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('unit', unit);
    gauge.setAttribute('thresholds', thresholds);
    gauge.setAttribute('show-value', '');
    thresholdContainer.appendChild(gauge);
  });
  container.appendChild(title);
  container.appendChild(basicTitle);
  container.appendChild(basicContainer);
  container.appendChild(sizeTitle);
  container.appendChild(sizeContainer);
  container.appendChild(thresholdTitle);
  container.appendChild(thresholdContainer);
  return container;
}`,...(B=(G=E.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var D,I,U;T.parameters={...T.parameters,docs:{...(D=T.parameters)==null?void 0:D.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  const title = document.createElement('h3');
  title.textContent = 'Sparklines - Trend Visualization';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const sparklineContainer = document.createElement('div');
  sparklineContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;';
  const sparklines = [{
    label: 'Revenue Trend',
    data: [20, 25, 30, 28, 35, 40, 38, 42, 45, 50, 55, 60],
    color: 'var(--_global-color-success)',
    trend: 'up'
  }, {
    label: 'User Activity',
    data: [40, 45, 42, 38, 35, 40, 45, 50, 48, 52, 55, 58],
    color: 'var(--_global-color-info)',
    trend: 'up'
  }, {
    label: 'System Load',
    data: [80, 85, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30],
    color: 'var(--_global-color-warning)',
    trend: 'down'
  }, {
    label: 'Error Rate',
    data: [10, 8, 12, 15, 18, 16, 14, 12, 10, 8, 6, 4],
    color: 'var(--_global-color-error)',
    trend: 'down'
  }];
  sparklines.forEach(({
    label,
    data,
    color,
    trend
  }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 16px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); display: flex; flex-direction: column; gap: 12px;';
    const header = document.createElement('div');
    header.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    labelEl.style.cssText = 'font-weight: var(--_global-font-weight-medium);';
    const trendIcon = document.createElement('span');
    trendIcon.textContent = trend === 'up' ? '📈' : '📉';
    trendIcon.style.cssText = 'font-size: 20px;';
    header.appendChild(labelEl);
    header.appendChild(trendIcon);
    const sparkline = document.createElement('my-sparkline');
    sparkline.setAttribute('data', JSON.stringify(data));
    sparkline.setAttribute('color', color);
    sparkline.setAttribute('height', '60');
    sparkline.setAttribute('tooltip', '');
    const currentValue = document.createElement('div');
    currentValue.textContent = \`Current: \${data[data.length - 1]}\`;
    currentValue.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
    wrapper.appendChild(header);
    wrapper.appendChild(sparkline);
    wrapper.appendChild(currentValue);
    sparklineContainer.appendChild(wrapper);
  });
  container.appendChild(title);
  container.appendChild(sparklineContainer);
  return container;
}`,...(U=(I=T.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};var R,V,j;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';
  const title = document.createElement('h3');
  title.textContent = 'Interactive Demo';
  title.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const demoContainer = document.createElement('div');
  demoContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;';

  // Interactive gauge
  const gaugeWrapper = document.createElement('div');
  gaugeWrapper.style.cssText = 'padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); display: flex; flex-direction: column; align-items: center; gap: 16px;';
  const gaugeTitle = document.createElement('h4');
  gaugeTitle.textContent = 'Interactive Gauge';
  gaugeTitle.style.cssText = 'margin: 0; font-size: 16px;';
  const interactiveGauge = document.createElement('my-gauge');
  interactiveGauge.setAttribute('label', 'Adjust Value');
  interactiveGauge.setAttribute('value', 50);
  interactiveGauge.setAttribute('unit', '%');
  interactiveGauge.setAttribute('show-value', '');
  interactiveGauge.setAttribute('animated', '');
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '100';
  slider.value = '50';
  slider.style.cssText = 'width: 100%; margin: 8px 0;';
  slider.addEventListener('input', e => {
    interactiveGauge.setAttribute('value', e.target.value);
  });
  const sliderLabel = document.createElement('span');
  sliderLabel.textContent = 'Drag to adjust: 50%';
  sliderLabel.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
  slider.addEventListener('input', e => {
    sliderLabel.textContent = \`Drag to adjust: \${e.target.value}%\`;
  });
  gaugeWrapper.appendChild(gaugeTitle);
  gaugeWrapper.appendChild(interactiveGauge);
  gaugeWrapper.appendChild(slider);
  gaugeWrapper.appendChild(sliderLabel);

  // Animated progress
  const progressWrapper = document.createElement('div');
  progressWrapper.style.cssText = 'padding: 20px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-md); display: flex; flex-direction: column; gap: 16px;';
  const progressTitle = document.createElement('h4');
  progressTitle.textContent = 'Animated Progress';
  progressTitle.style.cssText = 'margin: 0; font-size: 16px;';
  const animatedProgress = document.createElement('my-progress');
  animatedProgress.setAttribute('value', 0);
  animatedProgress.setAttribute('animated', '');
  animatedProgress.setAttribute('show-value', '');
  const progressLabel = document.createElement('div');
  progressLabel.textContent = 'Loading... 0%';
  progressLabel.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
  const startButton = document.createElement('button');
  startButton.textContent = 'Start Animation';
  startButton.style.cssText = 'padding: 8px 16px; background: var(--_global-color-primary); color: var(--_global-color-on-primary); border: none; border-radius: var(--_global-border-radius-sm); cursor: pointer;';
  let animationRunning = false;
  startButton.addEventListener('click', () => {
    if (animationRunning) return;
    animationRunning = true;
    startButton.disabled = true;
    startButton.textContent = 'Animating...';
    let value = 0;
    const animate = () => {
      value += 2;
      animatedProgress.setAttribute('value', value);
      progressLabel.textContent = \`Loading... \${value}%\`;
      if (value < 100) {
        setTimeout(animate, 100);
      } else {
        setTimeout(() => {
          animationRunning = false;
          startButton.disabled = false;
          startButton.textContent = 'Reset & Start Again';
          value = 0;
          animatedProgress.setAttribute('value', 0);
          progressLabel.textContent = 'Loading... 0%';
        }, 1000);
      }
    };
    animate();
  });
  progressWrapper.appendChild(progressTitle);
  progressWrapper.appendChild(animatedProgress);
  progressWrapper.appendChild(progressLabel);
  progressWrapper.appendChild(startButton);
  demoContainer.appendChild(gaugeWrapper);
  demoContainer.appendChild(progressWrapper);
  container.appendChild(title);
  container.appendChild(demoContainer);
  return container;
}`,...(j=(V=w.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var $,N,M;A.parameters={...A.parameters,docs:{...($=A.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 24px; padding: 24px; background: var(--_global-color-surface-container); border-radius: var(--_global-border-radius-lg);';
  const title = document.createElement('h3');
  title.textContent = 'System Dashboard';
  title.style.cssText = 'margin: 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';
  const metricsGrid = document.createElement('div');
  metricsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;';
  const metrics = [{
    label: 'CPU Usage',
    value: 72,
    variant: 'warning',
    type: 'gauge'
  }, {
    label: 'Memory',
    value: 85,
    variant: 'error',
    type: 'gauge'
  }, {
    label: 'Disk Space',
    value: 45,
    variant: 'success',
    type: 'gauge'
  }, {
    label: 'Upload Progress',
    value: 60,
    variant: 'info',
    type: 'progress'
  }];
  metrics.forEach(({
    label,
    value,
    variant,
    type
  }) => {
    const metricCard = document.createElement('div');
    metricCard.style.cssText = 'padding: 16px; background: var(--_global-color-surface); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);';
    if (type === 'gauge') {
      const gauge = document.createElement('my-gauge');
      gauge.setAttribute('label', label);
      gauge.setAttribute('value', value);
      gauge.setAttribute('unit', '%');
      gauge.setAttribute('variant', variant);
      gauge.setAttribute('show-value', '');
      gauge.setAttribute('size', 'sm');
      metricCard.appendChild(gauge);
    } else {
      const labelEl = document.createElement('div');
      labelEl.style.cssText = 'font-weight: var(--_global-font-weight-medium); margin-bottom: 8px; font-size: 14px;';
      labelEl.textContent = label;
      const progress = document.createElement('my-progress');
      progress.setAttribute('value', value);
      progress.setAttribute('variant', variant);
      progress.setAttribute('show-value', '');
      progress.setAttribute('size', 'sm');
      metricCard.appendChild(labelEl);
      metricCard.appendChild(progress);
    }
    metricsGrid.appendChild(metricCard);
  });
  const chartsSection = document.createElement('div');
  chartsSection.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 16px;';
  const chartTitles = ['Network Traffic', 'Response Times', 'Error Rates'];
  const chartData = [[20, 35, 40, 35, 50, 45, 60, 55, 50, 65, 70, 75], [100, 120, 90, 80, 95, 110, 85, 75, 80, 70, 65, 60], [5, 8, 6, 4, 7, 9, 6, 3, 2, 4, 1, 2]];
  const colors = ['var(--_global-color-primary)', 'var(--_global-color-info)', 'var(--_global-color-success)'];
  chartTitles.forEach((title, index) => {
    const chartCard = document.createElement('div');
    chartCard.style.cssText = 'padding: 16px; background: var(--_global-color-surface); border-radius: var(--_global-border-radius-md); border: 1px solid var(--_global-color-outline-variant);';
    const chartTitle = document.createElement('h4');
    chartTitle.textContent = title;
    chartTitle.style.cssText = 'margin: 0 0 12px 0; font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    const sparkline = document.createElement('my-sparkline');
    sparkline.setAttribute('data', JSON.stringify(chartData[index]));
    sparkline.setAttribute('color', colors[index]);
    sparkline.setAttribute('height', '80');
    chartCard.appendChild(chartTitle);
    chartCard.appendChild(sparkline);
    chartsSection.appendChild(chartCard);
  });
  container.appendChild(title);
  container.appendChild(metricsGrid);
  container.appendChild(chartsSection);
  return container;
}`,...(M=(N=A.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};const F=["ProgressBars","Gauges","Sparklines","InteractiveDemo","DashboardExample"];export{A as DashboardExample,E as Gauges,w as InteractiveDemo,y as ProgressBars,T as Sparklines,F as __namedExportsOrder,q as default};
