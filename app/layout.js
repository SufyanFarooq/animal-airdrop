'use client';

import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import wagmiConfig from '@/lib/wagmiConfig';
import '@/app/globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#667eea',
                  borderRadius: 12,
                },
              }}
            >
              <div className="min-h-screen gradient-bg">
                {children}
              </div>
            </ConfigProvider>
          </QueryClientProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
