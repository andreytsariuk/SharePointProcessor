
class ProgressVisualizer {


  /**
   * This class has only static methods and should visualize a result of processed files/statistics and etc 
   * depends on concrete FileDownloadManager
   * 
   * 
   * @typedef SPProgress
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
   * @param {SPProgress} progress 
   */
  static visualizeSPProgress(progress) {
    const percentOfDone = Math.round((progress.processed + progress.failed) / (progress.processed + progress.failed + progress.todo) * 100);
    console.clear();
    console.log('\n\n');
    console.log('\x1b[34m' + ' ______________________________________________________________________________');
    console.log('\x1b[34m' + '|                                  ' + percentOfDone +
      '%' + new Array(3 - String(percentOfDone).length).fill(' ').join('') + '                                        |');
    console.log('\x1b[34m' + '|' + ProgressVisualizer.__drawProgress(percentOfDone, 78) + '|');
    console.log('\x1b[34m' + '|------------------------------------------------------------------------------|');
    console.log('\x1b[32m' + '| Processed Files       :     ' + ProgressVisualizer.tabFields(progress, 'processed', 49) + '|');
    console.log('\x1b[31m' + '| Failed Files          :     ' + ProgressVisualizer.tabFields(progress, 'failed', 49) + '|');
    console.log('\x1b[36m' + '| Sum LinesCount        :     ' + ProgressVisualizer.tabFields(progress, 'linesCount', 49) + '|');
    console.log('\x1b[36m' + '| Total SpentTime       :     ' + ProgressVisualizer.tabFields(progress, 'spentTime', 49, 'ms') + '|');
    console.log('\x1b[36m' + '| Total Files Size      :     ' + ProgressVisualizer.tabFields(progress, 'totalFileSize', 49, 'b') + '|');
    console.log('\x1b[36m' + '|______________________________________________________________________________|');
    console.log('\x1b[36m' + ' \n');

  }

  /**
   * 
   * @param {number} percentOfDone 
   * @param {number} maxSize 
   */
  static __drawProgress(percentOfDone, maxSize) {
    const hashCount = Math.round((percentOfDone / 100) * maxSize);
    return new Array(hashCount).fill('#').join('') + new Array(maxSize - hashCount).fill(' ').join('');
  }

  /**
   * 
   * @param {SPProgress} statsResult 
   */
  static visualizeStats(statsResult) {
    console.log('\n\n');

    console.log('\x1b[34m' + ' ______________________________________________________________________________');
    console.log('\x1b[34m' + '| Batch Size            :                                                      |');
    console.log('\x1b[34m' + '|------------------------------------------------------------------------------|');
    console.log('\x1b[32m' + '| Processed Files       :     ' + ProgressVisualizer.tabFields(statsResult, 'processed', 49) + '|');
    console.log('\x1b[31m' + '| Failed Files          :     ' + ProgressVisualizer.tabFields(statsResult, 'failed', 49) + '|');
    console.log('\x1b[36m' + '| Sum LinesCount        :     ' + ProgressVisualizer.tabFields(statsResult, 'linesCount', 49) + '|');
    console.log('\x1b[36m' + '| Total SpentTime       :     ' + ProgressVisualizer.tabFields(statsResult, 'spentTime', 49, 'ms') + '|');
    console.log('\x1b[36m' + '| Total Files Size      :     ' + ProgressVisualizer.tabFields(statsResult, 'totalFileSize', 49, 'b') + '|');
    console.log('\x1b[36m' + '|______________________________________________________________________________|');
    console.log('\x1b[36m' + ' \n');
  }


  /**
   * 
   * @param {SPProgress} stats 
   * @param {Map<obj>} result 
   */
  static visualizeSPResult(stats, result) {
    console.clear();

    ProgressVisualizer.visualizeStats(stats);
    console.log('\x1b[34m' + ' _________________________________________________________________________________________________________________________________');
    console.log('\x1b[34m' + '|                                                                                                                                 |');
    console.log('\x1b[34m' + '|                                                DOWNLOAD RESULT                                                                  |');
    console.log('\x1b[34m' + '|_________________________________________________________________________________________________________________________________|');
    console.log('\x1b[34m' + '|      proc.id      |                fileName               |  status  |     size     | lines count |         spent time          |');
    console.log('\x1b[34m' + '|-------------------|---------------------------------------|----------|--------------|-------------|-----------------------------|');

    result.forEach(res => {
      console.log(
        (res.error ? '\x1b[31m' : '\x1b[32m') +
        '|  ' + res.id + ' |' +
        ProgressVisualizer.tabFields(res, 'name', 39) + '| ' +
        ' ' + (res.error ? 'failed ' : 'success') + ' |' +
        ProgressVisualizer.tabFields(res, 'size', 14, 'b') + '|' +
        ProgressVisualizer.tabFields(res, 'linesCount', 13) + '|' +
        ProgressVisualizer.tabFields(res, 'spentTime', 29, 'ms') + '|'
      );
      console.log('|-------------------|---------------------------------------|----------|--------------|-------------|-----------------------------|');
    });
    console.log('\x1b[34m' + '|_________________________________________________________________________________________________________________________________|' + '\x1b[0m');
  }


  /**
   * 
   * @param {*} obj 
   * @param {string} filed 
   * @param {number} maxSize 
   * @param {string} units 
   */
  static tabFields(obj, filed, maxSize, units = '') {
    return String(obj[filed]) + ' ' + String(units) + new Array(maxSize - String(units).length - 1 - String(obj[filed]).length).fill(' ').join('');
  }
}






//==================================Main Export==================================
module.exports = {
  ProgressVisualizer
};