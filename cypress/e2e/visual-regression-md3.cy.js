/**
 * Comprehensive Visual Regression Test Suite for Material Design 3 Styling
 * Tests visual consistency, animations, state changes, responsive behavior,
 * and design system compliance across all enhanced MyntUI components
 */

describe('MyntUI Material Design 3 - Visual Regression Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(1000) // Allow all animations and components to settle
  })

  describe('Component Visual Consistency', () => {
    it('should capture baseline visual states for all enhanced components', () => {
      cy.document().then((doc) => {
        // Create a comprehensive component showcase
        const showcase = doc.createElement('div')
        showcase.style.cssText = `
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
          font-family: var(--_global-font-family-sans, 'Roboto', sans-serif);
        `
        
        // Input variations
        const inputSection = doc.createElement('div')
        inputSection.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Input Components</h3>'
        
        const inputs = [
          { label: 'Standard Input', type: 'text', value: 'Sample text' },
          { label: 'Email Input', type: 'email', value: 'user@example.com' },
          { label: 'Required Field', type: 'text', required: true, value: '' },
          { label: 'Disabled Input', type: 'text', disabled: true, value: 'Disabled text' },
          { label: 'Floating Label', type: 'text', labelPosition: 'over', value: 'Floating demo' }
        ]
        
        inputs.forEach((config, index) => {
          const input = doc.createElement('my-input')
          input.setAttribute('label', config.label)
          input.setAttribute('type', config.type)
          input.setAttribute('name', `input-${index}`)
          input.setAttribute('value', config.value)
          if (config.required) input.setAttribute('required', '')
          if (config.disabled) input.setAttribute('disabled', '')
          if (config.labelPosition) input.setAttribute('label-position', config.labelPosition)
          inputSection.appendChild(input)
        })
        
        // Checkbox variations
        const checkboxSection = doc.createElement('div')
        checkboxSection.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Checkbox Components</h3>'
        
        const checkboxes = [
          { label: 'Unchecked Checkbox', checked: false },
          { label: 'Checked Checkbox', checked: true },
          { label: 'Indeterminate Checkbox', indeterminate: true },
          { label: 'Disabled Unchecked', disabled: true, checked: false },
          { label: 'Disabled Checked', disabled: true, checked: true }
        ]
        
        checkboxes.forEach((config, index) => {
          const checkbox = doc.createElement('my-checkbox')
          checkbox.setAttribute('label', config.label)
          if (config.checked) checkbox.setAttribute('checked', '')
          if (config.indeterminate) checkbox.setAttribute('indeterminate', '')
          if (config.disabled) checkbox.setAttribute('disabled', '')
          checkboxSection.appendChild(checkbox)
        })
        
        // Toggle variations
        const toggleSection = doc.createElement('div')
        toggleSection.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Toggle Components</h3>'
        
        const toggles = [
          { label: 'Off Toggle', checked: false },
          { label: 'On Toggle', checked: true },
          { label: 'Disabled Off', disabled: true, checked: false },
          { label: 'Disabled On', disabled: true, checked: true }
        ]
        
        toggles.forEach((config, index) => {
          const toggle = doc.createElement('my-toggle')
          toggle.setAttribute('label', config.label)
          if (config.checked) toggle.setAttribute('checked', '')
          if (config.disabled) toggle.setAttribute('disabled', '')
          toggleSection.appendChild(toggle)
        })
        
        // Progress variations
        const progressSection = doc.createElement('div')
        progressSection.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Progress Components</h3>'
        
        const progressBars = [
          { label: 'Primary Progress', value: 65, variant: 'primary' },
          { label: 'Success Progress', value: 85, variant: 'success' },
          { label: 'Warning Progress', value: 45, variant: 'warning' },
          { label: 'Error Progress', value: 25, variant: 'error' },
          { label: 'Indeterminate', indeterminate: true }
        ]
        
        progressBars.forEach((config, index) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('label', config.label)
          if (config.value) progress.setAttribute('value', config.value.toString())
          if (config.variant) progress.setAttribute('variant', config.variant)
          if (config.indeterminate) progress.setAttribute('indeterminate', '')
          progress.setAttribute('show-value', '')
          progressSection.appendChild(progress)
        })
        
        // Gauge variations
        const gaugeSection = doc.createElement('div')
        gaugeSection.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Gauge Components</h3>'
        
        const gaugeContainer = doc.createElement('div')
        gaugeContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 16px;'
        
        const gauges = [
          { label: 'CPU Usage', value: 72, variant: 'primary', unit: '%' },
          { label: 'Memory', value: 45, variant: 'success', unit: 'GB' },
          { label: 'Temperature', value: 89, variant: 'warning', unit: '°C' },
          { label: 'Disk Space', value: 95, variant: 'error', unit: '%' }
        ]
        
        gauges.forEach((config, index) => {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('label', config.label)
          gauge.setAttribute('value', config.value.toString())
          gauge.setAttribute('variant', config.variant)
          gauge.setAttribute('unit', config.unit)
          gauge.setAttribute('show-value', '')
          gaugeContainer.appendChild(gauge)
        })
        gaugeSection.appendChild(gaugeContainer)
        
        showcase.appendChild(inputSection)
        showcase.appendChild(checkboxSection)
        showcase.appendChild(toggleSection)
        showcase.appendChild(progressSection)
        showcase.appendChild(gaugeSection)
        doc.body.appendChild(showcase)
        
        cy.wait(2000) // Allow all components to render and animate
        
        // Capture baseline screenshot
        cy.takeFullPageScreenshot('md3-component-baseline')
      })
    })

    it('should capture hover states for interactive components', () => {
      cy.document().then((doc) => {
        const hoverDemo = doc.createElement('div')
        hoverDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        // Create components for hover testing
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Hover Input')
        input.setAttribute('name', 'hover-input')
        input.setAttribute('value', 'Hover me')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Hover Checkbox')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Hover Toggle')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Hover Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' }
        ]))
        
        hoverDemo.appendChild(input)
        hoverDemo.appendChild(checkbox)
        hoverDemo.appendChild(toggle)
        hoverDemo.appendChild(dropdown)
        doc.body.appendChild(hoverDemo)
        
        cy.wait(1000)
        
        // Trigger hover states
        cy.wrap(input).shadow().find('.input-field').trigger('mouseover')
        cy.wrap(checkbox).shadow().find('.checkbox-container').trigger('mouseover')
        cy.wrap(toggle).shadow().find('.toggle-container').trigger('mouseover')
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').trigger('mouseover')
        
        cy.wait(500) // Allow hover transitions
        
        cy.takeFullPageScreenshot('md3-hover-states')
      })
    })

    it('should capture focus states for accessibility verification', () => {
      cy.document().then((doc) => {
        const focusDemo = doc.createElement('div')
        focusDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Focus Input')
        input.setAttribute('name', 'focus-input')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Focus Checkbox')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Focus Toggle')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Focus Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' }
        ]))
        
        focusDemo.appendChild(input)
        focusDemo.appendChild(checkbox)
        focusDemo.appendChild(toggle)
        focusDemo.appendChild(dropdown)
        doc.body.appendChild(focusDemo)
        
        cy.wait(1000)
        
        // Focus each component
        cy.wrap(input).shadow().find('input').focus()
        cy.wait(300)
        
        cy.wrap(checkbox).shadow().find('.checkbox-container').focus()
        cy.wait(300)
        
        cy.wrap(toggle).shadow().find('.toggle-container').focus()
        cy.wait(300)
        
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').focus()
        cy.wait(300)
        
        cy.takeFullPageScreenshot('md3-focus-states')
      })
    })

    it('should capture error and validation states', () => {
      cy.document().then((doc) => {
        const errorDemo = doc.createElement('div')
        errorDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        // Create inputs with various error states
        const requiredInput = doc.createElement('my-input')
        requiredInput.setAttribute('label', 'Required Field')
        requiredInput.setAttribute('required', '')
        requiredInput.setAttribute('name', 'required-field')
        
        const emailInput = doc.createElement('my-input')
        emailInput.setAttribute('label', 'Email Field')
        emailInput.setAttribute('type', 'email')
        emailInput.setAttribute('name', 'email-field')
        emailInput.setAttribute('value', 'invalid-email')
        
        const lengthInput = doc.createElement('my-input')
        lengthInput.setAttribute('label', 'Length Validation')
        lengthInput.setAttribute('minlength', '5')
        lengthInput.setAttribute('name', 'length-field')
        lengthInput.setAttribute('value', 'abc')
        
        errorDemo.appendChild(requiredInput)
        errorDemo.appendChild(emailInput)
        errorDemo.appendChild(lengthInput)
        doc.body.appendChild(errorDemo)
        
        cy.wait(1000)
        
        // Trigger validation errors
        cy.wrap(requiredInput).shadow().find('input').focus().blur()
        cy.wait(300)
        
        cy.wrap(emailInput).shadow().find('input').focus().blur()
        cy.wait(300)
        
        cy.wrap(lengthInput).shadow().find('input').focus().blur()
        cy.wait(300)
        
        cy.takeFullPageScreenshot('md3-error-states')
      })
    })
  })

  describe('Animation and Transition Testing', () => {
    it('should capture component state transitions', () => {
      cy.document().then((doc) => {
        const transitionDemo = doc.createElement('div')
        transitionDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Animated Checkbox')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Animated Toggle')
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Animated Progress')
        progress.setAttribute('value', '0')
        progress.setAttribute('show-value', '')
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'Animated Gauge')
        gauge.setAttribute('value', '0')
        gauge.setAttribute('animated', '')
        gauge.setAttribute('show-value', '')
        
        transitionDemo.appendChild(checkbox)
        transitionDemo.appendChild(toggle)
        transitionDemo.appendChild(progress)
        transitionDemo.appendChild(gauge)
        doc.body.appendChild(transitionDemo)
        
        cy.wait(1000)
        cy.takeScreenshot('md3-transitions-before')
        
        // Trigger state changes
        cy.wrap(checkbox).shadow().find('.checkbox-container').click()
        cy.wrap(toggle).shadow().find('.toggle-container').click()
        progress.setAttribute('value', '75')
        gauge.setAttribute('value', '85')
        
        cy.wait(1000) // Allow animations to complete
        cy.takeScreenshot('md3-transitions-after')
      })
    })

    it('should capture indeterminate and loading animations', () => {
      cy.document().then((doc) => {
        const animationDemo = doc.createElement('div')
        animationDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const indeterminateCheckbox = doc.createElement('my-checkbox')
        indeterminateCheckbox.setAttribute('label', 'Indeterminate Checkbox')
        indeterminateCheckbox.setAttribute('indeterminate', '')
        
        const indeterminateProgress = doc.createElement('my-progress')
        indeterminateProgress.setAttribute('label', 'Loading Progress')
        indeterminateProgress.setAttribute('indeterminate', '')
        
        const stripedProgress = doc.createElement('my-progress')
        stripedProgress.setAttribute('label', 'Striped Progress')
        stripedProgress.setAttribute('variant', 'striped')
        stripedProgress.setAttribute('value', '60')
        
        const pulseProgress = doc.createElement('my-progress')
        pulseProgress.setAttribute('label', 'Pulse Progress')
        pulseProgress.setAttribute('variant', 'pulse')
        pulseProgress.setAttribute('value', '40')
        
        animationDemo.appendChild(indeterminateCheckbox)
        animationDemo.appendChild(indeterminateProgress)
        animationDemo.appendChild(stripedProgress)
        animationDemo.appendChild(pulseProgress)
        doc.body.appendChild(animationDemo)
        
        cy.wait(2000) // Allow animations to cycle
        cy.takeScreenshot('md3-animations-active')
      })
    })

    it('should capture dropdown menu animations', () => {
      cy.document().then((doc) => {
        const dropdownDemo = doc.createElement('div')
        dropdownDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 150px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const dropdown1 = doc.createElement('my-dropdown')
        dropdown1.setAttribute('trigger-text', 'Menu Animation Demo')
        dropdown1.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'First Option' },
          { value: 'opt2', label: 'Second Option' },
          { value: 'opt3', label: 'Third Option' },
          { value: 'opt4', label: 'Fourth Option' }
        ]))
        
        const dropdown2 = doc.createElement('my-dropdown')
        dropdown2.setAttribute('trigger-text', 'Another Dropdown')
        dropdown2.setAttribute('position', 'top')
        dropdown2.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Top Option 1' },
          { value: 'opt2', label: 'Top Option 2' }
        ]))
        
        dropdownDemo.appendChild(dropdown1)
        dropdownDemo.appendChild(dropdown2)
        doc.body.appendChild(dropdownDemo)
        
        cy.wait(1000)
        
        // Open dropdowns
        cy.wrap(dropdown1).shadow().find('.dropdown-trigger').click()
        cy.wait(300)
        cy.wrap(dropdown2).shadow().find('.dropdown-trigger').click()
        cy.wait(300)
        
        cy.takeScreenshot('md3-dropdown-animations')
      })
    })
  })

  describe('Responsive Design Testing', () => {
    it('should capture mobile viewport layout', () => {
      cy.viewport(375, 667) // iPhone SE
      
      cy.document().then((doc) => {
        const mobileDemo = doc.createElement('div')
        mobileDemo.style.cssText = `
          padding: 16px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const form = doc.createElement('form')
        form.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Mobile Input')
        input.setAttribute('name', 'mobile-input')
        input.setAttribute('value', 'Mobile text')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Mobile Checkbox with longer text that wraps')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Mobile Toggle')
        toggle.setAttribute('checked', '')
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Mobile Progress')
        progress.setAttribute('value', '65')
        progress.setAttribute('show-value', '')
        
        const gaugeContainer = doc.createElement('div')
        gaugeContainer.style.cssText = 'display: flex; justify-content: center;'
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'Mobile Gauge')
        gauge.setAttribute('value', '78')
        gauge.setAttribute('show-value', '')
        gauge.setAttribute('unit', '%')
        
        gaugeContainer.appendChild(gauge)
        
        form.appendChild(input)
        form.appendChild(checkbox)
        form.appendChild(toggle)
        form.appendChild(progress)
        form.appendChild(gaugeContainer)
        mobileDemo.appendChild(form)
        doc.body.appendChild(mobileDemo)
        
        cy.wait(1500)
        cy.takeFullPageScreenshot('md3-mobile-layout')
      })
    })

    it('should capture tablet viewport layout', () => {
      cy.viewport(768, 1024) // iPad
      
      cy.document().then((doc) => {
        const tabletDemo = doc.createElement('div')
        tabletDemo.style.cssText = `
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        // Left column
        const leftColumn = doc.createElement('div')
        leftColumn.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const inputs = [
          { label: 'Tablet Input 1', value: 'First input' },
          { label: 'Tablet Input 2', value: 'Second input' },
          { label: 'Tablet Input 3', value: 'Third input' }
        ]
        
        inputs.forEach((config, index) => {
          const input = doc.createElement('my-input')
          input.setAttribute('label', config.label)
          input.setAttribute('name', `tablet-input-${index}`)
          input.setAttribute('value', config.value)
          leftColumn.appendChild(input)
        })
        
        // Right column
        const rightColumn = doc.createElement('div')
        rightColumn.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const checkbox1 = doc.createElement('my-checkbox')
        checkbox1.setAttribute('label', 'Tablet Checkbox 1')
        checkbox1.setAttribute('checked', '')
        
        const checkbox2 = doc.createElement('my-checkbox')
        checkbox2.setAttribute('label', 'Tablet Checkbox 2')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Tablet Toggle')
        toggle.setAttribute('checked', '')
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Tablet Progress')
        progress.setAttribute('value', '45')
        progress.setAttribute('variant', 'success')
        progress.setAttribute('show-value', '')
        
        rightColumn.appendChild(checkbox1)
        rightColumn.appendChild(checkbox2)
        rightColumn.appendChild(toggle)
        rightColumn.appendChild(progress)
        
        tabletDemo.appendChild(leftColumn)
        tabletDemo.appendChild(rightColumn)
        doc.body.appendChild(tabletDemo)
        
        cy.wait(1500)
        cy.takeFullPageScreenshot('md3-tablet-layout')
      })
    })

    it('should capture desktop viewport layout', () => {
      cy.viewport(1440, 900) // Desktop
      
      cy.document().then((doc) => {
        const desktopDemo = doc.createElement('div')
        desktopDemo.style.cssText = `
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding: 32px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        // Column 1: Inputs
        const inputColumn = doc.createElement('div')
        inputColumn.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Input Components</h3>'
        inputColumn.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const inputConfigs = [
          { label: 'Standard Text', type: 'text', value: 'Sample text' },
          { label: 'Email Address', type: 'email', value: 'user@example.com' },
          { label: 'Password', type: 'password', value: 'password' },
          { label: 'Number Input', type: 'number', value: '42' }
        ]
        
        inputConfigs.forEach((config, index) => {
          const input = doc.createElement('my-input')
          input.setAttribute('label', config.label)
          input.setAttribute('type', config.type)
          input.setAttribute('name', `desktop-input-${index}`)
          input.setAttribute('value', config.value)
          inputColumn.appendChild(input)
        })
        
        // Column 2: Controls
        const controlColumn = doc.createElement('div')
        controlColumn.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Control Components</h3>'
        controlColumn.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const checkbox1 = doc.createElement('my-checkbox')
        checkbox1.setAttribute('label', 'Desktop Checkbox 1')
        checkbox1.setAttribute('checked', '')
        
        const checkbox2 = doc.createElement('my-checkbox')
        checkbox2.setAttribute('label', 'Desktop Checkbox 2')
        
        const toggle1 = doc.createElement('my-toggle')
        toggle1.setAttribute('label', 'Desktop Toggle 1')
        toggle1.setAttribute('checked', '')
        
        const toggle2 = doc.createElement('my-toggle')
        toggle2.setAttribute('label', 'Desktop Toggle 2')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Desktop Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Desktop Option 1' },
          { value: 'opt2', label: 'Desktop Option 2' },
          { value: 'opt3', label: 'Desktop Option 3' }
        ]))
        
        controlColumn.appendChild(checkbox1)
        controlColumn.appendChild(checkbox2)
        controlColumn.appendChild(toggle1)
        controlColumn.appendChild(toggle2)
        controlColumn.appendChild(dropdown)
        
        // Column 3: Progress & Gauges
        const visualColumn = doc.createElement('div')
        visualColumn.innerHTML = '<h3 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a);">Visual Components</h3>'
        visualColumn.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const progress1 = doc.createElement('my-progress')
        progress1.setAttribute('label', 'Primary Progress')
        progress1.setAttribute('value', '75')
        progress1.setAttribute('variant', 'primary')
        progress1.setAttribute('show-value', '')
        
        const progress2 = doc.createElement('my-progress')
        progress2.setAttribute('label', 'Success Progress')
        progress2.setAttribute('value', '90')
        progress2.setAttribute('variant', 'success')
        progress2.setAttribute('show-value', '')
        
        const gaugeContainer = doc.createElement('div')
        gaugeContainer.style.cssText = 'display: flex; justify-content: center; margin-top: 16px;'
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'Performance')
        gauge.setAttribute('value', '82')
        gauge.setAttribute('show-value', '')
        gauge.setAttribute('unit', '%')
        gauge.setAttribute('variant', 'success')
        
        gaugeContainer.appendChild(gauge)
        
        visualColumn.appendChild(progress1)
        visualColumn.appendChild(progress2)
        visualColumn.appendChild(gaugeContainer)
        
        desktopDemo.appendChild(inputColumn)
        desktopDemo.appendChild(controlColumn)
        desktopDemo.appendChild(visualColumn)
        doc.body.appendChild(desktopDemo)
        
        cy.wait(2000)
        cy.takeFullPageScreenshot('md3-desktop-layout')
      })
    })
  })

  describe('Theme and Color Variation Testing', () => {
    it('should capture different color variants', () => {
      cy.document().then((doc) => {
        const colorDemo = doc.createElement('div')
        colorDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
        
        variants.forEach(variant => {
          const section = doc.createElement('div')
          section.innerHTML = `<h4 style="margin-bottom: 12px; color: var(--_global-color-on-surface, #1a1a1a); text-transform: capitalize;">${variant} Variant</h4>`
          section.style.cssText = 'display: flex; align-items: center; gap: 16px; flex-wrap: wrap;'
          
          const progress = doc.createElement('my-progress')
          progress.setAttribute('variant', variant)
          progress.setAttribute('value', '65')
          progress.setAttribute('show-value', '')
          progress.style.width = '200px'
          
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('variant', variant)
          gauge.setAttribute('value', '65')
          gauge.setAttribute('show-value', '')
          gauge.setAttribute('size', 'sm')
          gauge.setAttribute('unit', '%')
          
          section.appendChild(progress)
          section.appendChild(gauge)
          colorDemo.appendChild(section)
        })
        
        doc.body.appendChild(colorDemo)
        
        cy.wait(1500)
        cy.takeFullPageScreenshot('md3-color-variants')
      })
    })

    it('should capture size variations', () => {
      cy.document().then((doc) => {
        const sizeDemo = doc.createElement('div')
        sizeDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding: 24px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const sizes = ['sm', 'md', 'lg']
        
        sizes.forEach(size => {
          const section = doc.createElement('div')
          section.innerHTML = `<h4 style="margin-bottom: 16px; color: var(--_global-color-on-surface, #1a1a1a); text-transform: capitalize;">${size.toUpperCase()} Size</h4>`
          section.style.cssText = 'display: flex; align-items: center; gap: 24px; flex-wrap: wrap;'
          
          const checkbox = doc.createElement('my-checkbox')
          checkbox.setAttribute('label', `${size.toUpperCase()} Checkbox`)
          checkbox.setAttribute('size', size)
          checkbox.setAttribute('checked', '')
          
          const toggle = doc.createElement('my-toggle')
          toggle.setAttribute('label', `${size.toUpperCase()} Toggle`)
          toggle.setAttribute('size', size)
          toggle.setAttribute('checked', '')
          
          const progress = doc.createElement('my-progress')
          progress.setAttribute('label', `${size.toUpperCase()} Progress`)
          progress.setAttribute('size', size)
          progress.setAttribute('value', '60')
          progress.setAttribute('show-value', '')
          progress.style.width = '200px'
          
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('label', `${size.toUpperCase()} Gauge`)
          gauge.setAttribute('size', size)
          gauge.setAttribute('value', '75')
          gauge.setAttribute('show-value', '')
          gauge.setAttribute('unit', '%')
          
          section.appendChild(checkbox)
          section.appendChild(toggle)
          section.appendChild(progress)
          section.appendChild(gauge)
          sizeDemo.appendChild(section)
        })
        
        doc.body.appendChild(sizeDemo)
        
        cy.wait(1500)
        cy.takeFullPageScreenshot('md3-size-variants')
      })
    })
  })

  describe('Dark Mode and High Contrast Testing', () => {
    it('should capture components in dark mode simulation', () => {
      cy.document().then((doc) => {
        // Simulate dark mode by adding dark theme styles
        const darkModeStyles = doc.createElement('style')
        darkModeStyles.textContent = `
          :root {
            --_global-color-surface: #121212;
            --_global-color-surface-container: #1e1e1e;
            --_global-color-surface-container-low: #1a1a1a;
            --_global-color-surface-container-high: #2a2a2a;
            --_global-color-surface-container-highest: #353535;
            --_global-color-on-surface: #e1e1e1;
            --_global-color-on-surface-variant: #c4c4c4;
            --_global-color-outline: #737373;
            --_global-color-outline-variant: #404040;
            --_global-color-primary: #bb86fc;
            --_global-color-on-primary: #000000;
            --_global-color-primary-container: #3f2e7a;
            --_global-color-on-primary-container: #d7c4ff;
          }
          
          body {
            background-color: var(--_global-color-surface) !important;
            color: var(--_global-color-on-surface) !important;
          }
        `
        doc.head.appendChild(darkModeStyles)
        
        const darkModeDemo = doc.createElement('div')
        darkModeDemo.style.cssText = `
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          padding: 24px;
          background: var(--_global-color-surface);
          min-height: 100vh;
        `
        
        // Create components for dark mode testing
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Dark Mode Input')
        input.setAttribute('name', 'dark-input')
        input.setAttribute('value', 'Dark theme text')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Dark Mode Checkbox')
        checkbox.setAttribute('checked', '')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Dark Mode Toggle')
        toggle.setAttribute('checked', '')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Dark Mode Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'dark1', label: 'Dark Option 1' },
          { value: 'dark2', label: 'Dark Option 2' }
        ]))
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Dark Mode Progress')
        progress.setAttribute('value', '70')
        progress.setAttribute('show-value', '')
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'Dark Gauge')
        gauge.setAttribute('value', '85')
        gauge.setAttribute('show-value', '')
        gauge.setAttribute('unit', '%')
        
        darkModeDemo.appendChild(input)
        darkModeDemo.appendChild(checkbox)
        darkModeDemo.appendChild(toggle)
        darkModeDemo.appendChild(dropdown)
        darkModeDemo.appendChild(progress)
        darkModeDemo.appendChild(gauge)
        doc.body.appendChild(darkModeDemo)
        
        cy.wait(1500)
        cy.takeFullPageScreenshot('md3-dark-mode')
      })
    })

    it('should capture high contrast mode simulation', () => {
      cy.document().then((doc) => {
        // Simulate high contrast mode
        const highContrastStyles = doc.createElement('style')
        highContrastStyles.textContent = `
          :root {
            --_global-color-surface: #ffffff;
            --_global-color-on-surface: #000000;
            --_global-color-primary: #0000ff;
            --_global-color-on-primary: #ffffff;
            --_global-color-outline: #000000;
            --_global-color-outline-variant: #000000;
            --_global-color-surface-container: #ffffff;
            --_global-color-surface-container-low: #f8f8f8;
            --_global-color-surface-container-high: #f0f0f0;
            --_global-color-error: #ff0000;
            --_global-color-success: #008000;
            --_global-color-warning: #ff8000;
          }
          
          * {
            border-color: #000000 !important;
          }
          
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
        `
        doc.head.appendChild(highContrastStyles)
        
        const highContrastDemo = doc.createElement('div')
        highContrastDemo.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: #ffffff;
          border: 2px solid #000000;
        `
        
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'High Contrast Input')
        input.setAttribute('name', 'hc-input')
        input.setAttribute('value', 'High contrast text')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'High Contrast Checkbox')
        checkbox.setAttribute('checked', '')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'High Contrast Toggle')
        toggle.setAttribute('checked', '')
        
        const errorInput = doc.createElement('my-input')
        errorInput.setAttribute('label', 'Error State')
        errorInput.setAttribute('required', '')
        errorInput.setAttribute('name', 'error-input')
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'High Contrast Progress')
        progress.setAttribute('value', '60')
        progress.setAttribute('variant', 'error')
        progress.setAttribute('show-value', '')
        
        highContrastDemo.appendChild(input)
        highContrastDemo.appendChild(checkbox)
        highContrastDemo.appendChild(toggle)
        highContrastDemo.appendChild(errorInput)
        highContrastDemo.appendChild(progress)
        doc.body.appendChild(highContrastDemo)
        
        // Trigger error state
        cy.wrap(errorInput).shadow().find('input').focus().blur()
        cy.wait(500)
        
        cy.takeFullPageScreenshot('md3-high-contrast')
      })
    })
  })

  describe('Real-World Usage Scenarios', () => {
    it('should capture a complete form layout', () => {
      cy.document().then((doc) => {
        const formDemo = doc.createElement('div')
        formDemo.style.cssText = `
          max-width: 800px;
          margin: 0 auto;
          padding: 32px;
          background: var(--_global-color-surface, #f5f5f5);
        `
        
        const formTitle = doc.createElement('h2')
        formTitle.textContent = 'User Registration Form'
        formTitle.style.cssText = `
          color: var(--_global-color-on-surface, #1a1a1a);
          margin-bottom: 24px;
          font-size: 24px;
          font-weight: 600;
        `
        
        const form = doc.createElement('form')
        form.style.cssText = 'display: flex; flex-direction: column; gap: 20px;'
        
        // Personal Information Section
        const personalSection = doc.createElement('fieldset')
        personalSection.style.cssText = `
          border: 1px solid var(--_global-color-outline-variant, #ccc);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        `
        personalSection.innerHTML = '<legend style="padding: 0 8px; color: var(--_global-color-on-surface, #1a1a1a); font-weight: 500;">Personal Information</legend>'
        
        const nameRow = doc.createElement('div')
        nameRow.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 16px;'
        
        const firstName = doc.createElement('my-input')
        firstName.setAttribute('label', 'First Name')
        firstName.setAttribute('name', 'firstName')
        firstName.setAttribute('required', '')
        firstName.setAttribute('value', 'John')
        
        const lastName = doc.createElement('my-input')
        lastName.setAttribute('label', 'Last Name')
        lastName.setAttribute('name', 'lastName')
        lastName.setAttribute('required', '')
        lastName.setAttribute('value', 'Doe')
        
        nameRow.appendChild(firstName)
        nameRow.appendChild(lastName)
        
        const email = doc.createElement('my-input')
        email.setAttribute('label', 'Email Address')
        email.setAttribute('type', 'email')
        email.setAttribute('name', 'email')
        email.setAttribute('required', '')
        email.setAttribute('value', 'john.doe@example.com')
        
        const phone = doc.createElement('my-input')
        phone.setAttribute('label', 'Phone Number')
        phone.setAttribute('type', 'tel')
        phone.setAttribute('name', 'phone')
        phone.setAttribute('value', '+1 (555) 123-4567')
        
        personalSection.appendChild(nameRow)
        personalSection.appendChild(email)
        personalSection.appendChild(phone)
        
        // Preferences Section
        const preferencesSection = doc.createElement('fieldset')
        preferencesSection.style.cssText = `
          border: 1px solid var(--_global-color-outline-variant, #ccc);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        `
        preferencesSection.innerHTML = '<legend style="padding: 0 8px; color: var(--_global-color-on-surface, #1a1a1a); font-weight: 500;">Preferences</legend>'
        
        const newsletter = doc.createElement('my-checkbox')
        newsletter.setAttribute('label', 'Subscribe to newsletter')
        newsletter.setAttribute('checked', '')
        
        const notifications = doc.createElement('my-toggle')
        notifications.setAttribute('label', 'Enable push notifications')
        notifications.setAttribute('checked', '')
        
        const darkMode = doc.createElement('my-toggle')
        darkMode.setAttribute('label', 'Use dark mode')
        
        const language = doc.createElement('my-dropdown')
        language.setAttribute('trigger-text', 'Select Language')
        language.setAttribute('options', JSON.stringify([
          { value: 'en', label: 'English' },
          { value: 'es', label: 'Spanish' },
          { value: 'fr', label: 'French' },
          { value: 'de', label: 'German' }
        ]))
        
        preferencesSection.appendChild(newsletter)
        preferencesSection.appendChild(notifications)
        preferencesSection.appendChild(darkMode)
        preferencesSection.appendChild(language)
        
        // Terms and Submit
        const termsSection = doc.createElement('div')
        termsSection.style.cssText = 'margin-top: 20px;'
        
        const terms = doc.createElement('my-checkbox')
        terms.setAttribute('label', 'I agree to the Terms of Service and Privacy Policy')
        terms.setAttribute('required', '')
        
        const marketing = doc.createElement('my-checkbox')
        marketing.setAttribute('label', 'I agree to receive marketing communications')
        
        termsSection.appendChild(terms)
        termsSection.appendChild(marketing)
        
        form.appendChild(personalSection)
        form.appendChild(preferencesSection)
        form.appendChild(termsSection)
        
        formDemo.appendChild(formTitle)
        formDemo.appendChild(form)
        doc.body.appendChild(formDemo)
        
        cy.wait(1500)
        cy.takeFullPageScreenshot('md3-complete-form')
      })
    })

    it('should capture a dashboard layout with all components', () => {
      cy.document().then((doc) => {
        const dashboard = doc.createElement('div')
        dashboard.style.cssText = `
          display: grid;
          grid-template-areas: 
            "header header header"
            "sidebar main widgets"
            "sidebar main widgets";
          grid-template-columns: 250px 1fr 300px;
          grid-template-rows: 60px 1fr 1fr;
          gap: 16px;
          padding: 16px;
          background: var(--_global-color-surface, #f5f5f5);
          min-height: 100vh;
          font-family: var(--_global-font-family-sans, 'Roboto', sans-serif);
        `
        
        // Header
        const header = doc.createElement('div')
        header.style.cssText = `
          grid-area: header;
          background: var(--_global-color-surface-container, #ffffff);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `
        header.innerHTML = `
          <h1 style="margin: 0; color: var(--_global-color-on-surface, #1a1a1a); font-size: 20px;">Dashboard</h1>
          <div style="display: flex; align-items: center; gap: 16px;">
            <my-toggle label="Dark Mode" size="sm"></my-toggle>
            <my-dropdown trigger-text="User Menu" options='[{"value":"profile","label":"Profile"},{"value":"settings","label":"Settings"},{"value":"logout","label":"Logout"}]'></my-dropdown>
          </div>
        `
        
        // Sidebar
        const sidebar = doc.createElement('div')
        sidebar.style.cssText = `
          grid-area: sidebar;
          background: var(--_global-color-surface-container, #ffffff);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `
        sidebar.innerHTML = '<h3 style="margin-top: 0; color: var(--_global-color-on-surface, #1a1a1a);">Settings</h3>'
        
        const sidebarSettings = [
          { label: 'Auto-save', checked: true },
          { label: 'Show tooltips', checked: true },
          { label: 'Enable sounds', checked: false },
          { label: 'High contrast', checked: false }
        ]
        
        sidebarSettings.forEach(setting => {
          const toggle = doc.createElement('my-toggle')
          toggle.setAttribute('label', setting.label)
          toggle.setAttribute('size', 'sm')
          if (setting.checked) toggle.setAttribute('checked', '')
          toggle.style.cssText = 'margin-bottom: 12px;'
          sidebar.appendChild(toggle)
        })
        
        // Main content
        const main = doc.createElement('div')
        main.style.cssText = `
          grid-area: main;
          background: var(--_global-color-surface-container, #ffffff);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `
        main.innerHTML = '<h3 style="margin-top: 0; color: var(--_global-color-on-surface, #1a1a1a);">System Status</h3>'
        
        const progressSection = doc.createElement('div')
        progressSection.style.cssText = 'display: flex; flex-direction: column; gap: 16px;'
        
        const systemMetrics = [
          { label: 'CPU Usage', value: 45, variant: 'success' },
          { label: 'Memory Usage', value: 72, variant: 'warning' },
          { label: 'Disk Usage', value: 89, variant: 'error' },
          { label: 'Network I/O', value: 34, variant: 'info' }
        ]
        
        systemMetrics.forEach(metric => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('label', metric.label)
          progress.setAttribute('value', metric.value.toString())
          progress.setAttribute('variant', metric.variant)
          progress.setAttribute('show-value', '')
          progressSection.appendChild(progress)
        })
        
        main.appendChild(progressSection)
        
        // Widgets
        const widgets = doc.createElement('div')
        widgets.style.cssText = `
          grid-area: widgets;
          display: flex;
          flex-direction: column;
          gap: 16px;
        `
        
        // Performance widget
        const perfWidget = doc.createElement('div')
        perfWidget.style.cssText = `
          background: var(--_global-color-surface-container, #ffffff);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        `
        perfWidget.innerHTML = '<h4 style="margin-top: 0; color: var(--_global-color-on-surface, #1a1a1a);">Performance</h4>'
        
        const perfGauge = doc.createElement('my-gauge')
        perfGauge.setAttribute('label', 'Overall')
        perfGauge.setAttribute('value', '78')
        perfGauge.setAttribute('variant', 'success')
        perfGauge.setAttribute('show-value', '')
        perfGauge.setAttribute('unit', '%')
        perfGauge.setAttribute('size', 'sm')
        
        perfWidget.appendChild(perfGauge)
        
        // Quick actions widget
        const actionsWidget = doc.createElement('div')
        actionsWidget.style.cssText = `
          background: var(--_global-color-surface-container, #ffffff);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `
        actionsWidget.innerHTML = '<h4 style="margin-top: 0; color: var(--_global-color-on-surface, #1a1a1a);">Quick Actions</h4>'
        
        const actions = [
          { label: 'Backup data', checked: false },
          { label: 'Clear cache', checked: false },
          { label: 'Update system', checked: true }
        ]
        
        actions.forEach(action => {
          const checkbox = doc.createElement('my-checkbox')
          checkbox.setAttribute('label', action.label)
          if (action.checked) checkbox.setAttribute('checked', '')
          checkbox.style.cssText = 'margin-bottom: 8px;'
          actionsWidget.appendChild(checkbox)
        })
        
        widgets.appendChild(perfWidget)
        widgets.appendChild(actionsWidget)
        
        dashboard.appendChild(header)
        dashboard.appendChild(sidebar)
        dashboard.appendChild(main)
        dashboard.appendChild(widgets)
        doc.body.appendChild(dashboard)
        
        cy.wait(2000)
        cy.takeFullPageScreenshot('md3-dashboard-layout')
      })
    })
  })
})