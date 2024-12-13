import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID'

const metadata = {
  name: 'Crypto Presales',
  description: 'Crypto Presales Platform',
  url: 'https://your-url.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [mainnet],
  projectId,
  metadata,
})

createWeb3Modal({ wagmiConfig: config, projectId, chains: [mainnet] })