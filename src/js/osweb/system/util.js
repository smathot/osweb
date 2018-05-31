import pako from 'pako';
import isFunction from 'lodash/isFunction';
import untar from 'js-untar';

/**
 * FileStreamer makes it possible to asynchronously stream a file to another reader
 *
 * @class FileStreamer
 */
class FileStreamer {
  constructor(file, chunkSize = 64 * 1024) {
    console.log(file)
    this.file = file;
    this.offset = 0;
    this.chunkSize = chunkSize; // bytes
    this.rewind();
  }
  rewind() {
    this.offset = 0;
  }
  isEndOfFile() {
    return this.offset >= this.getFileSize();
  }
  readBlock() {
    const fileReader = new FileReader();
    const blob = this.file.slice(this.offset, this.offset + this.chunkSize);

    return new Promise((resolve, reject) => {
      fileReader.onloadend = (event) => {
        const target = (event.target);
        if (target.error) {
          return reject(target.error);
        }

        this.offset += target.result.byteLength;

        resolve({
          data: target.result,
          progress: Math.min(this.offset / this.file.size, 1)
        });
      };

      fileReader.readAsArrayBuffer(blob);
    });
  }
  getFileSize() {
    return this.file.size;
  }
}

/**
 * Decompresses a cpmpressed experiment file
 *
 * @export
 * @param {File} zipfile The file to extract
 * @param {function} onProgress Function to be called during extraction progress. Receives proportion complete
 * @returns array of Files
 */
export async function decompress(zipfile, onProgress) {
  const fs = new FileStreamer(zipfile);
  const inflator = new pako.Inflate();
  let block;

  while (!fs.isEndOfFile()) {
    block = await fs.readBlock();
    inflator.push(block.data, fs.isEndOfFile());
    if (inflator.err) {
      throw inflator.msg
    }
    if (isFunction(onProgress)) onProgress(block.progress)
  }
  return await untar(inflator.result.buffer);
}

/**
 * Converts a File/Blob to a string representation
 *
 * @export
 * @param {File} inputFile The file to convert
 * @returns string
 */
export function readFileAsText(inputFile) {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};