import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, bsc } from 'wagmi/chains';

const projectId = '56796982a1bab3a25fa4f92b3747260b';

const metadata = {
  name: 'Crypto Presales Platform',
  description: 'A platform for participating in crypto presales',
  url: 'https://your-project-url.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, bsc];

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableCoinbase: true,
  enableInjected: true,
  enableEIP6963: true,
  enableEmail: true,
  tokens: {
    [mainnet.id]: {
      address: '0x0000000000000000000000000000000000000000'
    }
  }
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeMode: 'dark'
});