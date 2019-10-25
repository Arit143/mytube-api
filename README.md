# mytube-api

API to upload, store and retrieve videos

## Installation

For MacOS
```
brew install ffmpeg

```

For Linux follow the below link
```
https://itsfoss.com/ffmpeg/
```

Then install

```
rm -rf node_modules
npm ci

```

Fire up with `npm start:dev` to start the server and navigate to http://localhost:4000/graphql to see the server in action.

## Packages

1. Apollo Server
2. Typescript
3. Express Middleware
4. Jest and ts-jest for testing

## Features

API to handle upload videos and create thumbnails, stream videos and retrieve list of videos from the file system. Fully tested with integration testing. 

## Intergration testing

1. Upload with creating thumbnails
2. Stream
3. Retrieve

## Caveats

1. Unit testing to be done.
2. Heavily reliant on file name.
3. Not scalable at this is only storing and retrieving from file system.
4. Cannot delete uploaded video file.