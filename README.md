# BEP20 Staking Frontend

A modern, responsive staking dApp built with Next.js 14, wagmi, WalletConnect, and Ant Design for BSC Mainnet token staking.

## 🚀 Features

- **Wallet Connection**: Connect with WalletConnect v2
- **Token Staking**: Stake BEP20 tokens with approval flow
- **Reward Tracking**: View current and total rewards
- **Withdrawal**: Withdraw staked tokens and rewards
- **Statistics**: Personal and network-wide statistics
- **History**: View staking and withdrawal history
- **Responsive Design**: Mobile and desktop optimized
- **Modern UI**: Glass morphism design with Tailwind CSS and Ant Design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Web3**: wagmi, viem, ethers.js
- **Wallet**: WalletConnect v2, Web3Modal
- **UI**: Ant Design, Tailwind CSS
- **State Management**: TanStack Query
- **Blockchain**: BSC Mainnet (Binance Smart Chain)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- WalletConnect Project ID

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure WalletConnect

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Update `contracts/config.js`:

```javascript
export const PROJECT_ID = 'your_walletconnect_project_id_here';
```

### 3. Add Staking Contract ABI

Replace the placeholder in `contracts/stakingABI.js` with your actual staking contract ABI:

```javascript
export const stakingABI = [
  // Paste your staking contract ABI here
];
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with providers
│   ├── page.js            # Main dashboard page
│   └── globals.css         # Global styles
├── components/            # React components
│   ├── WalletConnect.jsx  # Wallet connection
│   ├── StakingCard.jsx    # Staking interface
│   ├── WithdrawCard.jsx   # Withdrawal interface
│   ├── UserStats.jsx      # User statistics
│   └── ContractStats.jsx  # Network statistics
├── contracts/             # Contract configuration
│   ├── stakingABI.js      # Staking contract ABI
│   ├── tokenABI.js        # ERC20/BEP20 ABI
│   └── config.js          # Contract addresses & config
├── hooks/                 # Custom hooks
│   ├── useStakingContract.js # Staking contract hooks
│   └── useTokenContract.js    # Token contract hooks
└── lib/                   # Utilities
    └── wagmiConfig.js     # Web3 configuration
```

## 🔧 Configuration

### Contract Addresses

Update contract addresses in `contracts/config.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  STAKING_CONTRACT: '0x873ef278dbb6123Aee58710e29498A19d028F32f',
  TOKEN_CONTRACT: '0x8d8A1478d8a4185745EcE7E96539b73B7B530419',
};
```

### Network Configuration

The app is configured for BSC Mainnet. To change networks, update `lib/wagmiConfig.js`:

```javascript
import { bsc, bscTestnet } from 'wagmi/chains';

const chains = [bsc]; // or [bscTestnet] for testnet
```

## 🎨 Customization

### Styling

- **Tailwind CSS**: Utility classes in components
- **Ant Design**: UI components with custom theme
- **Global Styles**: `app/globals.css` for custom CSS

### Theme Colors

Update colors in `app/layout.js`:

```javascript
theme={{
  token: {
    colorPrimary: '#667eea', // Primary color
    borderRadius: 12,         // Border radius
  },
}}
```

## 📱 Features Overview

### Wallet Connection
- Connect with WalletConnect v2
- Support for mobile and desktop wallets
- Display connected wallet address

### Staking
- View token balance
- Approve token spending
- Stake tokens with amount validation
- Real-time balance updates

### Withdrawal
- View current and total rewards
- Withdraw all staked tokens and rewards
- Withdrawal history table

### Statistics
- Personal staking statistics
- Network-wide statistics
- Staking and withdrawal history

## 🔒 Security Notes

- Always verify contract addresses before interacting
- Ensure you have sufficient BNB for gas fees
- Test on testnet before mainnet deployment
- Keep your private keys secure

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables if needed
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🐛 Troubleshooting

### Common Issues

1. **WalletConnect not working**
   - Check Project ID is correct
   - Ensure HTTPS in production

2. **Contract calls failing**
   - Verify contract addresses
   - Check ABI is correct
   - Ensure sufficient BNB for gas

3. **Build errors**
   - Clear `.next` folder
   - Delete `node_modules` and reinstall
   - Check Node.js version

### Development Tips

- Use browser dev tools to debug Web3 calls
- Check BSCScan for contract verification
- Test with small amounts first

## 📄 License

MIT License - feel free to use this project for your own staking dApps!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Happy Staking! 🚀**
