import{M as u}from"./base-component-q4KNMHwB.js";class m extends u{constructor(){super(),this._data=[],this._chartType="bar",this._options={},this._query={},this._chart=null,this._d3Loaded=!1,this._resizeObserver=null,this._dimensions={width:400,height:300,margin:{top:20,right:30,bottom:40,left:40}},this.log("DataChart component initializing..."),this.parseAttributes(),this._loadD3()}static get observedAttributes(){return[...super.observedAttributes,"chart-type","data","options","query","width","height","x-axis-label","y-axis-label","color-scale","responsive"]}handleAttributeChange(a,e,t){switch(super.handleAttributeChange(a,e,t),a){case"chart-type":this._chartType=t||"bar",this._redrawChart();break;case"data":try{this._data=t?JSON.parse(t):[],this._redrawChart()}catch(r){console.warn("Invalid data JSON in my-data-chart:",r),this._data=[]}break;case"options":try{this._options=t?JSON.parse(t):{},this._redrawChart()}catch(r){console.warn("Invalid options JSON in my-data-chart:",r),this._options={}}break;case"query":try{this._query=t?JSON.parse(t):{},this._processDataWithQuery()}catch(r){console.warn("Invalid query JSON in my-data-chart:",r),this._query={}}break;case"width":this._dimensions.width=parseInt(t)||400,this._redrawChart();break;case"height":this._dimensions.height=parseInt(t)||300,this._redrawChart();break}}parseAttributes(){this._chartType=this.getAttribute("chart-type")||"bar",this._dimensions.width=parseInt(this.getAttribute("width"))||400,this._dimensions.height=parseInt(this.getAttribute("height"))||300;const a=this.getAttribute("data");if(a)try{this._data=JSON.parse(a)}catch(r){console.warn("Invalid data JSON:",r),this._data=[]}const e=this.getAttribute("options");if(e)try{this._options=JSON.parse(e)}catch(r){console.warn("Invalid options JSON:",r),this._options={}}const t=this.getAttribute("query");if(t)try{this._query=JSON.parse(t)}catch(r){console.warn("Invalid query JSON:",r),this._query={}}}async _loadD3(){if(window.d3){this._d3Loaded=!0,this._redrawChart();return}try{const a=document.createElement("script");a.src="https://d3js.org/d3.v7.min.js",a.onload=()=>{this._d3Loaded=!0,this.log("D3.js loaded successfully"),this._redrawChart()},a.onerror=()=>{console.error("Failed to load D3.js")},document.head.appendChild(a)}catch(a){console.error("Error loading D3.js:",a)}}_processDataWithQuery(){if(!this._query||Object.keys(this._query).length===0){this._processedData=this._data,this._redrawChart();return}let a=[...this._data];if(this._query.filtersBy&&Array.isArray(this._query.filtersBy)&&this._query.filtersBy.forEach(e=>{a=a.filter(t=>{const r=t[e.field];switch(e.operator){case"eq":return r===e.value;case"ne":return r!==e.value;case"gt":return r>e.value;case"lt":return r<e.value;case"gte":return r>=e.value;case"lte":return r<=e.value;case"contains":return String(r).toLowerCase().includes(String(e.value).toLowerCase());default:return!0}})}),this._query.searchBy){const e=this._query.searchBy.toLowerCase();a=a.filter(t=>Object.values(t).some(r=>String(r).toLowerCase().includes(e)))}this._query.sortBy&&Array.isArray(this._query.sortBy)&&this._query.sortBy.forEach(e=>{a.sort((t,r)=>{const l=t[e.field],i=r[e.field],y=l<i?-1:l>i?1:0;return e.direction==="desc"?-y:y})}),this._processedData=a,this._redrawChart(),this.emitEvent("query-change",{query:this._query,processedData:a})}_redrawChart(){if(!this._d3Loaded||!this.shadowRoot)return;const a=this.shadowRoot.querySelector(".chart-container");if(!a)return;window.d3.select(a).select("svg").remove();const t=this._processedData||this._data;if(!(!t||t.length===0))try{switch(this._chartType){case"bar":this._drawBarChart(a,t);break;case"line":this._drawLineChart(a,t);break;case"pie":this._drawPieChart(a,t);break;case"scatter":this._drawScatterChart(a,t);break;case"area":this._drawAreaChart(a,t);break;default:console.warn(`Unsupported chart type: ${this._chartType}`),this._drawBarChart(a,t)}this.emitEvent("chart-render",{chartType:this._chartType,data:t})}catch(r){console.error("Error drawing chart:",r)}}_drawBarChart(a,e){const t=window.d3,{width:r,height:l,margin:i}=this._dimensions,n=t.select(a).append("svg").attr("width",r).attr("height",l).attr("class","chart-svg").append("g").attr("transform",`translate(${i.left},${i.top})`),p=r-i.left-i.right,h=l-i.top-i.bottom,d=t.scaleBand().domain(e.map(s=>s.label||s.name||s.x)).range([0,p]).padding(.1),g=t.scaleLinear().domain([0,t.max(e,s=>s.value||s.y)]).nice().range([h,0]),o=t.scaleOrdinal().domain(e.map(s=>s.label||s.name||s.x)).range(["var(--_global-color-primary)","var(--_global-color-secondary)","var(--_global-color-tertiary)"]);n.selectAll(".bar").data(e).enter().append("rect").attr("class","bar").attr("x",s=>d(s.label||s.name||s.x)).attr("width",d.bandwidth()).attr("y",s=>g(s.value||s.y)).attr("height",s=>h-g(s.value||s.y)).attr("fill",s=>o(s.label||s.name||s.x)).attr("rx",4).style("transition","all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)"),n.append("g").attr("transform",`translate(0,${h})`).call(t.axisBottom(d)),n.append("g").call(t.axisLeft(g)),(this._options.xAxisLabel||this.getAttribute("x-axis-label"))&&n.append("text").attr("transform",`translate(${p/2}, ${h+i.bottom})`).style("text-anchor","middle").text(this._options.xAxisLabel||this.getAttribute("x-axis-label")),(this._options.yAxisLabel||this.getAttribute("y-axis-label"))&&n.append("text").attr("transform","rotate(-90)").attr("y",0-i.left).attr("x",0-h/2).attr("dy","1em").style("text-anchor","middle").text(this._options.yAxisLabel||this.getAttribute("y-axis-label"))}_drawLineChart(a,e){const t=window.d3,{width:r,height:l,margin:i}=this._dimensions,n=t.select(a).append("svg").attr("width",r).attr("height",l).attr("class","chart-svg").append("g").attr("transform",`translate(${i.left},${i.top})`),p=r-i.left-i.right,h=l-i.top-i.bottom,d=t.scaleLinear().domain(t.extent(e,(s,c)=>s.x||c)).range([0,p]),g=t.scaleLinear().domain(t.extent(e,s=>s.y||s.value)).nice().range([h,0]),o=t.line().x(s=>d(s.x||e.indexOf(s))).y(s=>g(s.y||s.value)).curve(t.curveMonotoneX);n.append("path").datum(e).attr("class","line").attr("d",o).style("fill","none").style("stroke","var(--_global-color-primary)").style("stroke-width",2).style("transition","all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)"),n.selectAll(".dot").data(e).enter().append("circle").attr("class","dot").attr("cx",(s,c)=>d(s.x||c)).attr("cy",s=>g(s.y||s.value)).attr("r",4).style("fill","var(--_global-color-primary)"),n.append("g").attr("transform",`translate(0,${h})`).call(t.axisBottom(d)),n.append("g").call(t.axisLeft(g))}_drawPieChart(a,e){const t=window.d3,{width:r,height:l}=this._dimensions,i=Math.min(r,l)/2,n=t.select(a).append("svg").attr("width",r).attr("height",l).attr("class","chart-svg").append("g").attr("transform",`translate(${r/2},${l/2})`),p=t.scaleOrdinal().domain(e.map(o=>o.label||o.name)).range(t.schemeCategory10),h=t.pie().value(o=>o.value),d=t.arc().innerRadius(0).outerRadius(i-10),g=n.selectAll(".arc").data(h(e)).enter().append("g").attr("class","arc");g.append("path").attr("d",d).style("fill",o=>p(o.data.label||o.data.name)).style("stroke","var(--_global-color-surface)").style("stroke-width",2).style("transition","all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)"),g.append("text").attr("transform",o=>`translate(${d.centroid(o)})`).attr("dy","0.35em").style("text-anchor","middle").style("font-size","12px").text(o=>o.data.label||o.data.name)}_drawScatterChart(a,e){const t=window.d3,{width:r,height:l,margin:i}=this._dimensions,n=t.select(a).append("svg").attr("width",r).attr("height",l).attr("class","chart-svg").append("g").attr("transform",`translate(${i.left},${i.top})`),p=r-i.left-i.right,h=l-i.top-i.bottom,d=t.scaleLinear().domain(t.extent(e,o=>o.x)).range([0,p]),g=t.scaleLinear().domain(t.extent(e,o=>o.y)).range([h,0]);n.selectAll(".dot").data(e).enter().append("circle").attr("class","dot").attr("cx",o=>d(o.x)).attr("cy",o=>g(o.y)).attr("r",o=>o.size||5).style("fill","var(--_global-color-primary)").style("opacity",.7).style("transition","all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)"),n.append("g").attr("transform",`translate(0,${h})`).call(t.axisBottom(d)),n.append("g").call(t.axisLeft(g))}_drawAreaChart(a,e){const t=window.d3,{width:r,height:l,margin:i}=this._dimensions,n=t.select(a).append("svg").attr("width",r).attr("height",l).attr("class","chart-svg").append("g").attr("transform",`translate(${i.left},${i.top})`),p=r-i.left-i.right,h=l-i.top-i.bottom,d=t.scaleLinear().domain(t.extent(e,(c,_)=>c.x||_)).range([0,p]),g=t.scaleLinear().domain([0,t.max(e,c=>c.y||c.value)]).nice().range([h,0]),o=t.area().x((c,_)=>d(c.x||_)).y0(h).y1(c=>g(c.y||c.value)).curve(t.curveMonotoneX);n.append("path").datum(e).attr("class","area").attr("d",o).style("fill","var(--_global-color-primary)").style("fill-opacity",.3).style("transition","all var(--_global-animation-duration-normal) var(--_global-animation-easing-standard)");const s=t.line().x((c,_)=>d(c.x||_)).y(c=>g(c.y||c.value)).curve(t.curveMonotoneX);n.append("path").datum(e).attr("class","line").attr("d",s).style("fill","none").style("stroke","var(--_global-color-primary)").style("stroke-width",2),n.append("g").attr("transform",`translate(0,${h})`).call(t.axisBottom(d)),n.append("g").call(t.axisLeft(g))}_setupResizeObserver(){this.hasAttribute("responsive")&&(this._resizeObserver=new ResizeObserver(a=>{for(const e of a){const{width:t,height:r}=e.contentRect;this._dimensions.width=t,this._dimensions.height=r,this._redrawChart()}}),this._resizeObserver.observe(this))}connectedCallback(){super.connectedCallback(),this._setupResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null)}set data(a){this._data=a,this._processDataWithQuery()}get data(){return this._data}set chartType(a){this._chartType=a,this._redrawChart()}get chartType(){return this._chartType}set options(a){this._options=a,this._redrawChart()}get options(){return this._options}set query(a){this._query=a,this._processDataWithQuery()}get query(){return this._query}render(){return`
      <style>
        :host {
          --_chart-background: var(--_global-color-surface);
          --_chart-border: var(--_global-color-outline-variant);
          --_chart-text: var(--_global-color-on-surface);
          
          display: block;
          background: var(--_chart-background);
          border: 1px solid var(--_chart-border);
          border-radius: var(--_global-border-radius-lg);
          padding: var(--_global-spacing-lg);
          color: var(--_chart-text);
          font-family: var(--_global-font-family-sans);
          position: relative;
          overflow: hidden;
        }

        :host([responsive]) {
          width: 100%;
          height: auto;
        }

        .chart-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-svg {
          max-width: 100%;
          height: auto;
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--_global-color-on-surface-variant);
          font-size: var(--_global-font-size-body-medium);
        }

        .error-message {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--_global-color-error);
          font-size: var(--_global-font-size-body-medium);
        }

        /* Chart-specific styles */
        .bar {
          transition: opacity var(--_global-animation-duration-normal) var(--_global-animation-easing-standard);
        }

        .bar:hover {
          opacity: 0.8;
        }

        .line {
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .dot {
          transition: r var(--_global-animation-duration-normal) var(--_global-animation-easing-standard);
        }

        .dot:hover {
          r: 6;
        }

        .arc path {
          transition: transform var(--_global-animation-duration-normal) var(--_global-animation-easing-standard);
        }

        .arc:hover path {
          transform: scale(1.05);
        }

        /* Axis styling */
        .chart-svg .domain {
          stroke: var(--_global-color-outline);
        }

        .chart-svg .tick line {
          stroke: var(--_global-color-outline-variant);
        }

        .chart-svg .tick text {
          fill: var(--_global-color-on-surface-variant);
          font-size: 12px;
          font-family: var(--_global-font-family-sans);
        }
      </style>
      
      <div class="chart-container" role="img" aria-label="Data visualization chart">
        ${this._d3Loaded?"":'<div class="loading-indicator">Loading chart...</div>'}
      </div>
    `}}customElements.define("my-data-chart",m);
