const {
  SharePointFileDownloadManager
} = require('../src/managers/SharePointFileDownloadManager.class');

const SPmanager = new SharePointFileDownloadManager({
  resource: 'https://tsariukandreyjs-my.sharepoint.com',
  clientId: '2cc443f0-48c3-4e60-b8ae-6cb884444630',
  clientSecret: 'm0qT_XH7Y1PR=uNznpYBfM/sYJX1DtC/'
}, {
  logProgress: true,
  logStatOnFinish: true
});



SPmanager
  .process([
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test22_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx',
    '/Documents_1/test_2.xlsx'

  ])
  .then(() => {})
  .catch(console.log);