import {
  type GenerateReplyResponse,
  type GenerateReplyParams,
  type TweetData,
  GenerateTweetParams,
} from './types';
import { sendChromeMessageIPC } from '@llm-101/ipc';

export interface GenerateReplyForTwitterArgs {
  text: string;
  user: string;
  input?: string;
  replies?: TweetData[];
}

export async function generateReplyForTwitter({
  text,
  user,
  input,
  replies,
}: GenerateReplyForTwitterArgs): Promise<GenerateReplyResponse> {
  const data: GenerateReplyParams = {
    message: {
      text,
      user,
    },
    input,
    replies,
  };

  try {
    const response = await sendChromeMessageIPC({
      type: 'GENERATE_REPLY',
      data: {
        from: 'swiftstyleai.com-content-ui',
        inputs: data,
      },
    });

    return response;
  } catch (error) {
    console.error('Error generating reply:', error);
    throw new Error('Failed to generate reply. Please try again later.');
  }
}

export interface GenerateTweetForTwitterArgs {
  input: string;
}

export async function generateTweetForTwitter({
  input,
}: GenerateTweetForTwitterArgs): Promise<GenerateReplyResponse> {
  const data: GenerateTweetParams = {
    input,
  };

  try {
    const response = await sendChromeMessageIPC({
      type: 'GENERATE_TWEET',
      data: {
        from: 'swiftstyleai.com-content-ui',
        inputs: data,
      },
    });

    return response;
  } catch (error) {
    console.error('Error generating reply:', error);
    throw new Error('Failed to generate reply. Please try again later.');
  }
}
