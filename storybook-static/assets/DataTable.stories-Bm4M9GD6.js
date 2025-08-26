import"./my-data-table-C8ZCmYSs.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const X={title:"Data Display/my-data-table",parameters:{docs:{description:{component:"A comprehensive, accessible data table component with Material Design 3 styling. Features sorting, filtering, pagination, selection, and export capabilities."}}},argTypes:{selectable:{control:"boolean",description:"Enable row selection with checkboxes"},searchable:{control:"boolean",description:"Show search input for filtering data"},paginated:{control:"boolean",description:"Enable pagination controls"},dense:{control:"boolean",description:"Use compact row height"},striped:{control:"boolean",description:"Alternate row background colors"},bordered:{control:"boolean",description:"Add borders around cells"},pageSize:{control:{type:"number",min:5,max:100,step:5},description:"Number of rows per page"},loading:{control:"boolean",description:"Show loading state"}}},l=(e=50)=>{const t=["John","Jane","Bob","Alice","Charlie","Diana","Eve","Frank","Grace","Henry"],a=["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"],n=["Engineering","Marketing","Sales","HR","Finance","Operations","Design","Support"],r=["Manager","Senior","Junior","Lead","Director","Analyst","Specialist","Coordinator"];return Array.from({length:e},(p,o)=>({id:o+1,firstName:t[Math.floor(Math.random()*t.length)],lastName:a[Math.floor(Math.random()*a.length)],email:`user${o+1}@example.com`,department:n[Math.floor(Math.random()*n.length)],role:r[Math.floor(Math.random()*r.length)],salary:Math.floor(Math.random()*1e5)+4e4,active:Math.random()>.2,startDate:new Date(2018+Math.floor(Math.random()*6),Math.floor(Math.random()*12),Math.floor(Math.random()*28)),lastLogin:new Date(Date.now()-Math.floor(Math.random()*30*24*60*60*1e3))}))},i=[{key:"id",label:"ID",type:"number",sortable:!0},{key:"firstName",label:"First Name",sortable:!0,render:(e,t)=>`<strong>${e}</strong>`},{key:"lastName",label:"Last Name",sortable:!0},{key:"email",label:"Email",sortable:!0},{key:"department",label:"Department",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"salary",label:"Salary",type:"currency",sortable:!0},{key:"active",label:"Active",type:"boolean",render:e=>e?'<span style="color: var(--_global-color-success); font-weight: bold;">●</span>':'<span style="color: var(--_global-color-error); font-weight: bold;">●</span>'}],x=e=>{const t=document.createElement("my-data-table");return e.selectable&&t.setAttribute("selectable",""),e.searchable&&t.setAttribute("searchable",""),e.paginated&&t.setAttribute("paginated",""),e.dense&&t.setAttribute("dense",""),e.striped&&t.setAttribute("striped",""),e.bordered&&t.setAttribute("bordered",""),e.loading&&t.setAttribute("loading",""),e.pageSize&&t.setAttribute("page-size",e.pageSize),t.columns=i,t.data=l(e.dataSize||25),t.addEventListener("selection-changed",a=>{console.log("Selection changed:",a.detail)}),t.addEventListener("sort-changed",a=>{console.log("Sort changed:",a.detail)}),t.addEventListener("search-changed",a=>{console.log("Search changed:",a.detail)}),t.addEventListener("page-changed",a=>{console.log("Page changed:",a.detail)}),t},u=x.bind({});u.args={selectable:!1,searchable:!1,paginated:!1,dense:!1,striped:!1,bordered:!1,loading:!1,pageSize:10,dataSize:15};const d=x.bind({});d.args={selectable:!0,searchable:!0,paginated:!0,dense:!1,striped:!0,bordered:!1,loading:!1,pageSize:10,dataSize:50};d.parameters={docs:{description:{story:"A fully interactive data table with selection, search, sorting, and pagination enabled."}}};const c=x.bind({});c.args={selectable:!0,searchable:!0,paginated:!0,dense:!0,striped:!1,bordered:!0,loading:!1,pageSize:15,dataSize:30};c.parameters={docs:{description:{story:"A dense table variant with compact row height and borders for high-density data display."}}};const b=x.bind({});b.args={selectable:!0,searchable:!0,paginated:!0,loading:!0,pageSize:10};b.parameters={docs:{description:{story:"Demonstration of the loading state with spinner and message."}}};const g=()=>{const e=document.createElement("my-data-table");e.setAttribute("selectable",""),e.setAttribute("searchable",""),e.setAttribute("paginated",""),e.setAttribute("page-size","10"),e.columns=[{key:"id",label:"ID",type:"number",sortable:!0},{key:"name",label:"Employee",sortable:!0,render:(a,n)=>`
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--_global-color-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
            ${n.firstName.charAt(0)}${n.lastName.charAt(0)}
          </div>
          <div>
            <div style="font-weight: 500;">${n.firstName} ${n.lastName}</div>
            <div style="font-size: 12px; color: var(--_global-color-on-surface-variant);">${n.email}</div>
          </div>
        </div>
      `},{key:"department",label:"Department",sortable:!0,render:a=>`
        <span style="
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          background: var(--_global-color-secondary-container);
          color: var(--_global-color-on-secondary-container);
        ">${a}</span>
      `},{key:"salary",label:"Salary",type:"currency",sortable:!0,render:a=>`
        <span style="font-weight: 600; color: var(--_global-color-success);">
          ${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a)}
        </span>
      `},{key:"status",label:"Status",render:(a,n)=>{const r=n.active,p=r?"var(--_global-color-success)":"var(--_global-color-error)";return`
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${p};"></div>
            <span style="
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 500;
              background: ${r?"var(--_global-color-success-container)":"var(--_global-color-error-container)"};
              color: ${p};
            ">${r?"Active":"Inactive"}</span>
          </div>
        `}},{key:"actions",label:"Actions",render:(a,n)=>`
        <div style="display: flex; gap: 4px;">
          <button style="
            padding: 4px 8px;
            border: 1px solid var(--_global-color-outline);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          " onclick="console.log('Edit', ${n.id})">Edit</button>
          <button style="
            padding: 4px 8px;
            border: 1px solid var(--_global-color-error);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            color: var(--_global-color-error);
          " onclick="console.log('Delete', ${n.id})">Delete</button>
        </div>
      `}];const t=l(20);return t.forEach(a=>{a.name=`${a.firstName} ${a.lastName}`}),e.data=t,e};g.parameters={docs:{description:{story:"Advanced example showing custom cell rendering with avatars, badges, status indicators, and action buttons."}}};const m=()=>{const e=document.createElement("my-data-table");return e.setAttribute("searchable",""),e.setAttribute("paginated",""),e.setAttribute("empty-message","No employees found. Try adjusting your search criteria."),e.columns=i,e.data=[],e};m.parameters={docs:{description:{story:"Demonstration of empty state with custom message."}}};const h=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 2rem;";const t=document.createElement("my-data-table"),a=l(5);t.columns=i.slice(0,4),t.data=a;const n=document.createElement("my-data-table");n.setAttribute("striped",""),n.setAttribute("bordered",""),n.columns=i.slice(0,5),n.data=l(6);const r=document.createElement("my-data-table");return r.setAttribute("dense",""),r.setAttribute("selectable",""),r.columns=i,r.data=l(8),e.innerHTML=`
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Minimal Table</h3>
    </div>
  `,e.appendChild(t),e.innerHTML+=`
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Striped & Bordered</h3>
    </div>
  `,e.appendChild(n),e.innerHTML+=`
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Dense with Selection</h3>
    </div>
  `,e.appendChild(r),e};h.parameters={docs:{description:{story:"Different visual variants of the data table component."}}};const y=()=>{const e=document.createElement("my-data-table");return e.setAttribute("selectable",""),e.setAttribute("searchable",""),e.setAttribute("paginated",""),e.setAttribute("page-size","25"),e.columns=i,e.data=l(500),e.addEventListener("search-changed",t=>{console.time("search-performance"),setTimeout(()=>console.timeEnd("search-performance"),0)}),e};y.parameters={docs:{description:{story:"Performance test with a large dataset (500 rows) demonstrating pagination and search capabilities."}}};const v=()=>{const e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; gap: 1rem;";const t=document.createElement("my-data-table");t.setAttribute("selectable",""),t.setAttribute("searchable",""),t.columns=i,t.data=l(15);const a=document.createElement("div");return a.style.cssText="display: flex; gap: 1rem; padding: 1rem; background: var(--_global-color-surface-container-lowest); border-radius: 8px;",a.innerHTML=`
    <button id="export-json" style="
      padding: 8px 16px;
      background: var(--_global-color-primary);
      color: var(--_global-color-on-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export JSON</button>
    <button id="export-csv" style="
      padding: 8px 16px;
      background: var(--_global-color-secondary);
      color: var(--_global-color-on-secondary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export CSV</button>
    <button id="export-selected" style="
      padding: 8px 16px;
      background: var(--_global-color-tertiary);
      color: var(--_global-color-on-tertiary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export Selected</button>
    <span id="status" style="
      padding: 8px;
      color: var(--_global-color-on-surface-variant);
      font-size: 14px;
    "></span>
  `,e.appendChild(a),e.appendChild(t),setTimeout(()=>{const n=e.querySelector("#export-json"),r=e.querySelector("#export-csv"),p=e.querySelector("#export-selected"),o=e.querySelector("#status");n.addEventListener("click",()=>{const s=t.exportData("json");console.log("JSON Export:",s),o.textContent="JSON data exported to console"}),r.addEventListener("click",()=>{const s=t.exportData("csv");console.log("CSV Export:",s),o.textContent="CSV data exported to console"}),p.addEventListener("click",()=>{const s=t.selectedRows.length;if(s===0){o.textContent="Please select some rows first";return}const f=t.exportData("json");console.log("Selected rows export:",f),o.textContent=`Exported ${s} selected rows`}),t.addEventListener("selection-changed",s=>{const f=s.detail.totalSelected;o.textContent=f>0?`${f} rows selected`:""})},100),e};v.parameters={docs:{description:{story:"Demonstration of data export functionality in JSON and CSV formats, including selected rows export."}}};var S,A,E;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const table = document.createElement('my-data-table');

  // Set attributes
  if (args.selectable) table.setAttribute('selectable', '');
  if (args.searchable) table.setAttribute('searchable', '');
  if (args.paginated) table.setAttribute('paginated', '');
  if (args.dense) table.setAttribute('dense', '');
  if (args.striped) table.setAttribute('striped', '');
  if (args.bordered) table.setAttribute('bordered', '');
  if (args.loading) table.setAttribute('loading', '');
  if (args.pageSize) table.setAttribute('page-size', args.pageSize);

  // Set columns and data
  table.columns = baseColumns;
  table.data = generateSampleData(args.dataSize || 25);

  // Add event listeners for demonstration
  table.addEventListener('selection-changed', e => {
    console.log('Selection changed:', e.detail);
  });
  table.addEventListener('sort-changed', e => {
    console.log('Sort changed:', e.detail);
  });
  table.addEventListener('search-changed', e => {
    console.log('Search changed:', e.detail);
  });
  table.addEventListener('page-changed', e => {
    console.log('Page changed:', e.detail);
  });
  return table;
}`,...(E=(A=u.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var w,D,k;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const table = document.createElement('my-data-table');

  // Set attributes
  if (args.selectable) table.setAttribute('selectable', '');
  if (args.searchable) table.setAttribute('searchable', '');
  if (args.paginated) table.setAttribute('paginated', '');
  if (args.dense) table.setAttribute('dense', '');
  if (args.striped) table.setAttribute('striped', '');
  if (args.bordered) table.setAttribute('bordered', '');
  if (args.loading) table.setAttribute('loading', '');
  if (args.pageSize) table.setAttribute('page-size', args.pageSize);

  // Set columns and data
  table.columns = baseColumns;
  table.data = generateSampleData(args.dataSize || 25);

  // Add event listeners for demonstration
  table.addEventListener('selection-changed', e => {
    console.log('Selection changed:', e.detail);
  });
  table.addEventListener('sort-changed', e => {
    console.log('Sort changed:', e.detail);
  });
  table.addEventListener('search-changed', e => {
    console.log('Search changed:', e.detail);
  });
  table.addEventListener('page-changed', e => {
    console.log('Page changed:', e.detail);
  });
  return table;
}`,...(k=(D=d.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var C,_,z;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const table = document.createElement('my-data-table');

  // Set attributes
  if (args.selectable) table.setAttribute('selectable', '');
  if (args.searchable) table.setAttribute('searchable', '');
  if (args.paginated) table.setAttribute('paginated', '');
  if (args.dense) table.setAttribute('dense', '');
  if (args.striped) table.setAttribute('striped', '');
  if (args.bordered) table.setAttribute('bordered', '');
  if (args.loading) table.setAttribute('loading', '');
  if (args.pageSize) table.setAttribute('page-size', args.pageSize);

  // Set columns and data
  table.columns = baseColumns;
  table.data = generateSampleData(args.dataSize || 25);

  // Add event listeners for demonstration
  table.addEventListener('selection-changed', e => {
    console.log('Selection changed:', e.detail);
  });
  table.addEventListener('sort-changed', e => {
    console.log('Sort changed:', e.detail);
  });
  table.addEventListener('search-changed', e => {
    console.log('Search changed:', e.detail);
  });
  table.addEventListener('page-changed', e => {
    console.log('Page changed:', e.detail);
  });
  return table;
}`,...(z=(_=c.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var L,T,$;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const table = document.createElement('my-data-table');

  // Set attributes
  if (args.selectable) table.setAttribute('selectable', '');
  if (args.searchable) table.setAttribute('searchable', '');
  if (args.paginated) table.setAttribute('paginated', '');
  if (args.dense) table.setAttribute('dense', '');
  if (args.striped) table.setAttribute('striped', '');
  if (args.bordered) table.setAttribute('bordered', '');
  if (args.loading) table.setAttribute('loading', '');
  if (args.pageSize) table.setAttribute('page-size', args.pageSize);

  // Set columns and data
  table.columns = baseColumns;
  table.data = generateSampleData(args.dataSize || 25);

  // Add event listeners for demonstration
  table.addEventListener('selection-changed', e => {
    console.log('Selection changed:', e.detail);
  });
  table.addEventListener('sort-changed', e => {
    console.log('Sort changed:', e.detail);
  });
  table.addEventListener('search-changed', e => {
    console.log('Search changed:', e.detail);
  });
  table.addEventListener('page-changed', e => {
    console.log('Page changed:', e.detail);
  });
  return table;
}`,...($=(T=b.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};var M,N,J;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const table = document.createElement('my-data-table');
  table.setAttribute('selectable', '');
  table.setAttribute('searchable', '');
  table.setAttribute('paginated', '');
  table.setAttribute('page-size', '10');

  // Custom columns with advanced rendering
  table.columns = [{
    key: 'id',
    label: 'ID',
    type: 'number',
    sortable: true
  }, {
    key: 'name',
    label: 'Employee',
    sortable: true,
    render: (value, row) => \`
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--_global-color-primary); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
            \${row.firstName.charAt(0)}\${row.lastName.charAt(0)}
          </div>
          <div>
            <div style="font-weight: 500;">\${row.firstName} \${row.lastName}</div>
            <div style="font-size: 12px; color: var(--_global-color-on-surface-variant);">\${row.email}</div>
          </div>
        </div>
      \`
  }, {
    key: 'department',
    label: 'Department',
    sortable: true,
    render: value => \`
        <span style="
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          background: var(--_global-color-secondary-container);
          color: var(--_global-color-on-secondary-container);
        ">\${value}</span>
      \`
  }, {
    key: 'salary',
    label: 'Salary',
    type: 'currency',
    sortable: true,
    render: value => \`
        <span style="font-weight: 600; color: var(--_global-color-success);">
          \${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)}
        </span>
      \`
  }, {
    key: 'status',
    label: 'Status',
    render: (value, row) => {
      const isActive = row.active;
      const color = isActive ? 'var(--_global-color-success)' : 'var(--_global-color-error)';
      const bgColor = isActive ? 'var(--_global-color-success-container)' : 'var(--_global-color-error-container)';
      return \`
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: \${color};"></div>
            <span style="
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 500;
              background: \${bgColor};
              color: \${color};
            ">\${isActive ? 'Active' : 'Inactive'}</span>
          </div>
        \`;
    }
  }, {
    key: 'actions',
    label: 'Actions',
    render: (value, row) => \`
        <div style="display: flex; gap: 4px;">
          <button style="
            padding: 4px 8px;
            border: 1px solid var(--_global-color-outline);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          " onclick="console.log('Edit', \${row.id})">Edit</button>
          <button style="
            padding: 4px 8px;
            border: 1px solid var(--_global-color-error);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            color: var(--_global-color-error);
          " onclick="console.log('Delete', \${row.id})">Delete</button>
        </div>
      \`
  }];

  // Generate data with combined name field
  const data = generateSampleData(20);
  data.forEach(row => {
    row.name = \`\${row.firstName} \${row.lastName}\`;
  });
  table.data = data;
  return table;
}`,...(J=(N=g.parameters)==null?void 0:N.docs)==null?void 0:J.source}}};var j,H,O;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const table = document.createElement('my-data-table');
  table.setAttribute('searchable', '');
  table.setAttribute('paginated', '');
  table.setAttribute('empty-message', 'No employees found. Try adjusting your search criteria.');
  table.columns = baseColumns;
  table.data = []; // No data

  return table;
}`,...(O=(H=m.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var I,V,q;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 2rem;';

  // Minimal table
  const minimalTable = document.createElement('my-data-table');
  const minimalData = generateSampleData(5);
  minimalTable.columns = baseColumns.slice(0, 4); // Only first 4 columns
  minimalTable.data = minimalData;

  // Striped table
  const stripedTable = document.createElement('my-data-table');
  stripedTable.setAttribute('striped', '');
  stripedTable.setAttribute('bordered', '');
  stripedTable.columns = baseColumns.slice(0, 5);
  stripedTable.data = generateSampleData(6);

  // Dense table
  const denseTable = document.createElement('my-data-table');
  denseTable.setAttribute('dense', '');
  denseTable.setAttribute('selectable', '');
  denseTable.columns = baseColumns;
  denseTable.data = generateSampleData(8);
  container.innerHTML = \`
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Minimal Table</h3>
    </div>
  \`;
  container.appendChild(minimalTable);
  container.innerHTML += \`
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Striped & Bordered</h3>
    </div>
  \`;
  container.appendChild(stripedTable);
  container.innerHTML += \`
    <div>
      <h3 style="margin: 0 0 1rem 0; color: var(--_global-color-on-surface);">Dense with Selection</h3>
    </div>
  \`;
  container.appendChild(denseTable);
  return container;
}`,...(q=(V=h.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var P,F,R;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const table = document.createElement('my-data-table');
  table.setAttribute('selectable', '');
  table.setAttribute('searchable', '');
  table.setAttribute('paginated', '');
  table.setAttribute('page-size', '25');
  table.columns = baseColumns;
  table.data = generateSampleData(500); // Large dataset

  // Add performance monitoring
  table.addEventListener('search-changed', e => {
    console.time('search-performance');
    setTimeout(() => console.timeEnd('search-performance'), 0);
  });
  return table;
}`,...(R=(F=y.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var U,B,G;v.parameters={...v.parameters,docs:{...(U=v.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
  const table = document.createElement('my-data-table');
  table.setAttribute('selectable', '');
  table.setAttribute('searchable', '');
  table.columns = baseColumns;
  table.data = generateSampleData(15);
  const controls = document.createElement('div');
  controls.style.cssText = 'display: flex; gap: 1rem; padding: 1rem; background: var(--_global-color-surface-container-lowest); border-radius: 8px;';
  controls.innerHTML = \`
    <button id="export-json" style="
      padding: 8px 16px;
      background: var(--_global-color-primary);
      color: var(--_global-color-on-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export JSON</button>
    <button id="export-csv" style="
      padding: 8px 16px;
      background: var(--_global-color-secondary);
      color: var(--_global-color-on-secondary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export CSV</button>
    <button id="export-selected" style="
      padding: 8px 16px;
      background: var(--_global-color-tertiary);
      color: var(--_global-color-on-tertiary);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">Export Selected</button>
    <span id="status" style="
      padding: 8px;
      color: var(--_global-color-on-surface-variant);
      font-size: 14px;
    "></span>
  \`;
  container.appendChild(controls);
  container.appendChild(table);

  // Add export functionality
  setTimeout(() => {
    const exportJson = container.querySelector('#export-json');
    const exportCsv = container.querySelector('#export-csv');
    const exportSelected = container.querySelector('#export-selected');
    const status = container.querySelector('#status');
    exportJson.addEventListener('click', () => {
      const data = table.exportData('json');
      console.log('JSON Export:', data);
      status.textContent = 'JSON data exported to console';
    });
    exportCsv.addEventListener('click', () => {
      const data = table.exportData('csv');
      console.log('CSV Export:', data);
      status.textContent = 'CSV data exported to console';
    });
    exportSelected.addEventListener('click', () => {
      const selectedCount = table.selectedRows.length;
      if (selectedCount === 0) {
        status.textContent = 'Please select some rows first';
        return;
      }
      const data = table.exportData('json');
      console.log('Selected rows export:', data);
      status.textContent = \`Exported \${selectedCount} selected rows\`;
    });
    table.addEventListener('selection-changed', e => {
      const count = e.detail.totalSelected;
      status.textContent = count > 0 ? \`\${count} rows selected\` : '';
    });
  }, 100);
  return container;
}`,...(G=(B=v.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};const Y=["Default","Interactive","Dense","Loading","CustomCells","Empty","Variants","LargeDataset","ExportDemo"];export{g as CustomCells,u as Default,c as Dense,m as Empty,v as ExportDemo,d as Interactive,y as LargeDataset,b as Loading,h as Variants,Y as __namedExportsOrder,X as default};
