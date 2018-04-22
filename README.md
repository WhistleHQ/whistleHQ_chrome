## About
This repo contains the source code for Whistle HQ's chrome extension frontend. Webpack is set up to hot reload for quality of life improvement. It does not contain the compiled extension, but you can build it yourself using the production instructions below

## Video Demo
[Click here](https://www.youtube.com/watch?v=jQ0n_hzbZqE&feature=youtu.be)

## Requirements
- Node
- npm or yarn
- Chrome with dev mode enabled


## Installing
1. Run `npm install` from the command line to install dependencies
2. Run `npm run start` from the command line. This will create a `dist` directory containing an unoptimized build of the extension.
3. Navigate to `chrome://extensions` and click `Load unpacked extensions`. Link the `dist` folder. (Make sure Developer mode to checked).

## Production
1. First run `npm run build`. This will create an optimized build for deploying.
2. Zip the resulting dist directory created. From the unix command line, you can run this oneliner ` cd dist; zip -r ../whistlehq.zip *; cd ..` in the project root. Othewise, you can use your favorite zip utility.
