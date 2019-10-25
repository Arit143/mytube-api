import { ApolloError } from 'apollo-server-core';
import { createWriteStream } from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import bunyan from 'bunyan';

import { getPathOfVideoByName } from './../common/utilities';

const logger = bunyan.createLogger({ name: 'mutation:uploadFile' });

/**
 * Upload the file in the filesystem and create a thumbnail
 * @param parent 
 * @param context 
 */
const uploadFile = async (parent: any, context: any) => {
  try {
    const { file } = context;
    const { createReadStream, filename } = await file;

    const uploadResponse = await new Promise((resolve, reject) => {
      const createThumbnail = () => {
        ffmpeg(getPathOfVideoByName(filename))
          .screenshots({
            timestamps: ['30%'],
            filename: `${filename}.png`,
            folder: getPathOfVideoByName("thumbnails"),
          })
          .on('end', () => resolve(true));
      };

      createReadStream()
        .pipe(createWriteStream(getPathOfVideoByName(filename)))
        .on("close", createThumbnail)
        .on("error", (err: Error) => reject(err));
    });

    logger.info('File upload and creation success.response-', uploadResponse);
    return uploadResponse;
  } catch (err) {
    logger.error('Error while uploading file', err);
    throw new ApolloError('Error while uploading file', err);
  }
}

export default uploadFile;