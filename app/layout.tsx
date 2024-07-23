import '@/app/global.css';
import 'antd/dist/reset.css';
import { Poppins, Jost } from 'next/font/google';
import { UIProvider } from '@/components/theme';
import { CartProvider } from '../contexts/cart';
import { Layout } from '@/components/layout';
import SessionProvider from '@/components/session';
import { RecommendProvider } from '@/components/recommend';
import { ChatBox } from '@/components/chatbox';
import dayjs from 'dayjs';
dayjs.locale('vi');
const font = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="app">
        <SessionProvider>
          <RecommendProvider>
            <UIProvider>
              <CartProvider>
                <Layout> {children} </Layout>
                <ChatBox />
              </CartProvider>
            </UIProvider>
          </RecommendProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
