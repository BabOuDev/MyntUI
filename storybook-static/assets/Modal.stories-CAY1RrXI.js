import"./my-modal-Cik2IHTQ.js";import"./my-button-WudZcNwy.js";import"./my-input-Cr2iSYlQ.js";import"./my-icon-O3BbYCXg.js";import"./base-component-q4KNMHwB.js";const Z={title:"Components/my-modal",parameters:{docs:{description:{component:"A dialog box that appears on top of the page, blocking interaction with main content. Follows Material Design 3 principles with proper focus management and accessibility."}}},argTypes:{title:{control:"text",description:"Modal title"},size:{control:{type:"select"},options:["sm","md","lg","xl","fullscreen"],description:"Modal size"},closeOnBackdropClick:{control:"boolean",description:"Close modal when clicking backdrop"},closeOnEscape:{control:"boolean",description:"Close modal when pressing Escape key"}}},P=n=>{const s=document.createElement("div"),e=document.createElement("my-button");e.setAttribute("label","Open Modal"),e.setAttribute("variant","filled");const t=document.createElement("my-modal");return n.title&&t.setAttribute("title",n.title),n.size&&n.size!=="md"&&t.setAttribute("size",n.size),n.closeOnBackdropClick&&t.setAttribute("close-on-backdrop-click",""),n.closeOnEscape&&t.setAttribute("close-on-escape",""),t.innerHTML=n.content||`
    <p>This is a modal dialog with some content. You can close it by clicking the X button, clicking outside (if enabled), or pressing Escape (if enabled).</p>
    <p>Modal dialogs are useful for displaying important information, forms, confirmations, or other content that requires the user's immediate attention.</p>
  `,e.addEventListener("click",()=>{t.setAttribute("open","")}),t.addEventListener("close",()=>{console.log("Modal closed")}),s.appendChild(e),s.appendChild(t),s},f=P.bind({});f.args={title:"Modal Dialog",size:"md",closeOnBackdropClick:!0,closeOnEscape:!0,content:`
    <p>This is a default modal dialog. It demonstrates the basic functionality and styling of the modal component.</p>
    <p>The modal includes proper focus management, keyboard navigation, and accessibility features.</p>
  `};const y=()=>{const n=document.createElement("div");return n.style.cssText="display: flex; gap: 16px; flex-wrap: wrap;",["sm","md","lg","xl","fullscreen"].forEach(e=>{const t=document.createElement("my-button");t.setAttribute("label",`${e.toUpperCase()} Modal`),t.setAttribute("variant","outlined");const i=document.createElement("my-modal");i.setAttribute("title",`${e.toUpperCase()} Size Modal`),i.setAttribute("size",e),i.setAttribute("close-on-backdrop-click",""),i.setAttribute("close-on-escape",""),i.innerHTML=`
      <p>This is a <strong>${e}</strong> sized modal dialog.</p>
      <p>Modal dialogs automatically adjust their size based on the content and the specified size variant.</p>
      ${e==="fullscreen"?"<p>Fullscreen modals take up the entire viewport and are useful for complex forms or detailed content.</p>":""}
    `,t.addEventListener("click",()=>{i.setAttribute("open","")}),n.appendChild(t),n.appendChild(i)}),n};y.parameters={docs:{description:{story:"Different modal sizes from small to fullscreen."}}};const h=()=>{const n=document.createElement("div");return n.style.cssText="display: flex; gap: 16px; flex-wrap: wrap;",[{label:"Delete Item",variant:"danger",title:"Confirm Delete",content:"Are you sure you want to delete this item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel"},{label:"Save Changes",variant:"primary",title:"Save Changes",content:"Do you want to save the changes you made?",confirmText:"Save",cancelText:"Discard"},{label:"Sign Out",variant:"secondary",title:"Sign Out",content:"Are you sure you want to sign out of your account?",confirmText:"Sign Out",cancelText:"Stay Signed In"}].forEach(({label:e,variant:t,title:i,content:u,confirmText:a,cancelText:l})=>{const r=document.createElement("my-button");r.setAttribute("label",e),r.setAttribute("variant",t);const o=document.createElement("my-modal");o.setAttribute("title",i),o.setAttribute("size","sm"),o.setAttribute("close-on-escape","");const c=document.createElement("div");c.style.cssText="display: flex; flex-direction: column; gap: 24px;";const d=document.createElement("p");d.textContent=u,d.style.margin="0";const p=document.createElement("div");p.style.cssText="display: flex; gap: 12px; justify-content: flex-end;";const m=document.createElement("my-button");m.setAttribute("label",l),m.setAttribute("variant","text");const b=document.createElement("my-button");b.setAttribute("label",a),b.setAttribute("variant",t),m.addEventListener("click",()=>{o.removeAttribute("open")}),b.addEventListener("click",()=>{console.log(`${i} confirmed`),o.removeAttribute("open")}),p.appendChild(m),p.appendChild(b),c.appendChild(d),c.appendChild(p),o.appendChild(c),r.addEventListener("click",()=>{o.setAttribute("open","")}),n.appendChild(r),n.appendChild(o)}),n};h.parameters={docs:{description:{story:"Confirmation dialogs for important user actions."}}};const x=()=>{const n=document.createElement("div"),s=document.createElement("my-button");s.setAttribute("label","Add New User"),s.setAttribute("variant","filled");const e=document.createElement("my-modal");e.setAttribute("title","Add New User"),e.setAttribute("size","md"),e.setAttribute("close-on-escape","");const t=document.createElement("form");t.style.cssText="display: flex; flex-direction: column; gap: 20px;";const i=document.createElement("my-input");i.setAttribute("label","First Name"),i.setAttribute("type","text"),i.setAttribute("required","");const u=document.createElement("my-input");u.setAttribute("label","Last Name"),u.setAttribute("type","text"),u.setAttribute("required","");const a=document.createElement("my-input");a.setAttribute("label","Email Address"),a.setAttribute("type","email"),a.setAttribute("required",""),a.setAttribute("leading-icon","email");const l=document.createElement("my-input");l.setAttribute("label","Role"),l.setAttribute("type","select"),l.setAttribute("options",JSON.stringify([{label:"User",value:"user"},{label:"Admin",value:"admin"},{label:"Moderator",value:"moderator"}]));const r=document.createElement("my-input");r.setAttribute("label","Notes"),r.setAttribute("type","textarea"),r.setAttribute("helper-text","Optional notes about this user");const o=document.createElement("div");o.style.cssText="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;";const c=document.createElement("my-button");c.setAttribute("label","Cancel"),c.setAttribute("variant","text");const d=document.createElement("my-button");return d.setAttribute("label","Add User"),d.setAttribute("variant","filled"),c.addEventListener("click",p=>{p.preventDefault(),e.removeAttribute("open")}),d.addEventListener("click",p=>{p.preventDefault();const m=i.value,b=u.value,g=a.value;if(!m||!b||!g){alert("Please fill in all required fields");return}console.log("User added:",{firstName:m,lastName:b,email:g}),e.removeAttribute("open"),t.reset()}),o.appendChild(c),o.appendChild(d),t.appendChild(i),t.appendChild(u),t.appendChild(a),t.appendChild(l),t.appendChild(r),t.appendChild(o),e.appendChild(t),s.addEventListener("click",()=>{e.setAttribute("open","")}),n.appendChild(s),n.appendChild(e),n};x.parameters={docs:{description:{story:"Modal containing a form with validation and proper input handling."}}};const v=()=>{const n=document.createElement("div");return n.style.cssText="display: flex; gap: 16px; flex-wrap: wrap;",[{label:"Success Message",variant:"success",title:"Operation Successful",icon:"check_circle",content:"Your changes have been saved successfully. The system has been updated with your new settings."},{label:"Warning Message",variant:"warning",title:"Important Notice",icon:"warning",content:"Please note that this action may affect other users. We recommend backing up your data before proceeding."},{label:"Error Message",variant:"error",title:"Error Occurred",icon:"error",content:"We encountered an error while processing your request. Please try again or contact support if the problem persists."},{label:"Information",variant:"primary",title:"About This Feature",icon:"info",content:"This feature helps you manage your account settings more efficiently. You can customize various options to suit your preferences."}].forEach(({label:e,variant:t,title:i,icon:u,content:a})=>{const l=document.createElement("my-button");l.setAttribute("label",e),l.setAttribute("variant",t);const r=document.createElement("my-modal");r.setAttribute("title",i),r.setAttribute("size","sm"),r.setAttribute("close-on-backdrop-click",""),r.setAttribute("close-on-escape","");const o=document.createElement("div");o.style.cssText="display: flex; flex-direction: column; gap: 20px;";const c=document.createElement("div");c.style.cssText="display: flex; gap: 12px; align-items: flex-start;";const d=document.createElement("my-icon");d.setAttribute("icon",u),d.setAttribute("size","md"),d.style.color=`var(--_global-color-${t})`,d.style.marginTop="2px";const p=document.createElement("p");p.textContent=a,p.style.cssText="margin: 0; line-height: 1.5;",c.appendChild(d),c.appendChild(p);const m=document.createElement("my-button");m.setAttribute("label","OK"),m.setAttribute("variant",t),m.style.alignSelf="flex-end",m.addEventListener("click",()=>{r.removeAttribute("open")}),o.appendChild(c),o.appendChild(m),r.appendChild(o),l.addEventListener("click",()=>{r.setAttribute("open","")}),n.appendChild(l),n.appendChild(r)}),n};v.parameters={docs:{description:{story:"Information modals with different message types and appropriate styling."}}};const A=()=>{const n=document.createElement("div"),s=document.createElement("my-button");s.setAttribute("label","Open Custom Modal"),s.setAttribute("variant","filled");const e=document.createElement("my-modal");e.setAttribute("title","Custom Styled Modal"),e.setAttribute("size","lg"),e.setAttribute("close-on-backdrop-click",""),e.setAttribute("close-on-escape","");const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 24px;";const i=document.createElement("div");i.style.cssText=`
    background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-secondary) 100%);
    color: var(--_global-color-on-primary);
    padding: 32px 24px;
    margin: -24px -24px 0 -24px;
    border-radius: var(--_global-border-radius-lg) var(--_global-border-radius-lg) 0 0;
    text-align: center;
  `;const u=document.createElement("h2");u.textContent="Welcome to MyntUI",u.style.cssText="margin: 0 0 8px 0; font-size: 24px; font-weight: var(--_global-font-weight-bold);";const a=document.createElement("p");a.textContent="A beautiful, framework-agnostic component library",a.style.cssText="margin: 0; opacity: 0.9; font-size: 16px;",i.appendChild(u),i.appendChild(a);const l=document.createElement("div");l.style.cssText="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;",[{icon:"web_asset",title:"Web Components",desc:"Built with native Web Components"},{icon:"palette",title:"Material Design 3",desc:"Modern Material Design principles"},{icon:"accessibility",title:"Accessible",desc:"WCAG 2.1 compliant by default"},{icon:"devices",title:"Responsive",desc:"Works on all screen sizes"}].forEach(({icon:p,title:m,desc:b})=>{const g=document.createElement("div");g.style.cssText="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 16px;";const C=document.createElement("my-icon");C.setAttribute("icon",p),C.setAttribute("size","lg"),C.style.color="var(--_global-color-primary)";const T=document.createElement("h3");T.textContent=m,T.style.cssText="margin: 12px 0 4px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);";const B=document.createElement("p");B.textContent=b,B.style.cssText="margin: 0; font-size: 14px; color: var(--_global-color-text-secondary); line-height: 1.4;",g.appendChild(C),g.appendChild(T),g.appendChild(B),l.appendChild(g)});const o=document.createElement("div");o.style.cssText="display: flex; gap: 12px; justify-content: center; padding-top: 8px;";const c=document.createElement("my-button");c.setAttribute("label","View Documentation"),c.setAttribute("variant","filled");const d=document.createElement("my-button");return d.setAttribute("label","GitHub Repository"),d.setAttribute("variant","outlined"),c.addEventListener("click",()=>{console.log("Opening documentation..."),e.removeAttribute("open")}),d.addEventListener("click",()=>{console.log("Opening GitHub repository..."),e.removeAttribute("open")}),o.appendChild(c),o.appendChild(d),t.appendChild(i),t.appendChild(l),t.appendChild(o),e.appendChild(t),s.addEventListener("click",()=>{e.setAttribute("open","")}),n.appendChild(s),n.appendChild(e),n};A.parameters={docs:{description:{story:"Example of a custom styled modal with rich content and branding."}}};const E=()=>{const n=document.createElement("div"),s=document.createElement("my-button");s.setAttribute("label","Open First Modal"),s.setAttribute("variant","filled");const e=document.createElement("my-modal");e.setAttribute("title","First Modal"),e.setAttribute("size","md"),e.setAttribute("close-on-backdrop-click",""),e.setAttribute("close-on-escape","");const t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; gap: 20px;";const i=document.createElement("p");i.textContent="This is the first modal. You can open another modal from here to demonstrate modal stacking.";const u=document.createElement("my-button");u.setAttribute("label","Open Second Modal"),u.setAttribute("variant","outlined"),t.appendChild(i),t.appendChild(u),e.appendChild(t);const a=document.createElement("my-modal");a.setAttribute("title","Second Modal"),a.setAttribute("size","sm"),a.setAttribute("close-on-backdrop-click",""),a.setAttribute("close-on-escape","");const l=document.createElement("div");l.style.cssText="display: flex; flex-direction: column; gap: 20px;";const r=document.createElement("p");r.textContent="This is the second modal, opened on top of the first one. Modal stacking helps manage complex workflows.";const o=document.createElement("my-button");return o.setAttribute("label","Close This Modal"),o.setAttribute("variant","filled"),l.appendChild(r),l.appendChild(o),a.appendChild(l),s.addEventListener("click",()=>{e.setAttribute("open","")}),u.addEventListener("click",()=>{a.setAttribute("open","")}),o.addEventListener("click",()=>{a.removeAttribute("open")}),n.appendChild(s),n.appendChild(e),n.appendChild(a),n};E.parameters={docs:{description:{story:"Demonstration of stacked modals with proper z-index management."}}};var k,M,D;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  const triggerButton = document.createElement('my-button');
  triggerButton.setAttribute('label', 'Open Modal');
  triggerButton.setAttribute('variant', 'filled');
  const modal = document.createElement('my-modal');
  if (args.title) modal.setAttribute('title', args.title);
  if (args.size && args.size !== 'md') modal.setAttribute('size', args.size);
  if (args.closeOnBackdropClick) modal.setAttribute('close-on-backdrop-click', '');
  if (args.closeOnEscape) modal.setAttribute('close-on-escape', '');

  // Add content
  modal.innerHTML = args.content || \`
    <p>This is a modal dialog with some content. You can close it by clicking the X button, clicking outside (if enabled), or pressing Escape (if enabled).</p>
    <p>Modal dialogs are useful for displaying important information, forms, confirmations, or other content that requires the user's immediate attention.</p>
  \`;
  triggerButton.addEventListener('click', () => {
    modal.setAttribute('open', '');
  });
  modal.addEventListener('close', () => {
    console.log('Modal closed');
  });
  container.appendChild(triggerButton);
  container.appendChild(modal);
  return container;
}`,...(D=(M=f.parameters)==null?void 0:M.docs)==null?void 0:D.source}}};var S,w,z;y.parameters={...y.parameters,docs:{...(S=y.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';
  const sizes = ['sm', 'md', 'lg', 'xl', 'fullscreen'];
  sizes.forEach(size => {
    const triggerButton = document.createElement('my-button');
    triggerButton.setAttribute('label', \`\${size.toUpperCase()} Modal\`);
    triggerButton.setAttribute('variant', 'outlined');
    const modal = document.createElement('my-modal');
    modal.setAttribute('title', \`\${size.toUpperCase()} Size Modal\`);
    modal.setAttribute('size', size);
    modal.setAttribute('close-on-backdrop-click', '');
    modal.setAttribute('close-on-escape', '');
    modal.innerHTML = \`
      <p>This is a <strong>\${size}</strong> sized modal dialog.</p>
      <p>Modal dialogs automatically adjust their size based on the content and the specified size variant.</p>
      \${size === 'fullscreen' ? '<p>Fullscreen modals take up the entire viewport and are useful for complex forms or detailed content.</p>' : ''}
    \`;
    triggerButton.addEventListener('click', () => {
      modal.setAttribute('open', '');
    });
    container.appendChild(triggerButton);
    container.appendChild(modal);
  });
  return container;
}`,...(z=(w=y.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var L,I,O;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';
  const confirmTypes = [{
    label: 'Delete Item',
    variant: 'danger',
    title: 'Confirm Delete',
    content: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel'
  }, {
    label: 'Save Changes',
    variant: 'primary',
    title: 'Save Changes',
    content: 'Do you want to save the changes you made?',
    confirmText: 'Save',
    cancelText: 'Discard'
  }, {
    label: 'Sign Out',
    variant: 'secondary',
    title: 'Sign Out',
    content: 'Are you sure you want to sign out of your account?',
    confirmText: 'Sign Out',
    cancelText: 'Stay Signed In'
  }];
  confirmTypes.forEach(({
    label,
    variant,
    title,
    content,
    confirmText,
    cancelText
  }) => {
    const triggerButton = document.createElement('my-button');
    triggerButton.setAttribute('label', label);
    triggerButton.setAttribute('variant', variant);
    const modal = document.createElement('my-modal');
    modal.setAttribute('title', title);
    modal.setAttribute('size', 'sm');
    modal.setAttribute('close-on-escape', '');
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
    const textDiv = document.createElement('p');
    textDiv.textContent = content;
    textDiv.style.margin = '0';
    const actionsDiv = document.createElement('div');
    actionsDiv.style.cssText = 'display: flex; gap: 12px; justify-content: flex-end;';
    const cancelButton = document.createElement('my-button');
    cancelButton.setAttribute('label', cancelText);
    cancelButton.setAttribute('variant', 'text');
    const confirmButton = document.createElement('my-button');
    confirmButton.setAttribute('label', confirmText);
    confirmButton.setAttribute('variant', variant);
    cancelButton.addEventListener('click', () => {
      modal.removeAttribute('open');
    });
    confirmButton.addEventListener('click', () => {
      console.log(\`\${title} confirmed\`);
      modal.removeAttribute('open');
    });
    actionsDiv.appendChild(cancelButton);
    actionsDiv.appendChild(confirmButton);
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(actionsDiv);
    modal.appendChild(contentDiv);
    triggerButton.addEventListener('click', () => {
      modal.setAttribute('open', '');
    });
    container.appendChild(triggerButton);
    container.appendChild(modal);
  });
  return container;
}`,...(O=(I=h.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var N,_,F;x.parameters={...x.parameters,docs:{...(N=x.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  const triggerButton = document.createElement('my-button');
  triggerButton.setAttribute('label', 'Add New User');
  triggerButton.setAttribute('variant', 'filled');
  const modal = document.createElement('my-modal');
  modal.setAttribute('title', 'Add New User');
  modal.setAttribute('size', 'md');
  modal.setAttribute('close-on-escape', '');
  const form = document.createElement('form');
  form.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';

  // Form fields
  const firstNameInput = document.createElement('my-input');
  firstNameInput.setAttribute('label', 'First Name');
  firstNameInput.setAttribute('type', 'text');
  firstNameInput.setAttribute('required', '');
  const lastNameInput = document.createElement('my-input');
  lastNameInput.setAttribute('label', 'Last Name');
  lastNameInput.setAttribute('type', 'text');
  lastNameInput.setAttribute('required', '');
  const emailInput = document.createElement('my-input');
  emailInput.setAttribute('label', 'Email Address');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('required', '');
  emailInput.setAttribute('leading-icon', 'email');
  const roleSelect = document.createElement('my-input');
  roleSelect.setAttribute('label', 'Role');
  roleSelect.setAttribute('type', 'select');
  roleSelect.setAttribute('options', JSON.stringify([{
    label: 'User',
    value: 'user'
  }, {
    label: 'Admin',
    value: 'admin'
  }, {
    label: 'Moderator',
    value: 'moderator'
  }]));
  const notesTextarea = document.createElement('my-input');
  notesTextarea.setAttribute('label', 'Notes');
  notesTextarea.setAttribute('type', 'textarea');
  notesTextarea.setAttribute('helper-text', 'Optional notes about this user');

  // Form actions
  const actionsDiv = document.createElement('div');
  actionsDiv.style.cssText = 'display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;';
  const cancelButton = document.createElement('my-button');
  cancelButton.setAttribute('label', 'Cancel');
  cancelButton.setAttribute('variant', 'text');
  const saveButton = document.createElement('my-button');
  saveButton.setAttribute('label', 'Add User');
  saveButton.setAttribute('variant', 'filled');
  cancelButton.addEventListener('click', e => {
    e.preventDefault();
    modal.removeAttribute('open');
  });
  saveButton.addEventListener('click', e => {
    e.preventDefault();
    // Simple form validation
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    if (!firstName || !lastName || !email) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('User added:', {
      firstName,
      lastName,
      email
    });
    modal.removeAttribute('open');

    // Reset form
    form.reset();
  });
  actionsDiv.appendChild(cancelButton);
  actionsDiv.appendChild(saveButton);
  form.appendChild(firstNameInput);
  form.appendChild(lastNameInput);
  form.appendChild(emailInput);
  form.appendChild(roleSelect);
  form.appendChild(notesTextarea);
  form.appendChild(actionsDiv);
  modal.appendChild(form);
  triggerButton.addEventListener('click', () => {
    modal.setAttribute('open', '');
  });
  container.appendChild(triggerButton);
  container.appendChild(modal);
  return container;
}`,...(F=(_=x.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var U,W,q;v.parameters={...v.parameters,docs:{...(U=v.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap;';
  const infoTypes = [{
    label: 'Success Message',
    variant: 'success',
    title: 'Operation Successful',
    icon: 'check_circle',
    content: 'Your changes have been saved successfully. The system has been updated with your new settings.'
  }, {
    label: 'Warning Message',
    variant: 'warning',
    title: 'Important Notice',
    icon: 'warning',
    content: 'Please note that this action may affect other users. We recommend backing up your data before proceeding.'
  }, {
    label: 'Error Message',
    variant: 'error',
    title: 'Error Occurred',
    icon: 'error',
    content: 'We encountered an error while processing your request. Please try again or contact support if the problem persists.'
  }, {
    label: 'Information',
    variant: 'primary',
    title: 'About This Feature',
    icon: 'info',
    content: 'This feature helps you manage your account settings more efficiently. You can customize various options to suit your preferences.'
  }];
  infoTypes.forEach(({
    label,
    variant,
    title,
    icon,
    content
  }) => {
    const triggerButton = document.createElement('my-button');
    triggerButton.setAttribute('label', label);
    triggerButton.setAttribute('variant', variant);
    const modal = document.createElement('my-modal');
    modal.setAttribute('title', title);
    modal.setAttribute('size', 'sm');
    modal.setAttribute('close-on-backdrop-click', '');
    modal.setAttribute('close-on-escape', '');
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = 'display: flex; gap: 12px; align-items: flex-start;';
    const iconEl = document.createElement('my-icon');
    iconEl.setAttribute('icon', icon);
    iconEl.setAttribute('size', 'md');
    iconEl.style.color = \`var(--_global-color-\${variant})\`;
    iconEl.style.marginTop = '2px';
    const textDiv = document.createElement('p');
    textDiv.textContent = content;
    textDiv.style.cssText = 'margin: 0; line-height: 1.5;';
    messageDiv.appendChild(iconEl);
    messageDiv.appendChild(textDiv);
    const okButton = document.createElement('my-button');
    okButton.setAttribute('label', 'OK');
    okButton.setAttribute('variant', variant);
    okButton.style.alignSelf = 'flex-end';
    okButton.addEventListener('click', () => {
      modal.removeAttribute('open');
    });
    contentDiv.appendChild(messageDiv);
    contentDiv.appendChild(okButton);
    modal.appendChild(contentDiv);
    triggerButton.addEventListener('click', () => {
      modal.setAttribute('open', '');
    });
    container.appendChild(triggerButton);
    container.appendChild(modal);
  });
  return container;
}`,...(q=(W=v.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var $,H,j;A.parameters={...A.parameters,docs:{...($=A.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  const triggerButton = document.createElement('my-button');
  triggerButton.setAttribute('label', 'Open Custom Modal');
  triggerButton.setAttribute('variant', 'filled');
  const modal = document.createElement('my-modal');
  modal.setAttribute('title', 'Custom Styled Modal');
  modal.setAttribute('size', 'lg');
  modal.setAttribute('close-on-backdrop-click', '');
  modal.setAttribute('close-on-escape', '');
  const content = document.createElement('div');
  content.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';

  // Hero section
  const hero = document.createElement('div');
  hero.style.cssText = \`
    background: linear-gradient(135deg, var(--_global-color-primary) 0%, var(--_global-color-secondary) 100%);
    color: var(--_global-color-on-primary);
    padding: 32px 24px;
    margin: -24px -24px 0 -24px;
    border-radius: var(--_global-border-radius-lg) var(--_global-border-radius-lg) 0 0;
    text-align: center;
  \`;
  const heroTitle = document.createElement('h2');
  heroTitle.textContent = 'Welcome to MyntUI';
  heroTitle.style.cssText = 'margin: 0 0 8px 0; font-size: 24px; font-weight: var(--_global-font-weight-bold);';
  const heroSubtitle = document.createElement('p');
  heroSubtitle.textContent = 'A beautiful, framework-agnostic component library';
  heroSubtitle.style.cssText = 'margin: 0; opacity: 0.9; font-size: 16px;';
  hero.appendChild(heroTitle);
  hero.appendChild(heroSubtitle);

  // Features section
  const features = document.createElement('div');
  features.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;';
  const featuresList = [{
    icon: 'web_asset',
    title: 'Web Components',
    desc: 'Built with native Web Components'
  }, {
    icon: 'palette',
    title: 'Material Design 3',
    desc: 'Modern Material Design principles'
  }, {
    icon: 'accessibility',
    title: 'Accessible',
    desc: 'WCAG 2.1 compliant by default'
  }, {
    icon: 'devices',
    title: 'Responsive',
    desc: 'Works on all screen sizes'
  }];
  featuresList.forEach(({
    icon,
    title,
    desc
  }) => {
    const feature = document.createElement('div');
    feature.style.cssText = 'display: flex; flex-direction: column; align-items: center; text-align: center; padding: 16px;';
    const featureIcon = document.createElement('my-icon');
    featureIcon.setAttribute('icon', icon);
    featureIcon.setAttribute('size', 'lg');
    featureIcon.style.color = 'var(--_global-color-primary)';
    const featureTitle = document.createElement('h3');
    featureTitle.textContent = title;
    featureTitle.style.cssText = 'margin: 12px 0 4px 0; font-size: 16px; font-weight: var(--_global-font-weight-medium);';
    const featureDesc = document.createElement('p');
    featureDesc.textContent = desc;
    featureDesc.style.cssText = 'margin: 0; font-size: 14px; color: var(--_global-color-text-secondary); line-height: 1.4;';
    feature.appendChild(featureIcon);
    feature.appendChild(featureTitle);
    feature.appendChild(featureDesc);
    features.appendChild(feature);
  });

  // Actions
  const actions = document.createElement('div');
  actions.style.cssText = 'display: flex; gap: 12px; justify-content: center; padding-top: 8px;';
  const docsButton = document.createElement('my-button');
  docsButton.setAttribute('label', 'View Documentation');
  docsButton.setAttribute('variant', 'filled');
  const githubButton = document.createElement('my-button');
  githubButton.setAttribute('label', 'GitHub Repository');
  githubButton.setAttribute('variant', 'outlined');
  docsButton.addEventListener('click', () => {
    console.log('Opening documentation...');
    modal.removeAttribute('open');
  });
  githubButton.addEventListener('click', () => {
    console.log('Opening GitHub repository...');
    modal.removeAttribute('open');
  });
  actions.appendChild(docsButton);
  actions.appendChild(githubButton);
  content.appendChild(hero);
  content.appendChild(features);
  content.appendChild(actions);
  modal.appendChild(content);
  triggerButton.addEventListener('click', () => {
    modal.setAttribute('open', '');
  });
  container.appendChild(triggerButton);
  container.appendChild(modal);
  return container;
}`,...(j=(H=A.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var Y,R,G;E.parameters={...E.parameters,docs:{...(Y=E.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  const triggerButton = document.createElement('my-button');
  triggerButton.setAttribute('label', 'Open First Modal');
  triggerButton.setAttribute('variant', 'filled');

  // First modal
  const firstModal = document.createElement('my-modal');
  firstModal.setAttribute('title', 'First Modal');
  firstModal.setAttribute('size', 'md');
  firstModal.setAttribute('close-on-backdrop-click', '');
  firstModal.setAttribute('close-on-escape', '');
  const firstContent = document.createElement('div');
  firstContent.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';
  const firstText = document.createElement('p');
  firstText.textContent = 'This is the first modal. You can open another modal from here to demonstrate modal stacking.';
  const openSecondButton = document.createElement('my-button');
  openSecondButton.setAttribute('label', 'Open Second Modal');
  openSecondButton.setAttribute('variant', 'outlined');
  firstContent.appendChild(firstText);
  firstContent.appendChild(openSecondButton);
  firstModal.appendChild(firstContent);

  // Second modal
  const secondModal = document.createElement('my-modal');
  secondModal.setAttribute('title', 'Second Modal');
  secondModal.setAttribute('size', 'sm');
  secondModal.setAttribute('close-on-backdrop-click', '');
  secondModal.setAttribute('close-on-escape', '');
  const secondContent = document.createElement('div');
  secondContent.style.cssText = 'display: flex; flex-direction: column; gap: 20px;';
  const secondText = document.createElement('p');
  secondText.textContent = 'This is the second modal, opened on top of the first one. Modal stacking helps manage complex workflows.';
  const closeSecondButton = document.createElement('my-button');
  closeSecondButton.setAttribute('label', 'Close This Modal');
  closeSecondButton.setAttribute('variant', 'filled');
  secondContent.appendChild(secondText);
  secondContent.appendChild(closeSecondButton);
  secondModal.appendChild(secondContent);

  // Event listeners
  triggerButton.addEventListener('click', () => {
    firstModal.setAttribute('open', '');
  });
  openSecondButton.addEventListener('click', () => {
    secondModal.setAttribute('open', '');
  });
  closeSecondButton.addEventListener('click', () => {
    secondModal.removeAttribute('open');
  });
  container.appendChild(triggerButton);
  container.appendChild(firstModal);
  container.appendChild(secondModal);
  return container;
}`,...(G=(R=E.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};const ee=["Default","Sizes","ConfirmationDialog","FormModal","InformationModal","CustomStyled","StackedModals"];export{h as ConfirmationDialog,A as CustomStyled,f as Default,x as FormModal,v as InformationModal,y as Sizes,E as StackedModals,ee as __namedExportsOrder,Z as default};
