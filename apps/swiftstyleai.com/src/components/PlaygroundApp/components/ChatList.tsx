import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import MessageItem from './MessageItem'; // Adjust the import path as needed
import { type Message, type User } from '../contexts/types';

interface ChatListProps {
  messages?: Message[];
  users: Record<string, User>;
  selectedUser: User;
}

export function ChatList({
  messages = [],
  users,
  selectedUser,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
      <div
        ref={messagesContainerRef}
        className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'
      >
        <AnimatePresence>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              user={users[message.userId]}
              isOwnMessage={users[message.userId].name === selectedUser.name}
            />
          ))}
        </AnimatePresence>

        {/* <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
          <span className='sr-only'>Loading...</span>
          <div className='h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='h-8 w-8 bg-primary rounded-full animate-bounce'></div>
        </div> */}
      </div>
    </div>
  );
}
