# OpenUI5-Camera

A control wrapping the [jpeg_camera by Adam Wróbel](https://github.com/amw/jpeg_camera). It allows you to display the live camera on your UI5 app and take pictures.

## TODO
* Everything

## Getting started

1. Install node.js (get it from [nodejs.org](http://nodejs.org/)).
 * If working behind a proxy, you need to configure it properly (HTTP_PROXY / HTTPS_PROXY / NO_PROXY environment variables)

2. Clone the repository and navigate into it
```sh
git clone https://github.com/openui5/UI5Lab-library-simple
cd UI5Lab-library-simple
```
3. Install all npm dependencies (also installs all bower dependencies)
```sh
npm install
```

4. Run npm start to lint, build and run a local server (have a look into `Gruntfile.js` to see all the tasks).
```sh
npm start
```

5. Open a test page in your browser: [http://localhost:8080/test-resources/ui5lab/geometry/Square.html](http://localhost:8080/test-resources/ui5lab/geometry/Square.html)

## Publishing a library project

1. Maintain the index.json file in the test folder to contain all artifacts and samples. You can test how your library would appear in the browser locally by adding a reference to the libraries.json file

>Note: this metadata is still work in progress and subject to change. We will have to see what the best place and structure for this is in the future
 
2. Run grunt build to create a library preload and the CSS theme build for your library artifacts. Everything (minified and unminified sources) will be created in the dist folder, ready to be published and consumed by other projects
```sh
grunt build
```

3. Publish your package to npm, be sure to include only the metadata and the dist folder to keep the package size small (see .npmignore file for details) 
```sh
npm publish
```

### Directions

[Browser](http://localhost:8080/test-resources/ui5lab/browser/index.html) A sample browser showcasing artifacts from one or more libraries

[Control page](http://localhost:8080/test-resources/ui5lab/geometry/Square.html) An HTML test page instantiating the control

[Test page](http://localhost:8080/test-resources/ui5lab/geometry/qunit/Square.qunit.html) A simple QUnit test

[Testuite](http://localhost:8080/test-resources/ui5lab/geometry/qunit/testsuite.qunit.html) A QUnit testsuite running all unit tests in this library

### Contributing

Instructions how to connect to the community and contribute to the UI5lab project can be found in the [main repository](https://github.com/openui5/UI5Lab/)!

### Credits

