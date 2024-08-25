import Debug from 'debug';
import { NextRequest, NextResponse } from 'next/server';

import genAI from '@/lib/gemini';
import { system } from '@/lib/gemini/instructions';

// import { getServerUser, setSupabaseSession } from '@/lib/auth/server';
import { getInstructionsForActiveCharacters } from '@/db/instructions/server';

import { generatePrompt } from './prompt';
import { type MessageInput } from '../../types';

const debug = Debug('api:v1:generate-reply');

// type Instruction = Tables<'instructions'>;
// export type Character = Tables<'characters'>;

export interface GenerateReplyParams {
  inputs: {
    message: MessageInput;
    input: string;
    replies: MessageInput[];
  };
}

export async function POST(request: NextRequest) {
  // https://nextjs.org/docs/pages/building-your-application/authentication
  if (!request.headers.get('user-id')) {
    return new NextResponse(
      JSON.stringify({ message: 'User is not authenticated' }),
      {
        status: 401,
      }
    );
  }

  const json = await request.json();

  const {
    inputs: { message, replies = [], input },
  } = json as GenerateReplyParams;

  try {
    const instructions = await getInstructionsForActiveCharacters();

    const iam = instructions.map((e) => ({
      text: e.text,
    }));

    debug('iam =', iam);

    // get user info

    // creating model
    debug('creating model');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest',
      systemInstruction: {
        role: 'system',
        parts: [...iam, ...system],
      },
    });

    // generate prompt based input
    const prompt = generatePrompt({
      message,
      replies,
      input,
    });

    debug(`prompt = ${prompt}`);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawText = await response.text();

    // Step 1: Remove the surrounding backticks and the 'json' tag
    const jsonString = rawText.replace(/```json|```/g, '');

    // Step 2: Parse the cleaned string into a JSON object
    const jsonObject = JSON.parse(jsonString);

    return NextResponse.json(jsonObject);
  } catch (error: any) {
    console.trace(error);
    const errorMessage = error.message || 'An unexpected error occurred';
    const errorCode = error.status || 500;

    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    });
  }
}
