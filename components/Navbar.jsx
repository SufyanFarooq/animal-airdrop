'use client';

import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button, Menu, Typography } from 'antd';
import { WalletOutlined, DisconnectOutlined, HomeOutlined, PlusOutlined, TrophyOutlined } from '@ant-design/icons';
import { web3Modal } from '@/lib/wagmiConfig';

const { Text } = Typography;

export default function Navbar({ activePage, setActivePage }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'staking',
      icon: <PlusOutlined />,
      label: 'Staking',
    },
    {
      key: 'rewards',
      icon: <TrophyOutlined />,
      label: 'Rewards',
    },
  ];

  return (
    <nav className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16">
          {/* Left side - Wallet Connection */}
          <div className="flex items-center">
            {isConnected ? (
              <div className="flex items-center space-x-1 sm:space-x-3" style={{ color: 'white' }}>
                <WalletOutlined className="text-green-500 text-lg sm:text-xl" />
                <div className="navbar-address hidden sm:block">
                  <Text 
                    className="text-white font-bold text-xs sm:text-base"
                    style={{ 
                      color: 'white', 
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatAddress(address)}
                  </Text>
                </div>
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<DisconnectOutlined />}
                  onClick={() => disconnect()}
                  className="stake-button text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Disconnect</span>
                  <span className="sm:hidden">DC</span>
                </Button>
              </div>
            ) : (
              <Button
                type="primary"
                icon={<WalletOutlined />}
                onClick={() => web3Modal.open()}
                className="stake-button text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}
          </div>

          {/* Center - Navigation Menu */}
          <div className="flex-1 flex justify-center">
            <Menu
              mode="horizontal"
              selectedKeys={[activePage]}
              onClick={({ key }) => setActivePage(key)}
              className="bg-transparent border-none hidden sm:flex"
              items={menuItems}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                lineHeight: '48px',
              }}
              theme="dark"
            />
            {/* Mobile Menu */}
            <div className="flex sm:hidden space-x-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  className={`px-2 py-1 rounded text-xs ${
                    activePage === item.key 
                      ? 'bg-blue-500 text-white' 
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Logo/Brand */}
          <div className="flex items-center">
            <Text className="text-white font-bold text-sm sm:text-lg drop-shadow-lg">
              <span className="hidden sm:inline">Animal Staking</span>
              <span className="sm:hidden">AS</span>
            </Text>
          </div>
        </div>
      </div>
    </nav>
  );
}
