/**
 * Comprehensive Test Suite for my-input Component
 * Tests Material Design 3 enhancements, functionality, accessibility, and edge cases
 */

describe('my-input Component - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Basic Functionality', () => {
    it('should render input with basic attributes', () => {
      cy.get('my-input[name="firstName"]').should('exist')
      cy.get('my-input[name="firstName"]').shadow().find('input').should('exist')
      cy.get('my-input[name="firstName"]').shadow().find('.label').should('contain.text', 'First Name')
    })

    it('should handle input value changes', () => {
      cy.get('my-input[name="firstName"]')
        .shadow()
        .find('input')
        .type('John Doe')
        .should('have.value', 'John Doe')
    })

    it('should support different input types', () => {
      // Test text input
      cy.get('my-input[type="text"]').shadow().find('input').should('have.attr', 'type', 'text')
      
      // Test email input
      cy.get('my-input[type="email"]').shadow().find('input').should('have.attr', 'type', 'email')
      
      // Test password input
      cy.get('my-input[type="password"]').shadow().find('input').should('have.attr', 'type', 'password')
      
      // Test number input
      cy.get('my-input[type="number"]').shadow().find('input').should('have.attr', 'type', 'number')
    })

    it('should handle placeholder text', () => {
      cy.get('my-input[placeholder]').first()
        .shadow()
        .find('input')
        .should('have.attr', 'placeholder')
    })

    it('should handle required attribute', () => {
      cy.get('my-input[required]').first()
        .shadow()
        .find('input')
        .should('have.attr', 'required')
      
      // Check for required indicator (asterisk)
      cy.get('my-input[required]').first()
        .shadow()
        .find('.label.required')
        .should('exist')
    })
  })

  describe('Material Design 3 Styling', () => {
    it('should have proper initial styling', () => {
      cy.get('my-input').first().shadow().within(() => {
        cy.get('.input-field').should('be.visible')
        cy.get('.input-container').should('be.visible')
        
        // Check for Material Design 3 classes
        cy.get('.input-field').should('have.css', 'border-radius')
        cy.get('.input-field').should('have.css', 'transition')
      })
    })

    it('should show hover state effects', () => {
      cy.get('my-input').first().shadow().within(() => {
        cy.get('.input-field').trigger('mouseover')
        cy.wait(200) // Allow transition
        
        // The hover state should change appearance
        cy.get('.input-field').should('have.css', 'cursor', 'text')
      })
    })

    it('should show focus state with elevation and state layers', () => {
      cy.get('my-input').first().shadow().within(() => {
        cy.get('.input-field').focus()
        cy.wait(300) // Allow transitions
        
        // Check focus styles
        cy.get('.input-field').should('have.class', 'focused')
        cy.get('.input-container').should('have.class', 'focused')
        
        // Check for elevation changes (box-shadow)
        cy.get('.input-field').should('have.css', 'box-shadow')
      })
    })

    it('should display floating labels correctly', () => {
      // Test with floating label (label-position="over")
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Floating Label')
        input.setAttribute('label-position', 'over')
        input.setAttribute('name', 'testFloat')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Initially, label should be inside input area
          cy.get('.label.over').should('exist')
          
          // After typing, label should float up
          cy.get('input').type('test')
          cy.wait(300) // Allow animation
          
          // Label should be transformed/scaled
          cy.get('.label.over').should('have.css', 'transform')
        })
      })
    })

    it('should handle disabled state styling', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Disabled Input')
        input.setAttribute('disabled', '')
        input.setAttribute('name', 'testDisabled')
        doc.body.appendChild(input)
        
        cy.wrap(input).should('have.attr', 'disabled')
        cy.wrap(input).shadow().within(() => {
          cy.get('.input-field').should('have.attr', 'disabled')
          cy.get('.input-field').should('have.css', 'opacity')
        })
      })
    })
  })

  describe('Validation and Error States', () => {
    it('should validate required fields', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Required Field')
        input.setAttribute('required', '')
        input.setAttribute('name', 'testRequired')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Focus and blur to trigger validation
          cy.get('input').focus().blur()
          cy.wait(200)
          
          // Should show error state
          cy.get('.input-container').should('have.class', 'has-error')
          cy.get('.error-message').should('be.visible')
          cy.get('.error-message').should('contain.text', 'required')
        })
      })
    })

    it('should validate pattern matching', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Email Pattern')
        input.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
        input.setAttribute('name', 'testPattern')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Type invalid pattern
          cy.get('input').type('invalid-email').blur()
          cy.wait(200)
          
          // Should show error
          cy.get('.input-container').should('have.class', 'has-error')
          cy.get('.error-message').should('be.visible')
          
          // Type valid pattern
          cy.get('input').clear().type('test@example.com').blur()
          cy.wait(200)
          
          // Should clear error
          cy.get('.input-container').should('not.have.class', 'has-error')
          cy.get('.error-message').should('not.be.visible')
        })
      })
    })

    it('should validate min/max length', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Length Validation')
        input.setAttribute('minlength', '5')
        input.setAttribute('maxlength', '10')
        input.setAttribute('name', 'testLength')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Type less than minimum
          cy.get('input').type('abc').blur()
          cy.wait(200)
          
          // Should show error
          cy.get('.error-message').should('be.visible')
          cy.get('.error-message').should('contain.text', 'at least')
          
          // Type valid length
          cy.get('input').clear().type('abcdef').blur()
          cy.wait(200)
          
          // Should clear error
          cy.get('.error-message').should('not.be.visible')
        })
      })
    })

    it('should validate number ranges', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('type', 'number')
        input.setAttribute('label', 'Number Range')
        input.setAttribute('min', '10')
        input.setAttribute('max', '100')
        input.setAttribute('name', 'testRange')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Type below minimum
          cy.get('input').type('5').blur()
          cy.wait(200)
          
          // Should show error
          cy.get('.error-message').should('be.visible')
          cy.get('.error-message').should('contain.text', 'at least')
          
          // Type valid number
          cy.get('input').clear().type('50').blur()
          cy.wait(200)
          
          // Should clear error
          cy.get('.error-message').should('not.be.visible')
        })
      })
    })

    it('should show shake animation on validation error', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Required Field')
        input.setAttribute('required', '')
        input.setAttribute('name', 'testShake')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Focus and blur to trigger validation
          cy.get('input').focus().blur()
          cy.wait(200)
          
          // Should trigger shake animation
          cy.get('.input-field').should('have.css', 'animation-name', 'shake')
        })
      })
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('my-input[name="firstName"]').shadow().within(() => {
        cy.get('input').should('have.attr', 'aria-label')
        cy.get('input').should('have.attr', 'aria-invalid', 'false')
        cy.get('.error-message').should('have.attr', 'role', 'alert')
        cy.get('.error-message').should('have.attr', 'aria-live', 'polite')
      })
    })

    it('should handle keyboard navigation', () => {
      cy.get('my-input').first().focus()
      cy.focused().should('match', 'my-input')
      
      // Tab navigation
      cy.focused().tab()
      cy.focused().should('match', 'my-input')
    })

    it('should support Escape key to clear non-required fields', () => {
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type('test content')
        cy.get('input').trigger('keydown', { key: 'Escape' })
        cy.wait(100)
        cy.get('input').should('have.value', '')
      })
    })

    it('should support Enter key for form submission', () => {
      let submitEventFired = false
      
      cy.get('my-input').first().then(($input) => {
        $input.on('submit', () => {
          submitEventFired = true
        })
      })
      
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type('test{enter}')
        cy.wait(100)
      }).then(() => {
        expect(submitEventFired).to.be.true
      })
    })

    it('should update ARIA attributes during validation', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Required Field')
        input.setAttribute('required', '')
        input.setAttribute('name', 'testAria')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Initially valid
          cy.get('input').should('have.attr', 'aria-invalid', 'false')
          
          // Focus and blur to trigger validation
          cy.get('input').focus().blur()
          cy.wait(200)
          
          // Should update ARIA attributes
          cy.get('input').should('have.attr', 'aria-invalid', 'true')
          cy.get('input').should('have.attr', 'aria-describedby')
          
          // Fix validation
          cy.get('input').type('valid input').blur()
          cy.wait(200)
          
          // Should reset ARIA attributes
          cy.get('input').should('have.attr', 'aria-invalid', 'false')
        })
      })
    })

    it('should support focus-visible for keyboard navigation', () => {
      cy.get('my-input').first().focus()
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').should('have.css', 'outline')
      })
    })
  })

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle empty values gracefully', () => {
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').clear()
        cy.get('input').should('have.value', '')
      })
    })

    it('should handle very long input values', () => {
      const longText = 'A'.repeat(1000)
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type(longText.substring(0, 50)) // Type a portion
        cy.get('input').should('have.value')
      })
    })

    it('should handle special characters', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type(specialChars)
        cy.get('input').should('have.value', specialChars)
      })
    })

    it('should handle rapid state changes', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Rapid Changes')
        input.setAttribute('name', 'testRapid')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          // Rapid typing and clearing
          for (let i = 0; i < 5; i++) {
            cy.get('input').type('text').clear()
          }
          cy.get('input').should('have.value', '')
        })
      })
    })

    it('should handle programmatic value changes', () => {
      cy.get('my-input').first().then(($input) => {
        $input[0].value = 'programmatic value'
        cy.wrap($input).shadow().find('input').should('have.value', 'programmatic value')
      })
    })

    it('should handle textarea type with multiple lines', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('type', 'textarea')
        input.setAttribute('label', 'Multi-line Text')
        input.setAttribute('name', 'testTextarea')
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          cy.get('textarea').should('exist')
          cy.get('textarea').type('Line 1{shift+enter}Line 2{shift+enter}Line 3')
          cy.get('textarea').should('contain.value', 'Line 1\nLine 2\nLine 3')
        })
      })
    })

    it('should handle select type with options', () => {
      cy.document().then((doc) => {
        const input = doc.createElement('my-input')
        input.setAttribute('type', 'select')
        input.setAttribute('label', 'Select Option')
        input.setAttribute('name', 'testSelect')
        input.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(input)
        
        cy.wrap(input).shadow().within(() => {
          cy.get('select').should('exist')
          cy.get('option').should('have.length', 2)
          cy.get('select').select('option2')
          cy.get('select').should('have.value', 'option2')
        })
      })
    })
  })

  describe('Custom Events', () => {
    it('should emit input events with proper detail', () => {
      let inputEventDetail = null
      
      cy.get('my-input').first().then(($input) => {
        $input.on('input', (e) => {
          inputEventDetail = e.detail
        })
      })
      
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type('test')
      }).then(() => {
        expect(inputEventDetail).to.exist
        expect(inputEventDetail).to.have.property('value')
        expect(inputEventDetail).to.have.property('valid')
        expect(inputEventDetail).to.have.property('errors')
        expect(inputEventDetail).to.have.property('name')
      })
    })

    it('should emit change events', () => {
      let changeEventFired = false
      
      cy.get('my-input').first().then(($input) => {
        $input.on('change', () => {
          changeEventFired = true
        })
      })
      
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type('test').blur()
      }).then(() => {
        expect(changeEventFired).to.be.true
      })
    })

    it('should emit submit events on Enter key', () => {
      let submitEventFired = false
      
      cy.get('my-input').first().then(($input) => {
        $input.on('submit', () => {
          submitEventFired = true
        })
      })
      
      cy.get('my-input').first().shadow().within(() => {
        cy.get('input').type('test{enter}')
      }).then(() => {
        expect(submitEventFired).to.be.true
      })
    })
  })

  describe('Performance and Responsive Behavior', () => {
    it('should handle component creation and destruction', () => {
      cy.document().then((doc) => {
        // Create multiple inputs
        for (let i = 0; i < 10; i++) {
          const input = doc.createElement('my-input')
          input.setAttribute('name', `test${i}`)
          input.setAttribute('label', `Test ${i}`)
          doc.body.appendChild(input)
        }
        
        // Check they all exist
        cy.get('my-input[name^="test"]').should('have.length', 10)
        
        // Remove them
        cy.get('my-input[name^="test"]').then(($inputs) => {
          $inputs.each((index, element) => {
            element.remove()
          })
        })
      })
    })

    it('should maintain performance with rapid updates', () => {
      const startTime = performance.now()
      
      cy.get('my-input').first().shadow().within(() => {
        // Rapid typing simulation
        const text = 'Performance test with rapid typing'
        cy.get('input').type(text, { delay: 10 })
      }).then(() => {
        const endTime = performance.now()
        const duration = endTime - startTime
        // Should complete within reasonable time (less than 2 seconds)
        expect(duration).to.be.lessThan(2000)
      })
    })

    it('should be responsive at different viewport sizes', () => {
      // Test mobile viewport
      cy.viewport(375, 667)
      cy.get('my-input').first().should('be.visible')
      cy.get('my-input').first().shadow().find('.input-field').should('be.visible')
      
      // Test tablet viewport
      cy.viewport(768, 1024)
      cy.get('my-input').first().should('be.visible')
      
      // Test desktop viewport
      cy.viewport(1200, 800)
      cy.get('my-input').first().should('be.visible')
    })
  })
})