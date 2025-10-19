import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/contracts/config';
import { stakingABI } from '@/contracts/stakingABI';

// Hook to get user's staking information
export const useUserStakeInfo = () => {
  const { address } = useAccount();
  
  const { data: stakeLength } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'getUserStakeLength',
    args: [address],
    enabled: !!address,
  });

  const { data: withdrawLength } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'getWithdrawLength',
    args: [address],
    enabled: !!address,
  });

  const { data: totalWithdraw } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'usertotalWithdraw',
    args: [address],
    enabled: !!address,
  });

  return {
    stakeLength: stakeLength || 0,
    withdrawLength: withdrawLength || 0,
    totalWithdraw: totalWithdraw || 0,
  };
};

// Hook to get pending rewards
export const useRewardCalculation = () => {
  const { address } = useAccount();
  
  const { data: currentReward } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'currentRewardCalculation',
    args: [address],
    enabled: !!address,
  });

  const { data: totalReward } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'rewardCalculation',
    args: [address],
    enabled: !!address,
  });

  return {
    currentReward: currentReward || 0,
    totalReward: totalReward || 0,
  };
};

// Hook to get contract statistics
export const useContractStats = () => {
  const { data: totalDeposits } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'totalDepositInNetwork',
  });

  const { data: totalWithdrawals } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'totalWithdrawInNetwork',
  });

  const { data: totalMembers } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'totalNetworkMembers',
  });

  const { data: percentageAll } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'percentageAll',
  });

  const { data: allowed } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'Allowed',
  });

  return {
    totalDeposits: totalDeposits || 0,
    totalWithdrawals: totalWithdrawals || 0,
    totalMembers: totalMembers || 0,
    percentageAll: percentageAll || 0,
    allowed: allowed || false,
  };
};

// Hook to deposit/stake tokens
export const useDeposit = () => {
  const { write, isLoading, isSuccess, error } = useContractWrite({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'deposit',
  });

  const deposit = (amount) => {
    if (write) {
      write({ args: [amount] });
    }
  };

  return {
    deposit,
    isLoading,
    isSuccess,
    error,
  };
};

// Hook to withdraw tokens
export const useWithdraw = () => {
  const { write, isLoading, isSuccess, error } = useContractWrite({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'withdraw',
  });

  const withdraw = () => {
    if (write) {
      write();
    }
  };

  return {
    withdraw,
    isLoading,
    isSuccess,
    error,
  };
};

// Hook to get user's stake details
export const useUserStakeDetails = (index) => {
  const { address } = useAccount();
  
  const { data: stakeDetails } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'userStakeDetails',
    args: [address, index],
    enabled: !!address && index !== undefined,
  });

  return stakeDetails;
};

// Hook to get user's withdrawal info
export const useUserWithdrawInfo = (index) => {
  const { address } = useAccount();
  
  const { data: withdrawInfo } = useContractRead({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: stakingABI,
    functionName: 'userWithdrawInfo',
    args: [address, index],
    enabled: !!address && index !== undefined,
  });

  return withdrawInfo;
};
