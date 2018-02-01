/*
 * A simple UI5 control wrapping the HTML5 media API
 * allowing the library user to easily take Pictures in javascript
 * very easily. The control renders a Video preview element
 * (technically a video html tag). When clicked the image is grabbed
 * as a base64 encoded PNG. In the future would be nice to have the
 * format configurable.
 */
sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/Control'
],
              function(jQuery, Control) {
                  "use strict";

                  /**
                   * Constructor for a new Camera control.
                   *
                   * @param {string} [sId] id for the new control, generated automatically if no id is given
                   * @param {object} [mSettings] initial settings for the new control
                   *
                   * @class
                   *
                   * @public
                   * @alias openui5.camera.Camera
                   */
                  var oCamera = Control.extend("openui5.camera.Camera", {
                      /**
                       * Control API
                       */
                      metadata: {
                          properties: {

                              /**
                               * Width of the preview window in pixels
                               */
                              "width": {
                                  type: "string",
                                  defaultValue: "640"
                              },

                              /**
                               * Height of the preview window in pixels
                               */
                              "height": {
                                  type: "string",
                                  defaultValue: "480"
                              },

                              /**
                               * Width of the video capture window in pixels
                               */
                              "videoWidth": {
                                  type: "string",
                                  defaultValue: "1280"
                              },

                              /**
                               * Height of the video capture window in pixels
                               */
                              "videoHeight": {
                                  type: "string",
                                  defaultValue: "960"
                              }
                          },
                          events: {
                              /**
                               * Raised when the user clicks/taps the video preview.
                               * The event object contain a parameter called "image"
                               * which contains a base64 encoded png file. This is a
                               * string.
                               */
                              "snapshot": {}
                          }
                      },

                      /**
                       * Lifecycle hook to initialize the control
                       */
                      init: function() {
                          var that = this;
                          this._displayingVideo = false; // Is the control displaying video at the moment?
                      },


                      /**
                       * Handler for when the user clicks the video preview.
                       * Fires the Snapshot event with the image inside.
                       **/
                      _onUserClickedVideo: function() {
                          var iVideoWidth = parseInt(this.getVideoWidth(), 10);
                          var iVideoHeight = parseInt(this.getVideoHeight(), 10);
                          if (this._displayingVideo) {
                              // Grab the picture from the video element
                              var oImage = this._takePicture(iVideoWidth, iVideoHeight);
                              // Send snapshot event with the image inside.
                              this.fireSnapshot({
                                  image: oImage
                              });
                          }
                      },


                      /**
                       * Takes a screenshot of the video element and returns its
                       * data in PNG format.
                       **/
                      _takePicture: function(width, height) {
                          var oCanvas = this._getCanvas();
                          var oVideo = this._getVideo();
                          var oImageData = null;
                          var context = oCanvas.getContext('2d');
                          if (width && height) {
                              context.drawImage(oVideo, 0, 0, width, height);
                              oImageData = oCanvas.toDataURL('image/png');
                          }
                          return oImageData;
                      },


                      /**
                       *
                       */
                      _getCanvas: function() {
                          return jQuery("canvas", jQuery("#" + this.getId())).get(0);
                      },


                      /**
                       *
                       */
                      _getVideo: function() {
                          return jQuery("video", jQuery("#" + this.getId())).get(0);
                      },


                      /**
                       *
                       */
                      stopCamera: function(){
                          this._displayingVideo = false;
                          if (this._stream){
                              this._stream.getVideoTracks().forEach( function(t){ t.stop(); });
                          }
                      },


                      /**
                       *
                       */
                      onAfterRendering: function() {
                          var that = this;
                          var oVideo = this._getVideo();
                          // Attach a click handler to the video element
                          if (oVideo && !oVideo.onclick){
                              oVideo.onclick = function(){
                                  that._onUserClickedVideo();
                              };
                          }
                          if (oVideo && !this._displayingVideo) {
                              // set the camera stream on the canvas.
                              // Ask the user for camera access.
                              navigator.mediaDevices.getUserMedia({
                                  video: { facingMode: "environment" }, // Back camera
                                  audio: false
                              })
                                  .then(function(stream) {
                                      // We have a camera. Let's store the stream for later use
                                      that._stream = stream;
                                      oVideo.srcObject = stream;
                                      oVideo.play();
                                      that._displayingVideo = true;
                                  })
                                  .catch(function(err) {
                                      jQuery.sap.log.error("Problems accessing the camera: " + err);
                                  });
                          }
                      }
                  });
                  return oCamera;
              });
