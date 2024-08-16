'use client';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

export function ChatBox() {
  const { data: session } = useSession();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (
      !session ||
      !session.user ||
      session.user.role === 'STAFF' ||
      session.user.role === 'ADMIN'
    ) {
      return;
    }

    Kommunicate.init(process.env.NEXT_PUBLIC_APPBOT_ID || '', {
      email: session.user.email,
      automaticChatOpenOnNavigation: true,
      popupWidget: true,
    });
  }, [session]);

  return <></>;
}
