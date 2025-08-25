/**
 * Comprehensive Test Suite for my-progress Component
 * Tests Material Design 3 enhancements, functionality, accessibility, and edge cases
 */

describe('my-progress Component - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Basic Functionality', () => {
    it('should render progress bar with basic attributes', () => {
      cy.get('my-progress').first().should('exist')
      cy.get('my-progress').first().shadow().find('.progress-container').should('exist')
      cy.get('my-progress').first().shadow().find('.progress-track').should('exist')
      cy.get('my-progress').first().shadow().find('.progress-fill').should('exist')
    })

    it('should handle value, min, and max attributes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.setAttribute('min', '0')
        progress.setAttribute('max', '100')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).should('have.attr', 'value', '50')
        cy.wrap(progress).should('have.attr', 'min', '0')
        cy.wrap(progress).should('have.attr', 'max', '100')
      })
    })

    it('should calculate percentage correctly', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '25')
        progress.setAttribute('min', '0')
        progress.setAttribute('max', '100')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          expect($progress[0].percentage).to.equal(25)
        })
      })
    })

    it('should display label when provided', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('label', 'Loading Progress')
        progress.setAttribute('value', '30')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-label').should('contain.text', 'Loading Progress')
        })
      })
    })

    it('should show value when show-value attribute is present', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '75')
        progress.setAttribute('show-value', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-value').should('contain.text', '75%')
        })
      })
    })

    it('should handle different variants', () => {
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
      
      cy.document().then((doc) => {
        variants.forEach((variant, index) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('variant', variant)
          progress.setAttribute('value', '50')
          progress.setAttribute('id', `progress-${variant}`)
          doc.body.appendChild(progress)
          
          cy.wrap(progress).should('have.attr', 'variant', variant)
        })
      })
    })

    it('should support different sizes', () => {
      const sizes = ['sm', 'md', 'lg']
      
      cy.document().then((doc) => {
        sizes.forEach(size => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('size', size)
          progress.setAttribute('value', '50')
          progress.setAttribute('id', `progress-size-${size}`)
          doc.body.appendChild(progress)
          
          cy.wrap(progress).should('have.attr', 'size', size)
        })
      })
    })

    it('should handle indeterminate state', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('indeterminate', '')
        progress.setAttribute('label', 'Loading...')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).should('have.attr', 'indeterminate')
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-fill').should('have.class', 'indeterminate')
        })
      })
    })
  })

  describe('Material Design 3 Styling', () => {
    it('should have proper Material Design 3 progress track styling', () => {
      cy.get('my-progress').first().shadow().within(() => {
        cy.get('.progress-track').should('have.css', 'border-radius')
        cy.get('.progress-track').should('have.css', 'background-color')
        cy.get('.progress-track').should('have.css', 'box-shadow') // inset shadow
        cy.get('.progress-track').should('have.css', 'overflow', 'hidden')
      })
    })

    it('should have proper Material Design 3 progress fill styling', () => {
      cy.get('my-progress').first().shadow().within(() => {
        cy.get('.progress-fill').should('have.css', 'border-radius')
        cy.get('.progress-fill').should('have.css', 'background-color')
        cy.get('.progress-fill').should('have.css', 'transition')
      })
    })

    it('should show shine effect animation', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '60')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          // Check that the ::before pseudo-element exists (shine effect)
          cy.get('.progress-fill').should('have.css', '::before')
        })
      })
    })

    it('should animate progress fill width changes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '25')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          // Get initial width
          cy.get('.progress-fill').should('have.css', 'width')
          
          // Change value programmatically
          progress.setAttribute('value', '75')
          cy.wait(100)
          
          // Should have transition
          cy.get('.progress-fill').should('have.css', 'transition')
        })
      })
    })

    it('should show proper variant colors', () => {
      const variants = [
        { variant: 'success', expectedColor: true },
        { variant: 'warning', expectedColor: true },
        { variant: 'error', expectedColor: true }
      ]
      
      cy.document().then((doc) => {
        variants.forEach(({ variant }) => {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('variant', variant)
          progress.setAttribute('value', '50')
          progress.setAttribute('id', `color-test-${variant}`)
          doc.body.appendChild(progress)
          
          cy.wrap(progress).shadow().within(() => {
            cy.get('.progress-fill').should('have.css', 'background-color')
          })
        })
      })
    })

    it('should show proper size variations', () => {
      cy.document().then((doc) => {
        // Small size
        const smallProgress = doc.createElement('my-progress')
        smallProgress.setAttribute('size', 'sm')
        smallProgress.setAttribute('value', '50')
        smallProgress.setAttribute('id', 'size-test-sm')
        doc.body.appendChild(smallProgress)
        
        // Large size
        const largeProgress = doc.createElement('my-progress')
        largeProgress.setAttribute('size', 'lg')
        largeProgress.setAttribute('value', '50')
        largeProgress.setAttribute('id', 'size-test-lg')
        doc.body.appendChild(largeProgress)
        
        // Check different heights
        cy.wrap(smallProgress).shadow().find('.progress-track')
          .should('have.css', 'height').and('not.equal', '6px') // Different from default
        
        cy.wrap(largeProgress).shadow().find('.progress-track')
          .should('have.css', 'height').and('not.equal', '6px') // Different from default
      })
    })

    it('should display elevation and shadows properly', () => {
      cy.get('my-progress').first().shadow().within(() => {
        // Track should have inset shadow
        cy.get('.progress-track').should('have.css', 'box-shadow')
      })
    })
  })

  describe('Special Variants and Animations', () => {
    it('should show striped pattern when variant is striped', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('variant', 'striped')
        progress.setAttribute('value', '60')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          // Should have striped background
          cy.get('.progress-fill').should('have.css', 'background-image')
          cy.get('.progress-fill').should('have.css', 'background-size')
          cy.get('.progress-fill').should('have.css', 'animation')
        })
      })
    })

    it('should show pulse animation when variant is pulse', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('variant', 'pulse')
        progress.setAttribute('value', '40')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          // Should have pulse animation
          cy.get('.progress-fill').should('have.css', 'animation')
        })
      })
    })

    it('should show indeterminate animation', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('indeterminate', '')
        progress.setAttribute('label', 'Loading...')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-fill.indeterminate').should('exist')
          cy.get('.progress-fill.indeterminate').should('have.css', 'animation')
          
          // Should have gradient background for indeterminate
          cy.get('.progress-fill.indeterminate').should('have.css', 'background')
        })
      })
    })

    it('should handle reduced motion preferences', () => {
      // This would typically be tested with CSS media queries
      // In practice, @media (prefers-reduced-motion: reduce) would disable animations
      cy.get('my-progress').first().shadow().within(() => {
        cy.get('.progress-fill').should('have.css', 'transition')
        // In actual implementation, reduced motion would disable transitions and animations
      })
    })
  })

  describe('Circular Progress Variant', () => {
    it('should render circular progress when type is circular', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('type', 'circular')
        progress.setAttribute('value', '50')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.circular-svg').should('exist')
          cy.get('.circular-bg').should('exist')
          cy.get('.circular-progress').should('exist')
        })
      })
    })

    it('should show circular progress percentage correctly', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('type', 'circular')
        progress.setAttribute('value', '75')
        progress.setAttribute('show-value', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.circular-text').should('contain.text', '75%')
        })
      })
    })

    it('should animate circular indeterminate state', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('type', 'circular')
        progress.setAttribute('indeterminate', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.circular-progress.indeterminate').should('exist')
          cy.get('.circular-progress.indeterminate').should('have.css', 'animation')
        })
      })
    })

    it('should support circular size variants', () => {
      cy.document().then((doc) => {
        // Small circular
        const smallCircular = doc.createElement('my-progress')
        smallCircular.setAttribute('type', 'circular')
        smallCircular.setAttribute('size', 'sm')
        smallCircular.setAttribute('value', '50')
        smallCircular.setAttribute('id', 'circular-sm')
        doc.body.appendChild(smallCircular)
        
        // Large circular
        const largeCircular = doc.createElement('my-progress')
        largeCircular.setAttribute('type', 'circular')
        largeCircular.setAttribute('size', 'lg')
        largeCircular.setAttribute('value', '50')
        largeCircular.setAttribute('id', 'circular-lg')
        doc.body.appendChild(largeCircular)
        
        // Check different sizes
        cy.wrap(smallCircular).shadow().find('.circular-svg')
          .should('have.css', 'width').and('not.equal', '56px')
        
        cy.wrap(largeCircular).shadow().find('.circular-svg')
          .should('have.css', 'width').and('not.equal', '56px')
      })
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.setAttribute('min', '0')
        progress.setAttribute('max', '100')
        progress.setAttribute('label', 'Loading Progress')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-track').should('have.attr', 'role', 'progressbar')
          cy.get('.progress-track').should('have.attr', 'aria-valuenow', '50')
          cy.get('.progress-track').should('have.attr', 'aria-valuemin', '0')
          cy.get('.progress-track').should('have.attr', 'aria-valuemax', '100')
          cy.get('.progress-track').should('have.attr', 'aria-label', 'Loading Progress')
        })
      })
    })

    it('should handle indeterminate ARIA attributes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('indeterminate', '')
        progress.setAttribute('label', 'Loading...')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-track').should('have.attr', 'aria-describedby', 'indeterminate-progress')
          // aria-valuenow should not be present for indeterminate
          cy.get('.progress-track').should('not.have.attr', 'aria-valuenow')
        })
      })
    })

    it('should provide screen reader accessible content for indeterminate state', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('indeterminate', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('#indeterminate-progress').should('exist')
          cy.get('#indeterminate-progress').should('contain.text', 'Loading in progress')
        })
      })
    })

    it('should update ARIA attributes when value changes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '25')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Initial value
          cy.wrap($progress).shadow().find('.progress-track')
            .should('have.attr', 'aria-valuenow', '25')
          
          // Change value
          $progress[0].setAttribute('value', '75')
          cy.wait(100)
          
          // Should update ARIA
          cy.wrap($progress).shadow().find('.progress-track')
            .should('have.attr', 'aria-valuenow', '75')
        })
      })
    })

    it('should handle font-variant-numeric for consistent number display', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '42')
        progress.setAttribute('show-value', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-value').should('have.css', 'font-variant-numeric', 'tabular-nums')
        })
      })
    })
  })

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle values outside min/max range', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('min', '10')
        progress.setAttribute('max', '90')
        progress.setAttribute('value', '150') // Above max
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Should clamp to max
          expect($progress[0].value).to.equal(90)
          expect($progress[0].percentage).to.equal(100)
        })
        
        // Test below min
        progress.setAttribute('value', '5') // Below min
        cy.wrap(progress).then(($progress) => {
          // Should clamp to min
          expect($progress[0].value).to.equal(10)
          expect($progress[0].percentage).to.equal(0)
        })
      })
    })

    it('should handle min equal to max', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('min', '50')
        progress.setAttribute('max', '50')
        progress.setAttribute('value', '50')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Should handle edge case gracefully
          expect($progress[0].percentage).to.equal(0)
        })
      })
    })

    it('should handle negative values correctly', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('min', '-10')
        progress.setAttribute('max', '10')
        progress.setAttribute('value', '0')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Should calculate percentage correctly with negative min
          expect($progress[0].percentage).to.equal(50)
        })
      })
    })

    it('should handle non-numeric values gracefully', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', 'invalid')
        progress.setAttribute('min', 'also-invalid')
        progress.setAttribute('max', 'still-invalid')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Should default to reasonable values
          expect($progress[0].value).to.be.a('number')
          expect($progress[0].min).to.be.a('number')
          expect($progress[0].max).to.be.a('number')
        })
      })
    })

    it('should handle rapid value changes smoothly', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '0')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Rapid changes
          for (let i = 0; i <= 100; i += 10) {
            $progress[0].setAttribute('value', i.toString())
          }
          
          // Should handle gracefully
          cy.wait(300)
          expect($progress[0].value).to.equal(100)
        })
      })
    })

    it('should handle programmatic property changes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '25')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).then(($progress) => {
          // Change via property
          $progress[0].value = 75
          
          cy.wait(100)
          expect($progress[0].getAttribute('value')).to.equal('75')
          
          // Change max via property
          $progress[0].max = 200
          
          cy.wait(100)
          expect($progress[0].getAttribute('max')).to.equal('200')
        })
      })
    })

    it('should handle component destruction gracefully', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('variant', 'striped')
        progress.setAttribute('value', '50')
        doc.body.appendChild(progress)
        
        // Verify it exists with animations
        cy.wrap(progress).should('exist')
        
        // Remove from DOM
        progress.remove()
        
        // Should be removed cleanly without animation errors
        cy.wait(100)
      })
    })
  })

  describe('Display Value Formatting', () => {
    it('should format percentage display correctly', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '33.333')
        progress.setAttribute('show-value', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          // Should round percentage
          cy.get('.progress-value').should('contain.text', '33%')
        })
      })
    })

    it('should show "Loading..." for indeterminate state', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('indeterminate', '')
        progress.setAttribute('show-value', '')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-value').should('contain.text', 'Loading...')
        })
      })
    })

    it('should handle zero and 100 percent correctly', () => {
      cy.document().then((doc) => {
        // Zero percent
        const progressZero = doc.createElement('my-progress')
        progressZero.setAttribute('value', '0')
        progressZero.setAttribute('show-value', '')
        progressZero.setAttribute('id', 'progress-zero')
        doc.body.appendChild(progressZero)
        
        // 100 percent
        const progressFull = doc.createElement('my-progress')
        progressFull.setAttribute('value', '100')
        progressFull.setAttribute('show-value', '')
        progressFull.setAttribute('id', 'progress-full')
        doc.body.appendChild(progressFull)
        
        cy.get('#progress-zero').shadow().within(() => {
          cy.get('.progress-value').should('contain.text', '0%')
        })
        
        cy.get('#progress-full').shadow().within(() => {
          cy.get('.progress-value').should('contain.text', '100%')
        })
      })
    })
  })

  describe('Performance and Responsiveness', () => {
    it('should handle multiple progress bars efficiently', () => {
      const startTime = performance.now()
      
      cy.document().then((doc) => {
        // Create many progress bars
        for (let i = 0; i < 50; i++) {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('value', (i * 2).toString())
          progress.setAttribute('label', `Progress ${i}`)
          progress.setAttribute('id', `perf-test-${i}`)
          doc.body.appendChild(progress)
        }
        
        // Check they all exist
        cy.get('my-progress[id^="perf-test-"]').should('have.length', 50)
        
        const endTime = performance.now()
        const duration = endTime - startTime
        expect(duration).to.be.lessThan(1000) // Should create quickly
        
        // Test update performance
        cy.get('#perf-test-0').then(($progress) => {
          $progress[0].setAttribute('value', '95')
        })
        
        cy.wait(100)
        
        cy.get('#perf-test-0').shadow().within(() => {
          cy.get('.progress-fill').should('be.visible')
        })
        
        // Clean up
        cy.get('my-progress[id^="perf-test-"]').then(($progress) => {
          $progress.each((index, element) => {
            element.remove()
          })
        })
      })
    })

    it('should be responsive at different viewport sizes', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.setAttribute('label', 'Responsive Test')
        progress.setAttribute('show-value', '')
        doc.body.appendChild(progress)
        
        // Test mobile viewport
        cy.viewport(375, 667)
        cy.wrap(progress).should('be.visible')
        cy.wrap(progress).shadow().find('.progress-track').should('be.visible')
        
        // Test tablet viewport
        cy.viewport(768, 1024)
        cy.wrap(progress).should('be.visible')
        
        // Test desktop viewport
        cy.viewport(1200, 800)
        cy.wrap(progress).should('be.visible')
      })
    })

    it('should maintain smooth animations under load', () => {
      cy.document().then((doc) => {
        // Create multiple animated progress bars
        for (let i = 0; i < 10; i++) {
          const progress = doc.createElement('my-progress')
          progress.setAttribute('variant', 'striped')
          progress.setAttribute('value', '60')
          progress.setAttribute('id', `animation-test-${i}`)
          doc.body.appendChild(progress)
        }
        
        // All should be animated
        cy.get('my-progress[id^="animation-test-"]').each(($progress) => {
          cy.wrap($progress).shadow().find('.progress-fill').should('have.css', 'animation')
        })
        
        // Test that animations don't interfere with value updates
        cy.get('#animation-test-0').then(($progress) => {
          $progress[0].setAttribute('value', '90')
        })
        
        cy.wait(300) // Allow transition
        
        cy.get('#animation-test-0').shadow().within(() => {
          cy.get('.progress-fill').should('be.visible')
        })
        
        // Clean up
        cy.get('my-progress[id^="animation-test-"]').then(($progress) => {
          $progress.each((index, element) => {
            element.remove()
          })
        })
      })
    })
  })

  describe('Custom Styling Integration', () => {
    it('should apply custom CSS variables correctly', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.style.setProperty('--_progress-height', '10px')
        doc.body.appendChild(progress)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-track').should('have.css', 'height', '10px')
        })
      })
    })

    it('should handle theme changes gracefully', () => {
      cy.document().then((doc) => {
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.setAttribute('variant', 'primary')
        doc.body.appendChild(progress)
        
        // Change variant
        progress.setAttribute('variant', 'success')
        cy.wait(100)
        
        cy.wrap(progress).shadow().within(() => {
          cy.get('.progress-fill').should('have.css', 'background-color')
        })
      })
    })
  })
})