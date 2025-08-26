/**
 * MyntUI my-input Component - TailwindCSS Enhanced Version
 * A Material Design 3 input component using TailwindCSS for consistent styling
 * Supports comprehensive input types with enhanced validation and accessibility
 */

import { MyntUIBaseComponent } from '../../core/base-component.js';
import { globalConfig } from '../../config/global-config.js';

class MyInput extends MyntUIBaseComponent {
  constructor() {
    super();
    
    // Component-specific internal state
    this._schema = {};
    this._value = '';
    this._errors = [];
    this._touched = false;
    this._focused = false;
    
    // Component-specific bindings
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    
    // Debounced validation for better performance 
    this._validationTimer = null;
    
    // Initialize with base component pattern
    this.log('Input component initializing...');
    this.parseAttributes();
  }

  // Extended observed attributes (inherits base ones)
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'type', 'label', 'name', 'placeholder', 'value', 'required', 'readonly',
      'min', 'max', 'minlength', 'maxlength', 'pattern', 'step', 'autocomplete',
      'label-position', 'schema', 'aria-label', 'aria-describedby', 'aria-invalid',
      'leading-icon', 'trailing-icon', 'helper-text', 'character-count'
    ];
  }

  // Component-specific attribute handling
  handleAttributeChange(name, oldValue, newValue) {
    super.handleAttributeChange(name, oldValue, newValue);
    
    // Re-parse attributes for complex input components
    this.parseAttributes();
    
    switch (name) {
      case 'disabled':
        this.announceToScreenReader(
          `Input ${this.disabled ? 'disabled' : 'enabled'}`,
          'polite'
        );
        break;
      case 'value':
        this._value = newValue || '';
        this.validateInput();
        break;
      case 'required':
        this.announceToScreenReader(
          `Input is ${newValue !== null ? 'required' : 'optional'}`,
          'polite'
        );
        break;
    }
  }

  // Parse attributes and build schema
  parseAttributes() {
    // Check if full schema is provided as JSON
    const schemaAttr = this.getAttribute('schema');
    if (schemaAttr) {
      try {
        this._schema = JSON.parse(schemaAttr);
      } catch (e) {
        console.warn('Invalid schema JSON in my-input:', e);
        this._schema = {};
      }
    }

    // Get config defaults
    const inputConfig = globalConfig.get('components.input', {});
    
    // Build schema from individual attributes with config defaults
    this._schema = {
      type: this.getAttribute('type') || this._schema.type || 'text',
      label: this.getAttribute('label') || this._schema.label || '',
      name: this.getAttribute('name') || this._schema.name || '',
      placeholder: this.getAttribute('placeholder') || this._schema.placeholder || '',
      value: this.getAttribute('value') || this._schema.value || '',
      labelPosition: this.getAttribute('label-position') || this._schema.labelPosition || inputConfig.labelPosition || 'top',
      variant: this.getAttribute('variant') || this._schema.variant || inputConfig.variant || 'outlined',
      size: this.getAttribute('size') || this._schema.size || inputConfig.size || 'md',
      leadingIcon: this.getAttribute('leading-icon') || this._schema.leadingIcon || this.getAutoIcon(),
      trailingIcon: this.getAttribute('trailing-icon') || this._schema.trailingIcon || '',
      helperText: this.getAttribute('helper-text') || this._schema.helperText || '',
      characterCount: this.hasAttribute('character-count') || this._schema.characterCount || false,
      dense: this.hasAttribute('dense') || this._schema.dense || false,
      comfortable: this.hasAttribute('comfortable') || this._schema.comfortable || false,
      required: this.hasAttribute('required') || this._schema.required || false,
      disabled: this.hasAttribute('disabled') || this._schema.disabled || false,
      readonly: this.hasAttribute('readonly') || this._schema.readonly || false,
      autofocus: this.hasAttribute('autofocus') || this._schema.autofocus || false,
      autocomplete: this.getAttribute('autocomplete') || this._schema.autocomplete || '',
      // Validation attributes
      min: this.getAttribute('min') || this._schema.min || null,
      max: this.getAttribute('max') || this._schema.max || null,
      minLength: this.getAttribute('minlength') || this._schema.minLength || null,
      maxLength: this.getAttribute('maxlength') || this._schema.maxLength || null,
      pattern: this.getAttribute('pattern') || this._schema.pattern || null,
      step: this.getAttribute('step') || this._schema.step || null,
      validation: this._schema.validation || null
    };

    // Set current value
    this._value = this._schema.value;
    
    // Render if connected
    if (this.isConnected) {
      this.render();
    }
  }

  // Get automatic icon based on input type
  getAutoIcon() {
    const inputConfig = globalConfig.get('components.input', {});
    const autoIconMapping = inputConfig.autoIconMapping || {};
    return autoIconMapping[this._schema.type] || '';
  }

  // Generate TailwindCSS classes based on schema using enhanced global config
  getTailwindClasses() {
    const { variant, size, labelPosition } = this._schema;
    const config = globalConfig.get('theme.tailwind', {});
    
    // Use label position config from global config
    const labelPositionConfig = config.labelPositions?.[labelPosition] || config.labelPositions?.top;
    const componentConfig = config.components?.input || {};
    const sizeConfig = config.sizes?.[size] || config.sizes?.md;
    const variantConfig = config.variants?.input?.[variant] || config.variants?.input?.outlined || '';
    const stateConfig = config.states || {};
    
    // Container classes from global config
    let containerClasses = [
      componentConfig.container || 'relative w-full',
      labelPositionConfig.container || ''
    ].filter(Boolean);

    // Input field classes from global config
    let inputClasses = [
      componentConfig.field || 'w-full bg-transparent outline-none',
      sizeConfig.input || 'h-input-md px-md py-sm text-body-medium',
      'placeholder:text-outline/60'
    ].filter(Boolean);

    // Wrapper classes using enhanced global config
    let wrapperClasses = [
      componentConfig.base || 'rounded-lg border font-sans transition-all duration-medium1 ease-standard',
      variantConfig,
      labelPositionConfig.wrapper || 'relative'
    ].filter(Boolean);

    // State classes from enhanced config
    if (stateConfig.base) {
      wrapperClasses.push(stateConfig.base);
    }
    
    if (stateConfig.focusWithin) {
      wrapperClasses.push(stateConfig.focusWithin);
    }
    
    if (stateConfig.hover) {
      wrapperClasses.push(stateConfig.hover);
    }

    // Error state classes from config
    if (this._errors.length > 0) {
      const errorState = stateConfig.error || 'border-error text-error bg-error-light/10';
      wrapperClasses.push(errorState);
      inputClasses.push('text-error');
    }

    // Disabled state classes from config
    if (this._schema.disabled) {
      const disabledState = stateConfig.disabled || 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';
      wrapperClasses.push(disabledState);
      inputClasses.push('cursor-not-allowed');
    }

    // Loading state classes from config
    if (this._schema.loading) {
      const loadingState = stateConfig.loading || 'opacity-75 cursor-wait animate-pulse';
      wrapperClasses.push(loadingState);
    }

    // Label classes from enhanced global config
    let labelClasses = [];
    
    if (labelPosition === 'over' || labelPosition === 'floating') {
      const labelConfig = config.labelPositions?.floating || config.labelPositions?.over;
      labelClasses.push(labelConfig.label || 'absolute left-3 transition-all duration-200 pointer-events-none text-outline');
      
      if (this._focused || this._value) {
        labelClasses.push(labelConfig.labelFloating || labelConfig.labelActive || 'top-0 transform -translate-y-1/2 bg-surface px-1 text-label-small text-primary scale-90');
      } else {
        labelClasses.push(labelConfig.labelResting || 'top-1/2 transform -translate-y-1/2 text-body-medium');
      }
    } else {
      const labelConfig = config.labelPositions?.[labelPosition] || config.labelPositions?.top;
      labelClasses.push(labelConfig.label || 'text-label-medium text-surface-on-surface');
    }

    // Focus state for label from config
    if (this._focused && labelPosition !== 'over' && labelPosition !== 'floating') {
      labelClasses.push('text-primary');
    }

    // Required indicator from config
    if (this._schema.required) {
      labelClasses.push('after:content-["*"]', 'after:text-error', 'after:ml-1');
    }

    return {
      container: containerClasses.join(' '),
      wrapper: wrapperClasses.join(' '),
      input: inputClasses.join(' '),
      label: labelClasses.join(' '),
      helperText: componentConfig.helperText || 'text-label-small text-outline mt-xs',
      errorText: componentConfig.errorText || 'text-label-small text-error mt-xs flex items-center gap-xs',
      addon: componentConfig.addon || 'flex items-center justify-center text-outline'
    };
  }

  // Generate the appropriate input element based on type
  generateInputElement() {
    const { type, name, placeholder, required, disabled, readonly, autofocus, autocomplete, min, max, minLength, maxLength, pattern, step } = this._schema;
    const classes = this.getTailwindClasses();
    
    const commonAttributes = [
      `id="${name}-input"`,
      `name="${name}"`,
      `class="${classes.input}"`,
      `value="${this._value || ''}"`,
      placeholder ? `placeholder="${placeholder}"` : '',
      required ? 'required' : '',
      disabled ? 'disabled' : '',
      readonly ? 'readonly' : '',
      autofocus ? 'autofocus' : '',
      autocomplete ? `autocomplete="${autocomplete}"` : '',
      'aria-describedby="' + [
        this._schema.helperText ? `${name}-helper` : '',
        this._errors.length ? `${name}-error` : '',
        this._schema.characterCount ? `${name}-count` : ''
      ].filter(Boolean).join(' ') + '"',
      this._errors.length ? 'aria-invalid="true"' : 'aria-invalid="false"'
    ].filter(Boolean);

    // Enhanced type handling
    switch (type) {
      case 'textarea':
        return this.generateTextareaElement(commonAttributes);
      case 'select':
        return this.generateSelectElement(commonAttributes);
      case 'dynamic-select':
        return this.generateDynamicSelectElement(commonAttributes);
      case 'multiple':
        return this.generateMultiSelectElement(commonAttributes);
      case 'country':
        return this.generateCountrySelectElement(commonAttributes);
      case 'currency':
        return this.generateCurrencyInputElement(commonAttributes);
      case 'phone':
        return this.generatePhoneInputElement(commonAttributes);
      case 'password':
        return this.generatePasswordInputElement(commonAttributes);
      case 'file':
        return this.generateFileInputElement(commonAttributes);
      case 'image':
        return this.generateImageInputElement(commonAttributes);
      case 'range':
        return this.generateRangeInputElement(commonAttributes);
      case 'color':
        return this.generateColorInputElement(commonAttributes);
      case 'date':
      case 'datetime-local':
      case 'time':
      case 'date-of-birth':
        return this.generateDateTimeInputElement(commonAttributes, type);
      case 'number':
      case 'integer':
        return this.generateNumberInputElement(commonAttributes);
      default:
        return this.generateTextInputElement(commonAttributes, type);
    }
  }

  // Generate standard text input with specialized handling using TailwindCSS
  generateTextInputElement(commonAttributes, type) {
    const { minLength, maxLength, pattern } = this._schema;
    const typeAttributes = [`type="${type}"`];
    
    if (minLength !== null) typeAttributes.push(`minlength="${minLength}"`);
    if (maxLength !== null) typeAttributes.push(`maxlength="${maxLength}"`);
    if (pattern) typeAttributes.push(`pattern="${pattern}"`);

    // Handle search input with clear button
    if (type === 'search') {
      return this.generateSearchInputElement(typeAttributes, commonAttributes);
    }

    // Add type-specific classes using TailwindCSS
    const currentClass = commonAttributes.find(attr => attr.startsWith('class='));
    const classIndex = commonAttributes.indexOf(currentClass);
    if (currentClass && classIndex !== -1) {
      let additionalClasses = '';
      if (type === 'email') additionalClasses = 'lowercase';
      else if (type === 'url') additionalClasses = 'lowercase';
      else if (type === 'tel') additionalClasses = 'font-mono tracking-wide';
      
      if (additionalClasses) {
        commonAttributes[classIndex] = currentClass.replace('"', ` ${additionalClasses}"`);
      }
    }

    return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
  }

  // Generate search input with clear button and debounced search using TailwindCSS
  generateSearchInputElement(typeAttributes, commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.search', {});
    const searchId = `search-${Math.random().toString(36).substr(2, 9)}`;
    
    // Add search-specific styling
    const currentClass = commonAttributes.find(attr => attr.startsWith('class='));
    const classIndex = commonAttributes.indexOf(currentClass);
    if (currentClass && classIndex !== -1) {
      commonAttributes[classIndex] = currentClass.replace('"', ' pl-10 pr-10"');
    }

    return `
      <div class="relative w-full">
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-outline pointer-events-none">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input ${[...typeAttributes, ...commonAttributes, `id="${searchId}"`].join(' ')} 
               oninput="this.parentElement.parentElement.parentElement.host.handleSearchInput(this, '${searchId}', ${typeConfig.debounceDelay || 300})"
               onkeydown="this.parentElement.parentElement.parentElement.host.handleSearchKeydown(event, '${searchId}')" />
        ${typeConfig.showClearButton !== false ? `
          <button type="button" 
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-outline hover:text-primary transition-all duration-short2 rounded-full hover:bg-surface-variant opacity-0 pointer-events-none" 
                  data-clear-btn
                  onclick="this.parentElement.parentElement.parentElement.host.clearSearch('${searchId}')"
                  aria-label="Clear search">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }

  // Generate number input with enhanced controls
  generateNumberInputElement(commonAttributes) {
    const { min, max, step } = this._schema;
    const typeAttributes = [`type="number"`];
    
    if (min !== null) typeAttributes.push(`min="${min}"`);
    if (max !== null) typeAttributes.push(`max="${max}"`);
    if (step !== null) typeAttributes.push(`step="${step}"`);

    return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
  }

  // Generate date/time inputs with enhanced picker
  generateDateTimeInputElement(commonAttributes, type) {
    const { min, max } = this._schema;
    const inputType = type === 'date-of-birth' ? 'date' : type;
    const typeConfig = globalConfig.get(`components.input.typeConfigs.${type}`, {});
    
    const typeAttributes = [`type="${inputType}"`];
    
    if (min !== null) typeAttributes.push(`min="${min}"`);
    if (max !== null) typeAttributes.push(`max="${max}"`);
    if (type === 'date-of-birth' && !max) typeAttributes.push(`max="${new Date().toISOString().split('T')[0]}"`);

    // Add date-specific styling
    const currentClass = commonAttributes.find(attr => attr.startsWith('class='));
    const classIndex = commonAttributes.indexOf(currentClass);
    if (currentClass && classIndex !== -1) {
      commonAttributes[classIndex] = currentClass.replace('"', ' mynt-date-input"');
    }

    // Add enhanced picker attributes based on config
    if (typeConfig.enableNativeInput !== false) {
      return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
    } else {
      // TODO: Implement custom date picker component
      return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
    }
  }

  // Generate enhanced textarea with TailwindCSS only
  generateTextareaElement(commonAttributes) {
    const rows = this._schema.rows || 3;
    const resize = this._schema.resize || 'vertical';
    
    // Add textarea-specific classes using TailwindCSS
    const currentClass = commonAttributes.find(attr => attr.startsWith('class='));
    const classIndex = commonAttributes.indexOf(currentClass);
    if (currentClass && classIndex !== -1) {
      const resizeClass = resize === 'none' ? 'resize-none' : resize === 'horizontal' ? 'resize-x' : resize === 'vertical' ? 'resize-y' : 'resize';
      commonAttributes[classIndex] = currentClass.replace('"', ` ${resizeClass} min-h-20"`);
    }
    
    return `<textarea ${commonAttributes.join(' ')} rows="${rows}"></textarea>`;
  }

  // Generate select element with options
  generateSelectElement(commonAttributes) {
    const options = this._schema.options || [];
    const multiple = this._schema.multiple || false;
    const typeConfig = globalConfig.get('components.input.typeConfigs.select', {});
    
    const selectAttributes = [
      ...commonAttributes,
      multiple ? 'multiple' : ''
    ].filter(Boolean);

    const optionsHtml = options.map(option => {
      const selected = multiple 
        ? (Array.isArray(this._value) ? this._value.includes(option.value) : false)
        : this._value === option.value;
      
      return `<option value="${option.value}" ${selected ? 'selected' : ''}>${option.label}</option>`;
    }).join('');

    return `<select ${selectAttributes.join(' ')}>${optionsHtml}</select>`;
  }

  // Generate dynamic select with search capability
  generateDynamicSelectElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.dynamic-select', {});
    
    // For now, render as a searchable input with datalist
    // TODO: Implement full dynamic select component
    const datalistId = `${this._schema.name}-options`;
    const options = this._schema.options || [];
    
    const datalistHtml = `
      <datalist id="${datalistId}">
        ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
      </datalist>
    `;

    return `
      <input ${[...commonAttributes, `list="${datalistId}"`].join(' ')} />
      ${datalistHtml}
    `;
  }

  // Generate multi-select with chips
  generateMultiSelectElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.multiple', {});
    
    // For now, render as multiple select
    // TODO: Implement chip-based multi-select component
    const options = this._schema.options || [];
    const selectAttributes = [...commonAttributes, 'multiple'];

    const optionsHtml = options.map(option => {
      const selected = Array.isArray(this._value) ? this._value.includes(option.value) : false;
      return `<option value="${option.value}" ${selected ? 'selected' : ''}>${option.label}</option>`;
    }).join('');

    return `<select ${selectAttributes.join(' ')}>${optionsHtml}</select>`;
  }

  // Generate country selector with flags using Intl API
  generateCountrySelectElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.country', {});
    const locale = typeConfig.locale || 'auto';
    const actualLocale = locale === 'auto' ? navigator.language || 'en-US' : locale;
    
    // Get comprehensive country list using Intl.DisplayNames
    const countries = this.getCountriesList(actualLocale, typeConfig);

    const optionsHtml = countries.map(country => {
      const selected = this._value === country.code;
      let displayText = country.name;
      
      if (typeConfig.includeFlag && country.flag) {
        displayText = `${country.flag} ${country.name}`;
      }
      
      if (typeConfig.includePhoneCode && country.phoneCode) {
        displayText += ` (+${country.phoneCode})`;
      }
      
      return `<option value="${country.code}" ${selected ? 'selected' : ''}>${displayText}</option>`;
    }).join('');

    // Add search capability if requested
    if (typeConfig.searchable) {
      const datalistId = `${this._schema.name}-countries`;
      const datalistHtml = `
        <datalist id="${datalistId}">
          ${optionsHtml}
        </datalist>
      `;
      
      return `
        <input ${[...commonAttributes, `list="${datalistId}"`, 'type="text"'].join(' ')} />
        ${datalistHtml}
      `;
    }

    return `<select ${commonAttributes.join(' ')}>${optionsHtml}</select>`;
  }

  // Get countries list using Intl API and comprehensive data
  getCountriesList(locale, config) {
    try {
      const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
      
      // Comprehensive country codes with additional data
      const countryData = {
        'AD': { phoneCode: '376', flag: '🇦🇩' }, 'AE': { phoneCode: '971', flag: '🇦🇪' }, 'AF': { phoneCode: '93', flag: '🇦🇫' },
        'AG': { phoneCode: '1', flag: '🇦🇬' }, 'AI': { phoneCode: '1', flag: '🇦🇮' }, 'AL': { phoneCode: '355', flag: '🇦🇱' },
        'AM': { phoneCode: '374', flag: '🇦🇲' }, 'AO': { phoneCode: '244', flag: '🇦🇴' }, 'AQ': { phoneCode: '672', flag: '🇦🇶' },
        'AR': { phoneCode: '54', flag: '🇦🇷' }, 'AS': { phoneCode: '1', flag: '🇦🇸' }, 'AT': { phoneCode: '43', flag: '🇦🇹' },
        'AU': { phoneCode: '61', flag: '🇦🇺' }, 'AW': { phoneCode: '297', flag: '🇦🇼' }, 'AX': { phoneCode: '358', flag: '🇦🇽' },
        'AZ': { phoneCode: '994', flag: '🇦🇿' }, 'BA': { phoneCode: '387', flag: '🇧🇦' }, 'BB': { phoneCode: '1', flag: '🇧🇧' },
        'BD': { phoneCode: '880', flag: '🇧🇩' }, 'BE': { phoneCode: '32', flag: '🇧🇪' }, 'BF': { phoneCode: '226', flag: '🇧🇫' },
        'BG': { phoneCode: '359', flag: '🇧🇬' }, 'BH': { phoneCode: '973', flag: '🇧🇭' }, 'BI': { phoneCode: '257', flag: '🇧🇮' },
        'BJ': { phoneCode: '229', flag: '🇧🇯' }, 'BL': { phoneCode: '590', flag: '🇧🇱' }, 'BM': { phoneCode: '1', flag: '🇧🇲' },
        'BN': { phoneCode: '673', flag: '🇧🇳' }, 'BO': { phoneCode: '591', flag: '🇧🇴' }, 'BQ': { phoneCode: '599', flag: '🇧🇶' },
        'BR': { phoneCode: '55', flag: '🇧🇷' }, 'BS': { phoneCode: '1', flag: '🇧🇸' }, 'BT': { phoneCode: '975', flag: '🇧🇹' },
        'BV': { phoneCode: '47', flag: '🇧🇻' }, 'BW': { phoneCode: '267', flag: '🇧🇼' }, 'BY': { phoneCode: '375', flag: '🇧🇾' },
        'BZ': { phoneCode: '501', flag: '🇧🇿' }, 'CA': { phoneCode: '1', flag: '🇨🇦' }, 'CC': { phoneCode: '61', flag: '🇨🇨' },
        'CD': { phoneCode: '243', flag: '🇨🇩' }, 'CF': { phoneCode: '236', flag: '🇨🇫' }, 'CG': { phoneCode: '242', flag: '🇨🇬' },
        'CH': { phoneCode: '41', flag: '🇨🇭' }, 'CI': { phoneCode: '225', flag: '🇨🇮' }, 'CK': { phoneCode: '682', flag: '🇨🇰' },
        'CL': { phoneCode: '56', flag: '🇨🇱' }, 'CM': { phoneCode: '237', flag: '🇨🇲' }, 'CN': { phoneCode: '86', flag: '🇨🇳' },
        'CO': { phoneCode: '57', flag: '🇨🇴' }, 'CR': { phoneCode: '506', flag: '🇨🇷' }, 'CU': { phoneCode: '53', flag: '🇨🇺' },
        'CV': { phoneCode: '238', flag: '🇨🇻' }, 'CW': { phoneCode: '599', flag: '🇨🇼' }, 'CX': { phoneCode: '61', flag: '🇨🇽' },
        'CY': { phoneCode: '357', flag: '🇨🇾' }, 'CZ': { phoneCode: '420', flag: '🇨🇿' }, 'DE': { phoneCode: '49', flag: '🇩🇪' },
        'DJ': { phoneCode: '253', flag: '🇩🇯' }, 'DK': { phoneCode: '45', flag: '🇩🇰' }, 'DM': { phoneCode: '1', flag: '🇩🇲' },
        'DO': { phoneCode: '1', flag: '🇩🇴' }, 'DZ': { phoneCode: '213', flag: '🇩🇿' }, 'EC': { phoneCode: '593', flag: '🇪🇨' },
        'EE': { phoneCode: '372', flag: '🇪🇪' }, 'EG': { phoneCode: '20', flag: '🇪🇬' }, 'EH': { phoneCode: '212', flag: '🇪🇭' },
        'ER': { phoneCode: '291', flag: '🇪🇷' }, 'ES': { phoneCode: '34', flag: '🇪🇸' }, 'ET': { phoneCode: '251', flag: '🇪🇹' },
        'FI': { phoneCode: '358', flag: '🇫🇮' }, 'FJ': { phoneCode: '679', flag: '🇫🇯' }, 'FK': { phoneCode: '500', flag: '🇫🇰' },
        'FM': { phoneCode: '691', flag: '🇫🇲' }, 'FO': { phoneCode: '298', flag: '🇫🇴' }, 'FR': { phoneCode: '33', flag: '🇫🇷' },
        'GA': { phoneCode: '241', flag: '🇬🇦' }, 'GB': { phoneCode: '44', flag: '🇬🇧' }, 'GD': { phoneCode: '1', flag: '🇬🇩' },
        'GE': { phoneCode: '995', flag: '🇬🇪' }, 'GF': { phoneCode: '594', flag: '🇬🇫' }, 'GG': { phoneCode: '44', flag: '🇬🇬' },
        'GH': { phoneCode: '233', flag: '🇬🇭' }, 'GI': { phoneCode: '350', flag: '🇬🇮' }, 'GL': { phoneCode: '299', flag: '🇬🇱' },
        'GM': { phoneCode: '220', flag: '🇬🇲' }, 'GN': { phoneCode: '224', flag: '🇬🇳' }, 'GP': { phoneCode: '590', flag: '🇬🇵' },
        'GQ': { phoneCode: '240', flag: '🇬🇶' }, 'GR': { phoneCode: '30', flag: '🇬🇷' }, 'GS': { phoneCode: '500', flag: '🇬🇸' },
        'GT': { phoneCode: '502', flag: '🇬🇹' }, 'GU': { phoneCode: '1', flag: '🇬🇺' }, 'GW': { phoneCode: '245', flag: '🇬🇼' },
        'GY': { phoneCode: '592', flag: '🇬🇾' }, 'HK': { phoneCode: '852', flag: '🇭🇰' }, 'HM': { phoneCode: '672', flag: '🇭🇲' },
        'HN': { phoneCode: '504', flag: '🇭🇳' }, 'HR': { phoneCode: '385', flag: '🇭🇷' }, 'HT': { phoneCode: '509', flag: '🇭🇹' },
        'HU': { phoneCode: '36', flag: '🇭🇺' }, 'ID': { phoneCode: '62', flag: '🇮🇩' }, 'IE': { phoneCode: '353', flag: '🇮🇪' },
        'IL': { phoneCode: '972', flag: '🇮🇱' }, 'IM': { phoneCode: '44', flag: '🇮🇲' }, 'IN': { phoneCode: '91', flag: '🇮🇳' },
        'IO': { phoneCode: '246', flag: '🇮🇴' }, 'IQ': { phoneCode: '964', flag: '🇮🇶' }, 'IR': { phoneCode: '98', flag: '🇮🇷' },
        'IS': { phoneCode: '354', flag: '🇮🇸' }, 'IT': { phoneCode: '39', flag: '🇮🇹' }, 'JE': { phoneCode: '44', flag: '🇯🇪' },
        'JM': { phoneCode: '1', flag: '🇯🇲' }, 'JO': { phoneCode: '962', flag: '🇯🇴' }, 'JP': { phoneCode: '81', flag: '🇯🇵' },
        'KE': { phoneCode: '254', flag: '🇰🇪' }, 'KG': { phoneCode: '996', flag: '🇰🇬' }, 'KH': { phoneCode: '855', flag: '🇰🇭' },
        'KI': { phoneCode: '686', flag: '🇰🇮' }, 'KM': { phoneCode: '269', flag: '🇰🇲' }, 'KN': { phoneCode: '1', flag: '🇰🇳' },
        'KP': { phoneCode: '850', flag: '🇰🇵' }, 'KR': { phoneCode: '82', flag: '🇰🇷' }, 'KW': { phoneCode: '965', flag: '🇰🇼' },
        'KY': { phoneCode: '1', flag: '🇰🇾' }, 'KZ': { phoneCode: '7', flag: '🇰🇿' }, 'LA': { phoneCode: '856', flag: '🇱🇦' },
        'LB': { phoneCode: '961', flag: '🇱🇧' }, 'LC': { phoneCode: '1', flag: '🇱🇨' }, 'LI': { phoneCode: '423', flag: '🇱🇮' },
        'LK': { phoneCode: '94', flag: '🇱🇰' }, 'LR': { phoneCode: '231', flag: '🇱🇷' }, 'LS': { phoneCode: '266', flag: '🇱🇸' },
        'LT': { phoneCode: '370', flag: '🇱🇹' }, 'LU': { phoneCode: '352', flag: '🇱🇺' }, 'LV': { phoneCode: '371', flag: '🇱🇻' },
        'LY': { phoneCode: '218', flag: '🇱🇾' }, 'MA': { phoneCode: '212', flag: '🇲🇦' }, 'MC': { phoneCode: '377', flag: '🇲🇨' },
        'MD': { phoneCode: '373', flag: '🇲🇩' }, 'ME': { phoneCode: '382', flag: '🇲🇪' }, 'MF': { phoneCode: '590', flag: '🇲🇫' },
        'MG': { phoneCode: '261', flag: '🇲🇬' }, 'MH': { phoneCode: '692', flag: '🇲🇭' }, 'MK': { phoneCode: '389', flag: '🇲🇰' },
        'ML': { phoneCode: '223', flag: '🇲🇱' }, 'MM': { phoneCode: '95', flag: '🇲🇲' }, 'MN': { phoneCode: '976', flag: '🇲🇳' },
        'MO': { phoneCode: '853', flag: '🇲🇴' }, 'MP': { phoneCode: '1', flag: '🇲🇵' }, 'MQ': { phoneCode: '596', flag: '🇲🇶' },
        'MR': { phoneCode: '222', flag: '🇲🇷' }, 'MS': { phoneCode: '1', flag: '🇲🇸' }, 'MT': { phoneCode: '356', flag: '🇲🇹' },
        'MU': { phoneCode: '230', flag: '🇲🇺' }, 'MV': { phoneCode: '960', flag: '🇲🇻' }, 'MW': { phoneCode: '265', flag: '🇲🇼' },
        'MX': { phoneCode: '52', flag: '🇲🇽' }, 'MY': { phoneCode: '60', flag: '🇲🇾' }, 'MZ': { phoneCode: '258', flag: '🇲🇿' },
        'NA': { phoneCode: '264', flag: '🇳🇦' }, 'NC': { phoneCode: '687', flag: '🇳🇨' }, 'NE': { phoneCode: '227', flag: '🇳🇪' },
        'NF': { phoneCode: '672', flag: '🇳🇫' }, 'NG': { phoneCode: '234', flag: '🇳🇬' }, 'NI': { phoneCode: '505', flag: '🇳🇮' },
        'NL': { phoneCode: '31', flag: '🇳🇱' }, 'NO': { phoneCode: '47', flag: '🇳🇴' }, 'NP': { phoneCode: '977', flag: '🇳🇵' },
        'NR': { phoneCode: '674', flag: '🇳🇷' }, 'NU': { phoneCode: '683', flag: '🇳🇺' }, 'NZ': { phoneCode: '64', flag: '🇳🇿' },
        'OM': { phoneCode: '968', flag: '🇴🇲' }, 'PA': { phoneCode: '507', flag: '🇵🇦' }, 'PE': { phoneCode: '51', flag: '🇵🇪' },
        'PF': { phoneCode: '689', flag: '🇵🇫' }, 'PG': { phoneCode: '675', flag: '🇵🇬' }, 'PH': { phoneCode: '63', flag: '🇵🇭' },
        'PK': { phoneCode: '92', flag: '🇵🇰' }, 'PL': { phoneCode: '48', flag: '🇵🇱' }, 'PM': { phoneCode: '508', flag: '🇵🇲' },
        'PN': { phoneCode: '64', flag: '🇵🇳' }, 'PR': { phoneCode: '1', flag: '🇵🇷' }, 'PS': { phoneCode: '970', flag: '🇵🇸' },
        'PT': { phoneCode: '351', flag: '🇵🇹' }, 'PW': { phoneCode: '680', flag: '🇵🇼' }, 'PY': { phoneCode: '595', flag: '🇵🇾' },
        'QA': { phoneCode: '974', flag: '🇶🇦' }, 'RE': { phoneCode: '262', flag: '🇷🇪' }, 'RO': { phoneCode: '40', flag: '🇷🇴' },
        'RS': { phoneCode: '381', flag: '🇷🇸' }, 'RU': { phoneCode: '7', flag: '🇷🇺' }, 'RW': { phoneCode: '250', flag: '🇷🇼' },
        'SA': { phoneCode: '966', flag: '🇸🇦' }, 'SB': { phoneCode: '677', flag: '🇸🇧' }, 'SC': { phoneCode: '248', flag: '🇸🇨' },
        'SD': { phoneCode: '249', flag: '🇸🇩' }, 'SE': { phoneCode: '46', flag: '🇸🇪' }, 'SG': { phoneCode: '65', flag: '🇸🇬' },
        'SH': { phoneCode: '290', flag: '🇸🇭' }, 'SI': { phoneCode: '386', flag: '🇸🇮' }, 'SJ': { phoneCode: '47', flag: '🇸🇯' },
        'SK': { phoneCode: '421', flag: '🇸🇰' }, 'SL': { phoneCode: '232', flag: '🇸🇱' }, 'SM': { phoneCode: '378', flag: '🇸🇲' },
        'SN': { phoneCode: '221', flag: '🇸🇳' }, 'SO': { phoneCode: '252', flag: '🇸🇴' }, 'SR': { phoneCode: '597', flag: '🇸🇷' },
        'SS': { phoneCode: '211', flag: '🇸🇸' }, 'ST': { phoneCode: '239', flag: '🇸🇹' }, 'SV': { phoneCode: '503', flag: '🇸🇻' },
        'SX': { phoneCode: '1', flag: '🇸🇽' }, 'SY': { phoneCode: '963', flag: '🇸🇾' }, 'SZ': { phoneCode: '268', flag: '🇸🇿' },
        'TC': { phoneCode: '1', flag: '🇹🇨' }, 'TD': { phoneCode: '235', flag: '🇹🇩' }, 'TF': { phoneCode: '262', flag: '🇹🇫' },
        'TG': { phoneCode: '228', flag: '🇹🇬' }, 'TH': { phoneCode: '66', flag: '🇹🇭' }, 'TJ': { phoneCode: '992', flag: '🇹🇯' },
        'TK': { phoneCode: '690', flag: '🇹🇰' }, 'TL': { phoneCode: '670', flag: '🇹🇱' }, 'TM': { phoneCode: '993', flag: '🇹🇲' },
        'TN': { phoneCode: '216', flag: '🇹🇳' }, 'TO': { phoneCode: '676', flag: '🇹🇴' }, 'TR': { phoneCode: '90', flag: '🇹🇷' },
        'TT': { phoneCode: '1', flag: '🇹🇹' }, 'TV': { phoneCode: '688', flag: '🇹🇻' }, 'TW': { phoneCode: '886', flag: '🇹🇼' },
        'TZ': { phoneCode: '255', flag: '🇹🇿' }, 'UA': { phoneCode: '380', flag: '🇺🇦' }, 'UG': { phoneCode: '256', flag: '🇺🇬' },
        'UM': { phoneCode: '1', flag: '🇺🇲' }, 'US': { phoneCode: '1', flag: '🇺🇸' }, 'UY': { phoneCode: '598', flag: '🇺🇾' },
        'UZ': { phoneCode: '998', flag: '🇺🇿' }, 'VA': { phoneCode: '39', flag: '🇻🇦' }, 'VC': { phoneCode: '1', flag: '🇻🇨' },
        'VE': { phoneCode: '58', flag: '🇻🇪' }, 'VG': { phoneCode: '1', flag: '🇻🇬' }, 'VI': { phoneCode: '1', flag: '🇻🇮' },
        'VN': { phoneCode: '84', flag: '🇻🇳' }, 'VU': { phoneCode: '678', flag: '🇻🇺' }, 'WF': { phoneCode: '681', flag: '🇼🇫' },
        'WS': { phoneCode: '685', flag: '🇼🇸' }, 'YE': { phoneCode: '967', flag: '🇾🇪' }, 'YT': { phoneCode: '262', flag: '🇾🇹' },
        'ZA': { phoneCode: '27', flag: '🇿🇦' }, 'ZM': { phoneCode: '260', flag: '🇿🇲' }, 'ZW': { phoneCode: '263', flag: '🇿🇼' }
      };

      const countries = Object.keys(countryData).map(code => {
        try {
          const name = displayNames.of(code);
          return {
            code,
            name,
            flag: countryData[code].flag,
            phoneCode: countryData[code].phoneCode
          };
        } catch (error) {
          // Fallback for unsupported country codes
          return {
            code,
            name: code,
            flag: countryData[code]?.flag || '',
            phoneCode: countryData[code]?.phoneCode || ''
          };
        }
      }).filter(country => country.name && country.name !== country.code);

      // Sort countries alphabetically by name
      countries.sort((a, b) => a.name.localeCompare(b.name, locale));
      
      return countries;
    } catch (error) {
      console.warn('Failed to generate countries list using Intl API, falling back to basic list:', error);
      
      // Fallback to basic list
      return [
        { code: 'US', name: 'United States', flag: '🇺🇸', phoneCode: '1' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦', phoneCode: '1' },
        { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phoneCode: '44' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪', phoneCode: '49' },
        { code: 'FR', name: 'France', flag: '🇫🇷', phoneCode: '33' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸', phoneCode: '34' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹', phoneCode: '39' },
        { code: 'JP', name: 'Japan', flag: '🇯🇵', phoneCode: '81' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺', phoneCode: '61' },
        { code: 'BR', name: 'Brazil', flag: '🇧🇷', phoneCode: '55' }
      ];
    }
  }

  // Generate currency input with symbol
  generateCurrencyInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.currency', {});
    const precision = typeConfig.precision || 2;
    const step = 1 / Math.pow(10, precision);
    
    const typeAttributes = [
      'type="number"',
      `step="${step}"`,
      typeConfig.allowNegative === false ? 'min="0"' : ''
    ].filter(Boolean);

    return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
  }

  // Generate phone input with country code
  generatePhoneInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.phone', {});
    
    // For now, render as tel input with pattern
    // TODO: Implement full phone input with country code selector
    const typeAttributes = [
      'type="tel"',
      'pattern="[+]?[0-9\\s\\-\\(\\)]{10,}"'
    ];

    return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
  }

  // Generate enhanced password input with visibility toggle and strength indicator
  generatePasswordInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.password', {});
    const typeAttributes = ['type="password"'];
    
    const passwordId = `password-${Math.random().toString(36).substr(2, 9)}`;
    const strengthId = `strength-${passwordId}`;
    
    // Add password-specific classes using TailwindCSS
    const currentClass = commonAttributes.find(attr => attr.startsWith('class='));
    const classIndex = commonAttributes.indexOf(currentClass);
    if (currentClass && classIndex !== -1) {
      commonAttributes[classIndex] = currentClass.replace('"', ' pr-20 font-mono tracking-wider"');
    }

    return `
      <div class="relative w-full">
        <input ${[...typeAttributes, ...commonAttributes, `id="${passwordId}"`].join(' ')} 
               oninput="this.parentElement.parentElement.parentElement.host.updatePasswordStrength(this.value, '${strengthId}')" />
        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          ${typeConfig.toggleVisibility !== false ? `
            <button 
              type="button" 
              class="p-1 rounded-md text-outline hover:text-primary hover:bg-surface-variant transition-all duration-short2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1"
              onclick="this.parentElement.parentElement.host.togglePasswordVisibility(this, '${passwordId}')"
              aria-label="Toggle password visibility"
              tabindex="0"
              data-password-visible="false"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          ` : ''}
        </div>
        ${typeConfig.strengthIndicator !== false ? `
          <div class="mt-2" id="${strengthId}">
            <div class="flex items-center justify-between text-label-small mb-1">
              <span class="text-outline">Password Strength</span>
              <span class="strength-text text-outline">Weak</span>
            </div>
            <div class="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
              <div class="strength-bar h-full bg-error rounded-full transition-all duration-medium1 ease-standard" style="width: 0%"></div>
            </div>
            <div class="mt-1 text-xs text-outline space-y-1 hidden" data-requirements>
              <div class="flex items-center gap-2" data-req="length">
                <span class="w-4 h-4 text-error">✗</span>
                <span>At least 8 characters</span>
              </div>
              <div class="flex items-center gap-2" data-req="uppercase">
                <span class="w-4 h-4 text-error">✗</span>
                <span>One uppercase letter</span>
              </div>
              <div class="flex items-center gap-2" data-req="lowercase">
                <span class="w-4 h-4 text-error">✗</span>
                <span>One lowercase letter</span>
              </div>
              <div class="flex items-center gap-2" data-req="number">
                <span class="w-4 h-4 text-error">✗</span>
                <span>One number</span>
              </div>
              <div class="flex items-center gap-2" data-req="special">
                <span class="w-4 h-4 text-error">✗</span>
                <span>One special character</span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Generate file input with drag and drop
  generateFileInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.file', {});
    const typeAttributes = ['type="file"'];
    
    if (typeConfig.multiple) typeAttributes.push('multiple');
    if (typeConfig.accept && typeConfig.accept !== '*') typeAttributes.push(`accept="${typeConfig.accept}"`);

    // Add file-specific styling
    const currentClass = commonAttributes.find(attr => attr.startsWith('class='));
    const classIndex = commonAttributes.indexOf(currentClass);
    if (currentClass && classIndex !== -1) {
      commonAttributes[classIndex] = currentClass.replace('"', ' mynt-file-input"');
    }

    const fileId = `file-${Math.random().toString(36).substr(2, 9)}`;
    
    if (typeConfig.dragAndDrop) {
      return `
        <div class="relative w-full">
          <input ${[...typeAttributes, ...commonAttributes, `id="${fileId}"`, 'class="sr-only"'].join(' ')} />
          <label 
            for="${fileId}"
            class="flex flex-col items-center justify-center w-full h-32 border-2 border-outline-variant border-dashed rounded-lg cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
              </svg>
              <p class="mb-2 text-sm text-outline">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-outline-variant">Max size: ${typeConfig.maxSize || '10MB'}</p>
            </div>
          </label>
        </div>
      `;
    }

    return `<input ${[...typeAttributes, ...commonAttributes].join(' ')} />`;
  }

  // Generate image input with preview
  generateImageInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.image', {});
    const typeAttributes = ['type="file"'];
    
    if (typeConfig.multiple) typeAttributes.push('multiple');
    typeAttributes.push(`accept="${typeConfig.accept || 'image/*'}"`);

    const imageId = `image-${Math.random().toString(36).substr(2, 9)}`;
    
    return `
      <div class="relative w-full">
        <input ${[...typeAttributes, ...commonAttributes, `id="${imageId}"`, 'class="sr-only"'].join(' ')} />
        <label 
          for="${imageId}"
          class="flex flex-col items-center justify-center w-full h-40 border-2 border-outline-variant border-dashed rounded-lg cursor-pointer bg-surface-container-low hover:bg-surface-container transition-colors"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6 6h.01M6 20h36a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4" />
            </svg>
            <p class="mb-2 text-sm text-outline">
              <span class="font-semibold">Click to upload image</span>
            </p>
            <p class="text-xs text-outline-variant">PNG, JPG, GIF up to ${typeConfig.maxSize || '5MB'}</p>
          </div>
        </label>
        ${typeConfig.showPreview ? `
          <div class="mt-2 preview-container hidden">
            <img class="w-full h-32 object-cover rounded-lg" alt="Preview" />
          </div>
        ` : ''}
      </div>
    `;
  }

  // Generate range input with value display
  generateRangeInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.range', {});
    const { min, max, step } = this._schema;
    const typeAttributes = ['type="range"'];
    
    if (min !== null) typeAttributes.push(`min="${min}"`);
    if (max !== null) typeAttributes.push(`max="${max}"`);
    if (step !== null) typeAttributes.push(`step="${step}"`);

    const rangeId = `range-${Math.random().toString(36).substr(2, 9)}`;
    
    return `
      <div class="relative w-full">
        <input ${[...typeAttributes, ...commonAttributes, `id="${rangeId}"`, 'class="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer slider"'].join(' ')} />
        ${typeConfig.showValue ? `
          <output class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface-variant text-surface-on-surface text-sm px-2 py-1 rounded" for="${rangeId}">
            ${this._value || min || 0}
          </output>
        ` : ''}
        ${typeConfig.showLabels && min !== null && max !== null ? `
          <div class="flex justify-between text-sm text-outline mt-1">
            <span>${min}</span>
            <span>${max}</span>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Generate color input with picker
  generateColorInputElement(commonAttributes) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.color', {});
    const typeAttributes = ['type="color"'];
    
    const colorId = `color-${Math.random().toString(36).substr(2, 9)}`;
    
    return `
      <div class="flex items-center gap-3">
        <input ${[...typeAttributes, ...commonAttributes, `id="${colorId}"`, 'class="w-12 h-8 rounded border-0 cursor-pointer"'].join(' ')} />
        ${typeConfig.showInput ? `
          <input 
            type="text" 
            class="flex-1 px-3 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60" 
            placeholder="#000000"
            pattern="^#[0-9A-Fa-f]{6}$"
            maxlength="7"
            value="${this._value || '#000000'}"
          />
        ` : ''}
      </div>
    `;
  }

  // Enhanced validation with better error messages
  validateInput() {
    const { required, minLength, maxLength, min, max, pattern, validation, type } = this._schema;
    this._errors = [];

    // Skip validation if not touched or empty and not required
    if (!this._touched && !this._value && !required) {
      return true;
    }

    const value = this._value || '';

    // Required validation
    if (required && !value.trim()) {
      this._errors.push(`${this._schema.label || 'Field'} is required`);
    }

    // Type-specific validation
    if (value) {
      switch (type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            this._errors.push('Please enter a valid email address');
          }
          break;
        case 'url':
          try {
            new URL(value);
          } catch {
            this._errors.push('Please enter a valid URL');
          }
          break;
        case 'tel':
        case 'phone':
          if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(value)) {
            this._errors.push('Please enter a valid phone number');
          }
          break;
        case 'number':
        case 'integer':
        case 'currency':
          const num = parseFloat(value);
          if (isNaN(num)) {
            this._errors.push('Please enter a valid number');
          } else {
            if (min !== null && num < parseFloat(min)) {
              this._errors.push(`Value must be at least ${min}`);
            }
            if (max !== null && num > parseFloat(max)) {
              this._errors.push(`Value must be no more than ${max}`);
            }
          }
          break;
        case 'date':
        case 'date-of-birth':
        case 'datetime-local':
          try {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
              this._errors.push('Please enter a valid date');
            } else {
              if (min && date < new Date(min)) {
                this._errors.push('Date is too early');
              }
              if (max && date > new Date(max)) {
                this._errors.push('Date is too late');
              }
              if (type === 'date-of-birth' && date > new Date()) {
                this._errors.push('Birth date cannot be in the future');
              }
            }
          } catch {
            this._errors.push('Please enter a valid date');
          }
          break;
        case 'time':
          if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            this._errors.push('Please enter a valid time (HH:MM)');
          }
          break;
        case 'country':
          // Basic country code validation
          if (!/^[A-Z]{2}$/.test(value)) {
            this._errors.push('Please select a valid country');
          }
          break;
        case 'postal-code':
          // Basic postal code validation (varies by country)
          if (!/^[A-Za-z0-9\s\-]{3,10}$/.test(value)) {
            this._errors.push('Please enter a valid postal code');
          }
          break;
      }

      // Length validation
      if (minLength !== null && value.length < parseInt(minLength)) {
        this._errors.push(`Must be at least ${minLength} characters`);
      }
      if (maxLength !== null && value.length > parseInt(maxLength)) {
        this._errors.push(`Must be no more than ${maxLength} characters`);
      }

      // Pattern validation
      if (pattern && !new RegExp(pattern).test(value)) {
        this._errors.push('Please enter a valid format');
      }

      // Custom validation function
      if (validation && typeof validation === 'function') {
        try {
          if (!validation(value)) {
            this._errors.push('Please enter a valid value');
          }
        } catch (error) {
          console.warn('Custom validation function error:', error);
        }
      }
    }

    // Update DOM if rendered
    if (this.shadowRoot) {
      this.updateValidationUI();
    }

    return this._errors.length === 0;
  }

  // Update validation UI
  updateValidationUI() {
    const errorElement = this.shadowRoot.querySelector('.error-message');
    const wrapper = this.shadowRoot.querySelector('.input-wrapper');
    
    if (errorElement) {
      errorElement.textContent = this._errors.length > 0 ? this._errors[0] : '';
      errorElement.style.display = this._errors.length > 0 ? 'block' : 'none';
    }

    if (wrapper) {
      // Update classes based on error state
      if (this._errors.length > 0) {
        wrapper.className = wrapper.className.replace(/border-\w+/g, '') + ' border-error focus-within:border-error focus-within:ring-error';
      } else {
        wrapper.className = wrapper.className.replace(/border-error|focus-within:border-error|focus-within:ring-error/g, '');
        if (this._schema.variant === 'outlined') {
          wrapper.className += ' border-outline-variant focus-within:border-primary';
        }
      }
    }

    // Update character count if enabled
    if (this._schema.characterCount) {
      const countElement = this.shadowRoot.querySelector('.character-count');
      if (countElement) {
        const current = this._value ? this._value.length : 0;
        const max = this._schema.maxLength;
        countElement.textContent = max ? `${current}/${max}` : current.toString();
        
        // Update color based on threshold
        if (max && current > max * 0.8) {
          countElement.className = countElement.className.replace(/text-\w+/g, '') + ' text-warning';
        } else {
          countElement.className = countElement.className.replace(/text-warning/g, '') + ' text-outline';
        }
      }
    }
  }

  // Event handlers
  handleInput(event) {
    this._value = event.target.value;
    this._touched = true;
    
    // Debounced validation
    clearTimeout(this._validationTimer);
    this._validationTimer = setTimeout(() => {
      this.validateInput();
    }, globalConfig.get('components.input.debounceDelay', 300));

    // Update character count immediately
    if (this._schema.characterCount) {
      this.updateValidationUI();
    }

    // Emit custom input event
    this.dispatchEvent(new CustomEvent('input', {
      detail: {
        value: this._value,
        valid: this._errors.length === 0,
        errors: [...this._errors]
      },
      bubbles: true
    }));
  }

  handleChange(event) {
    this._value = event.target.value;
    this._touched = true;
    this.validateInput();

    // Emit custom change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this._value,
        valid: this._errors.length === 0,
        errors: [...this._errors]
      },
      bubbles: true
    }));
  }

  handleFocus(event) {
    this._focused = true;
    this.render(); // Update floating label position

    // Emit custom focus event
    this.dispatchEvent(new CustomEvent('focus', {
      detail: { value: this._value },
      bubbles: true
    }));
  }

  handleBlur(event) {
    this._focused = false;
    this._touched = true;
    this.validateInput();
    this.render(); // Update floating label position

    // Emit custom blur event
    this.dispatchEvent(new CustomEvent('blur', {
      detail: {
        value: this._value,
        valid: this._errors.length === 0,
        errors: [...this._errors]
      },
      bubbles: true
    }));
  }

  // Public API methods
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val || '';
    this.setAttribute('value', this._value);
    if (this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input, textarea, select');
      if (input) {
        input.value = this._value;
      }
    }
  }

  get valid() {
    return this._errors.length === 0;
  }

  get errors() {
    return [...this._errors];
  }

  validate() {
    this._touched = true;
    return this.validateInput();
  }

  focus() {
    if (this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input, textarea, select');
      if (input) {
        input.focus();
      }
    }
  }

  blur() {
    if (this.shadowRoot) {
      const input = this.shadowRoot.querySelector('input, textarea, select');
      if (input) {
        input.blur();
      }
    }
  }

  // Render method using TailwindCSS
  render() {
    if (!this.shadowRoot) return;

    const { label, labelPosition, name, leadingIcon, trailingIcon, helperText, characterCount } = this._schema;
    const classes = this.getTailwindClasses();
    
    this.shadowRoot.innerHTML = `
      <style>
        @import '/src/styles/tailwind.css';
        
        :host {
          display: block;
          width: 100%;
        }
        
        /* Native HTML5 input enhancements */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="datetime-local"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
        
        /* Remove default number input spinners */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
        
        /* Search input enhancements */
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }
      </style>

      <div class="${classes.container}">
        ${labelPosition !== 'over' && labelPosition !== 'left' ? `
          <label class="${classes.label}" id="${name}-label" for="${name}-input">
            ${label}
          </label>
        ` : ''}
        
        <div class="${labelPosition === 'left' ? 'flex items-center gap-4' : ''}">
          ${labelPosition === 'left' ? `
            <label class="${classes.label}" id="${name}-label" for="${name}-input">
              ${label}
            </label>
          ` : ''}
          
          <div class="${classes.wrapper}">
            ${leadingIcon ? `
              <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 text-outline ml-3">
                ${leadingIcon.includes('<') ? leadingIcon : `<my-icon icon="${leadingIcon}" class="w-5 h-5"></my-icon>`}
              </span>
            ` : ''}
            
            <slot name="prefix" class="flex-shrink-0"></slot>
            
            <div class="relative flex-1">
              ${this.generateInputElement()}
              ${labelPosition === 'over' ? `
                <label class="${classes.label}" id="${name}-label" for="${name}-input">
                  ${label}
                </label>
              ` : ''}
            </div>
            
            <slot name="suffix" class="flex-shrink-0"></slot>
            
            ${trailingIcon ? `
              <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 text-outline mr-3">
                ${trailingIcon.includes('<') ? trailingIcon : `<my-icon icon="${trailingIcon}" class="w-5 h-5"></my-icon>`}
              </span>
            ` : ''}
          </div>
        </div>
        
        <div class="mt-1 flex items-start justify-between gap-2 text-label-small">
          <div class="flex-1">
            ${helperText ? `
              <div class="text-outline" id="${name}-helper" role="note">
                ${helperText}
              </div>
            ` : ''}
            <div class="error-message text-error" id="${name}-error" role="alert" aria-live="assertive" aria-atomic="true" style="display: none;"></div>
          </div>
          
          ${characterCount ? `
            <div class="character-count text-outline flex-shrink-0" id="${name}-count" role="status" aria-live="polite" aria-atomic="true">
              ${this._value ? this._value.length : 0}${this._schema.maxLength ? `/${this._schema.maxLength}` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Attach event listeners
    const input = this.shadowRoot.querySelector('input, textarea, select');
    if (input) {
      input.addEventListener('input', this.handleInput);
      input.addEventListener('change', this.handleChange);
      input.addEventListener('focus', this.handleFocus);
      input.addEventListener('blur', this.handleBlur);
      
      // Set initial value
      if (this._value) {
        input.value = this._value;
      }
    }

    // Update validation UI
    this.updateValidationUI();
  }

  // Helper methods for specialized input types

  // Get currency symbol based on locale and config
  getCurrencySymbol(typeConfig) {
    const locale = typeConfig.locale || 'auto';
    const currency = typeConfig.currency || 'USD';
    const actualLocale = locale === 'auto' ? navigator.language || 'en-US' : locale;
    
    if (typeConfig.symbol && typeConfig.symbol !== 'auto') {
      return typeConfig.symbol;
    }
    
    try {
      const formatter = new Intl.NumberFormat(actualLocale, { 
        style: 'currency', 
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return formatter.formatToParts(0).find(part => part.type === 'currency').value;
    } catch (error) {
      return '$'; // Fallback
    }
  }

  // Get appropriate icon for date/time input types
  getDateTimeIcon(type) {
    switch (type) {
      case 'date':
      case 'date-of-birth':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`;
      case 'time':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>`;
      case 'datetime-local':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`;
      default:
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>`;
    }
  }

  // Password visibility toggle handler
  togglePasswordVisibility(button, passwordId) {
    const input = this.shadowRoot.querySelector(`#${passwordId}`);
    const isVisible = button.dataset.passwordVisible === 'true';
    
    input.type = isVisible ? 'password' : 'text';
    button.dataset.passwordVisible = !isVisible;
    
    // Update icon
    const svg = button.querySelector('svg');
    if (isVisible) {
      svg.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      `;
    } else {
      svg.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
      `;
    }
  }

  // Password strength calculator and UI updater
  updatePasswordStrength(password, strengthId) {
    const strengthContainer = this.shadowRoot.querySelector(`#${strengthId}`);
    if (!strengthContainer) return;

    const strengthBar = strengthContainer.querySelector('.strength-bar');
    const strengthText = strengthContainer.querySelector('.strength-text');
    const requirements = strengthContainer.querySelector('[data-requirements]');
    
    // Calculate strength
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const passedCount = Object.values(checks).filter(Boolean).length;
    const strength = passedCount <= 1 ? 0 : passedCount <= 2 ? 25 : passedCount <= 3 ? 50 : passedCount <= 4 ? 75 : 100;
    
    // Update visual indicators
    strengthBar.style.width = `${strength}%`;
    
    if (strength === 0) {
      strengthBar.className = strengthBar.className.replace(/bg-\w+/g, '') + ' bg-error';
      strengthText.textContent = 'Weak';
      strengthText.className = strengthText.className.replace(/text-\w+/g, '') + ' text-error';
    } else if (strength <= 25) {
      strengthBar.className = strengthBar.className.replace(/bg-\w+/g, '') + ' bg-error';
      strengthText.textContent = 'Weak';
      strengthText.className = strengthText.className.replace(/text-\w+/g, '') + ' text-error';
    } else if (strength <= 50) {
      strengthBar.className = strengthBar.className.replace(/bg-\w+/g, '') + ' bg-warning';
      strengthText.textContent = 'Fair';
      strengthText.className = strengthText.className.replace(/text-\w+/g, '') + ' text-warning';
    } else if (strength <= 75) {
      strengthBar.className = strengthBar.className.replace(/bg-\w+/g, '') + ' bg-info';
      strengthText.textContent = 'Good';
      strengthText.className = strengthText.className.replace(/text-\w+/g, '') + ' text-info';
    } else {
      strengthBar.className = strengthBar.className.replace(/bg-\w+/g, '') + ' bg-success';
      strengthText.textContent = 'Strong';
      strengthText.className = strengthText.className.replace(/text-\w+/g, '') + ' text-success';
    }
    
    // Show/update requirements
    if (password.length > 0) {
      requirements.classList.remove('hidden');
      Object.entries(checks).forEach(([req, passed]) => {
        const reqElement = requirements.querySelector(`[data-req="${req}"]`);
        if (reqElement) {
          const icon = reqElement.querySelector('span:first-child');
          if (passed) {
            icon.textContent = '✓';
            icon.className = icon.className.replace(/text-\w+/g, '') + ' text-success';
          } else {
            icon.textContent = '✗';
            icon.className = icon.className.replace(/text-\w+/g, '') + ' text-error';
          }
        }
      });
    } else {
      requirements.classList.add('hidden');
    }
  }

  // Format currency input with proper decimal places
  formatCurrencyInput(input, precision) {
    let value = input.value;
    if (value && !isNaN(value)) {
      // Format to specified decimal places on blur
      input.addEventListener('blur', () => {
        if (input.value && !isNaN(input.value)) {
          input.value = parseFloat(input.value).toFixed(precision);
        }
      }, { once: true });
    }
  }

  // Format date input display
  formatDateInput(input) {
    if (input.value) {
      const date = new Date(input.value);
      if (!isNaN(date.getTime())) {
        // Emit formatted date event
        this.dispatchEvent(new CustomEvent('dateSelected', {
          detail: {
            value: input.value,
            formatted: date.toLocaleDateString(),
            date: date
          },
          bubbles: true
        }));
      }
    }
  }

  // Search input handlers
  handleSearchInput(input, searchId, debounceDelay) {
    const clearBtn = input.parentElement.querySelector('[data-clear-btn]');
    
    // Show/hide clear button
    if (input.value.length > 0) {
      clearBtn.classList.remove('opacity-0', 'pointer-events-none');
      clearBtn.classList.add('opacity-100');
    } else {
      clearBtn.classList.add('opacity-0', 'pointer-events-none');
      clearBtn.classList.remove('opacity-100');
    }
    
    // Debounced search
    clearTimeout(input.dataset.searchTimer);
    input.dataset.searchTimer = setTimeout(() => {
      this.dispatchEvent(new CustomEvent('search', {
        detail: {
          query: input.value,
          searchId: searchId
        },
        bubbles: true
      }));
    }, debounceDelay);
  }

  handleSearchKeydown(event, searchId) {
    if (event.key === 'Escape') {
      this.clearSearch(searchId);
      event.preventDefault();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent('searchSubmit', {
        detail: {
          query: event.target.value,
          searchId: searchId
        },
        bubbles: true
      }));
    }
  }

  clearSearch(searchId) {
    const input = this.shadowRoot.querySelector(`#${searchId}`);
    const clearBtn = input.parentElement.querySelector('[data-clear-btn]');
    
    input.value = '';
    input.focus();
    clearBtn.classList.add('opacity-0', 'pointer-events-none');
    clearBtn.classList.remove('opacity-100');
    
    this.dispatchEvent(new CustomEvent('searchClear', {
      detail: { searchId: searchId },
      bubbles: true
    }));
  }

  // Multi-select handlers
  showMultiSelectDropdown(multiSelectId) {
    const container = this.shadowRoot.querySelector(`#${multiSelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    dropdown.classList.remove('hidden');
  }

  hideMultiSelectDropdown(multiSelectId) {
    const container = this.shadowRoot.querySelector(`#${multiSelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    dropdown.classList.add('hidden');
  }

  filterMultiSelectOptions(query, multiSelectId) {
    const container = this.shadowRoot.querySelector(`#${multiSelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    const options = dropdown.querySelectorAll('[data-value]');
    
    options.forEach(option => {
      const label = option.dataset.label.toLowerCase();
      const matches = label.includes(query.toLowerCase());
      option.style.display = matches ? 'block' : 'none';
    });
    
    dropdown.classList.remove('hidden');
  }

  toggleMultiSelectOption(value, label, multiSelectId) {
    const currentValues = Array.isArray(this._value) ? [...this._value] : [];
    const index = currentValues.indexOf(value);
    
    if (index === -1) {
      currentValues.push(value);
    } else {
      currentValues.splice(index, 1);
    }
    
    this._value = currentValues;
    this.setAttribute('value', currentValues.join(','));
    
    // Re-render to update chips
    this.render();
  }

  removeChip(value) {
    const currentValues = Array.isArray(this._value) ? [...this._value] : [];
    const index = currentValues.indexOf(value);
    
    if (index !== -1) {
      currentValues.splice(index, 1);
      this._value = currentValues;
      this.setAttribute('value', currentValues.join(','));
      this.render();
    }
  }

  handleMultiSelectKeydown(event, multiSelectId) {
    if (event.key === 'Escape') {
      this.hideMultiSelectDropdown(multiSelectId);
      event.preventDefault();
    }
  }

  // Country selector handlers
  showCountryDropdown(countrySelectId) {
    const container = this.shadowRoot.querySelector(`#${countrySelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    dropdown.classList.remove('hidden');
  }

  hideCountryDropdown(countrySelectId) {
    const container = this.shadowRoot.querySelector(`#${countrySelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    dropdown.classList.add('hidden');
  }

  toggleCountryDropdown(countrySelectId) {
    const container = this.shadowRoot.querySelector(`#${countrySelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    dropdown.classList.toggle('hidden');
  }

  filterCountryOptions(query, countrySelectId) {
    const container = this.shadowRoot.querySelector(`#${countrySelectId}`);
    const dropdown = container.querySelector('[data-dropdown]');
    const options = dropdown.querySelectorAll('[data-value]');
    
    options.forEach(option => {
      const name = option.dataset.name.toLowerCase();
      const matches = name.includes(query.toLowerCase());
      option.style.display = matches ? 'block' : 'none';
    });
    
    dropdown.classList.remove('hidden');
  }

  selectCountry(code, name, flag, phoneCode, countrySelectId) {
    const typeConfig = globalConfig.get('components.input.typeConfigs.country', {});
    const container = this.shadowRoot.querySelector(`#${countrySelectId}`);
    const input = container.querySelector('input[type="text"]');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    
    this._value = code;
    hiddenInput.value = code;
    
    let displayValue = name;
    if (typeConfig.includeFlag !== false) displayValue = `${flag} ${displayValue}`;
    if (typeConfig.includePhoneCode !== false && phoneCode) displayValue += ` (+${phoneCode})`;
    
    input.value = displayValue;
    this.hideCountryDropdown(countrySelectId);
    
    this.dispatchEvent(new CustomEvent('countrySelected', {
      detail: { code, name, flag, phoneCode },
      bubbles: true
    }));
  }

  handleCountryKeydown(event, countrySelectId) {
    if (event.key === 'Escape') {
      this.hideCountryDropdown(countrySelectId);
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      this.showCountryDropdown(countrySelectId);
      event.preventDefault();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up validation timer
    if (this._validationTimer) {
      clearTimeout(this._validationTimer);
    }
  }
}

// Register the component
customElements.define('my-input', MyInput);

export { MyInput };