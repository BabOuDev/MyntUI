/**
 * Comprehensive Test Suite for my-dropdown Component
 * Tests Material Design 3 enhancements, functionality, accessibility, and edge cases
 */

describe('my-dropdown Component - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Basic Functionality', () => {
    it('should render dropdown with basic attributes', () => {
      cy.get('my-dropdown').first().should('exist')
      cy.get('my-dropdown').first().shadow().find('.dropdown-trigger').should('exist')
      cy.get('my-dropdown').first().shadow().find('.dropdown-menu').should('exist')
    })

    it('should open and close dropdown on trigger click', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Initially closed
        cy.get('.dropdown-menu').should('not.have.class', 'open')
        
        // Click to open
        cy.get('.dropdown-trigger').click()
        cy.wait(300) // Allow animation
        cy.get('.dropdown-menu').should('have.class', 'open')
        
        // Click again to close
        cy.get('.dropdown-trigger').click()
        cy.wait(300) // Allow animation
        cy.get('.dropdown-menu').should('not.have.class', 'open')
      })
    })

    it('should handle options selection', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]))
        dropdown.setAttribute('placeholder', 'Select an option')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          
          // Check options are rendered
          cy.get('.dropdown-option').should('have.length', 3)
          cy.get('.dropdown-option').first().should('contain.text', 'Option 1')
          
          // Select an option
          cy.get('.dropdown-option').first().click()
          cy.wait(200)
          
          // Dropdown should close
          cy.get('.dropdown-menu').should('not.have.class', 'open')
          
          // Trigger should show selected value
          cy.get('.dropdown-trigger').should('contain.text', 'Option 1')
        })
      })
    })

    it('should support trigger text attribute', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Custom Trigger')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          cy.get('.dropdown-trigger').should('contain.text', 'Custom Trigger')
        })
      })
    })

    it('should handle disabled state', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('disabled', '')
        dropdown.setAttribute('trigger-text', 'Disabled Dropdown')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).should('have.attr', 'disabled')
        cy.wrap(dropdown).shadow().within(() => {
          // Should not open when clicked
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('not.have.class', 'open')
        })
      })
    })

    it('should support different positions', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('position', 'top')
        dropdown.setAttribute('trigger-text', 'Top Position')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).should('have.attr', 'position', 'top')
      })
    })
  })

  describe('Material Design 3 Styling', () => {
    it('should have proper trigger button Material Design 3 styling', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        cy.get('.dropdown-trigger').should('have.css', 'border-radius')
        cy.get('.dropdown-trigger').should('have.css', 'transition')
        cy.get('.dropdown-trigger').should('have.css', 'background-color')
        cy.get('.dropdown-trigger').should('have.css', 'box-shadow') // elevation
      })
    })

    it('should have proper dropdown menu Material Design 3 styling', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        cy.get('.dropdown-menu').should('have.css', 'border-radius')
        cy.get('.dropdown-menu').should('have.css', 'box-shadow') // elevation
        cy.get('.dropdown-menu').should('have.css', 'background-color')
        cy.get('.dropdown-menu').should('have.css', 'overflow', 'hidden')
      })
    })

    it('should show hover state on trigger', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Trigger hover
        cy.get('.dropdown-trigger').trigger('mouseover')
        cy.wait(200) // Allow transition
        
        // Should show hover styling
        cy.get('.dropdown-trigger').should('have.css', 'cursor', 'pointer')
      })
    })

    it('should show proper focus states with elevation', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        cy.get('.dropdown-trigger').focus()
        cy.wait(300) // Allow transitions
        
        // Should have focus styling
        cy.get('.dropdown-trigger').should('have.css', 'outline')
      })
    })

    it('should animate menu opening and closing', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Check transition properties exist
        cy.get('.dropdown-menu').should('have.css', 'transition')
        
        // Open menu
        cy.get('.dropdown-trigger').click()
        cy.wait(150) // Mid-animation
        
        // Should have open class during animation
        cy.get('.dropdown-menu').should('have.class', 'open')
        
        cy.wait(200) // Complete animation
        
        // Close menu
        cy.get('.dropdown-trigger').click()
        cy.wait(300) // Allow close animation
      })
    })

    it('should show hover states on dropdown options', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          
          // Hover over an option
          cy.get('.dropdown-option').first().trigger('mouseover')
          cy.wait(100)
          
          // Should show hover styling
          cy.get('.dropdown-option').first().should('have.css', 'cursor', 'pointer')
        })
      })
    })

    it('should show proper disabled state styling', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('disabled', '')
        dropdown.setAttribute('trigger-text', 'Disabled Dropdown')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Should have disabled styling
          cy.get('.dropdown-trigger').should('have.css', 'opacity')
          cy.get('.dropdown-trigger').should('have.css', 'cursor', 'not-allowed')
        })
      })
    })

    it('should have proper elevation changes on interaction', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Get initial elevation
        cy.get('.dropdown-menu').should('have.css', 'box-shadow')
        
        // Open dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(300)
        
        // Menu should be visible with elevation
        cy.get('.dropdown-menu.open').should('have.css', 'box-shadow')
        cy.get('.dropdown-menu.open').should('be.visible')
      })
    })
  })

  describe('Advanced Dropdown Features', () => {
    it('should handle complex option objects', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'user1', label: 'John Doe', description: 'Administrator' },
          { value: 'user2', label: 'Jane Smith', description: 'Editor', disabled: true },
          { value: 'user3', label: 'Mike Johnson', description: 'Viewer' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          
          // Check options are rendered with extra data
          cy.get('.dropdown-option').should('have.length', 3)
          cy.get('.dropdown-option').first().should('contain.text', 'John Doe')
          
          // Check disabled option
          cy.get('.dropdown-option').eq(1).should('have.attr', 'disabled')
          cy.get('.dropdown-option').eq(1).should('have.css', 'opacity')
        })
      })
    })

    it('should support option groups/categories', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'fruits-header', label: 'Fruits', isHeader: true },
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'vegetables-header', label: 'Vegetables', isHeader: true },
          { value: 'carrot', label: 'Carrot' },
          { value: 'lettuce', label: 'Lettuce' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          
          // Check headers and options
          cy.get('.dropdown-option, .dropdown-header').should('have.length', 6)
        })
      })
    })

    it('should position dropdown correctly relative to trigger', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        dropdown.style.position = 'absolute'
        dropdown.style.top = '100px'
        dropdown.style.left = '100px'
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          
          // Menu should be positioned relative to trigger
          cy.get('.dropdown-menu.open').should('be.visible')
          cy.get('.dropdown-menu.open').should('have.css', 'position', 'absolute')
        })
      })
    })

    it('should handle search/filtering functionality', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('searchable', 'true')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'apple', label: 'Apple' },
          { value: 'apricot', label: 'Apricot' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          
          // Should have search input if searchable
          if (dropdown.hasAttribute('searchable')) {
            cy.get('.dropdown-search').should('exist')
            
            // Type to filter
            cy.get('.dropdown-search').type('ap')
            cy.wait(100)
            
            // Should show filtered results
            cy.get('.dropdown-option:visible').should('have.length.lessThan', 4)
          }
        })
      })
    })
  })

  describe('Keyboard Navigation and Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        cy.get('.dropdown-trigger').should('have.attr', 'role', 'button')
        cy.get('.dropdown-trigger').should('have.attr', 'aria-haspopup', 'true')
        cy.get('.dropdown-trigger').should('have.attr', 'aria-expanded', 'false')
        cy.get('.dropdown-menu').should('have.attr', 'role', 'menu')
      })
    })

    it('should update ARIA attributes when opened/closed', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Initially closed
        cy.get('.dropdown-trigger').should('have.attr', 'aria-expanded', 'false')
        
        // Open dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(200)
        
        // Should update ARIA
        cy.get('.dropdown-trigger').should('have.attr', 'aria-expanded', 'true')
        
        // Close dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(200)
        
        // Should reset ARIA
        cy.get('.dropdown-trigger').should('have.attr', 'aria-expanded', 'false')
      })
    })

    it('should support keyboard navigation with arrow keys', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Focus and open with Enter
          cy.get('.dropdown-trigger').focus()
          cy.get('.dropdown-trigger').trigger('keydown', { key: 'Enter' })
          cy.wait(200)
          
          // Should be open
          cy.get('.dropdown-menu').should('have.class', 'open')
          
          // Navigate with arrow keys
          cy.get('.dropdown-trigger').trigger('keydown', { key: 'ArrowDown' })
          cy.wait(100)
          
          // First option should be focused/highlighted
          cy.get('.dropdown-option.focused, .dropdown-option.highlighted').should('exist')
        })
      })
    })

    it('should open on Enter and Space keys', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Focus trigger
        cy.get('.dropdown-trigger').focus()
        
        // Open with Enter
        cy.get('.dropdown-trigger').trigger('keydown', { key: 'Enter' })
        cy.wait(200)
        cy.get('.dropdown-menu').should('have.class', 'open')
        
        // Close with Escape
        cy.get('.dropdown-trigger').trigger('keydown', { key: 'Escape' })
        cy.wait(200)
        cy.get('.dropdown-menu').should('not.have.class', 'open')
        
        // Open with Space
        cy.get('.dropdown-trigger').trigger('keydown', { key: ' ' })
        cy.wait(200)
        cy.get('.dropdown-menu').should('have.class', 'open')
      })
    })

    it('should close on Escape key', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Open dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(200)
        cy.get('.dropdown-menu').should('have.class', 'open')
        
        // Close with Escape
        cy.get('.dropdown-trigger').trigger('keydown', { key: 'Escape' })
        cy.wait(200)
        cy.get('.dropdown-menu').should('not.have.class', 'open')
      })
    })

    it('should handle disabled state accessibility', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('disabled', '')
        dropdown.setAttribute('trigger-text', 'Disabled Dropdown')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          cy.get('.dropdown-trigger').should('have.attr', 'aria-disabled', 'true')
          cy.get('.dropdown-trigger').should('have.attr', 'tabindex', '-1')
          
          // Should not respond to keyboard
          cy.get('.dropdown-trigger').trigger('keydown', { key: 'Enter' })
          cy.wait(200)
          cy.get('.dropdown-menu').should('not.have.class', 'open')
        })
      })
    })

    it('should manage focus properly', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Focus trigger and open
          cy.get('.dropdown-trigger').focus()
          cy.get('.dropdown-trigger').trigger('keydown', { key: 'Enter' })
          cy.wait(200)
          
          // Focus should move to first option or stay on trigger
          cy.get('.dropdown-trigger').should('be.focused').or(
            cy.get('.dropdown-option').first().should('be.focused')
          )
          
          // Close and focus should return to trigger
          cy.get('.dropdown-trigger').trigger('keydown', { key: 'Escape' })
          cy.wait(200)
          cy.get('.dropdown-trigger').should('be.focused')
        })
      })
    })
  })

  describe('Outside Click and Focus Management', () => {
    it('should close dropdown when clicking outside', () => {
      cy.get('my-dropdown').first().shadow().within(() => {
        // Open dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(200)
        cy.get('.dropdown-menu').should('have.class', 'open')
        
        // Click outside (on document body)
        cy.get('body').click({ force: true })
        cy.wait(200)
        cy.get('.dropdown-menu').should('not.have.class', 'open')
      })
    })

    it('should not close when clicking inside dropdown menu', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
          
          // Click on menu (but not on option)
          cy.get('.dropdown-menu').click()
          cy.wait(100)
          cy.get('.dropdown-menu').should('have.class', 'open')
        })
      })
    })

    it('should close when selecting an option', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
          
          // Click on an option
          cy.get('.dropdown-option').first().click()
          cy.wait(200)
          
          // Should close
          cy.get('.dropdown-menu').should('not.have.class', 'open')
        })
      })
    })

    it('should handle multiple dropdowns without interference', () => {
      cy.document().then((doc) => {
        const dropdown1 = doc.createElement('my-dropdown')
        dropdown1.setAttribute('trigger-text', 'Dropdown 1')
        dropdown1.setAttribute('id', 'dropdown-1')
        dropdown1.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        doc.body.appendChild(dropdown1)
        
        const dropdown2 = doc.createElement('my-dropdown')
        dropdown2.setAttribute('trigger-text', 'Dropdown 2')
        dropdown2.setAttribute('id', 'dropdown-2')
        dropdown2.setAttribute('options', JSON.stringify([
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(dropdown2)
        
        // Open first dropdown
        cy.get('#dropdown-1').shadow().within(() => {
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
        })
        
        // Open second dropdown (should close first)
        cy.get('#dropdown-2').shadow().within(() => {
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
        })
        
        // First should be closed
        cy.get('#dropdown-1').shadow().within(() => {
          cy.get('.dropdown-menu').should('not.have.class', 'open')
        })
      })
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty options array', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', '[]')
        dropdown.setAttribute('trigger-text', 'Empty Options')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Should still open but show no options
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
          cy.get('.dropdown-option').should('have.length', 0)
        })
      })
    })

    it('should handle invalid JSON options gracefully', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', 'invalid-json')
        dropdown.setAttribute('trigger-text', 'Invalid Options')
        doc.body.appendChild(dropdown)
        
        // Should not crash
        cy.wrap(dropdown).should('be.visible')
        cy.wrap(dropdown).shadow().within(() => {
          cy.get('.dropdown-trigger').should('contain.text', 'Invalid Options')
        })
      })
    })

    it('should handle dynamic option updates', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).then(($dropdown) => {
          // Update options
          $dropdown[0].setAttribute('options', JSON.stringify([
            { value: 'new1', label: 'New Option 1' },
            { value: 'new2', label: 'New Option 2' }
          ]))
          
          cy.wait(100)
          
          cy.wrap($dropdown).shadow().within(() => {
            // Open and check new options
            cy.get('.dropdown-trigger').click()
            cy.wait(200)
            cy.get('.dropdown-option').should('have.length', 2)
            cy.get('.dropdown-option').first().should('contain.text', 'New Option 1')
          })
        })
      })
    })

    it('should handle programmatic value changes', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).then(($dropdown) => {
          // Set value programmatically
          $dropdown[0].value = 'option2'
          
          cy.wait(100)
          
          cy.wrap($dropdown).shadow().within(() => {
            // Trigger should show selected value
            cy.get('.dropdown-trigger').should('contain.text', 'Option 2')
          })
        })
      })
    })

    it('should handle component destruction during open state', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
          
          // Remove component
          dropdown.remove()
          
          // Should not cause errors
          cy.wait(100)
        })
      })
    })
  })

  describe('Custom Events', () => {
    it('should emit open and close events', () => {
      let openEventFired = false
      let closeEventFired = false
      
      cy.get('my-dropdown').first().then(($dropdown) => {
        $dropdown.on('open', () => {
          openEventFired = true
        })
        $dropdown.on('close', () => {
          closeEventFired = true
        })
      })
      
      cy.get('my-dropdown').first().shadow().within(() => {
        // Open dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(200)
        
        // Close dropdown
        cy.get('.dropdown-trigger').click()
        cy.wait(200)
      }).then(() => {
        expect(openEventFired).to.be.true
        expect(closeEventFired).to.be.true
      })
    })

    it('should emit selection events with proper detail', () => {
      let selectionDetail = null
      
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]))
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).then(($dropdown) => {
          $dropdown.on('select', (e) => {
            selectionDetail = e.detail
          })
          
          cy.wrap($dropdown).shadow().within(() => {
            // Open and select option
            cy.get('.dropdown-trigger').click()
            cy.wait(200)
            cy.get('.dropdown-option').first().click()
            cy.wait(100)
          }).then(() => {
            expect(selectionDetail).to.exist
            expect(selectionDetail).to.have.property('value', 'option1')
            expect(selectionDetail).to.have.property('label', 'Option 1')
          })
        })
      })
    })

    it('should emit events that bubble', () => {
      let eventBubbled = false
      
      cy.document().then((doc) => {
        doc.addEventListener('open', () => {
          eventBubbled = true
        })
        
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('trigger-text', 'Bubbling Test')
        doc.body.appendChild(dropdown)
        
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').click()
        cy.wait(200).then(() => {
          expect(eventBubbled).to.be.true
        })
      })
    })
  })

  describe('Performance and Responsiveness', () => {
    it('should handle large option lists efficiently', () => {
      const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i + 1}`
      }))
      
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify(largeOptions))
        dropdown.setAttribute('trigger-text', 'Large List')
        doc.body.appendChild(dropdown)
        
        const startTime = performance.now()
        
        cy.wrap(dropdown).shadow().within(() => {
          // Open dropdown
          cy.get('.dropdown-trigger').click()
          cy.wait(500) // Allow rendering
          
          // Should render efficiently
          cy.get('.dropdown-option').should('have.length', 1000)
          
          const endTime = performance.now()
          const duration = endTime - startTime
          expect(duration).to.be.lessThan(2000) // Should render within 2 seconds
          
          // Close dropdown
          cy.get('.dropdown-trigger').click()
        })
      })
    })

    it('should be responsive at different viewport sizes', () => {
      cy.document().then((doc) => {
        const dropdown = doc.createElement('my-dropdown')
        dropdown.setAttribute('options', JSON.stringify([
          { value: 'option1', label: 'Option 1' }
        ]))
        dropdown.setAttribute('trigger-text', 'Responsive Test')
        doc.body.appendChild(dropdown)
        
        // Test mobile viewport
        cy.viewport(375, 667)
        cy.wrap(dropdown).should('be.visible')
        cy.wrap(dropdown).shadow().find('.dropdown-trigger').should('be.visible')
        
        // Test tablet viewport
        cy.viewport(768, 1024)
        cy.wrap(dropdown).should('be.visible')
        
        // Test desktop viewport
        cy.viewport(1200, 800)
        cy.wrap(dropdown).should('be.visible')
      })
    })

    it('should maintain performance with multiple dropdowns', () => {
      cy.document().then((doc) => {
        // Create multiple dropdowns
        for (let i = 0; i < 10; i++) {
          const dropdown = doc.createElement('my-dropdown')
          dropdown.setAttribute('options', JSON.stringify([
            { value: `option${i}1`, label: `Option ${i}-1` },
            { value: `option${i}2`, label: `Option ${i}-2` }
          ]))
          dropdown.setAttribute('trigger-text', `Dropdown ${i + 1}`)
          dropdown.setAttribute('id', `perf-dropdown-${i}`)
          doc.body.appendChild(dropdown)
        }
        
        // Test that they all work
        cy.get('my-dropdown[id^="perf-dropdown-"]').should('have.length', 10)
        
        // Test interaction performance
        cy.get('#perf-dropdown-0').shadow().within(() => {
          cy.get('.dropdown-trigger').click()
          cy.wait(200)
          cy.get('.dropdown-menu').should('have.class', 'open')
        })
        
        // Clean up
        cy.get('my-dropdown[id^="perf-dropdown-"]').then(($dropdowns) => {
          $dropdowns.each((index, element) => {
            element.remove()
          })
        })
      })
    })
  })
})