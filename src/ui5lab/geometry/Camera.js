/*!
 * ${copyright}
 */

// Provides control ui5lab.geometry.Camera.
sap.ui.define([
    'jquery.sap.global',
    './library',
    'sap/ui/core/Control',
    'sap/m/Button'],
	          function(jQuery, library, Control, Button) {
	"use strict";

	/**
	 * Constructor for a new Camea control.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 *
	 * @public
	 * @alias ui5lab.geometry.Camera
	 */
	var oCamera = Control.extend("ui5lab.geometry.Camera", /** @lends ui5lab.geometry.Camera.prototype */ {
		/**
		 * Control API
		 */
		metadata: {
			library : "ui5lab.geometry",
            properties: {
                "camerawidth": {type: "string", defaultValue: "640"},
                "cameraheight": {type: "string", defaultValue: "480"},
                "previewwidth": {type: "string", defaultValue: "640"},
                "previewheight": {type: "string", defaultValue: "480"}
            },
            events: {
                "snapshot" : {},
                "confirm" : {}
            }
		},

		/**
		 * Lifecycle hook to initialize the control
		 */
		init: function () {
            var that = this;

            this._displayingVideo = false; // Track if the control is displaying video or a still frame
            this._currentSnapshot = null;

            var oSnapshotButton = new Button({
                text: "Take picture"
            });
            oSnapshotButton.attachPress(that._onSnapshotButtonPress.bind(that));
            var oConfirmButton = new Button({
                enabled: false,
                text: "Confirm"
            });
            oConfirmButton.attachPress(that._onConfirm.bind(that));
            this._snapshotButton = oSnapshotButton;
            this._confirmButton = oConfirmButton;
		},


        _onConfirm: function(oEvent) {
            this.fireConfirm({
                image: this._currentSnapshot
            });
        },


        _onSnapshotButtonPress: function(oEvent) {
            var oCanvas = this._getCanvas();
            var oVideo = this._getVideo();
            if (this._displayingVideo){
                // Grab the picture from the video element
                var oImage = this._takePicture(640, 480);
                this._currentSnapshot = oImage;
                // Send snapshot event with the image inside.
                this.fireSnapshot({
                    image: oImage
                });
                // Hide the video
                oVideo.style.display = "none";
                // Display the preview
                oCanvas.style.display = "block";
                this._displayingVideo = false;
            } else {
                this._displayingVideo = true;
                // Hide the preview
                oCanvas.style.display = "none";
                // Display the video
                oVideo.style.display = "block";
            }
            this._confirmButton.setEnabled(!this._displayingVideo);
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
                //oCanvas.width = width;
                //oCanvas.height = height;
                context.drawImage(oVideo, 0, 0, width, height);
                oImageData = oCanvas.toDataURL('image/png');
            }
            return oImageData;
        },



        _getCanvas: function(){
            return jQuery("canvas", jQuery("#" + this.getId())).get(0);
        },


        _getVideo: function(){
            return jQuery("video", jQuery("#" + this.getId())).get(0);
        },


        onAfterRendering: function() {
            var that = this;
            // grab the canvas inside my rendered DOM element
            var oVideo = this._getVideo();
            if (oVideo && !this._displayingVideo) {
                // set the camera stream on the canvas.
                // Ask the user for camera access.
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                    .then(function(stream) {
                        // We have a camera. Let's store the stream for later use
                        //that._stream = stream;
                        oVideo.srcObject = stream;
                        oVideo.play();
                        that._displayingVideo = true;
                    })
                    .catch(function(err) {
                        console.log("An error occured! " + err);
                    });
            }
        }

	});

	return oCamera;

});
