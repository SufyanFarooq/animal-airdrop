// Contract addresses and configuration
export const CONTRACT_ADDRESSES = {
  STAKING_CONTRACT: '0x873ef278dbb6123Aee58710e29498A19d028F32f',
  TOKEN_CONTRACT: '0x8d8A1478d8a4185745EcE7E96539b73B7B530419',
};

// BSC Mainnet configuration
export const BSC_MAINNET = {
  id: 56,
  name: 'BSC Mainnet',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed1.binance.org'],
    },
    public: {
      http: ['https://bsc-dataseed1.binance.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BSCScan',
      url: 'https://bscscan.com',
    },
  },
  testnet: false,
};

export const PROJECT_ID = '786e965e6a574b63fe4bf9cff937ec02'; // Replace with your WalletConnect Project ID
