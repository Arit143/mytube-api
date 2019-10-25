import { Request, Response, NextFunction } from 'express';
import { createReadStream, stat, Stats } from 'fs';
import { promisify } from 'util';
import path from 'path';
import bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'video:stream' });
const fileStat = promisify(stat);

/**
 * Video streaming controller
 * @param req 
 * @param res 
 * @param next 
 */
const StreamController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('request for streaming', req.params.id);
    const filePath: string = path.join(__dirname, `../videos/${req.params.id}`);
    const stats: Stats = await fileStat(filePath);

    const header = {
      'Content-Length': stats.size,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, header);
    createReadStream(filePath).pipe(res);

    next();
  } catch (err) {
    logger.error('streaming error occured', err);
    throw err;
  }
};

export default StreamController;