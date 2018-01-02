# OpenUI5-Camera

An UI5 control which uses the HTML5 media capture API to access the device's camera. The control renders a live camera preview and can take pictures when the users clicks/taps on it.

## Demo

Please check [test/demo/index.html](here)

## Usage

To use it you must first install this code in your app.

### Instalation

 1. Do `npm install openui5-camera` at the root of your project. This will pull this code into a subfolder named `node_modules`.
 2. Copy file `node_modules\openui5-camera\dist\openui5\camera\` into `thirdparty\openui5\camera\`. For added _awesomeness_, automate this step.
 3. In your manifest, declare a dependency to this control by adding this inside `sap.ui5`:
 ```
 "resourceRoots": {
	"openui5.camera": "./thirdparty/openui5/camera/"
 }
 ```
 4. Check `test/demo/manifest.json` if you're unclear about the previous step.

### Usage

 1. In the view you want to display the camera preview, insert the following:

```
<cam:Camera
    id="idCamera"
    width="800"
    height="600"
    snapshot=".onSnapshot"
    singleShotMode="false" />
```
 2. Add the following to the same view's namespace declarations: `xmlns:cam="openui5.camera"`

 3. In the corresponding controller, add an event handler. This function will be called everytime the user clicks/taps the preview.
It contains the picture in PNG encoded in base64 (so it is a character string).

```
 onSnapshot: function (oEvent) {
    // The image is inside oEvent, on the image parameter,
    // let's grab it.
    var sSnapshot = oEvent.getParameter("image")});
    // Do something with it :)
},
```
 4. Told you this is easy to use. Be happy. 

## Found a bug? Want to contribute to this project?

1. Install node.js (get it from [nodejs.org](http://nodejs.org/)).
 * If working behind a proxy, you need to configure it properly (HTTP_PROXY / HTTPS_PROXY / NO_PROXY environment variables)

2. Clone the repository and navigate into it
```sh
git clone https://github.com/jumpifzero/openui5-camera
cd openui5-camera
```
3. Install all npm dependencies (also installs all bower dependencies)
```sh
npm install
```

4. Run npm start to lint, build and run a local server (have a look into `Gruntfile.js` to see all the tasks).
```sh
grunt
```

5. Open a test page in your browser: [http://localhost:8080/test-resources/ui5lab/geometry/Square.html](http://localhost:8080/test-resources/ui5lab/geometry/Square.html)

### Directions

[Browser](http://localhost:8080/test-resources/ui5lab/browser/index.html) A sample browser showcasing artifacts from one or more libraries

[Control page](http://localhost:8080/test-resources/ui5lab/geometry/Square.html) An HTML test page instantiating the control

[Test page](http://localhost:8080/test-resources/ui5lab/geometry/qunit/Square.qunit.html) A simple QUnit test

[Testuite](http://localhost:8080/test-resources/ui5lab/geometry/qunit/testsuite.qunit.html) A QUnit testsuite running all unit tests in this library

### Contributing

Instructions how to connect to the community and contribute to the UI5lab project can be found in the [main repository](https://github.com/openui5/UI5Lab/)!

### Credits

