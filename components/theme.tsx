'use client';

import { useState } from 'react';
import React from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';

const colors = {
  primary: '#464c77',
};

// suppress useLayoutEffect warnings when running outside a browser
if (!process.browser) React.useLayoutEffect = React.useEffect;

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache());

  const render = <>{children}</>;

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  if (typeof window !== 'undefined') {
    return render;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorPrimary: colors.primary,
          },
          InputNumber: {
            colorPrimary: colors.primary,
          },
          Select: {
            colorPrimary: colors.primary,
          },
          Button: {
            colorPrimary: colors.primary,
          },
        },
      }}
    >
      <StyleProvider hashPriority="high" cache={cache}>
        {render}
      </StyleProvider>
    </ConfigProvider>
  );
}
