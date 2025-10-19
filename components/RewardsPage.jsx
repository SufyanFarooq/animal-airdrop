'use client';

import { useAccount } from 'wagmi';
import { Card, Typography } from 'antd';
import WithdrawCard from './WithdrawCard';
import ContractStats from './ContractStats';
import UserStats from './UserStats';

const { Title, Text } = Typography;

export default function RewardsPage() {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title level={1} className="text-white text-4xl md:text-6xl font-bold mb-4">
          🏆 Rewards & Withdrawals
        </Title>
        <Title level={3} className="text-gray-300 text-lg md:text-xl font-normal">
          Withdraw your rewards and view detailed statistics
        </Title>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Withdrawal Section */}
        <div>
          <WithdrawCard />
        </div>
        {/* User Statistics */}
        <div>
          <UserStats />
        </div>
      </div>
    </div>
  );
}
