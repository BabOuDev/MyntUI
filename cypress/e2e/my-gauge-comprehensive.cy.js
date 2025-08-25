/**
 * Comprehensive Test Suite for my-gauge Component
 * Tests Material Design 3 enhancements, functionality, accessibility, and edge cases
 */

describe('my-gauge Component - Comprehensive Tests', () => {
  beforeEach(() => {
    cy.visit('/examples/index.html')
    cy.wait(500) // Allow components to initialize
  })

  describe('Basic Functionality', () => {
    it('should render gauge with basic attributes', () => {
      cy.get('my-gauge').first().should('exist')
      cy.get('my-gauge').first().shadow().find('.gauge-container').should('exist')
      cy.get('my-gauge').first().shadow().find('.gauge-svg').should('exist')
      cy.get('my-gauge').first().shadow().find('.gauge-needle').should('exist')
    })

    it('should handle value, min, and max attributes', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '75')
        gauge.setAttribute('min', '0')
        gauge.setAttribute('max', '100')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).should('have.attr', 'value', '75')
        cy.wrap(gauge).should('have.attr', 'min', '0')
        cy.wrap(gauge).should('have.attr', 'max', '100')
        
        cy.wrap(gauge).then(($gauge) => {
          expect($gauge[0].value).to.equal(75)
          expect($gauge[0].min).to.equal(0)
          expect($gauge[0].max).to.equal(100)
        })
      })
    })

    it('should calculate percentage correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '25')
        gauge.setAttribute('min', '0')
        gauge.setAttribute('max', '100')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          expect($gauge[0].percentage).to.equal(25)
        })
      })
    })

    it('should calculate needle angle correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('min', '0')
        gauge.setAttribute('max', '100')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // 50% should be 0 degrees (center of 180-degree arc)
          expect($gauge[0].angle).to.equal(0)
        })
      })
    })

    it('should display label when provided', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('label', 'CPU Usage')
        gauge.setAttribute('value', '60')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.gauge-label').should('contain.text', 'CPU Usage')
        })
      })
    })

    it('should show value when show-value attribute is present', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '85')
        gauge.setAttribute('unit', '%')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.gauge-value').should('contain.text', '85%')
        })
      })
    })

    it('should handle different variants', () => {
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info']
      
      cy.document().then((doc) => {
        variants.forEach((variant) => {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('variant', variant)
          gauge.setAttribute('value', '50')
          gauge.setAttribute('id', `gauge-${variant}`)
          doc.body.appendChild(gauge)
          
          cy.wrap(gauge).should('have.attr', 'variant', variant)
        })
      })
    })

    it('should support different sizes', () => {
      const sizes = ['sm', 'md', 'lg']
      
      cy.document().then((doc) => {
        sizes.forEach(size => {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('size', size)
          gauge.setAttribute('value', '50')
          gauge.setAttribute('id', `gauge-size-${size}`)
          doc.body.appendChild(gauge)
          
          cy.wrap(gauge).should('have.attr', 'size', size)
        })
      })
    })

    it('should handle units correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '42')
        gauge.setAttribute('unit', ' KB/s')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.gauge-value').should('contain.text', '42 KB/s')
        })
      })
    })
  })

  describe('Material Design 3 Styling and Visual Enhancements', () => {
    it('should have proper Material Design 3 container styling', () => {
      cy.get('my-gauge').first().should('have.css', 'border-radius')
      cy.get('my-gauge').first().should('have.css', 'box-shadow')
      cy.get('my-gauge').first().should('have.css', 'background-color')
      cy.get('my-gauge').first().should('have.css', 'padding')
    })

    it('should have proper SVG styling with gradients and shadows', () => {
      cy.get('my-gauge').first().shadow().within(() => {
        cy.get('.gauge-svg').should('exist')
        cy.get('.gauge-fill').should('have.css', 'stroke')
        cy.get('.gauge-fill').should('have.css', 'filter') // glow effect
        cy.get('.gauge-needle').should('have.css', 'filter') // drop shadow
      })
    })

    it('should show proper elevation and card-like appearance', () => {
      cy.get('my-gauge').first().should('have.css', 'box-shadow')
      cy.get('my-gauge').first().should('have.css', 'background-color')
      cy.get('my-gauge').first().should('have.css', 'border-radius')
    })

    it('should animate needle position with smooth transitions', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '25')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          // Check needle has transition
          cy.get('.gauge-needle').should('have.css', 'transition')
          
          // Change value and check needle moves
          gauge.setAttribute('value', '75')
          cy.wait(100)
          
          cy.get('.gauge-needle').should('have.css', 'transform')
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
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('variant', variant)
          gauge.setAttribute('value', '60')
          gauge.setAttribute('show-value', '')
          gauge.setAttribute('id', `color-test-${variant}`)
          doc.body.appendChild(gauge)
          
          cy.wrap(gauge).shadow().within(() => {
            cy.get('.gauge-value').should('have.css', 'color')
            // The fill should use the gradient which references the variant color
            cy.get('.gauge-fill').should('have.attr', 'stroke', 'url(#gaugeGradient)')
          })
        })
      })
    })

    it('should show proper size variations', () => {
      cy.document().then((doc) => {
        // Small size
        const smallGauge = doc.createElement('my-gauge')
        smallGauge.setAttribute('size', 'sm')
        smallGauge.setAttribute('value', '50')
        smallGauge.setAttribute('id', 'size-test-sm')
        doc.body.appendChild(smallGauge)
        
        // Large size
        const largeGauge = doc.createElement('my-gauge')
        largeGauge.setAttribute('size', 'lg')
        largeGauge.setAttribute('value', '50')
        largeGauge.setAttribute('id', 'size-test-lg')
        doc.body.appendChild(largeGauge)
        
        // Check different widths
        cy.wrap(smallGauge).should('have.css', 'width').and('not.equal', '180px') // Different from default
        cy.wrap(largeGauge).should('have.css', 'width').and('not.equal', '180px') // Different from default
      })
    })

    it('should display gradients and glow effects', () => {
      cy.get('my-gauge').first().shadow().within(() => {
        // Check for gradient definition
        cy.get('#gaugeGradient').should('exist')
        
        // Check for glow filter
        cy.get('#glow').should('exist')
        
        // Check that fill uses gradient and glow
        cy.get('.gauge-fill').should('have.attr', 'stroke', 'url(#gaugeGradient)')
        cy.get('.gauge-fill').should('have.attr', 'filter', 'url(#glow)')
      })
    })

    it('should show text shadows and modern typography', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '75')
        gauge.setAttribute('label', 'Performance')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.gauge-value').should('have.css', 'text-shadow')
          cy.get('.gauge-value').should('have.css', 'font-variant-numeric', 'tabular-nums')
          cy.get('.gauge-label').should('have.css', 'text-transform', 'uppercase')
          cy.get('.gauge-label').should('have.css', 'letter-spacing')
        })
      })
    })
  })

  describe('Thresholds and Dynamic Color Changes', () => {
    it('should handle thresholds correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '85')
        gauge.setAttribute('thresholds', JSON.stringify([
          { min: 0, max: 50, color: '#4CAF50', label: 'Good' },
          { min: 50, max: 80, color: '#FF9800', label: 'Warning' },
          { min: 80, max: 100, color: '#F44336', label: 'Critical' }
        ]))
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          // Should show threshold indicators
          cy.get('.threshold-indicator').should('have.length', 3)
          cy.get('.threshold-dot').should('have.length', 3)
          
          // Value should be colored based on threshold
          cy.get('.gauge-value').should('have.css', 'color')
        })
      })
    })

    it('should update colors when crossing thresholds', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '30') // Good range
        gauge.setAttribute('thresholds', JSON.stringify([
          { min: 0, max: 50, color: '#4CAF50', label: 'Good' },
          { min: 50, max: 80, color: '#FF9800', label: 'Warning' },
          { min: 80, max: 100, color: '#F44336', label: 'Critical' }
        ]))
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Should be green color initially
          const initialThreshold = $gauge[0].getCurrentThreshold()
          expect(initialThreshold.color).to.equal('#4CAF50')
          
          // Change to warning range
          $gauge[0].setAttribute('value', '65')
          cy.wait(100)
          
          const warningThreshold = $gauge[0].getCurrentThreshold()
          expect(warningThreshold.color).to.equal('#FF9800')
        })
      })
    })

    it('should display threshold labels correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('thresholds', JSON.stringify([
          { min: 0, color: '#4CAF50', label: 'Low' },
          { min: 40, color: '#FF9800', label: 'Medium' },
          { min: 80, color: '#F44336', label: 'High' }
        ]))
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.threshold-indicator').should('contain.text', 'Low')
          cy.get('.threshold-indicator').should('contain.text', 'Medium')
          cy.get('.threshold-indicator').should('contain.text', 'High')
        })
      })
    })

    it('should handle invalid threshold JSON gracefully', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('thresholds', 'invalid-json')
        doc.body.appendChild(gauge)
        
        // Should not crash
        cy.wrap(gauge).should('be.visible')
        cy.wrap(gauge).then(($gauge) => {
          expect($gauge[0].thresholds).to.deep.equal([])
        })
      })
    })
  })

  describe('Animations and Smooth Updates', () => {
    it('should support animated value changes', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '20')
        gauge.setAttribute('animated', '')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Change value with animation
          $gauge[0].value = 80
          
          // Should animate smoothly
          cy.wait(400) // Mid-animation
          cy.wrap($gauge).shadow().find('.gauge-needle').should('have.css', 'transition')
          
          cy.wait(500) // Complete animation
          cy.wrap($gauge).shadow().find('.gauge-value').should('contain.text', '80')
        })
      })
    })

    it('should handle rapid value changes during animation', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '0')
        gauge.setAttribute('animated', '')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Rapid value changes
          $gauge[0].value = 50
          $gauge[0].value = 80
          $gauge[0].value = 30
          
          cy.wait(1000) // Allow animation to complete
          expect($gauge[0].value).to.equal(30)
        })
      })
    })

    it('should clean up animation on component destruction', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '20')
        gauge.setAttribute('animated', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Start animation
          $gauge[0].value = 80
          
          // Remove component mid-animation
          gauge.remove()
          
          // Should not cause errors
          cy.wait(100)
        })
      })
    })

    it('should animate fill arc correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '25')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          // Get initial stroke-dashoffset
          cy.get('.gauge-fill').then(($fill) => {
            const initialOffset = $fill.css('stroke-dashoffset')
            
            // Change value
            gauge.setAttribute('value', '75')
            cy.wait(100)
            
            // Should have different offset
            cy.get('.gauge-fill').should('not.have.css', 'stroke-dashoffset', initialOffset)
          })
        })
      })
    })
  })

  describe('Accessibility Features', () => {
    it('should provide semantic structure', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '65')
        gauge.setAttribute('min', '0')
        gauge.setAttribute('max', '100')
        gauge.setAttribute('label', 'System Load')
        doc.body.appendChild(gauge)
        
        // Should be announced to screen readers
        cy.wrap(gauge).should('be.visible')
        cy.wrap(gauge).should('have.attr', 'value', '65')
      })
    })

    it('should use tabular numbers for consistent display', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '42.5')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.gauge-value').should('have.css', 'font-variant-numeric', 'tabular-nums')
          cy.get('.gauge-range').should('have.css', 'font-variant-numeric', 'tabular-nums')
        })
      })
    })

    it('should handle disabled state', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('disabled', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).should('have.attr', 'disabled')
        cy.wrap(gauge).should('have.css', 'opacity', '0.5')
        cy.wrap(gauge).should('have.css', 'pointer-events', 'none')
      })
    })

    it('should provide clear visual hierarchy', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '75')
        gauge.setAttribute('label', 'Performance')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          // Value should be prominently displayed
          cy.get('.gauge-value').should('have.css', 'font-weight')
          cy.get('.gauge-value').should('have.css', 'font-size')
          
          // Label should be smaller but clear
          cy.get('.gauge-label').should('have.css', 'font-size')
          cy.get('.gauge-label').should('have.css', 'text-transform', 'uppercase')
          
          // Range should be subtle
          cy.get('.gauge-range').should('have.css', 'color')
        })
      })
    })

    it('should be responsive on smaller screens', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '60')
        gauge.setAttribute('label', 'Mobile Test')
        doc.body.appendChild(gauge)
        
        // Test mobile viewport
        cy.viewport(375, 667)
        cy.wrap(gauge).should('be.visible')
        
        // Should adjust size for mobile
        // CSS media query should apply smaller gauge size
        cy.wrap(gauge).should('have.css', 'width')
      })
    })
  })

  describe('Edge Cases and Boundary Conditions', () => {
    it('should handle values outside min/max range', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('min', '10')
        gauge.setAttribute('max', '90')
        gauge.setAttribute('value', '150') // Above max
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Should clamp to max
          expect($gauge[0].value).to.equal(90)
          expect($gauge[0].percentage).to.equal(100)
        })
        
        // Test below min
        gauge.setAttribute('value', '5') // Below min
        cy.wrap(gauge).then(($gauge) => {
          // Should clamp to min
          expect($gauge[0].value).to.equal(10)
          expect($gauge[0].percentage).to.equal(0)
        })
      })
    })

    it('should handle min equal to max', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('min', '50')
        gauge.setAttribute('max', '50')
        gauge.setAttribute('value', '50')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Should handle edge case gracefully
          expect($gauge[0].percentage).to.equal(0)
        })
      })
    })

    it('should handle negative values correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('min', '-50')
        gauge.setAttribute('max', '50')
        gauge.setAttribute('value', '0')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Should calculate percentage correctly with negative min
          expect($gauge[0].percentage).to.equal(50)
        })
      })
    })

    it('should handle non-numeric values gracefully', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', 'invalid')
        gauge.setAttribute('min', 'also-invalid')
        gauge.setAttribute('max', 'still-invalid')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Should default to reasonable values
          expect($gauge[0].value).to.be.a('number')
          expect($gauge[0].min).to.be.a('number')
          expect($gauge[0].max).to.be.a('number')
        })
      })
    })

    it('should handle decimal values correctly', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '42.7')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          // Should display decimal correctly
          cy.get('.gauge-value').should('contain.text', '42.7')
        })
      })
    })

    it('should format integer values without decimals', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          const formatted = $gauge[0].formatValue(50)
          expect(formatted).to.equal('50')
          
          const formattedDecimal = $gauge[0].formatValue(50.5)
          expect(formattedDecimal).to.equal('50.5')
        })
      })
    })

    it('should handle programmatic property changes', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '25')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Change via property
          $gauge[0].value = 75
          
          cy.wait(100)
          expect($gauge[0].getAttribute('value')).to.equal('75')
          
          // Change max via property
          $gauge[0].max = 200
          
          cy.wait(100)
          expect($gauge[0].getAttribute('max')).to.equal('200')
        })
      })
    })

    it('should handle empty thresholds array', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('thresholds', '[]')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          expect($gauge[0].thresholds).to.deep.equal([])
          // Should use variant color as fallback
          const color = $gauge[0].getColor()
          expect(color).to.contain('primary')
        })
      })
    })
  })

  describe('Performance and Memory Management', () => {
    it('should handle multiple gauges efficiently', () => {
      const startTime = performance.now()
      
      cy.document().then((doc) => {
        // Create many gauges
        for (let i = 0; i < 20; i++) {
          const gauge = doc.createElement('my-gauge')
          gauge.setAttribute('value', (i * 5).toString())
          gauge.setAttribute('label', `Gauge ${i}`)
          gauge.setAttribute('show-value', '')
          gauge.setAttribute('id', `perf-test-${i}`)
          doc.body.appendChild(gauge)
        }
        
        // Check they all exist
        cy.get('my-gauge[id^="perf-test-"]').should('have.length', 20)
        
        const endTime = performance.now()
        const duration = endTime - startTime
        expect(duration).to.be.lessThan(2000) // Should create reasonably quickly
        
        // Test update performance
        cy.get('#perf-test-0').then(($gauge) => {
          $gauge[0].setAttribute('value', '95')
        })
        
        cy.wait(100)
        
        cy.get('#perf-test-0').shadow().within(() => {
          cy.get('.gauge-needle').should('be.visible')
        })
        
        // Clean up
        cy.get('my-gauge[id^="perf-test-"]').then(($gauges) => {
          $gauges.each((index, element) => {
            element.remove()
          })
        })
      })
    })

    it('should handle animation memory cleanup', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '20')
        gauge.setAttribute('animated', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).then(($gauge) => {
          // Start multiple animations
          for (let i = 0; i < 5; i++) {
            $gauge[0].value = Math.random() * 100
          }
          
          // Should handle cleanup properly
          cy.wait(100)
          
          // Remove component
          gauge.remove()
          
          // Should not cause memory leaks
          cy.wait(100)
        })
      })
    })

    it('should maintain performance with complex thresholds', () => {
      cy.document().then((doc) => {
        const complexThresholds = Array.from({ length: 10 }, (_, i) => ({
          min: i * 10,
          color: `hsl(${i * 36}, 70%, 50%)`,
          label: `Level ${i + 1}`
        }))
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('thresholds', JSON.stringify(complexThresholds))
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.threshold-indicator').should('have.length', 10)
        })
        
        // Should still update efficiently
        gauge.setAttribute('value', '85')
        cy.wait(100)
        
        cy.wrap(gauge).shadow().within(() => {
          cy.get('.gauge-value').should('contain.text', '85')
        })
      })
    })

    it('should be responsive at different viewport sizes', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '70')
        gauge.setAttribute('label', 'Responsive Test')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        // Test mobile viewport
        cy.viewport(375, 667)
        cy.wrap(gauge).should('be.visible')
        cy.wrap(gauge).shadow().find('.gauge-svg').should('be.visible')
        
        // Test tablet viewport
        cy.viewport(768, 1024)
        cy.wrap(gauge).should('be.visible')
        
        // Test desktop viewport
        cy.viewport(1200, 800)
        cy.wrap(gauge).should('be.visible')
      })
    })
  })

  describe('Integration with Other Components', () => {
    it('should work alongside other enhanced components', () => {
      cy.document().then((doc) => {
        // Create mixed component group
        const input = doc.createElement('my-input')
        input.setAttribute('label', 'Gauge Value')
        input.setAttribute('type', 'number')
        input.setAttribute('value', '50')
        
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '50')
        gauge.setAttribute('label', 'Input Value')
        gauge.setAttribute('show-value', '')
        
        const progress = doc.createElement('my-progress')
        progress.setAttribute('value', '50')
        progress.setAttribute('label', 'Same Value')
        
        doc.body.appendChild(input)
        doc.body.appendChild(gauge)
        doc.body.appendChild(progress)
        
        // All should be visible and functional
        cy.wrap(input).should('be.visible')
        cy.wrap(gauge).should('be.visible')
        cy.wrap(progress).should('be.visible')
        
        // Test interaction
        cy.wrap(input).shadow().find('input').clear().type('75')
        cy.wait(100)
        
        // Can update gauge based on input
        gauge.setAttribute('value', '75')
        cy.wait(100)
        
        cy.wrap(gauge).shadow().find('.gauge-value').should('contain.text', '75')
      })
    })

    it('should maintain visual consistency with design system', () => {
      cy.document().then((doc) => {
        const gauge = doc.createElement('my-gauge')
        gauge.setAttribute('value', '60')
        gauge.setAttribute('variant', 'primary')
        gauge.setAttribute('show-value', '')
        doc.body.appendChild(gauge)
        
        // Should use consistent color variables
        cy.wrap(gauge).shadow().within(() => {
          // Colors should be from the design system
          cy.get('.gauge-value').should('have.css', 'color')
          cy.get('.gauge-label').should('have.css', 'color')
        })
      })
    })
  })
})