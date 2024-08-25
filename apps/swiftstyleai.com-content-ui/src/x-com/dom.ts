import { type TweetData } from '@/types';

export function findClosestInputTwitter(
  element: HTMLElement | null,
): HTMLElement | null {
  if (!element) return null;

  const inputElement = element.querySelector<HTMLElement>(
    'div[data-testid^="tweetTextarea_"][role="textbox"]',
  );

  if (inputElement) {
    return inputElement;
  }

  return element.parentElement
    ? findClosestInputTwitter(element.parentElement)
    : null;
}

export function findClosestTweet(
  element: HTMLElement | null,
): HTMLElement | null {
  if (!element) return null;

  const inputElement = element.querySelector<HTMLElement>(
    '[data-testid="cellInnerDiv"]',
  );

  if (inputElement) {
    return inputElement;
  }

  return element.parentElement ? findClosestTweet(element.parentElement) : null;
}

export function getAllReply(): TweetData[] {
  const tweetHTMLs = document.querySelectorAll<HTMLElement>(
    'article[data-testid="tweet"]',
  );

  const replies = Array.from(tweetHTMLs).map(extractTweetData);

  return replies;
}

export function extractTweetData(doc: Element): TweetData {
  // Extract the username
  const userNameElement = doc.querySelector('[data-testid="User-Name"] span');
  const userName = userNameElement?.textContent?.trim() ?? '';

  // Extract the user handle
  const userHandleElement = doc.querySelector('[data-testid="User-Name"] a');
  const userHandle =
    userHandleElement?.getAttribute('href')?.replace('/', '').trim() ?? '';

  // Extract the profile picture URL
  const profilePictureElement = doc.querySelector(
    '[data-testid="Tweet-User-Avatar"] img',
  );
  const profilePictureUrl = profilePictureElement?.getAttribute('src') ?? '';

  // Extract the tweet text
  const tweetTextElement = doc.querySelector(
    '[data-testid="tweet"] div[dir="auto"] span',
  );
  const tweetText = tweetTextElement?.textContent?.trim() ?? '';

  // Extract the tweet date
  const tweetDateElement = doc.querySelector('[data-testid="tweet"] time');
  const tweetDate = tweetDateElement?.getAttribute('datetime') ?? '';

  // Return the extracted data
  return {
    name: userName,
    user: userHandle,
    profilePictureUrl,
    text: tweetText,
    publishedDate: tweetDate,
  };
}

export function getTweetInfo() {
  // Select the tweet text HTML element
  const tweetHTML = document.querySelector<HTMLDivElement>(
    'div[data-testid="tweetText"]',
  );
  if (!tweetHTML) {
    return null;
  }

  const tweet = findClosestTweet(tweetHTML);
  if(!tweet)
    return null;

  // Get the text content of the tweet
  const text = tweetHTML.innerText;

  // Extract the username
  const userNameElement = tweet.querySelector('[data-testid="User-Name"] span');
  const userName = userNameElement?.textContent?.trim() ?? '';

  // Extract the user handle
  const userHandleElement = tweet.querySelector('[data-testid="User-Name"] a');
  const userHandle =
    userHandleElement?.getAttribute('href')?.replace('/', '').trim() ?? '';

  // Extract the profile picture URL
  const profilePictureElement = tweet.querySelector(
    '[data-testid="Tweet-User-Avatar"] img',
  );
  const profilePictureUrl = profilePictureElement?.getAttribute('src') ?? '';

  // Extract the tweet date
  const tweetDateElement = tweet.querySelector('[data-testid="tweet"] time');
  const tweetDate = tweetDateElement?.getAttribute('datetime') ?? '';

  // Find the closest input element and get its content
  const userInput = findClosestInputTwitter(tweetHTML);
  const userInputContent = userInput?.innerText || '';

  return {
    name: userName,
    user: userHandle,
    profilePictureUrl,
    publishedDate: tweetDate,
    text,
    input: userInputContent.trim() === '' ? undefined : userInputContent,
  };
}

export function getUserInput() {
  // Select the tweet text HTML element
  const tweetHTML = document.querySelector<HTMLDivElement>(
    'div[data-testid="tweetText"]',
  );

  // Find the closest input element and get its content
  const userInput = findClosestInputTwitter(tweetHTML);
  const userInputContent = userInput?.innerText || '';

  return userInputContent.trim() === '' ? undefined : userInputContent;
}

/**
 * Sets the text content of a Twitter reply input element.
 * @param element The target HTML element to set the text.
 * @param text The text content to be set in the input element.
 */
export async function setTweetReply(
  element: HTMLElement,
  text: string,
): Promise<void> {
  try {
    // Focus on the target element
    element.focus();

    // Handle different types of input elements (INPUT, TEXTAREA, contentEditable)
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
      (element as HTMLInputElement | HTMLTextAreaElement).select();
    } else if (element.contentEditable === 'true') {
      const range = document.createRange();
      range.selectNodeContents(element);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    // Write the text to the clipboard
    await navigator.clipboard.writeText(text);

    // Create and dispatch a ClipboardEvent for pasting the text
    const clipboardEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData: new DataTransfer(),
    });

    if (clipboardEvent.clipboardData) {
      clipboardEvent.clipboardData.setData('text/plain', text);
      element.dispatchEvent(clipboardEvent);

      // Clear the clipboard after the event is dispatched
      await navigator.clipboard.writeText('');
    }
  } catch (error) {
    console.error('Failed to write text to clipboard:', error);
    throw new Error('Failed to set tweet reply text.');
  }
}
