import { useToast } from '@/components/ui/use-toast';
import React, { useCallback, useState, useRef } from 'react';
import {
  getTweetInfo,
  findClosestInputTwitter,
  setTweetReply,
  getAllReply,
} from './dom';
import { generateReplyForTwitter } from '@/http';
import {
  Popover,
  PopoverPortal,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import LoginReminderPopup from './LoginReminderPopup';
import { sendChromeMessageIPC } from '@llm-101/ipc';
import LogoIcon from './LogoIcon';
import Debug from 'debug';

const debug = Debug('content-ui:x-com:ReplyButton');

function ReplyButton(): JSX.Element {
  const { toast } = useToast();
  const [openPopover, setOpeningPopover] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onOpenChange = useCallback((open: boolean) => {
    setOpeningPopover(open);
  }, []);

  const onClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();

      if (loading) return;

      try {
        // Step 1: Check authentication
        const session = await sendChromeMessageIPC({
          type: 'GET_SESSION',
          data: { from: 'swiftstyleai.com-content-ui' },
        });

        if (!session) {
          throw new Error('You are not logged in');
        }

        setLoading(true);

        const tweet = getTweetInfo();
        if (!tweet) {
          debug('No tweet information found.');
          setLoading(false);
          return;
        }

        const { text, user, input } = tweet;
        let replies = getAllReply();
        replies = replies.filter((e) => e.user !== user);

        const response = await generateReplyForTwitter({
          text,
          user,
          input,
          replies,
        });

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
        debug('Failed to generate reply:', error);
        if (error.message === 'You are not logged in') {
          setOpeningPopover(true);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description:
              error.message || 'An error occurred while generating the reply.',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [loading, toast],
  );

  const animationStyle = loading ? 'spin_animate' : 'breath_animate';

  return (
    <Popover open={openPopover} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          style={buttonStyle}
          onClick={onClick}
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
}

const buttonStyle: React.CSSProperties = {
  borderRadius: '50px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontWeight: '600',
  marginRight: '10px',
};

export default ReplyButton;
