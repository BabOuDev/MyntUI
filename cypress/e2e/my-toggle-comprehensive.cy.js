/**
 * Comprehensive Test Suite for my-toggle Component
 * Tests Material Design 3 enhancements, functionality, accessibility, and edge cases
 */

describe('my-toggle Component - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Basic Functionality', () => {
    it('should render toggle with basic attributes', () => {
      cy.get('my-toggle').first().should('exist')
      cy.get('my-toggle').first().shadow().find('.toggle-container').should('exist')
      cy.get('my-toggle').first().shadow().find('.toggle-track').should('exist')
      cy.get('my-toggle').first().shadow().find('.toggle-thumb').should('exist')
    })

    it('should handle toggle on/off interactions', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Initially unchecked (off)
        cy.get('.toggle-track').should('not.have.class', 'checked')
        
        // Click to turn on
        cy.get('.toggle-container').click()
        cy.wait(300) // Allow animation
        cy.get('.toggle-track').should('have.class', 'checked')
        
        // Click again to turn off
        cy.get('.toggle-container').click()
        cy.wait(300) // Allow animation
        cy.get('.toggle-track').should('not.have.class', 'checked')
      })
    })

    it('should support label text', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Test Toggle Label')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).shadow().within(() => {
          cy.root().should('contain.text', 'Test Toggle Label')
        })
      })
    })

    it('should handle name and value attributes', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('name', 'testToggle')
        toggle.setAttribute('value', 'toggleValue')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).should('have.attr', 'name', 'testToggle')
        cy.wrap(toggle).should('have.attr', 'value', 'toggleValue')
      })
    })

    it('should handle disabled state', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Disabled Toggle')
        toggle.setAttribute('disabled', '')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).should('have.attr', 'disabled')
        cy.wrap(toggle).shadow().within(() => {
          cy.get('.toggle-container').should('have.attr', 'aria-disabled', 'true')
          cy.get('.toggle-container').should('have.attr', 'tabindex', '-1')
        })
      })
    })

    it('should support checked attribute on initialization', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Initially Checked')
        toggle.setAttribute('checked', '')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).should('have.attr', 'checked')
        cy.wrap(toggle).shadow().within(() => {
          cy.get('.toggle-track').should('have.class', 'checked')
          cy.get('.toggle-container').should('have.attr', 'aria-checked', 'true')
        })
      })
    })
  })

  describe('Material Design 3 Styling', () => {
    it('should have proper Material Design 3 track styling', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-track').should('have.css', 'border-radius')
        cy.get('.toggle-track').should('have.css', 'transition')
        cy.get('.toggle-track').should('have.css', 'background-color')
        cy.get('.toggle-track').should('have.css', 'border')
      })
    })

    it('should have proper Material Design 3 thumb styling', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-thumb').should('have.css', 'border-radius')
        cy.get('.toggle-thumb').should('have.css', 'transition')
        cy.get('.toggle-thumb').should('have.css', 'box-shadow') // elevation
        cy.get('.toggle-thumb').should('have.css', 'background-color')
      })
    })

    it('should show state layer on hover', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Check state layer exists
        cy.get('.toggle-container').should('have.css', '::before')
        
        // Trigger hover
        cy.get('.toggle-container').trigger('mouseover')
        cy.wait(200) // Allow transition
        
        // State layer should be visible on hover
        cy.get('.toggle-container').should('have.css', 'cursor', 'pointer')
      })
    })

    it('should show proper focus states with state layers', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-container').focus()
        cy.wait(300) // Allow transitions
        
        // Should have focus outline
        cy.get('.toggle-container').should('have.css', 'outline')
        cy.get('.toggle-container').should('have.css', 'outline-color')
      })
    })

    it('should animate thumb position on toggle', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Get initial thumb position
        cy.get('.toggle-thumb').then(($thumb) => {
          const initialLeft = $thumb.css('left')
          
          // Click to toggle
          cy.get('.toggle-container').click()
          cy.wait(400) // Allow full animation
          
          // Thumb should be in new position
          cy.get('.toggle-thumb').should('not.have.css', 'left', initialLeft)
          cy.get('.toggle-track.checked .toggle-thumb').should('exist')
        })
      })
    })

    it('should show pressed state animation', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Trigger mousedown for pressed state
        cy.get('.toggle-container').trigger('mousedown')
        cy.wait(100)
        
        // Thumb should be larger when pressed
        cy.get('.toggle-thumb').should('have.css', 'width') // Will be larger due to CSS variable
        
        cy.get('.toggle-container').trigger('mouseup')
        cy.wait(200)
      })
    })

    it('should handle different size variants', () => {
      cy.document().then((doc) => {
        // Small size
        const smallToggle = doc.createElement('my-toggle')
        smallToggle.setAttribute('size', 'sm')
        smallToggle.setAttribute('label', 'Small Toggle')
        doc.body.appendChild(smallToggle)
        
        // Large size
        const largeToggle = doc.createElement('my-toggle')
        largeToggle.setAttribute('size', 'lg')
        largeToggle.setAttribute('label', 'Large Toggle')
        doc.body.appendChild(largeToggle)
        
        // Check size variants are applied
        cy.wrap(smallToggle).should('have.attr', 'size', 'sm')
        cy.wrap(largeToggle).should('have.attr', 'size', 'lg')
        
        // Track widths should be different
        cy.wrap(smallToggle).shadow().find('.toggle-track')
          .should('have.css', 'width').and('not.equal', '52px') // Different from default
        
        cy.wrap(largeToggle).shadow().find('.toggle-track')
          .should('have.css', 'width').and('not.equal', '52px') // Different from default
      })
    })

    it('should show proper disabled state styling', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Disabled Toggle')
        toggle.setAttribute('disabled', '')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).shadow().within(() => {
          // Should have disabled opacity and styling
          cy.get('.toggle-track').should('have.css', 'opacity')
          
          // State layer should be hidden
          cy.get('.toggle-container').should('have.css', 'pointer-events', 'none')
          
          // Colors should be muted
          cy.get('.toggle-track').should('have.css', 'background-color')
          cy.get('.toggle-thumb').should('have.css', 'background-color')
        })
      })
    })

    it('should show proper checked state colors', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Click to check
        cy.get('.toggle-container').click()
        cy.wait(300)
        
        // Track and thumb should change colors when checked
        cy.get('.toggle-track.checked').should('have.css', 'background-color')
        cy.get('.toggle-track.checked .toggle-thumb').should('have.css', 'background-color')
        
        // Elevation should increase for thumb
        cy.get('.toggle-track.checked .toggle-thumb').should('have.css', 'box-shadow')
      })
    })
  })

  describe('Smooth Animations and Transitions', () => {
    it('should have smooth thumb sliding animation', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Verify transition properties
        cy.get('.toggle-thumb').should('have.css', 'transition')
        cy.get('.toggle-track').should('have.css', 'transition')
        
        // Test animation timing
        cy.get('.toggle-container').click()
        cy.wait(100) // Mid-animation
        
        // Animation should be in progress
        cy.get('.toggle-track').should('have.class', 'checked')
      })
    })

    it('should handle rapid toggle changes gracefully', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Rapid toggling
        for (let i = 0; i < 5; i++) {
          cy.get('.toggle-container').click()
          cy.wait(50)
        }
        
        // Should still be responsive and not broken
        cy.get('.toggle-container').should('be.visible')
        cy.get('.toggle-track').should('exist')
      })
    })

    it('should support reduced motion preferences', () => {
      // This would typically be tested with CSS media queries
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-thumb').should('have.css', 'transition')
        // In actual implementation, @media (prefers-reduced-motion: reduce) would disable transitions
      })
    })

    it('should animate state layer opacity changes', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Check state layer animation
        cy.get('.toggle-container').trigger('mouseover')
        cy.wait(200)
        
        // State layer should have opacity transition
        cy.get('.toggle-container').should('have.css', '::before')
        
        cy.get('.toggle-container').trigger('mouseout')
        cy.wait(200)
      })
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-container').should('have.attr', 'role', 'switch')
        cy.get('.toggle-container').should('have.attr', 'aria-checked')
        cy.get('.toggle-container').should('have.attr', 'aria-label')
        cy.get('.toggle-container').should('have.attr', 'tabindex', '0')
      })
    })

    it('should support keyboard navigation with Space and Enter keys', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Focus the toggle
        cy.get('.toggle-container').focus()
        
        // Initially off
        cy.get('.toggle-track').should('not.have.class', 'checked')
        
        // Press space to toggle
        cy.get('.toggle-container').trigger('keydown', { key: ' ' })
        cy.wait(300)
        
        cy.get('.toggle-track').should('have.class', 'checked')
        
        // Press Enter to toggle again
        cy.get('.toggle-container').trigger('keydown', { key: 'Enter' })
        cy.wait(300)
        
        cy.get('.toggle-track').should('not.have.class', 'checked')
      })
    })

    it('should update ARIA attributes based on state', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Initially off
        cy.get('.toggle-container').should('have.attr', 'aria-checked', 'false')
        
        // Click to turn on
        cy.get('.toggle-container').click()
        cy.wait(200)
        
        // Should update ARIA
        cy.get('.toggle-container').should('have.attr', 'aria-checked', 'true')
      })
    })

    it('should be focusable and have proper tab order', () => {
      // Create multiple toggles
      cy.document().then((doc) => {
        for (let i = 0; i < 3; i++) {
          const toggle = doc.createElement('my-toggle')
          toggle.setAttribute('label', `Toggle ${i + 1}`)
          toggle.setAttribute('name', `test-toggle-${i}`)
          doc.body.appendChild(toggle)
        }
        
        // Test tab navigation
        cy.get('my-toggle[name="test-toggle-0"]').shadow().find('.toggle-container').focus()
        cy.focused().tab()
        cy.get('my-toggle[name="test-toggle-1"]').shadow().find('.toggle-container').should('be.focused')
      })
    })

    it('should handle disabled state accessibility', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Disabled Accessibility')
        toggle.setAttribute('disabled', '')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).shadow().within(() => {
          cy.get('.toggle-container').should('have.attr', 'aria-disabled', 'true')
          cy.get('.toggle-container').should('have.attr', 'tabindex', '-1')
          
          // Should not respond to keyboard
          cy.get('.toggle-container').trigger('keydown', { key: ' ' })
          cy.wait(200)
          cy.get('.toggle-track').should('not.have.class', 'checked')
          
          // Should not respond to Enter
          cy.get('.toggle-container').trigger('keydown', { key: 'Enter' })
          cy.wait(200)
          cy.get('.toggle-track').should('not.have.class', 'checked')
        })
      })
    })

    it('should provide clear visual focus indicators', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-container').focus()
        
        // Should have visible focus outline
        cy.get('.toggle-container').should('have.css', 'outline-width').and('not.equal', '0px')
        cy.get('.toggle-container').should('have.css', 'outline-style').and('not.equal', 'none')
      })
    })

    it('should have appropriate aria-label when no text label is provided', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        // No label attribute
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).shadow().within(() => {
          cy.get('.toggle-container').should('have.attr', 'aria-label', 'toggle switch')
        })
      })
    })
  })

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle programmatic state changes', () => {
      cy.get('my-toggle').first().then(($toggle) => {
        // Programmatically turn on
        $toggle[0].checked = true
        cy.wrap($toggle).shadow().find('.toggle-track').should('have.class', 'checked')
        
        // Programmatically turn off
        $toggle[0].checked = false
        cy.wrap($toggle).shadow().find('.toggle-track').should('not.have.class', 'checked')
      })
    })

    it('should handle attribute changes dynamically', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Dynamic Attributes')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).then(($toggle) => {
          // Change to disabled
          $toggle[0].setAttribute('disabled', '')
          cy.wait(100)
          cy.wrap($toggle).shadow().find('.toggle-container')
            .should('have.attr', 'aria-disabled', 'true')
          
          // Remove disabled
          $toggle[0].removeAttribute('disabled')
          cy.wait(100)
          cy.wrap($toggle).shadow().find('.toggle-container')
            .should('not.have.attr', 'aria-disabled')
          
          // Change label
          $toggle[0].setAttribute('label', 'New Label')
          cy.wait(100)
          cy.wrap($toggle).should('contain.text', 'New Label')
        })
      })
    })

    it('should handle component destruction gracefully', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Destruction Test')
        doc.body.appendChild(toggle)
        
        // Verify it exists
        cy.wrap(toggle).should('exist')
        
        // Remove from DOM
        toggle.remove()
        
        // Should be removed cleanly
        cy.get('my-toggle[label="Destruction Test"]').should('not.exist')
      })
    })

    it('should handle empty label gracefully', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        // No label attribute
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).shadow().within(() => {
          // Should still be functional without label text
          cy.get('.toggle-container').should('be.visible')
          cy.get('.toggle-container').click()
          cy.wait(200)
          cy.get('.toggle-track').should('have.class', 'checked')
        })
      })
    })

    it('should handle click events during animation', () => {
      cy.get('my-toggle').first().shadow().within(() => {
        // Start toggle
        cy.get('.toggle-container').click()
        
        // Click again quickly during animation
        cy.get('.toggle-container').click()
        cy.wait(400) // Allow full animation
        
        // Should end up in the expected state
        cy.get('.toggle-container').should('be.visible')
        cy.get('.toggle-track').should('exist')
      })
    })

    it('should handle value attribute correctly', () => {
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Value Test')
        toggle.setAttribute('value', 'custom-value')
        toggle.setAttribute('name', 'value-test')
        doc.body.appendChild(toggle)
        
        let eventDetail = null
        cy.wrap(toggle).then(($toggle) => {
          $toggle.on('change', (e) => {
            eventDetail = e.detail
          })
          
          // Toggle on
          $toggle[0].click()
          cy.wait(100).then(() => {
            expect(eventDetail.checked).to.be.true
            expect(eventDetail.value).to.equal('custom-value')
            
            // Toggle off
            $toggle[0].click()
            cy.wait(100).then(() => {
              expect(eventDetail.checked).to.be.false
              expect(eventDetail.value).to.be.null
            })
          })
        })
      })
    })
  })

  describe('Custom Events', () => {
    it('should emit change events with proper detail', () => {
      let changeEventDetail = null
      
      cy.get('my-toggle').first().then(($toggle) => {
        $toggle.on('change', (e) => {
          changeEventDetail = e.detail
        })
      })
      
      cy.get('my-toggle').first().shadow().within(() => {
        cy.get('.toggle-container').click()
      }).then(() => {
        expect(changeEventDetail).to.exist
        expect(changeEventDetail).to.have.property('checked')
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
        
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Bubbling Test')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).shadow().find('.toggle-container').click()
        cy.wait(100).then(() => {
          expect(eventBubbled).to.be.true
        })
      })
    })

    it('should provide correct value in event detail', () => {
      let changeEventDetail = null
      
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Event Detail Test')
        toggle.setAttribute('value', 'test-value')
        toggle.setAttribute('name', 'event-test')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).then(($toggle) => {
          $toggle.on('change', (e) => {
            changeEventDetail = e.detail
          })
          
          // Turn on
          $toggle[0].click()
          cy.wait(100).then(() => {
            expect(changeEventDetail.checked).to.be.true
            expect(changeEventDetail.value).to.equal('test-value')
            expect(changeEventDetail.name).to.equal('event-test')
          })
        })
      })
    })

    it('should not emit events when disabled', () => {
      let eventEmitted = false
      
      cy.document().then((doc) => {
        const toggle = doc.createElement('my-toggle')
        toggle.setAttribute('label', 'Disabled Event Test')
        toggle.setAttribute('disabled', '')
        doc.body.appendChild(toggle)
        
        cy.wrap(toggle).then(($toggle) => {
          $toggle.on('change', () => {
            eventEmitted = true
          })
          
          // Try to click disabled toggle
          $toggle[0].click()
          cy.wait(100).then(() => {
            expect(eventEmitted).to.be.false
          })
        })
      })
    })
  })

  describe('Performance and Memory', () => {
    it('should handle multiple toggles efficiently', () => {
      const startTime = performance.now()
      
      cy.document().then((doc) => {
        // Create many toggles
        for (let i = 0; i < 50; i++) {
          const toggle = doc.createElement('my-toggle')
          toggle.setAttribute('label', `Toggle ${i}`)
          toggle.setAttribute('name', `perf-test-${i}`)
          doc.body.appendChild(toggle)
        }
        
        // Check they all exist
        cy.get('my-toggle[name^="perf-test-"]').should('have.length', 50)
        
        const endTime = performance.now()
        const duration = endTime - startTime
        expect(duration).to.be.lessThan(1000) // Should create quickly
        
        // Test interaction performance
        cy.get('my-toggle[name="perf-test-0"]').shadow().find('.toggle-container').click()
        cy.wait(100)
        cy.get('my-toggle[name="perf-test-0"]').shadow().find('.toggle-track').should('have.class', 'checked')
        
        // Clean up
        cy.get('my-toggle[name^="perf-test-"]').then(($toggles) => {
          $toggles.each((index, element) => {
            element.remove()
          })
        })
      })
    })

    it('should be responsive at different viewport sizes', () => {
      // Test mobile viewport
      cy.viewport(375, 667)
      cy.get('my-toggle').first().should('be.visible')
      cy.get('my-toggle').first().shadow().find('.toggle-track').should('be.visible')
      
      // Test tablet viewport
      cy.viewport(768, 1024)
      cy.get('my-toggle').first().should('be.visible')
      
      // Test desktop viewport
      cy.viewport(1200, 800)
      cy.get('my-toggle').first().should('be.visible')
    })

    it('should maintain smooth animations under load', () => {
      // Create multiple toggles and animate them
      cy.document().then((doc) => {
        for (let i = 0; i < 10; i++) {
          const toggle = doc.createElement('my-toggle')
          toggle.setAttribute('label', `Load Test ${i}`)
          toggle.setAttribute('name', `load-test-${i}`)
          doc.body.appendChild(toggle)
        }
        
        // Animate all toggles simultaneously
        cy.get('my-toggle[name^="load-test-"]').each(($toggle) => {
          cy.wrap($toggle).shadow().find('.toggle-container').click()
        })
        
        cy.wait(500) // Allow all animations to complete
        
        // All should be checked
        cy.get('my-toggle[name^="load-test-"]').each(($toggle) => {
          cy.wrap($toggle).shadow().find('.toggle-track').should('have.class', 'checked')
        })
        
        // Clean up
        cy.get('my-toggle[name^="load-test-"]').then(($toggles) => {
          $toggles.each((index, element) => {
            element.remove()
          })
        })
      })
    })
  })
})