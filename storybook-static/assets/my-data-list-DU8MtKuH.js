class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._rows=[],this._query={searchBy:"",filtersBy:[],sortBy:[],offset:0,limit:10},this._totalItems=0,this._loading=!1,this._hasMore=!0,this.handleSearch=this.handleSearch.bind(this),this.handleSort=this.handleSort.bind(this),this.handleFilter=this.handleFilter.bind(this),this.handleLoadMore=this.handleLoadMore.bind(this),this.handleScroll=this.handleScroll.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.debouncedSearch=this.debounce(this.handleSearch,300),this.render(),this.attachEventListeners()}static get observedAttributes(){return["searchable","sortable","filterable","pagination-type","page-size","loading","empty-message","search-placeholder","total-items"]}attributeChangedCallback(t,e,a){e!==a&&(t==="total-items"&&(this._totalItems=parseInt(a)||0,this.updatePagination()),this.render(),this.attachEventListeners())}debounce(t,e){let a;return function(...o){const s=()=>{clearTimeout(a),t(...o)};clearTimeout(a),a=setTimeout(s,e)}}get rows(){return this._rows}set rows(t){this._rows=Array.isArray(t)?t:[],this.render()}get query(){return{...this._query}}set query(t){this._query={...this._query,...t},this.render()}get totalItems(){return this._totalItems}set totalItems(t){this._totalItems=parseInt(t)||0,this.updatePagination()}get loading(){return this._loading||this.hasAttribute("loading")}set loading(t){this._loading=!!t,t?this.setAttribute("loading",""):this.removeAttribute("loading"),this.render()}get searchable(){return this.hasAttribute("searchable")}set searchable(t){t?this.setAttribute("searchable",""):this.removeAttribute("searchable")}get sortable(){return this.hasAttribute("sortable")}set sortable(t){t?this.setAttribute("sortable",""):this.removeAttribute("sortable")}get filterable(){return this.hasAttribute("filterable")}set filterable(t){t?this.setAttribute("filterable",""):this.removeAttribute("filterable")}get paginationType(){return this.getAttribute("pagination-type")||"pagination"}set paginationType(t){this.setAttribute("pagination-type",t)}get pageSize(){return parseInt(this.getAttribute("page-size"))||10}set pageSize(t){this.setAttribute("page-size",t)}get emptyMessage(){return this.getAttribute("empty-message")||"No data available"}set emptyMessage(t){this.setAttribute("empty-message",t)}get searchPlaceholder(){return this.getAttribute("search-placeholder")||"Search..."}set searchPlaceholder(t){this.setAttribute("search-placeholder",t)}handleSearch(t){const e=t.target.value;this._query.searchBy=e,this._query.offset=0,this.emitQueryChange()}handleSort(t,e){this._query.sortBy.length>0&&this._query.sortBy[0].field===t&&(e=this._query.sortBy[0].direction==="asc"?"desc":"asc"),this._query.sortBy=[{field:t,direction:e||"asc"}],this._query.offset=0,this.emitQueryChange(),this.updateSortIndicators()}handleFilter(t,e,a,i=!0){this._query.filtersBy=this._query.filtersBy.filter(o=>o.field!==t),i&&a!==void 0&&a!==""&&this._query.filtersBy.push({field:t,operator:e,value:a}),this._query.offset=0,this.emitQueryChange()}handleLoadMore(){this.loading||!this._hasMore||(this._query.offset+=this._query.limit,this.emitQueryChange())}handleScroll(t){if(this.paginationType!=="infinite")return;const e=t.target,a=e.scrollTop,i=e.scrollHeight,o=e.clientHeight;a+o>=i-50&&this.handleLoadMore()}handleKeyDown(t){(t.key==="ArrowDown"||t.key==="ArrowUp")&&(t.preventDefault(),this.navigateItems(t.key==="ArrowDown"?1:-1))}navigateItems(t){const e=this.shadowRoot.querySelectorAll(".list-item"),a=Array.from(e).findIndex(o=>o.classList.contains("focused"));let i;a===-1?i=t>0?0:e.length-1:(i=a+t,i<0&&(i=e.length-1),i>=e.length&&(i=0)),e.forEach(o=>o.classList.remove("focused")),e[i]&&(e[i].classList.add("focused"),e[i].scrollIntoView({behavior:"smooth",block:"nearest"}))}emitQueryChange(){this.dispatchEvent(new CustomEvent("query-change",{detail:{query:this.query},bubbles:!0,cancelable:!0}))}updateSortIndicators(){this.shadowRoot.querySelectorAll(".sort-btn").forEach(e=>{const a=e.dataset.field,i=this._query.sortBy.find(o=>o.field===a);e.classList.remove("sorted-asc","sorted-desc"),i&&e.classList.add(`sorted-${i.direction}`)})}updatePagination(){const t=Math.ceil(this._totalItems/this._query.limit),e=Math.floor(this._query.offset/this._query.limit)+1;this._hasMore=this._query.offset+this._query.limit<this._totalItems;const a=this.shadowRoot.querySelector(".page-info"),i=this.shadowRoot.querySelector(".prev-btn"),o=this.shadowRoot.querySelector(".next-btn"),s=this.shadowRoot.querySelector(".load-more-btn");if(a){const n=Math.min(this._query.offset+1,this._totalItems),r=Math.min(this._query.offset+this._query.limit,this._totalItems);a.textContent=`${n}-${r} of ${this._totalItems}`}i&&(i.disabled=e<=1),o&&(o.disabled=e>=t),s&&(s.style.display=this._hasMore?"block":"none")}generateControls(){return this.searchable||this.sortable||this.filterable?`
      <div class="controls-section">
        <slot name="controls">
          ${this.searchable?`
            <div class="search-container">
              <my-input 
                name="list-search"
                type="text" 
                placeholder="${this.searchPlaceholder}"
                class="search-input"
                value="${this._query.searchBy}"
              >
                <my-icon slot="left" icon="search"></my-icon>
                ${this._query.searchBy?'<my-icon slot="right" icon="clear" class="clear-search"></my-icon>':""}
              </my-input>
            </div>
          `:""}
          
          ${this.sortable?`
            <div class="sort-container">
              <slot name="sort-controls"></slot>
            </div>
          `:""}
          
          ${this.filterable?`
            <div class="filter-container">
              <slot name="filter-controls"></slot>
            </div>
          `:""}
        </slot>
      </div>
    `:""}generateListItems(){return this._rows.length===0?`
        <div class="empty-state">
          <slot name="empty">
            <div class="empty-content">
              <my-icon icon="inbox" size="lg"></my-icon>
              <p>${this.emptyMessage}</p>
            </div>
          </slot>
        </div>
      `:this._rows.map((t,e)=>`
      <div 
        class="list-item" 
        data-index="${e}"
        role="listitem"
        tabindex="0"
      >
        <slot name="item" data-item='${JSON.stringify(t)}'>
          <div class="default-item">
            ${Object.entries(t).map(([a,i])=>`
              <div class="item-field">
                <span class="field-label">${a}:</span>
                <span class="field-value">${i}</span>
              </div>
            `).join("")}
          </div>
        </slot>
      </div>
    `).join("")}generatePagination(){return this.paginationType==="none"?"":this.paginationType==="infinite"?`
        <div class="pagination-section infinite-scroll">
          ${this._hasMore?`
            <button class="load-more-btn" ${this.loading?"disabled":""}>
              ${this.loading?"Loading...":"Load More"}
            </button>
          `:""}
        </div>
      `:`
      <div class="pagination-section">
        <div class="page-info"></div>
        <div class="pagination-controls">
          <button class="prev-btn" aria-label="Previous page">
            <my-icon icon="chevron_left"></my-icon>
          </button>
          <button class="next-btn" aria-label="Next page">
            <my-icon icon="chevron_right"></my-icon>
          </button>
        </div>
      </div>
    `}attachEventListeners(){const t=this.shadowRoot.querySelector(".search-input input");t&&(t.removeEventListener("input",this.debouncedSearch),t.addEventListener("input",this.debouncedSearch));const e=this.shadowRoot.querySelector(".clear-search");e&&(e.removeEventListener("click",()=>{const r=this.shadowRoot.querySelector(".search-input input");r&&(r.value="",this.handleSearch({target:{value:""}}))}),e.addEventListener("click",()=>{const r=this.shadowRoot.querySelector(".search-input input");r&&(r.value="",this.handleSearch({target:{value:""}}))}));const a=this.shadowRoot.querySelector(".prev-btn"),i=this.shadowRoot.querySelector(".next-btn"),o=this.shadowRoot.querySelector(".load-more-btn");a&&(a.removeEventListener("click",()=>{this._query.offset=Math.max(0,this._query.offset-this._query.limit),this.emitQueryChange()}),a.addEventListener("click",()=>{this._query.offset=Math.max(0,this._query.offset-this._query.limit),this.emitQueryChange()})),i&&(i.removeEventListener("click",()=>{this._query.offset+=this._query.limit,this.emitQueryChange()}),i.addEventListener("click",()=>{this._query.offset+=this._query.limit,this.emitQueryChange()})),o&&(o.removeEventListener("click",this.handleLoadMore),o.addEventListener("click",this.handleLoadMore));const s=this.shadowRoot.querySelector(".list-container");s&&this.paginationType==="infinite"&&(s.removeEventListener("scroll",this.handleScroll),s.addEventListener("scroll",this.handleScroll)),this.removeEventListener("keydown",this.handleKeyDown),this.addEventListener("keydown",this.handleKeyDown);const n=this.shadowRoot.querySelectorAll(".list-item");n.forEach(r=>{r.addEventListener("focus",()=>{n.forEach(l=>l.classList.remove("focused")),r.classList.add("focused")})})}render(){this._query.limit=this.pageSize,this.shadowRoot.innerHTML=`
      <style>
        :host {
          /* Data list-specific variables using global semantic variables */
          --_data-list-background: var(--_global-color-surface-container-low);
          --_data-list-border: 1px solid var(--_global-color-outline-variant);
          --_data-list-border-radius: var(--_global-border-radius-lg);
          --_data-list-elevation: var(--_global-elevation-1);
          
          --_data-list-item-padding: var(--_global-spacing-md);
          --_data-list-item-gap: var(--_global-spacing-sm);
          --_data-list-item-border: 1px solid var(--_global-color-outline-variant);
          --_data-list-item-border-radius: var(--_global-border-radius-md);
          --_data-list-item-background: var(--_global-color-surface);
          --_data-list-item-hover-background: var(--_global-color-surface-container);
          
          --_data-list-controls-padding: var(--_global-spacing-lg);
          --_data-list-controls-gap: var(--_global-spacing-md);
          --_data-list-controls-border: 1px solid var(--_global-color-outline-variant);
          
          --_data-list-transition: all var(--_global-motion-duration-short2) var(--_global-motion-easing-standard);
          
          display: block;
          background: var(--_data-list-background);
          border: var(--_data-list-border);
          border-radius: var(--_data-list-border-radius);
          box-shadow: var(--_data-list-elevation);
          overflow: hidden;
          font-family: var(--_global-font-family-sans);
        }

        /* Header section */
        .header-section {
          padding: var(--_data-list-controls-padding);
          border-bottom: var(--_data-list-controls-border);
          background: var(--_global-color-surface-container);
        }

        /* Controls section */
        .controls-section {
          display: flex;
          gap: var(--_data-list-controls-gap);
          flex-wrap: wrap;
          align-items: center;
          padding: var(--_data-list-controls-padding);
          background: var(--_global-color-surface-container-high);
          border-bottom: var(--_data-list-controls-border);
        }

        .search-container {
          flex: 1;
          min-width: 200px;
        }

        .sort-container,
        .filter-container {
          display: flex;
          gap: var(--_global-spacing-sm);
          align-items: center;
        }

        .clear-search {
          cursor: pointer;
          color: var(--_global-color-on-surface-variant);
          transition: color var(--_data-list-transition);
        }

        .clear-search:hover {
          color: var(--_global-color-on-surface);
        }

        /* List container */
        .list-container {
          max-height: ${this.paginationType==="infinite"?"400px":"none"};
          overflow-y: ${this.paginationType==="infinite"?"auto":"visible"};
          padding: var(--_global-spacing-md);
        }

        /* List items */
        .list-item {
          background: var(--_data-list-item-background);
          border: var(--_data-list-item-border);
          border-radius: var(--_data-list-item-border-radius);
          padding: var(--_data-list-item-padding);
          margin-bottom: var(--_data-list-item-gap);
          transition: var(--_data-list-transition);
          cursor: pointer;
          outline: none;
        }

        .list-item:hover {
          background: var(--_data-list-item-hover-background);
          transform: translateY(-1px);
          box-shadow: var(--_global-elevation-2);
        }

        .list-item:focus,
        .list-item.focused {
          outline: 2px solid var(--_global-color-primary);
          outline-offset: 2px;
        }

        .list-item:last-child {
          margin-bottom: 0;
        }

        /* Default item styling */
        .default-item {
          display: flex;
          flex-direction: column;
          gap: var(--_global-spacing-xs);
        }

        .item-field {
          display: flex;
          gap: var(--_global-spacing-sm);
        }

        .field-label {
          font-weight: var(--_global-font-weight-medium);
          color: var(--_global-color-on-surface-variant);
          min-width: 100px;
        }

        .field-value {
          color: var(--_global-color-on-surface);
          flex: 1;
        }

        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--_global-spacing-xxl);
          text-align: center;
          color: var(--_global-color-on-surface-variant);
        }

        .empty-content my-icon {
          margin-bottom: var(--_global-spacing-md);
          opacity: 0.5;
        }

        .empty-content p {
          margin: 0;
          font-size: var(--_global-font-size-lg);
        }

        /* Loading state */
        :host([loading]) .list-container {
          opacity: 0.6;
          pointer-events: none;
        }

        :host([loading]) .list-container::after {
          content: 'Loading...';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--_global-color-surface);
          padding: var(--_global-spacing-md);
          border-radius: var(--_global-border-radius-md);
          box-shadow: var(--_global-elevation-2);
        }

        /* Pagination section */
        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--_global-spacing-md) var(--_data-list-controls-padding);
          border-top: var(--_data-list-controls-border);
          background: var(--_global-color-surface-container);
        }

        .page-info {
          font-size: var(--_global-font-size-sm);
          color: var(--_global-color-on-surface-variant);
        }

        .pagination-controls {
          display: flex;
          gap: var(--_global-spacing-sm);
        }

        .pagination-controls button {
          background: var(--_global-color-surface);
          border: 1px solid var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
          padding: var(--_global-spacing-sm);
          cursor: pointer;
          transition: var(--_data-list-transition);
          color: var(--_global-color-on-surface);
        }

        .pagination-controls button:hover:not(:disabled) {
          background: var(--_global-color-surface-container);
          border-color: var(--_global-color-outline);
        }

        .pagination-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Infinite scroll */
        .load-more-btn {
          display: block;
          width: 100%;
          padding: var(--_global-spacing-md);
          background: var(--_global-color-surface-container);
          border: 1px solid var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-md);
          color: var(--_global-color-on-surface);
          cursor: pointer;
          transition: var(--_data-list-transition);
          font-family: inherit;
        }

        .load-more-btn:hover:not(:disabled) {
          background: var(--_global-color-surface-container-high);
        }

        .load-more-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .controls-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-container {
            min-width: auto;
          }
          
          .default-item {
            gap: var(--_global-spacing-sm);
          }
          
          .item-field {
            flex-direction: column;
            gap: var(--_global-spacing-xs);
          }
          
          .field-label {
            min-width: auto;
            font-size: var(--_global-font-size-xs);
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .list-item {
            border-width: 2px;
          }
          
          .list-item:focus {
            outline-width: 3px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .list-item,
          .pagination-controls button,
          .load-more-btn {
            transition: none;
          }
          
          .list-item:hover {
            transform: none;
          }
        }

        /* Scrollbar styling */
        .list-container::-webkit-scrollbar {
          width: 8px;
        }

        .list-container::-webkit-scrollbar-track {
          background: var(--_global-color-surface-container);
          border-radius: var(--_global-border-radius-sm);
        }

        .list-container::-webkit-scrollbar-thumb {
          background: var(--_global-color-outline-variant);
          border-radius: var(--_global-border-radius-sm);
        }

        .list-container::-webkit-scrollbar-thumb:hover {
          background: var(--_global-color-outline);
        }
      </style>

      <div class="header-section">
        <slot name="header"></slot>
      </div>

      ${this.generateControls()}

      <div class="list-container" role="list" aria-label="Data list">
        ${this.generateListItems()}
      </div>

      ${this.generatePagination()}
    `,this.updatePagination(),this.updateSortIndicators(),this.attachEventListeners()}connectedCallback(){this.setAttribute("tabindex","0")}disconnectedCallback(){this.removeEventListener("keydown",this.handleKeyDown)}}customElements.get("my-data-list")||customElements.define("my-data-list",c);
