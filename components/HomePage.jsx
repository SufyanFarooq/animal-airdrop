'use client';

import { Typography, Card, Row, Col, Statistic } from 'antd';
import { DollarOutlined, TeamOutlined, ArrowUpOutlined, PercentageOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useContractStats } from '@/hooks/useStakingContract';
import { formatEther } from 'viem';

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const {
    totalDeposits,
    totalWithdrawals,
    totalMembers,
    percentageAll,
    allowed
  } = useContractStats();

  const netDeposits = parseFloat(formatEther(totalDeposits)) - parseFloat(formatEther(totalWithdrawals));

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <Title level={1} className="text-white text-4xl md:text-6xl font-bold mb-4">
          Animal Staking Platform
        </Title>
        <Title level={3} className="text-gray-300 text-lg md:text-xl font-normal mb-8">
          Stake your tokens and earn rewards on Binance Smart Chain
        </Title>
      </div>
      {/* Network Statistics - Top Priority */}
      <Card className="glass-card border-0 shadow-xl">
        <div className="p-6">
          <div className="text-center mb-8">
            <Title level={2} className="text-white text-3xl font-bold mb-2">
              📊 Network Statistics
            </Title>
            <Text className="text-gray-300 text-lg">
              Real-time staking network overview
            </Text>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-center shadow-lg">
                <DollarOutlined className="text-white text-3xl mb-3" />
                <div className="text-white text-2xl font-bold mb-1">
                  {formatEther(totalDeposits)}
                </div>
                <div className="text-green-100 text-sm font-medium">
                  Total Deposits
                </div>
                <div className="text-green-200 text-xs mt-1">
                  Tokens
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-center shadow-lg">
                <ArrowUpOutlined className="text-white text-3xl mb-3" />
                <div className="text-white text-2xl font-bold mb-1">
                  {formatEther(totalWithdrawals)}
                </div>
                <div className="text-orange-100 text-sm font-medium">
                  Total Withdrawals
                </div>
                <div className="text-orange-200 text-xs mt-1">
                  Tokens
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <div className={`bg-gradient-to-br ${netDeposits >= 0 ? 'from-blue-500 to-blue-600' : 'from-red-500 to-red-600'} rounded-xl p-6 text-center shadow-lg`}>
                <DollarOutlined className="text-white text-3xl mb-3" />
                <div className="text-white text-2xl font-bold mb-1">
                  {netDeposits.toFixed(4)}
                </div>
                <div className="text-blue-100 text-sm font-medium">
                  Net Deposits
                </div>
                <div className="text-blue-200 text-xs mt-1">
                  Tokens
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-center shadow-lg">
                <TeamOutlined className="text-white text-3xl mb-3" />
                <div className="text-white text-2xl font-bold mb-1">
                  {totalMembers}
                </div>
                <div className="text-purple-100 text-sm font-medium">
                  Total Members
                </div>
                <div className="text-purple-200 text-xs mt-1">
                  Users
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-center shadow-lg">
                <PercentageOutlined className="text-white text-3xl mb-3" />
                <div className="text-white text-2xl font-bold mb-1">
                  {percentageAll}%
                </div>
                <div className="text-pink-100 text-sm font-medium">
                  Reward Rate
                </div>
                <div className="text-pink-200 text-xs mt-1">
                  Annual Percentage
                </div>
              </div>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <div className={`bg-gradient-to-br ${allowed ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'} rounded-xl p-6 text-center shadow-lg`}>
                {allowed ? <CheckCircleOutlined className="text-white text-3xl mb-3" /> : <CloseCircleOutlined className="text-white text-3xl mb-3" />}
                <div className="text-white text-2xl font-bold mb-1">
                  {allowed ? 'Active' : 'Paused'}
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  Staking Status
                </div>
                <div className="text-emerald-200 text-xs mt-1">
                  Network Status
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Spacer between Network Statistics and Project Description */}
      <div className="h-16"></div>

      {/* Project Description - Enhanced Design */}
      <Card className="glass-card border-0 shadow-xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <Title level={2} className="text-white text-4xl font-bold mb-4">
              💎 About Our Staking Platform
            </Title>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Paragraph className="text-gray-300 text-lg leading-relaxed mb-6">
                Our BEP20 staking platform allows you to stake your tokens and earn passive rewards.
                Simply connect your wallet, deposit your tokens, and watch your rewards grow over time.
                With our secure smart contract on BSC Mainnet, your funds are always safe.
              </Paragraph>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Text className="text-white font-bold">✓</Text>
                  </div>
                  <Text className="text-white font-semibold">Audited Smart Contracts</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Text className="text-white font-bold">✓</Text>
                  </div>
                  <Text className="text-white font-semibold">Open Source & Verified</Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Text className="text-white font-bold">✓</Text>
                  </div>
                  <Text className="text-white font-semibold">Competitive Rewards</Text>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-center shadow-lg">
                <div className="text-white text-3xl mb-2">🔒</div>
                <Text className="text-white font-bold text-lg">Secure</Text>
                <Text className="text-green-100 text-sm">Audited Contracts</Text>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-center shadow-lg">
                <div className="text-white text-3xl mb-2">👁️</div>
                <Text className="text-white font-bold text-lg">Transparent</Text>
                <Text className="text-blue-100 text-sm">Open Source</Text>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-center shadow-lg">
                <div className="text-white text-3xl mb-2">💰</div>
                <Text className="text-white font-bold text-lg">Profitable</Text>
                <Text className="text-purple-100 text-sm">High Rewards</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Spacer between Network Statistics and Project Description */}
      <div className="h-16"></div>
      {/* Contract Information - Enhanced Design */}
      <Card className="glass-card border-0 shadow-xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <Title level={2} className="text-white text-3xl font-bold mb-4">
              🔗 Contract Information
            </Title>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-center shadow-lg">
              <div className="text-white text-3xl mb-3">📄</div>
              <Text className="text-white font-bold text-lg mb-2">Staking Contract</Text>
              <Text className="text-blue-100 text-xs break-all">
                0x873ef278dbb6123Aee58710e29498A19d028F32f
              </Text>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-center shadow-lg">
              <div className="text-white text-3xl mb-3">🪙</div>
              <Text className="text-white font-bold text-lg mb-2">Token Contract</Text>
              <Text className="text-green-100 text-xs break-all">
                0x8d8A1478d8a4185745EcE7E96539b73B7B530419
              </Text>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-center shadow-lg">
              <div className="text-white text-3xl mb-3">🌐</div>
              <Text className="text-white font-bold text-lg mb-2">Network</Text>
              <Text className="text-purple-100 text-sm">
                BSC Mainnet
              </Text>
              <Text className="text-purple-200 text-xs">
                Binance Smart Chain
              </Text>
            </div>
          </div>

          <div className="mt-8 bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-30 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-400 text-xl">⚠️</div>
              <div>
                <Text className="text-yellow-200 font-semibold text-lg mb-2">Important Notes</Text>
                <ul className="text-yellow-100 text-sm space-y-1">
                  <li>• Always verify contract addresses before interacting</li>
                  <li>• Make sure you have BNB for gas fees</li>
                  <li>• Double-check all transactions before confirming</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
