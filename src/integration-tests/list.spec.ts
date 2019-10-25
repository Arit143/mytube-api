import gql from 'graphql-tag';

import request from './request';

interface FileDetails {
  fileName: string;
  size: number;
  type: string;
}

describe("Query list", () => {
  it("should fetch the video from file system", async () => {
    const query = gql`
      query FileUploadDetails {
        files {
          fileName
          size
          type
        }
      }
    `;

    const response = await request(query);
    const filterFileDetails = response.files.filter((value: FileDetails) => value.fileName === 'test.mp4');

    // It should happen that upload.spec.ts integration is run before this
    expect(filterFileDetails).not.toBe([]);
  });
});