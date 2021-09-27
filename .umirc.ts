import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'MITO',
  favicon:
    'https://tva1.sinaimg.cn/large/008i3skNly1guuhc7m78xj60x60t8t9m02.jpg',
  logo: 'https://tva1.sinaimg.cn/large/008i3skNly1guuhc7m78xj60x60t8t9m02.jpg',
  outputPath: 'docs',
  mode: 'site',
  publicPath: '/mito-doc/',
  resolve: {
    resolve: ['src'],
  },
  history: {
    type: 'hash',
  },
  // navs: [
  //   {
  //     title: '指南',
  //     order: 1,
  //     path: '/docs/cook',
  //   },
  //   {
  //     title: 'API',
  //     order: 2,
  //     path: '/api',
  //     // children: [
  //     //   { title: '@分包1', path: '/xxxx' },
  //     //   { title: '@分包2', path: '/xxx' },
  //     // ],
  //   },
  //   {
  //     title: '联系我们',
  //     order: 3,
  //     path: '/help',
  //   },
  // ],
});