import { createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { PROJECT_ID } from '@/contracts/config';

// 1. Get projectId from https://cloud.walletconnect.com
if (!PROJECT_ID) {
  throw new Error('Project ID is not defined. Please set your WalletConnect Project ID in contracts/config.js');
}

// 2. Create wagmiConfig
const metadata = {
  name: 'BEP20 Staking',
  description: 'BEP20 Token Staking Platform',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [bsc] // BSC Mainnet
const config = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
});

// 3. Create modal and export it
export const web3Modal = createWeb3Modal({
  wagmiConfig: config,
  projectId: PROJECT_ID,
  enableAnalytics: true,
  enableOnramp: true
});

export default config;
