# OpenUI5-Camera

An UI5 control which uses the HTML5 media capture API to access the device's camera. The control renders a live camera preview and can take pictures when the users clicks/taps on it.
This is a work in progress so feature set is still very basic.

## Demo

Please check [here](https://jumpifzero.github.io/openui5-camera/test/demo/index.html)

## TODO

- [ ] Add an optional button instead of clicking on the preview only
- [ ] Allow the image format to be configurable
- [ ] Allow an easy way to get the actual image pixels for manipulation
- [ ] Configurable camera (front-facing vs back-facing)
- [ ] Think about video and audio streams

## Usage

To use it you must first install this code in your app.

### Instalation

 1. Make sure your app has a package.json at the root. If it does not, do `npm init` and follow the prompts.
 2. Do `npm install openui5-camera` at the root of your project. This will pull this code into a subfolder named `node_modules`.
 3. Copy file `node_modules\openui5-camera\dist\openui5\camera\library-preload.js` into `thirdparty\openui5\camera\library-preload.js` (create folders as necessary).
 4. In your manifest, declare a dependency to this control by adding the following inside `sap.ui5`:
 ```
 "resourceRoots": {
	"openui5.camera": "./thirdparty/openui5/camera/"
 }
 ```
 4. Check `test/demo/manifest.json` if you're unclear about the previous step.

### Usage in your app

 1. In the view you want to display the camera preview, insert the following:

```
<cam:Camera
    id="idCamera"
    width="800"
    height="600"
    snapshot=".onSnapshot" />
```
 2. Add the following to the same view's namespace declarations: `xmlns:cam="openui5.camera"`

 3. In the corresponding controller, add an event handler. This function will be called everytime the user clicks/taps the preview.
It contains the picture in PNG format encoded in base64 (so it is a character string).

```
 onSnapshot: function (oEvent) {
    // The image is inside oEvent, on the image parameter,
    // let's grab it.
    var sSnapshot = oEvent.getParameter("image")});
    // Do something with it!
    // As you see in the demo, you can attach it directly to a src of an Image. 
    // Because it is already a text string it is also easy to POST to a server inside a json message. 
},
```

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

4. Run `npm start` or `grunt` to lint, build and run a local server (have a look into `Gruntfile.js` to see all the tasks).
```sh
grunt
```

5. Open a test page in your browser: [http://localhost:8080/test/demo/index.html](http://localhost:8080/test/demo/index.html) *Attention:* In Chrome, the camera API is blocked when using http as the protocol. For this reason, you have to either disable web security or setup a self-signed https local server.

### Contributing

Contributions are welcomed. Please use a feature branch and don't forget to include your name (alphabetical order) in the list below.

### Contributors

 - Tiago Almeida - [jumpifzero@gmail.com](mailto:jumpifzero@gmail.com) - @tiagobalmeida

@stermi repo openui5-chartjs was also critical as an example, so thanks @stermi and all other UI5Lab contributors :)

