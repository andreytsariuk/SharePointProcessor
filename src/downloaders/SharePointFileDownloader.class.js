const axios = require('axios');
const {
  AbstractFileDownloader
} = require('./AbstractFileDownloader.class');



class SharePointFileDownloader extends AbstractFileDownloader {



  /**
   * This class is a concrete realization of specific file downloader
   * It has the same properties and methods as his parent.
   * Some of this methods may be overwritten in this realization 
   * 
   * 
   * @param {string} resource 
   * @param {string} filePath 
   * @param {*} headers 
   * @param {*} options 
   */
  constructor(resource, filePath, headers, options) {
    super(resource, filePath, options);

    this.HTTP_CONFIG = {
      RESPONSE_TYPE: 'stream'
    };

    this.headers = headers;
  }


  /**
   * 
   * @returns {SharePointFileDownloader}
   */
  process() {
    axios({
      method: 'GET',
      responseType: this.HTTP_CONFIG.RESPONSE_TYPE,
      url: this.__generateRequestURL,
      headers: this.headers
    })
      .then(res => {
        this.stream = res.data;

        this.fsProcessor.process(this.stream);

        this.stream.on('end', this.done.bind(this, this.fsProcessor.file));
        this.stream.on('error', this.error.bind(this));
      })
      .catch(this.error.bind(this));

    return this;
  }

  /**
   * @override 
   * 
   * @param {*} error 
   */
  error(error) {
    if (error.response)
      this.fsProcessor.file.error = `${error.response.status}: ${error.response.statusText}`;
    this.emit('error', this.fsProcessor.file);
  }

  /**
   * SharePoint Has his own api to manipulate with object
   * Each API has an queries that provides like a path parameters in the request
   * This property return the correct URL to specific folder and file. 
   * 
   * @private
   * 
   */
  get __generateRequestURL() {
    const {
      folderName,
      name
    } = this.fsProcessor.file;

    return String(`${this.resource}/_api/web/GetFolderByServerRelativeUrl('${folderName}')/Files('${name}')/$value`);
  }
}


//==================================Main Export==================================
module.exports = {
  SharePointFileDownloader
};