import"./my-data-list-DU8MtKuH.js";import"./my-input-Cr2iSYlQ.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./base-component-q4KNMHwB.js";const it={title:"Components/my-data-list",parameters:{docs:{description:{component:"Displays a list of data items with built-in controls for searching, filtering, sorting, and pagination/infinite scroll. Perfect for displaying datasets with user interaction."}}},argTypes:{searchable:{control:"boolean",description:"Enable search functionality"},sortable:{control:"boolean",description:"Enable sorting functionality"},filterable:{control:"boolean",description:"Enable filtering functionality"},paginationType:{control:{type:"select"},options:["pagination","infinite","none"],description:"Type of pagination"},pageSize:{control:{type:"number",min:5,max:50},description:"Number of items per page"},loading:{control:"boolean",description:"Show loading state"},emptyMessage:{control:"text",description:"Message shown when no data"},searchPlaceholder:{control:"text",description:"Search input placeholder"}}},S=(e=50)=>{const a=["John","Jane","Bob","Alice","Charlie","Diana","Edward","Fiona","George","Helen"],t=["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"],o=["Engineering","Design","Marketing","Sales","HR","Finance"],c=["Developer","Designer","Manager","Analyst","Coordinator","Specialist"];return Array.from({length:e},(u,n)=>({id:n+1,name:`${a[n%a.length]} ${t[n%t.length]}`,email:`user${n+1}@company.com`,department:o[n%o.length],role:c[n%c.length],status:n%3===0?"Active":n%3===1?"Inactive":"Pending",salary:5e4+n*1e3,joinDate:new Date(2020+n%4,n%12,n%28+1).toISOString().split("T")[0]}))},Z=e=>{const a=document.createElement("div");a.style.cssText="padding: 24px; max-width: 800px;";const t=document.createElement("my-data-list");e.searchable&&t.setAttribute("searchable",""),e.sortable&&t.setAttribute("sortable",""),e.filterable&&t.setAttribute("filterable",""),e.paginationType&&e.paginationType!=="pagination"&&t.setAttribute("pagination-type",e.paginationType),e.pageSize&&e.pageSize!==10&&t.setAttribute("page-size",e.pageSize),e.loading&&t.setAttribute("loading",""),e.emptyMessage&&e.emptyMessage!=="No data available"&&t.setAttribute("empty-message",e.emptyMessage),e.searchPlaceholder&&e.searchPlaceholder!=="Search..."&&t.setAttribute("search-placeholder",e.searchPlaceholder);const o=S(25);t.rows=o,t.totalItems=o.length;const c=document.createElement("template");return c.innerHTML=`
    <div slot="item" class="custom-user-item" style="display: flex; gap: 16px; align-items: center;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; color: var(--_global-color-on-primary-container); font-weight: bold;"></div>
      <div style="flex: 1;">
        <div style="font-weight: var(--_global-font-weight-medium); margin-bottom: 4px;"></div>
        <div style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary);"></div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: var(--_global-font-size-sm); margin-bottom: 4px;"></div>
        <div style="font-size: var(--_global-font-size-xs); color: var(--_global-color-text-secondary);"></div>
      </div>
    </div>
  `,t.addEventListener("query-change",u=>{const{query:n}=u.detail;console.log("Query changed:",n);let r=[...o];if(n.searchBy&&(r=r.filter(i=>i.name.toLowerCase().includes(n.searchBy.toLowerCase())||i.email.toLowerCase().includes(n.searchBy.toLowerCase())||i.department.toLowerCase().includes(n.searchBy.toLowerCase()))),n.sortBy.length>0){const{field:i,direction:l}=n.sortBy[0];r.sort((d,m)=>{const s=d[i],g=m[i];return l==="asc"?s>g?1:-1:s<g?1:-1})}const p=n.offset,y=p+n.limit,h=r.slice(p,y);t.rows=h,t.totalItems=r.length}),a.appendChild(t),a},b=Z.bind({});b.args={searchable:!0,sortable:!1,filterable:!1,paginationType:"pagination",pageSize:10,loading:!1,emptyMessage:"No data available",searchPlaceholder:"Search users..."};const v=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; max-width: 1000px;";const a=document.createElement("h3");a.textContent="Data List with All Features",a.style.cssText="margin: 0 0 16px 0;";const t=document.createElement("my-data-list");t.setAttribute("searchable",""),t.setAttribute("sortable",""),t.setAttribute("filterable",""),t.setAttribute("pagination-type","pagination"),t.setAttribute("page-size","8"),t.setAttribute("search-placeholder","Search by name, email, or department...");const o=S(50);t.rows=o.slice(0,8),t.totalItems=o.length;const c=document.createElement("div");return c.setAttribute("slot","header"),c.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h4 style="margin: 0;">Employee Directory</h4>
      <div style="display: flex; gap: 8px;">
        <my-button variant="outlined" label="Export" size="sm"></my-button>
        <my-button variant="filled" label="Add Employee" size="sm"></my-button>
      </div>
    </div>
  `,t.innerHTML=`
    <div slot="item" class="employee-card" style="display: grid; grid-template-columns: auto 1fr auto auto; gap: 16px; align-items: center;">
      <div class="avatar" style="width: 48px; height: 48px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; color: var(--_global-color-on-primary-container); font-weight: bold; font-size: 18px;"></div>
      
      <div class="employee-info">
        <div class="employee-name" style="font-weight: var(--_global-font-weight-medium); font-size: var(--_global-font-size-md); margin-bottom: 4px;"></div>
        <div class="employee-email" style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary);"></div>
      </div>
      
      <div class="department-role" style="text-align: center;">
        <div class="department" style="font-size: var(--_global-font-size-sm); font-weight: var(--_global-font-weight-medium); margin-bottom: 2px;"></div>
        <div class="role" style="font-size: var(--_global-font-size-xs); color: var(--_global-color-text-secondary);"></div>
      </div>
      
      <div class="status-badge" style="padding: 4px 8px; border-radius: var(--_global-border-radius-full); font-size: var(--_global-font-size-xs); font-weight: var(--_global-font-weight-medium);"></div>
    </div>
  `,t.appendChild(c),t.addEventListener("query-change",u=>{const{query:n}=u.detail;let r=[...o];if(n.searchBy){const i=n.searchBy.toLowerCase();r=r.filter(l=>l.name.toLowerCase().includes(i)||l.email.toLowerCase().includes(i)||l.department.toLowerCase().includes(i)||l.role.toLowerCase().includes(i))}if(n.sortBy.length>0){const{field:i,direction:l}=n.sortBy[0];r.sort((d,m)=>{let s=d[i],g=m[i];return typeof s=="string"&&(s=s.toLowerCase(),g=g.toLowerCase()),l==="asc"?s>g?1:s<g?-1:0:s<g?1:s>g?-1:0})}const p=n.offset,y=p+n.limit,h=r.slice(p,y);t.rows=h,t.totalItems=r.length,setTimeout(()=>{t.shadowRoot.querySelectorAll(".employee-card").forEach((l,d)=>{const m=h[d];if(m){const s=l.querySelector(".avatar"),g=l.querySelector(".employee-name"),O=l.querySelector(".employee-email"),Q=l.querySelector(".department"),X=l.querySelector(".role"),A=l.querySelector(".status-badge");s.textContent=m.name.split(" ").map(Y=>Y[0]).join(""),g.textContent=m.name,O.textContent=m.email,Q.textContent=m.department,X.textContent=m.role,A.textContent=m.status;const E={Active:{bg:"var(--_global-color-success-container)",text:"var(--_global-color-on-success-container)"},Inactive:{bg:"var(--_global-color-error-container)",text:"var(--_global-color-on-error-container)"},Pending:{bg:"var(--_global-color-warning-container)",text:"var(--_global-color-on-warning-container)"}},_=E[m.status]||E.Pending;A.style.backgroundColor=_.bg,A.style.color=_.text}})},50)}),t.dispatchEvent(new CustomEvent("query-change",{detail:{query:t.query}})),e.appendChild(a),e.appendChild(t),e};v.parameters={docs:{description:{story:"Complete data list with search, sort, filter, pagination, and custom item templates."}}};const f=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; max-width: 600px;";const a=document.createElement("h3");a.textContent="Infinite Scroll Data List",a.style.cssText="margin: 0 0 16px 0;";const t=document.createElement("my-data-list");t.setAttribute("searchable",""),t.setAttribute("pagination-type","infinite"),t.setAttribute("page-size","10"),t.setAttribute("search-placeholder","Search products...");const c=((n=100)=>{const r=["Electronics","Clothing","Books","Home & Garden","Sports","Toys"],p=["Premium","Professional","Deluxe","Standard","Essential","Advanced"],y=["Laptop","Headphones","T-Shirt","Book","Camera","Phone","Watch","Keyboard"];return Array.from({length:n},(h,i)=>({id:i+1,name:`${p[i%p.length]} ${y[i%y.length]} ${i+1}`,category:r[i%r.length],price:Math.floor(Math.random()*500+10),rating:(Math.random()*4+1).toFixed(1),inStock:i%4!==0}))})(100);let u=c.slice(0,10);return t.rows=u,t.totalItems=c.length,t.innerHTML=`
    <div slot="item" class="product-card" style="display: flex; gap: 12px; align-items: center;">
      <div class="product-image" style="width: 60px; height: 60px; border-radius: var(--_global-border-radius-md); background: var(--_global-color-surface-container); display: flex; align-items: center; justify-content: center;">
        <my-icon icon="inventory"></my-icon>
      </div>
      <div style="flex: 1;">
        <div class="product-name" style="font-weight: var(--_global-font-weight-medium); margin-bottom: 4px;"></div>
        <div class="product-category" style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary); margin-bottom: 2px;"></div>
        <div class="product-rating" style="font-size: var(--_global-font-size-sm);"></div>
      </div>
      <div class="product-details" style="text-align: right;">
        <div class="product-price" style="font-weight: var(--_global-font-weight-bold); font-size: var(--_global-font-size-lg); margin-bottom: 4px;"></div>
        <div class="product-stock" style="font-size: var(--_global-font-size-xs);"></div>
      </div>
    </div>
  `,t.addEventListener("query-change",n=>{const{query:r}=n.detail;t.loading=!0,setTimeout(()=>{let p=[...c];if(r.searchBy){const l=r.searchBy.toLowerCase();p=p.filter(d=>d.name.toLowerCase().includes(l)||d.category.toLowerCase().includes(l))}const y=r.offset,h=y+r.limit,i=p.slice(y,h);r.offset===0?u=i:u=[...u,...i],t.rows=u,t.totalItems=p.length,t.loading=!1,setTimeout(()=>{t.shadowRoot.querySelectorAll(".product-card").forEach((d,m)=>{const s=u[m];s&&(d.querySelector(".product-name").textContent=s.name,d.querySelector(".product-category").textContent=s.category,d.querySelector(".product-rating").textContent=`★ ${s.rating}`,d.querySelector(".product-price").textContent=`$${s.price}`,d.querySelector(".product-stock").textContent=s.inStock?"In Stock":"Out of Stock",d.querySelector(".product-stock").style.color=s.inStock?"var(--_global-color-success)":"var(--_global-color-error)")})},10)},1e3)}),t.dispatchEvent(new CustomEvent("query-change",{detail:{query:t.query}})),e.appendChild(a),e.appendChild(t),e};f.parameters={docs:{description:{story:"Data list with infinite scroll pagination for loading large datasets progressively."}}};const x=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; max-width: 600px;";const a=document.createElement("my-data-list");a.setAttribute("searchable",""),a.setAttribute("empty-message","No employees found"),a.setAttribute("search-placeholder","Search employees..."),a.rows=[],a.totalItems=0;const t=document.createElement("div");t.setAttribute("slot","empty"),t.innerHTML=`
    <div style="display: flex; flex-direction: column; align-items: center; padding: 48px 24px; text-align: center;">
      <my-icon icon="people" size="xl" style="color: var(--_global-color-text-secondary); margin-bottom: 16px; opacity: 0.5;"></my-icon>
      <h3 style="margin: 0 0 8px 0; font-size: var(--_global-font-size-lg); color: var(--_global-color-on-surface);">No employees found</h3>
      <p style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); max-width: 300px;">
        Try adjusting your search criteria or add some employees to get started.
      </p>
      <my-button variant="filled" label="Add Employee"></my-button>
    </div>
  `,a.appendChild(t);const o=document.createElement("h3");return o.textContent="Empty State Example",o.style.cssText="margin: 0 0 16px 0;",e.appendChild(o),e.appendChild(a),e};x.parameters={docs:{description:{story:"Data list with custom empty state when no data is available."}}};const L=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; max-width: 600px;";const a=document.createElement("my-data-list");a.setAttribute("searchable",""),a.setAttribute("loading",""),a.setAttribute("search-placeholder","Search...");const t=S(5);a.rows=t,a.totalItems=25;const o=document.createElement("h3");o.textContent="Loading State Example",o.style.cssText="margin: 0 0 16px 0;";const c=document.createElement("my-button");return c.setAttribute("variant","outlined"),c.setAttribute("label","Toggle Loading"),c.style.marginBottom="16px",c.addEventListener("click",()=>{a.loading=!a.loading}),e.appendChild(o),e.appendChild(c),e.appendChild(a),e};L.parameters={docs:{description:{story:"Data list showing loading state during data operations."}}};const w=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; max-width: 500px;";const a=document.createElement("my-data-list");a.setAttribute("pagination-type","none");const t=[{title:"Important Task",priority:"High",due:"Today"},{title:"Review Documents",priority:"Medium",due:"Tomorrow"},{title:"Team Meeting",priority:"Low",due:"Friday"},{title:"Project Planning",priority:"High",due:"Next Week"}];a.rows=t,a.totalItems=t.length;const o=document.createElement("h3");return o.textContent="Minimal Data List",o.style.cssText="margin: 0 0 16px 0;",e.appendChild(o),e.appendChild(a),e};w.parameters={docs:{description:{story:"Minimal data list with just basic item display and no controls."}}};const C=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; max-width: 600px;";const a=document.createElement("div");a.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Keyboard navigation with arrow keys</li>
      <li>Proper ARIA roles and labels</li>
      <li>Focus management and indicators</li>
      <li>Screen reader friendly</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  `;const t=document.createElement("my-data-list");t.setAttribute("searchable",""),t.setAttribute("page-size","5"),t.setAttribute("search-placeholder","Search items (keyboard navigable)...");const o=[{name:"Keyboard Navigation",description:"Use arrow keys to navigate items",status:"Available"},{name:"Screen Reader Support",description:"Proper ARIA labels and roles",status:"Available"},{name:"Focus Management",description:"Clear focus indicators",status:"Available"},{name:"High Contrast",description:"Works with high contrast mode",status:"Available"},{name:"Reduced Motion",description:"Respects motion preferences",status:"Available"},{name:"Keyboard Shortcuts",description:"Search and navigation shortcuts",status:"Available"}];return t.rows=o,t.totalItems=o.length,e.appendChild(a),e.appendChild(t),e};C.parameters={docs:{description:{story:"Data list showcasing comprehensive accessibility features."}}};var T,D,z;b.parameters={...b.parameters,docs:{...(T=b.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 800px;';
  const dataList = document.createElement('my-data-list');

  // Set properties
  if (args.searchable) dataList.setAttribute('searchable', '');
  if (args.sortable) dataList.setAttribute('sortable', '');
  if (args.filterable) dataList.setAttribute('filterable', '');
  if (args.paginationType && args.paginationType !== 'pagination') dataList.setAttribute('pagination-type', args.paginationType);
  if (args.pageSize && args.pageSize !== 10) dataList.setAttribute('page-size', args.pageSize);
  if (args.loading) dataList.setAttribute('loading', '');
  if (args.emptyMessage && args.emptyMessage !== 'No data available') dataList.setAttribute('empty-message', args.emptyMessage);
  if (args.searchPlaceholder && args.searchPlaceholder !== 'Search...') dataList.setAttribute('search-placeholder', args.searchPlaceholder);

  // Generate sample data
  const sampleData = generateUsers(25);
  dataList.rows = sampleData;
  dataList.totalItems = sampleData.length;

  // Add custom item template
  const itemTemplate = document.createElement('template');
  itemTemplate.innerHTML = \`
    <div slot="item" class="custom-user-item" style="display: flex; gap: 16px; align-items: center;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; color: var(--_global-color-on-primary-container); font-weight: bold;"></div>
      <div style="flex: 1;">
        <div style="font-weight: var(--_global-font-weight-medium); margin-bottom: 4px;"></div>
        <div style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary);"></div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: var(--_global-font-size-sm); margin-bottom: 4px;"></div>
        <div style="font-size: var(--_global-font-size-xs); color: var(--_global-color-text-secondary);"></div>
      </div>
    </div>
  \`;

  // Handle query changes
  dataList.addEventListener('query-change', event => {
    const {
      query
    } = event.detail;
    console.log('Query changed:', query);

    // Simulate filtering/searching (in real app, this would be an API call)
    let filteredData = [...sampleData];

    // Apply search
    if (query.searchBy) {
      filteredData = filteredData.filter(item => item.name.toLowerCase().includes(query.searchBy.toLowerCase()) || item.email.toLowerCase().includes(query.searchBy.toLowerCase()) || item.department.toLowerCase().includes(query.searchBy.toLowerCase()));
    }

    // Apply sorting
    if (query.sortBy.length > 0) {
      const {
        field,
        direction
      } = query.sortBy[0];
      filteredData.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const start = query.offset;
    const end = start + query.limit;
    const paginatedData = filteredData.slice(start, end);

    // Update data list
    dataList.rows = paginatedData;
    dataList.totalItems = filteredData.length;
  });
  container.appendChild(dataList);
  return container;
}`,...(z=(D=b.parameters)==null?void 0:D.docs)==null?void 0:z.source}}};var q,P,M;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 1000px;';
  const title = document.createElement('h3');
  title.textContent = 'Data List with All Features';
  title.style.cssText = 'margin: 0 0 16px 0;';
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('sortable', '');
  dataList.setAttribute('filterable', '');
  dataList.setAttribute('pagination-type', 'pagination');
  dataList.setAttribute('page-size', '8');
  dataList.setAttribute('search-placeholder', 'Search by name, email, or department...');

  // Generate data
  const userData = generateUsers(50);
  dataList.rows = userData.slice(0, 8);
  dataList.totalItems = userData.length;

  // Add header
  const header = document.createElement('div');
  header.setAttribute('slot', 'header');
  header.innerHTML = \`
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h4 style="margin: 0;">Employee Directory</h4>
      <div style="display: flex; gap: 8px;">
        <my-button variant="outlined" label="Export" size="sm"></my-button>
        <my-button variant="filled" label="Add Employee" size="sm"></my-button>
      </div>
    </div>
  \`;

  // Add custom item template
  dataList.innerHTML = \`
    <div slot="item" class="employee-card" style="display: grid; grid-template-columns: auto 1fr auto auto; gap: 16px; align-items: center;">
      <div class="avatar" style="width: 48px; height: 48px; border-radius: 50%; background: var(--_global-color-primary-container); display: flex; align-items: center; justify-content: center; color: var(--_global-color-on-primary-container); font-weight: bold; font-size: 18px;"></div>
      
      <div class="employee-info">
        <div class="employee-name" style="font-weight: var(--_global-font-weight-medium); font-size: var(--_global-font-size-md); margin-bottom: 4px;"></div>
        <div class="employee-email" style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary);"></div>
      </div>
      
      <div class="department-role" style="text-align: center;">
        <div class="department" style="font-size: var(--_global-font-size-sm); font-weight: var(--_global-font-weight-medium); margin-bottom: 2px;"></div>
        <div class="role" style="font-size: var(--_global-font-size-xs); color: var(--_global-color-text-secondary);"></div>
      </div>
      
      <div class="status-badge" style="padding: 4px 8px; border-radius: var(--_global-border-radius-full); font-size: var(--_global-font-size-xs); font-weight: var(--_global-font-weight-medium);"></div>
    </div>
  \`;
  dataList.appendChild(header);

  // Handle query changes with more sophisticated logic
  dataList.addEventListener('query-change', event => {
    const {
      query
    } = event.detail;
    let filteredData = [...userData];

    // Apply search
    if (query.searchBy) {
      const searchTerm = query.searchBy.toLowerCase();
      filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchTerm) || item.email.toLowerCase().includes(searchTerm) || item.department.toLowerCase().includes(searchTerm) || item.role.toLowerCase().includes(searchTerm));
    }

    // Apply sorting
    if (query.sortBy.length > 0) {
      const {
        field,
        direction
      } = query.sortBy[0];
      filteredData.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];

        // Handle different data types
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        if (direction === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }

    // Apply pagination
    const start = query.offset;
    const end = start + query.limit;
    const paginatedData = filteredData.slice(start, end);

    // Update the display data
    dataList.rows = paginatedData;
    dataList.totalItems = filteredData.length;

    // Update custom item content
    setTimeout(() => {
      const items = dataList.shadowRoot.querySelectorAll('.employee-card');
      items.forEach((item, index) => {
        const employee = paginatedData[index];
        if (employee) {
          const avatar = item.querySelector('.avatar');
          const name = item.querySelector('.employee-name');
          const email = item.querySelector('.employee-email');
          const department = item.querySelector('.department');
          const role = item.querySelector('.role');
          const status = item.querySelector('.status-badge');
          avatar.textContent = employee.name.split(' ').map(n => n[0]).join('');
          name.textContent = employee.name;
          email.textContent = employee.email;
          department.textContent = employee.department;
          role.textContent = employee.role;
          status.textContent = employee.status;

          // Style status badge based on status
          const statusColors = {
            'Active': {
              bg: 'var(--_global-color-success-container)',
              text: 'var(--_global-color-on-success-container)'
            },
            'Inactive': {
              bg: 'var(--_global-color-error-container)',
              text: 'var(--_global-color-on-error-container)'
            },
            'Pending': {
              bg: 'var(--_global-color-warning-container)',
              text: 'var(--_global-color-on-warning-container)'
            }
          };
          const statusStyle = statusColors[employee.status] || statusColors['Pending'];
          status.style.backgroundColor = statusStyle.bg;
          status.style.color = statusStyle.text;
        }
      });
    }, 50);
  });

  // Trigger initial load
  dataList.dispatchEvent(new CustomEvent('query-change', {
    detail: {
      query: dataList.query
    }
  }));
  container.appendChild(title);
  container.appendChild(dataList);
  return container;
}`,...(M=(P=v.parameters)==null?void 0:P.docs)==null?void 0:M.source}}};var k,B,I;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  const title = document.createElement('h3');
  title.textContent = 'Infinite Scroll Data List';
  title.style.cssText = 'margin: 0 0 16px 0;';
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('pagination-type', 'infinite');
  dataList.setAttribute('page-size', '10');
  dataList.setAttribute('search-placeholder', 'Search products...');

  // Generate product data
  const generateProducts = (count = 100) => {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
    const adjectives = ['Premium', 'Professional', 'Deluxe', 'Standard', 'Essential', 'Advanced'];
    const products = ['Laptop', 'Headphones', 'T-Shirt', 'Book', 'Camera', 'Phone', 'Watch', 'Keyboard'];
    return Array.from({
      length: count
    }, (_, i) => ({
      id: i + 1,
      name: \`\${adjectives[i % adjectives.length]} \${products[i % products.length]} \${i + 1}\`,
      category: categories[i % categories.length],
      price: Math.floor(Math.random() * 500 + 10),
      rating: (Math.random() * 4 + 1).toFixed(1),
      inStock: i % 4 !== 0
    }));
  };
  const allProducts = generateProducts(100);
  let loadedProducts = allProducts.slice(0, 10);
  dataList.rows = loadedProducts;
  dataList.totalItems = allProducts.length;

  // Add custom product item template
  dataList.innerHTML = \`
    <div slot="item" class="product-card" style="display: flex; gap: 12px; align-items: center;">
      <div class="product-image" style="width: 60px; height: 60px; border-radius: var(--_global-border-radius-md); background: var(--_global-color-surface-container); display: flex; align-items: center; justify-content: center;">
        <my-icon icon="inventory"></my-icon>
      </div>
      <div style="flex: 1;">
        <div class="product-name" style="font-weight: var(--_global-font-weight-medium); margin-bottom: 4px;"></div>
        <div class="product-category" style="font-size: var(--_global-font-size-sm); color: var(--_global-color-text-secondary); margin-bottom: 2px;"></div>
        <div class="product-rating" style="font-size: var(--_global-font-size-sm);"></div>
      </div>
      <div class="product-details" style="text-align: right;">
        <div class="product-price" style="font-weight: var(--_global-font-weight-bold); font-size: var(--_global-font-size-lg); margin-bottom: 4px;"></div>
        <div class="product-stock" style="font-size: var(--_global-font-size-xs);"></div>
      </div>
    </div>
  \`;

  // Handle infinite scroll loading
  dataList.addEventListener('query-change', event => {
    const {
      query
    } = event.detail;

    // Simulate loading delay
    dataList.loading = true;
    setTimeout(() => {
      let filteredData = [...allProducts];

      // Apply search
      if (query.searchBy) {
        const searchTerm = query.searchBy.toLowerCase();
        filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm));
      }

      // Get data for current offset
      const start = query.offset;
      const end = start + query.limit;
      const newData = filteredData.slice(start, end);
      if (query.offset === 0) {
        // New search/filter - replace data
        loadedProducts = newData;
      } else {
        // Load more - append data
        loadedProducts = [...loadedProducts, ...newData];
      }
      dataList.rows = loadedProducts;
      dataList.totalItems = filteredData.length;
      dataList.loading = false;

      // Update custom content
      setTimeout(() => {
        const items = dataList.shadowRoot.querySelectorAll('.product-card');
        items.forEach((item, index) => {
          const product = loadedProducts[index];
          if (product) {
            item.querySelector('.product-name').textContent = product.name;
            item.querySelector('.product-category').textContent = product.category;
            item.querySelector('.product-rating').textContent = \`★ \${product.rating}\`;
            item.querySelector('.product-price').textContent = \`$\${product.price}\`;
            item.querySelector('.product-stock').textContent = product.inStock ? 'In Stock' : 'Out of Stock';
            item.querySelector('.product-stock').style.color = product.inStock ? 'var(--_global-color-success)' : 'var(--_global-color-error)';
          }
        });
      }, 10);
    }, 1000);
  });

  // Trigger initial load
  dataList.dispatchEvent(new CustomEvent('query-change', {
    detail: {
      query: dataList.query
    }
  }));
  container.appendChild(title);
  container.appendChild(dataList);
  return container;
}`,...(I=(B=f.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var H,V,j;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('empty-message', 'No employees found');
  dataList.setAttribute('search-placeholder', 'Search employees...');

  // Empty data
  dataList.rows = [];
  dataList.totalItems = 0;

  // Custom empty state
  const emptyContent = document.createElement('div');
  emptyContent.setAttribute('slot', 'empty');
  emptyContent.innerHTML = \`
    <div style="display: flex; flex-direction: column; align-items: center; padding: 48px 24px; text-align: center;">
      <my-icon icon="people" size="xl" style="color: var(--_global-color-text-secondary); margin-bottom: 16px; opacity: 0.5;"></my-icon>
      <h3 style="margin: 0 0 8px 0; font-size: var(--_global-font-size-lg); color: var(--_global-color-on-surface);">No employees found</h3>
      <p style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); max-width: 300px;">
        Try adjusting your search criteria or add some employees to get started.
      </p>
      <my-button variant="filled" label="Add Employee"></my-button>
    </div>
  \`;
  dataList.appendChild(emptyContent);
  const title = document.createElement('h3');
  title.textContent = 'Empty State Example';
  title.style.cssText = 'margin: 0 0 16px 0;';
  container.appendChild(title);
  container.appendChild(dataList);
  return container;
}`,...(j=(V=x.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var R,F,N;L.parameters={...L.parameters,docs:{...(R=L.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('loading', '');
  dataList.setAttribute('search-placeholder', 'Search...');

  // Sample data while loading
  const sampleData = generateUsers(5);
  dataList.rows = sampleData;
  dataList.totalItems = 25;
  const title = document.createElement('h3');
  title.textContent = 'Loading State Example';
  title.style.cssText = 'margin: 0 0 16px 0;';
  const toggleButton = document.createElement('my-button');
  toggleButton.setAttribute('variant', 'outlined');
  toggleButton.setAttribute('label', 'Toggle Loading');
  toggleButton.style.marginBottom = '16px';
  toggleButton.addEventListener('click', () => {
    dataList.loading = !dataList.loading;
  });
  container.appendChild(title);
  container.appendChild(toggleButton);
  container.appendChild(dataList);
  return container;
}`,...(N=(F=L.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var $,U,W;w.parameters={...w.parameters,docs:{...($=w.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 500px;';
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('pagination-type', 'none');

  // Simple data
  const simpleData = [{
    title: 'Important Task',
    priority: 'High',
    due: 'Today'
  }, {
    title: 'Review Documents',
    priority: 'Medium',
    due: 'Tomorrow'
  }, {
    title: 'Team Meeting',
    priority: 'Low',
    due: 'Friday'
  }, {
    title: 'Project Planning',
    priority: 'High',
    due: 'Next Week'
  }];
  dataList.rows = simpleData;
  dataList.totalItems = simpleData.length;
  const title = document.createElement('h3');
  title.textContent = 'Minimal Data List';
  title.style.cssText = 'margin: 0 0 16px 0;';
  container.appendChild(title);
  container.appendChild(dataList);
  return container;
}`,...(W=(U=w.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var G,K,J;C.parameters={...C.parameters,docs:{...(G=C.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; max-width: 600px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 24px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Keyboard navigation with arrow keys</li>
      <li>Proper ARIA roles and labels</li>
      <li>Focus management and indicators</li>
      <li>Screen reader friendly</li>
      <li>High contrast mode support</li>
      <li>Reduced motion preferences</li>
    </ul>
  \`;
  const dataList = document.createElement('my-data-list');
  dataList.setAttribute('searchable', '');
  dataList.setAttribute('page-size', '5');
  dataList.setAttribute('search-placeholder', 'Search items (keyboard navigable)...');

  // Accessibility-focused data
  const a11yData = [{
    name: 'Keyboard Navigation',
    description: 'Use arrow keys to navigate items',
    status: 'Available'
  }, {
    name: 'Screen Reader Support',
    description: 'Proper ARIA labels and roles',
    status: 'Available'
  }, {
    name: 'Focus Management',
    description: 'Clear focus indicators',
    status: 'Available'
  }, {
    name: 'High Contrast',
    description: 'Works with high contrast mode',
    status: 'Available'
  }, {
    name: 'Reduced Motion',
    description: 'Respects motion preferences',
    status: 'Available'
  }, {
    name: 'Keyboard Shortcuts',
    description: 'Search and navigation shortcuts',
    status: 'Available'
  }];
  dataList.rows = a11yData;
  dataList.totalItems = a11yData.length;
  container.appendChild(info);
  container.appendChild(dataList);
  return container;
}`,...(J=(K=C.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};const rt=["Default","WithAllFeatures","InfiniteScroll","EmptyState","LoadingState","Minimal","Accessibility"];export{C as Accessibility,b as Default,x as EmptyState,f as InfiniteScroll,L as LoadingState,w as Minimal,v as WithAllFeatures,rt as __namedExportsOrder,it as default};
