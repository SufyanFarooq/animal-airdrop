import { useContractRead, useContractWrite, useAccount } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/contracts/config';
import { tokenABI } from '@/contracts/tokenABI';

// Hook to get token balance
export const useTokenBalance = () => {
  const { address } = useAccount();
  
  const { data: balance } = useContractRead({
    address: CONTRACT_ADDRESSES.TOKEN_CONTRACT,
    abi: tokenABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  const { data: decimals } = useContractRead({
    address: CONTRACT_ADDRESSES.TOKEN_CONTRACT,
    abi: tokenABI,
    functionName: 'decimals',
  });

  const { data: symbol } = useContractRead({
    address: CONTRACT_ADDRESSES.TOKEN_CONTRACT,
    abi: tokenABI,
    functionName: 'symbol',
  });

  const { data: name } = useContractRead({
    address: CONTRACT_ADDRESSES.TOKEN_CONTRACT,
    abi: tokenABI,
    functionName: 'name',
  });

  return {
    balance: balance || 0,
    decimals: decimals || 18,
    symbol: symbol || 'TOKEN',
    name: name || 'Token',
  };
};

// Hook to check token allowance
export const useTokenAllowance = () => {
  const { address } = useAccount();
  
  const { data: allowance } = useContractRead({
    address: CONTRACT_ADDRESSES.TOKEN_CONTRACT,
    abi: tokenABI,
    functionName: 'allowance',
    args: [address, CONTRACT_ADDRESSES.STAKING_CONTRACT],
    enabled: !!address,
  });

  return allowance || 0;
};

// Hook to approve token spending
export const useApproveToken = () => {
  const { write, isLoading, isSuccess, error } = useContractWrite({
    address: CONTRACT_ADDRESSES.TOKEN_CONTRACT,
    abi: tokenABI,
    functionName: 'approve',
  });

  const approve = (amount) => {
    if (write) {
      write({ args: [CONTRACT_ADDRESSES.STAKING_CONTRACT, amount] });
    }
  };

  return {
    approve,
    isLoading,
    isSuccess,
    error,
  };
};

// Hook to check if user has sufficient allowance
export const useHasSufficientAllowance = (requiredAmount) => {
  const allowance = useTokenAllowance();
  
  return {
    hasAllowance: allowance >= requiredAmount,
    allowance,
    needsApproval: allowance < requiredAmount,
  };
};
