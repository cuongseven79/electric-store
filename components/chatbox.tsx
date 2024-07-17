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

    Kommunicate.init('3fa190c26ecb3eca275858f55f817f012', {
      email: session.user.email,
      automaticChatOpenOnNavigation: true,
      popupWidget: true,
    });
  }, [session]);

  return <></>;
}
