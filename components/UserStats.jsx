'use client';

import { useAccount } from 'wagmi';
import { Card, Typography, Table, Tag, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { useUserStakeInfo, useRewardCalculation, useUserStakeDetails } from '@/hooks/useStakingContract';
import { formatEther } from 'viem';
import { useState, useEffect, useCallback } from 'react';

const { Title, Text } = Typography;

// Component to fetch individual stake details
const StakeDetailFetcher = ({ index, onData }) => {
  const stakeDetails = useUserStakeDetails(index);
  
  useEffect(() => {
    console.log(`StakeDetailFetcher ${index} - stakeDetails:`, stakeDetails);
    
    if (stakeDetails && Array.isArray(stakeDetails) && stakeDetails.length >= 4) {
      try {
        const [stakedAmount, stakedPercentage, stakedDay, stakedTimestamp] = stakeDetails;
        console.log(`Processing stake data for index ${index}:`, {
          stakedAmount,
          stakedPercentage,
          stakedDay,
          stakedTimestamp
        });
        
        const processedData = {
          key: index,
          amount: formatEther(stakedAmount),
          percentage: Number(stakedPercentage),
          day: Number(stakedDay),
          timestamp: new Date(Number(stakedTimestamp) * 1000).toLocaleDateString(),
        };
        
        console.log(`Sending processed data for index ${index}:`, processedData);
        onData(processedData);
      } catch (error) {
        console.error('Error processing stake details:', error);
      }
    } else {
      console.log(`Stake details for index ${index} not ready:`, stakeDetails);
    }
  }, [stakeDetails, index, onData]);
  
  return null;
};

export default function UserStats() {
  const { isConnected, address } = useAccount();
  const [stakeHistory, setStakeHistory] = useState([]);
  
  const { stakeLength, withdrawLength, totalWithdraw } = useUserStakeInfo();
  const { currentReward, totalReward } = useRewardCalculation();

  // Debug logging
  useEffect(() => {
    console.log('UserStats - stakeLength:', stakeLength);
    console.log('UserStats - isConnected:', isConnected);
    console.log('UserStats - stakeHistory:', stakeHistory);
  }, [stakeLength, isConnected, stakeHistory]);

  const handleStakeData = useCallback((stakeData) => {
    if (!stakeData || typeof stakeData.key === 'undefined') {
      console.warn('Invalid stake data received:', stakeData);
      return;
    }
    
    try {
      setStakeHistory(prev => {
        const updated = [...prev];
        const existingIndex = updated.findIndex(item => item.key === stakeData.key);
        if (existingIndex >= 0) {
          updated[existingIndex] = stakeData;
        } else {
          updated.push(stakeData);
        }
        return updated.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      });
    } catch (error) {
      console.error('Error updating stake history:', error);
    }
  }, []);

  const stakeColumns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span style={{ color: '#000000', fontWeight: 'bold' }}>
          {parseFloat(amount)} Tokens
        </span>
      ),
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage) => (
        <span style={{ color: '#000000', fontWeight: 'bold' }}>
          {formatEther(percentage)}%
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => (
        <span style={{ color: '#000000', fontWeight: 'bold' }}>
          {timestamp}
        </span>
      ),
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
      {/* Render StakeDetailFetcher components for each stake */}
      {isConnected && stakeLength > 0 && Number(stakeLength) > 0 && Array.from({ length: Math.min(Number(stakeLength), 10) }, (_, i) => (
        <StakeDetailFetcher key={i} index={i} onData={handleStakeData} />
      ))}
      
      {/* User Statistics Cards */}
      <Card className="glass-card border-0 shadow-lg">
      <Title level={3} className="text-white text-center mb-6">
          Your Statistics
        </Title>
      </Card>
      {/* <Card className="glass-card border-0 shadow-lg">
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
              value={Number(stakeLength)}
              valueStyle={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}
            />
          </Col>
        </Row> 
      </Card> */}
      <div className="h-1"></div>
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
            className="custom-table"
            rowClassName="custom-table-row"
            scroll={{ x: 400 }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
            components={{
              header: {
                cell: (props) => (
                  <th {...props} style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    color: '#000000',
                    fontWeight: 'bold',
                    border: 'none'
                  }} />
                ),
              },
              body: {
                row: (props) => (
                  <tr {...props} style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#000000'
                  }} />
                ),
                cell: (props) => (
                  <td {...props} style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#000000',
                    border: 'none'
                  }} />
                ),
              },
            }}
          />
        </Card>
      )}

    </div>
  );
}
