'use client';

import { useAccount } from 'wagmi';
import { Card, Typography, Table, Tag, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { useUserStakeInfo, useRewardCalculation, useUserStakeDetails } from '@/hooks/useStakingContract';
import { formatEther } from 'viem';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;

export default function UserStats() {
  const { isConnected, address } = useAccount();
  const [stakeHistory, setStakeHistory] = useState([]);
  
  const { stakeLength, withdrawLength, totalWithdraw } = useUserStakeInfo();
  const { currentReward, totalReward } = useRewardCalculation();

  // Fetch stake history
  useEffect(() => {
    const fetchStakeHistory = async () => {
      if (!isConnected || stakeLength === 0) return;
      
      const history = [];
      for (let i = 0; i < stakeLength; i++) {
        const stakeDetails = useUserStakeDetails(i);
        if (stakeDetails) {
          history.push({
            key: i,
            amount: formatEther(stakeDetails.stakedAmount),
            percentage: Number(stakeDetails.stakedPercentage),
            day: Number(stakeDetails.stakedDay),
            timestamp: new Date(Number(stakeDetails.stakedTimestamp) * 1000).toLocaleDateString(),
          });
        }
      }
      setStakeHistory(history.sort((a, b) => b.timestamp - a.timestamp));
    };

    fetchStakeHistory();
  }, [isConnected, stakeLength]);

  const stakeColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${parseFloat(amount).toFixed(4)} Tokens`,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage) => `${percentage}%`,
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Tag color="blue">Active</Tag>,
    },
  ];

  if (!isConnected) {
    return (
      <Card className="glass-card border-0 shadow-lg">
        <div className="text-center py-8">
          <Text className="text-white text-lg">
            Please connect your wallet to view your statistics
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Statistics Cards */}
      <Card className="glass-card border-0 shadow-lg">
        <Title level={3} className="text-white text-center mb-6">
          Your Statistics
        </Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title={<Text className="text-white font-semibold">Current Reward</Text>}
              value={formatEther(currentReward)}
              precision={4}
              valueStyle={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<TrophyOutlined style={{ color: '#10b981', fontSize: '20px' }} />}
            />
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title={<Text className="text-white font-semibold">Total Reward</Text>}
              value={formatEther(totalReward)}
              precision={4}
              valueStyle={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<DollarOutlined style={{ color: '#3b82f6', fontSize: '20px' }} />}
            />
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title={<Text className="text-white font-semibold">Total Withdrawn</Text>}
              value={formatEther(totalWithdraw)}
              precision={4}
              valueStyle={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<ClockCircleOutlined style={{ color: '#f59e0b', fontSize: '20px' }} />}
            />
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title={<Text className="text-white font-semibold">Active Stakes</Text>}
              value={stakeLength}
              valueStyle={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Stake History Table */}
      {stakeHistory.length > 0 && (
        <Card className="glass-card border-0 shadow-lg">
          <Title level={4} className="text-white mb-4">
            Stake History
          </Title>
          <Table
            columns={stakeColumns}
            dataSource={stakeHistory}
            pagination={{ pageSize: 5 }}
            size="small"
            className="bg-transparent"
            rowClassName="text-white"
            scroll={{ x: 400 }}
          />
        </Card>
      )}
 {/* Spacer between Network Statistics and Project Description */}
 <div className="h-0"></div>
      {/* Wallet Address */}
      <Card className="glass-card border-0 shadow-lg">
        <div className="text-center">
          <Text className="text-gray-300 block mb-2">Connected Wallet</Text>
          <Text className="text-white font-mono text-sm">
            {address}
          </Text>
        </div>
      </Card>
    </div>
  );
}
