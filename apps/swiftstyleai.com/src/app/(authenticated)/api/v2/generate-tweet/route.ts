import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';
import Debug from 'debug';
import { type NextRequest, NextResponse } from 'next/server';

import { system } from '@/lib/gemini/instructions';
import model from '@/lib/langchain';

import { getInstructionsForActiveCharacters } from '@/db/instructions/server';

import { generatePrompt } from './prompt';

const debug = Debug('api:v2:generate-tweet');

export interface GenerateTweetParams {
  inputs: {
    input: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const userId = request.headers.get('user-id');
    if (!userId) {
      debug('User is not authenticated');
      return NextResponse.json(
        { message: 'User is not authenticated' },
        { status: 401 }
      );
    }

    const json = (await request.json()) as GenerateTweetParams;
    const {
      inputs: { input },
    } = json;

    // Fetching instructions
    const instructions = await getInstructionsForActiveCharacters();
    const iam = instructions.map((e) => ({ text: e.text }));

    debug('system:', system);
    debug('iam:', iam);

    // Generate prompt
    const prompt = generatePrompt(input);

    // Parsing response from the AI model
    const parser = new StringOutputParser();
    const systemMessages = [...iam, ...system].map((e) => e.text).join('\n');
    const messages = [
      new SystemMessage(systemMessages),
      new HumanMessage(prompt),
    ];

    const result = await model.invoke(messages);
    const jsonString = await parser.invoke(result);

    // Parse the result into a JSON object
    const responseData = JSON.parse(jsonString);
    return NextResponse.json(responseData);
  } catch (error: unknown) {
    // Enhanced error handling
    if (error instanceof SyntaxError) {
      debug('JSON parsing error:', error.message);
      return NextResponse.json(
        { message: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    debug('Unexpected error:', error);
    const errorMessage =
      (error as Error)?.message || 'An unexpected error occurred';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}