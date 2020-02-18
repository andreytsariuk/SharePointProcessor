const config = require('config');
const {
  SharePointFileDownloadManager
} = require('../src/managers/SharePointFileDownloadManager.class');


const SPmanager = new SharePointFileDownloadManager({
  resource:  config.get('SHAREPOINT.RESOURCE'),
  clientId: config.get('SHAREPOINT.CLIENT_ID'),
  clientSecret:  config.get('SHAREPOINT.CLIENT_SECRET')
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