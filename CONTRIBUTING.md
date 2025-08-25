# MyntUI Development Guidelines

This document outlines best practices and foundational principles for developing high-quality software and web applications, with a specific focus on creating a **library-agnostic web component library**. Adhering to these guidelines ensures consistency, maintainability, and reusability across projects.

---

## 1. Input Schema Definition

To ensure a standardized approach for defining various input types within the component library, we will utilize a unified JSON schema. This schema allows for clear, declarative definitions of input properties, validation rules, and presentation options.

```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": [
        "text",
        "pattern",
        "number",
        "integer",
        "date",
        "datetime-local",
        "time",
        "date-of-birth",
        "select",
        "dynamic-select",
        "textarea",
        "checkbox",
        "radio",
        "email",
        "password",
        "url",
        "tel"
      ],
      "description": "The type of input field."
    },
    "label": {
      "type": "string",
      "description": "The human-readable label displayed for the input."
    },
    "name": {
      "type": "string",
      "description": "The name attribute for the input, used for form submission and identification."
    },
    "placeholder": {
      "type": "string",
      "description": "Placeholder text displayed when the input is empty."
    },
    "value": {
      "type": ["string", "number", "boolean", "array", "null"],
      "description": "The initial or current value of the input."
    },
    "labelPosition": {
      "type": "string",
      "enum": ["over", "left", "top"],
      "default": "top",
      "description": "Position of the label relative to the input field."
    },
    "options": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "label": { "type": "string" },
          "value": { "type": "string" }
        },
        "required": ["label", "value"]
      },
      "description": "Array of options for 'select' or 'radio' input types."
    },
    "multiple": {
      "type": "boolean",
      "default": false,
      "description": "Indicates if multiple options can be selected (for 'select' type)."
    },
    "required": {
      "type": "boolean",
      "default": false,
      "description": "Indicates if the input is a mandatory field."
    },
    "disabled": {
      "type": "boolean",
      "default": false,
      "description": "Indicates if the input is disabled."
    },
    "readonly": {
      "type": "boolean",
      "default": false,
      "description": "Indicates if the input is read-only."
    },
    "validation": {
      "type": "string",
      "description": "A JavaScript function as a string (or a reference to one) for custom validation logic. This function should accept the input value and return true for valid, false for invalid. Example: 'function(value) { return value.length > 5; }'"
    },
    "pattern": {
      "type": "string",
      "format": "regex",
      "description": "A regular expression string for client-side pattern validation (for 'pattern' and other text-based types)."
    },
    "minLength": {
      "type": "integer",
      "minimum": 0,
      "description": "Minimum allowed length for text inputs."
    },
    "maxLength": {
      "type": "integer",
      "description": "Maximum allowed length for text inputs."
    },
    "min": {
      "type": "number",
      "description": "Minimum allowed value for number/date inputs."
    },
    "max": {
      "type": "number",
      "description": "Maximum allowed value for number/date inputs."
    },
    "step": {
      "type": "number",
      "description": "Step interval for number inputs."
    },
    "autofocus": {
      "type": "boolean",
      "default": false,
      "description": "Indicates if the input should be focused on page load."
    },
    "autocomplete": {
      "type": "string",
      "description": "Hint for browser's autocomplete feature."
    }
  },
  "required": ["type", "label", "name"]
}
```

**Example Input Schema Usage:**

