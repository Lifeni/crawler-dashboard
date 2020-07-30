import { defineConfig } from 'umi';

export default defineConfig({
  title: 'Dashboard',
  mock: false,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
