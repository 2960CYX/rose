import { defineStore } from 'pinia';
import { Wallet } from 'ethers';
import { requestAccounts } from '../services/web3';
import {
  getStorageValue,
  setStorageValue,
} from '../composables/useLocalStorage';

const USERS_KEY = 'blogchain_users';
const SESSION_KEY = 'blogchain_current_user';
const CONNECTED_WALLET_KEY = 'blogchain_connected_wallet';

const persistUsers = (users) => setStorageValue(USERS_KEY, users);
const persistSession = (currentUserId) =>
  setStorageValue(SESSION_KEY, currentUserId);
const persistConnectedWallet = (address) =>
  setStorageValue(CONNECTED_WALLET_KEY, address);

export const useUserStore = defineStore('user', {
  state: () => ({
    users: getStorageValue(USERS_KEY, []),
    currentUserId: getStorageValue(SESSION_KEY, null),
    connectedWallet: getStorageValue(CONNECTED_WALLET_KEY, null),
  }),
  getters: {
    currentUser(state) {
      return state.users.find((user) => user.id === state.currentUserId) || null;
    },
    isAuthenticated(state) {
      return Boolean(state.currentUserId);
    },
    connectedAddress(state) {
      return state.connectedWallet;
    },
  },
  actions: {
    register({ username, password }) {
      const exists = this.users.some(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      );
      if (exists) {
        throw new Error('用户名已存在');
      }

      const wallet = Wallet.createRandom();
      const user = {
        id: `user_${Date.now()}`,
        username,
        password,
        walletAddress: wallet.address,
        createdAt: new Date().toISOString(),
      };

      this.users.push(user);
      persistUsers(this.users);
      this.currentUserId = user.id;
      persistSession(this.currentUserId);
      this.connectedWallet = user.walletAddress;
      persistConnectedWallet(this.connectedWallet);

      return user;
    },
    login({ username, password }) {
      const user = this.users.find(
        (item) =>
          item.username.toLowerCase() === username.toLowerCase() &&
          item.password === password
      );
      if (!user) {
        throw new Error('用户名或密码错误');
      }
      this.currentUserId = user.id;
      persistSession(this.currentUserId);
      this.connectedWallet = user.walletAddress;
      persistConnectedWallet(this.connectedWallet);
      return user;
    },
    // 一键体验：假登录，创建或复用游客账户
    guestLogin() {
      let user = this.users.find((u) => u.isGuest);
      if (!user) {
        const wallet = Wallet.createRandom();
        user = {
          id: `guest_${Date.now()}`,
          username: `游客-${Math.floor(1000 + Math.random() * 9000)}`,
          password: 'guest',
          walletAddress: wallet.address,
          createdAt: new Date().toISOString(),
          isGuest: true,
        };
        this.users.push(user);
        persistUsers(this.users);
      }
      this.currentUserId = user.id;
      persistSession(this.currentUserId);
      this.connectedWallet = user.walletAddress;
      persistConnectedWallet(this.connectedWallet);
      return user;
    },
    logout() {
      this.currentUserId = null;
      persistSession(this.currentUserId);
      this.connectedWallet = null;
      persistConnectedWallet(this.connectedWallet);
    },
    async connectWallet() {
      try {
        const accounts = await requestAccounts();
        const addr = accounts[0];
        if (addr) {
          this.connectedWallet = addr;
          persistConnectedWallet(this.connectedWallet);
          return this.connectedWallet;
        }
      } catch {}
      if (this.currentUser) {
        this.connectedWallet = this.currentUser.walletAddress;
      } else {
        const wallet = Wallet.createRandom();
        this.connectedWallet = wallet.address;
      }
      persistConnectedWallet(this.connectedWallet);
      return this.connectedWallet;
    },
    disconnectWallet() {
      this.connectedWallet = null;
      persistConnectedWallet(this.connectedWallet);
    },
  },
});
