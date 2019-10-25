import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const asyncReadDir = promisify(fs.readdir);

describe("Upload Mutation", () => {
  it("should upload a video file with thumbnail", async () => {
    const body = new FormData();

    body.append(
      'operations',
      JSON.stringify({
        query: /* GraphQL */ `
      mutation($file: Upload!) {
        uploadFile(file: $file)
      }
    `,
        variables: {
          file: null
        }
      })
    );

    body.append('map', JSON.stringify({ fileVariable: ['variables.file'] }));
    body.append('fileVariable', fs.createReadStream(path.join(__dirname, 'test.mp4')));

    await fetch('http://localhost:4000/graphql', { method: 'POST', body });

    const fileNames = await asyncReadDir(path.join(__dirname, '../../videos'));
    const testVideoUploaded = fileNames.includes('test.mp4');
    expect(testVideoUploaded).toBe(true);

    // Wait for the thumbnail to be created by ffmpeg
    await new Promise((r) => setTimeout(r, 1000));

    const thumbnails = await asyncReadDir(path.join(__dirname, '../../videos/thumbnails'));
    const testThumbnailCreated = thumbnails.includes('test.mp4.png');
    expect(testThumbnailCreated).toBe(true);
  });
})