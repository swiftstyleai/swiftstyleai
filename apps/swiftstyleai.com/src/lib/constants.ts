// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
// Define an enum for HTTP status states
// HTTP REQUEST STATE
// FOR FETCHING DATA
export enum HttpStatus {
  LOADING = 'HTTP_LOADING',
  LOADED = 'HTTP_LOADED',
  FAILED = 'HTTP_FAILED',
}

// FOR TRANSACTION DATA
export enum TransactionStatus {
  // This constant represents the state where the transaction is being prepared before submission (value: 'preparing').
  PREPARING = 'preparing',
  // This constant represents the initial state before a transaction is submitted (value: 'idle').
  IDLE = 'idle',
  // This indicates the transaction has been submitted and is waiting for confirmation (value: 'pending').
  PENDING = 'pending',
  // This signifies the transaction was successfully mined and included in a block on the blockchain (value: 'confirmed').
  CONFIRMED = 'confirmed', // Explicit state for confirmed transaction
  // This means the transaction wasn't mined successfully, possibly due to insufficient gas or other reasons (value: 'failed').
  FAILED = 'failed', // Separate state for failed transactions
  // This indicates an unexpected error occurred during the transaction submission process (value: 'error').
  ERROR = 'error', // For unexpected errors during submission
}

export const TRANSACTION_PROCESSING = [
  TransactionStatus.PREPARING,
  TransactionStatus.IDLE,
  TransactionStatus.PENDING,
];

export const TRANSACTION_CONFIRMED = [
  TransactionStatus.CONFIRMED,
  TransactionStatus.FAILED,
  TransactionStatus.ERROR,
];
