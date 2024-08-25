import { motion } from 'framer-motion';
import isString from 'lodash/isString';

import { cn } from '@/lib/utils';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { type Message, type User } from '../contexts/types';

interface MessageItemProps {
  message: Message;
  user: User;
  isOwnMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  user,
  isOwnMessage,
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
    exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
    transition={{
      opacity: { duration: 0.1 },
      layout: {
        type: 'spring',
        bounce: 0.3,
        duration: 0.2,
      },
    }}
    style={{ originX: 0.5, originY: 0.5 }}
    className={cn(
      'flex flex-col gap-2 px-4 py-2 whitespace-pre-wrap',
      isOwnMessage ? 'items-start' : 'items-end'
    )}
  >
    <div className='flex gap-2 items-center'>
      {isOwnMessage && (
        <Avatar className='flex justify-center items-center'>
          {isString(user.avatar) ? (
            <AvatarImage
              src={user.avatar as string}
              alt={user.name}
              width={6}
              height={6}
            />
          ) : (
            user.avatar
          )}
        </Avatar>
      )}
      <span className='bg-accent p-3 rounded-md max-w-xs'>
        {message.message}
      </span>
      {!isOwnMessage && (
        <Avatar className='flex justify-center items-center'>
          {isString(user.avatar) ? (
            <AvatarImage
              src={user.avatar as string}
              alt={user.name}
              width={6}
              height={6}
            />
          ) : (
            user.avatar
          )}
        </Avatar>
      )}
    </div>
  </motion.div>
);

export default MessageItem;
