import '../src/index.js';

export default {
  title: 'Showcase/Enhanced Components',
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive showcase of all enhanced MyntUI components with their various states and configurations.',
      },
    },
    layout: 'fullscreen',
  },
};

export const AllComponents = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 2rem;
    background: var(--_global-color-background);
    min-height: 100vh;
    font-family: var(--_global-font-family-sans);
  `;

  // Create header
  const header = document.createElement('div');
  header.style.cssText = 'margin-bottom: 3rem; text-align: center;';
  header.innerHTML = `
    <h1 style="margin: 0 0 1rem 0; color: var(--_global-color-text-primary); font-size: 2.5rem;">MyntUI Component Library</h1>
    <p style="margin: 0; color: var(--_global-color-text-secondary); font-size: 1.125rem;">A comprehensive showcase of all components</p>
  `;
  container.appendChild(header);

  // Create sections for different component categories
  const sections = [
    { title: 'Form Components', id: 'form' },
    { title: 'Boolean Inputs', id: 'boolean' },
    { title: 'Interactive Components', id: 'interactive' },
    { title: 'Data Visualization', id: 'data-viz' },
    { title: 'Overlay Components', id: 'overlay' }
  ];

  sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.style.cssText = 'margin-bottom: 3rem;';
    
    const title = document.createElement('h2');
    title.textContent = section.title;
    title.style.cssText = 'margin: 0 0 1.5rem 0; color: var(--_global-color-text-primary); font-size: 1.75rem; border-bottom: 2px solid var(--_global-color-outline-variant); padding-bottom: 0.5rem;';
    
    const content = document.createElement('div');
    content.style.cssText = 'display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));';
    
    // Add components based on section
    if (section.id === 'form') {
      // Add input examples
      const inputCard = createComponentCard('Input Component', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
        
        const textInput = document.createElement('my-input');
        textInput.setAttribute('label', 'Text Input');
        textInput.setAttribute('placeholder', 'Enter text...');
        textInput.setAttribute('type', 'text');
        
        const emailInput = document.createElement('my-input');
        emailInput.setAttribute('label', 'Email Input');
        emailInput.setAttribute('placeholder', 'Enter email...');
        emailInput.setAttribute('type', 'email');
        emailInput.setAttribute('required', '');
        
        wrapper.appendChild(textInput);
        wrapper.appendChild(emailInput);
        return wrapper;
      });
      content.appendChild(inputCard);
    } else if (section.id === 'boolean') {
      // Add boolean inputs
      const booleanCard = createComponentCard('Boolean Inputs', () => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';
        
        const toggle = document.createElement('my-toggle');
        toggle.setAttribute('label', 'Toggle Switch');
        
        const checkbox = document.createElement('my-checkbox');
        checkbox.setAttribute('label', 'Checkbox');
        
        wrapper.appendChild(toggle);
        wrapper.appendChild(checkbox);
        return wrapper;
      });
      content.appendChild(booleanCard);
    }
    
    sectionDiv.appendChild(title);
    sectionDiv.appendChild(content);
    container.appendChild(sectionDiv);
  });

  return container;
};

function createComponentCard(title, createComponent) {
  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--_global-color-surface);
    border: 1px solid var(--_global-color-outline-variant);
    border-radius: var(--_global-border-radius-lg);
    padding: 1.5rem;
    box-shadow: var(--_global-elevation-1);
  `;
  
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = title;
  cardTitle.style.cssText = 'margin: 0 0 1rem 0; color: var(--_global-color-text-primary); font-size: 1.25rem;';
  
  const componentContainer = createComponent();
  
  card.appendChild(cardTitle);
  card.appendChild(componentContainer);
  return card;
}
