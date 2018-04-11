## About
This project is setup for development on a chrome extension using React and Webpack. Webpack is configured to listen for file changes and hot-load the extension to avoid the need to constantly reload the extensions from `chrome://extensions`

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
