import { ApolloError } from 'apollo-server-core';
import { readdir, stat } from 'fs';
import { promisify } from 'util';
import path from 'path';
import bunyan from 'bunyan';

import { getPathOfVideoByName, pathOfVideos } from './../common/utilities';

const asyncReadDir = promisify(readdir);
const asyncGetStat = promisify(stat);

const logger = bunyan.createLogger({ name: 'query:fileDetails' });

/**
 * Gets all the files in the file system that are uploaded
 * Read the files and return the type, size and filename
 * In case no files are found, it returns empty
 */
const getFileDetails = async () => {
  try {
    const fileNames = await asyncReadDir(pathOfVideos);
    const filterdFileNames = fileNames.filter(value => value !== 'thumbnails');

    if (filterdFileNames.length === 0) {
      logger.info('no video file uploaded');
      return [];
    }

    const fileUploadList = filterdFileNames.map(async name => {
      const videoByPathName = getPathOfVideoByName(name);
      const stats = await asyncGetStat(videoByPathName);
      return {
        fileName: name,
        size: stats.size,
        type: path.extname(videoByPathName).split('.').pop()
      }
    });

    logger.info('file upload details', fileUploadList);

    return fileUploadList;
  } catch (err) {
    logger.error('Error fetching files', err);
    throw new ApolloError('Error fetching the files details', err);
  }
}

export default getFileDetails;