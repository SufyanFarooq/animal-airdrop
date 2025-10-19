'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import StakingPage from '@/components/StakingPage';
import RewardsPage from '@/components/RewardsPage';

export default function Home() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'staking':
        return <StakingPage />;
      case 'rewards':
        return <RewardsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
