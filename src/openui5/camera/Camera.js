sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/Control',
    'sap/m/Button',
    'sap/ui/core/Icon'
],
              function(jQuery, Control, Button, Icon) {
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
                               * In single shot mode the video preview stops when the user
                               * clicks the button. It raises a snapshot event
                               * and then needs to be unlocked into preview mode again
                               * before being able to take another one.
                               * When this mode is false, the preview is always visible,
                               * every click captures the snapshot and raises the event.
                               * This is the default mode.
                               */
                              "singleShotMode": {
                                  type: "boolean",
                                  defaultValue: true
                              },

                              /**
                               *
                               */
                              "buttonIcon": {
                                  type: "string",
                                  defaultValue: "sap-icon://camera"
                              },

                              "buttonText": {
                                  type: "string",
                                  defaultValue: ""
                              },


                              /**
                               * Width of the preview window in pixels
                               */
                              "previewwidth": {
                                  type: "string",
                                  defaultValue: "640"
                              },

                              /**
                               * Height of the preview window in pixels
                               */
                              "previewheight": {
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
                          this._currentSnapshot = null; // Last taken snapshot
                          var oSnapshotButton = new Icon({
                              src: this.getButtonIcon()
                          });
                          oSnapshotButton.attachPress(that._onSnapshotButtonPress.bind(that));
                          this._snapshotButton = oSnapshotButton;
                      },


                      _onSnapshotButtonPress: function() {
                          var iVideoWidth = parseInt(this.getVideoWidth(), 10);
                          var iVideoHeight = parseInt(this.getVideoHeight(), 10);
                          var oCanvas = this._getCanvas();
                          var oVideo = this._getVideo();
                          var bSingleShotMode = this.getSingleShotMode();
                          if (this._displayingVideo) {
                              // Grab the picture from the video element
                              var oImage = this._takePicture(iVideoWidth, iVideoHeight);
                              this._currentSnapshot = oImage;
                              // Send snapshot event with the image inside.
                              this.fireSnapshot({
                                  image: oImage
                              });
                              if (bSingleShotMode) {
                                  oVideo.style.display = "none";  // Hide the video
                                  oCanvas.style.display = "block"; // Display the preview
                                  this._displayingVideo = false;
                              }
                          } else {
                              if (bSingleShotMode) {
                                  this._displayingVideo = true;
                                  oCanvas.style.display = "none"; // Hide the preview
                                  oVideo.style.display = "block"; // Display the video
                              }
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
                          if (this._stream){
                              this._stream.getVideoTracks().forEach( function(t){ t.stop(); });
                          }
                      },


                      /**
                       *
                       */
                      onAfterRendering: function() {
                          var that = this;
                          // grab the canvas inside my rendered DOM element
                          var oVideo = this._getVideo();
                          if (oVideo && !oVideo.onclick){
                              oVideo.onclick = function(){
                                  that._onSnapshotButtonPress();
                              };
                          }
                          if (oVideo && !this._displayingVideo) {
                              // set the camera stream on the canvas.
                              // Ask the user for camera access.
                              navigator.mediaDevices.getUserMedia({
                                  video: { facingMode: "environment" }, // by default the back camera
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
                                      jQuery.sap.log.error("Cannot access camera. It will be left blank: " + err);
                                  });
                          }
                      }
                  });
                  return oCamera;
              });
