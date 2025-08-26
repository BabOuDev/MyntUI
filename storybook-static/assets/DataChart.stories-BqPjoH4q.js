import"./my-data-chart-B3QHoMTF.js";import"./base-component-q4KNMHwB.js";const j={title:"Components/my-data-chart",parameters:{docs:{description:{component:"A flexible data visualization component based on D3.js for rendering various chart types with Material Design 3 styling."}}},argTypes:{chartType:{control:{type:"select"},options:["bar","line","pie","scatter","area"],description:"Type of chart to render"},width:{control:{type:"number",min:200,max:800},description:"Chart width in pixels"},height:{control:{type:"number",min:200,max:600},description:"Chart height in pixels"},xAxisLabel:{control:"text",description:"X-axis label"},yAxisLabel:{control:"text",description:"Y-axis label"},responsive:{control:"boolean",description:"Enable responsive behavior"}}},I=()=>[{label:"Q1",value:120},{label:"Q2",value:150},{label:"Q3",value:180},{label:"Q4",value:200}],m=()=>[{x:0,y:10},{x:1,y:25},{x:2,y:15},{x:3,y:30},{x:4,y:20},{x:5,y:35}],N=()=>[{name:"Chrome",value:65},{name:"Safari",value:20},{name:"Firefox",value:10},{name:"Edge",value:5}],W=()=>[{x:1,y:2,size:5},{x:2,y:3,size:8},{x:3,y:1,size:3},{x:4,y:4,size:6},{x:5,y:2,size:4},{x:6,y:5,size:7}],G=()=>[{x:0,y:10},{x:1,y:30},{x:2,y:20},{x:3,y:40},{x:4,y:35},{x:5,y:50}],c=a=>{const t=document.createElement("my-data-chart");return t.setAttribute("chart-type","bar"),t.setAttribute("width","500"),t.setAttribute("height","300"),t.setAttribute("x-axis-label","Quarter"),t.setAttribute("y-axis-label","Revenue (k$)"),t.data=I(),t},d=a=>{const t=document.createElement("my-data-chart");return t.setAttribute("chart-type","line"),t.setAttribute("width","500"),t.setAttribute("height","300"),t.setAttribute("x-axis-label","Time"),t.setAttribute("y-axis-label","Value"),t.data=m(),t},u=a=>{const t=document.createElement("my-data-chart");return t.setAttribute("chart-type","pie"),t.setAttribute("width","400"),t.setAttribute("height","400"),t.data=N(),t},p=a=>{const t=document.createElement("my-data-chart");return t.setAttribute("chart-type","scatter"),t.setAttribute("width","500"),t.setAttribute("height","300"),t.setAttribute("x-axis-label","X Variable"),t.setAttribute("y-axis-label","Y Variable"),t.data=W(),t},h=a=>{const t=document.createElement("my-data-chart");return t.setAttribute("chart-type","area"),t.setAttribute("width","500"),t.setAttribute("height","300"),t.setAttribute("x-axis-label","Time"),t.setAttribute("y-axis-label","Value"),t.data=G(),t},g=a=>{const t=document.createElement("div");t.style.width="100%",t.style.height="400px",t.style.border="2px dashed var(--_global-color-outline-variant)",t.style.borderRadius="var(--_global-border-radius-md)",t.style.padding="var(--_global-spacing-md)";const e=document.createElement("my-data-chart");return e.setAttribute("chart-type","line"),e.setAttribute("responsive",""),e.style.width="100%",e.style.height="100%",e.data=m(),t.appendChild(e),t},y=()=>{const a=document.createElement("div");return a.style.display="grid",a.style.gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))",a.style.gap="var(--_global-spacing-lg)",a.style.padding="var(--_global-spacing-lg)",[{type:"bar",data:I(),title:"Quarterly Revenue"},{type:"line",data:m(),title:"Growth Trend"},{type:"pie",data:N(),title:"Browser Usage"},{type:"scatter",data:W(),title:"Correlation Analysis"}].forEach(({type:e,data:o,title:i})=>{const n=document.createElement("div");n.style.background="var(--_global-color-surface-container-lowest)",n.style.borderRadius="var(--_global-border-radius-lg)",n.style.padding="var(--_global-spacing-md)",n.style.border="1px solid var(--_global-color-outline-variant)";const r=document.createElement("h3");r.textContent=i,r.style.margin="0 0 var(--_global-spacing-md) 0",r.style.color="var(--_global-color-on-surface)",r.style.fontSize="var(--_global-font-size-title-medium)",r.style.fontWeight="var(--_global-font-weight-medium)";const l=document.createElement("my-data-chart");l.setAttribute("chart-type",e),l.setAttribute("width","350"),l.setAttribute("height","250"),l.data=o,n.appendChild(r),n.appendChild(l),a.appendChild(n)}),a},b=()=>{const a=document.createElement("div");a.style.display="flex",a.style.flexDirection="column",a.style.gap="var(--_global-spacing-lg)",a.style.padding="var(--_global-spacing-lg)";const t=[{product:"Laptop",category:"Electronics",value:1200,region:"US"},{product:"Mouse",category:"Electronics",value:50,region:"US"},{product:"Keyboard",category:"Electronics",value:80,region:"EU"},{product:"Monitor",category:"Electronics",value:300,region:"US"},{product:"Chair",category:"Furniture",value:200,region:"EU"},{product:"Desk",category:"Furniture",value:400,region:"US"}],e=document.createElement("div");e.style.background="var(--_global-color-surface-container)",e.style.padding="var(--_global-spacing-md)",e.style.borderRadius="var(--_global-border-radius-md)",e.style.display="flex",e.style.gap="var(--_global-spacing-md)",e.style.alignItems="center";const o=document.createElement("select");o.style.padding="var(--_global-spacing-sm)",o.style.borderRadius="var(--_global-border-radius-sm)",o.style.border="1px solid var(--_global-color-outline)",o.innerHTML=`
    <option value="">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
  `;const i=document.createElement("select");i.style.padding="var(--_global-spacing-sm)",i.style.borderRadius="var(--_global-border-radius-sm)",i.style.border="1px solid var(--_global-color-outline)",i.innerHTML=`
    <option value="">All Regions</option>
    <option value="US">United States</option>
    <option value="EU">Europe</option>
  `;const n=document.createElement("select");n.style.padding="var(--_global-spacing-sm)",n.style.borderRadius="var(--_global-border-radius-sm)",n.style.border="1px solid var(--_global-color-outline)",n.innerHTML=`
    <option value="product:asc">Product A-Z</option>
    <option value="value:desc">Value High-Low</option>
    <option value="value:asc">Value Low-High</option>
  `,e.appendChild(document.createTextNode("Filter by: ")),e.appendChild(o),e.appendChild(i),e.appendChild(document.createTextNode(" Sort by: ")),e.appendChild(n);const r=document.createElement("my-data-chart");r.setAttribute("chart-type","bar"),r.setAttribute("width","600"),r.setAttribute("height","350"),r.setAttribute("x-axis-label","Products"),r.setAttribute("y-axis-label","Sales Value ($)"),r.data=t.map(s=>({label:s.product,value:s.value}));const l=()=>{const s=[];o.value&&s.push({field:"category",operator:"eq",value:o.value}),i.value&&s.push({field:"region",operator:"eq",value:i.value});const[$,X]=n.value.split(":"),Y=[{field:$,direction:X}];r.query={filtersBy:s,sortBy:Y},r.data=t};return o.addEventListener("change",l),i.addEventListener("change",l),n.addEventListener("change",l),l(),a.appendChild(e),a.appendChild(r),a};c.parameters={docs:{description:{story:"Basic bar chart showing quarterly revenue data."}}};d.parameters={docs:{description:{story:"Line chart displaying trends over time."}}};u.parameters={docs:{description:{story:"Pie chart showing distribution of browser usage."}}};p.parameters={docs:{description:{story:"Scatter plot for correlation analysis."}}};h.parameters={docs:{description:{story:"Area chart showing filled areas under the curve."}}};g.parameters={docs:{description:{story:"Responsive chart that adapts to container size."}}};y.parameters={docs:{description:{story:"Multiple interactive charts showcasing different visualization types."}}};b.parameters={docs:{description:{story:"Chart with dynamic filtering and sorting capabilities using the query system."}}};var v,x,A;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'bar');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'Quarter');
  chart.setAttribute('y-axis-label', 'Revenue (k$)');
  chart.data = generateBarData();
  return chart;
}`,...(A=(x=c.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var C,E,_;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'line');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'Time');
  chart.setAttribute('y-axis-label', 'Value');
  chart.data = generateLineData();
  return chart;
}`,...(_=(E=d.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var f,S,w;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'pie');
  chart.setAttribute('width', '400');
  chart.setAttribute('height', '400');
  chart.data = generatePieData();
  return chart;
}`,...(w=(S=u.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var F,D,L;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'scatter');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'X Variable');
  chart.setAttribute('y-axis-label', 'Y Variable');
  chart.data = generateScatterData();
  return chart;
}`,...(L=(D=p.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var T,R,U;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'area');
  chart.setAttribute('width', '500');
  chart.setAttribute('height', '300');
  chart.setAttribute('x-axis-label', 'Time');
  chart.setAttribute('y-axis-label', 'Value');
  chart.data = generateAreaData();
  return chart;
}`,...(U=(R=h.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var V,z,B;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = '400px';
  container.style.border = '2px dashed var(--_global-color-outline-variant)';
  container.style.borderRadius = 'var(--_global-border-radius-md)';
  container.style.padding = 'var(--_global-spacing-md)';
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'line');
  chart.setAttribute('responsive', '');
  chart.style.width = '100%';
  chart.style.height = '100%';
  chart.data = generateLineData();
  container.appendChild(chart);
  return container;
}`,...(B=(z=g.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var M,P,H;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
  container.style.gap = 'var(--_global-spacing-lg)';
  container.style.padding = 'var(--_global-spacing-lg)';
  const chartTypes = [{
    type: 'bar',
    data: generateBarData(),
    title: 'Quarterly Revenue'
  }, {
    type: 'line',
    data: generateLineData(),
    title: 'Growth Trend'
  }, {
    type: 'pie',
    data: generatePieData(),
    title: 'Browser Usage'
  }, {
    type: 'scatter',
    data: generateScatterData(),
    title: 'Correlation Analysis'
  }];
  chartTypes.forEach(({
    type,
    data,
    title
  }) => {
    const chartContainer = document.createElement('div');
    chartContainer.style.background = 'var(--_global-color-surface-container-lowest)';
    chartContainer.style.borderRadius = 'var(--_global-border-radius-lg)';
    chartContainer.style.padding = 'var(--_global-spacing-md)';
    chartContainer.style.border = '1px solid var(--_global-color-outline-variant)';
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    titleElement.style.margin = '0 0 var(--_global-spacing-md) 0';
    titleElement.style.color = 'var(--_global-color-on-surface)';
    titleElement.style.fontSize = 'var(--_global-font-size-title-medium)';
    titleElement.style.fontWeight = 'var(--_global-font-weight-medium)';
    const chart = document.createElement('my-data-chart');
    chart.setAttribute('chart-type', type);
    chart.setAttribute('width', '350');
    chart.setAttribute('height', '250');
    chart.data = data;
    chartContainer.appendChild(titleElement);
    chartContainer.appendChild(chart);
    container.appendChild(chartContainer);
  });
  return container;
}`,...(H=(P=y.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};var Q,k,q;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = 'var(--_global-spacing-lg)';
  container.style.padding = 'var(--_global-spacing-lg)';

  // Sample data with multiple dimensions
  const salesData = [{
    product: 'Laptop',
    category: 'Electronics',
    value: 1200,
    region: 'US'
  }, {
    product: 'Mouse',
    category: 'Electronics',
    value: 50,
    region: 'US'
  }, {
    product: 'Keyboard',
    category: 'Electronics',
    value: 80,
    region: 'EU'
  }, {
    product: 'Monitor',
    category: 'Electronics',
    value: 300,
    region: 'US'
  }, {
    product: 'Chair',
    category: 'Furniture',
    value: 200,
    region: 'EU'
  }, {
    product: 'Desk',
    category: 'Furniture',
    value: 400,
    region: 'US'
  }];

  // Create controls
  const controlsContainer = document.createElement('div');
  controlsContainer.style.background = 'var(--_global-color-surface-container)';
  controlsContainer.style.padding = 'var(--_global-spacing-md)';
  controlsContainer.style.borderRadius = 'var(--_global-border-radius-md)';
  controlsContainer.style.display = 'flex';
  controlsContainer.style.gap = 'var(--_global-spacing-md)';
  controlsContainer.style.alignItems = 'center';
  const categoryFilter = document.createElement('select');
  categoryFilter.style.padding = 'var(--_global-spacing-sm)';
  categoryFilter.style.borderRadius = 'var(--_global-border-radius-sm)';
  categoryFilter.style.border = '1px solid var(--_global-color-outline)';
  categoryFilter.innerHTML = \`
    <option value="">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
  \`;
  const regionFilter = document.createElement('select');
  regionFilter.style.padding = 'var(--_global-spacing-sm)';
  regionFilter.style.borderRadius = 'var(--_global-border-radius-sm)';
  regionFilter.style.border = '1px solid var(--_global-color-outline)';
  regionFilter.innerHTML = \`
    <option value="">All Regions</option>
    <option value="US">United States</option>
    <option value="EU">Europe</option>
  \`;
  const sortSelect = document.createElement('select');
  sortSelect.style.padding = 'var(--_global-spacing-sm)';
  sortSelect.style.borderRadius = 'var(--_global-border-radius-sm)';
  sortSelect.style.border = '1px solid var(--_global-color-outline)';
  sortSelect.innerHTML = \`
    <option value="product:asc">Product A-Z</option>
    <option value="value:desc">Value High-Low</option>
    <option value="value:asc">Value Low-High</option>
  \`;
  controlsContainer.appendChild(document.createTextNode('Filter by: '));
  controlsContainer.appendChild(categoryFilter);
  controlsContainer.appendChild(regionFilter);
  controlsContainer.appendChild(document.createTextNode(' Sort by: '));
  controlsContainer.appendChild(sortSelect);

  // Create chart
  const chart = document.createElement('my-data-chart');
  chart.setAttribute('chart-type', 'bar');
  chart.setAttribute('width', '600');
  chart.setAttribute('height', '350');
  chart.setAttribute('x-axis-label', 'Products');
  chart.setAttribute('y-axis-label', 'Sales Value ($)');
  chart.data = salesData.map(item => ({
    label: item.product,
    value: item.value
  }));

  // Update chart based on filters
  const updateChart = () => {
    const filters = [];
    if (categoryFilter.value) {
      filters.push({
        field: 'category',
        operator: 'eq',
        value: categoryFilter.value
      });
    }
    if (regionFilter.value) {
      filters.push({
        field: 'region',
        operator: 'eq',
        value: regionFilter.value
      });
    }
    const [sortField, sortDirection] = sortSelect.value.split(':');
    const sortBy = [{
      field: sortField,
      direction: sortDirection
    }];
    chart.query = {
      filtersBy: filters,
      sortBy
    };
    chart.data = salesData;
  };

  // Add event listeners
  categoryFilter.addEventListener('change', updateChart);
  regionFilter.addEventListener('change', updateChart);
  sortSelect.addEventListener('change', updateChart);

  // Initial update
  updateChart();
  container.appendChild(controlsContainer);
  container.appendChild(chart);
  return container;
}`,...(q=(k=b.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};const O=["BarChart","LineChart","PieChart","ScatterPlot","AreaChart","ResponsiveChart","InteractiveCharts","WithQueryFiltering"];export{h as AreaChart,c as BarChart,y as InteractiveCharts,d as LineChart,u as PieChart,g as ResponsiveChart,p as ScatterPlot,b as WithQueryFiltering,O as __namedExportsOrder,j as default};
