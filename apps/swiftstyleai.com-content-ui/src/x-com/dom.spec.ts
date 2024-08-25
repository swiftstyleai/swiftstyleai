import { describe, it, expect } from 'vitest';
import { findClosestInputTwitter } from './dom';

describe('findClosestInputTwitter', () => {
  it('should return null if the element is null', () => {
    const result = findClosestInputTwitter(null);
    expect(result).toBeNull();
  });

  it('should return the input element if it is a direct child', () => {
    const parentElement = document.createElement('div');
    const inputElement = document.createElement('div');
    inputElement.setAttribute('data-testid', 'tweetTextarea_123');
    inputElement.setAttribute('role', 'textbox');
    parentElement.appendChild(inputElement);

    const result = findClosestInputTwitter(parentElement);
    expect(result).toBe(inputElement);
  });

  it('should return the closest input element if it is a descendant', () => {
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');
    const inputElement = document.createElement('div');
    inputElement.setAttribute('data-testid', 'tweetTextarea_123');
    inputElement.setAttribute('role', 'textbox');
    childElement.appendChild(inputElement);
    parentElement.appendChild(childElement);

    const result = findClosestInputTwitter(childElement);
    expect(result).toBe(inputElement);
  });

  it('should return the closest input element if it is in an ancestor', () => {
    const grandParentElement = document.createElement('div');
    const parentElement = document.createElement('div');
    const inputElement = document.createElement('div');
    inputElement.setAttribute('data-testid', 'tweetTextarea_123');
    inputElement.setAttribute('role', 'textbox');
    parentElement.appendChild(inputElement);
    grandParentElement.appendChild(parentElement);

    const result = findClosestInputTwitter(parentElement);
    expect(result).toBe(inputElement);
  });

  it('should return null if no input element is found', () => {
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');
    parentElement.appendChild(childElement);

    const result = findClosestInputTwitter(childElement);
    expect(result).toBeNull();
  });

  it('should return the closest input element even if it is deeply nested', () => {
    const grandParentElement = document.createElement('div');
    const parentElement = document.createElement('div');
    const childElement = document.createElement('div');
    const inputElement = document.createElement('div');
    inputElement.setAttribute('data-testid', 'tweetTextarea_123');
    inputElement.setAttribute('role', 'textbox');
    childElement.appendChild(inputElement);
    parentElement.appendChild(childElement);
    grandParentElement.appendChild(parentElement);

    const result = findClosestInputTwitter(childElement);
    expect(result).toBe(inputElement);
  });
});
