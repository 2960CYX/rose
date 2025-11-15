import { keccak256, randomBytes, toUtf8Bytes } from 'ethers';
import { getSigner } from './web3';

const randomHex = (bytes = 32) => {
  const arr = randomBytes(bytes);
  return `0x${Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')}`;
};

export const blockchainService = {
  async recordCopyright(payload) {
    const timestamp = new Date().toISOString();
    let signerAddress = payload.author || null;
    let signature = null;
    try {
      const signer = await getSigner();
      if (signer) {
        signerAddress = await signer.getAddress();
        const hash = keccak256(toUtf8Bytes(`${payload.title}-${signerAddress}-${timestamp}`));
        signature = await signer.signMessage(hash);
        return {
          txHash: randomHex(32),
          timestamp,
          copyrightHash: hash,
          signerAddress,
          signature,
        };
      }
    } catch {}
    const hash = keccak256(toUtf8Bytes(`${payload.title}-${signerAddress}-${timestamp}`));
    return {
      txHash: randomHex(32),
      timestamp,
      copyrightHash: hash,
      signerAddress,
      signature,
    };
  },
};
