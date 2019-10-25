import fetch from 'node-fetch';

describe("Stream video", () => {
  it("should be called once video is asked to be watched", async () => {
    const response = await fetch('http://localhost:4000/stream/test.mp4', { method: 'GET' });

    // Expect test.mp4 to be created before once upload.spec.ts is run
    expect(response.body.readable).toBe(true);
  })
})