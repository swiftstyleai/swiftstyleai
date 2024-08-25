export function createShadowDivWithCSS({
  containerId,
  shadowDivId,
  cssContent,
}: {
  containerId?: string;
  shadowDivId?: string;
  cssContent: string;
}): { root: HTMLElement; rootIntoShadow: HTMLElement; rootApp: HTMLElement } {
  // Validate CSS content
  if (!cssContent) {
    throw new Error('CSS content cannot be empty');
  }

  // Create the root container div
  const root = document.createElement('div');
  if (containerId) {
    root.id = containerId;
  }

  // Create the div to be inserted into the shadow DOM
  const rootIntoShadow = document.createElement('div');
  if (shadowDivId) {
    rootIntoShadow.id = shadowDivId;
  }

  const rootApp = document.createElement('div');
  rootApp.id = 'app';

  // Attach a shadow root to the container div
  const shadowRoot = root.attachShadow({ mode: 'open' });

  // Create a stylesheet and add the CSS content
  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(cssContent);

  // Inject the stylesheet into the shadow root
  shadowRoot.adoptedStyleSheets = [globalStyleSheet];

  // Append the shadow div to the shadow root
  shadowRoot.appendChild(rootIntoShadow);
  rootIntoShadow.appendChild(rootApp);

  // Return the root and rootIntoShadow elements for further manipulation or appending to the DOM
  return { root, rootIntoShadow, rootApp };
}
