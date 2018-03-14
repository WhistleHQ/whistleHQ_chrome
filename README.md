## About
This project is setup for development on a chrome extension using React and Webpack. Webpack is configured to listen for file changes and hot-load the extension to avoid the need to constantly reload the extensions from `chrome://extensions`

## Requirements
- Node/npm >= 6
- Enable Dev Mode for chrome extensions


## Installing
1. Run `npm install` from the command line to install dependencies
2. Run `npm run watch` from the command line to create a dev build. This build is unoptimized and meant for development.
3. Navigate to `chrome://extensions` and click `Load unpacked extensions`. Link the `dist` folder. (Make sure Developer mode to checked).

## Production

Run `npm run build`. This will create an optimized build for deploying.