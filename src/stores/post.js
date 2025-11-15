import { defineStore } from 'pinia';
import { blockchainService } from '../services/blockchain';
import { getStorageValue, setStorageValue } from '../composables/useLocalStorage';

const POSTS_KEY = 'blogchain_posts';

const truncate = (text, length = 140) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

const defaultPosts = [
  {
    id: 'post_seed_1',
    title: '去中心化内容创作的新纪元',
    content:
      '区块链技术正在重塑内容创作者与读者之间的关系。通过智能合约，作者可以直接获得版权保护与收益分配，从而形成更公平透明的创作生态……',
    summary: '区块链赋能内容创作者，带来更透明的收益与版权保护体验。',
    authorId: 'seed_user_1',
    authorName: '链圈小白',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    blockchain: {
      txHash: '0xseed00a1b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a19b',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      copyrightHash:
        '0x12d8d5f7f189ee31c428e64d2f0c7c2c59a2f957d2403d0055c0ef3a3df17d88',
    },
    likes: 12,
    comments: [
      {
        id: 'comment_seed_1',
        author: '区块链观察员',
        content: '期待看到更多创作者加入这个生态！',
        createdAt: new Date(Date.now() - 86300000).toISOString(),
      },
    ],
  },
  {
    id: 'post_seed_2',
    title: '从零开始构建链上博客',
    content:
      '本文将分享一个基于 Vue3 + Ethers.js + Element Plus 打造的链上博客系统的设计思路和实现细节，包括账户体系、文章发布流程以及版权上链的模拟……',
    summary: '技术向：一步步搭建区块链驱动的个人博客系统。',
    authorId: 'seed_user_2',
    authorName: '全栈奶茶',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    blockchain: {
      txHash: '0xseed10b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a19c',
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      copyrightHash:
        '0x9f8f3dc8f9c0a5b4d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6071829',
    },
    likes: 7,
    comments: [],
  },
  {
    id: 'post_seed_3',
    title: '写作模板：如何构建高质量技术文章',
    content:
      '本文给出一个通用的写作模板：摘要、问题背景、解决方案、实现细节、示例与总结。并提供结构化段落与小结样例，帮助你快速产出高质量内容。',
    summary: '结构化写作模板，提升技术文章的清晰度与可读性。',
    authorId: 'seed_user_3',
    authorName: '技术斑马',
    createdAt: new Date(Date.now() - 36 * 3600000).toISOString(),
    blockchain: {
      txHash: '0xseed20b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a19d',
      timestamp: new Date(Date.now() - 36 * 3600000).toISOString(),
      copyrightHash:
        '0x7b1a3c96f5c2d7e8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6071829aa55cc',
    },
    likes: 15,
    comments: [],
  },
  {
    id: 'post_seed_4',
    title: '链上版权：用哈希指纹定义原创',
    content:
      '通过对文章标题与作者信息进行哈希处理，我们模拟生成版权指纹，作为链上版权记录的一部分。该指纹与交易哈希共同构成可验证的原创凭证。',
    summary: '链上版权的核心是可验证与可审计的原创凭证。',
    authorId: 'seed_user_4',
    authorName: '白皮书搬运工',
    createdAt: new Date(Date.now() - 30 * 3600000).toISOString(),
    blockchain: {
      txHash: '0xseed30b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a19e',
      timestamp: new Date(Date.now() - 30 * 3600000).toISOString(),
      copyrightHash:
        '0x55dd1122cc33aa4499bb88ee7766ff00112233445566778899aabbccddeeff11',
    },
    likes: 9,
    comments: [],
  },
  {
    id: 'post_seed_5',
    title: '前端工程：从组件到设计系统',
    content:
      '以 Element Plus 为基础，统一卡片圆角、信息色与阴影，构建一致的设计系统与样式变量，让页面在扩展时保持视觉一致性。',
    summary: '统一样式变量与组件规范，搭建一致的前端设计系统。',
    authorId: 'seed_user_5',
    authorName: '前端炼金术师',
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    blockchain: {
      txHash: '0xseed40b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a19f',
      timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
      copyrightHash:
        '0xaa11bb22cc33dd44ee55ff6677889900aabbccddeeff11223344556677889900',
    },
    likes: 21,
    comments: [
      {
        id: 'comment_seed_5_1',
        author: 'UI 观测员',
        content: '样式统一之后，页面看起来舒服多了！',
        createdAt: new Date(Date.now() - 23 * 3600000).toISOString(),
      },
    ],
  },
  {
    id: 'post_seed_6',
    title: '创作与传播：提升文章影响力的五个方法',
    content:
      '为文章设计有辨识度的标题与摘要；善用社交平台分发；及时回复评论；复盘与迭代版本；在合适的社区投稿以扩大影响力。',
    summary: '从标题到互动，五个方面提高技术文章传播效果。',
    authorId: 'seed_user_6',
    authorName: '架构漫游者',
    createdAt: new Date(Date.now() - 18 * 3600000).toISOString(),
    blockchain: {
      txHash: '0xseed50b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a190',
      timestamp: new Date(Date.now() - 18 * 3600000).toISOString(),
      copyrightHash:
        '0xbb22cc33dd44ee55ff6677889900aabbccddeeff11223344556677889900aa11',
    },
    likes: 5,
    comments: [],
  },
  {
    id: 'post_seed_7',
    title: '设计与写作：让技术更好看也更好懂',
    content:
      '维持一致的视觉风格、合理的留白与层次，配合结构化写作，能够显著提升文章的观感与理解效率。',
    summary: '统一视觉与结构化写作，让技术内容更易理解。',
    authorId: 'seed_user_7',
    authorName: '设计与写作',
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(),
    blockchain: {
      txHash: '0xseed60b2c3d4e5f6a7b8c9d10e11f12a13b14c15d16e17f18a191',
      timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
      copyrightHash:
        '0xcc33dd44ee55ff6677889900aabbccddeeff11223344556677889900aa11bb22',
    },
    likes: 17,
    comments: [],
  },
];

