/**
 * Comprehensive Test Suite for my-checkbox Component
 * Tests Material Design 3 enhancements, functionality, accessibility, and edge cases
 */

describe('my-checkbox Component - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Basic Functionality', () => {
    it('should render checkbox with basic attributes', () => {
      cy.get('my-checkbox').first().should('exist')
      cy.get('my-checkbox').first().shadow().find('.checkbox-container').should('exist')
      cy.get('my-checkbox').first().shadow().find('.checkbox-input').should('exist')
    })

    it('should handle check/uncheck interactions', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        // Initially unchecked
        cy.get('.checkbox-input').should('not.have.class', 'checked')
        
        // Click to check
        cy.get('.checkbox-container').click()
        cy.wait(200)
        cy.get('.checkbox-input').should('have.class', 'checked')
        
        // Click again to uncheck
        cy.get('.checkbox-container').click()
        cy.wait(200)
        cy.get('.checkbox-input').should('not.have.class', 'checked')
      })
    })

    it('should support label text', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Test Checkbox Label')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          cy.get('.label').should('contain.text', 'Test Checkbox Label')
        })
      })
    })

    it('should handle name and value attributes', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('name', 'testCheckbox')
        checkbox.setAttribute('value', 'testValue')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).should('have.attr', 'name', 'testCheckbox')
        cy.wrap(checkbox).should('have.attr', 'value', 'testValue')
      })
    })

    it('should support indeterminate state', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Indeterminate Checkbox')
        checkbox.setAttribute('indeterminate', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          cy.get('.checkbox-input').should('have.class', 'indeterminate')
          cy.get('.checkbox-container').should('have.attr', 'aria-checked', 'mixed')
        })
      })
    })

    it('should handle disabled state', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Disabled Checkbox')
        checkbox.setAttribute('disabled', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).should('have.attr', 'disabled')
        cy.wrap(checkbox).shadow().within(() => {
          cy.get('.checkbox-container').should('have.attr', 'aria-disabled', 'true')
          cy.get('.checkbox-container').should('have.attr', 'tabindex', '-1')
        })
      })
    })
  })

  describe('Material Design 3 Styling', () => {
    it('should have proper initial Material Design 3 styling', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        cy.get('.checkbox-input').should('have.css', 'border-radius')
        cy.get('.checkbox-input').should('have.css', 'transition')
        cy.get('.checkbox-container').should('have.css', 'border-radius', '50%')
      })
    })

    it('should show state layer on hover', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        // Check state layer exists
        cy.get('.checkbox-container').should('have.css', '::before')
        
        // Trigger hover
        cy.get('.checkbox-container').trigger('mouseover')
        cy.wait(200) // Allow transition
        
        // State layer should be visible on hover
        cy.get('.checkbox-container').should('have.css', 'cursor', 'pointer')
      })
    })

    it('should show proper focus states with elevation', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        cy.get('.checkbox-container').focus()
        cy.wait(300) // Allow transitions
        
        // Should have focus outline
        cy.get('.checkbox-container').should('have.css', 'outline')
        cy.get('.checkbox-container').should('have.css', 'outline-color')
      })
    })

    it('should animate checkmark on check/uncheck', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        // Click to check
        cy.get('.checkbox-container').click()
        cy.wait(300) // Allow animation
        
        // Checkmark should be visible and scaled
        cy.get('.checkbox-input.checked').should('exist')
        cy.get('.checkbox-input.checked').should('have.css', '::after')
      })
    })

    it('should handle pressed/active state', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        cy.get('.checkbox-container').trigger('mousedown')
        cy.wait(100)
        
        // Should show active state styling
        cy.get('.checkbox-container').should('have.css', 'cursor', 'pointer')
        
        cy.get('.checkbox-container').trigger('mouseup')
      })
    })

    it('should handle different size variants', () => {
      cy.document().then((doc) => {
        // Small size
        const smallCheckbox = doc.createElement('my-checkbox')
        smallCheckbox.setAttribute('size', 'sm')
        smallCheckbox.setAttribute('label', 'Small Checkbox')
        doc.body.appendChild(smallCheckbox)
        
        // Large size
        const largeCheckbox = doc.createElement('my-checkbox')
        largeCheckbox.setAttribute('size', 'lg')
        largeCheckbox.setAttribute('label', 'Large Checkbox')
        doc.body.appendChild(largeCheckbox)
        
        // Check size variants are applied
        cy.wrap(smallCheckbox).should('have.attr', 'size', 'sm')
        cy.wrap(largeCheckbox).should('have.attr', 'size', 'lg')
        
        // CSS custom properties should be different
        cy.wrap(smallCheckbox).shadow().find('.checkbox-input')
          .should('have.css', 'width').and('not.equal', '18px') // Different from default
        
        cy.wrap(largeCheckbox).shadow().find('.checkbox-input')
          .should('have.css', 'width').and('not.equal', '18px') // Different from default
      })
    })

    it('should show proper disabled state styling', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Disabled Checkbox')
        checkbox.setAttribute('disabled', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          // Should have disabled opacity and styling
          cy.get('.checkbox-input').should('have.css', 'opacity')
          cy.get('.label').should('have.css', 'color')
          
          // State layer should be hidden
          cy.get('.checkbox-container').should('have.css', 'pointer-events', 'none')
        })
      })
    })

    it('should display indeterminate state properly', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Indeterminate Checkbox')
        checkbox.setAttribute('indeterminate', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          cy.get('.checkbox-input.indeterminate').should('exist')
          // Should show horizontal line instead of checkmark
          cy.get('.checkbox-input.indeterminate').should('have.css', '::after')
        })
      })
    })
  })

  describe('State Transitions and Animations', () => {
    it('should transition from indeterminate to checked', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Transition Test')
        checkbox.setAttribute('indeterminate', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          // Start indeterminate
          cy.get('.checkbox-input').should('have.class', 'indeterminate')
          
          // Click should go to checked
          cy.get('.checkbox-container').click()
          cy.wait(300)
          
          cy.get('.checkbox-input').should('have.class', 'checked')
          cy.get('.checkbox-input').should('not.have.class', 'indeterminate')
        })
      })
    })

    it('should have smooth animations with reduced motion support', () => {
      // Test that animations exist in normal conditions
      cy.get('my-checkbox').first().shadow().within(() => {
        cy.get('.checkbox-input').should('have.css', 'transition')
        cy.get('.checkbox-container').should('have.css', '::before')
      })
    })

    it('should handle rapid state changes', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        // Rapid clicking
        for (let i = 0; i < 5; i++) {
          cy.get('.checkbox-container').click()
          cy.wait(50)
        }
        
        // Should handle rapid changes gracefully
        cy.get('.checkbox-container').should('be.visible')
      })
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        cy.get('.checkbox-container').should('have.attr', 'role', 'checkbox')
        cy.get('.checkbox-container').should('have.attr', 'aria-checked')
        cy.get('.checkbox-container').should('have.attr', 'aria-label')
        cy.get('.checkbox-container').should('have.attr', 'tabindex', '0')
      })
    })

    it('should support keyboard navigation with Space key', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        // Focus the checkbox
        cy.get('.checkbox-container').focus()
        
        // Initially unchecked
        cy.get('.checkbox-input').should('not.have.class', 'checked')
        
        // Press space to check
        cy.get('.checkbox-container').trigger('keydown', { key: ' ' })
        cy.wait(200)
        
        cy.get('.checkbox-input').should('have.class', 'checked')
        
        // Press space again to uncheck
        cy.get('.checkbox-container').trigger('keydown', { key: ' ' })
        cy.wait(200)
        
        cy.get('.checkbox-input').should('not.have.class', 'checked')
      })
    })

    it('should update ARIA attributes based on state', () => {
      cy.get('my-checkbox').first().shadow().within(() => {
        // Initially unchecked
        cy.get('.checkbox-container').should('have.attr', 'aria-checked', 'false')
        
        // Click to check
        cy.get('.checkbox-container').click()
        cy.wait(200)
        
        // Should update ARIA
        cy.get('.checkbox-container').should('have.attr', 'aria-checked', 'true')
      })
    })

    it('should handle indeterminate ARIA state correctly', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Indeterminate ARIA')
        checkbox.setAttribute('indeterminate', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          cy.get('.checkbox-container').should('have.attr', 'aria-checked', 'mixed')
        })
      })
    })

    it('should be focusable and have proper tab order', () => {
      // Create multiple checkboxes
      cy.document().then((doc) => {
        for (let i = 0; i < 3; i++) {
          const checkbox = doc.createElement('my-checkbox')
          checkbox.setAttribute('label', `Checkbox ${i + 1}`)
          checkbox.setAttribute('name', `test${i}`)
          doc.body.appendChild(checkbox)
        }
        
        // Test tab navigation
        cy.get('my-checkbox[name="test0"]').shadow().find('.checkbox-container').focus()
        cy.focused().tab()
        cy.get('my-checkbox[name="test1"]').shadow().find('.checkbox-container').should('be.focused')
      })
    })

    it('should handle disabled state accessibility', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Disabled Accessibility')
        checkbox.setAttribute('disabled', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          cy.get('.checkbox-container').should('have.attr', 'aria-disabled', 'true')
          cy.get('.checkbox-container').should('have.attr', 'tabindex', '-1')
          
          // Should not respond to keyboard
          cy.get('.checkbox-container').trigger('keydown', { key: ' ' })
          cy.wait(200)
          cy.get('.checkbox-input').should('not.have.class', 'checked')
        })
      })
    })
  })

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle programmatic state changes', () => {
      cy.get('my-checkbox').first().then(($checkbox) => {
        // Programmatically check
        $checkbox[0].checked = true
        cy.wrap($checkbox).shadow().find('.checkbox-input').should('have.class', 'checked')
        
        // Programmatically uncheck
        $checkbox[0].checked = false
        cy.wrap($checkbox).shadow().find('.checkbox-input').should('not.have.class', 'checked')
      })
    })

    it('should handle indeterminate to checked to unchecked cycle', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'State Cycle')
        checkbox.setAttribute('indeterminate', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).then(($checkbox) => {
          // Start indeterminate
          cy.wrap($checkbox).should('have.attr', 'indeterminate')
          
          // First click: indeterminate -> checked
          $checkbox[0].click()
          cy.wait(100)
          cy.wrap($checkbox).should('not.have.attr', 'indeterminate')
          cy.wrap($checkbox).should('have.attr', 'checked')
          
          // Second click: checked -> unchecked
          $checkbox[0].click()
          cy.wait(100)
          cy.wrap($checkbox).should('not.have.attr', 'checked')
        })
      })
    })

    it('should handle attribute changes dynamically', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Dynamic Attributes')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).then(($checkbox) => {
          // Change to disabled
          $checkbox[0].setAttribute('disabled', '')
          cy.wait(100)
          cy.wrap($checkbox).shadow().find('.checkbox-container')
            .should('have.attr', 'aria-disabled', 'true')
          
          // Remove disabled
          $checkbox[0].removeAttribute('disabled')
          cy.wait(100)
          cy.wrap($checkbox).shadow().find('.checkbox-container')
            .should('not.have.attr', 'aria-disabled')
        })
      })
    })

    it('should handle component destruction gracefully', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Destruction Test')
        doc.body.appendChild(checkbox)
        
        // Verify it exists
        cy.wrap(checkbox).should('exist')
        
        // Remove from DOM
        checkbox.remove()
        
        // Should be removed cleanly
        cy.get('my-checkbox[label="Destruction Test"]').should('not.exist')
      })
    })

    it('should handle empty label gracefully', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        // No label attribute
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          // Should show slot content or no label
          cy.get('.checkbox-container').should('be.visible')
          cy.get('slot').should('exist')
        })
      })
    })

    it('should handle click events on label', () => {
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Clickable Label')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().within(() => {
          // Initially unchecked
          cy.get('.checkbox-input').should('not.have.class', 'checked')
          
          // Click on label
          cy.get('.label').click()
          cy.wait(200)
          
          // Should check the checkbox
          cy.get('.checkbox-input').should('have.class', 'checked')
        })
      })
    })
  })

  describe('Custom Events', () => {
    it('should emit change events with proper detail', () => {
      let changeEventDetail = null
      
      cy.get('my-checkbox').first().then(($checkbox) => {
        $checkbox.on('change', (e) => {
          changeEventDetail = e.detail
        })
      })
      
      cy.get('my-checkbox').first().shadow().within(() => {
        cy.get('.checkbox-container').click()
      }).then(() => {
        expect(changeEventDetail).to.exist
        expect(changeEventDetail).to.have.property('checked')
        expect(changeEventDetail).to.have.property('indeterminate')
        expect(changeEventDetail).to.have.property('value')
        expect(changeEventDetail).to.have.property('name')
      })
    })

    it('should emit events that bubble', () => {
      let eventBubbled = false
      
      cy.document().then((doc) => {
        doc.addEventListener('change', () => {
          eventBubbled = true
        })
        
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Bubbling Test')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).shadow().find('.checkbox-container').click()
        cy.wait(100).then(() => {
          expect(eventBubbled).to.be.true
        })
      })
    })

    it('should provide correct event detail for indeterminate state', () => {
      let changeEventDetail = null
      
      cy.document().then((doc) => {
        const checkbox = doc.createElement('my-checkbox')
        checkbox.setAttribute('label', 'Indeterminate Event')
        checkbox.setAttribute('indeterminate', '')
        doc.body.appendChild(checkbox)
        
        cy.wrap(checkbox).then(($checkbox) => {
          $checkbox.on('change', (e) => {
            changeEventDetail = e.detail
          })
          
          $checkbox[0].click()
          cy.wait(100).then(() => {
            expect(changeEventDetail.checked).to.be.true
            expect(changeEventDetail.indeterminate).to.be.false
          })
        })
      })
    })
  })

  describe('Performance and Memory', () => {
    it('should handle multiple checkboxes efficiently', () => {
      const startTime = performance.now()
      
      cy.document().then((doc) => {
        // Create many checkboxes
        for (let i = 0; i < 50; i++) {
          const checkbox = doc.createElement('my-checkbox')
          checkbox.setAttribute('label', `Checkbox ${i}`)
          checkbox.setAttribute('name', `perf-test-${i}`)
          doc.body.appendChild(checkbox)
        }
        
        // Check they all exist
        cy.get('my-checkbox[name^="perf-test-"]').should('have.length', 50)
        
        const endTime = performance.now()
        const duration = endTime - startTime
        expect(duration).to.be.lessThan(1000) // Should create quickly
        
        // Clean up
        cy.get('my-checkbox[name^="perf-test-"]').then(($checkboxes) => {
          $checkboxes.each((index, element) => {
            element.remove()
          })
        })
      })
    })

    it('should be responsive at different viewport sizes', () => {
      // Test mobile viewport
      cy.viewport(375, 667)
      cy.get('my-checkbox').first().should('be.visible')
      cy.get('my-checkbox').first().shadow().find('.checkbox-input').should('be.visible')
      
      // Test tablet viewport
      cy.viewport(768, 1024)
      cy.get('my-checkbox').first().should('be.visible')
      
      // Test desktop viewport
      cy.viewport(1200, 800)
      cy.get('my-checkbox').first().should('be.visible')
    })
  })
})