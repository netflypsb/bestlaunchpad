import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, bsc } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';

const projectId = '97cc1e234357d996ee4d915aeb7b3ff2';

const metadata = {
  name: 'Crypto Presales Platform',
  description: 'A platform for participating in crypto presales',
  url: 'https://your-project-url.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, bsc] as const;

export const config = defaultWagmiConfig({
  autoConnect: true,
  projectId,
  chains,
  metadata,
  connectors: [
    new InjectedConnector({
      chains,
    }),
  ],
  enableCoinbase: true,
  enableInjected: true,
  enableEIP6963: true,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: 'dark',
  defaultChain: mainnet,
});
