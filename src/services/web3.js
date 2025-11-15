import { BrowserProvider } from 'ethers';

const hasEthereum = () => typeof window !== 'undefined' && window.ethereum;

export const getProvider = () => {
  if (!hasEthereum()) return null;
  return new BrowserProvider(window.ethereum);
};

export const requestAccounts = async () => {
  if (!hasEthereum()) return [];
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return Array.isArray(accounts) ? accounts : [];
};

export const getSigner = async () => {
  const provider = getProvider();
  if (!provider) return null;
  try {
    const signer = await provider.getSigner();
    return signer;
  } catch {
    return null;
  }
};

export const getNetwork = async () => {
  const provider = getProvider();
  if (!provider) return null;
  try {
    return await provider.getNetwork();
  } catch {
    return null;
  }
};