```json
{
  "type": "text",
  "label": "First Name",
  "name": "firstName",
  "placeholder": "Enter your first name",
  "required": true,
  "minLength": 2,
  "maxLength": 50,
  "labelPosition": "top"
}
```json
{
  "type": "select",
  "label": "Country",
  "name": "country",
  "options": [
    { "label": "United States", "value": "US" },
    { "label": "Canada", "value": "CA" },
    { "label": "Mexico", "value": "MX" }
  ],
  "required": true,
  "labelPosition": "left"
}
```

-----

## 2\. Rules of Thumb for Building the Web Component Library

These guidelines are crucial for ensuring the component library is truly **framework-agnostic**, performant, and maintainable.

### 2.1. Native-First Development

  * **No External Libraries:** Components **must not** rely on any third-party JavaScript frameworks, UI libraries, or CSS libraries (e.g., React, Vue, Angular, jQuery, Bootstrap, TailwindCSS for component logic). All functionality should be implemented using native Web APIs (DOM, Custom Elements, Shadow DOM, EventTarget, Fetch API, etc.).
  * **Pure JavaScript/HTML/CSS:** Develop components using plain JavaScript, HTML templates, and CSS. This ensures maximum compatibility and minimal overhead.

### 2.2. Library Agnosticism via Web Components

  * **Custom Elements Standard:** All components **must** be built as [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). This is the foundation for framework independence.
  * **Shadow DOM Encapsulation:** Utilize [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) for style and markup encapsulation. This prevents styling conflicts and ensures components render consistently regardless of the host application's styles.
  * **Attributes and Properties:** Components should expose their API primarily through **attributes** (for declarative, initial configuration) and **JavaScript properties** (for dynamic updates and complex data). Reflect properties to attributes where appropriate.
  * **Events for Communication:** Components **must** communicate outwards using standard DOM [Custom Events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events). This allows parent components or frameworks to react to changes without direct coupling.

### 2.3. Design System Variables

A robust design system is powered by a well-structured variable system. This approach ensures design consistency and simplifies theme management.

  * **Two Levels of Variables:**

    1.  **Global Semantic Variables:** Define foundational design tokens using CSS Custom Properties (variables). These should describe purpose, not specific values.
          * **Naming Convention:** Use a consistent prefix (e.g., `--_global-`) and semantic names (e.g., `--_global-spacing-md`, `--_global-color-primary`, `--_global-font-size-body`).
          * **Examples:**
            ```css
            :root {
              /* Spacing */
              --_global-spacing-xs: 4px;
              --_global-spacing-sm: 8px;
              --_global-spacing-md: 16px;
              --_global-spacing-lg: 24px;

              /* Colors */
              --_global-color-primary: #007bff;
              --_global-color-secondary: #6c757d;
              --_global-color-text-dark: #212529;
              --_global-color-background-light: #f8f9fa;
              --_global-color-border: #dee2e6;

              /* Typography */
              --_global-font-family-sans: "Inter", sans-serif;
              --_global-font-size-body: 16px;
              --_global-font-weight-normal: 400;
              --_global-font-weight-bold: 700;

              /* Border Radius */
              --_global-border-radius-sm: 4px;
              --_global-border-radius-md: 8px;
            }
            ```
    2.  **Component-Specific Variables:** Within each component's Shadow DOM, define variables that **reuse** the global semantic variables. These variables provide specific values for the component's internal styling.
          * **Naming Convention:** Use a component-specific prefix (e.g., `--_button-`, `--_input-`).
          * **Examples (inside a `my-button` component's stylesheet):**
            ```css
            :host {
              /* Button specific variables, reusing global ones */
              --_button-padding: var(--_global-spacing-md) var(--_global-spacing-lg);
              --_button-background-color: var(--_global-color-primary);
              --_button-text-color: var(--_global-color-background-light);
              --_button-border-radius: var(--_global-border-radius-md);
              --_button-font-size: var(--_global-font-size-body);
              --_button-border: 1px solid var(--_global-color-primary);
            }

            button {
              padding: var(--_button-padding);
              background-color: var(--_button-background-color);
              color: var(--_button-text-color);
              border-radius: var(--_button-border-radius);
              font-size: var(--_button-font-size);
              border: var(--_button-border);
              font-family: var(--_global-font-family-sans); /* Use global font directly */
            }
            ```

  * **All CSS Classes:** All styling within components **must** be applied via CSS classes or directly to elements within the Shadow DOM, using the defined variable system. Avoid inline styles where possible.

### 2.4. Naming Conventions

  * **US English:** All naming, including variable names, class names, component names, and documentation, **must** follow US English spelling and grammar rules.

-----

## 3\. Web Component Library: Component Behaviors and Descriptions

This section outlines the essential web components within the library, detailing their functionalities, input schemas, and specific implementation considerations. All components will strictly follow the **native-first development** principle, leverage **Web Components standards** (Custom Elements, Shadow DOM), utilize the **two-level CSS variable system**, and employ **US English naming conventions**.

-----

### 3.1. `my-icon` (Material Icons) 🖼️

  * **Description**: A component for rendering scalable vector icons from the Material Icons library. It uses a `<link>` to the Material Icons font in its Shadow DOM.
  * **Behavior**:
      * Takes an `icon` attribute (string) corresponding to the Material Icon name (e.g., "home", "settings").
      * Renders the specified icon within its Shadow DOM.
      * **Styling**: Uses CSS variables for `color` and `size`.
  * **Example Usage**: `<my-icon icon="face"></my-icon>`

-----

### 3.2. `my-input` (General Input Field) ✍️

  * **Description**: A versatile input component that supports various HTML5 input types and custom validation, designed to work with the defined input schema.
  * **Behavior**:
      * Accepts the full **Input Schema** as a JavaScript property (e.g., `myInputInstance.schema = { ... }`) or as a serialized JSON string via an attribute.
      * Renders an appropriate native input element (`<input>`, `<textarea>`, `<select>`) based on the `type` property.
      * **Slots**: Provides named slots for `left` and `right` to insert text, icons, or other small elements directly adjacent to the input field, enhancing its functionality (e.g., a currency symbol on the left, a clear button on the right).
      * **Validation**: Implements client-side validation based on `required`, `pattern`, `minLength`, `maxLength`, `min`, `max`, and the `validation` function from the schema. Displays appropriate error messages.
      * **Events**: Emits `change` and `input` events with the new `value` and validation status in the `detail` property of the `CustomEvent`.
      * **Styling**: Uses CSS variables for padding, border, focus states, label positioning, and slot styling.
  * **Example Usage**:
    ```html
    <my-input label="Email" name="email" type="email" required>
      <my-icon slot="left" icon="mail"></my-icon>
      <span slot="right">@example.com</span>
    </my-input>
    ```

-----

### 3.3. Boolean Inputs ✅

A set of components for binary or multi-choice boolean inputs.

#### 3.3.1. `my-toggle`

  * **Description**: A switch-like component for a boolean input, providing a visual on/off state.
  * **Behavior**:
      * Takes a `checked` boolean property.
      * Emits a `change` event when toggled, indicating the new `checked` state in `event.detail.checked`.
      * **Styling**: Uses CSS variables for colors, sizes, and animation of the toggle switch.

#### 3.3.2. `my-checkbox`

  * **Description**: A standard checkbox input for selecting one or more options.
  * **Behavior**:
      * Takes `checked` (boolean) and `label` (string) properties.
      * Supports indeterminate state (for group checkboxes) via an `indeterminate` boolean property.
      * Emits a `change` event when its state is altered, with `event.detail.checked`.
      * **Styling**: Customizable checkbox appearance.

#### 3.3.3. `my-radio-group` and `my-radio`

  * **Description**: `my-radio-group` manages a set of `my-radio` components, ensuring only one can be selected at a time within the group.
  * **Behavior**:
      * `my-radio-group`: Takes a `name` attribute and a `value` property (for the selected radio's value). It uses the default slot to contain `my-radio` elements.
      * `my-radio`: Takes `value` and `label` properties. It also has a `checked` boolean property.
      * When a `my-radio` is selected, `my-radio-group` updates its `value` and emits a `change` event with `event.detail.value`.
      * **Styling**: Customizable radio button appearance.

-----

### 3.4. `my-button` 👆

  * **Description**: A customizable button component for user interaction.
  * **Behavior**:
      * Takes `label` (string) or allows for slotting content.
      * Supports `variant` (e.g., "primary", "secondary", "ghost"), `disabled` (boolean), `loading` (boolean) states. A `loading` state typically displays a spinner and disables the button.
      * Emits a `click` event.
      * **Styling**: Uses CSS variables for background, text color, padding, border-radius, hover/focus states, and loading spinner animation.

-----

### 3.5. `my-dropdown` 🔽

  * **Description**: A component that displays a list of options when clicked, typically used for navigation or actions.
  * **Behavior**:
      * Takes `options` (array of objects like `{label: string, value: string}` or `{label: string, action: function}`).
      * The dropdown content appears and disappears on click of its trigger element (which can be provided via a slot).
      * Emits a `select` event with the chosen `value` or triggers the `action` if defined.
      * Handles keyboard navigation (arrow keys, Enter) for accessibility.
      * **Styling**: Uses CSS variables for dropdown menu appearance, item padding, and hover states.

-----

### 3.6. `my-tooltip` 💬

  * **Description**: A small, contextual information pop-up displayed on hover or focus of an element.
  * **Behavior**:
      * Wraps its target element (using a default slot) and takes `text` (string) or `content` (named slot) for the tooltip message.
      * Appears on `mouseover` or `focus` of the target, disappears on `mouseout` or `blur`.
      * Supports `position` (e.g., "top", "bottom", "left", "right", "auto") to control where the tooltip appears relative to the target.
      * **Styling**: Uses CSS variables for background, text color, padding, border-radius, and arrow styling.

-----

### 3.7. Overlay Components (Injected into `<body>`) ⬆️

These components are designed to float above the main document content and will be programmatically injected at the start or end of the `<body>` element to ensure correct stacking context and full-screen coverage.

#### 3.7.1. `my-drawer` ➡️

  * **Description**: A sliding panel that can be positioned on any side of the viewport, containing supplementary content or navigation.
  * **Behavior**:
      * Takes `open` (boolean), `position` ("left", "right", "top", "bottom"), `mode` ("collapsing", "hovering") properties.
      * `collapsing` mode: Pushes the main content aside, resizing the main content area.
      * `hovering` mode: floats over the main content without affecting layout (sticky).
      * Can be controlled programmatically via its `open` property or via an internal close button within its content slot.
      * Emits `open` and `close` events.
      * **Injection**: Programmatically appended to the `<body>` element.
      * **Styling**: Uses CSS variables for width/height, background, shadow, and transition animations for sliding in/out.

#### 3.7.2. `my-modal` ◻️

  * **Description**: A dialog box that appears on top of the page, typically for critical information or user input, blocking interaction with the main content.
  * **Behavior**:
      * Takes `open` (boolean), `title` (string), and allows for rich content via slots (e.g., `header`, `body`, `footer`).
      * Includes a backdrop that can be clicked to close the modal (if `close-on-backdrop-click` property is true).
      * Traps keyboard focus within the modal for accessibility (e.g., tabbing only cycles through modal elements).
      * Emits `open` and `close` events.
      * **Injection**: Programmatically appended to the `<body>` element.
      * **Styling**: Uses CSS variables for backdrop color, modal maximum size, background, border-radius, and entry/exit animations.

#### 3.7.3. `my-notification` (Toaster-like) 🔔

  * **Description**: Ephemeral, non-intrusive messages that appear temporarily to provide feedback to the user.
  * **Behavior**:
      * Takes `message` (string), `type` ("success", "error", "warning", "info"), `duration` (number in milliseconds).
      * Automatically dismisses after `duration` or can be manually dismissed by a close button.
      * Multiple notifications can queue or stack (managed by a wrapper component, not the individual notification).
      * **Injection**: Programmatically appended to the `<body>` element, typically positioned in a corner (e.g., top-right, bottom-left).
      * **Styling**: Uses CSS variables for background, text color, padding, border-radius, and entry/exit animations.

-----

### 3.8. Data Display Components (API-Ready) 📊

These components are designed for displaying structured data, offering advanced controls and interaction capabilities. They are "API ready" in that they abstract the querying mechanism through a `query` object.

#### 3.8.1. `my-data-list`

  * **Description**: Displays a list of data items, with built-in controls for searching, filtering, sorting, and pagination/infinite scroll.
  * **Behavior**:
      * **Inputs**:
          * `rows`: An array of objects, representing the data to display.
          * `query`: An object reflecting the current data query state. This should be a **property**, not an attribute, for complex objects:
            ```javascript
            {
              searchBy: string,   // Text to search for across relevant fields
              filtersBy: Array<{field: string, operator: string, string: any}>, // Array of filter objects (e.g., {field: 'status', operator: 'eq', value: 'active'})
              sortBy: Array<{field: string, direction: 'asc' | 'desc'}>, // Array of sort criteria (e.g., [{field: 'name', direction: 'asc'}])
              offset: number,    // For pagination: start index of data
              limit: number      // For pagination: number of items per page
            }
            ```
          * `totalItems`: (number, optional) Total count of items available, crucial for pagination UI.
      * **Slots**:
          * Default slot for custom rendering of each list item. The component will iterate over `rows` and render the slot content for each.
          * `header`: For custom header content (e.g., a title, overall controls).
          * `controls`: For custom placement of search, filter, sort UI within the component.
      * **Controls**: Automatically displays built-in UI for (or provides hooks for custom UI):
          * **Search Input**: Updates `query.searchBy`.
          * **Filters**: UI for adding/removing `query.filtersBy`.
          * **Column Sorting**: (If `rows` have keys, allows sorting by those keys) Updates `query.sortBy`.
          * **Pagination/Infinite Scroll**: Updates `query.offset` and `query.limit`.
      * **Events**: Emits a `query-change` event whenever any internal control modifies the `query` object. This event's `detail` will contain the new `query` object. The application should listen to this to fetch new data from an API.
      * **Styling**: Uses CSS variables for item spacing, background colors, and control styling.

#### 3.8.2. `my-data-table`

  * **Description**: Displays data in a tabular format, similar to `my-data-list` but structured with columns and rows, offering advanced controls.
  * **Behavior**:
      * **Inputs**:
          * `rows`: An array of objects, where each object is a row of data.
          * `columns`: An array of objects defining column properties (e.g., `{ key: 'name', label: 'Name', sortable: true, filterable: true, cellRenderer: function }`).
          * `query`: Same query object as `my-data-list`.
          * `totalItems`: (number, optional) Total count of items available, for pagination.
      * **Slots**:
          * `cell-{columnKey}`: For custom rendering of specific cell content using named slots (e.g., `<span slot="cell-status">`).
          * `header-{columnKey}`: For custom rendering of specific column headers.
          * `controls`: For custom placement of search, filter, sort, grouping, pagination UI.
      * **Controls**: Automatically displays built-in UI for (or provides hooks for custom UI):
          * **Search Input**: Updates `query.searchBy`.
          * **Filters**: UI for adding/removing `query.filtersBy`.
          * **Column Sorting**: Clicking column headers updates `query.sortBy`.
          * **Grouping**: (Advanced) UI for grouping rows based on a specific `field`.
          * **Pagination/Infinite Scroll**: Updates `query.offset` and `query.limit`.
      * **Events**: Emits a `query-change` event when the `query` object is modified, with the new `query` object in `event.detail`.
      * **Styling**: Uses CSS variables for table borders, cell padding, header styling, and control styling.

#### 3.8.3. `my-data-chart` (D3.js Based)

  * **Description**: A flexible data visualization component capable of rendering various chart types based on D3.js, driven by the `query` object.
  * **Behavior**:
      * **Inputs**:
          * `data`: An array of objects representing the data points for the chart.
          * `chartType`: (string) e.g., "bar", "line", "pie", "scatter", "area".
          * `options`: (object) D3.js specific options for rendering (e.g., `xAxisLabel`, `yAxisLabel`, `colorScale`, `margin`, `tooltipFormatter`).
          * `query`: Same query object as `my-data-list` and `my-data-table`, enabling dynamic charting based on search, filters, and time ranges applied to the `data`.
      * **D3.js Integration**: Internally uses D3.js to render SVG-based charts within its Shadow DOM. The D3.js library should be loaded efficiently (e.g., via a `<script>` tag in the component's Shadow DOM template, ensuring it's scoped). **It is critical that D3.js is used *only* for the rendering and data manipulation logic within this specific component, not for the general component library architecture or other components.**
      * **Controls**: Can include basic interactive controls (e.g., brush for zooming/filtering, legend toggles) that can update the `query` object.
      * **Events**: Emits `query-change` for interactive filtering or data range selection (if implemented), and `chart-render` when the chart is drawn.
      * **Responsiveness**: Adapts chart dimensions to its container's size using JavaScript for redrawing on resize events.
      * **Styling**: Uses CSS variables for colors, fonts, and general chart aesthetics.

-----

### 3.9. Data Visualization (Individual) 📈

Simpler components for displaying specific data insights.

#### 3.9.1. `my-gauge`

  * **Description**: Visualizes a single numerical value within a defined range, often with a radial or arc-shaped display.
  * **Behavior**:
      * Takes `value` (number), `min` (number), `max` (number), `label` (string) properties.
      * Renders a visual representation of the value's position within the range (e.g., a dial, a progress arc).
      * **Styling**: Uses CSS variables for gauge colors, sizes, and text.

#### 3.9.2. `my-progress`

  * **Description**: Displays the progress of a task or process, typically as a bar.
  * **Behavior**:
      * Takes `value` (number, 0-100), `label` (string, optional), `variant` (e.g., "primary", "secondary", "striped") properties.
      * Visually indicates completion percentage.
      * **Styling**: Uses CSS variables for bar color, background, height/width, and animation for striped variants.

#### 3.9.3. `my-sparkline`

  * **Description**: A small, simple line chart without axes or labels, designed to show trends in data within a compact space.
  * **Behavior**:
      * Takes `data` (array of numbers) and `color` (string) properties.
      * Generates an SVG path or canvas drawing to represent the data trend.
      * **Styling**: Uses CSS variables for line color, thickness, and overall dimensions.

-----

## 4\. Layering and Z-Index Management 🃏

> "Next time we split up, remind me to ask—do I wanna go with the team facin’ seven screechin’ swamp hags, or the side sippin’ tea with a fancy vampire and a broken lute? One group’s chuckin’ fireballs into a cauldron of nightmares—the other’s havin’ a jam session with Count Fabulous. Hard choice, really. Burnt eyebrows... or a musical interlude.”

Just as adventurers choose their party and face different threats, our UI components operate on various "layers" within the document, interacting with each other and the user. Managing these layers effectively, especially for interactive elements that appear on top of others, is crucial for a predictable and robust user experience.

### 4.1. The Challenge of Stacking Context

The CSS `z-index` property, while seemingly straightforward, can be complex due to stacking contexts. Elements only stack relative to other elements within the same stacking context. This can lead to issues where a theoretically high `z-index` on a modal might still be covered by a parent element with a lower `z-index` but a new stacking context.

### 4.2. Strategy for Overlay Components

To overcome stacking context issues and ensure overlay components (like `my-drawer`, `my-modal`, `my-notification`) always appear on top of the main application content, a specific strategy is employed:

  * **Direct `<body>` Injection:** These components **will be programmatically injected directly as children of the `<body>` element** when they are activated or become visible. This places them at the highest level in the DOM tree, ensuring they are part of the root stacking context and can effectively layer over all other page content.
      * When an overlay component needs to be shown, its Custom Element instance is created and appended to `document.body`.
      * When it is hidden, it is either removed from the DOM or its `display` property is set to `none`.

### 4.3. Global Z-Index Management

To manage the stacking order among different overlay components (e.g., a notification appearing over a modal, or a tooltip over a dropdown), a system of global CSS custom properties for `z-index` values will be established:

  * **Semantic Z-Index Variables:** Define a set of global semantic `z-index` variables in the `:root` pseudo-class. These variables describe the *purpose* of the layer, rather than arbitrary numbers.
    ```css
    :root {
      --_global-z-index-base: 1; /* For general content */
      --_global-z-index-dropdown: 100;
      --_global-z-index-sticky-header: 200;
      --_global-z-index-tooltip: 300;
      --_global-z-index-drawer: 400;
      --_global-z-index-modal: 500;
      --_global-z-index-notification: 600;
      --_global-z-index-overlay-max: 999; /* For critical, temporary overlays */
    }
    ```
  * **Component-Specific Z-Index:** Each overlay component will then use these global variables within its Shadow DOM styling:
    ```css
    my-dropdown::part(menu) { /* Example for dropdown menu part */
      z-index: var(--_global-z-index-dropdown);
    }

    my-drawer {
      z-index: var(--_global-z-index-drawer);
    }

    my-modal {
      z-index: var(--_global-z-index-modal);
    }

    my-notification {
      z-index: var(--_global-z-index-notification);
    }
    ```

This approach provides a clear, consistent, and easily manageable system for ensuring UI elements appear in the correct visual order, preventing unexpected layering bugs and improving the overall user experience.

-----

## 5\. General Software Development Guidelines

These broader principles ensure a structured, efficient, and well-designed development process from conception to implementation.

### 5.1. Schema and Data Shape First 📐

  * **Define Data Before Implementation:** Before writing any code, the complete **schema and data shape for all entities** (e.g., user profiles, product items, form inputs) **must be explicitly defined**. This includes data types, relationships, constraints, and expected values.
  * **Documentation:** These schemas should be thoroughly documented, serving as the single source of truth for data structures. This upstream planning prevents costly refactoring due to unforeseen data requirements.

### 5.2. UI-Driven API Design 🖼️➡️🌐

The development process should flow from user experience (UI) to data requirements (API), ensuring the API precisely serves the application's needs.

  * **Database (DB) Design:** Begin by designing the **database schema**, considering the core entities, their attributes, and relationships. This forms the foundational data model.
  * **User Interface (UI) Design:** Once the database foundation is clear, design the **user interface screens and interactions**. This involves sketching, wireframing, and creating mockups to visualize the user experience.
      * **Data Requirements from UI:** As the UI is designed, identify **precisely what data is needed from the backend** to populate each screen and enable each interaction. This detailed understanding will inform API design.
  * **API Endpoint Planification:** Based on the specific data requirements identified during UI design, define **API endpoints that provide *only* the data needed by the UI, in the *exact shape* required.**
      * **Avoid Over-fetching/Under-fetching:** API responses should be lean and optimized for the UI's consumption. Avoid sending unnecessary data (over-fetching) or requiring multiple API calls for a single UI component (under-fetching).
      * **Clear Contracts:** Each API endpoint should have a clear contract (input parameters, expected output schema).

**The Workflow:**

1.  **Database Design:** What data do we need to store? How is it related?
2.  **UI Design:** How will users interact with the application? What information do they see?
3.  **API Design:** What data does the UI need from the backend, and in what format? How can we deliver it efficiently?

This systematic approach minimizes waste, enhances collaboration between frontend and backend teams, and results in a more efficient and maintainable application.

