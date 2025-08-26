import { globalConfig } from './src/config/global-config.js';

// Get theme configuration for dynamic values
const themeConfig = globalConfig.get('theme');

// Helper function to generate color variants
const generateColorVariants = (base) => ({
  DEFAULT: base,
  hover: `color-mix(in srgb, ${base} 80%, white)`,
  active: `color-mix(in srgb, ${base} 120%, black)`,
  50: `color-mix(in srgb, ${base} 5%, white)`,
  100: `color-mix(in srgb, ${base} 10%, white)`,
  200: `color-mix(in srgb, ${base} 20%, white)`,
  300: `color-mix(in srgb, ${base} 40%, white)`,
  400: `color-mix(in srgb, ${base} 60%, white)`,
  500: base,
  600: `color-mix(in srgb, ${base} 80%, black)`,
  700: `color-mix(in srgb, ${base} 60%, black)`,
  800: `color-mix(in srgb, ${base} 40%, black)`,
  900: `color-mix(in srgb, ${base} 20%, black)`,
});

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,html}',
    './examples/**/*.{js,html}',
    './stories/**/*.{js,mdx}',
    './cypress/**/*.{js,html}',
    './tests/**/*.{js,html}',
    './*.{js,html}'
  ],
  darkMode: ['class', '[data-color-scheme="dark"]'],
  theme: {
    extend: {
      // Colors from global config - Material Design 3
      colors: {
        primary: {
          DEFAULT: '#6750A4',
          hover: '#7C67B8',
          active: '#5A4099',
          light: '#E8DEF8',
          dark: '#21005D',
          container: '#EADDFF',
          'on-primary': '#FFFFFF',
          'on-container': '#21005D',
          fixed: '#D0BCFF',
          'fixed-dim': '#B69DF8',
          'on-fixed': '#21005D',
          'on-fixed-variant': '#4F378B',
          10: '#21005D',
          20: '#381E72',
          30: '#4F378B',
          40: '#6750A4',
          50: '#7F67BE',
          60: '#9A82DB',
          70: '#B69DF8',
          80: '#D0BCFF',
          90: '#EADDFF',
          95: '#F6EDFF',
          99: '#FFFBFE'
        },
        secondary: {
          DEFAULT: '#625B71',
          hover: '#706579',
          active: '#544963',
          light: '#E8DEF8',
          dark: '#332D41',
          container: '#E8DEF8',
          'on-secondary': '#FFFFFF',
          'on-container': '#1E192B',
          10: '#1E192B',
          20: '#332D41',
          30: '#4A4458',
          40: '#625B71',
          50: '#7C7489',
          60: '#968DA3',
          70: '#B1A7BE',
          80: '#CCC2DC',
          90: '#E8DEF8',
          95: '#F6EDFF'
        },
        tertiary: {
          DEFAULT: '#7D5260',
          hover: '#8E6372',
          active: '#6C4354',
          container: '#FFD8E4',
          'on-tertiary': '#FFFFFF',
          'on-container': '#31111D',
          10: '#31111D',
          20: '#492532',
          30: '#633B48',
          40: '#7D5260',
          50: '#986879',
          60: '#B58392',
          70: '#D29DAC',
          80: '#F0B8C7',
          90: '#FFD8E4',
          95: '#FFECF1'
        },
        success: {
          DEFAULT: '#2e7d32',
          light: '#e8f5e8',
          container: '#a8dea8',
          'on-success': '#ffffff'
        },
        warning: {
          DEFAULT: '#f57c00',
          light: '#fff3e0',
          container: '#ffcc80',
          'on-warning': '#ffffff'
        },
        error: {
          DEFAULT: '#d32f2f',
          light: '#ffebee',
          container: '#ffcdd2',
          'on-error': '#ffffff'
        },
        info: {
          DEFAULT: '#1976d2',
          light: '#e3f2fd',
          container: '#90caf9',
          'on-info': '#ffffff'
        },
        neutral: {
          white: '#ffffff',
          black: '#000000',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        },
        surface: {
          DEFAULT: '#fef7ff',
          dim: '#ded8e1',
          bright: '#fef7ff',
          variant: '#e7e0ec',
          container: '#f3edf7',
          'container-lowest': '#ffffff',
          'container-low': '#f7f2fa',
          'container-high': '#ece6f0',
          'container-highest': '#e6e0e9',
          'on-surface': '#1c1b1f',
          'on-variant': '#49454f'
        },
        outline: {
          DEFAULT: '#79747e',
          variant: '#cac4d0'
        },
        background: {
          light: '#f7f2fa',
          white: '#fef7ff',
          dark: '#1c1b1f',
          overlay: 'rgba(28, 27, 31, 0.5)'
        }
      },
      // Spacing system from global config
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        // Add semantic spacing values
        'component-padding': '12px',
        'section-gap': '24px',
        'page-margin': '32px'
      },
      // Border radius system
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px'
      },
      // Typography system - Material Design 3
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      fontSize: {
        // Display styles
        'display-large': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'display-medium': ['clamp(2.8rem, 6vw, 6rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'display-small': ['clamp(2.25rem, 4vw, 4.5rem)', { lineHeight: '1.2', letterSpacing: '0' }],
        // Headlines
        'headline-large': ['clamp(2rem, 3.5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '0' }],
        'headline-medium': ['clamp(1.75rem, 3vw, 3rem)', { lineHeight: '1.375', letterSpacing: '0' }],
        'headline-small': ['clamp(1.5rem, 2.5vw, 2.5rem)', { lineHeight: '1.375', letterSpacing: '0' }],
        // Titles
        'title-large': ['clamp(1.375rem, 2vw, 2rem)', { lineHeight: '1.375', letterSpacing: '0' }],
        'title-medium': ['clamp(1.25rem, 1.75vw, 1.75rem)', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'title-small': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        // Labels
        'label-large': ['1rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '500' }],
        'label-medium': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
        'label-small': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500' }],
        // Body text
        'body-large': ['1.125rem', { lineHeight: '1.625', letterSpacing: '0' }],
        'body-medium': ['1rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }]
      },
      // Box shadows - Material Design elevation
      boxShadow: {
        none: 'none',
        elevation1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        elevation2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        elevation3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        elevation4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        elevation5: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
        // Focus and interaction shadows
        focus: '0 0 0 2px color-mix(in srgb, #6750A4 20%, transparent)',
        'focus-primary': '0 0 0 2px color-mix(in srgb, #6750A4 60%, transparent)',
        'focus-secondary': '0 0 0 4px color-mix(in srgb, #6750A4 20%, transparent)',
        'focus-glow': '0 0 0 8px color-mix(in srgb, #6750A4 12%, transparent)',
        // Interactive shadows
        'interaction-subtle': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'interaction-moderate': '0 4px 8px rgba(0, 0, 0, 0.12)',
        'interaction-strong': '0 8px 16px rgba(0, 0, 0, 0.16)',
        'interaction-dramatic': '0 12px 24px rgba(0, 0, 0, 0.20)'
      },
      // Animation and transitions
      transitionDuration: {
        short1: '75ms',
        short2: '150ms',
        medium1: '250ms',
        medium2: '300ms',
        long1: '400ms',
        long2: '500ms'
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
        emphasized: 'cubic-bezier(0.2, 0.0, 0, 1)',
        // Spring physics
        gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        wobbly: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bouncy: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        energetic: 'cubic-bezier(0.23, 1, 0.32, 1)'
      },
      // Z-index system
      zIndex: {
        base: '1',
        dropdown: '100',
        'sticky-header': '200',
        tooltip: '300',
        drawer: '400',
        modal: '500',
        notification: '600',
        'overlay-max': '999'
      },
      // Component-specific dimensions
      height: {
        'input-sm': '32px',
        'input-md': '40px',
        'input-lg': '48px',
        'component-sm': '32px',
        'component-md': '40px',
        'component-lg': '48px'
      },
      minHeight: {
        'input-sm': '32px',
        'input-md': '40px',
        'input-lg': '48px'
      },
      minWidth: {
        button: '64px'
      },
      // State layers and opacity
      opacity: {
        'state-hover': '0.08',
        'state-focus': '0.12',
        'state-pressed': '0.16',
        'state-selected': '0.12',
        'state-activated': '0.12',
        'state-dragged': '0.16'
      },
      // Animation keyframes for Material Design
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        ripple: 'ripple 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        'ripple-fast': 'ripple 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'ripple-slow': 'ripple 900ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        pulse: 'pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease-in-out infinite'
      }
    }
  },
  plugins: [
    // Custom plugin for Material Design state layers
    function({ addUtilities, theme }) {
      addUtilities({
        '.state-layer': {
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'currentColor',
            opacity: '0',
            transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
            borderRadius: 'inherit'
          },
          '&:hover::before': {
            opacity: theme('opacity.state-hover')
          },
          '&:focus-visible::before': {
            opacity: theme('opacity.state-focus')
          },
          '&:active::before': {
            opacity: theme('opacity.state-pressed')
          }
        },
        '.state-layer-primary': {
          '&::before': {
            backgroundColor: theme('colors.primary.DEFAULT')
          }
        },
        '.state-layer-secondary': {
          '&::before': {
            backgroundColor: theme('colors.secondary.DEFAULT')
          }
        },
        '.state-layer-surface': {
          '&::before': {
            backgroundColor: theme('colors.surface.on-surface')
          }
        },
        '.state-layer-transparent': {
          '&::before': {
            backgroundColor: 'transparent'
          }
        }
      });
    },
    // Custom plugin for focus indicators
    function({ addUtilities, theme }) {
      addUtilities({
        '.focus-outline': {
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.primary.DEFAULT')}`,
            outlineOffset: '2px'
          }
        },
        '.focus-ring': {
          '&:focus-visible': {
            boxShadow: theme('boxShadow.focus')
          }
        },
        '.focus-ring-primary': {
          '&:focus-visible': {
            boxShadow: `${theme('boxShadow.focus-primary')}, ${theme('boxShadow.focus-secondary')}`
          }
        },
        // Micro-interaction utilities
        '.scale-subtle': {
          transform: 'scale(1.02) translateY(-1px)'
        },
        '.bg-opacity-state-hover': {
          backgroundColor: `color-mix(in srgb, currentColor ${theme('opacity.state-hover')}, transparent)`
        },
        '.bg-opacity-state-focus': {
          backgroundColor: `color-mix(in srgb, currentColor ${theme('opacity.state-focus')}, transparent)`
        },
        '.bg-opacity-state-pressed': {
          backgroundColor: `color-mix(in srgb, currentColor ${theme('opacity.state-pressed')}, transparent)`
        }
      });
    },
    // Custom plugin for component-specific utilities
    function({ addUtilities, theme, addComponents }) {
      // Component base styles
      addComponents({
        '.mynt-input-base': {
          display: 'flex',
          alignItems: 'center',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: theme('borderRadius.lg'),
          transition: `all ${theme('transitionDuration.medium1')} ${theme('transitionTimingFunction.standard')}`,
          fontFamily: theme('fontFamily.sans'),
          fontSize: theme('fontSize.body-medium[0]'),
          lineHeight: theme('fontSize.body-medium[1].lineHeight'),
          '&:focus-within': {
            outline: `2px solid ${theme('colors.primary.DEFAULT')}`,
            outlineOffset: '2px'
          }
        },
        '.mynt-button-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.full'),
          fontFamily: theme('fontFamily.sans'),
          fontWeight: '500',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          userSelect: 'none',
          transition: `all ${theme('transitionDuration.medium1')} ${theme('transitionTimingFunction.standard')}`,
          minWidth: theme('minWidth.button'),
          '&:disabled': {
            opacity: theme('opacity.50'),
            cursor: 'not-allowed',
            pointerEvents: 'none'
          }
        },
        '.mynt-card-base': {
          backgroundColor: theme('colors.surface.DEFAULT'),
          borderRadius: theme('borderRadius.lg'),
          borderWidth: '1px',
          borderColor: theme('colors.outline.variant'),
          boxShadow: theme('boxShadow.elevation1')
        }
      });

      // Size-specific utilities
      addUtilities({
        '.mynt-size-sm': {
          height: theme('height.input-sm'),
          minHeight: theme('minHeight.input-sm'),
          padding: `${theme('spacing.xs')} ${theme('spacing.sm')}`,
          fontSize: theme('fontSize.label-medium[0]'),
          lineHeight: theme('fontSize.label-medium[1].lineHeight')
        },
        '.mynt-size-md': {
          height: theme('height.input-md'),
          minHeight: theme('minHeight.input-md'),
          padding: `${theme('spacing.sm')} ${theme('spacing.md')}`,
          fontSize: theme('fontSize.body-medium[0]'),
          lineHeight: theme('fontSize.body-medium[1].lineHeight')
        },
        '.mynt-size-lg': {
          height: theme('height.input-lg'),
          minHeight: theme('minHeight.input-lg'),
          padding: `${theme('spacing.md')} ${theme('spacing.lg')}`,
          fontSize: theme('fontSize.body-large[0]'),
          lineHeight: theme('fontSize.body-large[1].lineHeight')
        }
      });
    }
  ]
};