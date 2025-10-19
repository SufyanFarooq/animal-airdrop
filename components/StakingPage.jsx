'use client';

import { useAccount } from 'wagmi';
import { Card, Typography } from 'antd';
import StakingCard from './StakingCard';
import UserStats from './UserStats';

const { Title, Text } = Typography;

export default function StakingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title level={1} className="text-white text-4xl md:text-6xl font-bold mb-4">
          💰 Staking Dashboard
        </Title>
        <Title level={3} className="text-gray-300 text-lg md:text-xl font-normal">
          Stake your tokens and track your rewards
        </Title>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Staking Section */}
        <div>
          <StakingCard />
        </div>

        {/* User Statistics */}
        <div>
          <UserStats />
        </div>
      </div>
    </div>
  );
}
