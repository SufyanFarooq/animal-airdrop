'use client';

import { Card, Typography, Row, Col, Statistic, Tag } from 'antd';
import { 
  DollarOutlined, 
  TeamOutlined, 
  ArrowUpOutlined, 
  PercentageOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { useContractStats } from '@/hooks/useStakingContract';
import { formatEther } from 'viem';

const { Title, Text } = Typography;

export default function ContractStats() {
  const { 
    totalDeposits, 
    totalWithdrawals, 
    totalMembers, 
    percentageAll, 
    allowed 
  } = useContractStats();

  const netDeposits = parseFloat(formatEther(totalDeposits)) - parseFloat(formatEther(totalWithdrawals));

  return (
    <Card className="glass-card border-0 shadow-lg">
      <Title level={3} className="text-white text-center mb-6">
        Network Statistics
      </Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title={<Text className="text-gray-300">Total Deposits</Text>}
            value={formatEther(totalDeposits)}
            precision={4}
            suffix="Tokens"
            valueStyle={{ color: '#10b981' }}
            prefix={<DollarOutlined />}
          />
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title={<Text className="text-gray-300">Total Withdrawals</Text>}
            value={formatEther(totalWithdrawals)}
            precision={4}
            suffix="Tokens"
            valueStyle={{ color: '#f59e0b' }}
            prefix={<ArrowUpOutlined />}
          />
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title={<Text className="text-gray-300">Net Deposits</Text>}
            value={netDeposits}
            precision={4}
            suffix="Tokens"
            valueStyle={{ color: netDeposits >= 0 ? '#10b981' : '#ef4444' }}
            prefix={<DollarOutlined />}
          />
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title={<Text className="text-gray-300">Total Members</Text>}
            value={totalMembers}
            suffix="Users"
            valueStyle={{ color: '#3b82f6' }}
            prefix={<TeamOutlined />}
          />
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <Statistic
            title={<Text className="text-gray-300">Reward Percentage</Text>}
            value={percentageAll}
            suffix="%"
            valueStyle={{ color: '#8b5cf6' }}
            prefix={<PercentageOutlined />}
          />
        </Col>
        
        <Col xs={24} sm={12} md={8}>
          <div className="text-center">
            <Text className="text-gray-300 block mb-2">Staking Status</Text>
            <Tag 
              color={allowed ? 'green' : 'red'} 
              icon={allowed ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              className="text-lg px-4 py-2"
            >
              {allowed ? 'Active' : 'Paused'}
            </Tag>
          </div>
        </Col>
      </Row>

      <div className="mt-6 p-4 bg-black bg-opacity-20 rounded-lg">
        <Text className="text-gray-300 text-sm">
          💡 <strong>Network Overview:</strong> This shows the total activity across all users in the staking network. 
          Net deposits represent the total value currently staked in the contract.
        </Text>
      </div>
    </Card>
  );
}
