import React from 'react';
import { createRoot } from 'react-dom/client';
import { ALLOWXLIST, BUTTON_ID } from '@/constants';
import { listenUnmountEvent } from '@/dom';
import { isInAllowlist } from '@/lib';
import tailwindcssOutput from '@/tailwind-output-host.css?inline';
import ReplyButton from './ReplyButton';
import PostButton from './PostButton';
import { createShadowDivWithCSS } from '@/lib/dom';
import { findClosestTweet } from './dom';
import { ToasterApp } from './ToasterApp';

import Debug from 'debug';

const debug = Debug('content-ui:x-com:index');

// Counter to keep track of button instances
let buttonCounter = 0;

// Utility function to wait for the DOM to load
const waitForDOMLoad = () => new Promise((resolve) => setTimeout(resolve, 100));

// Function to create and inject a button into the toolbar
const injectButton = (ButtonComponent: React.ComponentType) => {
  const toolBar = document.querySelector('div[data-testid="toolBar"]');
  const button = toolBar
    ? toolBar.querySelector(`div.${BUTTON_ID}`)
    : undefined;
  if (toolBar && !button) {
    const {
      root: container,
      // rootIntoShadow,
      rootApp,
    } = createShadowDivWithCSS({
      cssContent: tailwindcssOutput,
    });
    // const container = document.createElement('div');
    container.style.display = 'flex';
    container.id = `${BUTTON_ID}-${++buttonCounter}`;
    container.className = BUTTON_ID;
    toolBar.children[0].children[0].appendChild(container);

    const app = createRoot(rootApp);
    app.render(<ButtonComponent />);

    // Unmount the button component when the container is removed
    listenUnmountEvent(container, () => {
      app.unmount();
    });
  }
};

const injectToasterApp = () => {
  debug('inject toaster app');

  const dom = document.querySelector('div.style-assistant-toaster-app');
  if (dom) return;

  const { root: container, rootApp } = createShadowDivWithCSS({
    cssContent: tailwindcssOutput,
  });

  container.id = 'toaster-app';
  container.className = 'style-assistant-toaster-app';
  document.body.appendChild(container);

  const app = createRoot(rootApp);
  app.render(<ToasterApp />);

  listenUnmountEvent(container, () => {
    app.unmount();
  });
};

// Function to inject the ReplyButton
export async function injectReplyButton() {
  // Wait for a short period to ensure the DOM is loaded
  await waitForDOMLoad();

  // Check if the tweet button is already in a "Post" state
  const tweetButton = document.querySelector(
    '[data-testid^="tweetButton"]',
  ) as HTMLButtonElement | null;

  if (tweetButton && tweetButton.innerText !== 'Post') {
    injectButton(ReplyButton);
    // Sửa lỗi CSS trong Twitter:
    // Trong phần aria-label="Timeline: Conversation", toàn bộ các tweet đều có z-index = 0.
    // Điều này dẫn đến việc popover của nút AI bị tweet số 1 che khuất.
    // Cách sửa là tìm tweet có nút AI và đặt zIndex = 1.
    const toolBar = document.querySelector<HTMLElement>(
      'div[data-testid="toolBar"]',
    );
    const tweet = findClosestTweet(toolBar);
    if(tweet) {
      tweet.style.zIndex = '1';
    }
  }
}

// Function to inject the PostButton
export async function injectPostButton() {
  // Wait for a short period to ensure the DOM is loaded
  await waitForDOMLoad();

  // Check if the tweet button is already in a "Post" state
  const tweetButton = document.querySelector(
    '[data-testid^="tweetButton"]',
  ) as HTMLButtonElement | null;

  if (tweetButton && tweetButton.innerText === 'Post') {
    injectButton(PostButton);
  }
}

// Create a new MutationObserver instance
const observer = new MutationObserver((mutationsList) => {
  // Iterate over each mutation event in the list
  mutationsList.forEach((mutation) => {
    // Check each node that has been added to the DOM
    mutation.addedNodes.forEach((addedNode) => {
      // Check if the added node or any of its descendants have a div with the data-testid "toolBar"
      if (addedNode instanceof HTMLElement) {
        if (
          addedNode.matches('div[data-testid="toolBar"]') ||
          addedNode.querySelector('div[data-testid="toolBar"]')
        ) {
          // Call the function to handle the new toolbar
          injectReplyButton();
          injectPostButton();
        }
      }
    });
  });
});

// Step 1: Check if the URL is in the allowlist
if (isInAllowlist(ALLOWXLIST)) {
  console.log('The current URL is in the allowlist.');
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe
  observer.observe(document.body, {
    // Set to true to monitor the target node (and, if subtree is true, its descendants) for the addition of new child nodes or removal of existing child nodes. The default value is false.
    childList: true,
    // Set to true to extend monitoring to the entire subtree of nodes rooted at target. All of the other properties are then extended to all of the nodes in the subtree instead of applying solely to the target node. The default value is false.
    subtree: true,
  });
  injectToasterApp();
}
