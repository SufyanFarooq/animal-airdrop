'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { Button, Card, Typography } from 'antd';
import { WalletOutlined, DisconnectOutlined } from '@ant-design/icons';
import { web3Modal } from '@/lib/wagmiConfig';

const { Text } = Typography;

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <Card className="glass-card border-0 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <WalletOutlined className="text-2xl text-green-500" />
            <div>
              <Text className="text-white font-semibold">
                Wallet Connected
              </Text>
              <br />
              <Text className="text-gray-300 text-sm">
                {formatAddress(address)}
              </Text>
            </div>
          </div>
          <Button
            type="primary"
            danger
            icon={<DisconnectOutlined />}
            onClick={() => disconnect()}
            className="stake-button"
          >
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-0 shadow-lg">
      <div className="text-center">
        <WalletOutlined className="text-4xl text-white mb-4" />
        <Text className="text-white text-lg block mb-4">
          Connect Your Wallet
        </Text>
        <Text className="text-gray-300 text-sm block mb-6">
          Connect your wallet to start staking tokens
        </Text>
        <Button
          type="primary"
          size="large"
          icon={<WalletOutlined />}
          onClick={() => web3Modal.open()}
          className="stake-button px-8 py-4 h-auto text-lg"
        >
          Connect Wallet
        </Button>
      </div>
    </Card>
  );
}
