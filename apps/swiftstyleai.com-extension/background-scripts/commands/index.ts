// https://refactoring.guru/design-patterns/chain-of-responsibility/typescript/example#example-0
import { GetSessionHandler } from '../auth/commands/GetSessionHandler';
import { SignedInHandler } from '../auth/commands/SignedInHandler';
import { SignedOutHandler } from '../auth/commands/SignedOutHandler';
import { TokenRefreshedHandler } from '../auth/commands/TokenRefreshedHandler';
import {
  GetAuthCookiesHandler,
  GetCookiesHandler,
  SetCookiesHandler,
} from './cookies';
import { GenerateReplyHandler, GenerateTweetHandler } from './http';
import { type RequestType } from './types';

const getCookiesHandler = new GetCookiesHandler();
const setCookiesHandles = new SetCookiesHandler();
const getAuthCookiesHandler = new GetAuthCookiesHandler();
const generateReplyHandler = new GenerateReplyHandler();
const generateTweetHandler = new GenerateTweetHandler();

// auth
const getSessionHandler = new GetSessionHandler();
const signedInHandler = new SignedInHandler();
const signedOutHandler = new SignedOutHandler();
const tokenRefreshedHandler = new TokenRefreshedHandler();

getCookiesHandler
  .setNext(setCookiesHandles)
  .setNext(getAuthCookiesHandler)
  .setNext(generateReplyHandler)
  .setNext(generateTweetHandler)
  .setNext(getSessionHandler)
  .setNext(signedInHandler)
  .setNext(signedOutHandler)
  .setNext(tokenRefreshedHandler);

export async function execute(request: RequestType) {
  return await getCookiesHandler.handle(request);
}
