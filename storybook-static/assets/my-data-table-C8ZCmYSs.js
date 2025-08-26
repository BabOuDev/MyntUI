import{M as d}from"./base-component-q4KNMHwB.js";class h extends d{constructor(){super(),this._data=[],this._columns=[],this._filteredData=[],this._sortedData=[],this._selectedRows=new Set,this._currentSort={column:null,direction:null},this._currentPage=1,this._pageSize=10,this._totalRows=0,this._loading=!1,this._searchQuery="",this._columnFilters=new Map,this.handleSort=this.handleSort.bind(this),this.handleRowSelect=this.handleRowSelect.bind(this),this.handleSelectAll=this.handleSelectAll.bind(this),this.handleSearch=this.handleSearch.bind(this),this.handlePageChange=this.handlePageChange.bind(this),this.handleColumnFilter=this.handleColumnFilter.bind(this),this.log("DataTable component initializing...")}static get observedAttributes(){return[...super.observedAttributes,"selectable","sortable","filterable","searchable","paginated","page-size","dense","striped","bordered","hover-effects","sticky-header","loading","empty-message","loading-message"]}handleAttributeChange(e,t,a){switch(super.handleAttributeChange(e,t,a),e){case"loading":this._loading=a!==null,this.updateLoadingState();break;case"page-size":this._pageSize=parseInt(a)||10,this.updatePagination();break;case"searchable":case"filterable":case"paginated":this.render();break}}get data(){return this._data}set data(e){this._data=Array.isArray(e)?[...e]:[],this._totalRows=this._data.length,this.processData(),this.render(),this.emit("data-changed",{data:this._data,totalRows:this._totalRows})}get columns(){return this._columns}set columns(e){this._columns=Array.isArray(e)?[...e]:[],this.render(),this.emit("columns-changed",{columns:this._columns})}get selectedRows(){return Array.from(this._selectedRows)}get loading(){return this._loading}set loading(e){this._loading=!!e,this.toggleAttribute("loading",this._loading),this.updateLoadingState()}get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(1,parseInt(e)||10),this.setAttribute("page-size",this._pageSize),this.updatePagination()}get searchQuery(){return this._searchQuery}set searchQuery(e){this._searchQuery=String(e||""),this.processData(),this.updateDisplay()}processData(){let e=[...this._data];this._searchQuery.trim()&&(e=this.applySearch(e)),this._columnFilters.size>0&&(e=this.applyColumnFilters(e)),this._currentSort.column&&(e=this.applySorting(e)),this._filteredData=e,this._totalRows=e.length;const t=Math.ceil(this._totalRows/this._pageSize);return this._currentPage>t&&t>0&&(this._currentPage=1),e}applySearch(e){const t=this._searchQuery.toLowerCase().trim();return e.filter(a=>this._columns.some(r=>{const o=this.getCellValue(a,r.key);return String(o).toLowerCase().includes(t)}))}applyColumnFilters(e){return e.filter(t=>{for(const[a,r]of this._columnFilters){const o=this.getCellValue(t,a);if(!this.matchesFilter(o,r))return!1}return!0})}applySorting(e){const{column:t,direction:a}=this._currentSort;return[...e].sort((r,o)=>{const s=this.getCellValue(r,t),i=this.getCellValue(o,t);let n;return typeof s=="number"&&typeof i=="number"?n=s-i:s instanceof Date&&i instanceof Date?n=s.getTime()-i.getTime():n=String(s).localeCompare(String(i)),a==="desc"?-n:n})}matchesFilter(e,t){if(typeof t=="string")return String(e).toLowerCase().includes(t.toLowerCase());if(typeof t=="function")return t(e);if(t&&typeof t=="object"){const{operator:a="contains",value:r}=t;switch(a){case"equals":return e===r;case"contains":return String(e).toLowerCase().includes(String(r).toLowerCase());case"startsWith":return String(e).toLowerCase().startsWith(String(r).toLowerCase());case"endsWith":return String(e).toLowerCase().endsWith(String(r).toLowerCase());case"gt":return Number(e)>Number(r);case"gte":return Number(e)>=Number(r);case"lt":return Number(e)<Number(r);case"lte":return Number(e)<=Number(r);default:return!0}}return!0}getCellValue(e,t){return t.includes(".")?t.split(".").reduce((a,r)=>a==null?void 0:a[r],e):e[t]}handleSort(e){const t=this._columns.find(r=>r.key===e);if(!t||!t.sortable)return;let a="asc";if(this._currentSort.column===e){if(this._currentSort.direction==="asc")a="desc";else if(this._currentSort.direction==="desc"){this._currentSort={column:null,direction:null},this.processData(),this.updateDisplay(),this.emit("sort-changed",{column:null,direction:null});return}}this._currentSort={column:e,direction:a},this.processData(),this.updateDisplay(),this.emit("sort-changed",{column:e,direction:a}),this.announceToScreenReader(`Table sorted by ${t.label||e} in ${a}ending order`,"polite")}handleRowSelect(e,t){t.stopPropagation();const a=(this._currentPage-1)*this._pageSize+e,r=this.getRowId(a);this._selectedRows.has(r)?this._selectedRows.delete(r):this._selectedRows.add(r),this.updateSelectAllState(),this.updateRowSelection(),this.emit("selection-changed",{selectedRows:this.selectedRows,totalSelected:this._selectedRows.size}),this.announceToScreenReader(`Row ${a+1} ${this._selectedRows.has(r)?"selected":"deselected"}. ${this._selectedRows.size} rows selected.`,"polite")}handleSelectAll(e){const t=e.target.checked;if(t){const a=(this._currentPage-1)*this._pageSize,r=Math.min(a+this._pageSize,this._filteredData.length);for(let o=a;o<r;o++)this._selectedRows.add(this.getRowId(o))}else{const a=(this._currentPage-1)*this._pageSize,r=Math.min(a+this._pageSize,this._filteredData.length);for(let o=a;o<r;o++)this._selectedRows.delete(this.getRowId(o))}this.updateRowSelection(),this.emit("selection-changed",{selectedRows:this.selectedRows,totalSelected:this._selectedRows.size}),this.announceToScreenReader(`${t?"Selected":"Deselected"} all visible rows. ${this._selectedRows.size} total rows selected.`,"polite")}handleSearch(e){this.searchQuery=e.target.value,this._currentPage=1,this.updatePagination(),this.emit("search-changed",{query:this._searchQuery})}handleColumnFilter(e,t){t?this._columnFilters.set(e,t):this._columnFilters.delete(e),this._currentPage=1,this.processData(),this.updateDisplay(),this.emit("filter-changed",{column:e,filter:t,activeFilters:Object.fromEntries(this._columnFilters)})}handlePageChange(e){const t=Math.ceil(this._totalRows/this._pageSize);this._currentPage=Math.max(1,Math.min(e,t)),this.updateDisplay(),this.emit("page-changed",{page:this._currentPage,pageSize:this._pageSize,totalRows:this._totalRows}),this.announceToScreenReader(`Showing page ${this._currentPage} of ${t}`,"polite")}getRowId(e){const t=this._filteredData[e];return(t==null?void 0:t.id)||(t==null?void 0:t.key)||e}updateLoadingState(){const e=this.shadowRoot.querySelector("tbody"),t=this.shadowRoot.querySelector(".loading-row");if(this._loading){if(e&&!t){const a=this._columns.length+(this.hasAttribute("selectable")?1:0);e.innerHTML=`
          <tr class="loading-row">
            <td colspan="${a}" style="text-align: center; padding: 2rem;">
              <div class="loading-spinner"></div>
              <div>${this.getAttribute("loading-message")||"Loading..."}</div>
            </td>
          </tr>
        `}}else this.updateDisplay()}updateDisplay(){if(this._loading)return;const e=this.shadowRoot.querySelector("tbody");if(!e)return;const t=(this._currentPage-1)*this._pageSize,a=Math.min(t+this._pageSize,this._filteredData.length),r=this._filteredData.slice(t,a);if(r.length===0){const o=this._columns.length+(this.hasAttribute("selectable")?1:0);e.innerHTML=`
        <tr class="empty-row">
          <td colspan="${o}" style="text-align: center; padding: 2rem; color: var(--_global-color-on-surface-variant);">
            ${this.getAttribute("empty-message")||"No data available"}
          </td>
        </tr>
      `;return}e.innerHTML=r.map((o,s)=>{const i=t+s,n=this.getRowId(i),l=this._selectedRows.has(n);return`
        <tr class="data-row ${l?"selected":""}" data-index="${i}">
          ${this.hasAttribute("selectable")?`
            <td class="select-cell">
              <label class="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  ${l?"checked":""}
                  aria-label="Select row ${i+1}"
                  data-row-index="${s}"
                />
                <span class="checkmark"></span>
              </label>
            </td>
          `:""}
          ${this._columns.map(c=>`
            <td class="data-cell" data-column="${c.key}">
              ${this.renderCell(o,c)}
            </td>
          `).join("")}
        </tr>
      `}).join(""),this.attachRowEventListeners(),this.updateSelectAllState(),this.updatePagination()}renderCell(e,t){const a=this.getCellValue(e,t.key);return t.render&&typeof t.render=="function"?t.render(a,e):t.type==="date"&&a instanceof Date?a.toLocaleDateString():t.type==="currency"&&typeof a=="number"?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a):t.type==="number"&&typeof a=="number"?a.toLocaleString():t.type==="boolean"?a?"✓":"✗":String(a||"")}updateSelectAllState(){const e=this.shadowRoot.querySelector(".select-all-checkbox");if(!e)return;const t=(this._currentPage-1)*this._pageSize,a=Math.min(t+this._pageSize,this._filteredData.length),r=[];for(let s=t;s<a;s++)r.push(this.getRowId(s));const o=r.filter(s=>this._selectedRows.has(s));o.length===0?(e.checked=!1,e.indeterminate=!1):o.length===r.length?(e.checked=!0,e.indeterminate=!1):(e.checked=!1,e.indeterminate=!0)}updateRowSelection(){this.shadowRoot.querySelectorAll(".data-row").forEach((t,a)=>{const r=(this._currentPage-1)*this._pageSize+a,o=this.getRowId(r),s=this._selectedRows.has(o);t.classList.toggle("selected",s);const i=t.querySelector('input[type="checkbox"]');i&&(i.checked=s)})}updatePagination(){const e=this.shadowRoot.querySelector(".pagination");if(!e||!this.hasAttribute("paginated"))return;const t=Math.ceil(this._totalRows/this._pageSize);if(t<=1){e.style.display="none";return}e.style.display="flex";const a=(this._currentPage-1)*this._pageSize+1,r=Math.min(this._currentPage*this._pageSize,this._totalRows);e.innerHTML=`
      <div class="pagination-info">
        Showing ${a}-${r} of ${this._totalRows} items
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-btn" 
          ${this._currentPage===1?"disabled":""}
          data-action="first"
          aria-label="Go to first page"
        >⟪</button>
        <button 
          class="pagination-btn" 
          ${this._currentPage===1?"disabled":""}
          data-action="prev"
          aria-label="Go to previous page"
        >❮</button>
        <span class="page-indicator">Page ${this._currentPage} of ${t}</span>
        <button 
          class="pagination-btn" 
          ${this._currentPage===t?"disabled":""}
          data-action="next"
          aria-label="Go to next page"
        >❯</button>
        <button 
          class="pagination-btn" 
          ${this._currentPage===t?"disabled":""}
          data-action="last"
          aria-label="Go to last page"
        >⟫</button>
      </div>
    `,this.attachPaginationEventListeners()}attachRowEventListeners(){this.shadowRoot.querySelectorAll('.data-row input[type="checkbox"]').forEach(t=>{t.addEventListener("change",a=>{const r=parseInt(a.target.dataset.rowIndex);this.handleRowSelect(r,a)})})}attachPaginationEventListeners(){this.shadowRoot.querySelectorAll(".pagination-btn").forEach(t=>{t.addEventListener("click",a=>{const r=a.target.dataset.action,o=Math.ceil(this._totalRows/this._pageSize);switch(r){case"first":this.handlePageChange(1);break;case"prev":this.handlePageChange(this._currentPage-1);break;case"next":this.handlePageChange(this._currentPage+1);break;case"last":this.handlePageChange(o);break}})})}attachEventListeners(){this.removeEventListeners(),this.shadowRoot.querySelectorAll(".sortable-header").forEach(r=>{r.addEventListener("click",()=>{this.handleSort(r.dataset.column)})});const t=this.shadowRoot.querySelector(".select-all-checkbox");t&&t.addEventListener("change",this.handleSelectAll);const a=this.shadowRoot.querySelector(".search-input");a&&a.addEventListener("input",this.handleSearch)}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Material Design 3 Data Table Variables */
          --_table-background: var(--_global-color-surface);
          --_table-border-color: var(--_global-color-outline-variant);
          --_table-header-background: var(--_global-color-surface-container-low);
          --_table-header-text-color: var(--_global-color-on-surface);
          --_table-row-background: var(--_global-color-surface);
          --_table-row-background-hover: var(--_global-color-surface-container-highest);
          --_table-row-background-selected: color-mix(in srgb, var(--_global-color-primary) 12%, var(--_global-color-surface));
          --_table-cell-padding: var(--_global-spacing-md);
          --_table-border-radius: var(--_global-border-radius-md);
          --_table-shadow: var(--_global-elevation-1);
          --_table-transition: var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          /* Typography */
          --_table-font-family: var(--_global-font-family-sans);
          --_table-font-size: var(--_global-font-size-sm);
          --_table-header-font-size: var(--_global-font-size-sm);
          --_table-header-font-weight: var(--_global-font-weight-medium);
          
          /* Density variants */
          --_table-row-height-compact: 32px;
          --_table-row-height-normal: 52px;
          --_table-row-height-comfortable: 64px;
          --_table-row-height: var(--_table-row-height-normal);
          
          display: block;
          font-family: var(--_table-font-family);
          background: var(--_table-background);
          border-radius: var(--_table-border-radius);
          overflow: hidden;
          box-shadow: var(--_table-shadow);
        }

        /* Table container */
        .table-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* Search and filters */
        .table-controls {
          padding: var(--_global-spacing-md);
          background: var(--_global-color-surface-container-lowest);
          border-bottom: 1px solid var(--_table-border-color);
          display: flex;
          gap: var(--_global-spacing-md);
          align-items: center;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
          border: 1px solid var(--_table-border-color);
          border-radius: var(--_global-border-radius-sm);
          font-size: var(--_table-font-size);
          background: var(--_global-color-surface);
          color: var(--_global-color-on-surface);
          outline: none;
          transition: var(--_table-transition);
        }

        .search-input:focus {
          border-color: var(--_global-color-primary);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--_global-color-primary) 20%, transparent);
        }

        /* Table wrapper for horizontal scrolling */
        .table-wrapper {
          overflow-x: auto;
          overflow-y: visible;
        }

        /* Main table */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--_table-font-size);
          color: var(--_global-color-on-surface);
          background: var(--_table-background);
        }

        /* Table header */
        .data-table thead {
          background: var(--_table-header-background);
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .data-table th {
          padding: var(--_table-cell-padding);
          text-align: left;
          font-weight: var(--_table-header-font-weight);
          font-size: var(--_table-header-font-size);
          color: var(--_table-header-text-color);
          border-bottom: 2px solid var(--_table-border-color);
          white-space: nowrap;
          position: relative;
        }

        .sortable-header {
          cursor: pointer;
          user-select: none;
          transition: var(--_table-transition);
        }

        .sortable-header:hover {
          background: var(--_global-color-surface-container-high);
        }

        .sort-indicator {
          margin-left: var(--_global-spacing-xs);
          font-size: 12px;
          opacity: 0.7;
          transition: var(--_table-transition);
        }

        .sortable-header[data-sort="asc"] .sort-indicator::after {
          content: "▲";
          opacity: 1;
        }

        .sortable-header[data-sort="desc"] .sort-indicator::after {
          content: "▼";
          opacity: 1;
        }

        /* Table body */
        .data-table tbody tr {
          background: var(--_table-row-background);
          transition: var(--_table-transition);
          height: var(--_table-row-height);
        }

        .data-table tbody tr:hover {
          background: var(--_table-row-background-hover);
        }

        .data-table tbody tr.selected {
          background: var(--_table-row-background-selected);
        }

        .data-table tbody tr:nth-child(even) {
          background: color-mix(in srgb, var(--_global-color-surface-container-lowest) 30%, var(--_table-row-background));
        }

        .data-table tbody tr:nth-child(even):hover {
          background: var(--_table-row-background-hover);
        }

        .data-table tbody tr:nth-child(even).selected {
          background: var(--_table-row-background-selected);
        }

        .data-table td {
          padding: var(--_table-cell-padding);
          border-bottom: 1px solid var(--_table-border-color);
          vertical-align: middle;
        }

        /* Selection styles */
        .select-cell {
          width: 48px;
          text-align: center;
        }

        .checkbox-wrapper {
          display: inline-flex;
          align-items: center;
          position: relative;
          cursor: pointer;
        }

        .checkbox-wrapper input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--_global-color-outline);
          border-radius: var(--_global-border-radius-xs);
          background: var(--_global-color-surface);
          position: relative;
          transition: var(--_table-transition);
        }

        .checkbox-wrapper input[type="checkbox"]:checked + .checkmark {
          background: var(--_global-color-primary);
          border-color: var(--_global-color-primary);
        }

        .checkbox-wrapper input[type="checkbox"]:checked + .checkmark::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--_global-color-on-primary);
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-wrapper input[type="checkbox"]:indeterminate + .checkmark {
          background: var(--_global-color-primary);
          border-color: var(--_global-color-primary);
        }

        .checkbox-wrapper input[type="checkbox"]:indeterminate + .checkmark::after {
          content: "−";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--_global-color-on-primary);
          font-size: 12px;
          font-weight: bold;
        }

        /* Loading and empty states */
        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid var(--_global-color-outline-variant);
          border-top: 2px solid var(--_global-color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 8px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-row td,
        .loading-row td {
          text-align: center;
          padding: 2rem;
          color: var(--_global-color-on-surface-variant);
          font-style: italic;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--_global-spacing-md);
          background: var(--_global-color-surface-container-lowest);
          border-top: 1px solid var(--_table-border-color);
          font-size: var(--_global-font-size-sm);
        }

        .pagination-info {
          color: var(--_global-color-on-surface-variant);
        }

        .pagination-controls {
          display: flex;
          gap: var(--_global-spacing-xs);
          align-items: center;
        }

        .pagination-btn {
          width: 32px;
          height: 32px;
          border: 1px solid var(--_table-border-color);
          background: var(--_global-color-surface);
          color: var(--_global-color-on-surface);
          border-radius: var(--_global-border-radius-xs);
          cursor: pointer;
          transition: var(--_table-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .pagination-btn:hover:not(:disabled) {
          background: var(--_global-color-surface-container-highest);
          border-color: var(--_global-color-primary);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-indicator {
          margin: 0 var(--_global-spacing-sm);
          font-weight: var(--_global-font-weight-medium);
        }

        /* Density variants */
        :host([dense]) {
          --_table-row-height: var(--_table-row-height-compact);
          --_table-cell-padding: var(--_global-spacing-sm);
        }

        :host([dense]) .table-controls {
          padding: var(--_global-spacing-sm) var(--_global-spacing-md);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .table-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-input {
            min-width: unset;
          }

          .pagination {
            flex-direction: column;
            gap: var(--_global-spacing-sm);
          }

          .pagination-info {
            order: 2;
          }
        }

        /* Striped variant */
        :host([striped]) .data-table tbody tr:nth-child(odd) {
          background: var(--_global-color-surface-container-lowest);
        }

        /* Bordered variant */
        :host([bordered]) .data-table,
        :host([bordered]) .data-table th,
        :host([bordered]) .data-table td {
          border: 1px solid var(--_table-border-color);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Focus styles */
        .sortable-header:focus,
        .pagination-btn:focus,
        .checkbox-wrapper:focus-within {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }
      </style>
      
      <div class="table-container">
        ${this.hasAttribute("searchable")?`
          <div class="table-controls">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search..."
              aria-label="Search table data"
            />
          </div>
        `:""}
        
        <div class="table-wrapper">
          <table class="data-table" role="table" aria-label="Data table">
            <thead>
              <tr>
                ${this.hasAttribute("selectable")?`
                  <th class="select-cell">
                    <label class="checkbox-wrapper">
                      <input 
                        type="checkbox" 
                        class="select-all-checkbox"
                        aria-label="Select all rows"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </th>
                `:""}
                ${this._columns.map(e=>`
                  <th 
                    class="${e.sortable?"sortable-header":""}"
                    data-column="${e.key}"
                    ${e.sortable?`data-sort="${this._currentSort.column===e.key?this._currentSort.direction:""}"`:""}
                    ${e.sortable?'role="columnheader" tabindex="0"':""}
                    ${e.sortable?`aria-sort="${this._currentSort.column===e.key?this._currentSort.direction==="asc"?"ascending":"descending":"none"}"`:""}
                  >
                    ${e.label||e.key}
                    ${e.sortable?'<span class="sort-indicator"></span>':""}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              <!-- Data rows will be populated by updateDisplay() -->
            </tbody>
          </table>
        </div>

        ${this.hasAttribute("paginated")?`
          <div class="pagination" role="navigation" aria-label="Table pagination">
            <!-- Pagination controls will be populated by updatePagination() -->
          </div>
        `:""}
      </div>
    `,this._loading?this.updateLoadingState():this.updateDisplay(),this.attachEventListeners()}clearSelection(){this._selectedRows.clear(),this.updateRowSelection(),this.emit("selection-changed",{selectedRows:[],totalSelected:0})}selectAll(){this._filteredData.forEach((e,t)=>{this._selectedRows.add(this.getRowId(t))}),this.updateRowSelection(),this.updateSelectAllState(),this.emit("selection-changed",{selectedRows:this.selectedRows,totalSelected:this._selectedRows.size})}exportData(e="json"){const t=this.selectedRows.length>0?this._filteredData.filter((a,r)=>this._selectedRows.has(this.getRowId(r))):this._filteredData;switch(e.toLowerCase()){case"json":return JSON.stringify(t,null,2);case"csv":return this.exportToCSV(t);default:return t}}exportToCSV(e){return[this._columns.map(r=>r.label||r.key).join(","),...e.map(r=>this._columns.map(o=>{const s=this.getCellValue(r,o.key);return`"${String(s).replace(/"/g,'""')}"`}).join(","))].join(`
`)}}customElements.get("my-data-table")||customElements.define("my-data-table",h);
