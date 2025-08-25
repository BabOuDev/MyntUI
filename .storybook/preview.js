import '../src/styles/global-variables.css';
import '../src/styles/base.css';
import '../src/styles/utilities.css';
import '../src/styles/component-commons.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fef7ff' },
        { name: 'dark', value: '#1c1b1f' },
        { name: 'surface', value: '#f3edf7' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Material Design 3 theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
