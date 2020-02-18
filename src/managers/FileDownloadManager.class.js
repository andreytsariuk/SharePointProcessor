const config = require('config');
const EventEmitter = require('events');
const {
  AbstractFileDownloader // eslint-disable-line no-unused-vars
} = require('../downloaders/AbstractFileDownloader.class');

class FileDownloadManager {


  /**
   * 
   * @typedef FileDownloadManagerOptions
   * @property {Boolean} logProgress
   * @property {Boolean} logStatOnFinish
   * 
   * @param {*} providedConfig
   * @param {FileDownloadManagerOptions} options
   */
  constructor(providedConfig, options = {
    logProgress: config.get('OPTIONS.LOG_PROGRESS'),
    logStatOnFinish: true
  }) {
    this.MAX_REQUESTS_INFLY = config.get('OPTIONS.BATCH_SIZE');
    this.CHECK_INTERVAL = 100;


    this.config = providedConfig;
    this.options = options;

    /**
     * @typedef FileDownloadManagerStats
     * @property {number}  processed
     * @property {number}  inProgress
     * @property {number}  todo
     * @property {number}  failed
     * @property {Date}  startTime
     * @property {Date}  endTime
     * @property {number}  spentTime
     * @property {number}  linesCount
     * @property {number}  totalFileSize
     * 
     * @type {FileDownloadManagerStats}
     */
    this.stat = {
      processed: 0,
      inProgress: 0,
      todo: 0,
      failed: 0,
      startTime: new Date(),
      endTime: new Date(),
      spentTime: 0,
      linesCount: 0,
      totalFileSize: 0
    };

    this.doneEventEmitter = new EventEmitter();
    this.__requestsQueue = new WeakSet();
    this.result = new Map();


    /**
     * @type {Array<AbstractFileDownloader>}
     */
    this.files = [];  // eslint-disable-line no-unused-vars
  }


  /**
   * @typedef FileStreamProcessorFile
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
   * @typedef FileDownloadManagerResult
   * @property {FileDownloadManagerStats} stat
   * @property {Map<FileStreamProcessorFile>} result
   * 
   * 
   * 
   * @param {Array<string>} files
   * 
   * @returns {Promise<FileDownloadManagerResult>} 
   */
  process() {

  }


  /**
   * @private
   */
  __processChecker() {

  }


  /**
   * 
   * @private
   * 
   */
  __prepareFiles() {

  }


  /**
   * This method should identify the AbstractFileDownloader that haven't been processed yet 
   * 
   * @private
   * 
   * @returns {AbstractFileDownloader}
   */
  __findUnProcessedFile() {
    let newDownload;

    for (let i = 0; i < this.files.length; i++) {
      if (!this.result.has(this.files[i].fsProcessor.file.id) && !this.__requestsQueue.has(this.files[i])) {
        newDownload = this.files[i];
        break;
      }
    }
    return newDownload;
  }

  /**
   * 
   * @private
   * 
   * @param {AbstractFileDownloader} newDownload 
   */
  __addNewDownload(newDownload) {
    if (!newDownload)
      return;
    this.stat.inProgress++;
    this.__requestsQueue.add(newDownload);

    newDownload.process()
      .on('done', () => this.__onDone(newDownload))
      .on('error', err => this.__onError(newDownload, err));
  }

  /**
   * 
   * @param {SharePointFileDownloader} newDownload 
   */
  __onDone(newDownload) {
    this.stat.processed++;
    this.stat.inProgress--;
    this.stat.todo--;
    this.stat.linesCount += newDownload.fsProcessor.file.linesCount;
    this.stat.totalFileSize += newDownload.fsProcessor.file.size;


    this.__requestsQueue.delete(newDownload);
    this.result.set(newDownload.fsProcessor.file.id, newDownload.fsProcessor.file);

    if (this.files.length > this.result.size)
      this.__addNewDownload(this.__findUnProcessedFile());
    else
      this.doneEventEmitter.emit('done');


  }

  /**
   * This method updates statistics and creates a new request as well.
   * Creation of the new request depends on the amount of processed requests
   * If not all files has been processed => new request should be created
   * 
   * 
   * @private
   * 
   * @param {AbstractFileDownloader} newDownload 
   * @param {*} error 
   */
  __onError(newDownload, error) {
    this.stat.failed++;
    this.stat.inProgress--;
    this.stat.todo--;


    this.__requestsQueue.delete(newDownload);

    this.result.set(newDownload.fsProcessor.file.id, error);

    if (this.files.length > this.result.size)
      this.__addNewDownload(this.__findUnProcessedFile());
    else
      this.doneEventEmitter.emit('done');
  }
}


//==================================Main Export==================================
module.exports = {
  FileDownloadManager
};