const persistPosts = (posts) => setStorageValue(POSTS_KEY, posts);

const loadInitialPosts = () => {
  const stored = getStorageValue(POSTS_KEY, null);
  if (Array.isArray(stored) && stored.length) {
    // 合并新增种子，避免已有用户数据过少影响体验
    const existingIds = new Set(stored.map((p) => p.id));
    const missingSeeds = defaultPosts.filter((p) => !existingIds.has(p.id));
    const merged = missingSeeds.length ? stored.concat(missingSeeds) : stored;
    if (missingSeeds.length) persistPosts(merged);
    return merged;
  }
  persistPosts(defaultPosts);
  return defaultPosts;
};

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: loadInitialPosts(),
  }),
  getters: {
    postList(state) {
      return [...state.posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  },
  actions: {
    async createPost({ title, content, authorId, authorName }) {
      const blockchainInfo = await blockchainService.recordCopyright({
        title,
        author: authorName,
      });
      const post = {
        id: `post_${Date.now()}`,
        title,
        content,
        summary: truncate(content),
        authorId,
        authorName,
        createdAt: new Date().toISOString(),
        blockchain: blockchainInfo,
        likes: 0,
        comments: [],
      };
      this.posts.push(post);
      persistPosts(this.posts);
      return post;
    },
    findById(id) {
      return this.posts.find((post) => post.id === id) || null;
    },
    postsByAuthor(authorId) {
      return this.posts
        .filter((post) => post.authorId === authorId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    likePost(id) {
      const post = this.findById(id);
      if (!post) {
        throw new Error('文章不存在');
      }
      post.likes += 1;
      persistPosts(this.posts);
      return post.likes;
    },
    addComment(id, comment) {
      const post = this.findById(id);
      if (!post) {
        throw new Error('文章不存在');
      }
      const newComment = {
        id: `comment_${Date.now()}`,
        author: comment.author,
        content: comment.content,
        createdAt: new Date().toISOString(),
      };
      post.comments.unshift(newComment);
      persistPosts(this.posts);
      return newComment;
    },
  },
});
