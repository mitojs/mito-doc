// dumi used Chinese source text at both language URLs for these five guides.
const chineseOriginals = new Set([
  'help', 'sdk/guide/wx-mini', 'sdk/guide/wxtrack',
  'sdk/support/architecture', 'sdk/support/sponsor',
]);

const originalTopics = [
  '', 'sdk/guide/introduction', 'sdk/guide/basic-configuration',
  'sdk/guide/advanced-configuration', 'sdk/guide/browser', 'sdk/guide/react',
  'sdk/guide/vue', 'sdk/support/implemention', ...chineseOriginals,
];

const sections = {
  sdk: 'sdk/guide/introduction',
  'sdk/guide': 'sdk/guide/introduction',
  'sdk/support': 'sdk/support/architecture',
};

export const legacyRoutes = {};
export const sectionRedirects = {};
for (const locale of ['', 'zh-CN/']) {
  for (const topic of originalTopics) {
    const targetLocale = chineseOriginals.has(topic) ? 'zh-CN/' : locale;
    const key = ('/' + locale + topic).replace(/\/$/, '') || '/';
    legacyRoutes[key] = '/' + targetLocale + (topic ? topic + '/' : '');
  }
  for (const [group, topic] of Object.entries(sections)) {
    const key = '/' + locale + group;
    const destination = legacyRoutes['/' + locale + topic];
    legacyRoutes[key] = destination;
    sectionRedirects[key + '/'] = destination;
  }
}
