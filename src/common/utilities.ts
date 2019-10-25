import path from 'path';

const pathOfVideos = path.join(__dirname, "../../videos");

const getPathOfVideoByName = (name: string): string => {
  return path.join(pathOfVideos, name);
};

export { pathOfVideos, getPathOfVideoByName };