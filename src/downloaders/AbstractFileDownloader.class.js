const EventEmitter = require('events');
const {
  FileStreamProcessor
} = require('../processors/FileStreamProcessor.class');



class AbstractFileDownloader extends EventEmitter {

  /**
   * This is an abstract class that have same property between different integration of file storage systems.
   * It provide some methods that may be changed in  in child classes
   * This class based on NodeJS Event Emitter and provides custom wrapper on it. 
   * 
   * @param  {...any} props 
   */
  constructor(resource, filePath, options, ...props) {
    super(...props);
    this.stream = null;

    this.resource = resource;

    this.fsProcessor = new FileStreamProcessor(filePath, options);
  }

  /**
   * This method should destroy all created data to prevent memory-leaks 
   */
  destroy() {
    this.removeAllListeners();
  }

  /**
   * should notify about stream end and destroy
   * 
   * @param {*} doneData 
   */
  done(doneData) {
    this.emit('done', doneData);
    this.destroy();
  }

  /**
   * Should notify abut occurred error and destroy itself  
   * 
   * @param {*} error 
   */
  error(error) {
    this.emit('error', error);
    this.destroy();
  }

}



//==================================Main Export==================================
module.exports = {
  AbstractFileDownloader
};