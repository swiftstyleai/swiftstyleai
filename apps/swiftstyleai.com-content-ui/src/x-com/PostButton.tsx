import React, { useCallback, useState, useRef } from 'react';
import { findClosestInputTwitter, getUserInput, setTweetReply } from './dom';
import { generateTweetForTwitter } from '@/http';
import {
  Popover,
  PopoverPortal,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { sendChromeMessageIPC } from '@llm-101/ipc';
import LoginReminderPopup from './LoginReminderPopup';
import LogoIcon from './LogoIcon';

const PostButton: React.FC = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onOpenChange = useCallback((open: boolean) => {
    setOpenPopover(open);
  }, []);

  const handleOnClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();

      if (loading) return;

      try {
        const session = await sendChromeMessageIPC({
          type: 'GET_SESSION',
          data: {
            from: 'swiftstyleai.com-content-ui',
          },
        });

        if (!session) throw new Error('you are not logged in');

        setLoading(true);

        const input = getUserInput();

        if (!input) {
          console.error('No tweet information found.');
          setLoading(false);
          return;
        }

        const response = await generateTweetForTwitter({ input });

        const tweetElement = document.querySelector<HTMLElement>(
          'div[data-testid="tweetText"]',
        );
        const inputElement = tweetElement
          ? findClosestInputTwitter(tweetElement)
          : null;

        if (inputElement) {
          await setTweetReply(inputElement, `${response.response} `);
        }
      } catch (error: any) {
        console.error('Failed to generate reply:', error);
        if (error.message === 'you are not logged in') {
          setOpenPopover(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  const animationStyle = loading ? 'spin_animate' : 'breath_animate';

  return (
    <Popover open={openPopover} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          style={buttonStyle}
          onClick={handleOnClick}
          disabled={loading}
        >
          <LogoIcon animationStyle={animationStyle} />
        </Button>
      </PopoverTrigger>

      <PopoverPortal container={containerRef.current}>
        <LoginReminderPopup />
      </PopoverPortal>
      <div ref={containerRef} id="popover-portal-post-button" />
    </Popover>
  );
};

const buttonStyle: React.CSSProperties = {
  borderRadius: '50px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontWeight: '600',
  marginRight: '10px',
};

export default PostButton;
