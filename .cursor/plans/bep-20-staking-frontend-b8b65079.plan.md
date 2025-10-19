<!-- b8b65079-c53a-47e4-a992-747ec9c52180 46e3d94c-cec9-4d74-a6eb-0e29ae6f5f5a -->
# BEP-20 Staking Frontend with Next.js 14

## Project Structure Setup

Create a Next.js 14 project with App Router structure:

- `/app` - Main application directory with App Router
- `/app/layout.js` - Root layout with Web3 providers
- `/app/page.js` - Main staking interface
- `/components` - Reusable UI components
- `/contracts` - Contract ABI and address configuration
- `/hooks` - Custom hooks for contract interactions
- `/lib` - Utility functions and Web3 configuration

## Core Configuration Files

1. **package.json** - Dependencies only (no versions specified for latest):

- Next.js, React
- wagmi, viem, @tanstack/react-query
- @web3modal/wagmi, @walletconnect/ethereum-provider
- ethers
- tailwindcss, postcss, autoprefixer
- antd (Ant Design)

2. **tailwind.config.js** - Configure Tailwind with Ant Design compatibility

3. **next.config.js** - Configure Next.js for Web3 compatibility

4. **postcss.config.js** - PostCSS configuration for Tailwind

## Contract Integration

1. **contracts/stakingABI.js** - Export the staking contract ABI (user will paste)

2. **contracts/tokenABI.js** - Create minimal ERC20 ABI for token approval

3. **contracts/config.js** - Contract addresses:

- Staking Contract: `0x873ef278dbb6123Aee58710e29498A19d028F32f`
- BEP-20 Token: `0x8d8A1478d8a4185745EcE7E96539b73B7B530419`
- BSC Mainnet configuration

## Web3 Configuration

1. **lib/wagmiConfig.js** - Configure wagmi with:

- BSC Mainnet chain configuration
- WalletConnect v2 integration via Web3Modal
- Transport configuration

2. **app/layout.js** - Setup providers:

- Web3Modal/WagmiConfig provider wrapper
- QueryClient provider for React Query
- Ant Design ConfigProvider

## Custom Hooks

1. **hooks/useStakingContract.js** - Contract interaction hooks:

- `useDeposit()` - Stake tokens
- `useWithdraw()` - Withdraw staked tokens + rewards
- `useUserStakeInfo()` - Get user's staking details
- `useRewardCalculation()` - Calculate pending rewards
- `useContractStats()` - Total deposits, withdrawals, members

2. **hooks/useTokenContract.js** - Token interaction hooks:

- `useTokenBalance()` - Get user token balance
- `useTokenApproval()` - Check allowance
- `useApproveToken()` - Approve staking contract

## UI Components

1. **components/WalletConnect.jsx** - Wallet connection button using Web3Modal

2. **components/StakingCard.jsx** - Main staking interface:

- Input field for stake amount
- Approve & Stake buttons
- Token balance display

3. **components/UserStats.jsx** - Display user statistics:

- Total staked amount
- Pending rewards
- Stake history using Ant Design Table

4. **components/WithdrawCard.jsx** - Withdrawal interface:

- Display withdrawable amount (stake + rewards)
- Withdraw button
- Withdrawal history

5. **components/ContractStats.jsx** - Network statistics cards:

- Total deposits in network
- Total withdrawals
- Total members
- Display using Ant Design Statistic component

## Main Page

**app/page.js** - Compose the staking dashboard:

- Responsive grid layout with Tailwind
- Wallet connection at top
- StakingCard for depositing
- WithdrawCard for withdrawals
- UserStats for personal data
- ContractStats for network overview
- Loading states and error handling

## Styling

- Use Tailwind CSS utility classes for layouts and spacing
- Use Ant Design components (Button, Card, Input, Table, Statistic, Modal, Notification) for UI elements
- Create a modern gradient background
- Responsive design for mobile and desktop

## Key Features

- Connect wallet via WalletConnect (Web3Modal)
- View token balance and approve spending
- Stake tokens with amount input validation
- View current staked amount and percentage
- Calculate and display pending rewards in real-time
- Withdraw staked tokens + rewards
- View staking and withdrawal history
- Display network-wide statistics
- Toast notifications for transactions (Ant Design notifications)
- Loading states during blockchain interactions
- Error handling with user-friendly messages

## Files to Create

1. `package.json` - Dependencies list
2. `next.config.js`
3. `tailwind.config.js`
4. `postcss.config.js`
5. `.gitignore`
6. `jsconfig.json` - Path aliases (@/ imports)
7. `app/layout.js`
8. `app/page.js`
9. `app/globals.css`
10. `lib/wagmiConfig.js`
11. `contracts/stakingABI.js` (placeholder for user to fill)
12. `contracts/tokenABI.js`
13. `contracts/config.js`
14. `hooks/useStakingContract.js`
15. `hooks/useTokenContract.js`
16. `components/WalletConnect.jsx`
17. `components/StakingCard.jsx`
18. `components/WithdrawCard.jsx`
19. `components/UserStats.jsx`
20. `components/ContractStats.jsx`
21. `README.md` - Setup and usage instructions

### To-dos

- [ ] Create configuration files (package.json, next.config.js, tailwind.config.js, postcss.config.js, jsconfig.json, .gitignore)
- [ ] Create contract configuration files (ABI placeholders, addresses, token ABI)
- [ ] Setup Web3 configuration (wagmiConfig.js with BSC Mainnet and WalletConnect)
- [ ] Create app layout with Web3 providers and globals.css
- [ ] Implement custom hooks for staking and token contract interactions
- [ ] Create all UI components (WalletConnect, StakingCard, WithdrawCard, UserStats, ContractStats)
- [ ] Build main staking dashboard page composing all components
- [ ] Create README with setup instructions and usage guide