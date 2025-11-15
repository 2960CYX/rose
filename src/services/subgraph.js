const getSubgraphUrl = () => {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('subgraph_url') : null;
  return saved || 'https://api.thegraph.com/subgraphs/name/your-org/blogchain';
};

export const setSubgraphUrl = (url) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('subgraph_url', url);
  }
};

const fetchGraph = async (query, variables = {}) => {
  const url = getSubgraphUrl();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error('Subgraph request failed');
  const data = await res.json();
  if (data.errors) throw new Error('Subgraph error');
  return data.data;
};

const fetchMetadata = async (uri) => {
  try {
    if (!uri) return null;
    const normalized = uri.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${uri.replace('ipfs://', '')}` : uri;
    const res = await fetch(normalized);
    if (!res.ok) return null;
    const json = await res.json();
    return json;
  } catch {
    return null;
  }
};

const normalizePost = async (node) => {
  const meta = await fetchMetadata(node.uri);
  return {
    id: node.id || `post_${Date.now()}`,
    title: (meta && meta.title) || '未命名文章',
    content: (meta && meta.content) || '',
    summary: (meta && meta.summary) || '',
    authorId: node.author || null,
    authorName: (meta && meta.authorName) || node.author || '未知作者',
    createdAt: node.timestamp ? new Date(Number(node.timestamp) * 1000).toISOString() : new Date().toISOString(),
    blockchain: {
      txHash: node.txHash || '',
      timestamp: node.timestamp ? new Date(Number(node.timestamp) * 1000).toISOString() : new Date().toISOString(),
      copyrightHash: node.hash || '',
    },
    likes: (meta && meta.likes) || 0,
    comments: [],
  };
};

export const getLatestPosts = async (limit = 20) => {
  const query = `
    query ($limit: Int!) {
      posts(first: $limit, orderBy: timestamp, orderDirection: desc) {
        id
        author
        hash
        uri
        timestamp
        txHash
      }
    }
  `;
  const data = await fetchGraph(query, { limit });
  const list = data.posts || [];
  const mapped = await Promise.all(list.map((n) => normalizePost(n)));
  return mapped;
};

export const searchPosts = async (keyword, limit = 50) => {
  const all = await getLatestPosts(limit);
  const q = (keyword || '').trim().toLowerCase();
  if (!q) return [];
  return all.filter((p) => {
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.summary || '').toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q) ||
      (p.authorName || '').toLowerCase().includes(q)
    );
  });
};

