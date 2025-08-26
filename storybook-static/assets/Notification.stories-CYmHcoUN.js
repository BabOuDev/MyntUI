import"./my-notification-CsCwobM5.js";import"./my-button-WudZcNwy.js";import"./base-component-q4KNMHwB.js";const j={title:"Components/my-notification",parameters:{docs:{description:{component:"Ephemeral, non-intrusive messages that provide feedback to users. Features auto-dismiss, hover pause, stacking, and programmatic API."}}},argTypes:{message:{control:"text",description:"Notification message text"},type:{control:{type:"select"},options:["info","success","warning","error"],description:"Notification type/severity"},duration:{control:{type:"number",min:0,max:15e3,step:500},description:"Auto-dismiss duration in milliseconds (0 = no auto-dismiss)"},position:{control:{type:"select"},options:["top-right","top-left","top-center","bottom-right","bottom-left","bottom-center"],description:"Notification position on screen"},closeable:{control:"boolean",description:"Show close button"},icon:{control:"text",description:"Custom icon (Material Icons name)"}}},r=e=>{const n=document.createElement("my-notification");return e.message&&n.setAttribute("message",e.message),e.type&&e.type!=="info"&&n.setAttribute("type",e.type),e.duration!==void 0&&n.setAttribute("duration",e.duration),e.position&&e.position!=="top-right"&&n.setAttribute("position",e.position),e.closeable&&n.setAttribute("closeable",""),e.icon&&n.setAttribute("icon",e.icon),n.show(),n},q=e=>{const n=document.createElement("div");n.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 16px;";const t=document.createElement("div");t.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Interactive Notification Demo</h3>
    <p style="margin: 0; color: var(--_global-color-text-secondary);">
      Click the button below to show a notification with your configured settings.
    </p>
  `;const i=document.createElement("my-button");return i.setAttribute("label","Show Notification"),i.setAttribute("variant","filled"),i.addEventListener("click",()=>{r(e)}),n.appendChild(t),n.appendChild(i),n},l=q.bind({});l.args={message:"This is a default notification message",type:"info",duration:5e3,position:"top-right",closeable:!0,icon:""};const d=()=>{const e=document.createElement("div");return e.style.cssText="padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;",[{type:"success",message:"Operation completed successfully!",label:"Success"},{type:"error",message:"An error occurred while processing your request.",label:"Error"},{type:"warning",message:"Please review your settings before continuing.",label:"Warning"},{type:"info",message:"Here is some helpful information for you.",label:"Info"}].forEach(({type:t,message:i,label:o})=>{const s=document.createElement("my-button");s.setAttribute("label",`Show ${o}`),s.setAttribute("variant",t==="error"?"error":t==="success"?"success":"outlined"),s.addEventListener("click",()=>{r({message:i,type:t,duration:4e3,closeable:!0})}),e.appendChild(s)}),e};d.parameters={docs:{description:{story:"Different notification types for various message contexts."}}};const u=()=>{const e=document.createElement("div");return e.style.cssText="padding: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;",[{position:"top-left",label:"Top Left"},{position:"top-center",label:"Top Center"},{position:"top-right",label:"Top Right"},{position:"bottom-left",label:"Bottom Left"},{position:"bottom-center",label:"Bottom Center"},{position:"bottom-right",label:"Bottom Right"}].forEach(({position:t,label:i})=>{const o=document.createElement("my-button");o.setAttribute("label",i),o.setAttribute("variant","outlined"),o.setAttribute("size","sm"),o.addEventListener("click",()=>{r({message:`Notification positioned at ${i.toLowerCase()}`,type:"info",position:t,duration:3e3,closeable:!0})}),e.appendChild(o)}),e};u.parameters={docs:{description:{story:"Notifications can be positioned in any corner or edge of the screen."}}};const p=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px; display: flex; flex-direction: column; gap: 16px;";const n=document.createElement("div");n.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Notification Stacking</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Multiple notifications stack vertically and automatically reposition when others are dismissed.
    </p>
  `;const t=document.createElement("div");t.style.cssText="display: flex; gap: 12px; flex-wrap: wrap;";const i=document.createElement("my-button");i.setAttribute("label","Add 3 Notifications"),i.setAttribute("variant","filled"),i.addEventListener("click",()=>{[{message:"First notification in stack",type:"info"},{message:"Second notification in stack",type:"success"},{message:"Third notification in stack",type:"warning"}].forEach((a,c)=>{setTimeout(()=>{r({...a,duration:6e3,closeable:!0})},c*200)})});const o=document.createElement("my-button");return o.setAttribute("label","Stack on Left"),o.setAttribute("variant","outlined"),o.addEventListener("click",()=>{[{message:"Left-positioned notification 1",type:"info"},{message:"Left-positioned notification 2",type:"success"}].forEach((a,c)=>{setTimeout(()=>{r({...a,position:"top-left",duration:5e3,closeable:!0})},c*300)})}),t.appendChild(i),t.appendChild(o),e.appendChild(n),e.appendChild(t),e};p.parameters={docs:{description:{story:"Demonstrates how multiple notifications stack and reposition automatically."}}};const m=()=>{const e=document.createElement("div");return e.style.cssText="padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;",[{duration:2e3,label:"Quick (2s)",variant:"outlined"},{duration:5e3,label:"Normal (5s)",variant:"filled"},{duration:1e4,label:"Long (10s)",variant:"text"},{duration:0,label:"Persistent",variant:"error"}].forEach(({duration:t,label:i,variant:o})=>{const s=document.createElement("my-button");s.setAttribute("label",i),s.setAttribute("variant",o),s.addEventListener("click",()=>{r({message:t===0?"This notification stays until closed":`Auto-closes in ${t/1e3} seconds`,type:t===0?"warning":"info",duration:t,closeable:!0})}),e.appendChild(s)}),e};m.parameters={docs:{description:{story:"Different auto-dismiss durations, including persistent notifications."}}};const b=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px;";const n=document.createElement("div");n.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Programmatic API</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Notifications can be created using JavaScript API methods.
    </p>
    <div style="background: var(--_global-color-surface-container); padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px; margin-bottom: 16px;">
      <strong>Available methods:</strong><br>
      • MyNotification.info(message, duration)<br>
      • MyNotification.success(message, duration)<br>
      • MyNotification.warning(message, duration)<br>
      • MyNotification.error(message, duration)
    </div>
  `;const t=document.createElement("div");return t.style.cssText="display: flex; gap: 12px; flex-wrap: wrap;",[{method:"info",label:"API Info",message:"Created with MyNotification.info()"},{method:"success",label:"API Success",message:"Created with MyNotification.success()"},{method:"warning",label:"API Warning",message:"Created with MyNotification.warning()"},{method:"error",label:"API Error",message:"Created with MyNotification.error()"}].forEach(({method:o,label:s,message:a})=>{const c=document.createElement("my-button");c.setAttribute("label",s),c.setAttribute("variant",o==="error"?"error":o==="success"?"success":"outlined"),c.addEventListener("click",()=>{typeof MyNotification<"u"?MyNotification[o](a):r({message:a,type:o,duration:o==="error"?8e3:o==="warning"?6e3:5e3,closeable:!0})}),t.appendChild(c)}),e.appendChild(n),e.appendChild(t),e};b.parameters={docs:{description:{story:"Using the programmatic JavaScript API to create notifications."}}};const f=()=>{const e=document.createElement("div");return e.style.cssText="padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;",[{icon:"star",message:"You received a new rating!",type:"success",label:"Star"},{icon:"email",message:"New message received",type:"info",label:"Email"},{icon:"sync",message:"Synchronization in progress...",type:"info",label:"Sync"},{icon:"security",message:"Security settings updated",type:"warning",label:"Security"}].forEach(({icon:t,message:i,type:o,label:s})=>{const a=document.createElement("my-button");a.setAttribute("label",s),a.setAttribute("variant","outlined"),a.addEventListener("click",()=>{r({message:i,type:o,icon:t,duration:4e3,closeable:!0})}),e.appendChild(a)}),e};f.parameters={docs:{description:{story:"Notifications with custom icons from Material Icons."}}};const g=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px;";const n=document.createElement("div");n.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Interactive Features</h3>
    <ul style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Hover to pause auto-dismiss timer</li>
      <li>Click to dismiss (when closeable)</li>
      <li>Progress bar shows remaining time</li>
      <li>Smooth stacking animations</li>
    </ul>
  `;const t=document.createElement("my-button");return t.setAttribute("label","Show Interactive Notification"),t.setAttribute("variant","filled"),t.addEventListener("click",()=>{r({message:"Hover over me to pause the timer! The progress bar shows time remaining.",type:"info",duration:8e3,closeable:!0})}),e.appendChild(n),e.appendChild(t),e};g.parameters={docs:{description:{story:"Interactive features like hover-to-pause and visual progress indicators."}}};const y=()=>{const e=document.createElement("div");e.style.cssText="padding: 24px;";const n=document.createElement("div");n.innerHTML=`
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Uses role="alert" and aria-live="polite" for screen readers</li>
      <li>Keyboard accessible close buttons</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast support</li>
      <li>Responsive design for mobile devices</li>
    </ul>
  `;const t=document.createElement("my-button");return t.setAttribute("label","Test Accessibility"),t.setAttribute("variant","outlined"),t.addEventListener("click",()=>{r({message:"This notification is fully accessible and will be announced by screen readers.",type:"success",duration:6e3,closeable:!0})}),e.appendChild(n),e.appendChild(t),e};y.parameters={docs:{description:{story:"Comprehensive accessibility features for inclusive user experience."}}};var h,v,x;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Interactive Notification Demo</h3>
    <p style="margin: 0; color: var(--_global-color-text-secondary);">
      Click the button below to show a notification with your configured settings.
    </p>
  \`;
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Show Notification');
  button.setAttribute('variant', 'filled');
  button.addEventListener('click', () => {
    createNotification(args);
  });
  container.appendChild(info);
  container.appendChild(button);
  return container;
}`,...(x=(v=l.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var E,w,A;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  const types = [{
    type: 'success',
    message: 'Operation completed successfully!',
    label: 'Success'
  }, {
    type: 'error',
    message: 'An error occurred while processing your request.',
    label: 'Error'
  }, {
    type: 'warning',
    message: 'Please review your settings before continuing.',
    label: 'Warning'
  }, {
    type: 'info',
    message: 'Here is some helpful information for you.',
    label: 'Info'
  }];
  types.forEach(({
    type,
    message,
    label
  }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', \`Show \${label}\`);
    button.setAttribute('variant', type === 'error' ? 'error' : type === 'success' ? 'success' : 'outlined');
    button.addEventListener('click', () => {
      createNotification({
        message,
        type,
        duration: 4000,
        closeable: true
      });
    });
    container.appendChild(button);
  });
  return container;
}`,...(A=(w=d.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var C,N,T;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;';
  const positions = [{
    position: 'top-left',
    label: 'Top Left'
  }, {
    position: 'top-center',
    label: 'Top Center'
  }, {
    position: 'top-right',
    label: 'Top Right'
  }, {
    position: 'bottom-left',
    label: 'Bottom Left'
  }, {
    position: 'bottom-center',
    label: 'Bottom Center'
  }, {
    position: 'bottom-right',
    label: 'Bottom Right'
  }];
  positions.forEach(({
    position,
    label
  }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    button.setAttribute('size', 'sm');
    button.addEventListener('click', () => {
      createNotification({
        message: \`Notification positioned at \${label.toLowerCase()}\`,
        type: 'info',
        position,
        duration: 3000,
        closeable: true
      });
    });
    container.appendChild(button);
  });
  return container;
}`,...(T=(N=u.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var k,L,S;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; flex-direction: column; gap: 16px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Notification Stacking</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Multiple notifications stack vertically and automatically reposition when others are dismissed.
    </p>
  \`;
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap;';

  // Add multiple notifications
  const addMultipleButton = document.createElement('my-button');
  addMultipleButton.setAttribute('label', 'Add 3 Notifications');
  addMultipleButton.setAttribute('variant', 'filled');
  addMultipleButton.addEventListener('click', () => {
    const messages = [{
      message: 'First notification in stack',
      type: 'info'
    }, {
      message: 'Second notification in stack',
      type: 'success'
    }, {
      message: 'Third notification in stack',
      type: 'warning'
    }];
    messages.forEach((msg, index) => {
      setTimeout(() => {
        createNotification({
          ...msg,
          duration: 6000,
          closeable: true
        });
      }, index * 200);
    });
  });

  // Add notification with different position
  const leftPositionButton = document.createElement('my-button');
  leftPositionButton.setAttribute('label', 'Stack on Left');
  leftPositionButton.setAttribute('variant', 'outlined');
  leftPositionButton.addEventListener('click', () => {
    const messages = [{
      message: 'Left-positioned notification 1',
      type: 'info'
    }, {
      message: 'Left-positioned notification 2',
      type: 'success'
    }];
    messages.forEach((msg, index) => {
      setTimeout(() => {
        createNotification({
          ...msg,
          position: 'top-left',
          duration: 5000,
          closeable: true
        });
      }, index * 300);
    });
  });
  buttonsContainer.appendChild(addMultipleButton);
  buttonsContainer.appendChild(leftPositionButton);
  container.appendChild(info);
  container.appendChild(buttonsContainer);
  return container;
}`,...(S=(L=p.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var M,P,I;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  const durations = [{
    duration: 2000,
    label: 'Quick (2s)',
    variant: 'outlined'
  }, {
    duration: 5000,
    label: 'Normal (5s)',
    variant: 'filled'
  }, {
    duration: 10000,
    label: 'Long (10s)',
    variant: 'text'
  }, {
    duration: 0,
    label: 'Persistent',
    variant: 'error'
  }];
  durations.forEach(({
    duration,
    label,
    variant
  }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', variant);
    button.addEventListener('click', () => {
      createNotification({
        message: duration === 0 ? 'This notification stays until closed' : \`Auto-closes in \${duration / 1000} seconds\`,
        type: duration === 0 ? 'warning' : 'info',
        duration,
        closeable: true
      });
    });
    container.appendChild(button);
  });
  return container;
}`,...(I=(P=m.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var B,H,_;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Programmatic API</h3>
    <p style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary);">
      Notifications can be created using JavaScript API methods.
    </p>
    <div style="background: var(--_global-color-surface-container); padding: 16px; border-radius: 8px; font-family: monospace; font-size: 14px; margin-bottom: 16px;">
      <strong>Available methods:</strong><br>
      • MyNotification.info(message, duration)<br>
      • MyNotification.success(message, duration)<br>
      • MyNotification.warning(message, duration)<br>
      • MyNotification.error(message, duration)
    </div>
  \`;
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = 'display: flex; gap: 12px; flex-wrap: wrap;';
  const apiButtons = [{
    method: 'info',
    label: 'API Info',
    message: 'Created with MyNotification.info()'
  }, {
    method: 'success',
    label: 'API Success',
    message: 'Created with MyNotification.success()'
  }, {
    method: 'warning',
    label: 'API Warning',
    message: 'Created with MyNotification.warning()'
  }, {
    method: 'error',
    label: 'API Error',
    message: 'Created with MyNotification.error()'
  }];
  apiButtons.forEach(({
    method,
    label,
    message
  }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', method === 'error' ? 'error' : method === 'success' ? 'success' : 'outlined');
    button.addEventListener('click', () => {
      // Use the static API methods
      if (typeof MyNotification !== 'undefined') {
        MyNotification[method](message);
      } else {
        // Fallback for environments where the global isn't available
        createNotification({
          message,
          type: method,
          duration: method === 'error' ? 8000 : method === 'warning' ? 6000 : 5000,
          closeable: true
        });
      }
    });
    buttonsContainer.appendChild(button);
  });
  container.appendChild(info);
  container.appendChild(buttonsContainer);
  return container;
}`,...(_=(H=b.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var F,D,R;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px; display: flex; gap: 16px; flex-wrap: wrap;';
  const customNotifications = [{
    icon: 'star',
    message: 'You received a new rating!',
    type: 'success',
    label: 'Star'
  }, {
    icon: 'email',
    message: 'New message received',
    type: 'info',
    label: 'Email'
  }, {
    icon: 'sync',
    message: 'Synchronization in progress...',
    type: 'info',
    label: 'Sync'
  }, {
    icon: 'security',
    message: 'Security settings updated',
    type: 'warning',
    label: 'Security'
  }];
  customNotifications.forEach(({
    icon,
    message,
    type,
    label
  }) => {
    const button = document.createElement('my-button');
    button.setAttribute('label', label);
    button.setAttribute('variant', 'outlined');
    button.addEventListener('click', () => {
      createNotification({
        message,
        type,
        icon,
        duration: 4000,
        closeable: true
      });
    });
    container.appendChild(button);
  });
  return container;
}`,...(R=(D=f.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var z,$,U;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Interactive Features</h3>
    <ul style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Hover to pause auto-dismiss timer</li>
      <li>Click to dismiss (when closeable)</li>
      <li>Progress bar shows remaining time</li>
      <li>Smooth stacking animations</li>
    </ul>
  \`;
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Show Interactive Notification');
  button.setAttribute('variant', 'filled');
  button.addEventListener('click', () => {
    createNotification({
      message: 'Hover over me to pause the timer! The progress bar shows time remaining.',
      type: 'info',
      duration: 8000,
      closeable: true
    });
  });
  container.appendChild(info);
  container.appendChild(button);
  return container;
}`,...(U=($=g.parameters)==null?void 0:$.docs)==null?void 0:U.source}}};var W,J,O;y.parameters={...y.parameters,docs:{...(W=y.parameters)==null?void 0:W.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 24px;';
  const info = document.createElement('div');
  info.innerHTML = \`
    <h3 style="margin: 0 0 8px 0;">Accessibility Features</h3>
    <ul style="margin: 0 0 16px 0; color: var(--_global-color-text-secondary); line-height: 1.6;">
      <li>Uses role="alert" and aria-live="polite" for screen readers</li>
      <li>Keyboard accessible close buttons</li>
      <li>Respects reduced motion preferences</li>
      <li>High contrast support</li>
      <li>Responsive design for mobile devices</li>
    </ul>
  \`;
  const button = document.createElement('my-button');
  button.setAttribute('label', 'Test Accessibility');
  button.setAttribute('variant', 'outlined');
  button.addEventListener('click', () => {
    createNotification({
      message: 'This notification is fully accessible and will be announced by screen readers.',
      type: 'success',
      duration: 6000,
      closeable: true
    });
  });
  container.appendChild(info);
  container.appendChild(button);
  return container;
}`,...(O=(J=y.parameters)==null?void 0:J.docs)==null?void 0:O.source}}};const G=["Default","Types","Positions","Stacking","Duration","ProgrammaticAPI","CustomIcons","InteractiveFeatures","Accessibility"];export{y as Accessibility,f as CustomIcons,l as Default,m as Duration,g as InteractiveFeatures,u as Positions,b as ProgrammaticAPI,p as Stacking,d as Types,G as __namedExportsOrder,j as default};
