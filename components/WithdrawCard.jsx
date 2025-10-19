'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, Button, Typography, message, Table, Tag } from 'antd';
import { MinusOutlined, HistoryOutlined } from '@ant-design/icons';
import { useUserStakeInfo, useRewardCalculation, useWithdraw, useUserWithdrawInfo } from '@/hooks/useStakingContract';
import { formatEther } from 'viem';

const { Title, Text } = Typography;

export default function WithdrawCard() {
  const { isConnected } = useAccount();
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  
  const { stakeLength, withdrawLength, totalWithdraw } = useUserStakeInfo();
  const { currentReward, totalReward } = useRewardCalculation();
  const { withdraw, isLoading: isWithdrawing, isSuccess: isWithdrawSuccess } = useWithdraw();

  // Fetch withdrawal history
  useEffect(() => {
    const fetchWithdrawHistory = async () => {
      if (!isConnected || withdrawLength === 0) return;
      
      const history = [];
      for (let i = 0; i < withdrawLength; i++) {
        const withdrawInfo = useUserWithdrawInfo(i);
        if (withdrawInfo) {
          history.push({
            key: i,
            amount: formatEther(withdrawInfo.amount),
            time: new Date(Number(withdrawInfo.time) * 1000).toLocaleDateString(),
            timestamp: Number(withdrawInfo.time),
          });
        }
      }
      setWithdrawHistory(history.sort((a, b) => b.timestamp - a.timestamp));
    };

    fetchWithdrawHistory();
  }, [isConnected, withdrawLength]);

  const handleWithdraw = async () => {
    try {
      await withdraw();
      message.success('Withdrawal successful!');
    } catch (error) {
      message.error('Withdrawal failed. Please try again.');
      console.error('Withdrawal error:', error);
    }
  };

  const withdrawableAmount = parseFloat(formatEther(totalReward)) + parseFloat(formatEther(totalWithdraw));

  const withdrawColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${parseFloat(amount).toFixed(4)} Tokens`,
    },
    {
      title: 'Date',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Tag color="green">Completed</Tag>,
    },
  ];

  if (!isConnected) {
    return (
      <Card className="glass-card border-0 shadow-lg">
        <div className="text-center py-8">
          <Text className="text-white text-lg">
            Please connect your wallet to view withdrawal options
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-0 shadow-lg">
      <div className="p-6">
        <Title level={3} className="text-white text-center mb-6">
          Withdraw Tokens
        </Title>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <Text className="text-gray-300">Current Reward:</Text>
            <Text className="text-white font-semibold">
              {formatEther(currentReward)} Tokens
            </Text>
          </div>
          
          <div className="flex justify-between items-center">
            <Text className="text-gray-300">Total Reward:</Text>
            <Text className="text-white font-semibold">
              {formatEther(totalReward)} Tokens
            </Text>
          </div>
          
          <div className="flex justify-between items-center">
            <Text className="text-gray-300">Total Withdrawn:</Text>
            <Text className="text-white font-semibold">
              {formatEther(totalWithdraw)} Tokens
            </Text>
          </div>
          
          <div className="flex justify-between items-center border-t border-gray-600 pt-4">
            <Text className="text-green-400 font-semibold">Withdrawable Amount:</Text>
            <Text className="text-green-400 font-bold text-lg">
              {withdrawableAmount.toFixed(4)} Tokens
            </Text>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<MinusOutlined />}
          onClick={handleWithdraw}
          loading={isWithdrawing}
          disabled={withdrawableAmount <= 0}
          className="stake-button w-full py-4 h-auto text-lg mb-6"
        >
          {isWithdrawing ? 'Withdrawing...' : 'Withdraw All'}
        </Button>

        {isWithdrawSuccess && (
          <div className="mb-4 text-center">
            <Text className="text-green-400">
              ✅ Withdrawal successful!
            </Text>
          </div>
        )}

        {withdrawHistory.length > 0 && (
          <div>
            <Title level={4} className="text-white mb-4 flex items-center">
              <HistoryOutlined className="mr-2" />
              Withdrawal History
            </Title>
            <Table
              columns={withdrawColumns}
              dataSource={withdrawHistory}
              pagination={false}
              size="small"
              className="bg-transparent"
              rowClassName="text-white"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
