const spauth = require('node-sp-auth');
const {
  ProgressVisualizer
} = require('../visualizers/ProgressVisualizer.class');
const {
  SharePointFileDownloader
} = require('../downloaders/SharePointFileDownloader.class');
const {
  FileDownloadManager
} = require('./FileDownloadManager.class');

class SharePointFileDownloadManager extends FileDownloadManager {



  /**
   * @typedef SharePointFileDownloadManagerConfig
   * @property {string} resource
   * @property {string} clientId
   * @property {string} clientSecret
   * 
   * 
   * @typedef SharePointFileDownloadManagerOptions
   * @property {Boolean} logProgress
   * @property {Boolean} logStatOnFinish
   * 
   * @param {SharePointFileDownloadManagerConfig} config 
   * @param {SharePointFileDownloadManagerOptions} options 
   */
  constructor(config, options) {
    super(config, options);

    this.HEADERS = {
      'Accept': 'application/json;odata=verbose',
      'Authorization': ''
    };
  }

  /**
   * @typedef SPFileStreamProcessorFile
   * @property {string} id
   * @property {string} name
   * @property {string} folderName
   * @property {string} fullPath
   * @property {string} mimeType
   * @property {number} linesCount
   * @property {number} size
   * @property {number} size
   * @property {number} spentTime
   * @property {Date} startTime
   * @property {Date} endTime
   * @property {*} error
   * 
   * 
   * @typedef SPFileDownloadManagerResult
   * @property {FileDownloadManagerStats} stat
   * @property {Map<SPFileStreamProcessorFile>} result
   * 
   * 
   * 
   * @param {Array<string>} files
   * 
   * @returns {Promise<SPFileDownloadManagerResult>} 
   */
  process(files) {
    this.stat.startTime = new Date();

    return this
      .auth()
      .then(() => {
        this.files = this.__prepareFiles(files);

        this.stat.todo = files.length;
      })
      .then(() =>
        new Promise((resolve, reject) => {
          for (let i = 0; i <
            (this.files.length < this.MAX_REQUESTS_INFLY ?
              this.files.length :
              this.MAX_REQUESTS_INFLY); i++)
            this.__addNewDownload(this.files[i]);

          if (this.options.logProgress) {
            this.checkInterval = setInterval(this.__processChecker.bind(this), this.CHECK_INTERVAL);

          }
          this.doneEventEmitter.on('error', err => {
            clearInterval(this.checkInterval);

            return reject(err);
          });

          this.doneEventEmitter.on('done', () => {
            this.stat.endTime = new Date();
            clearInterval(this.checkInterval);
            this.stat.spentTime = this.stat.endTime - this.stat.startTime;

            return resolve(this.result);
          });

        })
      )
      .then(data => {
        if (this.options.logStatOnFinish) {

          ProgressVisualizer.visualizeSPResult(this.stat, data);
        }
        return data;
      });

  }

  /**
   * @private
   */
  __processChecker() {
    ProgressVisualizer.visualizeSPProgress(this.stat);
  }


  /**
   * 
   * @private
   * 
   * @param {Array<string>} files 
   */
  __prepareFiles(files) {
    return files.map(filePath => new SharePointFileDownloader(
      this.config.resource,
      filePath,
      this.HEADERS
    ));
  }


  /**
   * 
   */
  auth() {
    return spauth.getAuth(this.config.resource, {
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret
    })
      .then(options => {
        this.HEADERS = options.headers;
        this.HEADERS['Accept'] = 'application/json;odata=verbose';
      });
  }


}



//==================================Main Export==================================
module.exports = {
  SharePointFileDownloadManager
};