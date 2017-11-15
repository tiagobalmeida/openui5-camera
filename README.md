# UI5Lab-library-simple

A simple control library that holds custom geometrical controls for testing the UI5Lab library structure.
The [UI5Lab-browser](https://github.com/openui5/UI5Lab-browser) is loaded as a dependency to display the library content for testing during development.

Feel free to adopt!

> The repository is an example how to create custom [OpenUI5](https://github.com/SAP/openui5) control library using Grunt & Bower based on the library [documentation](https://github.com/SAP/openui5/blob/master/docs/controllibraries.md) in the OpenUI5 repository. 

## TODO
* register the built library package so that it can be consumed somewhere else
* load browser as a built package and to the dependency tree work (is currently loaded from github directly as a proof of concept)
* remove explicit bower dependency to sap.f (is only needed by browser, not by library project itself)

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

Thank you to @matz3 for your input and support!
