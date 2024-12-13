import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, bsc } from 'wagmi/chains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID';

// 2. Create wagmiConfig
const metadata = {
  name: 'Crypto Presales Platform',
  description: 'A platform for participating in crypto presales',
  url: 'https://your-project-url.com', // TODO: Update with your project URL
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const config = defaultWagmiConfig({
  projectId,
  metadata,
  enableCoinbase: true,
  enableInjected: true,
  enableEIP6963: true,
  enableEmail: true,
  includeWalletIds: undefined,
  excludeWalletIds: undefined,
  featuredWalletIds: undefined,
  defaultChain: mainnet,
  tokens: undefined
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  defaultChain: mainnet,
  enableAnalytics: true,
  themeMode: 'dark'
});