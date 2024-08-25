import fs from 'node:fs';

// const packageJson = JSON.parse(fs.readFileSync('../../package.json', 'utf8'));
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const isFirefox = process.env.__FIREFOX__ === 'true';

const sidePanelConfig = {
  side_panel: {
    default_path: 'side-panel/index.html',
  },
  permissions: !isFirefox ? ['sidePanel'] : [],
};

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = Object.assign(
  {
    manifest_version: 3,
    default_locale: 'en',
    /**
     * if you want to support multiple languages, you can use the following reference
     * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
     */
    name: '__MSG_extensionName__',
    version: packageJson.version,
    description: '__MSG_extensionDescription__',
    host_permissions: [
      '*://*.ec2-47-129-18-54.ap-southeast-1.compute.amazonaws.com/',
      '*://ec2-47-129-18-54.ap-southeast-1.compute.amazonaws.com/',
      '*://*.llm-reply-01-45hiwnsz4-particle4devs-projects.vercel.app/',
      '*://llm-reply-01-45hiwnsz4-particle4devs-projects.vercel.app/',
      '*://*.swiftstyleai-com.vercel.app/',
      '*://swiftstyleai-com.vercel.app/',
      '*://*.swiftstyleai.com/',
      '*://swiftstyleai.com/',
    ],
    permissions: [
      // Gives access to the chrome.identity API.
      // Warning displayed: Know your email address.
      // https://developer.chrome.com/docs/extensions/reference/api/identity
      // 'identity',
      // Use the chrome.tabs API to interact with the browser's tab system.
      // You can use this API to create, modify, and rearrange tabs in the browser.
      // https://developer.chrome.com/docs/extensions/reference/api/tabs
      // 'tabs',
      // Use the chrome.storage API to store, retrieve, and track changes to user data.
      // https://developer.chrome.com/docs/extensions/reference/api/storage
      'storage',
      // Use the chrome.cookies API to query and modify cookies, and to be notified when they change.
      // https://developer.chrome.com/docs/extensions/reference/api/cookies
      'cookies'
    ]
    // .concat(
    //   sidePanelConfig.permissions,
    // )
    ,
    // options_page: 'options/index.html',
    // https://developer.chrome.com/docs/extensions/mv2/background-pages
    background: {
      service_worker: 'background.iife.js',
      type: 'module',
    },
    action: {
      default_popup: 'popup/index.html',
      default_icon: 'icon-34.png',
    },
    // chrome_url_overrides: {
    //   newtab: 'new-tab/index.html',
    // },
    icons: {
      128: 'icon-128.png',
    },
    // A content script is a JavaScript file that runs in the context of a web page in a Chrome extension. Content scripts can read and modify web page details, and pass information to the extension. They run in a private execution environment that's isolated from the web page and other extensions, which can improve security and stability.
    content_scripts: [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['content/index.iife.js'],
        // https://developer.chrome.com/docs/extensions/reference/api/extensionTypes#type-RunAt
        run_at: 'document_idle',
      },
      {
        // matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        matches: [
          'https://mobile.twitter.com/*',
          'https://pro.twitter.com/*',
          'https://twitter.com/*',
          'https://x.com/*',
        ],
        js: ['content-ui/index.iife.js'],
        // https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
        // https://developer.chrome.com/docs/extensions/reference/api/extensionTypes#type-RunAt
        // The browser chooses a time to inject the script between "document_end" and immediately after the window.onload event fires. The exact moment of injection depends on how complex the document is and how long it is taking to load, and is optimized for page load speed. Content scripts running at "document_idle" don't need to listen for the window.onload event; they are guaranteed to run after the DOM completes. If a script definitely needs to run after window.onload, the extension can check if onload has already fired by using the document.readyState property.
        run_at: 'document_idle',
      },
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        css: ['content.css'], // public folder
      },
    ],
    // devtools_page: 'devtools/index.html',
    web_accessible_resources: [
      {
        resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
        matches: ['*://*/*'],
      },
    ],
  },
  /** !isFirefox && { side_panel: { ...sidePanelConfig.side_panel } }, **/
);

export default manifest;
