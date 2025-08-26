import{g as a}from"./my-input-Cr2iSYlQ.js";import"./my-icon-O3BbYCXg.js";import"./my-button-WudZcNwy.js";import"./my-checkbox-BMhv1J44.js";import"./my-radio-group-DgIt2bh1.js";import"./my-tooltip-B3RMpmFT.js";import"./my-dropdown-CiMYD9E9.js";import"./my-progress-RNfs7yqs.js";import"./my-sparkline-CJMl-uDe.js";import{M as r}from"./base-component-q4KNMHwB.js";import"./my-data-list-DU8MtKuH.js";import"./my-data-table-C8ZCmYSs.js";import"./my-data-chart-B3QHoMTF.js";import"./my-modal-Cik2IHTQ.js";import"./my-notification-CsCwobM5.js";import"./my-drawer-CI78YKtn.js";class o extends r{constructor(){super(),this._columns=12,this._gap="md",this._breakpoints={},this.log("Grid component initializing..."),this.parseAttributes()}static get observedAttributes(){return[...super.observedAttributes,"columns","gap","auto-fit","auto-fill","min-width","align-items","justify-content","align-content","justify-items","sm-columns","md-columns","lg-columns","xl-columns"]}handleAttributeChange(t,i,s){super.handleAttributeChange(t,i,s),this.parseAttributes(),this.updateGridStyles()}parseAttributes(){this._columns=parseInt(this.getAttribute("columns"))||12,this._gap=this.getAttribute("gap")||"md",this._autoFit=this.hasAttribute("auto-fit"),this._autoFill=this.hasAttribute("auto-fill"),this._minWidth=this.getAttribute("min-width")||"280px",this._alignItems=this.getAttribute("align-items")||"stretch",this._justifyContent=this.getAttribute("justify-content")||"start",this._alignContent=this.getAttribute("align-content")||"start",this._justifyItems=this.getAttribute("justify-items")||"stretch",this._breakpoints={sm:parseInt(this.getAttribute("sm-columns"))||null,md:parseInt(this.getAttribute("md-columns"))||null,lg:parseInt(this.getAttribute("lg-columns"))||null,xl:parseInt(this.getAttribute("xl-columns"))||null}}getGapValue(t){const i=a.get("theme.spacing",{});switch(t){case"xs":return i.xs||"var(--_global-spacing-xs)";case"sm":return i.sm||"var(--_global-spacing-sm)";case"md":return i.md||"var(--_global-spacing-md)";case"lg":return i.lg||"var(--_global-spacing-lg)";case"xl":return i.xl||"var(--_global-spacing-xl)";case"xxl":return i.xxl||"var(--_global-spacing-xxl)";default:return t}}getGridTemplateColumns(){return this._autoFit?`repeat(auto-fit, minmax(${this._minWidth}, 1fr))`:this._autoFill?`repeat(auto-fill, minmax(${this._minWidth}, 1fr))`:`repeat(${this._columns}, minmax(0, 1fr))`}updateGridStyles(){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector(".grid");t&&(t.style.display="grid",t.style.gridTemplateColumns=this.getGridTemplateColumns(),t.style.gap=this.getGapValue(this._gap),t.style.alignItems=this._alignItems,t.style.justifyContent=this._justifyContent,t.style.alignContent=this._alignContent,t.style.justifyItems=this._justifyItems)}createTemplate(){return`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .grid {
          display: grid;
          grid-template-columns: ${this.getGridTemplateColumns()};
          gap: ${this.getGapValue(this._gap)};
          align-items: ${this._alignItems};
          justify-content: ${this._justifyContent};
          align-content: ${this._alignContent};
          justify-items: ${this._justifyItems};
          width: 100%;
        }

        /* Responsive breakpoints */
        @media (min-width: var(--_global-breakpoint-sm, 576px)) {
          .grid {
            ${this._breakpoints.sm?`grid-template-columns: repeat(${this._breakpoints.sm}, minmax(0, 1fr));`:""}
          }
        }

        @media (min-width: var(--_global-breakpoint-md, 768px)) {
          .grid {
            ${this._breakpoints.md?`grid-template-columns: repeat(${this._breakpoints.md}, minmax(0, 1fr));`:""}
          }
        }

        @media (min-width: var(--_global-breakpoint-lg, 992px)) {
          .grid {
            ${this._breakpoints.lg?`grid-template-columns: repeat(${this._breakpoints.lg}, minmax(0, 1fr));`:""}
          }
        }

        @media (min-width: var(--_global-breakpoint-xl, 1200px)) {
          .grid {
            ${this._breakpoints.xl?`grid-template-columns: repeat(${this._breakpoints.xl}, minmax(0, 1fr));`:""}
          }
        }

        /* Auto-fit and auto-fill handling */
        :host([auto-fit]) .grid {
          grid-template-columns: repeat(auto-fit, minmax(${this._minWidth}, 1fr));
        }

        :host([auto-fill]) .grid {
          grid-template-columns: repeat(auto-fill, minmax(${this._minWidth}, 1fr));
        }

        /* Gap variations */
        :host([gap="xs"]) .grid { gap: var(--_global-spacing-xs); }
        :host([gap="sm"]) .grid { gap: var(--_global-spacing-sm); }
        :host([gap="md"]) .grid { gap: var(--_global-spacing-md); }
        :host([gap="lg"]) .grid { gap: var(--_global-spacing-lg); }
        :host([gap="xl"]) .grid { gap: var(--_global-spacing-xl); }
        :host([gap="xxl"]) .grid { gap: var(--_global-spacing-xxl); }

        /* Alignment variations */
        :host([align-items="start"]) .grid { align-items: start; }
        :host([align-items="center"]) .grid { align-items: center; }
        :host([align-items="end"]) .grid { align-items: end; }
        :host([align-items="stretch"]) .grid { align-items: stretch; }

        :host([justify-content="start"]) .grid { justify-content: start; }
        :host([justify-content="center"]) .grid { justify-content: center; }
        :host([justify-content="end"]) .grid { justify-content: end; }
        :host([justify-content="space-between"]) .grid { justify-content: space-between; }
        :host([justify-content="space-around"]) .grid { justify-content: space-around; }
        :host([justify-content="space-evenly"]) .grid { justify-content: space-evenly; }

        /* Ensure slotted content maintains proper styling */
        ::slotted(*) {
          min-width: 0; /* Prevent grid items from overflowing */
        }
      </style>
      <div class="grid">
        <slot></slot>
      </div>
    `}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=this.createTemplate(),this.attachEventListeners(),this.updateGridStyles(),this.updateAccessibilityFeatures())}attachEventListeners(){if(window.ResizeObserver){const t=new ResizeObserver(()=>{this.updateGridStyles()});t.observe(this),this._resizeObserver=t}}updateAccessibilityFeatures(){this.setAttribute("role","grid"),this._errors&&this._errors.length===0&&this.announceToScreenReader(`Grid layout with ${this._columns} columns updated`,"polite")}setColumns(t){this.setAttribute("columns",t.toString())}setGap(t){this.setAttribute("gap",t)}setResponsiveColumns(t,i){this.setAttribute(`${t}-columns`,i.toString())}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver&&this._resizeObserver.disconnect()}}customElements.define("my-grid",o);class l extends r{constructor(){super(),this._colSpan=1,this._rowSpan=1,this._colStart=null,this._colEnd=null,this._rowStart=null,this._rowEnd=null,this.log("Grid item component initializing..."),this.parseAttributes()}static get observedAttributes(){return[...super.observedAttributes,"col-span","row-span","col-start","col-end","row-start","row-end","align-self","justify-self","sm-col-span","md-col-span","lg-col-span","xl-col-span"]}handleAttributeChange(t,i,s){super.handleAttributeChange(t,i,s),this.parseAttributes(),this.updateItemStyles()}parseAttributes(){this._colSpan=parseInt(this.getAttribute("col-span"))||1,this._rowSpan=parseInt(this.getAttribute("row-span"))||1,this._colStart=this.getAttribute("col-start")?parseInt(this.getAttribute("col-start")):null,this._colEnd=this.getAttribute("col-end")?parseInt(this.getAttribute("col-end")):null,this._rowStart=this.getAttribute("row-start")?parseInt(this.getAttribute("row-start")):null,this._rowEnd=this.getAttribute("row-end")?parseInt(this.getAttribute("row-end")):null,this._alignSelf=this.getAttribute("align-self")||"auto",this._justifySelf=this.getAttribute("justify-self")||"auto",this._responsiveSpans={sm:parseInt(this.getAttribute("sm-col-span"))||null,md:parseInt(this.getAttribute("md-col-span"))||null,lg:parseInt(this.getAttribute("lg-col-span"))||null,xl:parseInt(this.getAttribute("xl-col-span"))||null}}getGridColumn(){return this._colStart&&this._colEnd?`${this._colStart} / ${this._colEnd}`:this._colStart?`${this._colStart} / span ${this._colSpan}`:this._colSpan>1?`span ${this._colSpan}`:"auto"}getGridRow(){return this._rowStart&&this._rowEnd?`${this._rowStart} / ${this._rowEnd}`:this._rowStart?`${this._rowStart} / span ${this._rowSpan}`:this._rowSpan>1?`span ${this._rowSpan}`:"auto"}updateItemStyles(){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector(".grid-item");t&&(t.style.gridColumn=this.getGridColumn(),t.style.gridRow=this.getGridRow(),t.style.alignSelf=this._alignSelf,t.style.justifySelf=this._justifySelf)}createTemplate(){return`
      <style>
        :host {
          display: contents; /* Makes the host invisible for grid layout */
        }

        .grid-item {
          grid-column: ${this.getGridColumn()};
          grid-row: ${this.getGridRow()};
          align-self: ${this._alignSelf};
          justify-self: ${this._justifySelf};
          min-width: 0; /* Prevent overflow */
          position: relative;
        }

        /* Column span variations */
        :host([col-span="1"]) .grid-item { grid-column: span 1; }
        :host([col-span="2"]) .grid-item { grid-column: span 2; }
        :host([col-span="3"]) .grid-item { grid-column: span 3; }
        :host([col-span="4"]) .grid-item { grid-column: span 4; }
        :host([col-span="5"]) .grid-item { grid-column: span 5; }
        :host([col-span="6"]) .grid-item { grid-column: span 6; }
        :host([col-span="7"]) .grid-item { grid-column: span 7; }
        :host([col-span="8"]) .grid-item { grid-column: span 8; }
        :host([col-span="9"]) .grid-item { grid-column: span 9; }
        :host([col-span="10"]) .grid-item { grid-column: span 10; }
        :host([col-span="11"]) .grid-item { grid-column: span 11; }
        :host([col-span="12"]) .grid-item { grid-column: span 12; }
        :host([col-span="full"]) .grid-item { grid-column: 1 / -1; }

        /* Row span variations */
        :host([row-span="1"]) .grid-item { grid-row: span 1; }
        :host([row-span="2"]) .grid-item { grid-row: span 2; }
        :host([row-span="3"]) .grid-item { grid-row: span 3; }
        :host([row-span="4"]) .grid-item { grid-row: span 4; }
        :host([row-span="full"]) .grid-item { grid-row: 1 / -1; }

        /* Alignment variations */
        :host([align-self="start"]) .grid-item { align-self: start; }
        :host([align-self="center"]) .grid-item { align-self: center; }
        :host([align-self="end"]) .grid-item { align-self: end; }
        :host([align-self="stretch"]) .grid-item { align-self: stretch; }

        :host([justify-self="start"]) .grid-item { justify-self: start; }
        :host([justify-self="center"]) .grid-item { justify-self: center; }
        :host([justify-self="end"]) .grid-item { justify-self: end; }
        :host([justify-self="stretch"]) .grid-item { justify-self: stretch; }

        /* Responsive column spans */
        @media (min-width: var(--_global-breakpoint-sm, 576px)) {
          ${this._responsiveSpans.sm?`:host([sm-col-span="${this._responsiveSpans.sm}"]) .grid-item { grid-column: span ${this._responsiveSpans.sm}; }`:""}
        }

        @media (min-width: var(--_global-breakpoint-md, 768px)) {
          ${this._responsiveSpans.md?`:host([md-col-span="${this._responsiveSpans.md}"]) .grid-item { grid-column: span ${this._responsiveSpans.md}; }`:""}
        }

        @media (min-width: var(--_global-breakpoint-lg, 992px)) {
          ${this._responsiveSpans.lg?`:host([lg-col-span="${this._responsiveSpans.lg}"]) .grid-item { grid-column: span ${this._responsiveSpans.lg}; }`:""}
        }

        @media (min-width: var(--_global-breakpoint-xl, 1200px)) {
          ${this._responsiveSpans.xl?`:host([xl-col-span="${this._responsiveSpans.xl}"]) .grid-item { grid-column: span ${this._responsiveSpans.xl}; }`:""}
        }

        /* Ensure content doesn't overflow */
        ::slotted(*) {
          min-width: 0;
          max-width: 100%;
        }
      </style>
      <div class="grid-item">
        <slot></slot>
      </div>
    `}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=this.createTemplate(),this.updateItemStyles(),this.updateAccessibilityFeatures())}updateAccessibilityFeatures(){this.setAttribute("role","gridcell"),this._colSpan>1&&this.setAttribute("aria-colspan",this._colSpan.toString()),this._rowSpan>1&&this.setAttribute("aria-rowspan",this._rowSpan.toString())}setColSpan(t){this.setAttribute("col-span",t.toString())}setRowSpan(t){this.setAttribute("row-span",t.toString())}setPosition(t,i,s=null,e=null){this.setAttribute("col-start",t.toString()),this.setAttribute("row-start",i.toString()),s&&this.setAttribute("col-end",s.toString()),e&&this.setAttribute("row-end",e.toString())}setResponsiveSpan(t,i){this.setAttribute(`${t}-col-span`,i.toString())}}customElements.define("my-grid-item",l);console.log("MyntUI: Available components loaded successfully");console.log("Components ready: my-icon, my-button, my-input, my-toggle, my-checkbox, my-radio, my-radio-group, my-tooltip, my-dropdown, my-gauge, my-progress, my-sparkline, my-grid, my-grid-item, my-data-list, my-data-table, my-data-chart, my-modal, my-notification, my-drawer");console.log("MyntUI: Global configuration system initialized");console.log("Features: All 18 input types • Icon slots • Light/Dark themes • Grid system • Global config");
