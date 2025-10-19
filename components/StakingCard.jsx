'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, Input, Button, Typography, message, Spin } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useTokenBalance, useTokenAllowance, useApproveToken } from '@/hooks/useTokenContract';
import { useDeposit } from '@/hooks/useStakingContract';
import { formatEther, parseEther } from 'viem';

const { Title, Text } = Typography;

export default function StakingCard() {
  const { isConnected } = useAccount();
  const [stakeAmount, setStakeAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  
  const { balance, decimals, symbol } = useTokenBalance();
  const allowance = useTokenAllowance();
  const { approve, isLoading: isApprovingTx } = useApproveToken();
  const { deposit, isLoading: isDepositing, isSuccess: isDepositSuccess } = useDeposit();

  const handleApprove = async () => {
    if (!stakeAmount || stakeAmount <= 0) {
      message.error('Please enter a valid amount');
      return;
    }

    setIsApproving(true);
    try {
      const amount = parseEther(stakeAmount.toString());
      await approve(amount);
      message.success('Approval successful! You can now stake.');
    } catch (error) {
      message.error('Approval failed. Please try again.');
      console.error('Approval error:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || stakeAmount <= 0) {
      message.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(stakeAmount) > parseFloat(formatEther(balance))) {
      message.error('Insufficient token balance');
      return;
    }

    try {
      const amount = parseEther(stakeAmount.toString());
      await deposit(amount);
      message.success('Staking successful!');
      setStakeAmount('');
    } catch (error) {
      message.error('Staking failed. Please try again.');
      console.error('Staking error:', error);
    }
  };

  const setMaxAmount = () => {
    setStakeAmount(formatEther(balance));
  };

  const needsApproval = parseFloat(stakeAmount) > 0 && parseFloat(stakeAmount) > parseFloat(formatEther(allowance));

  if (!isConnected) {
    return (
      <Card className="glass-card border-0 shadow-lg">
        <div className="text-center py-8">
          <Text className="text-white text-lg">
            Please connect your wallet to stake tokens
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-0 shadow-lg">
      <div className="p-6">
        <Title level={3} className="text-white text-center mb-6">
          Stake Tokens
        </Title>
        
        <div className="mb-4">
          <Text className="text-gray-300 block mb-2">
            Available Balance: {formatEther(balance)} {symbol}
          </Text>
        </div>

        <div className="mb-6">
          <Input
            size="large"
            placeholder="Enter amount to stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            suffix={
              <Button 
                type="link" 
                onClick={setMaxAmount}
                className="text-blue-400 hover:text-blue-300"
              >
                MAX
              </Button>
            }
            className="mb-4"
          />
        </div>

        {needsApproval ? (
          <Button
            type="primary"
            size="large"
            icon={<CheckOutlined />}
            onClick={handleApprove}
            loading={isApproving || isApprovingTx}
            className="stake-button w-full py-4 h-auto text-lg"
          >
            {isApproving || isApprovingTx ? 'Approving...' : 'Approve Token Spending'}
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleStake}
            loading={isDepositing}
            disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
            className="stake-button w-full py-4 h-auto text-lg"
          >
            {isDepositing ? 'Staking...' : 'Stake Tokens'}
          </Button>
        )}

        {isDepositSuccess && (
          <div className="mt-4 text-center">
            <Text className="text-green-400">
              ✅ Staking successful! Check your rewards.
            </Text>
          </div>
        )}
      </div>
    </Card>
  );
}
