import"./index-C71BMuB7.js";import"./my-input-Cr2iSYlQ.js";import"./base-component-q4KNMHwB.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";const Te={title:"Showcase/MyntUI Library",parameters:{docs:{description:{component:"Comprehensive showcase of MyntUI components in real-world scenarios, demonstrating the power and consistency of the component library."}}}},j=()=>{const m=document.createElement("div");m.style.cssText="max-width: 1200px; margin: 0 auto; font-family: var(--_global-font-family-sans);";const l=document.createElement("header");l.style.cssText=`
    background: var(--_global-color-primary);
    color: var(--_global-color-on-primary);
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--_global-border-radius-lg) var(--_global-border-radius-lg) 0 0;
  `;const t=document.createElement("div");t.style.cssText="display: flex; align-items: center; gap: 12px; font-size: 20px; font-weight: var(--_global-font-weight-bold);";const a=document.createElement("my-icon");a.setAttribute("icon","dashboard"),a.setAttribute("size","lg"),a.style.color="var(--_global-color-on-primary)";const x=document.createElement("span");x.textContent="MyntUI Dashboard",t.appendChild(a),t.appendChild(x);const u=document.createElement("div");u.style.cssText="display: flex; gap: 12px; align-items: center;";const p=document.createElement("my-input");p.setAttribute("type","search"),p.setAttribute("placeholder","Search..."),p.setAttribute("size","small"),p.setAttribute("leading-icon","search"),p.style.width="200px";const r=document.createElement("my-button");r.setAttribute("variant","text"),r.setAttribute("icon-only",""),r.innerHTML='<my-icon icon="notifications" style="color: var(--_global-color-on-primary);"></my-icon>';const c=document.createElement("my-dropdown");c.setAttribute("trigger-text","John Doe"),c.setAttribute("size","sm"),c.setAttribute("options",JSON.stringify([{label:"Profile",value:"profile",icon:"person"},{label:"Settings",value:"settings",icon:"settings"},{label:"Sign Out",value:"logout",icon:"logout"}])),u.appendChild(p),u.appendChild(r),u.appendChild(c),l.appendChild(t),l.appendChild(u);const b=document.createElement("main");b.style.cssText="padding: 24px; background: var(--_global-color-surface); min-height: 600px;";const y=document.createElement("h2");y.textContent="System Overview",y.style.cssText="margin: 0 0 20px 0; font-size: 24px; font-weight: var(--_global-font-weight-medium);";const h=document.createElement("div");h.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 32px;",[{label:"Active Users",value:"2,847",change:"+12%",trend:"up",color:"success"},{label:"Revenue",value:"$45,329",change:"+8.2%",trend:"up",color:"primary"},{label:"Conversion Rate",value:"3.42%",change:"-0.5%",trend:"down",color:"warning"},{label:"Server Load",value:"74%",change:"",trend:"neutral",color:"info"}].forEach(({label:H,value:P,change:M,trend:g,color:B})=>{const C=document.createElement("div");C.style.cssText=`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;const R=document.createElement("div");R.style.cssText="display: flex; justify-content: space-between; align-items: center;";const $=document.createElement("h3");$.textContent=H,$.style.cssText="margin: 0; font-size: 14px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);";const N=document.createElement("my-icon");g==="up"?(N.setAttribute("icon","trending_up"),N.style.color="var(--_global-color-success)"):g==="down"?(N.setAttribute("icon","trending_down"),N.style.color="var(--_global-color-error)"):(N.setAttribute("icon","trending_flat"),N.style.color="var(--_global-color-text-secondary)"),R.appendChild($),R.appendChild(N);const V=document.createElement("div");V.textContent=P,V.style.cssText="font-size: 28px; font-weight: var(--_global-font-weight-bold); color: var(--_global-color-text-primary);";const q=document.createElement("div");q.textContent=M,q.style.cssText=`font-size: 14px; color: var(--_global-color-${g==="up"?"success":g==="down"?"error":"text-secondary"});`,C.appendChild(R),C.appendChild(V),M&&C.appendChild(q),h.appendChild(C)});const d=document.createElement("div");d.style.cssText="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;";const o=document.createElement("div");o.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 20px;
  `;const n=document.createElement("h3");n.textContent="System Performance",n.style.cssText="margin: 0 0 20px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const i=document.createElement("div");i.style.cssText="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;",[{label:"CPU",value:68,variant:"warning"},{label:"Memory",value:45,variant:"success"},{label:"Disk I/O",value:82,variant:"error"},{label:"Network",value:30,variant:"primary"}].forEach(({label:H,value:P,variant:M})=>{const g=document.createElement("my-gauge");g.setAttribute("label",H),g.setAttribute("value",P),g.setAttribute("unit","%"),g.setAttribute("variant",M),g.setAttribute("size","sm"),g.setAttribute("show-value",""),i.appendChild(g)}),o.appendChild(n),o.appendChild(i);const e=document.createElement("div");e.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 20px;
  `;const s=document.createElement("h3");s.textContent="Project Progress",s.style.cssText="margin: 0 0 20px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const _=document.createElement("div");_.style.cssText="display: flex; flex-direction: column; gap: 16px;",[{name:"Website Redesign",progress:75,variant:"primary"},{name:"Mobile App",progress:45,variant:"info"},{name:"API Integration",progress:90,variant:"success"},{name:"Security Audit",progress:30,variant:"warning"}].forEach(({name:H,progress:P,variant:M})=>{const g=document.createElement("div");g.style.cssText="display: flex; flex-direction: column; gap: 4px;";const B=document.createElement("div");B.style.cssText="display: flex; justify-content: space-between; font-size: 14px; font-weight: var(--_global-font-weight-medium);",B.innerHTML=`<span>${H}</span><span>${P}%</span>`;const C=document.createElement("my-progress");C.setAttribute("value",P),C.setAttribute("variant",M),C.setAttribute("size","sm"),g.appendChild(B),g.appendChild(C),_.appendChild(g)}),e.appendChild(s),e.appendChild(_),d.appendChild(o),d.appendChild(e);const T=document.createElement("div");T.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 20px;
    margin-bottom: 24px;
  `;const z=document.createElement("div");z.style.cssText="display: flex; justify-content: between; align-items: center; margin-bottom: 16px;";const w=document.createElement("h3");w.textContent="Recent Activity",w.style.cssText="margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium); flex: 1;";const L=document.createElement("my-dropdown");L.setAttribute("trigger-text","Filter"),L.setAttribute("size","sm"),L.setAttribute("options",JSON.stringify([{label:"All Activity",value:"all"},{label:"Users",value:"users"},{label:"System",value:"system"},{label:"Errors",value:"errors"}])),z.appendChild(w),z.appendChild(L);const I=document.createElement("div");I.style.cssText="display: flex; flex-direction: column; gap: 12px;",[{icon:"person_add",text:"New user registered: alice@example.com",time:"2 min ago",type:"success"},{icon:"security",text:"Security scan completed successfully",time:"15 min ago",type:"info"},{icon:"warning",text:"High memory usage detected on server-02",time:"32 min ago",type:"warning"},{icon:"upload",text:"Database backup completed",time:"1 hour ago",type:"success"},{icon:"error",text:"Failed login attempt from IP 192.168.1.100",time:"2 hours ago",type:"error"}].forEach(({icon:H,text:P,time:M,type:g})=>{const B=document.createElement("div");B.style.cssText="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--_global-color-outline-variant);";const C=document.createElement("my-icon");C.setAttribute("icon",H),C.style.color=`var(--_global-color-${g})`;const R=document.createElement("span");R.textContent=P,R.style.cssText="flex: 1; font-size: 14px;";const $=document.createElement("span");$.textContent=M,$.style.cssText="font-size: 12px; color: var(--_global-color-text-secondary);",B.appendChild(C),B.appendChild(R),B.appendChild($),I.appendChild(B)}),T.appendChild(z),T.appendChild(I);const k=document.createElement("div");k.style.cssText="display: flex; gap: 12px; justify-content: center; margin-top: 24px;";const S=document.createElement("my-button");S.setAttribute("label","Add User"),S.setAttribute("variant","filled"),S.innerHTML='<my-icon icon="person_add" slot="left"></my-icon>Add User';const E=document.createElement("my-button");E.setAttribute("variant","outlined"),E.innerHTML='<my-icon icon="download" slot="left"></my-icon>Export Data';const A=document.createElement("my-button");A.setAttribute("variant","text"),A.innerHTML='<my-icon icon="settings" slot="left"></my-icon>Settings',k.appendChild(S),k.appendChild(E),k.appendChild(A);const U=document.createElement("footer");return U.style.cssText=`
    background: var(--_global-color-surface-container);
    padding: 16px 24px;
    text-align: center;
    color: var(--_global-color-text-secondary);
    border-radius: 0 0 var(--_global-border-radius-lg) var(--_global-border-radius-lg);
    border-top: 1px solid var(--_global-color-outline-variant);
    font-size: 14px;
  `,U.textContent="© 2024 MyntUI Dashboard. Built with MyntUI Component Library.",b.appendChild(y),b.appendChild(h),b.appendChild(d),b.appendChild(T),b.appendChild(k),m.appendChild(l),m.appendChild(b),m.appendChild(U),S.addEventListener("click",()=>{console.log("Add User clicked")}),E.addEventListener("click",()=>{console.log("Export Data clicked")}),A.addEventListener("click",()=>{console.log("Settings clicked")}),m};j.parameters={docs:{description:{story:"A complete dashboard application showcasing the integration of multiple MyntUI components in a real-world scenario."}}};const F=()=>{const m=document.createElement("div");m.style.cssText="max-width: 600px; margin: 0 auto; padding: 24px;";let l=1;const t=3,a=document.createElement("div");a.style.cssText="margin-bottom: 32px;";const x=document.createElement("h2");x.textContent="Account Setup Wizard",x.style.cssText="margin: 0 0 16px 0; text-align: center; font-size: 24px; font-weight: var(--_global-font-weight-medium);";const u=document.createElement("my-progress");u.setAttribute("value",Math.round(l/t*100)),u.setAttribute("variant","primary"),u.setAttribute("show-value","");const p=document.createElement("div");p.textContent=`Step ${l} of ${t}`,p.style.cssText="text-align: center; margin-top: 8px; font-size: 14px; color: var(--_global-color-text-secondary);",a.appendChild(x),a.appendChild(u),a.appendChild(p);const r=document.createElement("div");r.style.cssText=`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 32px;
    min-height: 400px;
  `;const c=document.createElement("div");c.style.cssText="display: flex; flex-direction: column; gap: 20px;";const b=document.createElement("h3");b.textContent="Personal Information",b.style.cssText="margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);";const y=document.createElement("my-input");y.setAttribute("label","First Name"),y.setAttribute("type","text"),y.setAttribute("required","");const h=document.createElement("my-input");h.setAttribute("label","Last Name"),h.setAttribute("type","text"),h.setAttribute("required","");const v=document.createElement("my-input");v.setAttribute("label","Email Address"),v.setAttribute("type","email"),v.setAttribute("required",""),v.setAttribute("leading-icon","email");const d=document.createElement("my-input");d.setAttribute("label","Phone Number"),d.setAttribute("type","tel"),d.setAttribute("helper-text","We'll use this for account verification"),c.appendChild(b),c.appendChild(y),c.appendChild(h),c.appendChild(v),c.appendChild(d);const o=document.createElement("div");o.style.cssText="display: none; flex-direction: column; gap: 20px;";const n=document.createElement("h3");n.textContent="Account Preferences",n.style.cssText="margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);";const i=document.createElement("my-toggle");i.setAttribute("label","Enable email notifications"),i.setAttribute("checked","");const f=document.createElement("my-toggle");f.setAttribute("label","Receive marketing updates");const e=document.createElement("my-checkbox");e.setAttribute("label","Make my profile public");const s=document.createElement("my-radio-group");s.setAttribute("name","theme"),s.setAttribute("value","auto");const _=document.createElement("h4");_.textContent="Theme Preference",_.style.cssText="margin: 16px 0 8px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);";const D=document.createElement("my-radio");D.setAttribute("label","Auto (system preference)"),D.setAttribute("value","auto");const T=document.createElement("my-radio");T.setAttribute("label","Light theme"),T.setAttribute("value","light");const z=document.createElement("my-radio");z.setAttribute("label","Dark theme"),z.setAttribute("value","dark"),s.appendChild(D),s.appendChild(T),s.appendChild(z),o.appendChild(n),o.appendChild(i),o.appendChild(f),o.appendChild(e),o.appendChild(_),o.appendChild(s);const w=document.createElement("div");w.style.cssText="display: none; flex-direction: column; gap: 20px; text-align: center;";const L=document.createElement("h3");L.textContent="Account Created Successfully!",L.style.cssText="margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-success);";const I=document.createElement("my-icon");I.setAttribute("icon","check_circle"),I.setAttribute("size","xl"),I.style.color="var(--_global-color-success)",I.style.margin="20px auto";const O=document.createElement("p");O.textContent="Your account has been created and configured according to your preferences. You can now start using all the features of our platform.",O.style.cssText="color: var(--_global-color-text-secondary); line-height: 1.6; margin: 20px 0;";const k=document.createElement("my-button");k.setAttribute("label","Get Started"),k.setAttribute("variant","filled"),k.style.margin="20px auto 0",w.appendChild(L),w.appendChild(I),w.appendChild(O),w.appendChild(k);const S=document.createElement("div");S.style.cssText="display: flex; justify-content: space-between; margin-top: 32px;";const E=document.createElement("my-button");E.setAttribute("label","Back"),E.setAttribute("variant","outlined"),E.style.visibility="hidden";const A=document.createElement("my-button");A.setAttribute("label","Next"),A.setAttribute("variant","filled"),S.appendChild(E),S.appendChild(A);const U=()=>{c.style.display="none",o.style.display="none",w.style.display="none",l===1?(c.style.display="flex",E.style.visibility="hidden",A.setAttribute("label","Next")):l===2?(o.style.display="flex",E.style.visibility="visible",A.setAttribute("label","Create Account")):l===3&&(w.style.display="flex",E.style.visibility="hidden",A.style.display="none"),u.setAttribute("value",Math.round(l/t*100)),p.textContent=`Step ${l} of ${t}`};return A.addEventListener("click",()=>{l<t&&(l++,U())}),E.addEventListener("click",()=>{l>1&&(l--,U())}),r.appendChild(c),r.appendChild(o),r.appendChild(w),r.appendChild(S),m.appendChild(a),m.appendChild(r),m};F.parameters={docs:{description:{story:"A multi-step form wizard demonstrating progress tracking, form validation, and step navigation using multiple MyntUI components."}}};const W=()=>{const m=document.createElement("div");return m.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto;",[{id:1,name:"Premium Headphones",price:"$299.99",originalPrice:"$399.99",rating:4.5,reviews:128,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",discount:25,inStock:!0,features:["Noise Cancelling","Wireless","30-hour Battery"]},{id:2,name:"Smart Watch",price:"$199.99",originalPrice:null,rating:4.2,reviews:89,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",discount:0,inStock:!1,features:["Heart Rate Monitor","GPS","Water Resistant"]},{id:3,name:"Wireless Speaker",price:"$149.99",originalPrice:"$179.99",rating:4.8,reviews:256,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",discount:17,inStock:!0,features:["360° Sound","Waterproof","Voice Assistant"]}].forEach(t=>{const a=document.createElement("div");a.style.cssText=`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 0;
      overflow: hidden;
      transition: box-shadow var(--_global-motion-duration-short) var(--_global-motion-easing);
      cursor: pointer;
    `,a.addEventListener("mouseenter",()=>{a.style.boxShadow="var(--_global-elevation-2)"}),a.addEventListener("mouseleave",()=>{a.style.boxShadow="none"});const x=document.createElement("div");if(x.style.cssText="position: relative; width: 100%; height: 200px; background: var(--_global-color-surface-variant);",t.discount>0){const e=document.createElement("div");e.textContent=`-${t.discount}%`,e.style.cssText=`
        position: absolute;
        top: 12px;
        left: 12px;
        background: var(--_global-color-error);
        color: var(--_global-color-on-error);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-weight: var(--_global-font-weight-bold);
        z-index: 1;
      `,x.appendChild(e)}if(!t.inStock){const e=document.createElement("div");e.textContent="Out of Stock",e.style.cssText=`
        position: absolute;
        top: 12px;
        right: 12px;
        background: var(--_global-color-surface);
        color: var(--_global-color-error);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-weight: var(--_global-font-weight-medium);
        border: 1px solid var(--_global-color-error);
      `,x.appendChild(e)}const u=document.createElement("my-button");u.setAttribute("variant","text"),u.setAttribute("icon-only",""),u.innerHTML='<my-icon icon="favorite_border"></my-icon>',u.style.cssText=`
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: var(--_global-color-surface);
      border-radius: var(--_global-border-radius-full);
    `;let p=!1;u.addEventListener("click",e=>{e.stopPropagation(),p=!p,u.innerHTML=`<my-icon icon="${p?"favorite":"favorite_border"}" style="color: ${p?"var(--_global-color-error)":"inherit"}"></my-icon>`}),x.appendChild(u);const r=document.createElement("div");r.style.cssText="padding: 20px;";const c=document.createElement("h3");c.textContent=t.name,c.style.cssText="margin: 0 0 8px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const b=document.createElement("div");b.style.cssText="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;";const y=document.createElement("div");y.style.cssText="display: flex; gap: 2px;";for(let e=1;e<=5;e++){const s=document.createElement("my-icon");s.setAttribute("icon",e<=Math.floor(t.rating)?"star":e-.5<=t.rating?"star_half":"star_border"),s.setAttribute("size","sm"),s.style.color="var(--_global-color-warning)",y.appendChild(s)}const h=document.createElement("span");h.textContent=`(${t.reviews})`,h.style.cssText="font-size: 14px; color: var(--_global-color-text-secondary);",b.appendChild(y),b.appendChild(h);const v=document.createElement("div");v.style.cssText="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;",t.features.forEach(e=>{const s=document.createElement("span");s.textContent=e,s.style.cssText=`
        background: var(--_global-color-surface-variant);
        color: var(--_global-color-on-surface-variant);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
      `,v.appendChild(s)});const d=document.createElement("div");d.style.cssText="display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px;";const o=document.createElement("span");if(o.textContent=t.price,o.style.cssText="font-size: 20px; font-weight: var(--_global-font-weight-bold); color: var(--_global-color-primary);",d.appendChild(o),t.originalPrice){const e=document.createElement("span");e.textContent=t.originalPrice,e.style.cssText="font-size: 16px; color: var(--_global-color-text-secondary); text-decoration: line-through;",d.appendChild(e)}const n=document.createElement("div");n.style.cssText="display: flex; gap: 8px;";const i=document.createElement("my-button");i.setAttribute("label",t.inStock?"Add to Cart":"Notify When Available"),i.setAttribute("variant",t.inStock?"filled":"outlined"),i.style.flex="1",t.inStock||i.setAttribute("disabled","");const f=document.createElement("my-button");f.setAttribute("variant","outlined"),f.setAttribute("icon-only",""),f.innerHTML='<my-icon icon="visibility"></my-icon>',i.addEventListener("click",e=>{e.stopPropagation(),console.log(`${t.inStock?"Added to cart":"Added to notify list"}:`,t.name)}),f.addEventListener("click",e=>{e.stopPropagation(),console.log("Quick view:",t.name)}),n.appendChild(i),n.appendChild(f),r.appendChild(c),r.appendChild(b),r.appendChild(v),r.appendChild(d),r.appendChild(n),a.appendChild(x),a.appendChild(r),a.addEventListener("click",()=>{console.log("Product clicked:",t.name)}),m.appendChild(a)}),m};W.parameters={docs:{description:{story:"E-commerce product cards showcasing complex layouts with ratings, pricing, features, and interactive elements."}}};const G=()=>{const m=document.createElement("div");m.style.cssText="max-width: 1200px; margin: 0 auto; padding: 24px;";const l=document.createElement("div");l.style.cssText="text-align: center; margin-bottom: 48px;";const t=document.createElement("h1");t.textContent="MyntUI Component Library",t.style.cssText="margin: 0 0 16px 0; font-size: 36px; font-weight: var(--_global-font-weight-bold); background: linear-gradient(135deg, var(--_global-color-primary), var(--_global-color-secondary)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;";const a=document.createElement("p");a.textContent="A comprehensive collection of accessible, customizable web components",a.style.cssText="margin: 0; font-size: 18px; color: var(--_global-color-text-secondary);",l.appendChild(t),l.appendChild(a);const x=document.createElement("div");x.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;",[{title:"Basic Components",icon:"widgets",color:"primary",components:["my-button","my-icon","my-badge"],description:"Fundamental UI building blocks with consistent styling and behavior"},{title:"Form Components",icon:"edit",color:"secondary",components:["my-input","my-dropdown","my-textarea"],description:"Interactive form elements with validation and accessibility features"},{title:"Boolean Inputs",icon:"check_box",color:"success",components:["my-toggle","my-checkbox","my-radio"],description:"Selection and boolean input components with proper state management"},{title:"Data Visualization",icon:"analytics",color:"info",components:["my-progress","my-gauge","my-sparkline"],description:"Charts and progress indicators for displaying data and metrics"},{title:"Interactive Components",icon:"touch_app",color:"warning",components:["my-tooltip","my-dropdown","my-menu"],description:"Interactive elements with hover states and keyboard navigation"},{title:"Overlay Components",icon:"layers",color:"error",components:["my-modal","my-notification","my-drawer"],description:"Modal dialogs and overlay components with focus management"}].forEach(({title:y,icon:h,color:v,components:d,description:o})=>{const n=document.createElement("div");n.style.cssText=`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 24px;
      transition: transform var(--_global-motion-duration-short) var(--_global-motion-easing);
      cursor: pointer;
    `,n.addEventListener("mouseenter",()=>{n.style.transform="translateY(-4px)",n.style.boxShadow="var(--_global-elevation-2)"}),n.addEventListener("mouseleave",()=>{n.style.transform="translateY(0)",n.style.boxShadow="none"});const i=document.createElement("div");i.style.cssText="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;";const f=document.createElement("my-icon");f.setAttribute("icon",h),f.setAttribute("size","lg"),f.style.color=`var(--_global-color-${v})`;const e=document.createElement("h3");e.textContent=y,e.style.cssText="margin: 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);",i.appendChild(f),i.appendChild(e);const s=document.createElement("p");s.textContent=o,s.style.cssText="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.5;";const _=document.createElement("div");_.style.cssText="display: flex; flex-wrap: wrap; gap: 8px;",d.forEach(D=>{const T=document.createElement("span");T.textContent=D,T.style.cssText=`
        background: var(--_global-color-${v}-container);
        color: var(--_global-color-on-${v}-container);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-family: monospace;
      `,_.appendChild(T)}),n.appendChild(i),n.appendChild(s),n.appendChild(_),x.appendChild(n)});const p=document.createElement("div");p.style.cssText="margin-top: 48px;";const r=document.createElement("h2");r.textContent="Key Features",r.style.cssText="text-align: center; margin: 0 0 32px 0; font-size: 28px; font-weight: var(--_global-font-weight-medium);";const c=document.createElement("div");return c.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;",[{icon:"web",title:"Framework Agnostic",desc:"Built with native Web Components"},{icon:"palette",title:"Material Design 3",desc:"Modern design system principles"},{icon:"accessibility",title:"Accessible",desc:"WCAG 2.1 compliant by default"},{icon:"devices",title:"Responsive",desc:"Works on all screen sizes"},{icon:"speed",title:"Performance",desc:"Optimized for speed and efficiency"},{icon:"extension",title:"Customizable",desc:"Extensive theming capabilities"}].forEach(({icon:y,title:h,desc:v})=>{const d=document.createElement("div");d.style.cssText="text-align: center; padding: 20px;";const o=document.createElement("my-icon");o.setAttribute("icon",y),o.setAttribute("size","xl"),o.style.color="var(--_global-color-primary)",o.style.marginBottom="12px";const n=document.createElement("h3");n.textContent=h,n.style.cssText="margin: 0 0 8px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);";const i=document.createElement("p");i.textContent=v,i.style.cssText="margin: 0; color: var(--_global-color-text-secondary);",d.appendChild(o),d.appendChild(n),d.appendChild(i),c.appendChild(d)}),p.appendChild(r),p.appendChild(c),m.appendChild(l),m.appendChild(x),m.appendChild(p),m};G.parameters={docs:{description:{story:"Overview of the entire MyntUI component library showcasing categories, features, and design principles."}}};var Y,J,K;j.parameters={...j.parameters,docs:{...(Y=j.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1200px; margin: 0 auto; font-family: var(--_global-font-family-sans);';

  // Header
  const header = document.createElement('header');
  header.style.cssText = \`
    background: var(--_global-color-primary);
    color: var(--_global-color-on-primary);
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--_global-border-radius-lg) var(--_global-border-radius-lg) 0 0;
  \`;
  const logo = document.createElement('div');
  logo.style.cssText = 'display: flex; align-items: center; gap: 12px; font-size: 20px; font-weight: var(--_global-font-weight-bold);';
  const logoIcon = document.createElement('my-icon');
  logoIcon.setAttribute('icon', 'dashboard');
  logoIcon.setAttribute('size', 'lg');
  logoIcon.style.color = 'var(--_global-color-on-primary)';
  const logoText = document.createElement('span');
  logoText.textContent = 'MyntUI Dashboard';
  logo.appendChild(logoIcon);
  logo.appendChild(logoText);
  const headerActions = document.createElement('div');
  headerActions.style.cssText = 'display: flex; gap: 12px; align-items: center;';
  const searchInput = document.createElement('my-input');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('placeholder', 'Search...');
  searchInput.setAttribute('size', 'small');
  searchInput.setAttribute('leading-icon', 'search');
  searchInput.style.width = '200px';
  const notificationButton = document.createElement('my-button');
  notificationButton.setAttribute('variant', 'text');
  notificationButton.setAttribute('icon-only', '');
  notificationButton.innerHTML = '<my-icon icon="notifications" style="color: var(--_global-color-on-primary);"></my-icon>';
  const userMenu = document.createElement('my-dropdown');
  userMenu.setAttribute('trigger-text', 'John Doe');
  userMenu.setAttribute('size', 'sm');
  userMenu.setAttribute('options', JSON.stringify([{
    label: 'Profile',
    value: 'profile',
    icon: 'person'
  }, {
    label: 'Settings',
    value: 'settings',
    icon: 'settings'
  }, {
    label: 'Sign Out',
    value: 'logout',
    icon: 'logout'
  }]));
  headerActions.appendChild(searchInput);
  headerActions.appendChild(notificationButton);
  headerActions.appendChild(userMenu);
  header.appendChild(logo);
  header.appendChild(headerActions);

  // Main content area
  const main = document.createElement('main');
  main.style.cssText = 'padding: 24px; background: var(--_global-color-surface); min-height: 600px;';

  // Metrics dashboard
  const metricsTitle = document.createElement('h2');
  metricsTitle.textContent = 'System Overview';
  metricsTitle.style.cssText = 'margin: 0 0 20px 0; font-size: 24px; font-weight: var(--_global-font-weight-medium);';
  const metricsGrid = document.createElement('div');
  metricsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 32px;';

  // Metric cards
  const metrics = [{
    label: 'Active Users',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    color: 'success'
  }, {
    label: 'Revenue',
    value: '$45,329',
    change: '+8.2%',
    trend: 'up',
    color: 'primary'
  }, {
    label: 'Conversion Rate',
    value: '3.42%',
    change: '-0.5%',
    trend: 'down',
    color: 'warning'
  }, {
    label: 'Server Load',
    value: '74%',
    change: '',
    trend: 'neutral',
    color: 'info'
  }];
  metrics.forEach(({
    label,
    value,
    change,
    trend,
    color
  }) => {
    const card = document.createElement('div');
    card.style.cssText = \`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    \`;
    const cardHeader = document.createElement('div');
    cardHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';
    const cardLabel = document.createElement('h3');
    cardLabel.textContent = label;
    cardLabel.style.cssText = 'margin: 0; font-size: 14px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-text-secondary);';
    const trendIcon = document.createElement('my-icon');
    if (trend === 'up') {
      trendIcon.setAttribute('icon', 'trending_up');
      trendIcon.style.color = 'var(--_global-color-success)';
    } else if (trend === 'down') {
      trendIcon.setAttribute('icon', 'trending_down');
      trendIcon.style.color = 'var(--_global-color-error)';
    } else {
      trendIcon.setAttribute('icon', 'trending_flat');
      trendIcon.style.color = 'var(--_global-color-text-secondary)';
    }
    cardHeader.appendChild(cardLabel);
    cardHeader.appendChild(trendIcon);
    const cardValue = document.createElement('div');
    cardValue.textContent = value;
    cardValue.style.cssText = 'font-size: 28px; font-weight: var(--_global-font-weight-bold); color: var(--_global-color-text-primary);';
    const cardChange = document.createElement('div');
    cardChange.textContent = change;
    cardChange.style.cssText = \`font-size: 14px; color: var(--_global-color-\${trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'text-secondary'});\`;
    card.appendChild(cardHeader);
    card.appendChild(cardValue);
    if (change) card.appendChild(cardChange);
    metricsGrid.appendChild(card);
  });

  // Charts and progress section
  const chartsSection = document.createElement('div');
  chartsSection.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;';

  // Performance gauges
  const gaugesCard = document.createElement('div');
  gaugesCard.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 20px;
  \`;
  const gaugesTitle = document.createElement('h3');
  gaugesTitle.textContent = 'System Performance';
  gaugesTitle.style.cssText = 'margin: 0 0 20px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const gaugesContainer = document.createElement('div');
  gaugesContainer.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 16px;';
  const gaugeMetrics = [{
    label: 'CPU',
    value: 68,
    variant: 'warning'
  }, {
    label: 'Memory',
    value: 45,
    variant: 'success'
  }, {
    label: 'Disk I/O',
    value: 82,
    variant: 'error'
  }, {
    label: 'Network',
    value: 30,
    variant: 'primary'
  }];
  gaugeMetrics.forEach(({
    label,
    value,
    variant
  }) => {
    const gauge = document.createElement('my-gauge');
    gauge.setAttribute('label', label);
    gauge.setAttribute('value', value);
    gauge.setAttribute('unit', '%');
    gauge.setAttribute('variant', variant);
    gauge.setAttribute('size', 'sm');
    gauge.setAttribute('show-value', '');
    gaugesContainer.appendChild(gauge);
  });
  gaugesCard.appendChild(gaugesTitle);
  gaugesCard.appendChild(gaugesContainer);

  // Progress tracking
  const progressCard = document.createElement('div');
  progressCard.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 20px;
  \`;
  const progressTitle = document.createElement('h3');
  progressTitle.textContent = 'Project Progress';
  progressTitle.style.cssText = 'margin: 0 0 20px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
  const progressContainer = document.createElement('div');
  progressContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
  const projects = [{
    name: 'Website Redesign',
    progress: 75,
    variant: 'primary'
  }, {
    name: 'Mobile App',
    progress: 45,
    variant: 'info'
  }, {
    name: 'API Integration',
    progress: 90,
    variant: 'success'
  }, {
    name: 'Security Audit',
    progress: 30,
    variant: 'warning'
  }];
  projects.forEach(({
    name,
    progress,
    variant
  }) => {
    const projectRow = document.createElement('div');
    projectRow.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
    const projectHeader = document.createElement('div');
    projectHeader.style.cssText = 'display: flex; justify-content: space-between; font-size: 14px; font-weight: var(--_global-font-weight-medium);';
    projectHeader.innerHTML = \`<span>\${name}</span><span>\${progress}%</span>\`;
    const progressBar = document.createElement('my-progress');
    progressBar.setAttribute('value', progress);
    progressBar.setAttribute('variant', variant);
    progressBar.setAttribute('size', 'sm');
    projectRow.appendChild(projectHeader);
    projectRow.appendChild(progressBar);
    progressContainer.appendChild(projectRow);
  });
  progressCard.appendChild(progressTitle);
  progressCard.appendChild(progressContainer);
  chartsSection.appendChild(gaugesCard);
  chartsSection.appendChild(progressCard);

  // Data table section
  const tableSection = document.createElement('div');
  tableSection.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 20px;
    margin-bottom: 24px;
  \`;
  const tableHeader = document.createElement('div');
  tableHeader.style.cssText = 'display: flex; justify-content: between; align-items: center; margin-bottom: 16px;';
  const tableTitle = document.createElement('h3');
  tableTitle.textContent = 'Recent Activity';
  tableTitle.style.cssText = 'margin: 0; font-size: 18px; font-weight: var(--_global-font-weight-medium); flex: 1;';
  const filterDropdown = document.createElement('my-dropdown');
  filterDropdown.setAttribute('trigger-text', 'Filter');
  filterDropdown.setAttribute('size', 'sm');
  filterDropdown.setAttribute('options', JSON.stringify([{
    label: 'All Activity',
    value: 'all'
  }, {
    label: 'Users',
    value: 'users'
  }, {
    label: 'System',
    value: 'system'
  }, {
    label: 'Errors',
    value: 'errors'
  }]));
  tableHeader.appendChild(tableTitle);
  tableHeader.appendChild(filterDropdown);
  const activityList = document.createElement('div');
  activityList.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
  const activities = [{
    icon: 'person_add',
    text: 'New user registered: alice@example.com',
    time: '2 min ago',
    type: 'success'
  }, {
    icon: 'security',
    text: 'Security scan completed successfully',
    time: '15 min ago',
    type: 'info'
  }, {
    icon: 'warning',
    text: 'High memory usage detected on server-02',
    time: '32 min ago',
    type: 'warning'
  }, {
    icon: 'upload',
    text: 'Database backup completed',
    time: '1 hour ago',
    type: 'success'
  }, {
    icon: 'error',
    text: 'Failed login attempt from IP 192.168.1.100',
    time: '2 hours ago',
    type: 'error'
  }];
  activities.forEach(({
    icon,
    text,
    time,
    type
  }) => {
    const activityRow = document.createElement('div');
    activityRow.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--_global-color-outline-variant);';
    const activityIcon = document.createElement('my-icon');
    activityIcon.setAttribute('icon', icon);
    activityIcon.style.color = \`var(--_global-color-\${type})\`;
    const activityText = document.createElement('span');
    activityText.textContent = text;
    activityText.style.cssText = 'flex: 1; font-size: 14px;';
    const activityTime = document.createElement('span');
    activityTime.textContent = time;
    activityTime.style.cssText = 'font-size: 12px; color: var(--_global-color-text-secondary);';
    activityRow.appendChild(activityIcon);
    activityRow.appendChild(activityText);
    activityRow.appendChild(activityTime);
    activityList.appendChild(activityRow);
  });
  tableSection.appendChild(tableHeader);
  tableSection.appendChild(activityList);

  // Actions section
  const actionsSection = document.createElement('div');
  actionsSection.style.cssText = 'display: flex; gap: 12px; justify-content: center; margin-top: 24px;';
  const addUserButton = document.createElement('my-button');
  addUserButton.setAttribute('label', 'Add User');
  addUserButton.setAttribute('variant', 'filled');
  addUserButton.innerHTML = '<my-icon icon="person_add" slot="left"></my-icon>Add User';
  const exportButton = document.createElement('my-button');
  exportButton.setAttribute('variant', 'outlined');
  exportButton.innerHTML = '<my-icon icon="download" slot="left"></my-icon>Export Data';
  const settingsButton = document.createElement('my-button');
  settingsButton.setAttribute('variant', 'text');
  settingsButton.innerHTML = '<my-icon icon="settings" slot="left"></my-icon>Settings';
  actionsSection.appendChild(addUserButton);
  actionsSection.appendChild(exportButton);
  actionsSection.appendChild(settingsButton);

  // Footer
  const footer = document.createElement('footer');
  footer.style.cssText = \`
    background: var(--_global-color-surface-container);
    padding: 16px 24px;
    text-align: center;
    color: var(--_global-color-text-secondary);
    border-radius: 0 0 var(--_global-border-radius-lg) var(--_global-border-radius-lg);
    border-top: 1px solid var(--_global-color-outline-variant);
    font-size: 14px;
  \`;
  footer.textContent = '© 2024 MyntUI Dashboard. Built with MyntUI Component Library.';

  // Assemble everything
  main.appendChild(metricsTitle);
  main.appendChild(metricsGrid);
  main.appendChild(chartsSection);
  main.appendChild(tableSection);
  main.appendChild(actionsSection);
  container.appendChild(header);
  container.appendChild(main);
  container.appendChild(footer);

  // Add interactivity
  addUserButton.addEventListener('click', () => {
    console.log('Add User clicked');
  });
  exportButton.addEventListener('click', () => {
    console.log('Export Data clicked');
  });
  settingsButton.addEventListener('click', () => {
    console.log('Settings clicked');
  });
  return container;
}`,...(K=(J=j.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;F.parameters={...F.parameters,docs:{...(Q=F.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 600px; margin: 0 auto; padding: 24px;';
  let currentStep = 1;
  const totalSteps = 3;

  // Progress indicator
  const progressContainer = document.createElement('div');
  progressContainer.style.cssText = 'margin-bottom: 32px;';
  const progressTitle = document.createElement('h2');
  progressTitle.textContent = 'Account Setup Wizard';
  progressTitle.style.cssText = 'margin: 0 0 16px 0; text-align: center; font-size: 24px; font-weight: var(--_global-font-weight-medium);';
  const progressBar = document.createElement('my-progress');
  progressBar.setAttribute('value', Math.round(currentStep / totalSteps * 100));
  progressBar.setAttribute('variant', 'primary');
  progressBar.setAttribute('show-value', '');
  const stepIndicator = document.createElement('div');
  stepIndicator.textContent = \`Step \${currentStep} of \${totalSteps}\`;
  stepIndicator.style.cssText = 'text-align: center; margin-top: 8px; font-size: 14px; color: var(--_global-color-text-secondary);';
  progressContainer.appendChild(progressTitle);
  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(stepIndicator);

  // Form container
  const formContainer = document.createElement('div');
  formContainer.style.cssText = \`
    background: var(--_global-color-surface-container);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 32px;
    min-height: 400px;
  \`;

  // Step 1: Personal Information
  const step1 = document.createElement('div');
  step1.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';
  const step1Title = document.createElement('h3');
  step1Title.textContent = 'Personal Information';
  step1Title.style.cssText = 'margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';
  const firstNameInput = document.createElement('my-input');
  firstNameInput.setAttribute('label', 'First Name');
  firstNameInput.setAttribute('type', 'text');
  firstNameInput.setAttribute('required', '');
  const lastNameInput = document.createElement('my-input');
  lastNameInput.setAttribute('label', 'Last Name');
  lastNameInput.setAttribute('type', 'text');
  lastNameInput.setAttribute('required', '');
  const emailInput = document.createElement('my-input');
  emailInput.setAttribute('label', 'Email Address');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('required', '');
  emailInput.setAttribute('leading-icon', 'email');
  const phoneInput = document.createElement('my-input');
  phoneInput.setAttribute('label', 'Phone Number');
  phoneInput.setAttribute('type', 'tel');
  phoneInput.setAttribute('helper-text', 'We\\'ll use this for account verification');
  step1.appendChild(step1Title);
  step1.appendChild(firstNameInput);
  step1.appendChild(lastNameInput);
  step1.appendChild(emailInput);
  step1.appendChild(phoneInput);

  // Step 2: Preferences
  const step2 = document.createElement('div');
  step2.style.cssText = 'display: none; flex-direction: column; gap: 20px;';
  const step2Title = document.createElement('h3');
  step2Title.textContent = 'Account Preferences';
  step2Title.style.cssText = 'margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';
  const notificationsToggle = document.createElement('my-toggle');
  notificationsToggle.setAttribute('label', 'Enable email notifications');
  notificationsToggle.setAttribute('checked', '');
  const marketingToggle = document.createElement('my-toggle');
  marketingToggle.setAttribute('label', 'Receive marketing updates');
  const privacyCheckbox = document.createElement('my-checkbox');
  privacyCheckbox.setAttribute('label', 'Make my profile public');
  const themeRadioGroup = document.createElement('my-radio-group');
  themeRadioGroup.setAttribute('name', 'theme');
  themeRadioGroup.setAttribute('value', 'auto');
  const themeTitle = document.createElement('h4');
  themeTitle.textContent = 'Theme Preference';
  themeTitle.style.cssText = 'margin: 16px 0 8px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);';
  const autoThemeRadio = document.createElement('my-radio');
  autoThemeRadio.setAttribute('label', 'Auto (system preference)');
  autoThemeRadio.setAttribute('value', 'auto');
  const lightThemeRadio = document.createElement('my-radio');
  lightThemeRadio.setAttribute('label', 'Light theme');
  lightThemeRadio.setAttribute('value', 'light');
  const darkThemeRadio = document.createElement('my-radio');
  darkThemeRadio.setAttribute('label', 'Dark theme');
  darkThemeRadio.setAttribute('value', 'dark');
  themeRadioGroup.appendChild(autoThemeRadio);
  themeRadioGroup.appendChild(lightThemeRadio);
  themeRadioGroup.appendChild(darkThemeRadio);
  step2.appendChild(step2Title);
  step2.appendChild(notificationsToggle);
  step2.appendChild(marketingToggle);
  step2.appendChild(privacyCheckbox);
  step2.appendChild(themeTitle);
  step2.appendChild(themeRadioGroup);

  // Step 3: Confirmation
  const step3 = document.createElement('div');
  step3.style.cssText = 'display: none; flex-direction: column; gap: 20px; text-align: center;';
  const step3Title = document.createElement('h3');
  step3Title.textContent = 'Account Created Successfully!';
  step3Title.style.cssText = 'margin: 0 0 16px 0; font-size: 20px; font-weight: var(--_global-font-weight-medium); color: var(--_global-color-success);';
  const successIcon = document.createElement('my-icon');
  successIcon.setAttribute('icon', 'check_circle');
  successIcon.setAttribute('size', 'xl');
  successIcon.style.color = 'var(--_global-color-success)';
  successIcon.style.margin = '20px auto';
  const confirmationText = document.createElement('p');
  confirmationText.textContent = 'Your account has been created and configured according to your preferences. You can now start using all the features of our platform.';
  confirmationText.style.cssText = 'color: var(--_global-color-text-secondary); line-height: 1.6; margin: 20px 0;';
  const getStartedButton = document.createElement('my-button');
  getStartedButton.setAttribute('label', 'Get Started');
  getStartedButton.setAttribute('variant', 'filled');
  getStartedButton.style.margin = '20px auto 0';
  step3.appendChild(step3Title);
  step3.appendChild(successIcon);
  step3.appendChild(confirmationText);
  step3.appendChild(getStartedButton);

  // Navigation buttons
  const navigationSection = document.createElement('div');
  navigationSection.style.cssText = 'display: flex; justify-content: space-between; margin-top: 32px;';
  const backButton = document.createElement('my-button');
  backButton.setAttribute('label', 'Back');
  backButton.setAttribute('variant', 'outlined');
  backButton.style.visibility = 'hidden';
  const nextButton = document.createElement('my-button');
  nextButton.setAttribute('label', 'Next');
  nextButton.setAttribute('variant', 'filled');
  navigationSection.appendChild(backButton);
  navigationSection.appendChild(nextButton);

  // Update form display
  const updateStep = () => {
    // Hide all steps
    step1.style.display = 'none';
    step2.style.display = 'none';
    step3.style.display = 'none';

    // Show current step
    if (currentStep === 1) {
      step1.style.display = 'flex';
      backButton.style.visibility = 'hidden';
      nextButton.setAttribute('label', 'Next');
    } else if (currentStep === 2) {
      step2.style.display = 'flex';
      backButton.style.visibility = 'visible';
      nextButton.setAttribute('label', 'Create Account');
    } else if (currentStep === 3) {
      step3.style.display = 'flex';
      backButton.style.visibility = 'hidden';
      nextButton.style.display = 'none';
    }

    // Update progress
    progressBar.setAttribute('value', Math.round(currentStep / totalSteps * 100));
    stepIndicator.textContent = \`Step \${currentStep} of \${totalSteps}\`;
  };

  // Navigation handlers
  nextButton.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateStep();
    }
  });
  backButton.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateStep();
    }
  });

  // Assemble form
  formContainer.appendChild(step1);
  formContainer.appendChild(step2);
  formContainer.appendChild(step3);
  formContainer.appendChild(navigationSection);
  container.appendChild(progressContainer);
  container.appendChild(formContainer);
  return container;
}`,...(Z=(X=F.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,ne;W.parameters={...W.parameters,docs:{...(ee=W.parameters)==null?void 0:ee.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto;';
  const products = [{
    id: 1,
    name: 'Premium Headphones',
    price: '$299.99',
    originalPrice: '$399.99',
    rating: 4.5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    discount: 25,
    inStock: true,
    features: ['Noise Cancelling', 'Wireless', '30-hour Battery']
  }, {
    id: 2,
    name: 'Smart Watch',
    price: '$199.99',
    originalPrice: null,
    rating: 4.2,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    discount: 0,
    inStock: false,
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant']
  }, {
    id: 3,
    name: 'Wireless Speaker',
    price: '$149.99',
    originalPrice: '$179.99',
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop',
    discount: 17,
    inStock: true,
    features: ['360° Sound', 'Waterproof', 'Voice Assistant']
  }];
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.style.cssText = \`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 0;
      overflow: hidden;
      transition: box-shadow var(--_global-motion-duration-short) var(--_global-motion-easing);
      cursor: pointer;
    \`;
    productCard.addEventListener('mouseenter', () => {
      productCard.style.boxShadow = 'var(--_global-elevation-2)';
    });
    productCard.addEventListener('mouseleave', () => {
      productCard.style.boxShadow = 'none';
    });

    // Product image
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = 'position: relative; width: 100%; height: 200px; background: var(--_global-color-surface-variant);';

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
        font-size: 12px;
        font-weight: var(--_global-font-weight-bold);
        z-index: 1;
      \`;
      imageContainer.appendChild(discountBadge);
    }

    // Stock status
    if (!product.inStock) {
      const stockBadge = document.createElement('div');
      stockBadge.textContent = 'Out of Stock';
      stockBadge.style.cssText = \`
        position: absolute;
        top: 12px;
        right: 12px;
        background: var(--_global-color-surface);
        color: var(--_global-color-error);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-weight: var(--_global-font-weight-medium);
        border: 1px solid var(--_global-color-error);
      \`;
      imageContainer.appendChild(stockBadge);
    }

    // Favorite button
    const favoriteButton = document.createElement('my-button');
    favoriteButton.setAttribute('variant', 'text');
    favoriteButton.setAttribute('icon-only', '');
    favoriteButton.innerHTML = '<my-icon icon="favorite_border"></my-icon>';
    favoriteButton.style.cssText = \`
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: var(--_global-color-surface);
      border-radius: var(--_global-border-radius-full);
    \`;
    let isFavorite = false;
    favoriteButton.addEventListener('click', e => {
      e.stopPropagation();
      isFavorite = !isFavorite;
      favoriteButton.innerHTML = \`<my-icon icon="\${isFavorite ? 'favorite' : 'favorite_border'}" style="color: \${isFavorite ? 'var(--_global-color-error)' : 'inherit'}"></my-icon>\`;
    });
    imageContainer.appendChild(favoriteButton);

    // Product details
    const detailsContainer = document.createElement('div');
    detailsContainer.style.cssText = 'padding: 20px;';

    // Product name
    const productName = document.createElement('h3');
    productName.textContent = product.name;
    productName.style.cssText = 'margin: 0 0 8px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';

    // Rating
    const ratingContainer = document.createElement('div');
    ratingContainer.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 12px;';
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
    reviewText.style.cssText = 'font-size: 14px; color: var(--_global-color-text-secondary);';
    ratingContainer.appendChild(starsContainer);
    ratingContainer.appendChild(reviewText);

    // Features
    const featuresContainer = document.createElement('div');
    featuresContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;';
    product.features.forEach(feature => {
      const featureBadge = document.createElement('span');
      featureBadge.textContent = feature;
      featureBadge.style.cssText = \`
        background: var(--_global-color-surface-variant);
        color: var(--_global-color-on-surface-variant);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
      \`;
      featuresContainer.appendChild(featureBadge);
    });

    // Price
    const priceContainer = document.createElement('div');
    priceContainer.style.cssText = 'display: flex; align-items: baseline; gap: 8px; margin-bottom: 16px;';
    const currentPrice = document.createElement('span');
    currentPrice.textContent = product.price;
    currentPrice.style.cssText = 'font-size: 20px; font-weight: var(--_global-font-weight-bold); color: var(--_global-color-primary);';
    priceContainer.appendChild(currentPrice);
    if (product.originalPrice) {
      const originalPrice = document.createElement('span');
      originalPrice.textContent = product.originalPrice;
      originalPrice.style.cssText = 'font-size: 16px; color: var(--_global-color-text-secondary); text-decoration: line-through;';
      priceContainer.appendChild(originalPrice);
    }

    // Actions
    const actionsContainer = document.createElement('div');
    actionsContainer.style.cssText = 'display: flex; gap: 8px;';
    const addToCartButton = document.createElement('my-button');
    addToCartButton.setAttribute('label', product.inStock ? 'Add to Cart' : 'Notify When Available');
    addToCartButton.setAttribute('variant', product.inStock ? 'filled' : 'outlined');
    addToCartButton.style.flex = '1';
    if (!product.inStock) addToCartButton.setAttribute('disabled', '');
    const quickViewButton = document.createElement('my-button');
    quickViewButton.setAttribute('variant', 'outlined');
    quickViewButton.setAttribute('icon-only', '');
    quickViewButton.innerHTML = '<my-icon icon="visibility"></my-icon>';
    addToCartButton.addEventListener('click', e => {
      e.stopPropagation();
      console.log(\`\${product.inStock ? 'Added to cart' : 'Added to notify list'}:\`, product.name);
    });
    quickViewButton.addEventListener('click', e => {
      e.stopPropagation();
      console.log('Quick view:', product.name);
    });
    actionsContainer.appendChild(addToCartButton);
    actionsContainer.appendChild(quickViewButton);

    // Assemble card
    detailsContainer.appendChild(productName);
    detailsContainer.appendChild(ratingContainer);
    detailsContainer.appendChild(featuresContainer);
    detailsContainer.appendChild(priceContainer);
    detailsContainer.appendChild(actionsContainer);
    productCard.appendChild(imageContainer);
    productCard.appendChild(detailsContainer);
    productCard.addEventListener('click', () => {
      console.log('Product clicked:', product.name);
    });
    container.appendChild(productCard);
  });
  return container;
}`,...(ne=(te=W.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,ae,re;G.parameters={...G.parameters,docs:{...(oe=G.parameters)==null?void 0:oe.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 1200px; margin: 0 auto; padding: 24px;';

  // Header
  const header = document.createElement('div');
  header.style.cssText = 'text-align: center; margin-bottom: 48px;';
  const title = document.createElement('h1');
  title.textContent = 'MyntUI Component Library';
  title.style.cssText = 'margin: 0 0 16px 0; font-size: 36px; font-weight: var(--_global-font-weight-bold); background: linear-gradient(135deg, var(--_global-color-primary), var(--_global-color-secondary)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;';
  const subtitle = document.createElement('p');
  subtitle.textContent = 'A comprehensive collection of accessible, customizable web components';
  subtitle.style.cssText = 'margin: 0; font-size: 18px; color: var(--_global-color-text-secondary);';
  header.appendChild(title);
  header.appendChild(subtitle);

  // Component categories
  const categoriesContainer = document.createElement('div');
  categoriesContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;';
  const categories = [{
    title: 'Basic Components',
    icon: 'widgets',
    color: 'primary',
    components: ['my-button', 'my-icon', 'my-badge'],
    description: 'Fundamental UI building blocks with consistent styling and behavior'
  }, {
    title: 'Form Components',
    icon: 'edit',
    color: 'secondary',
    components: ['my-input', 'my-dropdown', 'my-textarea'],
    description: 'Interactive form elements with validation and accessibility features'
  }, {
    title: 'Boolean Inputs',
    icon: 'check_box',
    color: 'success',
    components: ['my-toggle', 'my-checkbox', 'my-radio'],
    description: 'Selection and boolean input components with proper state management'
  }, {
    title: 'Data Visualization',
    icon: 'analytics',
    color: 'info',
    components: ['my-progress', 'my-gauge', 'my-sparkline'],
    description: 'Charts and progress indicators for displaying data and metrics'
  }, {
    title: 'Interactive Components',
    icon: 'touch_app',
    color: 'warning',
    components: ['my-tooltip', 'my-dropdown', 'my-menu'],
    description: 'Interactive elements with hover states and keyboard navigation'
  }, {
    title: 'Overlay Components',
    icon: 'layers',
    color: 'error',
    components: ['my-modal', 'my-notification', 'my-drawer'],
    description: 'Modal dialogs and overlay components with focus management'
  }];
  categories.forEach(({
    title,
    icon,
    color,
    components,
    description
  }) => {
    const categoryCard = document.createElement('div');
    categoryCard.style.cssText = \`
      background: var(--_global-color-surface-container);
      border: 1px solid var(--_global-color-outline-variant);
      border-radius: var(--_global-border-radius-lg);
      padding: 24px;
      transition: transform var(--_global-motion-duration-short) var(--_global-motion-easing);
      cursor: pointer;
    \`;
    categoryCard.addEventListener('mouseenter', () => {
      categoryCard.style.transform = 'translateY(-4px)';
      categoryCard.style.boxShadow = 'var(--_global-elevation-2)';
    });
    categoryCard.addEventListener('mouseleave', () => {
      categoryCard.style.transform = 'translateY(0)';
      categoryCard.style.boxShadow = 'none';
    });
    const cardHeader = document.createElement('div');
    cardHeader.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-bottom: 16px;';
    const cardIcon = document.createElement('my-icon');
    cardIcon.setAttribute('icon', icon);
    cardIcon.setAttribute('size', 'lg');
    cardIcon.style.color = \`var(--_global-color-\${color})\`;
    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;
    cardTitle.style.cssText = 'margin: 0; font-size: 20px; font-weight: var(--_global-font-weight-medium);';
    cardHeader.appendChild(cardIcon);
    cardHeader.appendChild(cardTitle);
    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;
    cardDescription.style.cssText = 'margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.5;';
    const componentsList = document.createElement('div');
    componentsList.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;';
    components.forEach(component => {
      const componentBadge = document.createElement('span');
      componentBadge.textContent = component;
      componentBadge.style.cssText = \`
        background: var(--_global-color-\${color}-container);
        color: var(--_global-color-on-\${color}-container);
        padding: 4px 8px;
        border-radius: var(--_global-border-radius-sm);
        font-size: 12px;
        font-family: monospace;
      \`;
      componentsList.appendChild(componentBadge);
    });
    categoryCard.appendChild(cardHeader);
    categoryCard.appendChild(cardDescription);
    categoryCard.appendChild(componentsList);
    categoriesContainer.appendChild(categoryCard);
  });

  // Features section
  const featuresSection = document.createElement('div');
  featuresSection.style.cssText = 'margin-top: 48px;';
  const featuresTitle = document.createElement('h2');
  featuresTitle.textContent = 'Key Features';
  featuresTitle.style.cssText = 'text-align: center; margin: 0 0 32px 0; font-size: 28px; font-weight: var(--_global-font-weight-medium);';
  const featuresGrid = document.createElement('div');
  featuresGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;';
  const features = [{
    icon: 'web',
    title: 'Framework Agnostic',
    desc: 'Built with native Web Components'
  }, {
    icon: 'palette',
    title: 'Material Design 3',
    desc: 'Modern design system principles'
  }, {
    icon: 'accessibility',
    title: 'Accessible',
    desc: 'WCAG 2.1 compliant by default'
  }, {
    icon: 'devices',
    title: 'Responsive',
    desc: 'Works on all screen sizes'
  }, {
    icon: 'speed',
    title: 'Performance',
    desc: 'Optimized for speed and efficiency'
  }, {
    icon: 'extension',
    title: 'Customizable',
    desc: 'Extensive theming capabilities'
  }];
  features.forEach(({
    icon,
    title,
    desc
  }) => {
    const featureCard = document.createElement('div');
    featureCard.style.cssText = 'text-align: center; padding: 20px;';
    const featureIcon = document.createElement('my-icon');
    featureIcon.setAttribute('icon', icon);
    featureIcon.setAttribute('size', 'xl');
    featureIcon.style.color = 'var(--_global-color-primary)';
    featureIcon.style.marginBottom = '12px';
    const featureTitle = document.createElement('h3');
    featureTitle.textContent = title;
    featureTitle.style.cssText = 'margin: 0 0 8px 0; font-size: 18px; font-weight: var(--_global-font-weight-medium);';
    const featureDesc = document.createElement('p');
    featureDesc.textContent = desc;
    featureDesc.style.cssText = 'margin: 0; color: var(--_global-color-text-secondary);';
    featureCard.appendChild(featureIcon);
    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureDesc);
    featuresGrid.appendChild(featureCard);
  });
  featuresSection.appendChild(featuresTitle);
  featuresSection.appendChild(featuresGrid);
  container.appendChild(header);
  container.appendChild(categoriesContainer);
  container.appendChild(featuresSection);
  return container;
}`,...(re=(ae=G.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const we=["CompleteApplicationExample","FormWizardExample","ECommerceExample","ComponentLibraryOverview"];export{j as CompleteApplicationExample,G as ComponentLibraryOverview,W as ECommerceExample,F as FormWizardExample,we as __namedExportsOrder,Te as default};
