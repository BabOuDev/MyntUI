import"./index-UkS2EslT.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const fe={title:"Showcase/Real-World Examples",parameters:{docs:{description:{component:"Real-world examples showcasing MyntUI components in practical scenarios, demonstrating design patterns and best practices."}}}},N=()=>{const c=document.createElement("div");c.style.cssText=`
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
    color: var(--_global-color-text-primary);
  `;const y=document.createElement("header");y.style.cssText=`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding: 20px 0;
    border-bottom: 1px solid var(--_global-color-outline-variant);
  `;const M=document.createElement("div");M.innerHTML=`
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
  `;const p=document.createElement("div");p.style.cssText="display: flex; gap: 12px; align-items: center;";const d=document.createElement("my-input");d.setAttribute("type","text"),d.setAttribute("placeholder","Last 30 days"),d.setAttribute("leading-icon","date_range"),d.setAttribute("size","sm"),d.style.width="160px";const v=document.createElement("my-button");v.setAttribute("variant","outlined"),v.setAttribute("size","sm"),v.innerHTML='<my-icon icon="download" slot="left"></my-icon>Export';const x=document.createElement("my-button");x.setAttribute("variant","text"),x.setAttribute("icon-only",""),x.innerHTML='<my-icon icon="settings"></my-icon>',p.appendChild(d),p.appendChild(v),p.appendChild(x),y.appendChild(M),y.appendChild(p);const w=document.createElement("div");w.style.cssText=`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  `,[{title:"Total Revenue",value:"$47,392",change:"+12.5%",trend:"up",icon:"attach_money",color:"success",subtitle:"vs last month"},{title:"Active Users",value:"3,847",change:"+8.2%",trend:"up",icon:"people",color:"primary",subtitle:"24h active"},{title:"Conversion Rate",value:"3.42%",change:"-0.5%",trend:"down",icon:"trending_up",color:"warning",subtitle:"this week"},{title:"Server Uptime",value:"99.8%",change:"",trend:"stable",icon:"cloud_done",color:"info",subtitle:"30-day average"}].forEach(a=>{const o=document.createElement("div");o.style.cssText=`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 24px;
      transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
    `,o.addEventListener("mouseenter",()=>{o.style.boxShadow="var(--_global-elevation-2)"}),o.addEventListener("mouseleave",()=>{o.style.boxShadow="none"});const u=document.createElement("div");u.style.cssText="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;";const s=document.createElement("my-icon");s.setAttribute("icon",a.icon),s.style.cssText=`color: var(--_global-color-${a.color}); font-size: 24px;`;const t=document.createElement("my-icon");a.trend==="up"?(t.setAttribute("icon","trending_up"),t.style.color="var(--_global-color-success)"):a.trend==="down"?(t.setAttribute("icon","trending_down"),t.style.color="var(--_global-color-error)"):(t.setAttribute("icon","trending_flat"),t.style.color="var(--_global-color-text-secondary)"),t.style.fontSize="18px",u.appendChild(s),u.appendChild(t);const e=document.createElement("h3");e.textContent=a.title,e.style.cssText=`
      margin: 0 0 4px 0;
      font-size: var(--_global-font-size-label-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;const i=document.createElement("div");i.textContent=a.value,i.style.cssText=`
      font-size: var(--_global-font-size-headline-medium);
      font-weight: var(--_global-font-weight-bold);
      color: var(--_global-color-text-primary);
      margin-bottom: 8px;
    `;const n=document.createElement("div");n.style.cssText="display: flex; justify-content: space-between; align-items: center;";const l=document.createElement("span");a.change&&(l.textContent=a.change,l.style.cssText=`
        font-size: var(--_global-font-size-label-small);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-${a.trend==="up"?"success":a.trend==="down"?"error":"text-secondary"});
      `);const P=document.createElement("span");P.textContent=a.subtitle,P.style.cssText=`
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    `,n.appendChild(l),n.appendChild(P),o.appendChild(u),o.appendChild(e),o.appendChild(i),o.appendChild(n),w.appendChild(o)});const F=document.createElement("div");F.style.cssText="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;";const f=document.createElement("div");f.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
  `;const A=document.createElement("div");A.style.cssText="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;";const h=document.createElement("h3");h.textContent="System Performance",h.style.cssText=`
    margin: 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  `;const b=document.createElement("my-button");b.setAttribute("variant","text"),b.setAttribute("size","sm"),b.innerHTML='<my-icon icon="refresh" slot="left"></my-icon>Refresh',A.appendChild(h),A.appendChild(b);const L=document.createElement("div");L.style.cssText="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;",[{label:"CPU Usage",value:68,variant:"warning",unit:"%"},{label:"Memory",value:45,variant:"success",unit:"%"},{label:"Disk I/O",value:82,variant:"error",unit:"%"},{label:"Network",value:30,variant:"primary",unit:"Mbps"}].forEach(({label:a,value:o,variant:u,unit:s})=>{const t=document.createElement("div");t.style.cssText="text-align: center;";const e=document.createElement("my-gauge");e.setAttribute("label",a),e.setAttribute("value",o),e.setAttribute("unit",s),e.setAttribute("variant",u),e.setAttribute("size","md"),e.setAttribute("show-value",""),t.appendChild(e),L.appendChild(t)}),f.appendChild(A),f.appendChild(L);const r=document.createElement("div");r.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
  `;const m=document.createElement("h3");m.textContent="Recent Activity",m.style.cssText=`
    margin: 0 0 20px 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  `;const C=document.createElement("div");C.style.cssText="display: flex; flex-direction: column; gap: 16px;",[{icon:"person_add",text:"New user registered",time:"2 min ago",type:"success"},{icon:"security",text:"Security scan completed",time:"15 min ago",type:"info"},{icon:"warning",text:"High memory usage detected",time:"32 min ago",type:"warning"},{icon:"upload",text:"Database backup completed",time:"1 hour ago",type:"success"},{icon:"error",text:"Failed login attempt blocked",time:"2 hours ago",type:"error"}].forEach(({icon:a,text:o,time:u,type:s})=>{const t=document.createElement("div");t.style.cssText=`
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--_global-color-outline-variant);
    `;const e=document.createElement("my-icon");e.setAttribute("icon",a),e.style.cssText=`
      color: var(--_global-color-${s});
      font-size: 20px;
      flex-shrink: 0;
    `;const i=document.createElement("div");i.style.cssText="flex: 1;";const n=document.createElement("div");n.textContent=o,n.style.cssText=`
      font-size: var(--_global-font-size-body-small);
      color: var(--_global-color-text-primary);
      margin-bottom: 2px;
    `;const l=document.createElement("div");l.textContent=u,l.style.cssText=`
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    `,i.appendChild(n),i.appendChild(l),t.appendChild(e),t.appendChild(i),C.appendChild(t)}),r.appendChild(m),r.appendChild(C),F.appendChild(f),F.appendChild(r);const z=document.createElement("div");z.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
    margin-bottom: 32px;
  `;const $=document.createElement("div");$.style.cssText="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;";const j=document.createElement("h3");j.textContent="Project Progress",j.style.cssText=`
    margin: 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  `;const g=document.createElement("my-button");g.setAttribute("variant","filled"),g.setAttribute("size","sm"),g.innerHTML='<my-icon icon="add" slot="left"></my-icon>Add Project',$.appendChild(j),$.appendChild(g);const S=document.createElement("div");S.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;",[{name:"Website Redesign",progress:75,variant:"primary",deadline:"2 weeks",team:4},{name:"Mobile App Beta",progress:45,variant:"info",deadline:"1 month",team:3},{name:"API Integration",progress:90,variant:"success",deadline:"3 days",team:2},{name:"Security Audit",progress:30,variant:"warning",deadline:"3 weeks",team:5}].forEach(({name:a,progress:o,variant:u,deadline:s,team:t})=>{const e=document.createElement("div");e.style.cssText=`
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-md);
      padding: 20px;
      background: var(--_global-color-surface);
    `;const i=document.createElement("div");i.style.cssText="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;";const n=document.createElement("h4");n.textContent=a,n.style.cssText=`
      margin: 0;
      font-size: var(--_global-font-size-body-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-primary);
    `;const l=document.createElement("my-button");l.setAttribute("variant","text"),l.setAttribute("icon-only",""),l.setAttribute("size","sm"),l.innerHTML='<my-icon icon="more_vert"></my-icon>',i.appendChild(n),i.appendChild(l);const P=document.createElement("div");P.style.cssText="margin-bottom: 16px;";const J=document.createElement("div");J.style.cssText="display: flex; justify-content: space-between; margin-bottom: 8px;",J.innerHTML=`
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">Progress</span>
      <span style="font-size: var(--_global-font-size-label-small); font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);">${o}%</span>
    `;const W=document.createElement("my-progress");W.setAttribute("value",o),W.setAttribute("variant",u),W.setAttribute("size","sm"),P.appendChild(J),P.appendChild(W);const V=document.createElement("div");V.style.cssText="display: flex; justify-content: space-between; align-items: center;";const K=document.createElement("div");K.style.cssText="display: flex; align-items: center; gap: 6px;",K.innerHTML=`
      <my-icon icon="schedule" style="font-size: 16px; color: var(--_global-color-text-secondary);"></my-icon>
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">${s}</span>
    `;const q=document.createElement("div");q.style.cssText="display: flex; align-items: center; gap: 6px;",q.innerHTML=`
      <my-icon icon="group" style="font-size: 16px; color: var(--_global-color-text-secondary);"></my-icon>
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">${t} members</span>
    `,V.appendChild(K),V.appendChild(q),e.appendChild(i),e.appendChild(P),e.appendChild(V),S.appendChild(e)}),z.appendChild($),z.appendChild(S);const k=document.createElement("div");k.style.cssText=`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid var(--_global-color-outline-variant);
  `;const _=document.createElement("div");_.style.cssText="display: flex; align-items: center; gap: 16px;";const I=document.createElement("span");I.innerHTML=`
    <my-icon icon="schedule" style="font-size: 16px; color: var(--_global-color-text-secondary); margin-right: 6px;"></my-icon>
    Last updated: 5 minutes ago
  `,I.style.cssText=`
    font-size: var(--_global-font-size-label-small);
    color: var(--_global-color-text-secondary);
    display: flex;
    align-items: center;
  `;const B=document.createElement("my-toggle");B.setAttribute("label","Auto-refresh"),B.setAttribute("size","sm"),B.setAttribute("checked",""),_.appendChild(I),_.appendChild(B);const E=document.createElement("div");E.style.cssText="display: flex; gap: 12px;";const H=document.createElement("my-button");H.setAttribute("variant","outlined"),H.setAttribute("size","sm"),H.innerHTML='<my-icon icon="fullscreen" slot="left"></my-icon>Fullscreen';const T=document.createElement("my-button");return T.setAttribute("variant","filled"),T.setAttribute("size","sm"),T.innerHTML='<my-icon icon="share" slot="left"></my-icon>Share Dashboard',E.appendChild(H),E.appendChild(T),k.appendChild(_),k.appendChild(E),c.appendChild(y),c.appendChild(w),c.appendChild(F),c.appendChild(z),c.appendChild(k),c};N.parameters={docs:{description:{story:"A comprehensive analytics dashboard showcasing real-world usage of multiple MyntUI components in a business context."}}};const G=()=>{const c=document.createElement("div");c.style.cssText=`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  `;const y=document.createElement("div");y.style.cssText=`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--_global-color-outline-variant);
    flex-wrap: wrap;
    gap: 16px;
  `;const M=document.createElement("div");M.innerHTML=`
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
  `;const p=document.createElement("div");p.style.cssText="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;";const d=document.createElement("my-input");d.setAttribute("type","search"),d.setAttribute("placeholder","Search products..."),d.setAttribute("leading-icon","search"),d.setAttribute("size","sm"),d.style.width="240px";const v=document.createElement("my-dropdown");v.setAttribute("trigger-text","All Categories"),v.setAttribute("size","sm"),v.setAttribute("options",JSON.stringify([{label:"All Categories",value:"all"},{label:"Electronics",value:"electronics"},{label:"Clothing",value:"clothing"},{label:"Home & Garden",value:"home"},{label:"Sports",value:"sports"}]));const x=document.createElement("my-dropdown");x.setAttribute("trigger-text","All Status"),x.setAttribute("size","sm"),x.setAttribute("options",JSON.stringify([{label:"All Status",value:"all"},{label:"In Stock",value:"in-stock"},{label:"Low Stock",value:"low-stock"},{label:"Out of Stock",value:"out-of-stock"}]));const w=document.createElement("my-button");w.setAttribute("variant","filled"),w.setAttribute("size","sm"),w.innerHTML='<my-icon icon="add" slot="left"></my-icon>Add Product',p.appendChild(d),p.appendChild(v),p.appendChild(x),p.appendChild(w),y.appendChild(M),y.appendChild(p);const U=document.createElement("div");U.style.cssText="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 32px;",[{id:1,name:"Wireless Bluetooth Headphones",sku:"WBH-001",price:99.99,originalPrice:129.99,stock:24,status:"in-stock",category:"Electronics",rating:4.5,reviews:128,image:"headphones",discount:23},{id:2,name:"Premium Cotton T-Shirt",sku:"PCT-002",price:29.99,originalPrice:null,stock:5,status:"low-stock",category:"Clothing",rating:4.2,reviews:89,image:"shirt",discount:0},{id:3,name:"Smart Home Security Camera",sku:"SHC-003",price:149.99,originalPrice:199.99,stock:0,status:"out-of-stock",category:"Electronics",rating:4.8,reviews:256,image:"camera",discount:25},{id:4,name:"Organic Plant Fertilizer",sku:"OPF-004",price:19.99,originalPrice:null,stock:48,status:"in-stock",category:"Home & Garden",rating:4.6,reviews:73,image:"fertilizer",discount:0}].forEach(r=>{const m=document.createElement("div");m.style.cssText=`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      overflow: hidden;
      transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
    `,m.addEventListener("mouseenter",()=>{m.style.boxShadow="var(--_global-elevation-2)"}),m.addEventListener("mouseleave",()=>{m.style.boxShadow="none"});const C=document.createElement("div");C.style.cssText=`
      position: relative;
      height: 180px;
      background: var(--_global-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--_global-color-text-secondary);
      font-size: 48px;
    `;const O=document.createElement("my-icon");O.setAttribute("icon","image"),O.style.fontSize="48px",C.appendChild(O);const z=document.createElement("div"),j={"in-stock":{color:"success",text:"In Stock"},"low-stock":{color:"warning",text:"Low Stock"},"out-of-stock":{color:"error",text:"Out of Stock"}}[r.status];if(z.textContent=j.text,z.style.cssText=`
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--_global-color-${j.color});
      color: var(--_global-color-on-${j.color});
      padding: 4px 8px;
      border-radius: var(--_global-border-radius-sm);
      font-size: var(--_global-font-size-label-small);
      font-weight: var(--_global-font-weight-medium);
    `,C.appendChild(z),r.discount>0){const n=document.createElement("div");n.textContent=`-${r.discount}%`,n.style.cssText=`
        position: absolute;
        top: 12px;
        left: 12px;
        background: var(--_global-color-error);
        color: var(--_global-color-on-error);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: var(--_global-font-size-label-small);
        font-weight: var(--_global-font-weight-bold);
      `,C.appendChild(n)}const g=document.createElement("div");g.style.cssText="padding: 20px;";const S=document.createElement("div");S.style.cssText="margin-bottom: 12px;";const D=document.createElement("h3");D.textContent=r.name,D.style.cssText=`
      margin: 0 0 4px 0;
      font-size: var(--_global-font-size-body-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-primary);
      line-height: 1.4;
    `;const k=document.createElement("p");k.textContent=`SKU: ${r.sku}`,k.style.cssText=`
      margin: 0;
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
      font-family: var(--_global-font-family-mono);
    `,S.appendChild(D),S.appendChild(k);const _=document.createElement("div");_.style.cssText="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;";const I=document.createElement("div");I.style.cssText="display: flex; gap: 2px;";for(let n=1;n<=5;n++){const l=document.createElement("my-icon");l.setAttribute("icon",n<=Math.floor(r.rating)?"star":n-.5<=r.rating?"star_half":"star_border"),l.setAttribute("size","sm"),l.style.color="var(--_global-color-warning)",I.appendChild(l)}const B=document.createElement("span");B.textContent=`(${r.reviews})`,B.style.cssText=`
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    `,_.appendChild(I),_.appendChild(B);const E=document.createElement("div");E.style.cssText="display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;";const H=document.createElement("span");if(H.textContent=`$${r.price}`,H.style.cssText=`
      font-size: var(--_global-font-size-title-small);
      font-weight: var(--_global-font-weight-bold);
      color: var(--_global-color-primary);
    `,E.appendChild(H),r.originalPrice){const n=document.createElement("span");n.textContent=`$${r.originalPrice}`,n.style.cssText=`
        font-size: var(--_global-font-size-body-small);
        color: var(--_global-color-text-secondary);
        text-decoration: line-through;
      `,E.appendChild(n)}const T=document.createElement("div");T.style.cssText="margin-bottom: 16px;";const a=document.createElement("div");a.style.cssText="display: flex; justify-content: space-between; margin-bottom: 4px;",a.innerHTML=`
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">Stock Level</span>
      <span style="font-size: var(--_global-font-size-label-small); font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);">${r.stock} units</span>
    `;const o=document.createElement("my-progress"),u=Math.min(r.stock/50*100,100);o.setAttribute("value",u),o.setAttribute("variant",r.status==="low-stock"?"warning":r.status==="out-of-stock"?"error":"success"),o.setAttribute("size","sm"),T.appendChild(a),T.appendChild(o);const s=document.createElement("div");s.style.cssText="display: flex; gap: 8px;";const t=document.createElement("my-button");t.setAttribute("variant","outlined"),t.setAttribute("size","sm"),t.style.flex="1",t.innerHTML='<my-icon icon="edit" slot="left"></my-icon>Edit';const e=document.createElement("my-button");e.setAttribute("variant","text"),e.setAttribute("icon-only",""),e.setAttribute("size","sm"),e.innerHTML='<my-icon icon="content_copy"></my-icon>';const i=document.createElement("my-button");i.setAttribute("variant","text"),i.setAttribute("icon-only",""),i.setAttribute("size","sm"),i.innerHTML='<my-icon icon="delete" style="color: var(--_global-color-error);"></my-icon>',s.appendChild(t),s.appendChild(e),s.appendChild(i),g.appendChild(S),g.appendChild(_),g.appendChild(E),g.appendChild(T),g.appendChild(s),m.appendChild(C),m.appendChild(g),U.appendChild(m)});const f=document.createElement("div");f.style.cssText=`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid var(--_global-color-outline-variant);
  `;const A=document.createElement("span");A.textContent="Showing 1-4 of 247 products",A.style.cssText=`
    font-size: var(--_global-font-size-body-small);
    color: var(--_global-color-text-secondary);
  `;const h=document.createElement("div");h.style.cssText="display: flex; gap: 8px; align-items: center;";const b=document.createElement("my-button");b.setAttribute("variant","outlined"),b.setAttribute("size","sm"),b.setAttribute("disabled",""),b.innerHTML='<my-icon icon="chevron_left" slot="left"></my-icon>Previous';const L=document.createElement("span");L.textContent="Page 1 of 62",L.style.cssText=`
    font-size: var(--_global-font-size-body-small);
    color: var(--_global-color-text-primary);
    padding: 0 16px;
  `;const R=document.createElement("my-button");return R.setAttribute("variant","outlined"),R.setAttribute("size","sm"),R.innerHTML='Next<my-icon icon="chevron_right" slot="right"></my-icon>',h.appendChild(b),h.appendChild(L),h.appendChild(R),f.appendChild(A),f.appendChild(h),c.appendChild(y),c.appendChild(U),c.appendChild(f),c};G.parameters={docs:{description:{story:"A comprehensive product management interface showcasing complex data layouts, filtering, status indicators, and bulk actions."}}};var Q,X,Y;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
    color: var(--_global-color-text-primary);
  \`;

  // Header
  const header = document.createElement('header');
  header.style.cssText = \`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding: 20px 0;
    border-bottom: 1px solid var(--_global-color-outline-variant);
  \`;
  const headerTitle = document.createElement('div');
  headerTitle.innerHTML = \`
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
  \`;
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
  metricsRow.style.cssText = \`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  \`;
  const metrics = [{
    title: 'Total Revenue',
    value: '$47,392',
    change: '+12.5%',
    trend: 'up',
    icon: 'attach_money',
    color: 'success',
    subtitle: 'vs last month'
  }, {
    title: 'Active Users',
    value: '3,847',
    change: '+8.2%',
    trend: 'up',
    icon: 'people',
    color: 'primary',
    subtitle: '24h active'
  }, {
    title: 'Conversion Rate',
    value: '3.42%',
    change: '-0.5%',
    trend: 'down',
    icon: 'trending_up',
    color: 'warning',
    subtitle: 'this week'
  }, {
    title: 'Server Uptime',
    value: '99.8%',
    change: '',
    trend: 'stable',
    icon: 'cloud_done',
    color: 'info',
    subtitle: '30-day average'
  }];
  metrics.forEach(metric => {
    const card = document.createElement('div');
    card.style.cssText = \`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 24px;
      transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
    \`;
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
    cardIcon.style.cssText = \`color: var(--_global-color-\${metric.color}); font-size: 24px;\`;
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
    cardTitle.style.cssText = \`
      margin: 0 0 4px 0;
      font-size: var(--_global-font-size-label-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    \`;
    const cardValue = document.createElement('div');
    cardValue.textContent = metric.value;
    cardValue.style.cssText = \`
      font-size: var(--_global-font-size-headline-medium);
      font-weight: var(--_global-font-weight-bold);
      color: var(--_global-color-text-primary);
      margin-bottom: 8px;
    \`;
    const cardFooter = document.createElement('div');
    cardFooter.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';
    const cardChange = document.createElement('span');
    if (metric.change) {
      cardChange.textContent = metric.change;
      cardChange.style.cssText = \`
        font-size: var(--_global-font-size-label-small);
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-\${metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'error' : 'text-secondary'});
      \`;
    }
    const cardSubtitle = document.createElement('span');
    cardSubtitle.textContent = metric.subtitle;
    cardSubtitle.style.cssText = \`
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    \`;
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
  gaugesCard.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
  \`;
  const gaugesHeader = document.createElement('div');
  gaugesHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;';
  const gaugesTitle = document.createElement('h3');
  gaugesTitle.textContent = 'System Performance';
  gaugesTitle.style.cssText = \`
    margin: 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  \`;
  const refreshBtn = document.createElement('my-button');
  refreshBtn.setAttribute('variant', 'text');
  refreshBtn.setAttribute('size', 'sm');
  refreshBtn.innerHTML = '<my-icon icon="refresh" slot="left"></my-icon>Refresh';
  gaugesHeader.appendChild(gaugesTitle);
  gaugesHeader.appendChild(refreshBtn);
  const gaugesGrid = document.createElement('div');
  gaugesGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 20px;';
  const gaugeMetrics = [{
    label: 'CPU Usage',
    value: 68,
    variant: 'warning',
    unit: '%'
  }, {
    label: 'Memory',
    value: 45,
    variant: 'success',
    unit: '%'
  }, {
    label: 'Disk I/O',
    value: 82,
    variant: 'error',
    unit: '%'
  }, {
    label: 'Network',
    value: 30,
    variant: 'primary',
    unit: 'Mbps'
  }];
  gaugeMetrics.forEach(({
    label,
    value,
    variant,
    unit
  }) => {
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
  activityCard.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
  \`;
  const activityHeader = document.createElement('h3');
  activityHeader.textContent = 'Recent Activity';
  activityHeader.style.cssText = \`
    margin: 0 0 20px 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  \`;
  const activityList = document.createElement('div');
  activityList.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  const activities = [{
    icon: 'person_add',
    text: 'New user registered',
    time: '2 min ago',
    type: 'success'
  }, {
    icon: 'security',
    text: 'Security scan completed',
    time: '15 min ago',
    type: 'info'
  }, {
    icon: 'warning',
    text: 'High memory usage detected',
    time: '32 min ago',
    type: 'warning'
  }, {
    icon: 'upload',
    text: 'Database backup completed',
    time: '1 hour ago',
    type: 'success'
  }, {
    icon: 'error',
    text: 'Failed login attempt blocked',
    time: '2 hours ago',
    type: 'error'
  }];
  activities.forEach(({
    icon,
    text,
    time,
    type
  }) => {
    const activity = document.createElement('div');
    activity.style.cssText = \`
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--_global-color-outline-variant);
    \`;
    const activityIcon = document.createElement('my-icon');
    activityIcon.setAttribute('icon', icon);
    activityIcon.style.cssText = \`
      color: var(--_global-color-\${type});
      font-size: 20px;
      flex-shrink: 0;
    \`;
    const activityContent = document.createElement('div');
    activityContent.style.cssText = 'flex: 1;';
    const activityText = document.createElement('div');
    activityText.textContent = text;
    activityText.style.cssText = \`
      font-size: var(--_global-font-size-body-small);
      color: var(--_global-color-text-primary);
      margin-bottom: 2px;
    \`;
    const activityTime = document.createElement('div');
    activityTime.textContent = time;
    activityTime.style.cssText = \`
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    \`;
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
  progressSection.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 24px;
    margin-bottom: 32px;
  \`;
  const progressHeader = document.createElement('div');
  progressHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;';
  const progressTitle = document.createElement('h3');
  progressTitle.textContent = 'Project Progress';
  progressTitle.style.cssText = \`
    margin: 0;
    font-size: var(--_global-font-size-title-medium);
    font-weight: var(--_global-font-weight-medium);
    color: var(--_global-color-text-primary);
  \`;
  const addProjectBtn = document.createElement('my-button');
  addProjectBtn.setAttribute('variant', 'filled');
  addProjectBtn.setAttribute('size', 'sm');
  addProjectBtn.innerHTML = '<my-icon icon="add" slot="left"></my-icon>Add Project';
  progressHeader.appendChild(progressTitle);
  progressHeader.appendChild(addProjectBtn);
  const progressGrid = document.createElement('div');
  progressGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;';
  const projects = [{
    name: 'Website Redesign',
    progress: 75,
    variant: 'primary',
    deadline: '2 weeks',
    team: 4
  }, {
    name: 'Mobile App Beta',
    progress: 45,
    variant: 'info',
    deadline: '1 month',
    team: 3
  }, {
    name: 'API Integration',
    progress: 90,
    variant: 'success',
    deadline: '3 days',
    team: 2
  }, {
    name: 'Security Audit',
    progress: 30,
    variant: 'warning',
    deadline: '3 weeks',
    team: 5
  }];
  projects.forEach(({
    name,
    progress,
    variant,
    deadline,
    team
  }) => {
    const projectCard = document.createElement('div');
    projectCard.style.cssText = \`
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-md);
      padding: 20px;
      background: var(--_global-color-surface);
    \`;
    const projectHeader = document.createElement('div');
    projectHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;';
    const projectName = document.createElement('h4');
    projectName.textContent = name;
    projectName.style.cssText = \`
      margin: 0;
      font-size: var(--_global-font-size-body-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-primary);
    \`;
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
    progressLabel.innerHTML = \`
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">Progress</span>
      <span style="font-size: var(--_global-font-size-label-small); font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);">\${progress}%</span>
    \`;
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
    deadlineInfo.innerHTML = \`
      <my-icon icon="schedule" style="font-size: 16px; color: var(--_global-color-text-secondary);"></my-icon>
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">\${deadline}</span>
    \`;
    const teamInfo = document.createElement('div');
    teamInfo.style.cssText = 'display: flex; align-items: center; gap: 6px;';
    teamInfo.innerHTML = \`
      <my-icon icon="group" style="font-size: 16px; color: var(--_global-color-text-secondary);"></my-icon>
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">\${team} members</span>
    \`;
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
  actionsFooter.style.cssText = \`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid var(--_global-color-outline-variant);
  \`;
  const footerInfo = document.createElement('div');
  footerInfo.style.cssText = 'display: flex; align-items: center; gap: 16px;';
  const lastUpdated = document.createElement('span');
  lastUpdated.innerHTML = \`
    <my-icon icon="schedule" style="font-size: 16px; color: var(--_global-color-text-secondary); margin-right: 6px;"></my-icon>
    Last updated: 5 minutes ago
  \`;
  lastUpdated.style.cssText = \`
    font-size: var(--_global-font-size-label-small);
    color: var(--_global-color-text-secondary);
    display: flex;
    align-items: center;
  \`;
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
}`,...(Y=(X=N.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;G.parameters={...G.parameters,docs:{...(Z=G.parameters)==null?void 0:Z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = \`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background: var(--_global-color-surface);
    font-family: var(--_global-font-family-sans);
  \`;

  // Header with filters
  const header = document.createElement('div');
  header.style.cssText = \`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--_global-color-outline-variant);
    flex-wrap: wrap;
    gap: 16px;
  \`;
  const headerTitle = document.createElement('div');
  headerTitle.innerHTML = \`
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
  \`;
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
  categorySelect.setAttribute('options', JSON.stringify([{
    label: 'All Categories',
    value: 'all'
  }, {
    label: 'Electronics',
    value: 'electronics'
  }, {
    label: 'Clothing',
    value: 'clothing'
  }, {
    label: 'Home & Garden',
    value: 'home'
  }, {
    label: 'Sports',
    value: 'sports'
  }]));

  // Status filter
  const statusSelect = document.createElement('my-dropdown');
  statusSelect.setAttribute('trigger-text', 'All Status');
  statusSelect.setAttribute('size', 'sm');
  statusSelect.setAttribute('options', JSON.stringify([{
    label: 'All Status',
    value: 'all'
  }, {
    label: 'In Stock',
    value: 'in-stock'
  }, {
    label: 'Low Stock',
    value: 'low-stock'
  }, {
    label: 'Out of Stock',
    value: 'out-of-stock'
  }]));

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
  const products = [{
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
  }, {
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
  }, {
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
  }, {
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
  }];
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.style.cssText = \`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      overflow: hidden;
      transition: box-shadow var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
    \`;
    productCard.addEventListener('mouseenter', () => {
      productCard.style.boxShadow = 'var(--_global-elevation-2)';
    });
    productCard.addEventListener('mouseleave', () => {
      productCard.style.boxShadow = 'none';
    });

    // Product image placeholder with status
    const imageSection = document.createElement('div');
    imageSection.style.cssText = \`
      position: relative;
      height: 180px;
      background: var(--_global-color-surface-variant);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--_global-color-text-secondary);
      font-size: 48px;
    \`;
    const placeholderIcon = document.createElement('my-icon');
    placeholderIcon.setAttribute('icon', 'image');
    placeholderIcon.style.fontSize = '48px';
    imageSection.appendChild(placeholderIcon);

    // Status badge
    const statusBadge = document.createElement('div');
    const statusConfig = {
      'in-stock': {
        color: 'success',
        text: 'In Stock'
      },
      'low-stock': {
        color: 'warning',
        text: 'Low Stock'
      },
      'out-of-stock': {
        color: 'error',
        text: 'Out of Stock'
      }
    };
    const status = statusConfig[product.status];
    statusBadge.textContent = status.text;
    statusBadge.style.cssText = \`
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--_global-color-\${status.color});
      color: var(--_global-color-on-\${status.color});
      padding: 4px 8px;
      border-radius: var(--_global-border-radius-sm);
      font-size: var(--_global-font-size-label-small);
      font-weight: var(--_global-font-weight-medium);
    \`;
    imageSection.appendChild(statusBadge);

    // Discount badge
    if (product.discount > 0) {
      const discountBadge = document.createElement('div');
      discountBadge.textContent = \`-\${product.discount}%\`;
      discountBadge.style.cssText = \`
        position: absolute;
        top: 12px;
        left: 12px;
        background: var(--_global-color-error);
        color: var(--_global-color-on-error);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: var(--_global-font-size-label-small);
        font-weight: var(--_global-font-weight-bold);
      \`;
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
    productName.style.cssText = \`
      margin: 0 0 4px 0;
      font-size: var(--_global-font-size-body-medium);
      font-weight: var(--_global-font-weight-medium);
      color: var(--_global-color-text-primary);
      line-height: 1.4;
    \`;
    const productSku = document.createElement('p');
    productSku.textContent = \`SKU: \${product.sku}\`;
    productSku.style.cssText = \`
      margin: 0;
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
      font-family: var(--_global-font-family-mono);
    \`;
    productHeader.appendChild(productName);
    productHeader.appendChild(productSku);

    // Rating
    const ratingSection = document.createElement('div');
    ratingSection.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 12px;';
    const starsContainer = document.createElement('div');
    starsContainer.style.cssText = 'display: flex; gap: 2px;';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('my-icon');
      star.setAttribute('icon', i <= Math.floor(product.rating) ? 'star' : i - 0.5 <= product.rating ? 'star_half' : 'star_border');
      star.setAttribute('size', 'sm');
      star.style.color = 'var(--_global-color-warning)';
      starsContainer.appendChild(star);
    }
    const reviewText = document.createElement('span');
    reviewText.textContent = \`(\${product.reviews})\`;
    reviewText.style.cssText = \`
      font-size: var(--_global-font-size-label-small);
      color: var(--_global-color-text-secondary);
    \`;
    ratingSection.appendChild(starsContainer);
    ratingSection.appendChild(reviewText);

    // Price section
    const priceSection = document.createElement('div');
    priceSection.style.cssText = 'display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px;';
    const currentPrice = document.createElement('span');
    currentPrice.textContent = \`$\${product.price}\`;
    currentPrice.style.cssText = \`
      font-size: var(--_global-font-size-title-small);
      font-weight: var(--_global-font-weight-bold);
      color: var(--_global-color-primary);
    \`;
    priceSection.appendChild(currentPrice);
    if (product.originalPrice) {
      const originalPrice = document.createElement('span');
      originalPrice.textContent = \`$\${product.originalPrice}\`;
      originalPrice.style.cssText = \`
        font-size: var(--_global-font-size-body-small);
        color: var(--_global-color-text-secondary);
        text-decoration: line-through;
      \`;
      priceSection.appendChild(originalPrice);
    }

    // Stock info
    const stockSection = document.createElement('div');
    stockSection.style.cssText = 'margin-bottom: 16px;';
    const stockLabel = document.createElement('div');
    stockLabel.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 4px;';
    stockLabel.innerHTML = \`
      <span style="font-size: var(--_global-font-size-label-small); color: var(--_global-color-text-secondary);">Stock Level</span>
      <span style="font-size: var(--_global-font-size-label-small); font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-primary);">\${product.stock} units</span>
    \`;
    const stockProgress = document.createElement('my-progress');
    const stockPercentage = Math.min(product.stock / 50 * 100, 100); // Assume 50 is max stock
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
  paginationSection.style.cssText = \`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 1px solid var(--_global-color-outline-variant);
  \`;
  const paginationInfo = document.createElement('span');
  paginationInfo.textContent = 'Showing 1-4 of 247 products';
  paginationInfo.style.cssText = \`
    font-size: var(--_global-font-size-body-small);
    color: var(--_global-color-text-secondary);
  \`;
  const paginationControls = document.createElement('div');
  paginationControls.style.cssText = 'display: flex; gap: 8px; align-items: center;';
  const prevBtn = document.createElement('my-button');
  prevBtn.setAttribute('variant', 'outlined');
  prevBtn.setAttribute('size', 'sm');
  prevBtn.setAttribute('disabled', '');
  prevBtn.innerHTML = '<my-icon icon="chevron_left" slot="left"></my-icon>Previous';
  const pageInfo = document.createElement('span');
  pageInfo.textContent = 'Page 1 of 62';
  pageInfo.style.cssText = \`
    font-size: var(--_global-font-size-body-small);
    color: var(--_global-color-text-primary);
    padding: 0 16px;
  \`;
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
}`,...(te=(ee=G.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const he=["DashboardAnalytics","ECommerceProductManagement"];export{N as DashboardAnalytics,G as ECommerceProductManagement,he as __namedExportsOrder,fe as default};
