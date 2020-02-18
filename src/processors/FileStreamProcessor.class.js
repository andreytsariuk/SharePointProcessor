const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const {
  ReadStream // eslint-disable-line no-unused-vars
} = require('fs');

class FileStreamProcessor {


  /**
   * @typedef FileStreamProcessorOptions
   * @property {Boolean} writeFile
   * @property {Boolean} countLines
   * @property {Boolean} calculateSize
   * 
   * 
   * @param {String} filePath 
   * @param {FileStreamProcessorOptions} options 
   */
  constructor(filePath, options = {
    writeFile: false,
    countLines: true,
    calculateSize: true
  }) {
    this.fs = fs;
    this.path = path;

    this.options = options;

    this.file = {
      error: undefined,
      startTime: new Date(),
      endTime: new Date(),
      spentTime: 0,
      id: uniqid(),
      name: this.__identifyFileName(filePath),
      folderName: this.__identifyFolderName(filePath),
      fullPath: filePath,
      size: 0,
      linesCount: 0,
      mimeType: this.__identifyMimeType(filePath)
    };
  }


  /**
   * 
   * @param {ReadStream} stream 
   * 
   * @returns {ReadStream}
   */
  process(stream) {
    this.file.startTime = new Date();

    if (this.options.writeFile)
      this.writeFile(stream);

    if (this.options.calculateSize)
      this.calculateSize(stream);

    if (this.options.countLines)
      this.countLines(stream);

    stream.on('end', () => {
      this.file.endTime = new Date();
      this.file.spentTime = this.file.endTime - this.file.startTime;
    });
    stream.on('error', () => {
      this.file.endTime = new Date();
      this.file.spentTime = this.file.endTime - this.file.startTime;
    });
  }


  /**
   * 
   * @param {ReadStream} stream 
   * 
   * @returns {ReadStream}
   */
  writeFile(stream) {
    const path = this.path.resolve(__dirname, 'downloads', `${this.file.id}_${this.file.name}`);
    const writer = this.fs.createWriteStream(path);

    return stream.pipe(writer);
  }


  /**
   * 
   * @param {ReadStream} stream 
   * 
   * @returns {ReadStream}
   */
  calculateSize(stream) {
    let i;
    stream.on('data', chunk => this.__calculateSizeFromStream(i, chunk));
  }


  /**
   * 
   * @param {ReadStream} stream 
   * 
   * @returns {ReadStream}
   */
  countLines(stream) {
    let i;
    stream.on('data', chunk => this.__countLinesFromStream(i, chunk));
  }


  /**
   * @private
   * 
   * @param {Buffer} chunk 
   * 
   */
  __countLinesFromStream(i, chunk) {
    for (i = 0; i < chunk.length; ++i)
      if (chunk[i] == 10) this.file.linesCount++;
  }


  /**
   * @private
   * 
   * @param {Buffer} chunk 
   * 
   */
  __calculateSizeFromStream(i, chunk) {
    this.file.size += chunk.length;
  }


  /**
   * @private
   * 
   * 
   * @param {String} filePath 
   */
  __identifyMimeType(filePath) {
    const [mimeType] = filePath.split('.').reverse();
    return mimeType;
  }

  /**
   * @private
   * 
   * 
   * @param {String} filePath 
   */
  __identifyFileName(filePath) {
    const [fileName] = filePath.split('/').reverse();
    return fileName;
  }


  /**
   * @private
   * 
   * 
   * @param {String} filePath 
   */
  __identifyFolderName(filePath) {
    const pathArray = filePath.split('/');
    const folderName = pathArray.slice(0, pathArray.length - 1).join('/');
    return folderName;
  }
}


//==================================Main Export==================================
module.exports = {
  FileStreamProcessor
};