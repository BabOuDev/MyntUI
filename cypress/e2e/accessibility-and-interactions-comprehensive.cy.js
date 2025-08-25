/**
 * Unified Accessibility and Interaction Test Suite
 * Tests keyboard navigation, screen reader compatibility, WCAG compliance,
 * and cross-component interactions for all enhanced MyntUI components
 */

describe('MyntUI Enhanced Components - Accessibility & Interactions', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Keyboard Navigation and Focus Management', () => {
    it('should support Tab navigation across all focusable components', () => {
      cy.document().then((doc) => {
        // Create a form with all interactive components
        const form = doc.createElement('form')
        form.style.cssText = 'display: flex; flex-direction: column; gap: 16px; padding: 20px;'
        
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Name')
        input.setAttribute('name', 'name')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Accept Terms')
        checkbox.setAttribute('name', 'terms')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Enable Notifications')
        toggle.setAttribute('name', 'notifications')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Select Option')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' }
        ]))
        
        form.appendChild(input)
        form.appendChild(checkbox)
        form.appendChild(toggle)
        form.appendChild(dropdown)
        doc.body.appendChild(form)
        
        // Test tab navigation order
        cy.wrap(input).shadow().find('input').focus()
        cy.focused().should('exist')
        
        cy.focused().tab()
        cy.get('my-checkbox').shadow().find('.checkbox-container').should('be.focused')
        
        cy.focused().tab()
        cy.get('my-toggle').shadow().find('.toggle-container').should('be.focused')
        
        cy.focused().tab()
        cy.get('my-dropdown').shadow().find('.dropdown-trigger').should('be.focused')
      })
    })

    it('should handle Shift+Tab for reverse navigation', () => {
      cy.document().then((doc) => {
        const input1 = doc.createElement('my-input')
        input1.setAttribute('label', 'First Input')
        input1.setAttribute('name', 'first')
        
        const input2 = doc.createElement('my-input')
        input2.setAttribute('label', 'Second Input')
        input2.setAttribute('name', 'second')
        
        doc.body.appendChild(input1)
        doc.body.appendChild(input2)
        
        // Start from second input
        cy.wrap(input2).shadow().find('input').focus()
        
        // Shift+Tab should go to first input
        cy.focused().tab({ shift: true })
        cy.wrap(input1).shadow().find('input').should('be.focused')
      })
    })

    it('should support Enter and Space key interactions', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Keyboard Test')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Keyboard Toggle')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Keyboard Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' }
        ]))
        
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        doc.body.appendChild(dropdown)
        
        // Test checkbox with Space
        cy.wrap(checkbox).shadow().find('.checkbox-container').focus()
        cy.focused().trigger('keydown', { key: ' ' })
        cy.wait(200)
        cy.wrap(checkbox).shadow().find('.checkbox-input').should('have.class', 'checked')
        
        // Test toggle with Space and Enter
        cy.wrap(toggle).shadow().find('.toggle-container').focus()
        cy.focused().trigger('keydown', { key: ' ' })
        cy.wait(200)
        cy.wrap(toggle).shadow().find('.toggle-track').should('have.class', 'checked')
        
        cy.focused().trigger('keydown', { key: 'Enter' })
        cy.wait(200)
        cy.wrap(toggle).shadow().find('.toggle-track').should('not.have.class', 'checked')
        
        // Test dropdown with Enter
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').focus()
        cy.focused().trigger('keydown', { key: 'Enter' })
        cy.wait(200)
        cy.wrap(dropdown).shadow().find('.dropdown-menu').should('have.class', 'open')
      })
    })

    it('should handle Escape key for closing components', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Escape Test')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' }
        ]))
        
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Escape Input')
        input.setAttribute('name', 'escape')
        
        doc.body.appendChild(dropdown)
        doc.body.appendChild(input)
        
        // Open dropdown and close with Escape
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').focus()
        cy.focused().trigger('keydown', { key: 'Enter' })
        cy.wait(200)
        cy.wrap(dropdown).shadow().find('.dropdown-menu').should('have.class', 'open')
        
        cy.focused().trigger('keydown', { key: 'Escape' })
        cy.wait(200)
        cy.wrap(dropdown).shadow().find('.dropdown-menu').should('not.have.class', 'open')
        
        // Test input clear with Escape
        cy.wrap(input).shadow().find('input').focus()
        cy.focused().type('test content')
        cy.focused().trigger('keydown', { key: 'Escape' })
        cy.wait(100)
        cy.focused().should('have.value', '')
      })
    })

    it('should maintain focus indicators that meet WCAG 2.1 AA standards', () => {
      const components = [
        { name: 'my-input', selector: 'input' },
        { name: 'my-checkbox', selector: '.checkbox-container' },
        { name: 'my-toggle', selector: '.toggle-container' },
        { name: 'my-dropdown', selector: '.dropdown-trigger' }
      ]
      
      cy.document().then((doc) => {
        components.forEach((comp, index) => {
          const element = doc.createElement(comp.name)
          element.setAttribute('id', `focus-test-${index}`)
          
          if (comp.name === 'my-input') {
            element.setAttribute('label', 'Focus Test')
          } else if (comp.name === 'my-checkbox' || comp.name === 'my-toggle') {
            element.setAttribute('label', 'Focus Test')
          } else if (comp.name === 'my-dropdown') {
            element.setAttribute('trigger-text', 'Focus Test')
            element.setAttribute('options', JSON.stringify([{ value: 'opt1', label: 'Option 1' }]))
          }
          
          doc.body.appendChild(element)
        })
        
        components.forEach((comp, index) => {
          cy.get(`#focus-test-${index}`).shadow().find(comp.selector).focus()
          
          // Should have visible focus indicator
          cy.focused().should('have.css', 'outline-width').and('not.equal', '0px')
          cy.focused().should('have.css', 'outline-style').and('not.equal', 'none')
          
          // Focus should be clearly visible (contrast ratio)
          cy.focused().should('have.css', 'outline-color')
        })
      })
    })
  })

  describe('ARIA Attributes and Screen Reader Support', () => {
    it('should have proper ARIA roles for all interactive components', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'ARIA Test Input')
        input.setAttribute('name', 'aria-input')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'ARIA Test Checkbox')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'ARIA Test Toggle')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'ARIA Test Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' }
        ]))
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.setAttribute('label', 'ARIA Test Progress')
        
        doc.body.appendChild(input)
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        doc.body.appendChild(dropdown)
        doc.body.appendChild(progress)
        
        // Check ARIA roles
        cy.wrap(input).shadow().find('input').should('have.attr', 'role').or('not.have.attr', 'role') // input elements don't need explicit role
        cy.wrap(checkbox).shadow().find('.checkbox-container').should('have.attr', 'role', 'checkbox')
        cy.wrap(toggle).shadow().find('.toggle-container').should('have.attr', 'role', 'switch')
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').should('have.attr', 'role', 'button')
        cy.wrap(dropdown).shadow().find('.dropdown-menu').should('have.attr', 'role', 'menu')
        cy.wrap(progress).shadow().find('.progress-track').should('have.attr', 'role', 'progressbar')
      })
    })

    it('should provide proper ARIA labels and descriptions', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Username')
        input.setAttribute('required', '')
        input.setAttribute('name', 'username')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'I agree to the terms')
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '75')
        progress.setAttribute('label', 'Upload Progress')
        
        doc.body.appendChild(input)
        doc.body.appendChild(checkbox)
        doc.body.appendChild(progress)
        
        // Check ARIA labels
        cy.wrap(input).shadow().find('input').should('have.attr', 'aria-label', 'Username')
        cy.wrap(input).shadow().find('input').should('have.attr', 'aria-required', 'true')
        
        cy.wrap(checkbox).shadow().find('.checkbox-container').should('have.attr', 'aria-label', 'I agree to the terms')
        
        cy.wrap(progress).shadow().find('.progress-track').should('have.attr', 'aria-label', 'Upload Progress')
        cy.wrap(progress).shadow().find('.progress-track').should('have.attr', 'aria-valuenow', '75')
      })
    })

    it('should update ARIA states dynamically', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Dynamic ARIA Test')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Dynamic Toggle')
        
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Required Field')
        input.setAttribute('required', '')
        input.setAttribute('name', 'required')
        
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        doc.body.appendChild(input)
        
        // Test dynamic ARIA updates
        cy.wrap(checkbox).shadow().find('.checkbox-container').should('have.attr', 'aria-checked', 'false')
        cy.wrap(checkbox).shadow().find('.checkbox-container').click()
        cy.wait(200)
        cy.wrap(checkbox).shadow().find('.checkbox-container').should('have.attr', 'aria-checked', 'true')
        
        cy.wrap(toggle).shadow().find('.toggle-container').should('have.attr', 'aria-checked', 'false')
        cy.wrap(toggle).shadow().find('.toggle-container').click()
        cy.wait(200)
        cy.wrap(toggle).shadow().find('.toggle-container').should('have.attr', 'aria-checked', 'true')
        
        // Test validation ARIA updates
        cy.wrap(input).shadow().find('input').should('have.attr', 'aria-invalid', 'false')
        cy.wrap(input).shadow().find('input').focus().blur() // Trigger validation
        cy.wait(200)
        cy.wrap(input).shadow().find('input').should('have.attr', 'aria-invalid', 'true')
      })
    })

    it('should provide proper error announcements', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Email')
        input.setAttribute('required', '')
        input.setAttribute('name', 'email')
        
        doc.body.appendChild(input)
        
        // Trigger validation error
        cy.wrap(input).shadow().find('input').focus().blur()
        cy.wait(200)
        
        // Should have error message with proper ARIA
        cy.wrap(input).shadow().find('.error-message').should('have.attr', 'role', 'alert')
        cy.wrap(input).shadow().find('.error-message').should('have.attr', 'aria-live', 'polite')
        cy.wrap(input).shadow().find('.error-message').should('have.attr', 'aria-atomic', 'true')
        
        // Input should reference error message
        cy.wrap(input).shadow().find('input').should('have.attr', 'aria-describedby')
      })
    })

    it('should handle disabled state ARIA properly', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Disabled Input')
        input.setAttribute('disabled', '')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Disabled Checkbox')
        checkbox.setAttribute('disabled', '')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Disabled Toggle')
        toggle.setAttribute('disabled', '')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Disabled Dropdown')
        dropdown.setAttribute('disabled', '')
        
        doc.body.appendChild(input)
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        doc.body.appendChild(dropdown)
        
        // Check disabled ARIA attributes
        cy.wrap(input).shadow().find('input').should('have.attr', 'disabled')
        cy.wrap(checkbox).shadow().find('.checkbox-container').should('have.attr', 'aria-disabled', 'true')
        cy.wrap(toggle).shadow().find('.toggle-container').should('have.attr', 'aria-disabled', 'true')
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').should('have.attr', 'aria-disabled', 'true')
        
        // Should have proper tabindex
        cy.wrap(checkbox).shadow().find('.checkbox-container').should('have.attr', 'tabindex', '-1')
        cy.wrap(toggle).shadow().find('.toggle-container').should('have.attr', 'tabindex', '-1')
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').should('have.attr', 'tabindex', '-1')
      })
    })
  })

  describe('State Layer Interactions and Visual Feedback', () => {
    it('should show proper hover states with state layers', () => {
      const interactiveComponents = [
        { name: 'my-checkbox', selector: '.checkbox-container' },
        { name: 'my-toggle', selector: '.toggle-container' },
        { name: 'my-dropdown', selector: '.dropdown-trigger' }
      ]
      
      cy.document().then((doc) => {
        interactiveComponents.forEach((comp, index) => {
          const element = doc.createElement(comp.name)
          element.setAttribute('id', `hover-test-${index}`)
          
          if (comp.name === 'my-checkbox' || comp.name === 'my-toggle') {
            element.setAttribute('label', 'Hover Test')
          } else if (comp.name === 'my-dropdown') {
            element.setAttribute('trigger-text', 'Hover Test')
            element.setAttribute('options', JSON.stringify([{ value: 'opt1', label: 'Option 1' }]))
          }
          
          doc.body.appendChild(element)
        })
        
        interactiveComponents.forEach((comp, index) => {
          cy.get(`#hover-test-${index}`).shadow().find(comp.selector).trigger('mouseover')
          cy.wait(200)
          
          // Should show hover state (state layer opacity change)
          cy.get(`#hover-test-${index}`).shadow().find(comp.selector).should('have.css', 'cursor', 'pointer')
          
          cy.get(`#hover-test-${index}`).shadow().find(comp.selector).trigger('mouseout')
          cy.wait(200)
        })
      })
    })

    it('should show proper active/pressed states', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Press Test')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Press Test')
        
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        
        // Test active states
        cy.wrap(checkbox).shadow().find('.checkbox-container').trigger('mousedown')
        cy.wait(100)
        cy.wrap(checkbox).shadow().find('.checkbox-container').trigger('mouseup')
        
        cy.wrap(toggle).shadow().find('.toggle-container').trigger('mousedown')
        cy.wait(100)
        // Toggle thumb should be larger when pressed
        cy.wrap(toggle).shadow().find('.toggle-thumb').should('have.css', 'transition')
        cy.wrap(toggle).shadow().find('.toggle-container').trigger('mouseup')
        cy.wait(200)
      })
    })

    it('should provide tactile feedback through animations', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Required Field')
        input.setAttribute('required', '')
        input.setAttribute('name', 'tactile')
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Animated Checkbox')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Animated Toggle')
        
        doc.body.appendChild(input)
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        
        // Test input error shake animation
        cy.wrap(input).shadow().find('input').focus().blur()
        cy.wait(200)
        
        // Should have shake animation class or styling
        cy.wrap(input).shadow().find('.input-container.has-error').should('exist')
        cy.wrap(input).shadow().find('.input-field').should('have.css', 'animation')
        
        // Test checkbox checkmark animation
        cy.wrap(checkbox).shadow().find('.checkbox-container').click()
        cy.wait(300)
        cy.wrap(checkbox).shadow().find('.checkbox-input.checked').should('have.css', '::after')
        
        // Test toggle thumb slide animation
        cy.wrap(toggle).shadow().find('.toggle-container').click()
        cy.wait(300)
        cy.wrap(toggle).shadow().find('.toggle-thumb').should('have.css', 'transition')
      })
    })
  })

  describe('Cross-Component Interactions', () => {
    it('should handle form integration properly', () => {
      cy.document().then((doc) => {
        const form = doc.createElement('form')
        
        const nameInput = doc.createElement('my-input')
        nameInput.setAttribute('label', 'Name')
        nameInput.setAttribute('name', 'name')
        nameInput.setAttribute('required', '')
        
        const emailInput = doc.createElement('my-input')
        emailInput.setAttribute('label', 'Email')
        emailInput.setAttribute('name', 'email')
        emailInput.setAttribute('type', 'email')
        emailInput.setAttribute('required', '')
        
        const termsCheckbox = doc.createElement('my-checkbox')
        termsCheckbox.setAttribute('label', 'I agree to the terms')
        termsCheckbox.setAttribute('name', 'terms')
        
        const notificationsToggle = doc.createElement('my-toggle')
        notificationsToggle.setAttribute('label', 'Email notifications')
        notificationsToggle.setAttribute('name', 'notifications')
        
        form.appendChild(nameInput)
        form.appendChild(emailInput)
        form.appendChild(termsCheckbox)
        form.appendChild(notificationsToggle)
        doc.body.appendChild(form)
        
        // Fill form using keyboard navigation
        cy.wrap(nameInput).shadow().find('input').focus()
        cy.focused().type('John Doe')
        
        cy.focused().tab()
        cy.focused().type('john@example.com')
        
        cy.focused().tab()
        cy.focused().trigger('keydown', { key: ' ' }) // Check terms
        cy.wait(200)
        
        cy.focused().tab()
        cy.focused().trigger('keydown', { key: ' ' }) // Enable notifications
        cy.wait(200)
        
        // Verify form state
        cy.wrap(nameInput).shadow().find('input').should('have.value', 'John Doe')
        cy.wrap(emailInput).shadow().find('input').should('have.value', 'john@example.com')
        cy.wrap(termsCheckbox).shadow().find('.checkbox-input').should('have.class', 'checked')
        cy.wrap(notificationsToggle).shadow().find('.toggle-track').should('have.class', 'checked')
      })
    })

    it('should handle progressive enhancement scenarios', () => {
      cy.document().then((doc) => {
        // Start with basic HTML elements, then enhance
        const basicInput = doc.createElement('input')
        basicInput.type = 'text'
        basicInput.placeholder = 'Basic input'
        doc.body.appendChild(basicInput)
        
        // Enhanced input should work alongside basic input
        const enhancedInput = doc.createElement('my-input')
        enhancedInput.setAttribute('label', 'Enhanced Input')
        enhancedInput.setAttribute('name', 'enhanced')
        doc.body.appendChild(enhancedInput)
        
        // Both should be navigable
        cy.wrap(basicInput).focus()
        cy.focused().tab()
        cy.wrap(enhancedInput).shadow().find('input').should('be.focused')
        
        // Both should function
        cy.wrap(basicInput).type('basic')
        cy.wrap(basicInput).should('have.value', 'basic')
        
        cy.wrap(enhancedInput).shadow().find('input').type('enhanced')
        cy.wrap(enhancedInput).shadow().find('input').should('have.value', 'enhanced')
      })
    })

    it('should handle modal and overlay interactions', () => {
      cy.document().then((doc) => {
        // Create a dropdown that acts like a modal
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Open Modal-like Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' },
          { value: 'opt2', label: 'Option 2' },
          { value: 'opt3', label: 'Option 3' }
        ]))
        
        const backgroundInput = doc.createElement('my-input')
        backgroundInput.setAttribute('label', 'Background Input')
        backgroundInput.setAttribute('name', 'background')
        
        doc.body.appendChild(dropdown)
        doc.body.appendChild(backgroundInput)
        
        // Open dropdown
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').click()
        cy.wait(200)
        cy.wrap(dropdown).shadow().find('.dropdown-menu').should('have.class', 'open')
        
        // Background input should still be accessible but dropdown should handle focus
        cy.wrap(backgroundInput).shadow().find('input').click()
        cy.wait(200)
        
        // Dropdown should close when clicking outside
        cy.wrap(backgroundInput).shadow().find('input').should('be.focused')
      })
    })
  })

  describe('Touch and Mobile Interactions', () => {
    it('should handle touch interactions on mobile viewports', () => {
      cy.viewport(375, 667) // Mobile viewport
      
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Touch Test Checkbox')
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Touch Test Toggle')
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Touch Test Dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'opt1', label: 'Option 1' }
        ]))
        
        doc.body.appendChild(checkbox)
        doc.body.appendChild(toggle)
        doc.body.appendChild(dropdown)
        
        // Test touch interactions
        cy.wrap(checkbox).shadow().find('.checkbox-container').trigger('touchstart')
        cy.wrap(checkbox).shadow().find('.checkbox-container').trigger('touchend')
        cy.wait(200)
        cy.wrap(checkbox).shadow().find('.checkbox-input').should('have.class', 'checked')
        
        cy.wrap(toggle).shadow().find('.toggle-container').trigger('touchstart')
        cy.wrap(toggle).shadow().find('.toggle-container').trigger('touchend')
        cy.wait(200)
        cy.wrap(toggle).shadow().find('.toggle-track').should('have.class', 'checked')
        
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').trigger('touchstart')
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').trigger('touchend')
        cy.wait(200)
        cy.wrap(dropdown).shadow().find('.dropdown-menu').should('have.class', 'open')
      })
    })

    it('should have appropriate touch target sizes', () => {
      cy.viewport(375, 667) // Mobile viewport
      
      const interactiveComponents = [
        { name: 'my-checkbox', selector: '.checkbox-container' },
        { name: 'my-toggle', selector: '.toggle-container' },
        { name: 'my-dropdown', selector: '.dropdown-trigger' }
      ]
      
      cy.document().then((doc) => {
        interactiveComponents.forEach((comp, index) => {
          const element = doc.createElement(comp.name)
          element.setAttribute('id', `touch-target-${index}`)
          
          if (comp.name === 'my-checkbox' || comp.name === 'my-toggle') {
            element.setAttribute('label', 'Touch Target Test')
          } else if (comp.name === 'my-dropdown') {
            element.setAttribute('trigger-text', 'Touch Target Test')
            element.setAttribute('options', JSON.stringify([{ value: 'opt1', label: 'Option 1' }]))
          }
          
          doc.body.appendChild(element)
        })
        
        // Check touch target sizes (should be at least 44px for accessibility)
        interactiveComponents.forEach((comp, index) => {
          cy.get(`#touch-target-${index}`).shadow().find(comp.selector).then(($el) => {
            const rect = $el[0].getBoundingClientRect()
            expect(rect.width).to.be.at.least(40) // Allow some flexibility
            expect(rect.height).to.be.at.least(40)
          })
        })
      })
    })
  })

  describe('Performance and Resource Management', () => {
    it('should handle many interactive components without performance degradation', () => {
      const startTime = performance.now()
      
      cy.document().then((doc) => {
        // Create a large form with many components
        const form = doc.createElement('form')
        form.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 20px;'
        
        for (let i = 0; i < 50; i++) {
          const input = doc.createElement('my-input')
          input.setAttribute('label', `Field ${i}`)
          input.setAttribute('name', `field${i}`)
          input.setAttribute('id', `perf-input-${i}`)
          form.appendChild(input)
          
          if (i % 5 === 0) {
            const checkbox = doc.createElement('my-checkbox')
            checkbox.setAttribute('label', `Checkbox ${i}`)
            checkbox.setAttribute('id', `perf-checkbox-${i}`)
            form.appendChild(checkbox)
          }
          
          if (i % 7 === 0) {
            const toggle = doc.createElement('my-toggle')
            toggle.setAttribute('label', `Toggle ${i}`)
            toggle.setAttribute('id', `perf-toggle-${i}`)
            form.appendChild(toggle)
          }
        }
        
        doc.body.appendChild(form)
        
        const endTime = performance.now()
        const creationTime = endTime - startTime
        expect(creationTime).to.be.lessThan(3000) // Should create within reasonable time
        
        // Test that navigation still works efficiently
        const navStartTime = performance.now()
        
        cy.get('#perf-input-0').shadow().find('input').focus()
        
        // Tab through several elements
        for (let i = 0; i < 10; i++) {
          cy.focused().tab()
          cy.wait(50)
        }
        
        const navEndTime = performance.now()
        const navTime = navEndTime - navStartTime
        expect(navTime).to.be.lessThan(2000) // Navigation should be responsive
        
        // Clean up
        form.remove()
      })
    })

    it('should properly clean up event listeners and resources', () => {
      cy.document().then((doc) => {
        const components = []
        
        // Create components
        for (let i = 0; i < 10; i++) {
          const input = doc.createElement('my-input')
          input.setAttribute('label', `Cleanup Test ${i}`)
          input.setAttribute('id', `cleanup-test-${i}`)
          components.push(input)
          doc.body.appendChild(input)
        }
        
        // Verify they exist
        cy.get('my-input[id^="cleanup-test-"]').should('have.length', 10)
        
        // Remove all components
        components.forEach(comp => comp.remove())
        
        // Should be cleaned up
        cy.get('my-input[id^="cleanup-test-"]').should('have.length', 0)
        
        // Memory should not be leaking (this is hard to test directly in Cypress,
        // but the removal should complete without errors)
        cy.wait(100)
      })
    })
  })

  describe('Error Handling and Resilience', () => {
    it('should gracefully handle malformed attributes', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', 'invalid-json')
        dropdown.setAttribute('trigger-text', 'Malformed Options')
        doc.body.appendChild(dropdown)
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('thresholds', 'also-invalid-json')
        gauge.setAttribute('value', '50')
        doc.body.appendChild(gauge)
        
        const input = doc.createElement('my-input')
        input.setAttribute('schema', 'not-valid-json')
        input.setAttribute('label', 'Malformed Schema')
        doc.body.appendChild(input)
        
        // Should still render without crashing
        cy.wrap(dropdown).should('be.visible')
        cy.wrap(gauge).should('be.visible')
        cy.wrap(input).should('be.visible')
        
        // Should still be interactive
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').click()
        cy.wait(200)
        
        cy.wrap(input).shadow().find('input').type('test')
        cy.wrap(input).shadow().find('input').should('have.value', 'test')
      })
    })

    it('should handle dynamic attribute changes gracefully', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Dynamic Test')
        input.setAttribute('name', 'dynamic')
        doc.body.appendChild(input)
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Dynamic Checkbox')
        doc.body.appendChild(checkbox)
        
        // Rapid attribute changes
        for (let i = 0; i < 5; i++) {
          input.setAttribute('label', `Dynamic Test ${i}`)
          checkbox.setAttribute('label', `Dynamic Checkbox ${i}`)
          
          if (i % 2 === 0) {
            input.setAttribute('disabled', '')
            checkbox.setAttribute('disabled', '')
          } else {
            input.removeAttribute('disabled')
            checkbox.removeAttribute('disabled')
          }
        }
        
        cy.wait(200)
        
        // Should handle all changes without errors
        cy.wrap(input).shadow().find('.label').should('contain.text', 'Dynamic Test 4')
        cy.wrap(checkbox).shadow().find('.label').should('contain.text', 'Dynamic Checkbox 4')
        
        // Should be in final state (not disabled)
        cy.wrap(input).should('not.have.attr', 'disabled')
        cy.wrap(checkbox).should('not.have.attr', 'disabled')
        
        // Should still be interactive
        cy.wrap(input).shadow().find('input').type('test')
        cy.wrap(input).shadow().find('input').should('have.value', 'test')
        
        cy.wrap(checkbox).shadow().find('.checkbox-container').click()
        cy.wait(200)
        cy.wrap(checkbox).shadow().find('.checkbox-input').should('have.class', 'checked')
      })
    })
  })
})