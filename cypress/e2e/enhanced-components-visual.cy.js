/**
 * Enhanced Components Visual Regression Test
 * Comprehensive visual testing for the enhanced Progress and Gauge components
 * with BaseComponent architecture improvements
 */

describe('Enhanced Components Visual Testing', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(1000) // Allow components to fully initialize
  })

  describe('Enhanced Progress Component Visuals', () => {
    it('should capture progress variants for visual analysis', () => {
      cy.document().then((doc) => {
        // Create test container
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background); display: grid; gap: 2rem;'
        
        // Test different variants
        const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
        const section1 = doc.createElement('div')
        section1.innerHTML = '<h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Progress Variants</h3>'
        const grid1 = doc.createElement('div')
        grid1.style.cssText = 'display: grid; gap: 1rem;'
        
        variants.forEach((variant, index) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('label', `${variant} Progress`)
          progress.setAttribute('value', (index + 1) * 15)
          progress.setAttribute('variant', variant)
          progress.setAttribute('show-value', '')
          grid1.appendChild(progress)
        })
        section1.appendChild(grid1)
        container.appendChild(section1)

        // Test size variants  
        const section2 = doc.createElement('div')
        section2.innerHTML = '<h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>'
        const grid2 = doc.createElement('div')
        grid2.style.cssText = 'display: grid; gap: 1rem;'
        
        const sizes = ['sm', 'md', 'lg']
        sizes.forEach((size, index) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('label', `${size.toUpperCase()} Progress`)
          progress.setAttribute('value', 40 + index * 20)
          progress.setAttribute('size', size)
          progress.setAttribute('show-value', '')
          grid2.appendChild(progress)
        })
        section2.appendChild(grid2)
        container.appendChild(section2)

        // Test special states
        const section3 = doc.createElement('div')
        section3.innerHTML = '<h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Special States</h3>'
        const grid3 = doc.createElement('div')
        grid3.style.cssText = 'display: grid; gap: 1rem;'
        
        // Indeterminate
        const indeterminate = doc.createElement('my-progress')
        indeterminate.setAttribute('label', 'Loading...')
        indeterminate.setAttribute('indeterminate', '')
        grid3.appendChild(indeterminate)
        
        // Striped
        const striped = doc.createElement('my-progress')
        striped.setAttribute('label', 'Striped Progress')
        striped.setAttribute('value', '70')
        striped.setAttribute('variant', 'striped')
        striped.setAttribute('show-value', '')
        grid3.appendChild(striped)
        
        // With buffer
        const buffer = doc.createElement('my-progress')
        buffer.setAttribute('label', 'Buffered Progress')
        buffer.setAttribute('value', '30')
        buffer.setAttribute('buffer-value', '60')
        buffer.setAttribute('show-value', '')
        grid3.appendChild(buffer)
        
        section3.appendChild(grid3)
        container.appendChild(section3)

        // Test circular progress
        const section4 = doc.createElement('div')
        section4.innerHTML = '<h3 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary);">Circular Progress</h3>'
        const grid4 = doc.createElement('div')
        grid4.style.cssText = 'display: flex; gap: 2rem; justify-content: center;'
        
        const circularSizes = ['sm', 'md', 'lg']
        circularSizes.forEach((size, index) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('type', 'circular')
          progress.setAttribute('label', `${size.toUpperCase()}`)
          progress.setAttribute('value', 25 + index * 25)
          progress.setAttribute('size', size)
          progress.setAttribute('show-value', '')
          grid4.appendChild(progress)
        })
        
        // Add indeterminate circular
        const indeterminateCircular = doc.createElement('my-progress')
        indeterminateCircular.setAttribute('type', 'circular')
        indeterminateCircular.setAttribute('label', 'Loading')
        indeterminateCircular.setAttribute('indeterminate', '')
        grid4.appendChild(indeterminateCircular)
        
        section4.appendChild(grid4)
        container.appendChild(section4)

        doc.body.appendChild(container)
        
        // Wait for components to render and take screenshot
        cy.wait(1000)
        cy.screenshot('enhanced-progress-components', { 
          capture: 'fullPage',
          overwrite: true 
        })
      })
    })

    it('should test progress interaction and states', () => {
      cy.document().then((doc) => {
        // Create interactive test
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background); display: flex; flex-direction: column; gap: 2rem; align-items: center;'
        
        const title = doc.createElement('h3')
        title.textContent = 'Interactive Progress Test'
        title.style.cssText = 'margin: 0; color: var(--_global-color-text-primary);'
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Interactive Progress')
        progress.setAttribute('value', '0')
        progress.setAttribute('show-value', '')
        progress.setAttribute('tooltip', 'Click to interact')
        
        container.appendChild(title)
        container.appendChild(progress)
        doc.body.appendChild(container)
        
        // Test click interaction
        cy.wait(500)
        cy.get('my-progress').first().shadow().find('.progress-track').click('center')
        cy.wait(200)
        cy.screenshot('progress-interaction-center-click', { overwrite: true })
        
        // Test right click
        cy.get('my-progress').first().shadow().find('.progress-track').click('right')
        cy.wait(200)
        cy.screenshot('progress-interaction-right-click', { overwrite: true })
      })
    })
  })

  describe('Enhanced Gauge Component Visuals', () => {
    it('should capture gauge variants for visual analysis', () => {
      cy.document().then((doc) => {
        // Create test container
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background); display: grid; gap: 3rem;'
        
        // Test basic variants
        const section1 = doc.createElement('div')
        section1.innerHTML = '<h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Gauge Variants</h3>'
        const grid1 = doc.createElement('div')
        grid1.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;'
        
        const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
        variants.forEach((variant, index) => {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('label', variant.charAt(0).toUpperCase() + variant.slice(1))
          gauge.setAttribute('value', 20 + index * 12)
          gauge.setAttribute('variant', variant)
          gauge.setAttribute('unit', '%')
          gauge.setAttribute('show-value', '')
          grid1.appendChild(gauge)
        })
        section1.appendChild(grid1)
        container.appendChild(section1)

        // Test size variants
        const section2 = doc.createElement('div')
        section2.innerHTML = '<h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Size Variants</h3>'
        const grid2 = doc.createElement('div')
        grid2.style.cssText = 'display: flex; gap: 2rem; justify-content: center; align-items: center;'
        
        const sizes = ['sm', 'md', 'lg']
        sizes.forEach((size, index) => {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('label', `${size.toUpperCase()}`)
          gauge.setAttribute('value', 45 + index * 15)
          gauge.setAttribute('size', size)
          gauge.setAttribute('unit', '%')
          gauge.setAttribute('show-value', '')
          grid2.appendChild(gauge)
        })
        section2.appendChild(grid2)
        container.appendChild(section2)

        // Test advanced features
        const section3 = doc.createElement('div')
        section3.innerHTML = '<h3 style="margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary);">Advanced Features</h3>'
        const grid3 = doc.createElement('div')
        grid3.style.cssText = 'display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;'
        
        // Gauge with thresholds
        const thresholdGauge = doc.createElement('my-gauge')
        thresholdGauge.setAttribute('label', 'With Thresholds')
        thresholdGauge.setAttribute('value', '85')
        thresholdGauge.setAttribute('unit', '%')
        thresholdGauge.setAttribute('show-value', '')
        thresholdGauge.setAttribute('thresholds', JSON.stringify([
          { min: 0, max: 50, color: 'var(--_global-color-success)', label: 'Good' },
          { min: 50, max: 80, color: 'var(--_global-color-warning)', label: 'Warning' },
          { min: 80, max: 100, color: 'var(--_global-color-error)', label: 'Critical' }
        ]))
        grid3.appendChild(thresholdGauge)
        
        // Gauge with gradient
        const gradientGauge = doc.createElement('my-gauge')
        gradientGauge.setAttribute('label', 'Gradient')
        gradientGauge.setAttribute('value', '72')
        gradientGauge.setAttribute('unit', '%')
        gradientGauge.setAttribute('show-value', '')
        gradientGauge.setAttribute('gradient', '')
        grid3.appendChild(gradientGauge)
        
        // Custom range gauge
        const customRangeGauge = doc.createElement('my-gauge')
        customRangeGauge.setAttribute('label', 'Custom Range')
        customRangeGauge.setAttribute('value', '150')
        customRangeGauge.setAttribute('min', '100')
        customRangeGauge.setAttribute('max', '200')
        customRangeGauge.setAttribute('unit', ' RPM')
        customRangeGauge.setAttribute('show-value', '')
        grid3.appendChild(customRangeGauge)
        
        section3.appendChild(grid3)
        container.appendChild(section3)

        doc.body.appendChild(container)
        
        // Wait for components to render and take screenshot
        cy.wait(1000)
        cy.screenshot('enhanced-gauge-components', { 
          capture: 'fullPage',
          overwrite: true 
        })
      })
    })

    it('should test gauge keyboard interaction', () => {
      cy.document().then((doc) => {
        // Create interactive test
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background); display: flex; flex-direction: column; gap: 2rem; align-items: center;'
        
        const title = doc.createElement('h3')
        title.textContent = 'Keyboard Interactive Gauge Test'
        title.style.cssText = 'margin: 0; color: var(--_global-color-text-primary);'
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'Keyboard Controlled')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('unit', '%')
        gauge.setAttribute('show-value', '')
        gauge.setAttribute('tooltip', 'Use arrow keys to control')
        
        const instructions = doc.createElement('p')
        instructions.textContent = 'Click and use Arrow Keys, Home/End, PageUp/PageDown'
        instructions.style.cssText = 'text-align: center; color: var(--_global-color-text-secondary);'
        
        container.appendChild(title)
        container.appendChild(gauge)
        container.appendChild(instructions)
        doc.body.appendChild(container)
        
        // Test focus and keyboard interaction
        cy.wait(500)
        cy.get('my-gauge').first().shadow().find('.gauge-container').focus()
        cy.wait(200)
        cy.screenshot('gauge-focused-state', { overwrite: true })
        
        // Test arrow key interaction
        cy.get('my-gauge').first().shadow().find('.gauge-container')
          .type('{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}')
        cy.wait(200)
        cy.screenshot('gauge-arrow-key-increased', { overwrite: true })
        
        // Test Home key
        cy.get('my-gauge').first().shadow().find('.gauge-container').type('{home}')
        cy.wait(200)
        cy.screenshot('gauge-home-key-minimum', { overwrite: true })
        
        // Test End key
        cy.get('my-gauge').shadow().find('.gauge-container').type('{end}')
        cy.wait(200)
        cy.screenshot('gauge-end-key-maximum', { overwrite: true })
      })
    })
  })

  describe('Component Consistency Analysis', () => {
    it('should capture side-by-side component comparison', () => {
      cy.document().then((doc) => {
        // Create comparison layout
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background);'
        
        const title = doc.createElement('h2')
        title.textContent = 'Enhanced Components - Visual Consistency Check'
        title.style.cssText = 'text-align: center; margin: 0 0 2rem 0; color: var(--_global-color-text-primary);'
        
        // Progress and Gauge side by side
        const comparisonGrid = doc.createElement('div')
        comparisonGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;'
        
        // Progress section
        const progressSection = doc.createElement('div')
        progressSection.innerHTML = '<h3 style="text-align: center; margin: 0 0 1rem 0;">Progress Components</h3>'
        const progressGrid = doc.createElement('div')
        progressGrid.style.cssText = 'display: grid; gap: 1rem;'
        
        const progressVariants = ['primary', 'success', 'warning', 'error']
        progressVariants.forEach((variant, index) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('label', `${variant} Progress`)
          progress.setAttribute('value', 25 + index * 20)
          progress.setAttribute('variant', variant)
          progress.setAttribute('show-value', '')
          progressGrid.appendChild(progress)
        })
        
        progressSection.appendChild(progressGrid)
        comparisonGrid.appendChild(progressSection)
        
        // Gauge section
        const gaugeSection = doc.createElement('div')
        gaugeSection.innerHTML = '<h3 style="text-align: center; margin: 0 0 1rem 0;">Gauge Components</h3>'
        const gaugeGrid = doc.createElement('div')
        gaugeGrid.style.cssText = 'display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;'
        
        const gaugeVariants = ['primary', 'success', 'warning', 'error']
        gaugeVariants.forEach((variant, index) => {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('label', variant)
          gauge.setAttribute('value', 25 + index * 20)
          gauge.setAttribute('variant', variant)
          gauge.setAttribute('unit', '%')
          gauge.setAttribute('show-value', '')
          gauge.setAttribute('size', 'sm')
          gaugeGrid.appendChild(gauge)
        })
        
        gaugeSection.appendChild(gaugeGrid)
        comparisonGrid.appendChild(gaugeSection)
        
        container.appendChild(title)
        container.appendChild(comparisonGrid)
        doc.body.appendChild(container)
        
        cy.wait(1000)
        cy.screenshot('component-consistency-comparison', { 
          capture: 'fullPage',
          overwrite: true 
        })
      })
    })

    it('should capture hover and interaction states', () => {
      cy.document().then((doc) => {
        // Create hover test layout
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background); display: flex; flex-direction: column; gap: 2rem; align-items: center;'
        
        const title = doc.createElement('h3')
        title.textContent = 'Hover and Interaction States'
        title.style.cssText = 'margin: 0; color: var(--_global-color-text-primary);'
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Hover Test Progress')
        progress.setAttribute('value', '60')
        progress.setAttribute('show-value', '')
        progress.setAttribute('tooltip', 'Hover me!')
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'Hover Test Gauge')
        gauge.setAttribute('value', '75')
        gauge.setAttribute('unit', '%')
        gauge.setAttribute('show-value', '')
        gauge.setAttribute('tooltip', 'Hover me!')
        
        container.appendChild(title)
        container.appendChild(progress)
        container.appendChild(gauge)
        doc.body.appendChild(container)
        
        cy.wait(500)
        
        // Test hover states
        cy.get('my-progress').first().trigger('mouseover')
        cy.get('my-gauge').first().trigger('mouseover')
        cy.wait(300)
        cy.screenshot('components-hover-states', { overwrite: true })
        
        // Test normal states
        cy.get('my-progress').first().trigger('mouseout')
        cy.get('my-gauge').first().trigger('mouseout')
        cy.wait(300)
        cy.screenshot('components-normal-states', { overwrite: true })
      })
    })
  })

  describe('Accessibility Visual Testing', () => {
    it('should capture high contrast and accessibility states', () => {
      cy.document().then((doc) => {
        // Test accessibility features
        const container = doc.createElement('div')
        container.style.cssText = 'padding: 2rem; background: var(--_global-color-background);'
        
        const title = doc.createElement('h3')
        title.textContent = 'Accessibility and Focus States'
        title.style.cssText = 'text-align: center; margin: 0 0 2rem 0; color: var(--_global-color-text-primary);'
        
        const grid = doc.createElement('div')
        grid.style.cssText = 'display: grid; gap: 2rem; max-width: 600px; margin: 0 auto;'
        
        // Properly labeled progress
        const labeledProgress = doc.createElement('my-progress')
        labeledProgress.setAttribute('label', 'Accessible Progress with Screen Reader Support')
        labeledProgress.setAttribute('value', '67')
        labeledProgress.setAttribute('show-value', '')
        labeledProgress.setAttribute('tooltip', 'This progress bar is properly labeled')
        
        // Custom range progress
        const customProgress = doc.createElement('my-progress')
        customProgress.setAttribute('label', 'Custom Range (10-90)')
        customProgress.setAttribute('value', '45')
        customProgress.setAttribute('min', '10')
        customProgress.setAttribute('max', '90')
        customProgress.setAttribute('show-value', '')
        
        // Accessible gauge
        const accessibleGauge = doc.createElement('my-gauge')
        accessibleGauge.setAttribute('label', 'Keyboard Accessible Gauge')
        accessibleGauge.setAttribute('value', '80')
        accessibleGauge.setAttribute('unit', '%')
        accessibleGauge.setAttribute('show-value', '')
        accessibleGauge.setAttribute('tooltip', 'Use keyboard to control this gauge')
        
        container.appendChild(title)
        grid.appendChild(labeledProgress)
        grid.appendChild(customProgress)
        grid.appendChild(accessibleGauge)
        container.appendChild(grid)
        doc.body.appendChild(container)
        
        cy.wait(1000)
        cy.screenshot('accessibility-features', { 
          capture: 'fullPage',
          overwrite: true 
        })
      })
    })
  })
})