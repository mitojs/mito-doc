import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'MITO',
  favicon: 'https://files.catbox.moe/3qsaz5.png',
  // https://files.catbox.moe/3qsaz5.png
  // https://tva1.sinaimg.cn/large/008i3skNly1guuhc7m78xj60x60t8t9m02.jpg
  logo: 'https://files.catbox.moe/3qsaz5.png',
  outputPath: 'docs',
  // base: '/mito-doc',
  publicPath: '/mito-doc/',
  mode: 'site',
  resolve: {
    resolve: ['src'],
  },
  exportStatic: {},
  hash: true,
  history: {
    type: 'hash',
  },
  // ssr: {
  //   // 更多配置
  //   // forceInitial: false,
  //   // removeWindowInitialProps: false
  //   // devServerRender: true,
  //   // mode: 'string',
  //   // staticMarkup: false,
  // },
  navs: {
    'en-US': [
      null,
      { title: 'GitHub', path: 'https://github.com/mitojs/mitojs' },
      { title: 'juejin', path: 'https://juejin.cn/user/3421335917434744' },
      { title: 'blog', path: 'https://cjinhuo.netlify.app/' },
      { title: 'Changelog', path: 'https://github.com/mitojs/mitojs/releases' },
    ],
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/mitojs/mitojs' },
      { title: '掘金', path: 'https://juejin.cn/user/3421335917434744' },
      { title: '个人博客', path: 'https://cjinhuo.netlify.app/' },
      { title: '更新日志', path: 'https://github.com/mitojs/mitojs/releases' },
    ],
  },
});
