'use client';

import { CornerDownLeft } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { HttpStatus } from '@/lib/constants';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { ChatList } from '../components/ChatList';
import { usePlaygroundContext } from '../contexts';

interface GenerateReplyProps {
  text: string;
  user: string;
  characterId: string;
}

async function generateReply({ text, user, characterId }: GenerateReplyProps) {
  const response = await fetch('/api/v2/test', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      from: 'swiftstyleai.com',
      characters: [characterId],
      inputs: {
        message: { text, user },
        input: null,
        replies: [],
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to generate reply. HTTP status: ${response.status}`
    );
  }

  const result = await response.json();
  return result as { response: string };
}

const Main: React.FC<{ characterId: string }> = ({ characterId }) => {
  const { state, sendMessageRequest, sendMessageSuccess, sendMessageFailure } =
    usePlaygroundContext();
  const [message, setMessage] = useState<string>('');

  const { data, list, users, fetchStatus } = state;
  const messages = list.map((id: string) => data[id]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!message.trim()) return;

      const newMessage = {
        id: String(Date.now()),
        message,
        userId: 'user-1',
      };

      if (sendMessageRequest) {
        sendMessageRequest(newMessage);
      }

      setMessage(''); // Clear the textarea after sending the message
    },
    [message, sendMessageRequest]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const fetchReply = useCallback(async () => {
    try {
      const lastMessageId = list[list.length - 1];
      const lastMessage = data[lastMessageId];

      if (!lastMessage) {
        throw new Error('No last message found in the state.');
      }

      console.log(lastMessage, 'lastMessage');

      const res = await generateReply({
        user: lastMessage.userId,
        text: lastMessage.message,
        characterId,
      });

      if (sendMessageSuccess) {
        sendMessageSuccess({
          id: String(Date.now()),
          message: res.response,
          userId: 'user-2',
        });
      }
    } catch (error) {
      console.error('Error generating reply:', error);
      if (sendMessageFailure) {
        sendMessageFailure({
          error: (error as Error).message,
        });
      }
    }
  }, [list, data, characterId, sendMessageSuccess, sendMessageFailure]);

  useEffect(() => {
    if (fetchStatus === HttpStatus.LOADING) {
      fetchReply();
    }
  }, [fetchStatus, fetchReply]);

  return (
    <>
      <ChatList
        messages={messages}
        users={users}
        selectedUser={users['user-1']}
      />
      <div className='flex-1' />
      <form
        className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring'
        onSubmit={handleSubmit}
      >
        <Label htmlFor='message' className='sr-only'>
          Message
        </Label>
        <Textarea
          id='message'
          placeholder='Type your message here...'
          className='min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={fetchStatus === HttpStatus.LOADING}
        />
        <div className='flex items-center p-3 pt-0'>
          <Button
            type='submit'
            size='sm'
            className='ml-auto gap-1.5'
            disabled={fetchStatus === HttpStatus.LOADING}
          >
            Send Message
            <CornerDownLeft className='size-3.5' />
          </Button>
        </div>
      </form>
    </>
  );
};

export default Main;
