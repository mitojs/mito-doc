import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import { sectionRedirects } from './src/legacy-routes.mjs';

const base = '/mito-doc';
const guide = 'sdk/guide/';
const support = 'sdk/support/';
const shareImage = 'https://mitojs.github.io/mito-doc/media/brand.jpg';

export default defineConfig({
  site: 'https://mitojs.github.io',
  base,
  trailingSlash: 'always',
  markdown: { processor: satteri({ features: { smartPunctuation: false } }) },
  redirects: Object.fromEntries(Object.entries(sectionRedirects).map(([route, target]) => [route, base + target])),
  integrations: [starlight({
    title: 'MitoJS',
    defaultLocale: 'root',
    locales: {
      root: { label: 'English', lang: 'en' },
      'zh-CN': { label: '简体中文', lang: 'zh-CN' },
    },
    expressiveCode: { frames: { extractFileNameFromCode: false, removeCommentsWhenCopyingTerminalFrames: false } },
    favicon: '/media/brand.jpg',
    social: [{ icon: 'github', label: 'MitoJS on GitHub', href: 'https://github.com/mitojs/mitojs' }],
    editLink: { baseUrl: 'https://github.com/mitojs/mito-doc/edit/master/' },
    customCss: ['./src/styles/docs.css'],
    components: {
      Head: './src/components/Head.astro',
      Footer: './src/components/Footer.astro',
      LanguageSelect: './src/components/LanguageSelect.astro',
      SiteTitle: './src/components/SiteTitle.astro',
    },
    head: [
      { tag: 'meta', attrs: { property: 'og:image', content: shareImage } },
      { tag: 'meta', attrs: { name: 'twitter:image', content: shareImage } },
    ],
    sidebar: [
      { label: 'Get started', translations: { 'zh-CN': '开始使用' },
        items: [guide + 'quickstart-v4', guide + 'introduction'] },
      { label: 'Platform guides', translations: { 'zh-CN': '平台接入' },
        items: ['browser', 'react', 'vue', 'wx-mini', 'wxtrack'].map((name) => guide + name) },
      { label: 'Configuration', translations: { 'zh-CN': 'SDK 配置' },
        items: [guide + 'basic-configuration', guide + 'advanced-configuration'] },
      { label: 'Project & support', translations: { 'zh-CN': '项目与支持' },
        items: [support + 'architecture', support + 'implemention', 'help', support + 'sponsor'] },
    ],
  })],
});
