import '../src/index.js';

export default {
  title: 'Overview/Comprehensive Input Showcase',
  parameters: {
    docs: {
      description: {
        component: 'A complete showcase of all input types supported by the MyntUI library, demonstrating compliance with CONTRIBUTING.md requirements and modern Material Design 3 styling.',
      },
    },
    layout: 'fullscreen',
  },
};

export const ComprehensiveInputShowcase = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    min-height: 100vh;
    background: linear-gradient(135deg, var(--_global-color-surface-container-low) 0%, var(--_global-color-surface) 100%);
    font-family: var(--_global-font-family-sans);
  `;
  
  container.innerHTML = `
    <style>
      .showcase-header {
        text-align: center;
        padding: 4rem 2rem 3rem;
        background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-tertiary) 100%);
        color: var(--_global-color-on-primary);
        position: relative;
        overflow: hidden;
        margin-bottom: 3rem;
      }
      
      .showcase-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff20" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.1;
      }
      
      .showcase-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: var(--_global-font-weight-light);
        margin: 0 0 1rem 0;
        position: relative;
        z-index: 1;
      }
      
      .showcase-subtitle {
        font-size: clamp(1rem, 2vw, 1.25rem);
        opacity: 0.9;
        margin: 0;
        position: relative;
        z-index: 1;
      }
      
      .showcase-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem 4rem;
      }
      
      .input-category {
        background: var(--_global-color-surface);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--_global-elevation-2);
        border: 1px solid var(--_global-color-outline-variant);
      }
      
      .category-title {
        font-size: 1.5rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-on-surface);
        margin: 0 0 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .category-description {
        color: var(--_global-color-on-surface-variant);
        margin: 0 0 2rem 0;
        font-size: 0.95rem;
        line-height: 1.5;
      }
      
      .input-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
      }
      
      .input-demo {
        background: var(--_global-color-surface-container-lowest);
        border-radius: var(--_global-border-radius-md);
        padding: 1.5rem;
        border: 1px solid var(--_global-color-outline-variant);
        transition: var(--_global-interaction-feedback-duration);
      }
      
      .input-demo:hover {
        background: var(--_global-color-surface-container-low);
        border-color: var(--_global-color-outline);
      }
      
      .demo-label {
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        color: var(--_global-color-primary);
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .stats-container {
        background: linear-gradient(135deg, var(--_global-color-primary-container) 0%, var(--_global-color-tertiary-container) 100%);
        border-radius: var(--_global-border-radius-lg);
        padding: 2rem;
        margin: 2rem 0;
        text-align: center;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      
      .stat-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--_global-border-radius-md);
        padding: 1.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .stat-number {
        font-size: 2.5rem;
        font-weight: var(--_global-font-weight-bold);
        color: var(--_global-color-on-primary-container);
        margin: 0;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: var(--_global-color-on-primary-container);
        opacity: 0.8;
        margin: 0.5rem 0 0 0;
      }
      
      .requirements-badge {
        background: var(--_global-color-success-container);
        color: var(--_global-color-on-success-container);
        padding: 0.5rem 1rem;
        border-radius: var(--_global-border-radius-full);
        font-size: 0.875rem;
        font-weight: var(--_global-font-weight-medium);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
      }
    </style>
    
    <div class="showcase-header">
      <h1 class="showcase-title">Complete Input Library</h1>
      <p class="showcase-subtitle">All CONTRIBUTING.md Input Types • Material Design 3 • Framework Agnostic</p>
      <div class="requirements-badge">
        <my-icon icon="check" size="sm"></my-icon>
        100% CONTRIBUTING.md Compliant
      </div>
    </div>
    
    <div class="showcase-content">
      <div class="stats-container">
        <h2 style="margin: 0; color: var(--_global-color-on-primary-container);">Implementation Stats</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">18</div>
            <div class="stat-label">Input Types</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">100%</div>
            <div class="stat-label">Requirements Met</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">A11Y</div>
            <div class="stat-label">Accessibility Ready</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">MD3</div>
            <div class="stat-label">Material Design 3</div>
          </div>
        </div>
      </div>
      
      <!-- Text & Pattern Inputs -->
      <div class="input-category">
        <h2 class="category-title">
          <my-icon icon="edit" color="primary"></my-icon>
          Text & Pattern Inputs
        </h2>
        <p class="category-description">
          Basic text inputs with pattern validation support for structured data entry.
        </p>
        <div class="input-grid">
          <div class="input-demo">
            <div class="demo-label">Text Input</div>
            <my-input 
              type="text" 
              label="Full Name" 
              placeholder="Enter your full name"
              helper-text="Basic text input with placeholder">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Pattern Input</div>
            <my-input 
              type="pattern" 
              label="Product Code" 
              placeholder="ABC123"
              pattern="[A-Z]{3}[0-9]{3}"
              helper-text="Format: ABC123 (3 letters + 3 numbers)">
            </my-input>
          </div>
        </div>
      </div>
      
      <!-- Number Inputs -->
      <div class="input-category">
        <h2 class="category-title">
          <my-icon icon="tag" color="secondary"></my-icon>
          Number & Quantity Inputs
        </h2>
        <p class="category-description">
          Numeric inputs with support for decimals, integers, and range validation.
        </p>
        <div class="input-grid">
          <div class="input-demo">
            <div class="demo-label">Number Input</div>
            <my-input 
              type="number" 
              label="Price" 
              placeholder="99.99"
              min="0"
              max="9999"
              step="0.01"
              helper-text="Supports decimal values">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Integer Input</div>
            <my-input 
              type="integer" 
              label="Quantity" 
              placeholder="10"
              min="1"
              max="100"
              helper-text="Whole numbers only">
            </my-input>
          </div>
        </div>
      </div>
      
      <!-- Date & Time Inputs -->
      <div class="input-category">
        <h2 class="category-title">
          <my-icon icon="event" color="tertiary"></my-icon>
          Date & Time Inputs
        </h2>
        <p class="category-description">
          Complete date and time input support including specialized date-of-birth handling.
        </p>
        <div class="input-grid">
          <div class="input-demo">
            <div class="demo-label">Date Input</div>
            <my-input 
              type="date" 
              label="Event Date"
              helper-text="Standard date picker">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">DateTime Input</div>
            <my-input 
              type="datetime-local" 
              label="Appointment"
              helper-text="Date and time selection">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Time Input</div>
            <my-input 
              type="time" 
              label="Meeting Time"
              helper-text="Time selection only">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Date of Birth</div>
            <my-input 
              type="date-of-birth" 
              label="Date of Birth"
              helper-text="Specialized DOB input">
            </my-input>
          </div>
        </div>
      </div>
      
      <!-- Contact & Web Inputs -->
      <div class="input-category">
        <h2 class="category-title">
          <my-icon icon="contact_mail" color="primary"></my-icon>
          Contact & Web Inputs
        </h2>
        <p class="category-description">
          Specialized inputs for contact information and web addresses with built-in validation.
        </p>
        <div class="input-grid">
          <div class="input-demo">
            <div class="demo-label">Email Input</div>
            <my-input 
              type="email" 
              label="Email Address" 
              placeholder="user@example.com"
              helper-text="Built-in email validation">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Phone Input</div>
            <my-input 
              type="tel" 
              label="Phone Number" 
              placeholder="+1 (555) 123-4567"
              helper-text="Telephone number format">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">URL Input</div>
            <my-input 
              type="url" 
              label="Website" 
              placeholder="https://example.com"
              helper-text="Valid URL required">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Password Input</div>
            <my-input 
              type="password" 
              label="Password" 
              placeholder="Enter secure password"
              helper-text="Hidden input for security">
            </my-input>
          </div>
        </div>
      </div>
      
      <!-- Advanced Inputs -->
      <div class="input-category">
        <h2 class="category-title">
          <my-icon icon="tune" color="secondary"></my-icon>
          Advanced Input Types
        </h2>
        <p class="category-description">
          Complex input types including search, textarea, select options, and boolean controls.
        </p>
        <div class="input-grid">
          <div class="input-demo">
            <div class="demo-label">Search Input</div>
            <my-input 
              type="search" 
              label="Search" 
              placeholder="Search products..."
              helper-text="Optimized for search queries">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Textarea</div>
            <my-input 
              type="textarea" 
              label="Description" 
              placeholder="Enter detailed description..."
              helper-text="Multi-line text input">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Select Dropdown</div>
            <my-input 
              id="category-select"
              type="select" 
              label="Category">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Dynamic Select</div>
            <my-input 
              type="dynamic-select" 
              label="City" 
              placeholder="Start typing city name..."
              helper-text="Searchable autocomplete select">
            </my-input>
          </div>
        </div>
      </div>
      
      <!-- Boolean Inputs -->
      <div class="input-category">
        <h2 class="category-title">
          <my-icon icon="check_box" color="tertiary"></my-icon>
          Boolean & Choice Inputs
        </h2>
        <p class="category-description">
          Checkbox and radio inputs for boolean values and single/multiple choice scenarios.
        </p>
        <div class="input-grid">
          <div class="input-demo">
            <div class="demo-label">Checkbox Input</div>
            <my-input 
              type="checkbox" 
              label="I agree to the terms and conditions"
              value="false"
              helper-text="Boolean checkbox control">
            </my-input>
          </div>
          <div class="input-demo">
            <div class="demo-label">Radio Input</div>
            <my-input 
              type="radio" 
              label="Subscribe to newsletter"
              name="newsletter"
              value="false"
              helper-text="Single choice radio button">
            </my-input>
          </div>
        </div>
      </div>
    </div>
    
    <script>
      // Set up the select options
      setTimeout(() => {
        const categorySelect = document.getElementById('category-select');
        if (categorySelect) {
          const schema = {
            type: 'select',
            label: 'Category',
            helper_text: 'Choose a category',
            options: [
              { label: 'Select Category', value: '' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Home & Garden', value: 'home' },
              { label: 'Sports & Outdoors', value: 'sports' },
              { label: 'Books', value: 'books' },
              { label: 'Toys & Games', value: 'toys' }
            ]
          };
          categorySelect.setAttribute('schema', JSON.stringify(schema));
        }
      }, 100);
    </script>
  `;

  return container;
};

ComprehensiveInputShowcase.parameters = {
  docs: {
    description: {
      story: 'Complete showcase of all 18 input types supported by MyntUI, demonstrating full compliance with CONTRIBUTING.md requirements, Material Design 3 styling, accessibility features, and framework-agnostic implementation.',
    },
  },
};