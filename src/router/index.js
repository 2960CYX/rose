import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Auth from '../pages/Auth.vue';
import CreatePost from '../pages/CreatePost.vue';
import PostDetail from '../pages/PostDetail.vue';
import Profile from '../pages/Profile.vue';
import Explore from '../pages/Explore.vue';
import Search from '../pages/Search.vue';
import About from '../pages/About.vue';
import Learn from '../pages/Learn.vue';
import FAQ from '../pages/FAQ.vue';
import Contact from '../pages/Contact.vue';
import Leaderboard from '../pages/Leaderboard.vue';
import Archive from '../pages/Archive.vue';
import Authors from '../pages/Authors.vue';
import Resources from '../pages/Resources.vue';
import Roadmap from '../pages/Roadmap.vue';
import Tags from '../pages/Tags.vue';
import Series from '../pages/Series.vue';
import NotFound from '../pages/NotFound.vue';
import { pinia } from '../stores';
import { useUserStore } from '../stores/user';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
  },
  {
    path: '/archives',
    name: 'Archive',
    component: Archive,
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: Roadmap,
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags,
  },
  {
    path: '/series',
    name: 'Series',
    component: Series,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore(pinia);
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'Auth', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
