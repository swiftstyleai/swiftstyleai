import * as matchers from 'jest-extended';
import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';

expect.extend(matchers);
// https://stackoverflow.com/a/68468204
Object.assign(global, { TextDecoder, TextEncoder });

// Allow router mocks.
// eslint-disable-next-line no-undef
jest.mock('next/router', () => require('next-router-mock'));
